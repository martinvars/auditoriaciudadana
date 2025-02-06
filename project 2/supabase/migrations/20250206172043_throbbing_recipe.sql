-- Create audit log table
CREATE TABLE audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action_type text NOT NULL,
  table_name text NOT NULL,
  record_id uuid NOT NULL,
  old_data jsonb,
  new_data jsonb,
  ip_address text,
  user_agent text,
  user_id uuid REFERENCES auth.users(id),
  nickname text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for efficient querying
CREATE INDEX audit_logs_action_type_idx ON audit_logs (action_type);
CREATE INDEX audit_logs_table_name_idx ON audit_logs (table_name);
CREATE INDEX audit_logs_created_at_idx ON audit_logs (created_at);
CREATE INDEX audit_logs_ip_address_idx ON audit_logs (ip_address);

-- Enable RLS
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for audit_logs (only service role can access)
CREATE POLICY "Enable all access for service role only"
  ON audit_logs
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create function to record audit log
CREATE OR REPLACE FUNCTION record_audit_log()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  client_ip text;
  client_ua text;
  log_user_id uuid;
  log_nickname text;
BEGIN
  -- Get client information from request headers
  client_ip := current_setting('request.headers')::json->>'x-forwarded-for';
  client_ua := current_setting('request.headers')::json->>'user-agent';
  
  -- Get user information
  log_user_id := NEW.user_id;
  log_nickname := NEW.nickname;

  -- If no IP found, use a default
  IF client_ip IS NULL THEN
    client_ip := 'unknown';
  END IF;

  -- Record the audit log
  INSERT INTO audit_logs (
    action_type,
    table_name,
    record_id,
    old_data,
    new_data,
    ip_address,
    user_agent,
    user_id,
    nickname
  )
  VALUES (
    CASE
      WHEN TG_OP = 'INSERT' THEN 'create'
      WHEN TG_OP = 'UPDATE' THEN 'update'
      WHEN TG_OP = 'DELETE' THEN 'delete'
    END,
    TG_TABLE_NAME,
    CASE
      WHEN TG_OP = 'DELETE' THEN OLD.id
      ELSE NEW.id
    END,
    CASE
      WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD)
      WHEN TG_OP = 'UPDATE' THEN to_jsonb(OLD)
      ELSE NULL
    END,
    CASE
      WHEN TG_OP = 'DELETE' THEN NULL
      ELSE to_jsonb(NEW)
    END,
    client_ip,
    client_ua,
    log_user_id,
    log_nickname
  );

  RETURN NEW;
END;
$$;

-- Add audit triggers to tables
CREATE TRIGGER audit_proposals
  AFTER INSERT OR UPDATE OR DELETE ON proposals
  FOR EACH ROW
  EXECUTE FUNCTION record_audit_log();

CREATE TRIGGER audit_comments
  AFTER INSERT OR UPDATE OR DELETE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION record_audit_log();

CREATE TRIGGER audit_votes
  AFTER INSERT OR UPDATE OR DELETE ON votes
  FOR EACH ROW
  EXECUTE FUNCTION record_audit_log();

-- Create view for suspicious activity
CREATE VIEW suspicious_activity AS
SELECT 
  ip_address,
  count(*) as action_count,
  array_agg(DISTINCT action_type) as actions,
  array_agg(DISTINCT table_name) as tables,
  min(created_at) as first_action,
  max(created_at) as last_action
FROM audit_logs
WHERE created_at > now() - interval '24 hours'
GROUP BY ip_address
HAVING count(*) > 100  -- Threshold for suspicious activity
ORDER BY action_count DESC;
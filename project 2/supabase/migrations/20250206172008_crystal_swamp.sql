-- Create rate limiting table
CREATE TABLE rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  action_type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create index for efficient querying
CREATE INDEX rate_limits_ip_action_idx ON rate_limits (ip_address, action_type, created_at);

-- Create function to check rate limits
CREATE OR REPLACE FUNCTION check_rate_limit(
  check_ip text,
  check_action text,
  max_requests int,
  window_minutes int
) RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  request_count int;
BEGIN
  SELECT COUNT(*)
  INTO request_count
  FROM rate_limits
  WHERE ip_address = check_ip
    AND action_type = check_action
    AND created_at > now() - (window_minutes || ' minutes')::interval;

  RETURN request_count < max_requests;
END;
$$;

-- Create function to record action
CREATE OR REPLACE FUNCTION record_action(
  record_ip text,
  record_action text
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO rate_limits (ip_address, action_type)
  VALUES (record_ip, record_action);

  -- Clean up old records (keep last 24 hours)
  DELETE FROM rate_limits
  WHERE created_at < now() - interval '24 hours';
END;
$$;

-- Enable RLS
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Create policy for rate_limits
CREATE POLICY "Enable all access for service role only"
  ON rate_limits
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Add triggers for rate limiting
CREATE OR REPLACE FUNCTION enforce_rate_limit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  client_ip text;
BEGIN
  -- Get client IP from request headers
  client_ip := current_setting('request.headers')::json->>'x-forwarded-for';
  
  -- If no IP found, use a default
  IF client_ip IS NULL THEN
    client_ip := 'unknown';
  END IF;

  -- Check different limits based on action type
  CASE TG_TABLE_NAME
    WHEN 'proposals' THEN
      IF NOT check_rate_limit(client_ip, 'create_proposal', 5, 60) THEN
        RAISE EXCEPTION 'Rate limit exceeded for creating proposals. Please try again later.';
      END IF;
    WHEN 'comments' THEN
      IF NOT check_rate_limit(client_ip, 'create_comment', 10, 60) THEN
        RAISE EXCEPTION 'Rate limit exceeded for creating comments. Please try again later.';
      END IF;
    WHEN 'votes' THEN
      IF NOT check_rate_limit(client_ip, 'create_vote', 20, 60) THEN
        RAISE EXCEPTION 'Rate limit exceeded for voting. Please try again later.';
      END IF;
  END CASE;

  -- Record the action
  PERFORM record_action(client_ip, 'create_' || TG_TABLE_NAME);

  RETURN NEW;
END;
$$;

-- Add triggers to tables
CREATE TRIGGER check_proposal_rate_limit
  BEFORE INSERT ON proposals
  FOR EACH ROW
  EXECUTE FUNCTION enforce_rate_limit();

CREATE TRIGGER check_comment_rate_limit
  BEFORE INSERT ON comments
  FOR EACH ROW
  EXECUTE FUNCTION enforce_rate_limit();

CREATE TRIGGER check_vote_rate_limit
  BEFORE INSERT ON votes
  FOR EACH ROW
  EXECUTE FUNCTION enforce_rate_limit();
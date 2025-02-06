-- Add nickname column to votes table
ALTER TABLE votes ADD COLUMN nickname text DEFAULT 'Anónimo' NOT NULL;

-- Add check constraint for nickname length and content
ALTER TABLE votes ADD CONSTRAINT votes_nickname_length 
CHECK (char_length(nickname) BETWEEN 2 AND 50);

-- Add XSS protection to votes nicknames
ALTER TABLE votes ADD CONSTRAINT prevent_xss_votes_nickname
CHECK (
  nickname !~ '<[^>]*script.*?>.*?</script>' AND
  nickname !~ 'javascript:' AND
  nickname !~ 'data:text/html' AND
  nickname !~ 'vbscript:' AND
  nickname !~ 'onload=' AND
  nickname !~ 'onerror='
);

-- Update audit trigger for votes to include nickname
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
  log_user_id := CASE
    WHEN TG_OP = 'DELETE' THEN OLD.user_id
    ELSE NEW.user_id
  END;
  
  log_nickname := CASE
    WHEN TG_OP = 'DELETE' THEN OLD.nickname
    ELSE NEW.nickname
  END;

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

  RETURN CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;
END;
$$;
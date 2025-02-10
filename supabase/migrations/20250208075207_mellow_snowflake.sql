-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  notifications_enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can subscribe"
  ON subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view subscribers"
  ON subscribers FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create function to notify subscribers
CREATE OR REPLACE FUNCTION notify_subscribers()
RETURNS trigger AS $$
BEGIN
  -- Here you would implement the email notification logic
  -- For now, we'll just log the notification
  RAISE NOTICE 'New proposal notification would be sent to subscribers';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for new proposals
CREATE TRIGGER proposal_notification
  AFTER INSERT ON proposals
  FOR EACH ROW
  EXECUTE FUNCTION notify_subscribers();
/*
  # Añadir tablas para analíticas

  1. Nuevas Tablas
    - `page_views`
      - `id` (uuid, primary key)
      - `session_id` (uuid)
      - `path` (text)
      - `referrer` (text)
      - `user_agent` (text)
      - `country` (text)
      - `created_at` (timestamp)
    - `sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, nullable)
      - `started_at` (timestamp)
      - `ended_at` (timestamp)
      - `duration` (interval)

  2. Security
    - Enable RLS on both tables
    - Add policies for inserting and viewing analytics data
*/

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users,
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  duration interval,
  country text
);

-- Create page_views table
CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES sessions NOT NULL,
  path text NOT NULL,
  referrer text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Policies for sessions
CREATE POLICY "Anyone can create sessions"
  ON sessions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all sessions"
  ON sessions FOR SELECT
  TO authenticated
  USING (true);

-- Policies for page_views
CREATE POLICY "Anyone can create page views"
  ON page_views FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all page views"
  ON page_views FOR SELECT
  TO authenticated
  USING (true);

-- Functions for analytics
CREATE OR REPLACE FUNCTION get_daily_visits(start_date date, end_date date)
RETURNS TABLE (date date, visits bigint) AS $$
BEGIN
  RETURN QUERY
  SELECT date_trunc('day', created_at)::date, count(*)
  FROM page_views
  WHERE created_at >= start_date
  AND created_at < end_date + interval '1 day'
  GROUP BY 1
  ORDER BY 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
/*
  # Analytics tables and policies

  1. New Tables
    - `sessions` - Track user sessions
    - `page_views` - Track individual page views

  2. Security
    - Enable RLS on both tables
    - Add policies for anonymous and authenticated access
    - Add secure analytics function
*/

-- Create sessions table if not exists
CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users,
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  duration interval,
  country text
);

-- Create page_views table if not exists
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

-- Drop existing policies if they exist
DO $$ 
BEGIN
  -- Sessions policies
  DROP POLICY IF EXISTS "Anyone can create sessions" ON sessions;
  DROP POLICY IF EXISTS "Anyone can view sessions" ON sessions;
  
  -- Page views policies
  DROP POLICY IF EXISTS "Anyone can create page views" ON page_views;
  DROP POLICY IF EXISTS "Anyone can view page views" ON page_views;
EXCEPTION
  WHEN undefined_object THEN
    NULL;
END $$;

-- Create new policies
CREATE POLICY "Anyone can create sessions"
  ON sessions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view sessions"
  ON sessions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create page views"
  ON page_views FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view page views"
  ON page_views FOR SELECT
  TO public
  USING (true);

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS get_daily_visits(date, date);

-- Create analytics function
CREATE OR REPLACE FUNCTION get_daily_visits(start_date date, end_date date)
RETURNS TABLE (date date, visits bigint)
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT date_trunc('day', created_at)::date, count(*)
  FROM page_views
  WHERE created_at >= start_date
  AND created_at < end_date + interval '1 day'
  GROUP BY 1
  ORDER BY 1;
END;
$$;
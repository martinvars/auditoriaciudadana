/*
  # Final Analytics Migration

  1. Changes
    - Drop and recreate tables with proper structure
    - Set up proper RLS policies
    - Add optimized indexes
    - Create analytics functions

  2. Security
    - Enable anonymous access with proper restrictions
    - Add security definer functions
*/

-- Drop existing tables and functions
DROP TABLE IF EXISTS page_views CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP FUNCTION IF EXISTS get_daily_visits(date, date);

-- Create sessions table
CREATE TABLE sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  user_agent text,
  country text
);

-- Create page_views table
CREATE TABLE page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES sessions ON DELETE CASCADE,
  path text NOT NULL,
  referrer text,
  created_at timestamptz DEFAULT now()
);

-- Add indexes
CREATE INDEX sessions_ended_at_idx ON sessions(ended_at);
CREATE INDEX page_views_created_at_idx ON page_views(created_at);
CREATE INDEX page_views_path_idx ON page_views(path);
CREATE INDEX page_views_session_id_idx ON page_views(session_id);

-- Enable RLS
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Create policies for sessions
CREATE POLICY "Enable anonymous access for sessions"
  ON sessions FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- Create policies for page_views
CREATE POLICY "Enable anonymous access for page_views"
  ON page_views FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- Create analytics function
CREATE OR REPLACE FUNCTION get_daily_visits(start_date date, end_date date)
RETURNS TABLE (date date, visits bigint)
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT 
    date_trunc('day', created_at)::date as date,
    count(DISTINCT session_id) as visits
  FROM page_views
  WHERE created_at >= start_date
  AND created_at < end_date + interval '1 day'
  GROUP BY 1
  ORDER BY 1;
$$;
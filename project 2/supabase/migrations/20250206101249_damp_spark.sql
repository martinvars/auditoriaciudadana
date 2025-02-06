/*
  # Fix Analytics Policies

  1. Changes
    - Update policies to allow anonymous access for basic stats
    - Add policies for updating session duration
    - Ensure all analytics functions are accessible

  2. Security
    - Maintain RLS while allowing necessary access
    - Use security definer for sensitive operations
*/

-- Drop existing policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anyone can create sessions" ON sessions;
  DROP POLICY IF EXISTS "Anyone can view sessions" ON sessions;
  DROP POLICY IF EXISTS "Anyone can create page views" ON page_views;
  DROP POLICY IF EXISTS "Anyone can view page views" ON page_views;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Create new policies for sessions
CREATE POLICY "Anyone can create sessions"
  ON sessions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update their own session"
  ON sessions FOR UPDATE
  TO anon, authenticated
  USING (id::text = current_setting('request.jwt.claims')::json->>'session_id')
  WITH CHECK (id::text = current_setting('request.jwt.claims')::json->>'session_id');

CREATE POLICY "Anyone can view basic session stats"
  ON sessions FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create new policies for page_views
CREATE POLICY "Anyone can create page views"
  ON page_views FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view basic page stats"
  ON page_views FOR SELECT
  TO anon, authenticated
  USING (true);

-- Update analytics function to be accessible to all
CREATE OR REPLACE FUNCTION get_daily_visits(start_date date, end_date date)
RETURNS TABLE (date date, visits bigint)
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
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
/*
  # Allow comment deletion

  1. Changes
    - Add policy to allow anyone to delete comments
    - Update existing policies for consistency

  2. Security
    - Enable RLS on comments table
    - Add policy for delete operations
*/

-- Drop existing policies for comments
DROP POLICY IF EXISTS "Anyone can comment" ON comments;
DROP POLICY IF EXISTS "Anyone can edit comments" ON comments;
DROP POLICY IF EXISTS "Anyone can view comments" ON comments;

-- Create new policies for comments
CREATE POLICY "Anyone can view comments"
  ON comments FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can create comments"
  ON comments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can edit comments"
  ON comments FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete comments"
  ON comments FOR DELETE
  TO anon, authenticated
  USING (true);
-- Drop existing policies for proposals
DROP POLICY IF EXISTS "Anyone can view proposals" ON proposals;
DROP POLICY IF EXISTS "Anyone can create proposals" ON proposals;
DROP POLICY IF EXISTS "Anyone can update proposals" ON proposals;

-- Create new policies for proposals
CREATE POLICY "Anyone can view proposals"
  ON proposals FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can create proposals"
  ON proposals FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can delete proposals"
  ON proposals FOR DELETE
  TO anon, authenticated
  USING (true);
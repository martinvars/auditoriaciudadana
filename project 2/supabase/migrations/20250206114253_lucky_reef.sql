-- Modify proposals table to allow null user_id
ALTER TABLE proposals DROP CONSTRAINT proposals_user_id_fkey;
ALTER TABLE proposals ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE proposals ADD CONSTRAINT proposals_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update existing policies
DROP POLICY IF EXISTS "Anyone can view proposals" ON proposals;
DROP POLICY IF EXISTS "Anyone can create proposals" ON proposals;
DROP POLICY IF EXISTS "Anyone can delete proposals" ON proposals;

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
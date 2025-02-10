-- Drop existing foreign key constraints
ALTER TABLE votes DROP CONSTRAINT IF EXISTS votes_proposal_id_fkey;
ALTER TABLE comments DROP CONSTRAINT IF EXISTS comments_proposal_id_fkey;

-- Recreate constraints with CASCADE DELETE
ALTER TABLE votes
  ADD CONSTRAINT votes_proposal_id_fkey
  FOREIGN KEY (proposal_id)
  REFERENCES proposals(id)
  ON DELETE CASCADE;

ALTER TABLE comments
  ADD CONSTRAINT comments_proposal_id_fkey
  FOREIGN KEY (proposal_id)
  REFERENCES proposals(id)
  ON DELETE CASCADE;
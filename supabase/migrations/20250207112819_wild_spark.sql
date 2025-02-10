-- Add unique constraint to votes table for proposal_id and nickname
ALTER TABLE votes 
ADD CONSTRAINT votes_proposal_nickname_unique 
UNIQUE (proposal_id, nickname);

-- Add unique constraint for waste_id and nickname
ALTER TABLE votes 
ADD CONSTRAINT votes_waste_nickname_unique 
UNIQUE (waste_id, nickname);
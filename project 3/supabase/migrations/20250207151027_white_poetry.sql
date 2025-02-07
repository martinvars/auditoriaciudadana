-- Create scheduled_comments table
CREATE TABLE IF NOT EXISTS scheduled_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id uuid REFERENCES proposals(id) ON DELETE CASCADE,
  content text NOT NULL,
  nickname text NOT NULL,
  scheduled_for timestamptz NOT NULL,
  processed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Add votes to comments
ALTER TABLE comments ADD COLUMN upvotes integer DEFAULT 0;
ALTER TABLE comments ADD COLUMN downvotes integer DEFAULT 0;

-- Create comment_votes table
CREATE TABLE comment_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id uuid REFERENCES comments(id) ON DELETE CASCADE,
  nickname text NOT NULL,
  vote_type text NOT NULL CHECK (vote_type IN ('up', 'down')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(comment_id, nickname)
);

-- Enable RLS
ALTER TABLE scheduled_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_votes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view scheduled comments"
  ON scheduled_comments FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can create scheduled comments"
  ON scheduled_comments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update scheduled comments"
  ON scheduled_comments FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can vote on comments"
  ON comment_votes FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can change their comment vote"
  ON comment_votes FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can view comment votes"
  ON comment_votes FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes
CREATE INDEX scheduled_comments_scheduled_for_idx ON scheduled_comments(scheduled_for);
CREATE INDEX scheduled_comments_processed_idx ON scheduled_comments(processed);
CREATE INDEX comment_votes_comment_id_idx ON comment_votes(comment_id);
CREATE INDEX comments_upvotes_idx ON comments(upvotes DESC);
CREATE INDEX comments_downvotes_idx ON comments(downvotes DESC);
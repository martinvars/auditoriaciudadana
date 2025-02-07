/*
  # Add Wastes Feature Schema

  1. New Tables
    - `wastes`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `amount` (numeric, nullable)
      - `user_id` (uuid, nullable, references auth.users)
      - `nickname` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `wastes` table
    - Add policies for anonymous access
    - Update existing tables to support wastes

  3. Changes
    - Add waste_id to votes and comments tables
    - Add appropriate foreign keys and indexes
*/

-- Create wastes table
CREATE TABLE wastes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  amount numeric NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT wastes_nickname_length CHECK (char_length(nickname) BETWEEN 2 AND 50),
  CONSTRAINT prevent_xss_wastes CHECK (
    title !~ '<[^>]*script.*?>.*?</script>' AND
    description !~ '<[^>]*script.*?>.*?</script>' AND
    nickname !~ '<[^>]*script.*?>.*?</script>' AND
    title !~ 'javascript:' AND
    description !~ 'javascript:' AND
    nickname !~ 'javascript:' AND
    title !~ 'data:text/html' AND
    description !~ 'data:text/html' AND
    nickname !~ 'data:text/html'
  )
);

-- Add waste_id to votes table
ALTER TABLE votes 
ADD COLUMN waste_id uuid REFERENCES wastes(id) ON DELETE CASCADE,
ADD CONSTRAINT votes_target_check 
  CHECK (
    (proposal_id IS NOT NULL AND waste_id IS NULL) OR
    (proposal_id IS NULL AND waste_id IS NOT NULL)
  );

-- Add waste_id to comments table
ALTER TABLE comments 
ADD COLUMN waste_id uuid REFERENCES wastes(id) ON DELETE CASCADE,
ADD CONSTRAINT comments_target_check 
  CHECK (
    (proposal_id IS NOT NULL AND waste_id IS NULL) OR
    (proposal_id IS NULL AND waste_id IS NOT NULL)
  );

-- Create indexes
CREATE INDEX wastes_created_at_idx ON wastes(created_at DESC);
CREATE INDEX wastes_user_id_idx ON wastes(user_id);
CREATE INDEX votes_waste_id_idx ON votes(waste_id);
CREATE INDEX comments_waste_id_idx ON comments(waste_id);

-- Enable RLS
ALTER TABLE wastes ENABLE ROW LEVEL SECURITY;

-- Create policies for wastes
CREATE POLICY "Anyone can view wastes"
  ON wastes FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can create wastes"
  ON wastes FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update wastes"
  ON wastes FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete wastes"
  ON wastes FOR DELETE
  TO anon, authenticated
  USING (true);

-- Update existing policies for votes and comments to include wastes
DROP POLICY IF EXISTS "Anyone can view votes" ON votes;
CREATE POLICY "Anyone can view votes"
  ON votes FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Anyone can create votes" ON votes;
CREATE POLICY "Anyone can create votes"
  ON votes FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can view comments" ON comments;
CREATE POLICY "Anyone can view comments"
  ON comments FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Anyone can create comments" ON comments;
CREATE POLICY "Anyone can create comments"
  ON comments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
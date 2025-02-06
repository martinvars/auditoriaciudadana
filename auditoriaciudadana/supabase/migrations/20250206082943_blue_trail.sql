/*
  # Create proposals and comments tables

  1. New Tables
    - `proposals`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `description` (text)
      - `details` (text)
      - `savings` (decimal)
      - `category` (text)
      - `level` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `votes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `proposal_id` (uuid, references proposals)
      - `vote_type` (text, either 'up' or 'down')
      - `created_at` (timestamp)

    - `comments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `proposal_id` (uuid, references proposals)
      - `content` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create proposals table
CREATE TABLE proposals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  details text NOT NULL,
  savings decimal NOT NULL,
  category text NOT NULL,
  level text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create votes table
CREATE TABLE votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  proposal_id uuid REFERENCES proposals NOT NULL,
  vote_type text NOT NULL CHECK (vote_type IN ('up', 'down')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, proposal_id)
);

-- Create comments table
CREATE TABLE comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  proposal_id uuid REFERENCES proposals NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Policies for proposals
CREATE POLICY "Proposals are viewable by everyone" 
  ON proposals FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Users can create proposals" 
  ON proposals FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own proposals" 
  ON proposals FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Policies for votes
CREATE POLICY "Votes are viewable by everyone" 
  ON votes FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Users can create votes" 
  ON votes FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own votes" 
  ON votes FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Policies for comments
CREATE POLICY "Comments are viewable by everyone" 
  ON comments FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Users can create comments" 
  ON comments FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" 
  ON comments FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id);
/*
  # Add nickname support for comments and proposals

  1. Changes
    - Add nickname column to comments table
    - Add nickname column to proposals table
    - Update existing records with 'Anónimo' as default nickname
    - Add check constraints for nickname length and content

  2. Security
    - Enable RLS policies for nickname access
*/

-- Add nickname columns
ALTER TABLE comments ADD COLUMN nickname text DEFAULT 'Anónimo';
ALTER TABLE proposals ADD COLUMN nickname text DEFAULT 'Anónimo';

-- Add check constraints for nickname length and content
ALTER TABLE comments ADD CONSTRAINT comments_nickname_length CHECK (char_length(nickname) BETWEEN 2 AND 50);
ALTER TABLE proposals ADD CONSTRAINT proposals_nickname_length CHECK (char_length(nickname) BETWEEN 2 AND 50);

-- Update existing records
UPDATE comments SET nickname = 'Anónimo' WHERE nickname IS NULL;
UPDATE proposals SET nickname = 'Anónimo' WHERE nickname IS NULL;

-- Make nickname required
ALTER TABLE comments ALTER COLUMN nickname SET NOT NULL;
ALTER TABLE proposals ALTER COLUMN nickname SET NOT NULL;
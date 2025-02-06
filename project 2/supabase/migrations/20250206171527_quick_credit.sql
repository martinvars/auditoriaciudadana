-- Delete the spam proposal
DELETE FROM proposals 
WHERE description LIKE 'SSSSSSSSSSSSSSS%' 
   OR title LIKE 'SSSSSSSSSSSSSSS%';

-- Add a check constraint to prevent similar spam in the future
ALTER TABLE proposals 
ADD CONSTRAINT prevent_spam_content 
CHECK (
  description !~ '^[A-Za-z]\\1{10,}$' AND 
  title !~ '^[A-Za-z]\\1{10,}$'
);
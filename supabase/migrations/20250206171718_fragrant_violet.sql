-- Delete any proposals that are just repeated S characters
DELETE FROM proposals 
WHERE description ~ '^S+$' 
   OR title ~ '^S+$'
   OR description LIKE '%SSSSSSSS%'
   OR title LIKE '%SSSSSSSS%';

-- Add additional check constraint to prevent similar spam
ALTER TABLE proposals 
ADD CONSTRAINT prevent_repeated_chars 
CHECK (
  description !~ '^S+$' AND 
  title !~ '^S+$' AND
  description !~ 'S{8,}' AND
  title !~ 'S{8,}'
);
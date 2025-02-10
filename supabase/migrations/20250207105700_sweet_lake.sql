-- Update existing proposals to round savings
UPDATE proposals 
SET savings = ROUND(savings)
WHERE savings != ROUND(savings);

-- Add constraint to ensure savings are integers
ALTER TABLE proposals 
  ADD CONSTRAINT proposals_savings_integer 
  CHECK (savings = ROUND(savings));
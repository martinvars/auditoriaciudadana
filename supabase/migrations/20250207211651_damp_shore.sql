-- Add upvotes to the drivers proposal
INSERT INTO votes (
  proposal_id,
  vote_type,
  nickname,
  created_at
) VALUES 
(
  (SELECT id FROM proposals WHERE title = 'Racionalización de Conductores Oficiales' AND level = 'nacional' LIMIT 1),
  'up',
  'EconomistaPublico',
  now() - interval '2 days'
),
(
  (SELECT id FROM proposals WHERE title = 'Racionalización de Conductores Oficiales' AND level = 'nacional' LIMIT 1),
  'up',
  'GestorPublico',
  now() - interval '1 day'
),
(
  (SELECT id FROM proposals WHERE title = 'Racionalización de Conductores Oficiales' AND level = 'nacional' LIMIT 1),
  'up',
  'AuditorEstado',
  now()
);
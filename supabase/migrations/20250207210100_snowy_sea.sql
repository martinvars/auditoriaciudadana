-- Insert comments for Smart City Municipal proposal
INSERT INTO comments (
  proposal_id,
  content,
  nickname,
  created_at
) VALUES 
(
  (SELECT id FROM proposals WHERE title = 'Smart City Municipal' AND level = 'municipal' LIMIT 1),
  'Como responsable de innovación en un ayuntamiento de 200.000 habitantes, puedo confirmar que el ahorro energético está bien calculado. Nuestra experiencia con alumbrado inteligente muestra reducciones del 35-40% en el consumo. Sugiero incluir también sensores de riego y gestión de aparcamientos que podrían aumentar el ahorro otros 50M€.',
  'InnovacionLocal',
  now() - interval '3 days'
),
(
  (SELECT id FROM proposals WHERE title = 'Smart City Municipal' AND level = 'municipal' LIMIT 1),
  'Desde el Colegio de Ingenieros de Telecomunicaciones, consideramos fundamental añadir una plataforma de integración de datos que unifique toda la información de sensores. El coste inicial sería de unos 2M€ por ciudad de 100.000 habitantes, pero el retorno es de 3-4x en eficiencia operativa.',
  'IngenieroTeleco',
  now() - interval '2 days'
),
(
  (SELECT id FROM proposals WHERE title = 'Smart City Municipal' AND level = 'municipal' LIMIT 1),
  'La propuesta es sólida pero debe considerar la ciberseguridad como prioridad. Como experto en seguridad IoT, recomiendo destinar al menos un 15% del presupuesto a protección de infraestructuras críticas y datos ciudadanos. El ahorro en prevención de incidentes justifica la inversión.',
  'CyberExpert',
  now() - interval '1 day'
),
(
  (SELECT id FROM proposals WHERE title = 'Optimización de Plantillas Municipales' AND level = 'municipal' LIMIT 1),
  'Como secretario municipal con 20 años de experiencia, considero que el ahorro en amortización de vacantes es realista. Sin embargo, la reducción de eventuales debería ser gradual y vinculada a la digitalización. Sugiero un plan a 4 años con objetivos anuales medibles.',
  'SecretarioAyto',
  now() - interval '2 days'
),
(
  (SELECT id FROM proposals WHERE title = 'Optimización de Plantillas Municipales' AND level = 'municipal' LIMIT 1),
  'Represento a un sindicato de funcionarios municipales y, aunque apoyamos la modernización, es fundamental garantizar la calidad del servicio. La formación en polivalencia debe ser previa a cualquier reorganización y contar con presupuesto específico. El ahorro en eficiencia parece alcanzable si se implementa correctamente.',
  'SindicatoMunicipal',
  now() - interval '1 day'
);
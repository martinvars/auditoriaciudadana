-- Insert comments for the government drivers proposal
INSERT INTO comments (
  proposal_id,
  content,
  nickname,
  created_at
) VALUES 
(
  (SELECT id FROM proposals WHERE title = 'Racionalización de Conductores Oficiales' AND level = 'nacional' LIMIT 1),
  'Como ex jefe de parque móvil ministerial, confirmo que la reducción es viable. El número actual de conductores es excesivo y muchos vehículos tienen una utilización inferior al 30%. Sin embargo, sugiero mantener un pool reducido de 20-25 conductores a nivel central para servicios compartidos en eventos o situaciones especiales. El ahorro en mantenimiento podría ser incluso mayor si se centraliza la gestión de la flota restante.',
  'ExJefeParque',
  now() - interval '3 days'
),
(
  (SELECT id FROM proposals WHERE title = 'Racionalización de Conductores Oficiales' AND level = 'nacional' LIMIT 1),
  'Desde la Asociación de Interventores de la Administración del Estado, apoyamos la medida pero sugerimos un análisis más detallado de los costes comparativos con servicios VTC. Nuestra experiencia indica que el ahorro neto podría aumentar a 300M€ si se incluyen todos los costes indirectos (garajes, seguros, gestión administrativa, etc.). Fundamental establecer un sistema riguroso de control de uso de servicios alternativos.',
  'InterventorEstado',
  now() - interval '2 days'
),
(
  (SELECT id FROM proposals WHERE title = 'Racionalización de Conductores Oficiales' AND level = 'nacional' LIMIT 1),
  'Como representante sindical del colectivo de conductores, consideramos necesario que el plan de recolocación sea más específico. Proponemos aprovechar la experiencia de estos profesionales para servicios de movilidad en hospitales, centros de mayores o transporte escolar, donde su experiencia sería valiosa. La transición debería ser gradual y garantizar el mantenimiento de condiciones laborales.',
  'SindicatoConductores',
  now() - interval '1 day'
),
(
  (SELECT id FROM proposals WHERE title = 'Racionalización de Conductores Oficiales' AND level = 'nacional' LIMIT 1),
  'Desde el Observatorio de Gasto Público, hemos estudiado modelos similares en otros países. El caso de Francia es especialmente relevante: la reducción del 70% de conductores oficiales en 2012 generó un ahorro del 82% sobre el presupuesto inicial. Recomendamos incluir un sistema de monitorización trimestral del gasto en alternativas de transporte para evitar la generación de costes ocultos.',
  'ObservatorioGasto',
  now());
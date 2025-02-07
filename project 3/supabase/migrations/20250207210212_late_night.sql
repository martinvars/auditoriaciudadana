-- Insert comments for Optimización de Organismos Autonómicos
INSERT INTO comments (
  proposal_id,
  content,
  nickname,
  created_at
) VALUES 
(
  (SELECT id FROM proposals WHERE title = 'Optimización de Organismos Autonómicos' AND level = 'autonomico' LIMIT 1),
  'Como ex director general de una agencia autonómica, considero que el ahorro estimado es alcanzable. La clave está en la integración de sistemas informáticos y la eliminación de duplicidades en áreas como promoción económica y turismo. Sugiero empezar por fusionar observatorios y oficinas en el exterior.',
  'ExDirectorAutonomico',
  now() - interval '2 days'
),
(
  (SELECT id FROM proposals WHERE title = 'Optimización de Organismos Autonómicos' AND level = 'autonomico' LIMIT 1),
  'Desde la Asociación de Inspectores de Hacienda, apoyamos la propuesta pero es fundamental mantener las capacidades de control y fiscalización. La digitalización debe priorizar la interoperabilidad entre administraciones y la lucha contra el fraude. El ahorro en estructuras (600M€) parece realista según nuestra experiencia.',
  'InspectorHacienda',
  now() - interval '1 day'
);

-- Insert comments for Sistema Mixto de Pensiones
INSERT INTO comments (
  proposal_id,
  content,
  nickname,
  created_at
) VALUES 
(
  (SELECT id FROM proposals WHERE title = 'Sistema Mixto de Pensiones' AND level = 'nacional' LIMIT 1),
  'Como actuario especializado en sistemas de pensiones, el modelo propuesto es viable pero requiere ajustes. La transición de 15 años es realista, pero el ahorro estimado en eficiencia administrativa (500M€) podría ser mayor con la automatización completa de la gestión. Fundamental garantizar rentabilidades mínimas en el componente de capitalización.',
  'ActuarioPensiones',
  now() - interval '2 days'
),
(
  (SELECT id FROM proposals WHERE title = 'Sistema Mixto de Pensiones' AND level = 'nacional' LIMIT 1),
  'Represento a una asociación de economistas especializados en previsión social. El modelo sueco ha demostrado ser sostenible, pero su implementación requirió una campaña masiva de educación financiera. Sugerimos incluir un pilar solidario más robusto y mecanismos automáticos de ajuste según la esperanza de vida.',
  'EconomistaPensiones',
  now() - interval '1 day'
);
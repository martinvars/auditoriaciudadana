-- Insert comments for the Sports Optimization proposal
INSERT INTO comments (
  proposal_id,
  content,
  nickname,
  created_at
) VALUES 
(
  (SELECT id FROM proposals WHERE title = 'Optimización de Servicios Deportivos' AND level = 'municipal' LIMIT 1),
  'Como gestor deportivo municipal con 15 años de experiencia, considero que la propuesta es viable pero debe enfatizar más la colaboración público-privada. Las reservas online y el mantenimiento preventivo son clave, pero sugiero añadir un sistema de copago flexible según renta para garantizar la sostenibilidad sin excluir a nadie. El ahorro estimado en personal (50M€) parece optimista; sugiero revisar esa cifra.',
  'GestorDeportivo',
  now() - interval '2 days'
),
(
  (SELECT id FROM proposals WHERE title = 'Optimización de Servicios Deportivos' AND level = 'municipal' LIMIT 1),
  'Desde la Federación de Asociaciones Vecinales, apoyamos la modernización pero es fundamental mantener precios asequibles. La gestión centralizada y las reservas online son positivas, pero deben mantener alternativas presenciales para personas mayores. Proponemos crear un consejo ciudadano para supervisar la implementación y garantizar el acceso universal.',
  'AsociacionVecinal',
  now() - interval '1 day'
);
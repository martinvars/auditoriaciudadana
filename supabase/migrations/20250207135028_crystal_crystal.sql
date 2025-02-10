-- Insertar propuestas de nivel municipal
INSERT INTO proposals (
  title,
  description,
  details,
  savings,
  category,
  level,
  nickname,
  created_at,
  updated_at
) VALUES 
(
  'Fusión de Servicios Municipales',
  'España tiene más de 8.000 municipios, muchos con menos de 1.000 habitantes. Se propone un programa de servicios compartidos para mejorar la eficiencia.

1. Áreas de actuación:
- Policía local mancomunada
- Servicios técnicos compartidos
- Gestión de residuos conjunta
- Mantenimiento coordinado

2. Ahorros detallados:
- Personal compartido: 150M€/año
- Equipamiento común: 100M€/año
- Eficiencia operativa: 100M€/año
- Compras conjuntas: 50M€/año

3. Ejemplos exitosos:
- Mancomunidades vascas
- Consorcios catalanes
- Agrupaciones gallegas',
  'Programa de servicios municipales compartidos',
  400,
  'Administración',
  'municipal',
  'Administrador',
  now() - interval '8 days',
  now() - interval '8 days'
),
(
  'Optimización de Empresas Municipales',
  'Muchos ayuntamientos mantienen empresas públicas deficitarias que podrían gestionarse de forma más eficiente.

1. Diagnóstico:
- 300+ empresas municipales deficitarias
- Duplicidad con servicios directos
- Costes de estructura elevados
- Baja eficiencia operativa

2. Plan de acción:
- Auditoría de viabilidad
- Fusión de entidades similares
- Externalización selectiva
- Modernización gestión

3. Impacto económico:
- Reducción pérdidas: 200M€/año
- Eficiencia gestión: 150M€/año
- Optimización recursos: 100M€/año
- Venta activos: 50M€',
  'Reestructuración de empresas públicas municipales',
  500,
  'Empresas Públicas',
  'municipal',
  'Administrador',
  now() - interval '7 days',
  now() - interval '7 days'
),
(
  'Digitalización de Servicios Locales',
  'Propuesta para modernizar la administración local mediante la digitalización integral de servicios y trámites.

1. Situación actual:
- Procesos manuales ineficientes
- Duplicidad de documentación
- Atención presencial costosa
- Tiempos de espera elevados

2. Soluciones propuestas:
- Ventanilla única digital
- Expediente electrónico
- Cita previa inteligente
- Apps municipales

3. Ahorros estimados:
- Reducción personal: 100M€/año
- Eficiencia procesos: 80M€/año
- Ahorro ciudadanos: 70M€/año
- Papel y consumibles: 50M€/año',
  'Transformación digital de ayuntamientos',
  300,
  'Administración',
  'municipal',
  'Administrador',
  now() - interval '6 days',
  now() - interval '6 days'
),
(
  'Racionalización de Instalaciones Municipales',
  'Plan para optimizar el uso y gestión de instalaciones y equipamientos municipales.

1. Áreas de mejora:
- Centros deportivos
- Espacios culturales
- Edificios administrativos
- Almacenes municipales

2. Medidas concretas:
- Uso compartido de espacios
- Gestión centralizada
- Mantenimiento preventivo
- Eficiencia energética

3. Desglose ahorro:
- Optimización espacios: 120M€/año
- Eficiencia energética: 80M€/año
- Mantenimiento: 60M€/año
- Gestión unificada: 40M€/año',
  'Optimización de equipamientos municipales',
  300,
  'Infraestructuras',
  'municipal',
  'Administrador',
  now() - interval '5 days',
  now() - interval '5 days'
),
(
  'Reforma de la Contratación Municipal',
  'Propuesta para mejorar la eficiencia en la contratación pública a nivel local.

1. Problemas detectados:
- Fragmentación de contratos
- Sobrecostes frecuentes
- Falta de transparencia
- Procedimientos lentos

2. Soluciones:
- Central de compras municipal
- Subastas electrónicas
- Contratos marco
- Control automatizado

3. Impacto económico:
- Mejores precios: 200M€/año
- Eficiencia proceso: 100M€/año
- Reducción fraude: 100M€/año
- Ahorro administrativo: 100M€/año',
  'Modernización de la contratación local',
  500,
  'Contratación',
  'municipal',
  'Administrador',
  now() - interval '4 days',
  now() - interval '4 days'
);
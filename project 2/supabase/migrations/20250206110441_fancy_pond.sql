/*
  # Add Next Batch of Detailed Proposals

  1. Changes
    - Adds next set of detailed proposals
    - Maintains consistent formatting
    - Includes comprehensive implementation details
  
  2. Security
    - Uses existing RLS policies
    - No changes to access control
*/

INSERT INTO proposals (
  title,
  description,
  details,
  savings,
  category,
  level,
  user_id,
  created_at,
  updated_at
) VALUES 
(
  'Centralización de Compras Sanitarias',
  'El sistema sanitario español gasta más de 10.000M€ anuales en medicamentos y material sanitario, con 17 sistemas de compra diferentes. Se propone un sistema centralizado de compras.

1. Áreas de centralización:
- Medicamentos hospitalarios
- Material sanitario
- Equipamiento médico
- Servicios comunes
- Sistemas informáticos

2. Ahorros estimados:
- Economías de escala: 1.200M€/año
- Eficiencia logística: 500M€/año
- Reducción administrativa: 300M€/año

3. Experiencias similares:
- Portugal: SPMS (25% ahorro)
- Italia: Consip (20% ahorro)
- Suecia: Modelo regional (15% ahorro)

4. Implementación:
- Fase 1: Plataforma digital (6 meses)
- Fase 2: Catálogo único (6 meses)
- Fase 3: Pilotos (6 meses)
- Fase 4: Despliegue nacional (12 meses)

5. Controles:
- Comité técnico independiente
- Auditoría permanente
- Transparencia total
- Evaluación resultados',
  'Sistema nacional centralizado de compras sanitarias',
  2000,
  'Sanidad',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),
(
  'Optimización de Ayuda Internacional',
  'España destina más de 3.000M€ anuales a cooperación internacional, con programas fragmentados y baja eficiencia. Se propone una racionalización manteniendo la ayuda estratégica.

1. Criterios de optimización:
- Impacto humanitario demostrable
- Alineación con intereses nacionales
- Eficiencia en la gestión
- Transparencia total
- Evaluación resultados

2. Ahorros previstos:
- Eliminación duplicidades: 400M€/año
- Eficiencia gestión: 300M€/año
- Focalización programas: 300M€/año

3. Referencias internacionales:
- Holanda: Aid & Trade
- Dinamarca: Priorización regional
- Canadá: Results-based management

4. Plan de acción:
- Mes 1-3: Evaluación programas
- Mes 4-6: Nueva estrategia
- Mes 7-12: Implementación
- Mes 13-18: Seguimiento

5. Salvaguardas:
- Compromisos internacionales
- Emergencias humanitarias
- Países prioritarios
- ODS esenciales',
  'Racionalización de la cooperación internacional',
  1000,
  'Cooperación',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),
(
  'Sistema de Contratación Transparente',
  'La contratación pública en España supera los 200.000M€ anuales (20% del PIB). Se propone un sistema integral de subastas electrónicas y supervisión reforzada.

1. Elementos clave:
- Plataforma única de licitación
- Subastas electrónicas obligatorias
- IA para detección de fraude
- Supervisión en tiempo real
- Transparencia total

2. Impacto económico:
- Mejor precio: 3.000M€/año
- Reducción fraude: 1.500M€/año
- Eficiencia proceso: 500M€/año

3. Modelos de referencia:
- Corea del Sur: KONEPS
- Chile: ChileCompra
- Portugal: BASE

4. Cronograma:
- Fase 1: Plataforma tecnológica (12 meses)
- Fase 2: Marco normativo (6 meses)
- Fase 3: Formación (6 meses)
- Fase 4: Implementación (12 meses)

5. Garantías:
- Acceso PYMES
- Competencia efectiva
- Recursos rápidos
- Auditoría continua',
  'Sistema integral de contratación pública electrónica',
  5000,
  'Contratación',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
);

-- Actualizar índices si es necesario
CREATE INDEX IF NOT EXISTS proposals_created_at_idx ON proposals(created_at DESC);
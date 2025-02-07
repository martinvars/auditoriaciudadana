/*
  # Add Final Batch of Detailed Proposals

  1. Changes
    - Adds final set of detailed proposals
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
  'Gestión Privada de Instalaciones Deportivas',
  'Las instalaciones deportivas públicas generan un déficit anual superior a 600M€. Se propone un modelo de gestión privada manteniendo el acceso público.

1. Instalaciones objetivo:
- Polideportivos municipales
- Piscinas públicas
- Campos de fútbol
- Pistas de atletismo
- Centros especializados

2. Ahorros estimados:
- Reducción déficit operativo: 200M€/año
- Eficiencia en gestión: 70M€/año
- Mantenimiento optimizado: 30M€/año

3. Casos de éxito:
- Reino Unido: Leisure Trusts
- Alemania: Modelo mixto
- Canadá: P3 Facilities

4. Implementación:
- Fase 1: Auditoría instalaciones (3 meses)
- Fase 2: Modelo concesional (3 meses)
- Fase 3: Licitaciones (6 meses)
- Fase 4: Transición gradual (12 meses)

5. Garantías:
- Precios máximos regulados
- Acceso universal
- Programas sociales
- Mantenimiento calidad',
  'Concesión de instalaciones deportivas públicas',
  300,
  'Deportes',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),
(
  'Administración Digital Total',
  'La administración pública mantiene numerosos procesos manuales y presenciales que generan costes innecesarios. Se propone una digitalización total de trámites y servicios.

1. Áreas de transformación:
- Todos los trámites en línea
- Expediente digital único
- Firma electrónica universal
- Notificaciones digitales
- Interoperabilidad total

2. Ahorros previstos:
- Reducción personal: 800M€/año
- Ahorro en papel: 200M€/año
- Eficiencia procesos: 600M€/año
- Tiempo ciudadanos: 400M€/año

3. Referencias internacionales:
- Estonia: e-Government
- Singapur: Smart Nation
- Dinamarca: Digital First

4. Plan de ejecución:
- Año 1: Infraestructura y normativa
- Año 2: Migración sistemas
- Año 3: Formación y despliegue
- Año 4: Optimización

5. Medidas complementarias:
- Asistencia a mayores
- Puntos de apoyo rural
- Formación ciudadana
- Seguridad reforzada',
  'Transformación digital completa de la administración',
  2000,
  'Administración',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),
(
  'Recorte de Subvenciones No Estratégicas',
  'España destina más de 5.000M€ anuales a subvenciones de dudosa utilidad o retorno social. Se propone una revisión integral del sistema de ayudas públicas.

1. Subvenciones a revisar:
- Eventos culturales minoritarios
- Asociaciones sin impacto medible
- Fundaciones redundantes
- Programas obsoletos
- Ayudas no justificadas

2. Impacto económico:
- Eliminación directa: 600M€/año
- Eficiencia gestión: 250M€/año
- Mejor focalización: 150M€/año

3. Ejemplos internacionales:
- Nueva Zelanda: Zero-based review
- Canadá: Program review
- Australia: Grants reform

4. Metodología:
- Fase 1: Inventario completo (3 meses)
- Fase 2: Evaluación impacto (3 meses)
- Fase 3: Decisiones (3 meses)
- Fase 4: Implementación (15 meses)

5. Criterios evaluación:
- Retorno social medible
- Alineación estratégica
- Eficiencia gestión
- Transparencia total',
  'Revisión integral del sistema de subvenciones',
  1000,
  'Subvenciones',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
);

-- Actualizar índices si es necesario
CREATE INDEX IF NOT EXISTS proposals_created_at_idx ON proposals(created_at DESC);
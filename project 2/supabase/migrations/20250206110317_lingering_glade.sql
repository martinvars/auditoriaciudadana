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
  'Eliminación de Diputaciones Provinciales',
  'Las diputaciones provinciales suponen una estructura administrativa adicional que genera duplicidades y costes innecesarios. Se propone su eliminación gradual y transferencia de competencias.

1. Situación actual:
- 38 diputaciones provinciales
- 15.000 empleados aproximadamente
- Presupuesto anual: 6.500M€
- Duplicidad con CCAA: 45% funciones

2. Ahorros detallados:
- Reducción cargos políticos: 800M€/año
- Optimización personal: 1.200M€/año
- Venta de activos: 500M€
- Eficiencia servicios: 500M€/año

3. Experiencias similares:
- Francia: Reforma territorial 2015
- Italia: Eliminación provincias 2014
- Dinamarca: Reforma regional 2007

4. Plan de ejecución:
- Fase 1: Marco legal (12 meses)
- Fase 2: Transferencia competencias (18 meses)
- Fase 3: Reubicación personal (12 meses)
- Fase 4: Liquidación activos (6 meses)

5. Garantías:
- Mantenimiento servicios esenciales
- Protección empleados públicos
- Gestión patrimonio histórico
- Coordinación territorial',
  'Plan de eliminación gradual de diputaciones provinciales',
  3000,
  'Administración',
  'autonomico',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),
(
  'Reducción de Publicidad Institucional',
  'El gasto en publicidad institucional supera los 800M€ anuales, incluyendo campañas innecesarias y autopromoción política. Se propone una reducción drástica y mayor control.

1. Áreas de reducción:
- Eliminación publicidad política
- Limitación campañas institucionales
- Control estricto de gastos
- Centralización de contratación

2. Desglose de ahorro:
- Reducción campañas: 150M€/año
- Eficiencia en contratación: 100M€/año
- Eliminación duplicidades: 50M€/año

3. Referencias internacionales:
- Reino Unido: Tope publicidad 2010
- Holanda: Sistema centralizado
- Canadá: Control parlamentario

4. Implementación:
- Mes 1-2: Auditoría completa
- Mes 3-4: Nueva normativa
- Mes 5-6: Sistema control
- Mes 7-12: Seguimiento

5. Controles:
- Portal transparencia
- Justificación obligatoria
- Evaluación impacto
- Supervisión independiente',
  'Control y reducción de gasto en publicidad institucional',
  300,
  'Comunicación',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),
(
  'Privatización de Infraestructuras Secundarias',
  'España mantiene numerosas infraestructuras deficitarias que podrían ser gestionadas más eficientemente por el sector privado. Se propone un programa de concesiones y privatizaciones selectivas.

1. Infraestructuras objetivo:
- 20 aeropuertos deficitarios
- 15 puertos deportivos
- 25 líneas ferroviarias baja demanda
- 10 centros logísticos

2. Impacto económico:
- Ahorro en operación: 400M€/año
- Ingresos concesiones: 300M€/año
- Venta activos: 300M€
- Inversión privada: 2.000M€

3. Casos de éxito:
- Australia: Aeropuertos 1997-2003
- Reino Unido: Puertos 1983-1997
- Brasil: Concesiones 2012-2019

4. Proceso:
- Fase 1: Due diligence (6 meses)
- Fase 2: Marco regulatorio (6 meses)
- Fase 3: Licitaciones (12 meses)
- Fase 4: Transición (6 meses)

5. Salvaguardas:
- Niveles servicio mínimos
- Control tarifario
- Inversión obligatoria
- Reversión por incumplimiento',
  'Programa de privatización selectiva de infraestructuras',
  1000,
  'Infraestructuras',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
);

-- Actualizar índices si es necesario
CREATE INDEX IF NOT EXISTS proposals_created_at_idx ON proposals(created_at DESC);
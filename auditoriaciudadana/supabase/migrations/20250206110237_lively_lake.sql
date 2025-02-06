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
  'Racionalización del Modelo Autonómico',
  'El actual sistema autonómico español presenta numerosas duplicidades que generan sobrecostes estimados en más de 24.000M€ anuales. Esta propuesta plantea una reorganización integral del sistema.

1. Áreas de actuación:
- Eliminación de organismos duplicados (defensores del pueblo, tribunales de cuentas, etc.)
- Centralización de compras y servicios comunes
- Unificación de criterios y procedimientos
- Simplificación administrativa

2. Ahorros detallados:
- Eliminación de duplicidades: 1.200M€/año
- Compras centralizadas: 800M€/año
- Optimización de personal: 600M€/año
- Eficiencia administrativa: 400M€/año

3. Experiencias internacionales:
- Alemania: Reforma federal 2006
- Austria: Convenio de coordinación 2012
- Canadá: Acuerdo interprovincial 2016

4. Fases de implementación:
- Mes 1-6: Análisis y planificación
- Mes 7-12: Marco legal
- Mes 13-24: Ejecución por fases
- Mes 25-30: Evaluación

5. Garantías:
- Respeto marco constitucional
- Mantenimiento servicios esenciales
- Coordinación interterritorial',
  'Plan de reorganización y optimización de competencias autonómicas',
  3000,
  'Administración',
  'autonomico',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),
(
  'Sistema Mixto de Pensiones',
  'El sistema actual de pensiones es insostenible, con un déficit estructural superior a 18.000M€ anuales. Se propone una transición hacia un sistema mixto que combine reparto y capitalización.

1. Componentes del nuevo sistema:
- Pensión básica universal (Estado)
- Cuenta individual obligatoria
- Planes complementarios voluntarios
- Fondo de reserva reforzado

2. Proyección de ahorros:
- Reducción déficit estructural: 6.000M€/año
- Eficiencia administrativa: 500M€/año
- Retornos de inversión: 3.500M€/año

3. Modelos de referencia:
- Suecia: Sistema nocional desde 1999
- Chile: Sistema mixto reformado
- Holanda: Complementariedad público-privada

4. Plan de transición:
- Año 1-2: Marco legal y preparación
- Año 3-5: Implementación gradual
- Año 6-15: Transición completa
- Año 16+: Sistema consolidado

5. Protecciones:
- Garantía de pensión mínima
- Supervisión estatal
- Inversiones reguladas
- Portabilidad de derechos',
  'Transición hacia un sistema mixto de pensiones',
  10000,
  'Pensiones',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),
(
  'Eliminación de Organismos Superfluos',
  'España cuenta con más de 2.000 organismos públicos, muchos con funciones duplicadas o sin clara utilidad. Se propone un programa de racionalización y eliminación.

1. Organismos a suprimir:
- Observatorios redundantes
- Fundaciones sin actividad real
- Institutos duplicados
- Consejos consultivos innecesarios

2. Impacto económico:
- Ahorro en personal: 250M€/año
- Reducción gastos operativos: 150M€/año
- Venta de activos: 200M€

3. Ejemplos internacionales:
- Reino Unido: "Bonfire of Quangos" 2010
- Irlanda: Agency Rationalisation 2008
- Portugal: PRACE 2006

4. Metodología:
- Fase 1: Inventario completo
- Fase 2: Evaluación de utilidad
- Fase 3: Plan de cierre
- Fase 4: Reasignación recursos

5. Salvaguardas:
- Mantenimiento funciones esenciales
- Reubicación de personal
- Preservación de archivos
- Transferencia de conocimiento',
  'Programa de eliminación de organismos innecesarios',
  600,
  'Administración',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
);

-- Actualizar índices si es necesario
CREATE INDEX IF NOT EXISTS proposals_created_at_idx ON proposals(created_at DESC);
/*
  # Update Proposals with Detailed Content

  1. Changes
    - Cleans existing data
    - Updates proposals with new detailed content
    - Ensures proper formatting and structure
  
  2. Security
    - Maintains existing RLS policies
    - No changes to access control
*/

-- Limpiar datos existentes
DELETE FROM votes;
DELETE FROM comments;
DELETE FROM proposals;

-- Insertar las propuestas actualizadas
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
  'Eliminación y Fusión de Ministerios',
  'La estructura actual del gobierno español cuenta con 23 ministerios, generando duplicidades y gastos innecesarios. Se propone una reestructuración que reduciría el número a 12 ministerios mediante fusiones estratégicas:

1. Fusiones propuestas:
- Agricultura y Transición Ecológica
- Cultura y Educación
- Inclusión y Derechos Sociales
- Industria y Ciencia

2. Ahorros detallados:
- Eliminación de 1.200 puestos de asesores: 72M€/año
- Reducción de altos cargos: 156M€/año
- Optimización de edificios: 280M€/año
- Reducción de gastos operativos: 492M€/año
- Eficiencia en contratación: 1.000M€/año

3. Casos de éxito:
- Reino Unido 2010: Reducción de 25 a 15 ministerios
- Canadá 2011: Fusión de departamentos con 15% de ahorro
- Australia 2013: Reorganización con ahorro del 20%

4. Cronograma:
- Mes 1-3: Análisis y planificación
- Mes 4-6: Aprobación legal
- Mes 7-12: Implementación por fases
- Mes 13-18: Evaluación y ajustes

5. Medidas de mitigación:
- Plan de reubicación para funcionarios
- Programa de digitalización
- Sistema de evaluación continua',
  'Plan detallado de fusión de ministerios y optimización de recursos',
  2000,
  'Administración',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),
(
  'Privatización de Empresas Públicas Deficitarias',
  'España mantiene numerosas empresas públicas que generan pérdidas millonarias anuales y requieren constantes inyecciones de dinero público. Esta propuesta plantea un programa sistemático de privatización o cierre de empresas públicas no estratégicas que sean crónicamente deficitarias.

1. Empresas objetivo:
- Radiotelevisiones autonómicas deficitarias
- Líneas ferroviarias de baja demanda
- Empresas turísticas públicas
- Agencias de desarrollo regional

2. Ahorros detallados:
- Eliminación de subvenciones: 450M€/año
- Venta de activos: 250M€
- Reducción de deuda pública: 300M€/año

3. Casos internacionales:
- Nueva Zelanda: Privatización 1980s con ahorro del 25%
- Suecia: Reforma postal con mejora de servicio
- Alemania: Deutsche Bahn con modelo mixto

4. Plan de implementación:
- Fase 1: Auditoría y valoración (6 meses)
- Fase 2: Preparación para venta (12 meses)
- Fase 3: Proceso de venta (18 meses)
- Fase 4: Transición y seguimiento (6 meses)

5. Protecciones:
- Garantías laborales para empleados
- Mantenimiento de servicios esenciales
- Regulación de precios en sectores clave',
  'Programa de privatización y reestructuración de empresas públicas',
  1000,
  'Empresas Públicas',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),
(
  'Reducción de Cargos de Confianza',
  'La administración española cuenta actualmente con más de 25.000 asesores y cargos de confianza, generando un gasto excesivo y duplicidades innecesarias.

1. Situación actual:
- 25.000 asesores en diferentes niveles
- Coste medio por asesor: 45.000€/año
- Duplicidad de funciones: 40%
- Sin requisitos técnicos específicos

2. Medidas propuestas:
- Reducción del 60% de asesores
- Requisitos técnicos obligatorios
- Limitación por institución
- Sistema de evaluación

3. Experiencias similares:
- Francia: -30% en 2017
- Italia: -40% en 2014
- Portugal: -35% en 2011

4. Implementación:
- Mes 1-3: Auditoría
- Mes 4-6: Marco legal
- Mes 7-12: Ejecución
- Mes 13-15: Evaluación

5. Garantías:
- Proceso transparente
- Criterios técnicos
- Evaluación continua',
  'Reducción y profesionalización de asesores políticos',
  500,
  'Administración',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS proposals_level_idx ON proposals(level);
CREATE INDEX IF NOT EXISTS proposals_category_idx ON proposals(category);
CREATE INDEX IF NOT EXISTS proposals_savings_idx ON proposals(savings DESC);
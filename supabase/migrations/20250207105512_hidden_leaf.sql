-- Drop problematic functions and triggers
DROP FUNCTION IF EXISTS enforce_rate_limit() CASCADE;
DROP FUNCTION IF EXISTS record_audit_log() CASCADE;

-- Clean existing data
TRUNCATE TABLE proposals CASCADE;

-- Insert sample proposals
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
- Australia 2013: Reorganización con ahorro del 20%',
  'Plan detallado de fusión de ministerios y optimización de recursos',
  2000,
  'Administración',
  'nacional',
  'Administrador',
  now() - interval '5 days',
  now() - interval '5 days'
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
- Alemania: Deutsche Bahn con modelo mixto',
  'Programa de privatización y reestructuración de empresas públicas',
  1000,
  'Empresas Públicas',
  'nacional',
  'Administrador',
  now() - interval '4 days',
  now() - interval '4 days'
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
- Holanda: Complementariedad público-privada',
  'Transición hacia un sistema mixto de pensiones',
  10000,
  'Pensiones',
  'nacional',
  'Administrador',
  now() - interval '3 days',
  now() - interval '3 days'
),
(
  'Racionalización del Modelo Autonómico',
  'El actual sistema autonómico español presenta numerosas duplicidades que generan sobrecostes estimados en más de 24.000M€ anuales. Esta propuesta plantea una reorganización integral del sistema.

1. Áreas de actuación:
- Eliminación de organismos duplicados
- Centralización de compras y servicios comunes
- Unificación de criterios y procedimientos
- Simplificación administrativa

2. Ahorros detallados:
- Eliminación de duplicidades: 1.200M€/año
- Compras centralizadas: 800M€/año
- Optimización de personal: 600M€/año
- Eficiencia administrativa: 400M€/año',
  'Plan de reorganización y optimización de competencias autonómicas',
  3000,
  'Administración',
  'autonomico',
  'Administrador',
  now() - interval '2 days',
  now() - interval '2 days'
),
(
  'Fusión de Ayuntamientos Pequeños',
  'España tiene 8.131 municipios, de los cuales 5.002 tienen menos de 1.000 habitantes, generando ineficiencias y duplicidades. Se propone un plan de fusiones voluntarias.

1. Acciones principales:
- Fusión de municipios < 5.000 habitantes
- Mancomunidad de servicios
- Centralización administrativa
- Digitalización de servicios

2. Ahorros detallados:
- Reducción de cargos: 200M€/año
- Eficiencia en servicios: 400M€/año
- Optimización de recursos: 200M€/año',
  'Programa de fusión voluntaria de municipios pequeños',
  800,
  'Administración',
  'municipal',
  'Administrador',
  now() - interval '1 day',
  now() - interval '1 day'
);
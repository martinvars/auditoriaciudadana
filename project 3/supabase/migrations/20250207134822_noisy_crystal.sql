-- Insertar todas las propuestas históricas
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
  now() - interval '10 days',
  now() - interval '10 days'
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
  now() - interval '9 days',
  now() - interval '9 days'
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
  now() - interval '8 days',
  now() - interval '8 days'
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
  now() - interval '7 days',
  now() - interval '7 days'
),
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
- Eficiencia servicios: 500M€/año',
  'Plan de eliminación gradual de diputaciones provinciales',
  3000,
  'Administración',
  'autonomico',
  'Administrador',
  now() - interval '6 days',
  now() - interval '6 days'
),
(
  'Centralización de Compras Sanitarias',
  'El sistema sanitario español gasta más de 10.000M€ anuales en medicamentos y material sanitario, con 17 sistemas de compra diferentes. Se propone un sistema centralizado de compras.

1. Áreas de centralización:
- Medicamentos hospitalarios
- Material sanitario
- Equipamiento médico
- Servicios comunes

2. Ahorros detallados:
- Economías de escala: 1.200M€/año
- Eficiencia logística: 500M€/año
- Reducción administrativa: 300M€/año

3. Experiencias similares:
- Portugal: SPMS (25% ahorro)
- Italia: Consip (20% ahorro)
- Suecia: Modelo regional (15% ahorro)',
  'Sistema nacional centralizado de compras sanitarias',
  2000,
  'Sanidad',
  'nacional',
  'Administrador',
  now() - interval '5 days',
  now() - interval '5 days'
),
(
  'Reforma Integral del Subsidio de Desempleo',
  'El sistema actual de prestaciones por desempleo genera un gasto anual de 30.000M€ con baja tasa de reincorporación laboral. Se propone una reforma integral que incentive la búsqueda activa de empleo.

1. Medidas principales:
- Prestación decreciente en el tiempo
- Formación obligatoria personalizada
- Control efectivo de búsqueda
- Incentivos a la contratación

2. Ahorros estimados:
- Reducción prestaciones: 1.200M€/año
- Eficiencia administrativa: 300M€/año
- Menor fraude: 500M€/año',
  'Reforma del sistema de prestaciones por desempleo',
  2000,
  'Empleo',
  'nacional',
  'Administrador',
  now() - interval '4 days',
  now() - interval '4 days'
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
- Eficiencia proceso: 500M€/año',
  'Sistema integral de contratación pública electrónica',
  5000,
  'Contratación',
  'nacional',
  'Administrador',
  now() - interval '3 days',
  now() - interval '3 days'
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
- Tiempo ciudadanos: 400M€/año',
  'Transformación digital completa de la administración',
  2000,
  'Administración',
  'nacional',
  'Administrador',
  now() - interval '2 days',
  now() - interval '2 days'
);
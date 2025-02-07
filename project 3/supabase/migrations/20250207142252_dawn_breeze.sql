-- Insertar más propuestas nacionales
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
  'Reforma de la Administración Digital',
  'Propuesta para digitalizar completamente la administración pública, eliminando el papel y automatizando procesos.

1. Objetivos principales:
- Eliminación total del papel
- Automatización de procesos
- Ventanilla única digital
- Interoperabilidad total

2. Ahorros estimados:
- Reducción personal: 800M€/año
- Eficiencia procesos: 600M€/año
- Ahorro material: 200M€/año

3. Referencias internacionales:
- Estonia: e-Government
- Singapur: Smart Nation
- Dinamarca: Digital First',
  'Plan de transformación digital de la administración',
  1600,
  'Administración',
  'nacional',
  'Administrador',
  now(),
  now()
),
(
  'Optimización del Sistema Judicial',
  'Plan para modernizar y hacer más eficiente la administración de justicia mediante la digitalización y reorganización.

1. Medidas clave:
- Expediente judicial electrónico
- Videoconferencias para vistas menores
- Automatización de procesos
- Reorganización de juzgados

2. Ahorros previstos:
- Eficiencia procesal: 400M€/año
- Reducción costes: 300M€/año
- Optimización recursos: 300M€/año

3. Modelos de referencia:
- Estonia: e-Justice
- Países Bajos: Digital Courts
- Singapur: Smart Courts',
  'Modernización de la administración de justicia',
  1000,
  'Justicia',
  'nacional',
  'Administrador',
  now(),
  now()
);

-- Insertar más propuestas autonómicas
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
  'Reforma Sanitaria Autonómica',
  'Propuesta para optimizar el sistema sanitario autonómico mediante la centralización de servicios y mejora de la eficiencia.

1. Áreas de actuación:
- Compras centralizadas
- Historia clínica única
- Servicios compartidos
- Especialización centros

2. Ahorros detallados:
- Compras conjuntas: 500M€/año
- Eficiencia operativa: 300M€/año
- Optimización recursos: 200M€/año

3. Referencias:
- NHS Reino Unido
- Sistema sueco
- Sanidad danesa',
  'Plan de optimización sanitaria',
  1000,
  'Sanidad',
  'autonomico',
  'Administrador',
  now(),
  now()
),
(
  'Modernización Educativa Regional',
  'Plan para mejorar la eficiencia del sistema educativo autonómico mediante la digitalización y optimización de recursos.

1. Elementos clave:
- Plataforma digital única
- Recursos compartidos
- Formación online
- Evaluación continua

2. Impacto económico:
- Eficiencia docente: 300M€/año
- Recursos digitales: 200M€/año
- Optimización centros: 200M€/año

3. Modelos exitosos:
- Finlandia
- Corea del Sur
- Singapur',
  'Transformación del sistema educativo',
  700,
  'Educación',
  'autonomico',
  'Administrador',
  now(),
  now()
);

-- Insertar más propuestas municipales
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
  'Smart City Municipal',
  'Proyecto para convertir los municipios en ciudades inteligentes, optimizando servicios y recursos mediante tecnología.

1. Áreas de implementación:
- Alumbrado inteligente
- Gestión de residuos
- Tráfico adaptativo
- Sensores ambientales

2. Ahorros estimados:
- Energía: 200M€/año
- Operativa: 150M€/año
- Mantenimiento: 150M€/año

3. Ejemplos internacionales:
- Ámsterdam
- Copenhague
- Barcelona',
  'Transformación digital urbana',
  500,
  'Tecnología',
  'municipal',
  'Administrador',
  now(),
  now()
),
(
  'Optimización de Servicios Deportivos',
  'Plan para mejorar la eficiencia de las instalaciones y servicios deportivos municipales.

1. Medidas propuestas:
- Gestión centralizada
- Reservas online
- Mantenimiento preventivo
- Energía renovable

2. Ahorros previstos:
- Gestión eficiente: 100M€/año
- Energía: 50M€/año
- Personal: 50M€/año

3. Referencias:
- Modelo nórdico
- Sistema alemán
- Ejemplos británicos',
  'Modernización de instalaciones deportivas',
  200,
  'Deportes',
  'municipal',
  'Administrador',
  now(),
  now()
);
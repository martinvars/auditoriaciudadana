-- Insert new national level proposals
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
  'Optimización de Estructura Ministerial',
  'Se propone una reorganización de la estructura ministerial para mejorar la eficiencia y reducir duplicidades administrativas. La propuesta incluye la fusión de ministerios con funciones complementarias y la eliminación de estructuras redundantes.

1. Medidas específicas:
- Fusión de ministerios con funciones afines
- Reducción de estructura administrativa
- Optimización de recursos humanos
- Digitalización de procesos

2. Desglose del ahorro:
- Reducción de altos cargos: 156M€
- Optimización de personal: 217M€
- Eficiencia en gestión: 200M€

3. Ejemplos internacionales:
- Reino Unido: Reforma 2010
- Canadá: Reestructuración 2011
- Australia: Optimización 2013',
  'Plan de reorganización ministerial y optimización administrativa',
  573,
  'Administración',
  'nacional',
  'Administrador',
  now(),
  now()
),
(
  'Racionalización de Subvenciones a Organizaciones',
  'Propuesta para revisar y optimizar el sistema de subvenciones públicas, enfocando los recursos en proyectos con impacto social medible y retorno demostrable para la sociedad.

1. Áreas de actuación:
- Evaluación de impacto social
- Criterios objetivos de asignación
- Sistema de seguimiento
- Auditoría de resultados

2. Ahorro estimado por áreas:
- Eliminación duplicidades: 800M€
- Optimización asignaciones: 700M€
- Mejora eficiencia: 500M€

3. Referencias internacionales:
- Holanda: Sistema de evaluación
- Dinamarca: Modelo de impacto
- Nueva Zelanda: Marco de resultados',
  'Reforma del sistema de subvenciones públicas',
  2000,
  'Subvenciones',
  'nacional',
  'Administrador',
  now(),
  now()
),
(
  'Modernización de Medios Públicos',
  'Plan integral para transformar RTVE en una corporación más eficiente y sostenible, optimizando recursos y modernizando su modelo de gestión.

1. Elementos clave:
- Nuevo modelo de financiación
- Optimización de recursos
- Modernización tecnológica
- Eficiencia operativa

2. Desglose de ahorro:
- Reducción costes operativos: 200M€
- Eficiencia en producción: 150M€
- Optimización estructura: 150M€

3. Modelos de referencia:
- BBC (Reino Unido)
- ZDF (Alemania)
- NHK (Japón)',
  'Transformación y optimización de medios públicos',
  500,
  'Comunicación',
  'nacional',
  'Administrador',
  now(),
  now()
);

-- Insert new autonomic level proposals
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
  'Optimización de Representación Internacional Autonómica',
  'Propuesta para racionalizar la representación internacional de las comunidades autónomas, eliminando duplicidades con la red exterior del Estado.

1. Medidas concretas:
- Coordinación con red estatal
- Oficinas compartidas
- Servicios centralizados
- Eventos coordinados

2. Ahorro detallado:
- Cierre oficinas duplicadas: 300M€
- Optimización personal: 150M€
- Eficiencia operativa: 50M€

3. Ejemplos internacionales:
- Länder alemanes
- Cantones suizos
- Regiones italianas',
  'Racionalización de oficinas autonómicas en el exterior',
  500,
  'Administración',
  'autonomico',
  'Administrador',
  now(),
  now()
),
(
  'Reforma de Empresas Públicas Autonómicas',
  'Plan integral para optimizar el sector público empresarial autonómico, centrándose en la eficiencia y sostenibilidad financiera.

1. Objetivos:
- Análisis de viabilidad
- Reestructuración eficiente
- Optimización de recursos
- Modernización gestión

2. Impacto económico:
- Reducción pérdidas: 600M€
- Eficiencia operativa: 400M€
- Venta activos: Según valoración

3. Casos de éxito:
- Reforma regional italiana
- Länder alemanes
- Comunidades belgas',
  'Optimización del sector público empresarial autonómico',
  1000,
  'Empresas Públicas',
  'autonomico',
  'Administrador',
  now(),
  now()
);

-- Insert new municipal level proposals
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
  'Modernización de Servicios Municipales',
  'Propuesta para optimizar los servicios municipales mediante la digitalización y la mejora de la eficiencia operativa.

1. Áreas de mejora:
- Digitalización servicios
- Optimización procesos
- Formación personal
- Atención ciudadana

2. Ahorro previsto:
- Eficiencia operativa: 80M€
- Reducción costes: 50M€
- Optimización recursos: 20M€

3. Referencias:
- Smart Cities europeas
- Ciudades digitales asiáticas
- Municipios nórdicos',
  'Transformación digital de servicios municipales',
  150,
  'Administración',
  'municipal',
  'Administrador',
  now(),
  now()
),
(
  'Optimización de Gestión Municipal',
  'Plan para mejorar la eficiencia en la gestión municipal mediante la racionalización de estructuras y modernización de procesos.

1. Medidas principales:
- Simplificación administrativa
- Servicios compartidos
- Gestión eficiente
- Control de costes

2. Desglose ahorro:
- Reducción estructura: 300M€
- Eficiencia operativa: 200M€
- Optimización servicios: 100M€

3. Modelos exitosos:
- Municipios holandeses
- Ayuntamientos daneses
- Comunas suizas',
  'Reforma de la administración municipal',
  600,
  'Administración',
  'municipal',
  'Administrador',
  now(),
  now()
);
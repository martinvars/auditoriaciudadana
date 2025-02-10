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
  'Optimización y Reorganización Ministerial',
  'Se propone una reorganización integral de la estructura ministerial para mejorar la eficiencia administrativa y reducir costes innecesarios.

1. Análisis de la situación:
- Estructura actual sobredimensionada
- Duplicidad de funciones
- Exceso de cargos directivos
- Ineficiencias operativas

2. Plan de implementación:
- Fusión de departamentos complementarios
- Reasignación de personal cualificado
- Digitalización de procesos
- Optimización de recursos

3. Desglose del ahorro:
- Reducción estructura directiva: 200M€
- Optimización personal: 173M€
- Eficiencia operativa: 200M€

4. Referencias internacionales:
- Reino Unido: Reforma administrativa 2010
- Australia: Modernización ministerial 2013
- Canadá: Reestructuración 2011',
  'Plan integral de reorganización administrativa',
  573,
  'Administración',
  'nacional',
  'Administrador',
  now(),
  now()
),
(
  'Reforma del Sistema de Subvenciones',
  'Propuesta para racionalizar el sistema de subvenciones públicas, priorizando proyectos con impacto social medible y retorno verificable.

1. Situación actual:
- Sistema poco transparente
- Falta de métricas de impacto
- Duplicidad de ayudas
- Ineficiencia en asignación

2. Medidas propuestas:
- Auditoría completa del sistema
- Criterios objetivos de asignación
- Sistema de evaluación continua
- Transparencia total

3. Ahorro detallado:
- Eliminación duplicidades: 1.200M€
- Optimización asignaciones: 800M€

4. Ejemplos internacionales:
- Nueva Zelanda: Sistema basado en resultados
- Países Bajos: Modelo de impacto social
- Dinamarca: Evaluación transparente',
  'Optimización del sistema de subvenciones públicas',
  2000,
  'Subvenciones',
  'nacional',
  'Administrador',
  now(),
  now()
),
(
  'Modernización de Medios de Comunicación Públicos',
  'Plan para transformar los medios públicos en entidades más eficientes y sostenibles financieramente.

1. Diagnóstico:
- Costes operativos elevados
- Modelo de gestión mejorable
- Necesidad de modernización
- Duplicidad de recursos

2. Propuesta de reforma:
- Nuevo modelo de financiación mixta
- Optimización de recursos técnicos
- Modernización tecnológica
- Eficiencia en producción

3. Impacto económico:
- Reducción costes: 250M€
- Eficiencia operativa: 150M€
- Optimización recursos: 100M€

4. Modelos de referencia:
- BBC (Reino Unido)
- ARD/ZDF (Alemania)
- NHK (Japón)',
  'Transformación de medios públicos',
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
  'Racionalización de Representación Exterior Autonómica',
  'Plan para optimizar la representación internacional de las comunidades autónomas, eliminando duplicidades con la red exterior del Estado.

1. Situación actual:
- Duplicidad de funciones
- Costes innecesarios
- Falta de coordinación
- Ineficiencia en recursos

2. Plan de acción:
- Cierre de oficinas redundantes
- Coordinación con red estatal
- Servicios compartidos
- Eventos coordinados

3. Ahorro estimado:
- Cierre delegaciones: 300M€
- Optimización personal: 150M€
- Eficiencia operativa: 50M€

4. Referencias internacionales:
- Länder alemanes
- Cantones suizos
- Regiones italianas',
  'Optimización de representación exterior',
  500,
  'Administración',
  'autonomico',
  'Administrador',
  now(),
  now()
),
(
  'Optimización de Empresas Públicas Autonómicas',
  'Programa de reestructuración del sector público empresarial autonómico para mejorar su eficiencia y sostenibilidad.

1. Análisis inicial:
- Evaluación de viabilidad
- Auditoría de gestión
- Análisis de mercado
- Estudio de alternativas

2. Medidas propuestas:
- Reestructuración empresarial
- Optimización de recursos
- Modernización gestión
- Planes de viabilidad

3. Impacto económico:
- Reducción pérdidas: 600M€
- Eficiencia operativa: 400M€

4. Casos de éxito:
- Reforma regional italiana
- Länder alemanes
- Regiones francesas',
  'Reforma del sector público empresarial',
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
  'Reforma de la Administración Municipal',
  'Plan integral para optimizar la estructura y funcionamiento de la administración municipal.

1. Situación actual:
- Estructura sobredimensionada
- Procesos ineficientes
- Duplicidad de funciones
- Costes elevados

2. Medidas propuestas:
- Reducción de cargos
- Simplificación administrativa
- Digitalización servicios
- Optimización recursos

3. Ahorro previsto:
- Reducción estructura: 400M€
- Eficiencia operativa: 200M€

4. Referencias:
- Municipios holandeses
- Ayuntamientos daneses
- Comunas suizas',
  'Optimización de la administración local',
  600,
  'Administración',
  'municipal',
  'Administrador',
  now(),
  now()
),
(
  'Modernización de Servicios Municipales',
  'Propuesta para optimizar y digitalizar los servicios municipales mejorando su eficiencia y reduciendo costes.

1. Objetivos:
- Digitalización integral
- Eficiencia operativa
- Mejora servicio
- Reducción costes

2. Plan de acción:
- Implementación tecnológica
- Formación personal
- Reingeniería procesos
- Evaluación continua

3. Impacto económico:
- Ahorro operativo: 300M€
- Eficiencia digital: 200M€

4. Modelos exitosos:
- Smart Cities europeas
- Municipios nórdicos
- Ciudades digitales asiáticas',
  'Transformación digital municipal',
  500,
  'Administración',
  'municipal',
  'Administrador',
  now(),
  now()
);
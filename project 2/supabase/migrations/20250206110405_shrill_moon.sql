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
- Menor fraude: 500M€/año

3. Modelos de referencia:
- Dinamarca: Flexiseguridad
- Alemania: Reforma Hartz IV
- Holanda: Sistema WW

4. Implementación:
- Fase 1: Marco normativo (6 meses)
- Fase 2: Sistema informático (6 meses)
- Fase 3: Formación personal (6 meses)
- Fase 4: Despliegue gradual (12 meses)

5. Protecciones:
- Garantía de ingreso mínimo
- Ayudas familiares
- Casos especiales
- Evaluación continua',
  'Reforma del sistema de prestaciones por desempleo',
  2000,
  'Empleo',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),
(
  'Externalización de Servicios Penitenciarios',
  'La gestión de servicios auxiliares en prisiones supone un coste anual superior a 800M€. Se propone externalizar servicios no esenciales manteniendo la seguridad bajo control estatal.

1. Servicios a externalizar:
- Alimentación y cocina
- Limpieza y lavandería
- Mantenimiento instalaciones
- Formación y talleres
- Servicios médicos rutinarios

2. Impacto económico:
- Ahorro en personal: 100M€/año
- Eficiencia operativa: 60M€/año
- Mejora servicios: 40M€/año

3. Experiencias internacionales:
- Reino Unido: Modelo mixto
- Francia: Servicios auxiliares
- Australia: Gestión delegada

4. Cronograma:
- Mes 1-3: Estudio detallado
- Mes 4-6: Licitaciones
- Mes 7-12: Implementación piloto
- Mes 13-24: Expansión nacional

5. Garantías:
- Estándares de calidad
- Derechos laborales
- Supervisión continua
- Cláusulas rescisión',
  'Externalización de servicios auxiliares en prisiones',
  200,
  'Justicia',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),
(
  'Digitalización de la Seguridad Social',
  'La administración de la Seguridad Social mantiene procesos manuales y estructuras redundantes que generan ineficiencias. Se propone una transformación digital integral.

1. Áreas de actuación:
- Automatización de trámites
- Ventanilla única digital
- Integración de bases de datos
- Eliminación papel
- IA para gestión

2. Ahorros previstos:
- Reducción personal: 200M€/año
- Eficiencia procesos: 150M€/año
- Ahorro material: 50M€/año

3. Casos de éxito:
- Estonia: e-government
- Singapur: Smart Nation
- Suecia: Digital First

4. Plan de implantación:
- Fase 1: Infraestructura (12 meses)
- Fase 2: Migración datos (6 meses)
- Fase 3: Formación (6 meses)
- Fase 4: Despliegue (12 meses)

5. Medidas complementarias:
- Asistencia presencial reducida
- Formación ciudadana
- Soporte multicanal
- Seguridad reforzada',
  'Transformación digital de la Seguridad Social',
  400,
  'Administración',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
);

-- Actualizar índices si es necesario
CREATE INDEX IF NOT EXISTS proposals_created_at_idx ON proposals(created_at DESC);
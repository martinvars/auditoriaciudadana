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
);

-- No borrar las propuestas existentes
-- Mantener las propuestas anteriores
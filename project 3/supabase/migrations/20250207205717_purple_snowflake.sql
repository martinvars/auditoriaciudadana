-- Insert new autonomic spending proposal
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
  'Optimización de Organismos Autonómicos',
  'Las comunidades autónomas han creado numerosos organismos, agencias y empresas públicas que generan duplicidades y gastos innecesarios. Se propone una reorganización integral para mejorar la eficiencia.

1. Situación actual:
- Más de 2.000 organismos autonómicos
- Múltiples agencias con funciones similares
- Elevados costes de estructura
- Baja eficiencia operativa
- Duplicidad con organismos estatales

2. Medidas propuestas:
- Auditoría integral de organismos
- Fusión de entidades redundantes
- Eliminación de duplicidades
- Simplificación administrativa
- Digitalización de servicios

3. Plan de implementación:
- Fase 1 (6 meses): Inventario y análisis
- Fase 2 (12 meses): Reestructuración
- Fase 3 (12 meses): Integración de sistemas
- Fase 4 (6 meses): Optimización final

4. Desglose del ahorro:
- Reducción estructuras: 600M€/año
- Eficiencia operativa: 400M€/año
- Servicios compartidos: 300M€/año
- Digitalización: 200M€/año

5. Referencias internacionales:
- Alemania: Reforma administrativa 2006
- Austria: Optimización regional 2010
- Bélgica: Reforma institucional 2011

6. Garantías y protecciones:
- Mantenimiento servicios esenciales
- Reubicación de personal
- Planes de formación
- Transición ordenada',
  'Plan de racionalización de organismos y agencias autonómicas',
  1500,
  'Administración',
  'autonomico',
  'Administrador',
  now(),
  now()
);
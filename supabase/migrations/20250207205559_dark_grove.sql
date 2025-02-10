-- Insert new municipal spending proposal
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
  'Optimización de Plantillas Municipales',
  'Los ayuntamientos españoles mantienen estructuras de personal sobredimensionadas y poco eficientes. Se propone una reorganización integral del personal municipal para mejorar la eficiencia y reducir costes innecesarios.

1. Situación actual:
- 8.131 ayuntamientos con plantillas propias
- Duplicidad de funciones entre áreas
- Exceso de personal eventual
- Procesos manuales ineficientes
- Servicios redundantes

2. Medidas propuestas:
- Análisis de cargas de trabajo
- Redistribución de personal
- Amortización de plazas vacantes
- Digitalización de procesos
- Formación en polivalencia

3. Plan de implementación:
- Fase 1 (6 meses): Auditoría y análisis
- Fase 2 (12 meses): Reorganización
- Fase 3 (6 meses): Digitalización
- Fase 4 (12 meses): Optimización

4. Desglose del ahorro:
- Amortización vacantes: 400M€/año
- Reducción eventuals: 300M€/año
- Eficiencia procesos: 200M€/año
- Servicios compartidos: 100M€/año

5. Referencias internacionales:
- Dinamarca: Reforma municipal 2007
- Holanda: Optimización local 2015
- Finlandia: Digitalización municipal 2019

6. Garantías y protecciones:
- Sin despidos de funcionarios
- Mantenimiento servicios esenciales
- Reubicación de personal
- Formación continua',
  'Plan de optimización de recursos humanos municipales',
  1000,
  'Administración',
  'municipal',
  'Administrador',
  now(),
  now()
);
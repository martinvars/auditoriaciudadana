-- Insert new national level proposal for reducing government drivers
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
  'Racionalización de Conductores Oficiales',
  'España mantiene una flota excesiva de conductores oficiales que genera gastos innecesarios. Se propone una reducción drástica manteniendo solo los servicios esenciales, siguiendo el modelo de otros países europeos donde este servicio es mínimo.

1. Situación actual:
- Gobierno central: 1.200 conductores
- Comunidades autónomas: 2.300 conductores (media 135 por CCAA)
- Coste medio por conductor: 45.000€/año
- Coste total actual: 157,5M€/año
- Vehículos oficiales: 3.500 aproximadamente

2. Propuesta de reducción:
- Gobierno central: reducir a 10 conductores (Presidente y vicepresidentes)
- CCAA: 4 conductores por comunidad (68 en total)
- Total propuesto: 78 conductores
- Ahorro en personal: 157,5M€ - 3,5M€ = 154M€/año

3. Ahorros adicionales:
- Reducción flota vehículos: 60M€/año
- Mantenimiento y combustible: 25M€/año
- Seguros y otros gastos: 15M€/año

4. Referencias internacionales:
- Alemania: Solo ministros principales tienen conductor
- Reino Unido: Reducción del 75% en 2010
- Suecia: Solo familia real y primer ministro
- Francia: Limitado a altos cargos desde 2012

5. Plan de implementación:
- Fase 1 (3 meses): Auditoría y planificación
- Fase 2 (6 meses): Reubicación de personal
- Fase 3 (3 meses): Venta de vehículos
- Fase 4 (6 meses): Optimización final

6. Medidas complementarias:
- Plan de recolocación para conductores
- Uso de servicios de taxi/VTC cuando necesario
- Digitalización de gestión de flotas
- Sistema de reservas eficiente',
  'Optimización del servicio de conductores oficiales',
  254,
  'Administración',
  'nacional',
  'Administrador',
  now(),
  now()
);
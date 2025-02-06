-- Actualizar el contenido y formato de las propuestas existentes
UPDATE proposals 
SET 
  description = CASE title
    WHEN 'Eliminación y Fusión de Ministerios' THEN
      'España tiene actualmente 23 ministerios, una cifra significativamente superior a la media de la OCDE (15 ministerios). Esta propuesta plantea una reorganización profunda del gobierno central para reducir el número de ministerios a 12, siguiendo ejemplos exitosos como Finlandia (12 ministerios) y Dinamarca (14 ministerios).

ANÁLISIS INTERNACIONAL:
• Reino Unido redujo de 25 a 15 ministerios en 2010, ahorrando 2.800M£
• Canadá fusionó departamentos en 2011, logrando un 15% de ahorro
• Australia reorganizó su administración en 2013, consiguiendo un 20% de reducción en costes

PLAN DE IMPLEMENTACIÓN:
1. Fusiones Estratégicas:
   • Ministerio de Transición Ecológica y Reto Demográfico + Agricultura = Ministerio de Sostenibilidad y Desarrollo Rural
   • Cultura y Deporte + Educación = Ministerio de Educación y Cultura
   • Inclusión + Derechos Sociales = Ministerio de Bienestar Social
   • Industria + Ciencia = Ministerio de Industria y Tecnología

2. Optimización de Recursos:
   • Eliminación de 1.200 puestos de asesores y cargos de confianza
   • Reducción del 40% en altos cargos
   • Venta o reutilización de 45 edificios administrativos
   • Centralización de servicios comunes
   • Digitalización integral de procesos

3. Cronograma Detallado:
   Fase 1 (6 meses): Planificación y marco legal
   Fase 2 (12 meses): Implementación por ministerios
   Fase 3 (6 meses): Evaluación y ajustes

DESGLOSE DE AHORROS:
• Personal político y asesores: 450M€
• Altos cargos y estructura: 550M€
• Inmuebles y mantenimiento: 400M€
• Eficiencia operativa: 600M€

GARANTÍAS Y PROTECCIONES:
• Mantenimiento del empleo público funcionarial
• Programa de reubicación y recualificación
• Sistema de evaluación continua de servicios
• Mecanismos de coordinación reforzados

La experiencia internacional demuestra que estas reformas, bien ejecutadas, mejoran la eficiencia sin comprometer la calidad del servicio público.'

    WHEN 'Privatización de Empresas Públicas Deficitarias' THEN
      'España cuenta con más de 400 empresas públicas que generan pérdidas anuales superiores a 2.500M€. Esta propuesta plantea un programa de privatización selectiva centrado en empresas no estratégicas con déficit crónico, basado en experiencias exitosas internacionales.

ANÁLISIS INTERNACIONAL:
• Nueva Zelanda (1984-1990): Privatizó 30 empresas estatales, reduciendo la deuda pública un 25%
• Suecia (1990s): Reforma del sector postal y telecomunicaciones, mejorando servicio y rentabilidad
• Alemania: Modelo mixto en Deutsche Bahn, manteniendo infraestructura pública
• Portugal (2011-2015): Programa de privatizaciones que generó 9.000M€

EMPRESAS OBJETIVO:
1. Medios de Comunicación:
   • 13 radiotelevisiones autonómicas deficitarias
   • Ahorro anual estimado: 1.000M€

2. Transporte:
   • 8 aeropuertos con menos de 500.000 pasajeros/año
   • 12 líneas ferroviarias con ocupación inferior al 15%
   • Ahorro anual: 600M€

3. Turismo y Ocio:
   • 15 empresas de gestión turística
   • 10 centros de convenciones
   • Ahorro anual: 200M€

4. Desarrollo Regional:
   • 8 agencias con funciones duplicadas
   • Ahorro anual: 200M€

PLAN DE IMPLEMENTACIÓN:
Fase 1 (6 meses):
• Auditoría detallada
• Valoración independiente
• Marco regulatorio

Fase 2 (12 meses):
• Reestructuración previa
• Saneamiento financiero
• Preparación para venta

Fase 3 (18 meses):
• Proceso de venta transparente
• Transición ordenada
• Supervisión post-venta

PROTECCIONES Y GARANTÍAS:
• Mantenimiento del servicio público esencial
• Planes sociales para empleados
• Límites a concentración empresarial
• Regulación de precios en servicios básicos
• Cláusulas de reversión por incumplimiento

BENEFICIOS ADICIONALES:
• Reducción de deuda pública
• Mejora de eficiencia
• Aumento de competitividad
• Ingresos por venta de activos

La propuesta se basa en criterios técnicos y experiencias probadas, garantizando la calidad del servicio y la protección del interés público.'

    ELSE description
  END,
  savings = CASE title
    WHEN 'Eliminación y Fusión de Ministerios' THEN 2000
    WHEN 'Privatización de Empresas Públicas Deficitarias' THEN 2000
    ELSE savings
  END;

-- Asegurar que todas las cifras de ahorro sean enteros
ALTER TABLE proposals 
  ALTER COLUMN savings TYPE integer USING (ROUND(savings));
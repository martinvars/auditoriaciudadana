-- Actualizar el formato de las cifras y expandir las descripciones
UPDATE proposals 
SET 
  savings = ROUND(savings::numeric, 3),
  description = CASE id
    WHEN (SELECT id FROM proposals WHERE title = 'Eliminación y Fusión de Ministerios' LIMIT 1) THEN
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
         - Australia 2013: Reorganización con ahorro del 20%

      4. Cronograma:
         - Mes 1-3: Análisis y planificación
         - Mes 4-6: Aprobación legal
         - Mes 7-12: Implementación por fases
         - Mes 13-18: Evaluación y ajustes

      5. Medidas de mitigación:
         - Plan de reubicación para funcionarios
         - Programa de digitalización
         - Sistema de evaluación continua
         
      La propuesta mantiene la calidad del servicio público mientras genera un ahorro significativo y sostenible.'
    
    WHEN (SELECT id FROM proposals WHERE title = 'Privatización de Empresas Públicas Deficitarias' LIMIT 1) THEN
      'España mantiene más de 400 empresas públicas que generan pérdidas anuales superiores a 2.500M€. Esta propuesta plantea un programa sistemático de privatización para empresas no estratégicas con déficit crónico.

      1. Empresas objetivo:
         - 15 radiotelevisiones autonómicas deficitarias
         - 23 empresas de transporte con baja demanda
         - 18 empresas de gestión turística
         - 12 agencias de desarrollo regional

      2. Ahorros detallados:
         - Eliminación de subvenciones: 450M€/año
         - Venta de activos: 250M€
         - Reducción de deuda pública: 300M€/año

      3. Casos internacionales:
         - Nueva Zelanda: Privatización 1980s con ahorro del 25%
         - Suecia: Reforma postal con mejora de servicio
         - Alemania: Deutsche Bahn con modelo mixto

      4. Plan de implementación:
         - Fase 1: Auditoría y valoración (6 meses)
         - Fase 2: Preparación para venta (12 meses)
         - Fase 3: Proceso de venta (18 meses)
         - Fase 4: Transición y seguimiento (6 meses)

      5. Protecciones:
         - Garantías laborales para empleados
         - Mantenimiento de servicios esenciales
         - Regulación de precios en sectores clave
         
      El plan incluye supervisión independiente y garantías de servicio público.'

    ELSE description
  END;

-- Actualizar el formato de visualización en el componente
CREATE OR REPLACE FUNCTION format_savings(amount numeric)
RETURNS text
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT TO_CHAR(amount, 'FM999,999.999');
$$;
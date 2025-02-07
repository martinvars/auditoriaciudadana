-- Actualizar el contenido de todas las propuestas con el nuevo formato
UPDATE proposals 
SET description = CASE title
    WHEN 'Reducción de Cargos de Confianza y Asesores' THEN
      'La administración española cuenta con más de 25.000 asesores y cargos de confianza, generando un gasto excesivo. Se propone una reducción drástica y profesionalización del servicio público.

1. Medidas específicas:
- Límite de asesores por cargo electo
- Requisitos de cualificación profesional
- Prohibición de contratar familiares
- Transparencia total en nombramientos

2. Ahorros detallados:
- Reducción de asesores: 180M€/año
- Eliminación de duplicidades: 120M€/año
- Optimización de recursos: 200M€/año

3. Casos de éxito:
- Francia 2017: Reducción del 30% en gabinetes
- Italia 2014: Límites estrictos a asesores
- Portugal 2011: Profesionalización del servicio

4. Cronograma:
- Mes 1-2: Auditoría de puestos
- Mes 3-4: Marco legal
- Mes 5-8: Implementación
- Mes 9-12: Evaluación

5. Garantías:
- Proceso de selección transparente
- Evaluación de desempeño
- Rotación periódica

La medida mejora la eficiencia y reduce el clientelismo político.'

    WHEN 'Fusión de Ayuntamientos Pequeños' THEN
      'España tiene 8.131 municipios, de los cuales 5.002 tienen menos de 1.000 habitantes, generando ineficiencias y duplicidades. Se propone un plan de fusiones voluntarias.

1. Acciones principales:
- Fusión de municipios < 5.000 habitantes
- Mancomunidad de servicios
- Centralización administrativa
- Digitalización de servicios

2. Ahorros detallados:
- Reducción de cargos: 200M€/año
- Eficiencia en servicios: 400M€/año
- Optimización de recursos: 200M€/año

3. Ejemplos internacionales:
- Dinamarca 2007: De 271 a 98 municipios
- Grecia 2011: De 1.034 a 325 municipios
- Japón 1999-2010: De 3.232 a 1.727

4. Implementación:
- Fase 1: Estudio y planificación
- Fase 2: Marco legal
- Fase 3: Fusiones piloto
- Fase 4: Expansión nacional

5. Incentivos:
- Bonificaciones fiscales
- Fondos adicionales
- Mejora de infraestructuras

El plan preserva la identidad local mientras mejora la eficiencia.'

    WHEN 'Eliminación de Subvenciones Políticas' THEN
      'Los partidos políticos, sindicatos y organizaciones empresariales reciben más de 500M€ anuales en subvenciones públicas. Se propone reducir drásticamente esta financiación.

1. Medidas concretas:
- Eliminación de subvenciones no electorales
- Tope máximo por votante
- Auditorías independientes
- Transparencia total

2. Desglose de ahorro:
- Partidos políticos: 150M€/año
- Sindicatos: 100M€/año
- Patronales: 50M€/año

3. Referencias internacionales:
- Holanda: Sin financiación directa
- EE.UU.: Sistema mixto
- Reino Unido: Límites estrictos

4. Plan de acción:
- Mes 1-3: Marco legal
- Mes 4-6: Transición
- Mes 7-12: Implementación

5. Controles:
- Portal de transparencia
- Límites a donaciones
- Supervisión independiente

La medida fomenta la independencia y reduce el gasto público.'

    ELSE description
END
WHERE title IN (
    'Reducción de Cargos de Confianza y Asesores',
    'Fusión de Ayuntamientos Pequeños',
    'Eliminación de Subvenciones Políticas'
);
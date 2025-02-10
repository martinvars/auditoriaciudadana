-- Update proposal savings to more realistic values
UPDATE proposals 
SET savings = CASE 
  WHEN title = 'Sistema Mixto de Pensiones' THEN 6000
  WHEN title = 'Centralización de Compras Sanitarias' THEN 2500
  WHEN title = 'Sistema de Contratación Transparente' THEN 3500
  WHEN title = 'Fusión de Ayuntamientos Pequeños' THEN 1000
  ELSE savings
END;
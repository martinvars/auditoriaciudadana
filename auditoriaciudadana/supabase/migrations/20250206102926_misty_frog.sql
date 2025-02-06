/*
  # Insertar propuestas de ahorro y habilitar interacciones

  1. Datos
    - Insertar 20 propuestas detalladas de ahorro
    - Asegurar que los votos y comentarios funcionen sin registro

  2. Seguridad
    - Actualizar políticas RLS para permitir votos y comentarios anónimos
    - Mantener la visibilidad pública de todas las interacciones
*/

-- Limpiar datos existentes
DELETE FROM votes;
DELETE FROM comments;
DELETE FROM proposals;

-- Actualizar políticas de RLS para votos
DROP POLICY IF EXISTS "Users can vote" ON votes;
DROP POLICY IF EXISTS "Users can change their vote" ON votes;
DROP POLICY IF EXISTS "Everyone can view votes" ON votes;

CREATE POLICY "Anyone can vote"
  ON votes FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can change vote"
  ON votes FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can view votes"
  ON votes FOR SELECT
  TO anon, authenticated
  USING (true);

-- Actualizar políticas de RLS para comentarios
DROP POLICY IF EXISTS "Users can comment" ON comments;
DROP POLICY IF EXISTS "Users can edit their comments" ON comments;
DROP POLICY IF EXISTS "Everyone can view comments" ON comments;

CREATE POLICY "Anyone can comment"
  ON comments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can edit comments"
  ON comments FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can view comments"
  ON comments FOR SELECT
  TO anon, authenticated
  USING (true);

-- Insertar las 20 propuestas
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
-- 1. Eliminación y Fusión de Ministerios
(
  'Eliminación y Fusión de Ministerios',
  'Reducir el número de ministerios de más de 20 a 10 fusionando carteras con funciones afines. Incluye la supresión de secretarías de Estado redundantes, direcciones generales superpuestas y asesores políticos no esenciales.',
  'Se requiere modificar la estructura del Gobierno y ajustar las plantillas. Los ahorros provienen de sueldos de altos cargos, personal de confianza y gastos de funcionamiento.',
  2000,
  'Administración',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),

-- 2. Privatización de Empresas Públicas Deficitarias
(
  'Privatización de Empresas Públicas Deficitarias',
  'Vender empresas públicas que presentan pérdidas crónicas y dependen de transferencias estatales, como radiotelevisiones autonómicas y entes de transporte poco rentables.',
  'Proceso de venta o cierre con análisis individual, subasta pública y planes sociales para empleados.',
  1000,
  'Empresas Públicas',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),

-- 3. Reducción de Cargos de Confianza
(
  'Reducción de Cargos de Confianza y Asesores',
  'Establecer límites estrictos al número de asesores en todas las administraciones y reemplazarlos por funcionarios de carrera cuando sea posible.',
  'Reforma de leyes que regulan asesores políticos y eliminación de asesorías duplicadas.',
  500,
  'Administración',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),

-- 4. Fusión de Ayuntamientos
(
  'Fusión de Ayuntamientos Pequeños',
  'Incentivar la fusión voluntaria o gestión mancomunada de servicios entre municipios con menos de 5.000 habitantes.',
  'Incentivos económicos y legislación facilitadora para fusiones municipales.',
  800,
  'Administración',
  'municipal',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),

-- 5. Recorte de Subvenciones Políticas
(
  'Eliminación de Subvenciones Políticas',
  'Reducir drásticamente las subvenciones a partidos políticos, sindicatos y organizaciones empresariales, fomentando su autofinanciación.',
  'Modificación de la Ley de Financiación de Partidos y mayor transparencia.',
  300,
  'Subvenciones',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),

-- 6. Eliminación de Subvenciones No Estratégicas
(
  'Recorte de Subvenciones No Estratégicas',
  'Identificar y eliminar subvenciones a sectores sin beneficio público claro como festivales culturales de baja demanda.',
  'Evaluación independiente de cada subvención y eliminación progresiva.',
  1000,
  'Subvenciones',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),

-- 7. Racionalización de Autonomías
(
  'Racionalización del Modelo Autonómico',
  'Revisar el modelo autonómico para reducir organismos duplicados como defensores del pueblo y entes meteorológicos regionales.',
  'Reforma de Estatutos y posible reforma constitucional para delimitar competencias.',
  3000,
  'Administración',
  'autonomico',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),

-- 8. Reforma de Pensiones
(
  'Sistema Mixto de Pensiones',
  'Transición gradual hacia un sistema mixto que combine reparto actual con capitalización individual, donde cada trabajador acumule sus aportes.',
  'Transición de 15 años con garantía de pensión mínima estatal.',
  10000,
  'Pensiones',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),

-- 9. Eliminación de Organismos Superfluos
(
  'Cierre de Organismos Sin Función Clara',
  'Identificar y eliminar organismos y agencias estatales o autonómicas con objetivos obsoletos o duplicados.',
  'Auditoría de cada organismo y absorción de funciones útiles en otros departamentos.',
  600,
  'Administración',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),

-- 10. Reforma de Diputaciones
(
  'Eliminación de Diputaciones Provinciales',
  'Reconvertir o suprimir las diputaciones provinciales, transfiriendo competencias a Comunidades o ayuntamientos.',
  'Cambios en Ley de Bases de Régimen Local y reubicación de personal.',
  3000,
  'Administración',
  'autonomico',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),

-- 11. Recorte en Publicidad Institucional
(
  'Reducción de Publicidad Institucional',
  'Limitar la publicidad estatal a campañas estrictamente necesarias y prohibir la autopromoción política.',
  'Nueva ley con topes de gasto y transparencia total en contratos publicitarios.',
  300,
  'Comunicación',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),

-- 12. Privatización de Infraestructuras
(
  'Privatización de Infraestructuras Secundarias',
  'Concesión a empresas privadas de aeropuertos secundarios y líneas ferroviarias poco rentables.',
  'Subastas públicas con condiciones de servicio y supervisión reguladora.',
  1000,
  'Infraestructuras',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),

-- 13. Reforma del Desempleo
(
  'Reforma Integral del Subsidio de Desempleo',
  'Reducir duración de prestaciones y hacerlas decrecientes, exigiendo formación y búsqueda activa.',
  'Reforma de normativa SEPE y nuevos controles de búsqueda de empleo.',
  2000,
  'Empleo',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),

-- 14. Externalización Penitenciaria
(
  'Externalización de Servicios Penitenciarios',
  'Subcontratar servicios como limpieza, cocina y seguridad perimetral de prisiones.',
  'Licitaciones competitivas con cláusulas de calidad y derechos humanos.',
  200,
  'Justicia',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),

-- 15. Reforma Seguridad Social
(
  'Digitalización de la Seguridad Social',
  'Implantar sistemas automatizados para trámites y reducir personal en tareas repetitivas.',
  'Plataforma única digital y recolocación de personal excedente.',
  400,
  'Administración',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),

-- 16. Centralización Sanitaria
(
  'Centralización de Compras Sanitarias',
  'Unificar compras de medicamentos y material sanitario para toda España.',
  'Sistema nacional de compras centralizado y ajustes competenciales.',
  2000,
  'Sanidad',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),

-- 17. Reducción Cooperación Internacional
(
  'Optimización de Ayuda Internacional',
  'Mantener solo cooperación con claro beneficio humanitario o estratégico.',
  'Registro de proyectos y eliminación de programas ineficientes.',
  1000,
  'Cooperación',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),

-- 18. Control de Contratación
(
  'Sistema de Contratación Transparente',
  'Subastas electrónicas obligatorias y mayor supervisión en licitaciones públicas.',
  'Reforma de Ley de Contratos y nueva agencia de control.',
  5000,
  'Contratación',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),

-- 19. Privatización Deportiva
(
  'Gestión Privada de Instalaciones Deportivas',
  'Transferir gestión de instalaciones deportivas no esenciales a entidades privadas.',
  'Licitaciones con condiciones de uso público parcial.',
  300,
  'Deportes',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
),

-- 20. Digitalización Administrativa
(
  'Administración Digital Total',
  'Implementar "Administración sin papel" con todos los trámites en línea.',
  'Inversión en infraestructura tecnológica y reducción gradual de personal.',
  2000,
  'Administración',
  'nacional',
  '00000000-0000-0000-0000-000000000001',
  now(),
  now()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS votes_proposal_id_idx ON votes(proposal_id);
CREATE INDEX IF NOT EXISTS votes_user_id_idx ON votes(user_id);
CREATE INDEX IF NOT EXISTS comments_proposal_id_idx ON comments(proposal_id);
CREATE INDEX IF NOT EXISTS comments_user_id_idx ON comments(user_id);
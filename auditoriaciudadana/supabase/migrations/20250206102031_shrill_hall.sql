/*
  # Restaurar propuestas de ejemplo

  1. Función
    - Crear función para insertar propuestas con usuario administrador
    - Asegurar que el usuario administrador existe y obtener su ID
  
  2. Datos
    - Insertar propuestas nacionales, autonómicas y municipales
    - Cada propuesta incluye título, descripción, ahorro estimado y categoría
*/

-- Crear función para insertar propuestas
CREATE OR REPLACE FUNCTION restore_sample_proposals()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Crear usuario administrador si no existe
  INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    role,
    aud,
    confirmation_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000001',
    'admin@auditoria-ciudadana.org',
    crypt('admin', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"name":"Administrador"}',
    now(),
    now(),
    'authenticated',
    'authenticated',
    'confirmed'
  ) ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email
  RETURNING id INTO admin_user_id;

  -- Verificar que tenemos el ID del administrador
  IF admin_user_id IS NULL THEN
    RAISE EXCEPTION 'No se pudo crear o encontrar el usuario administrador';
  END IF;

  -- Limpiar datos existentes
  DELETE FROM votes;
  DELETE FROM comments;
  DELETE FROM proposals;

  -- Insertar propuestas nacionales
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
  ) VALUES (
    'Eliminación y Fusión de Ministerios',
    'La estructura actual del gobierno español cuenta con más de 20 ministerios, generando duplicidades y gastos innecesarios. Se propone una reestructuración profunda que reduciría el número de ministerios a la mitad mediante fusiones estratégicas. Por ejemplo, Agricultura y Pesca se integraría con Transición Ecológica, mientras que Cultura se fusionaría con Educación. Esta reforma incluye la eliminación de más de 1.000 puestos de asesores y cargos de confianza, la reducción de estructuras administrativas duplicadas, y la optimización de recursos materiales como edificios y vehículos oficiales. El plan contempla la reubicación del personal funcionario en áreas prioritarias, la venta o reutilización de inmuebles innecesarios, y la digitalización de procesos para mantener la eficiencia. Los ahorros provendrían principalmente de la reducción de altos cargos, la eliminación de duplicidades administrativas, y la optimización de recursos materiales y humanos.',
    'Plan detallado de fusión de ministerios y optimización de recursos',
    2000,
    'Administración',
    'nacional',
    admin_user_id,
    now(),
    now()
  ),
  (
    'Privatización de Empresas Públicas Deficitarias',
    'España mantiene numerosas empresas públicas que generan pérdidas millonarias anuales y requieren constantes inyecciones de dinero público. Esta propuesta plantea un programa sistemático de privatización o cierre de empresas públicas no estratégicas que sean crónicamente deficitarias. El plan incluye la venta de radiotelevisiones autonómicas deficitarias, la privatización de líneas ferroviarias de baja demanda, y la reestructuración de empresas turísticas públicas. Se establecería un periodo de transición de 24 meses para cada empresa, durante el cual se prepararía para su venta o cierre ordenado. Los empleados recibirían programas de recolocación o planes de jubilación anticipada. La propuesta incluye la creación de un organismo independiente para supervisar el proceso y garantizar la transparencia. Se mantendría el control público sobre empresas estratégicas y se establecerían mecanismos de regulación para garantizar la calidad del servicio post-privatización.',
    'Programa de privatización y reestructuración de empresas públicas',
    1000,
    'Empresas Públicas',
    'nacional',
    admin_user_id,
    now(),
    now()
  ),
  (
    'Reforma del Sistema de Pensiones',
    'El sistema actual de pensiones en España es insostenible a largo plazo, con un déficit estructural creciente. Esta propuesta plantea una transición gradual hacia un sistema mixto que combine elementos del actual sistema de reparto con un componente de capitalización individual. El plan se implementaría en fases durante 15 años, comenzando con trabajadores menores de 30 años. Se crearía un sistema de cuentas individuales donde parte de las cotizaciones se invertirían en fondos diversificados. El Estado garantizaría una pensión mínima y mantendría las pensiones actuales intactas. Se implementaría un programa de educación financiera nacional y se establecerían mecanismos de supervisión rigurosos. La transición incluiría incentivos fiscales para fomentar el ahorro privado y la creación de un fondo de reserva robusto. Los ahorros provendrían de la reducción gradual de la carga sobre el sistema público y la mejor gestión de los recursos a través de inversiones profesionales.',
    'Plan de transición hacia un sistema mixto de pensiones',
    10000,
    'Pensiones',
    'nacional',
    admin_user_id,
    now(),
    now()
  );

  -- Insertar propuestas autonómicas
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
  ) VALUES (
    'Racionalización de Competencias Autonómicas',
    'El actual sistema autonómico español presenta numerosas duplicidades que generan gastos innecesarios y confusión administrativa. Esta propuesta plantea una reorganización completa de las competencias entre administraciones, eliminando organismos duplicados como defensores del pueblo autonómicos, agencias meteorológicas regionales, y televisiones públicas autonómicas deficitarias. Se establecería un sistema de servicios compartidos entre comunidades autónomas para funciones administrativas comunes. El plan incluye la creación de centros de servicios compartidos para gestión de nóminas, compras, y sistemas informáticos. Se implementaría un sistema de evaluación continua de la eficiencia de cada servicio y se establecerían mecanismos de coordinación interautonómica. La propuesta contempla planes de reubicación del personal afectado y programas de recualificación profesional.',
    'Plan de reorganización y optimización de competencias autonómicas',
    3000,
    'Administración',
    'autonomico',
    admin_user_id,
    now(),
    now()
  );

  -- Insertar propuestas municipales
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
  ) VALUES (
    'Fusión de Ayuntamientos Pequeños',
    'España tiene más de 8.000 municipios, muchos con menos de 1.000 habitantes, lo que genera ineficiencias y duplicidades en la prestación de servicios. Esta propuesta plantea un programa de fusiones voluntarias de municipios pequeños, incentivado con beneficios fiscales y ayudas adicionales. Se establecerían servicios compartidos para policía local, mantenimiento de infraestructuras, y servicios sociales. El plan incluye la creación de centros administrativos comarcales, la implementación de sistemas de gestión digital compartidos, y la optimización de rutas de transporte público. Se mantendría la identidad cultural de cada núcleo poblacional mientras se mejora la eficiencia administrativa. La propuesta contempla planes de desarrollo local conjunto y programas de modernización de infraestructuras compartidas.',
    'Programa de fusión voluntaria de municipios pequeños',
    800,
    'Administración',
    'municipal',
    admin_user_id,
    now(),
    now()
  );
END;
$$;

-- Ejecutar la función para restaurar las propuestas
SELECT restore_sample_proposals();
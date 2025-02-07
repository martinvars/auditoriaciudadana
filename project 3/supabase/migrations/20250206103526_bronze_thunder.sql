/*
  # Permitir votos y comentarios anónimos

  1. Cambios
    - Modifica las tablas votes y comments para permitir user_id nulo
    - Actualiza las restricciones de clave foránea
    - Mantiene la funcionalidad existente

  2. Seguridad
    - Mantiene el tracking de votos por sesión
    - Permite participación anónima
*/

-- Modificar la tabla de votos para permitir user_id nulo
ALTER TABLE votes DROP CONSTRAINT votes_user_id_fkey;
ALTER TABLE votes ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE votes ADD CONSTRAINT votes_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Modificar la tabla de comentarios para permitir user_id nulo
ALTER TABLE comments DROP CONSTRAINT comments_user_id_fkey;
ALTER TABLE comments ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE comments ADD CONSTRAINT comments_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
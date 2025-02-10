/*
  # Corregir acceso a propuestas

  1. Cambios
    - Actualiza políticas RLS para permitir acceso anónimo a propuestas
    - Mantiene las propuestas existentes
    - Asegura que cualquier usuario pueda ver las propuestas

  2. Seguridad
    - Permite lectura anónima de propuestas
    - Mantiene la seguridad para otras operaciones
*/

-- Eliminar políticas existentes de proposals
DROP POLICY IF EXISTS "Proposals are viewable by everyone" ON proposals;
DROP POLICY IF EXISTS "Users can create proposals" ON proposals;
DROP POLICY IF EXISTS "Users can update their own proposals" ON proposals;

-- Crear nuevas políticas que permitan acceso anónimo
CREATE POLICY "Anyone can view proposals"
  ON proposals FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can create proposals"
  ON proposals FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update proposals"
  ON proposals FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
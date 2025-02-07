import { supabase } from '../lib/supabase';

export const ADMIN_PASSWORD = 'camino75';

export async function checkDeletePermission(itemType: 'proposal' | 'comment', nickname: string): Promise<boolean> {
  // Check if user is admin
  const { data: { user } } = await supabase.auth.getUser();
  if (user?.user_metadata?.isAdmin) return true;

  // Check if user owns the item
  if (user?.user_metadata?.nickname === nickname) return true;
  
  // Ask for password
  const password = prompt(`Introduce la contraseña para eliminar este ${itemType}:`);
  return password === ADMIN_PASSWORD;
}
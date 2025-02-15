export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function checkDeletePermission(itemType: 'proposal' | 'comment', nickname: string): Promise<boolean> {
  // Ask for password
  const password = prompt(`Introduce la contraseña para eliminar este ${itemType}:`);
  return password === ADMIN_PASSWORD;
}

export async function checkEditPermission(nickname: string): Promise<boolean> {
  // Ask for password
  const password = prompt('Introduce la contraseña para editar esta propuesta:');
  return password === ADMIN_PASSWORD;
}
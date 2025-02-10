-- Create admin user if it doesn't exist
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token,
  is_admin
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000001',
  'authenticated',
  'authenticated',
  'admin@auditoria-ciudadana.org',
  crypt('admin123', gen_salt('bf')), -- Default password: admin123
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"name": "Administrator"}',
  now(),
  now(),
  '',
  '',
  '',
  '',
  true
) ON CONFLICT (id) DO UPDATE
SET 
  is_admin = true,
  encrypted_password = EXCLUDED.encrypted_password;

-- Insert into auth.identities if not exists
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  '{"sub": "00000000-0000-0000-0000-000000000001", "email": "admin@auditoria-ciudadana.org"}'::jsonb,
  'email',
  'admin@auditoria-ciudadana.org',
  now(),
  now(),
  now()
) ON CONFLICT (provider, provider_id) DO NOTHING;
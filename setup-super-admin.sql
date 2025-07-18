-- Setup Super Admin User: Eloka Agu
-- This script will create the user record in the public.users table

-- First, let's check if the user already exists
SELECT 
  id,
  email,
  first_name,
  last_name,
  full_name,
  role,
  studio_access,
  created_at
FROM public.users 
WHERE email = 'eloka.agu@icloud.com';

-- Insert the super admin user (only if they don't exist)
INSERT INTO public.users (
  id,
  email,
  first_name,
  last_name,
  full_name,
  role,
  studio_access,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(), -- Generate a new UUID for the user
  'eloka.agu@icloud.com',
  'Eloka',
  'Agu',
  'Eloka Agu',
  'admin',
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO UPDATE SET
  role = 'admin',
  studio_access = true,
  updated_at = NOW();

-- Verify the user was created/updated
SELECT 
  id,
  email,
  first_name,
  last_name,
  full_name,
  role,
  studio_access,
  created_at
FROM public.users 
WHERE email = 'eloka.agu@icloud.com';

-- Show all admin users
SELECT 
  id,
  email,
  first_name,
  last_name,
  full_name,
  role,
  studio_access,
  created_at
FROM public.users 
WHERE role = 'admin'
ORDER BY created_at DESC; 
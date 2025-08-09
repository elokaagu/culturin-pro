-- Sync auth.users to public.users table
-- This script will create missing user records in public.users

-- First, check what auth users exist but don't have public.users records
SELECT 
  au.id,
  au.email,
  au.created_at,
  CASE WHEN pu.id IS NULL THEN 'MISSING' ELSE 'EXISTS' END as status
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
ORDER BY au.created_at DESC;

-- Insert missing users into public.users
INSERT INTO public.users (
  id,
  email,
  full_name,
  role,
  studio_access,
  created_at,
  updated_at
)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', au.email) as full_name,
  'operator' as role, -- Set default role as operator since they're using the dashboard
  true as studio_access, -- Give studio access to existing users
  au.created_at,
  NOW()
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL; -- Only insert users that don't exist in public.users

-- Verify the sync worked
SELECT 
  COUNT(*) as auth_users_count
FROM auth.users;

SELECT 
  COUNT(*) as public_users_count
FROM public.users;

-- Show all users in public.users
SELECT 
  id,
  email,
  full_name,
  role,
  studio_access,
  created_at
FROM public.users
ORDER BY created_at DESC;

-- Success message
SELECT 'User sync completed! Check counts above to verify all auth users have corresponding public.users records.' as result;

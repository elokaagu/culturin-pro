-- Verify Database Setup
-- Run this to check if everything is working correctly

-- Check if users table exists and has correct structure
SELECT 
  'Users table structure:' as check_type,
  EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'users'
  ) as table_exists,
  EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'role'
  ) as has_role_column;

-- Check if itineraries table exists
SELECT 
  'Itineraries table structure:' as check_type,
  EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'itineraries'
  ) as table_exists,
  EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'itineraries' AND column_name = 'operator_id'
  ) as has_operator_id;

-- Check RLS policies on users table
SELECT 
  'Users table RLS policies:' as check_type,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'users' AND schemaname = 'public';

-- Check trigger function exists
SELECT 
  'Trigger function:' as check_type,
  EXISTS (
    SELECT 1 FROM pg_proc 
    WHERE proname = 'handle_new_user' AND pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
  ) as function_exists;

-- Check trigger exists
SELECT 
  'Auth trigger:' as check_type,
  EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'on_auth_user_created' AND tgrelid = (SELECT oid FROM pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'auth'))
  ) as trigger_exists;

-- Success message
SELECT 'Database verification complete! Check the results above to confirm setup.' as status;

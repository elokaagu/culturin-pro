-- Clean all user data from both auth and public schemas
-- Run this in your Supabase SQL Editor

-- Step 1: First disable the trigger to prevent any side effects
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Step 2: Delete all records from public.users
DELETE FROM public.users;

-- Step 3: Delete all records from auth.users
-- This will cascade delete related data like sessions
DELETE FROM auth.users;

-- Step 4: Recreate our trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (
    id,
    email,
    full_name,
    role,
    studio_access,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
    CASE 
      WHEN NEW.email IN ('eloka.agu@icloud.com', 'eloka@satellitelabs.xyz') THEN 'admin'
      ELSE 'user'
    END,
    true,
    NOW(),
    NOW()
  );
  
  RAISE NOTICE 'Created new user record for %', NEW.email;
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error in handle_new_user trigger: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 5: Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Step 6: Verify the cleanup
SELECT 'Cleanup complete!' as status,
       (SELECT COUNT(*) FROM auth.users) as auth_users_count,
       (SELECT COUNT(*) FROM public.users) as public_users_count;

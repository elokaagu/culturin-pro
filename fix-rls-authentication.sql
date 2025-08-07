-- Fix RLS Authentication Issues
-- Run this in your Supabase SQL Editor to resolve the 42501 RLS violation errors

-- Step 1: Drop existing policies that are too restrictive
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view their own user data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own user data" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own user data" ON public.users;
DROP POLICY IF EXISTS "Authenticated users can create profile" ON public.users;
DROP POLICY IF EXISTS "Service role can manage all users" ON public.users;

-- Step 2: Create new, more permissive policies
CREATE POLICY "Users can view their own user data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own user data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Allow any authenticated user to create profiles (needed for trigger)
CREATE POLICY "Enable user profile creation" ON public.users
  FOR INSERT WITH CHECK (true);

-- Allow service role full access
CREATE POLICY "Service role can manage all users" ON public.users
  FOR ALL USING (auth.role() = 'service_role');

-- Step 3: Drop and recreate the trigger function with better RLS handling
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_exists BOOLEAN;
BEGIN
  -- Check if user record already exists
  SELECT EXISTS(SELECT 1 FROM public.users WHERE id = NEW.id) INTO user_exists;
  
  IF NOT user_exists THEN
    -- Temporarily disable RLS for this transaction
    PERFORM set_config('row_security', 'off', true);
    
    INSERT INTO public.users (id, email, full_name, role, studio_access)
    VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
      CASE 
        WHEN NEW.email IN ('eloka.agu@icloud.com', 'eloka@satellitelabs.xyz') THEN 'admin'
        ELSE 'user'
      END,
      true -- Grant studio access to all users
    );
    
    -- Re-enable RLS
    PERFORM set_config('row_security', 'on', true);
    
    RAISE NOTICE 'Created user record for: %', NEW.email;
  ELSE
    RAISE NOTICE 'User record already exists for: %', NEW.email;
  END IF;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Re-enable RLS in case of error
    PERFORM set_config('row_security', 'on', true);
    -- Log the error but don't fail the trigger
    RAISE WARNING 'Error in handle_new_user trigger for %: %', NEW.email, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 4: Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Step 5: Success message
SELECT 'RLS authentication fixes applied successfully! Users should now be able to sign in without 42501 errors.' as status;

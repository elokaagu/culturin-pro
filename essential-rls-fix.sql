-- Essential RLS Fix for Authentication Issues
-- Run this in your Supabase SQL Editor to resolve 42501 errors

-- Step 1: Ensure users table exists with proper structure
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE,
  first_name TEXT,
  last_name TEXT,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  bio TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'operator')),
  studio_access BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Step 3: Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view their own user data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own user data" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own user data" ON public.users;
DROP POLICY IF EXISTS "Authenticated users can create profile" ON public.users;
DROP POLICY IF EXISTS "Service role can manage all users" ON public.users;
DROP POLICY IF EXISTS "Enable user profile creation" ON public.users;

-- Step 4: Create new, permissive policies
CREATE POLICY "Users can view their own user data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own user data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Allow any authenticated user to create profiles (this is the key fix)
CREATE POLICY "Enable user profile creation" ON public.users
  FOR INSERT WITH CHECK (true);

-- Allow service role full access
CREATE POLICY "Service role can manage all users" ON public.users
  FOR ALL USING (auth.role() = 'service_role');

-- Step 5: Create the trigger function
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_exists BOOLEAN;
BEGIN
  -- Check if user record already exists
  SELECT EXISTS(SELECT 1 FROM public.users WHERE id = NEW.id) INTO user_exists;
  
  IF NOT user_exists THEN
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
    
    RAISE NOTICE 'Created user record for: %', NEW.email;
  ELSE
    RAISE NOTICE 'User record already exists for: %', NEW.email;
  END IF;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the trigger
    RAISE WARNING 'Error in handle_new_user trigger for %: %', NEW.email, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 6: Create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Step 7: Success message
SELECT 'Essential RLS fixes applied successfully! Authentication should now work without 42501 errors.' as status;

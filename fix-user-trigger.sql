-- Fix user trigger to properly handle duplicate emails
-- Run this in your Supabase SQL Editor

-- Step 1: First, let's clean up any duplicate records that might exist
DELETE FROM public.users a USING public.users b
WHERE a.email = b.email 
AND a.id > b.id;

-- Step 2: Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Step 3: Create a more robust trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  existing_user RECORD;
BEGIN
  -- First try to find any existing user with this email
  SELECT * INTO existing_user 
  FROM public.users 
  WHERE email = NEW.email 
  LIMIT 1;

  IF existing_user IS NOT NULL THEN
    -- User with this email exists, update their record
    UPDATE public.users
    SET 
      id = NEW.id,
      email = NEW.email, -- Ensure email is the same
      full_name = COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email::text),
      role = CASE 
        WHEN NEW.email IN ('eloka.agu@icloud.com', 'eloka@satellitelabs.xyz') THEN 'admin'
        ELSE existing_user.role -- Keep existing role
      END,
      updated_at = NOW()
    WHERE email = NEW.email;
    
    RAISE NOTICE 'Updated existing user record for %', NEW.email;
  ELSE
    -- No existing user, create new record
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
  END IF;

  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    -- If we still get a unique violation, try one more time with a delay
    PERFORM pg_sleep(0.1); -- Small delay to allow any concurrent transactions to complete
    
    UPDATE public.users
    SET 
      id = NEW.id,
      updated_at = NOW()
    WHERE email = NEW.email;
    
    RAISE NOTICE 'Handled unique violation for %', NEW.email;
    RETURN NEW;
  WHEN OTHERS THEN
    RAISE WARNING 'Error in handle_new_user trigger: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 4: Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Step 5: Verify the changes
SELECT 'User trigger updated successfully!' as status;

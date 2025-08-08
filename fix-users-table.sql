-- Fix users table email constraint issue
-- Run this in your Supabase SQL Editor

-- Step 1: Drop the unique constraint on email
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_email_key;

-- Step 2: Create a new unique constraint that considers both id and email
ALTER TABLE public.users ADD CONSTRAINT users_id_email_unique UNIQUE (id, email);

-- Step 3: Create a function to handle user record updates
CREATE OR REPLACE FUNCTION public.handle_user_record()
RETURNS TRIGGER AS $$
BEGIN
  -- If there's an existing record with this email but different ID
  IF EXISTS (
    SELECT 1 FROM public.users 
    WHERE email = NEW.email 
    AND id != NEW.id
  ) THEN
    -- Update the existing record with the new ID
    UPDATE public.users 
    SET id = NEW.id,
        updated_at = NOW()
    WHERE email = NEW.email;
    
    RETURN NULL; -- Don't create a new record
  END IF;
  
  RETURN NEW; -- Create new record if no existing email found
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 4: Create a trigger to handle user record updates
DROP TRIGGER IF EXISTS handle_user_record_trigger ON public.users;
CREATE TRIGGER handle_user_record_trigger
  BEFORE INSERT ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_user_record();

-- Step 5: Update the handle_new_user function to work with the new constraint
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert or update user record
  INSERT INTO public.users (id, email, full_name, role, studio_access)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
    CASE 
      WHEN NEW.email IN ('eloka.agu@icloud.com', 'eloka@satellitelabs.xyz') THEN 'admin'
      ELSE 'user'
    END,
    true
  )
  ON CONFLICT (id, email) DO UPDATE
  SET updated_at = NOW();
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error in handle_new_user trigger: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 6: Success message
SELECT 'Users table email constraint fixed successfully!' as status;

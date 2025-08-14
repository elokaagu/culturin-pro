-- Create Unik Ernest as Super Admin
-- Run this in your Supabase SQL Editor

-- Step 1: First, let's check if the user already exists in auth.users
-- If not, we'll need to create them manually since we can't create auth users via SQL

-- Step 2: Update the handle_new_user function to include unik@culturin.com as admin
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
        WHEN NEW.email IN ('eloka.agu@icloud.com', 'eloka@satellitelabs.xyz', 'unik@culturin.com') THEN 'admin'
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

-- Step 3: If you want to manually create a user record for unik@culturin.com
-- (This assumes you've already created the auth user via Supabase dashboard)
-- Replace 'USER_UUID_HERE' with the actual UUID from auth.users after creating the user

-- INSERT INTO public.users (id, email, full_name, role, studio_access, created_at, updated_at)
-- VALUES (
--   'USER_UUID_HERE', -- Replace with actual UUID from auth.users
--   'unik@culturin.com',
--   'Unik Ernest',
--   'admin',
--   true,
--   NOW(),
--   NOW()
-- )
-- ON CONFLICT (id) DO UPDATE SET
--   email = EXCLUDED.email,
--   full_name = EXCLUDED.full_name,
--   role = EXCLUDED.role,
--   studio_access = EXCLUDED.studio_access,
--   updated_at = NOW();

-- Step 4: Success message
SELECT 'Unik Ernest admin setup complete! The handle_new_user function now recognizes unik@culturin.com as admin.' as status;

-- Step 5: Instructions for manual user creation
SELECT 
  'IMPORTANT: You need to manually create the auth user first!' as instruction,
  '1. Go to Supabase Dashboard > Authentication > Users' as step1,
  '2. Click "Add User"' as step2,
  '3. Enter: unik@culturin.com' as step3,
  '4. Enter password: culturin' as step4,
  '5. Add metadata: {"full_name": "Unik Ernest"}' as step5,
  '6. The trigger will automatically create the public.users record with admin role' as step6;

-- Complete Database Setup for Culturin Platform
-- Run this in your Supabase SQL Editor to set up everything needed

-- Step 1: Create users table with proper structure
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

-- Step 2: Enable RLS and set up user policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view their own user data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own user data" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own user data" ON public.users;
DROP POLICY IF EXISTS "Authenticated users can create profile" ON public.users;
DROP POLICY IF EXISTS "Service role can manage all users" ON public.users;
DROP POLICY IF EXISTS "Enable user profile creation" ON public.users;

-- Create new policies
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

-- Step 3: Create the trigger function
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

-- Step 4: Create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Step 5: Create itineraries table
CREATE TABLE IF NOT EXISTS public.itineraries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  days INTEGER DEFAULT 1,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  image TEXT,
  theme_type TEXT DEFAULT 'cultural',
  regions TEXT[],
  price DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  group_size_min INTEGER DEFAULT 1,
  group_size_max INTEGER DEFAULT 10,
  difficulty TEXT DEFAULT 'easy' CHECK (difficulty IN ('easy', 'moderate', 'challenging', 'expert')),
  tags TEXT[],
  operator_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  last_updated TEXT DEFAULT 'just now'
);

-- Step 6: Create itinerary_modules table
CREATE TABLE IF NOT EXISTS public.itinerary_modules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  itinerary_id UUID REFERENCES public.itineraries(id) ON DELETE CASCADE,
  day INTEGER NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  time TEXT,
  duration INTEGER, -- in minutes
  location TEXT,
  price DECIMAL(10,2),
  notes TEXT,
  images TEXT[],
  position INTEGER DEFAULT 0,
  properties JSONB,
  coordinates JSONB, -- {lat: number, lng: number}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 7: Enable RLS on itineraries and modules
ALTER TABLE public.itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itinerary_modules ENABLE ROW LEVEL SECURITY;

-- Step 8: Create RLS policies for itineraries
DROP POLICY IF EXISTS "Itineraries are viewable by everyone when published" ON public.itineraries;
DROP POLICY IF EXISTS "Operators can manage their own itineraries" ON public.itineraries;

CREATE POLICY "Itineraries are viewable by everyone when published" ON public.itineraries
  FOR SELECT USING (status = 'published');

CREATE POLICY "Operators can manage their own itineraries" ON public.itineraries
  FOR ALL USING (auth.uid() = operator_id);

-- Step 9: Create RLS policies for itinerary_modules
DROP POLICY IF EXISTS "Itinerary modules are viewable by everyone when itinerary is published" ON public.itinerary_modules;
DROP POLICY IF EXISTS "Operators can manage modules for their own itineraries" ON public.itinerary_modules;

CREATE POLICY "Itinerary modules are viewable by everyone when itinerary is published" ON public.itinerary_modules
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.itineraries 
      WHERE itineraries.id = itinerary_modules.itinerary_id 
      AND itineraries.status = 'published'
    )
  );

CREATE POLICY "Operators can manage modules for their own itineraries" ON public.itinerary_modules
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.itineraries 
      WHERE itineraries.id = itinerary_modules.itinerary_id 
      AND itineraries.operator_id = auth.uid()
    )
  );

-- Step 10: Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_itineraries_operator_id ON public.itineraries(operator_id);
CREATE INDEX IF NOT EXISTS idx_itineraries_status ON public.itineraries(status);
CREATE INDEX IF NOT EXISTS idx_itinerary_modules_itinerary_id ON public.itinerary_modules(itinerary_id);
CREATE INDEX IF NOT EXISTS idx_itinerary_modules_day ON public.itinerary_modules(day);

-- Step 11: Success message
SELECT 'Complete database setup applied successfully! All tables, policies, and triggers are now in place.' as status;

-- Simple fix for the itineraries table issue
-- Run this in your Supabase SQL Editor

-- First, let's check if the table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'itineraries'
) as table_exists;

-- Create the itineraries table if it doesn't exist
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
  operator_id UUID,
  last_updated TEXT DEFAULT 'just now'
);

-- Create the itinerary_modules table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.itinerary_modules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  itinerary_id UUID,
  day INTEGER NOT NULL,
  type TEXT NOT NULL,
  title TEXT,
  description TEXT,
  time TEXT,
  duration TEXT,
  location TEXT,
  price DECIMAL(10,2),
  notes TEXT,
  images TEXT[],
  position INTEGER DEFAULT 0,
  properties JSONB,
  coordinates JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add foreign key constraints (only if they don't exist)
DO $$
BEGIN
  -- Add foreign key for itineraries.operator_id if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'itineraries_operator_id_fkey' 
    AND table_name = 'itineraries'
  ) THEN
    ALTER TABLE public.itineraries 
    ADD CONSTRAINT itineraries_operator_id_fkey 
    FOREIGN KEY (operator_id) REFERENCES public.users(id) ON DELETE CASCADE;
  END IF;
  
  -- Add foreign key for itinerary_modules.itinerary_id if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'itinerary_modules_itinerary_id_fkey' 
    AND table_name = 'itinerary_modules'
  ) THEN
    ALTER TABLE public.itinerary_modules 
    ADD CONSTRAINT itinerary_modules_itinerary_id_fkey 
    FOREIGN KEY (itinerary_id) REFERENCES public.itineraries(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE public.itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itinerary_modules ENABLE ROW LEVEL SECURITY;

-- Create basic policies
CREATE POLICY IF NOT EXISTS "Enable read access for all users" ON public.itineraries
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Enable insert for authenticated users only" ON public.itineraries
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Enable update for users based on operator_id" ON public.itineraries
  FOR UPDATE USING (auth.uid() = operator_id);

CREATE POLICY IF NOT EXISTS "Enable delete for users based on operator_id" ON public.itineraries
  FOR DELETE USING (auth.uid() = operator_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_itineraries_operator_id ON public.itineraries(operator_id);
CREATE INDEX IF NOT EXISTS idx_itineraries_status ON public.itineraries(status);
CREATE INDEX IF NOT EXISTS idx_itinerary_modules_itinerary_id ON public.itinerary_modules(itinerary_id);

-- Verify the table was created
SELECT 
  'itineraries' as table_name,
  COUNT(*) as row_count
FROM public.itineraries
UNION ALL
SELECT 
  'itinerary_modules' as table_name,
  COUNT(*) as row_count
FROM public.itinerary_modules;

-- Success message
SELECT 'Itineraries table created successfully! You can now use the itinerary builder.' as status; 
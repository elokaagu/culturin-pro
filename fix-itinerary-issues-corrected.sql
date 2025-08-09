-- Complete fix for itinerary save and loading issues (CORRECTED VERSION)
-- Run this script in your Supabase SQL Editor

-- Step 1: Sync auth.users to public.users table
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
  'operator' as role,
  true as studio_access,
  au.created_at,
  NOW()
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- Step 2: Ensure itineraries table exists with correct structure
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

-- Step 3: Enable RLS and create policies
ALTER TABLE public.itineraries ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (this is safe - won't error if they don't exist)
DROP POLICY IF EXISTS "Users can view their own itineraries" ON public.itineraries;
DROP POLICY IF EXISTS "Users can create their own itineraries" ON public.itineraries;
DROP POLICY IF EXISTS "Users can update their own itineraries" ON public.itineraries;
DROP POLICY IF EXISTS "Users can delete their own itineraries" ON public.itineraries;
DROP POLICY IF EXISTS "Published itineraries are viewable by everyone" ON public.itineraries;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.itineraries;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.itineraries;
DROP POLICY IF EXISTS "Enable update for users based on operator_id" ON public.itineraries;
DROP POLICY IF EXISTS "Enable delete for users based on operator_id" ON public.itineraries;

-- Create new policies (without IF NOT EXISTS)
CREATE POLICY "Users can view their own itineraries" ON public.itineraries
  FOR SELECT USING (auth.uid() = operator_id);

CREATE POLICY "Users can create their own itineraries" ON public.itineraries
  FOR INSERT WITH CHECK (auth.uid() = operator_id);

CREATE POLICY "Users can update their own itineraries" ON public.itineraries
  FOR UPDATE USING (auth.uid() = operator_id);

CREATE POLICY "Users can delete their own itineraries" ON public.itineraries
  FOR DELETE USING (auth.uid() = operator_id);

CREATE POLICY "Published itineraries are viewable by everyone" ON public.itineraries
  FOR SELECT USING (status = 'published');

-- Step 4: Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_itineraries_operator_id ON public.itineraries(operator_id);
CREATE INDEX IF NOT EXISTS idx_itineraries_status ON public.itineraries(status);
CREATE INDEX IF NOT EXISTS idx_itineraries_created_at ON public.itineraries(created_at);

-- Step 5: Verify the setup
SELECT 
  'Users in auth.users' as table_name,
  COUNT(*) as count
FROM auth.users
UNION ALL
SELECT 
  'Users in public.users' as table_name,
  COUNT(*) as count
FROM public.users
UNION ALL
SELECT 
  'Itineraries' as table_name,
  COUNT(*) as count
FROM public.itineraries;

-- Step 6: Show any users who might have data but no public.users record
SELECT 
  au.id,
  au.email,
  au.created_at,
  CASE WHEN pu.id IS NULL THEN 'MISSING' ELSE 'EXISTS' END as public_user_status
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id;

-- Success message
SELECT 'Fix completed! You should now be able to save and load itineraries.' as result;

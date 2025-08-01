-- Safe schema application - handles existing objects
-- Apply this SQL in your Supabase SQL Editor to fix the itineraries issue

-- Drop existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Operators can view their own cards" ON public.cards;
DROP POLICY IF EXISTS "Operators can manage their own cards" ON public.cards;
DROP POLICY IF EXISTS "Cardholders can view their own cards" ON public.cards;
DROP POLICY IF EXISTS "Itineraries are viewable by everyone when published" ON public.itineraries;
DROP POLICY IF EXISTS "Operators can manage their own itineraries" ON public.itineraries;
DROP POLICY IF EXISTS "Modules are viewable by everyone when itinerary is published" ON public.itinerary_modules;
DROP POLICY IF EXISTS "Operators can manage modules for their own itineraries" ON public.itinerary_modules;

-- Create itineraries table (if it doesn't exist)
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

-- Create itinerary_modules table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.itinerary_modules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  itinerary_id UUID REFERENCES public.itineraries(id) ON DELETE CASCADE,
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

-- Enable Row Level Security (if not already enabled)
ALTER TABLE public.itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itinerary_modules ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for itineraries (with IF NOT EXISTS)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Itineraries are viewable by everyone when published' AND tablename = 'itineraries') THEN
    CREATE POLICY "Itineraries are viewable by everyone when published" ON public.itineraries
      FOR SELECT USING (status = 'published');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Operators can manage their own itineraries' AND tablename = 'itineraries') THEN
    CREATE POLICY "Operators can manage their own itineraries" ON public.itineraries
      FOR ALL USING (auth.uid() = operator_id);
  END IF;
END $$;

-- Create RLS policies for itinerary_modules (with IF NOT EXISTS)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Modules are viewable by everyone when itinerary is published' AND tablename = 'itinerary_modules') THEN
    CREATE POLICY "Modules are viewable by everyone when itinerary is published" ON public.itinerary_modules
      FOR SELECT USING (
        EXISTS (
          SELECT 1 FROM public.itineraries 
          WHERE itineraries.id = itinerary_modules.itinerary_id 
          AND itineraries.status = 'published'
        )
      );
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Operators can manage modules for their own itineraries' AND tablename = 'itinerary_modules') THEN
    CREATE POLICY "Operators can manage modules for their own itineraries" ON public.itinerary_modules
      FOR ALL USING (
        EXISTS (
          SELECT 1 FROM public.itineraries 
          WHERE itineraries.id = itinerary_modules.itinerary_id 
          AND itineraries.operator_id = auth.uid()
        )
      );
  END IF;
END $$;

-- Create indexes for performance (if they don't exist)
CREATE INDEX IF NOT EXISTS idx_itineraries_operator_id ON public.itineraries(operator_id);
CREATE INDEX IF NOT EXISTS idx_itineraries_status ON public.itineraries(status);
CREATE INDEX IF NOT EXISTS idx_itinerary_modules_itinerary_id ON public.itinerary_modules(itinerary_id);
CREATE INDEX IF NOT EXISTS idx_itinerary_modules_day ON public.itinerary_modules(day);

-- Create storage bucket for itinerary images (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('itinerary-images', 'itinerary-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for itinerary images (with IF NOT EXISTS)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Itinerary images are publicly accessible' AND tablename = 'objects') THEN
    CREATE POLICY "Itinerary images are publicly accessible" ON storage.objects
      FOR SELECT USING (bucket_id = 'itinerary-images');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Operators can upload itinerary images' AND tablename = 'objects') THEN
    CREATE POLICY "Operators can upload itinerary images" ON storage.objects
      FOR INSERT WITH CHECK (bucket_id = 'itinerary-images' AND auth.role() = 'authenticated');
  END IF;
END $$;

-- Success message
SELECT 'Database schema applied successfully! Itineraries table is now ready.' as status; 
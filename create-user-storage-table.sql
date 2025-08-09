-- Create user_storage table for Supabase-based storage
CREATE TABLE IF NOT EXISTS public.user_storage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, key)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_storage_user_id ON public.user_storage(user_id);
CREATE INDEX IF NOT EXISTS idx_user_storage_key ON public.user_storage(key);

-- Enable Row Level Security
ALTER TABLE public.user_storage ENABLE ROW LEVEL SECURITY;

-- Create RLS policies\
CREATE POLICY "Users can view their own storage" ON public.user_storage
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own storage" ON public.user_storage
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own storage" ON public.user_storage
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own storage" ON public.user_storage
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to automatically set updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_user_storage_updated_at
  BEFORE UPDATE ON public.user_storage
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL ON public.user_storage TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

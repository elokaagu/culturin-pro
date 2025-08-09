-- Create user_website_settings table for user-specific website configurations
CREATE TABLE IF NOT EXISTS public.user_website_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT NOT NULL DEFAULT 'Your Cultural Tours',
  tagline TEXT DEFAULT 'Discover Authentic Cultural Experiences',
  description TEXT DEFAULT 'We specialize in creating immersive cultural experiences that connect you with local traditions and communities.',
  contact_info JSONB DEFAULT '{
    "phone": "",
    "email": "",
    "address": ""
  }'::jsonb,
  social_media JSONB DEFAULT '{}'::jsonb,
  branding JSONB DEFAULT '{
    "primary_color": "#9b87f5",
    "theme": "classic"
  }'::jsonb,
  website_settings JSONB DEFAULT '{
    "show_booking": true,
    "show_reviews": true,
    "show_testimonials": true,
    "currency": "USD",
    "language": "en",
    "timezone": "UTC"
  }'::jsonb,
  seo_settings JSONB DEFAULT '{
    "keywords": ["cultural tours", "authentic experiences", "travel"]
  }'::jsonb,
  published_url TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.user_website_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own website settings" ON public.user_website_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own website settings" ON public.user_website_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own website settings" ON public.user_website_settings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own website settings" ON public.user_website_settings
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_website_settings_user_id ON public.user_website_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_user_website_settings_published_url ON public.user_website_settings(published_url);
CREATE INDEX IF NOT EXISTS idx_user_website_settings_is_published ON public.user_website_settings(is_published);

-- Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_user_website_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
CREATE TRIGGER update_user_website_settings_updated_at_trigger
  BEFORE UPDATE ON public.user_website_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_user_website_settings_updated_at();

-- Grant permissions
GRANT ALL ON public.user_website_settings TO authenticated;

-- Success message
SELECT 'User website settings table created successfully!' as result;

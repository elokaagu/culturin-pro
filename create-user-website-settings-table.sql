-- Create user_website_settings table for user-specific website configurations
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.user_website_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  company_name TEXT DEFAULT 'Your Cultural Tours',
  tagline TEXT DEFAULT 'Discover Authentic Cultural Experiences',
  description TEXT DEFAULT 'We specialize in creating immersive cultural experiences that connect you with local traditions and communities.',
  contact_info JSONB DEFAULT '{"phone": "", "email": "", "address": ""}',
  social_media JSONB DEFAULT '{}',
  branding JSONB DEFAULT '{"primary_color": "#9b87f5", "theme": "classic"}',
  website_settings JSONB DEFAULT '{"show_booking": true, "show_reviews": true, "show_testimonials": true, "currency": "USD", "language": "en", "timezone": "UTC"}',
  seo_settings JSONB DEFAULT '{"keywords": ["cultural tours", "authentic experiences", "travel"]}',
  published_url TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_website_settings_user_id ON public.user_website_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_user_website_settings_published_url ON public.user_website_settings(published_url);
CREATE INDEX IF NOT EXISTS idx_user_website_settings_is_published ON public.user_website_settings(is_published);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_website_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_user_website_settings_updated_at_trigger
  BEFORE UPDATE ON public.user_website_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_user_website_settings_updated_at();

-- Grant permissions to authenticated users
GRANT ALL ON public.user_website_settings TO authenticated;

-- Insert a sample record for testing (optional)
-- INSERT INTO public.user_website_settings (user_id, company_name, tagline) 
-- VALUES ('00000000-0000-0000-0000-000000000000', 'Sample Company', 'Sample Tagline');

COMMENT ON TABLE public.user_website_settings IS 'Stores user-specific website configuration and settings';
COMMENT ON COLUMN public.user_website_settings.user_id IS 'Reference to the user who owns these settings';
COMMENT ON COLUMN public.user_website_settings.company_name IS 'The company or business name';
COMMENT ON COLUMN public.user_website_settings.tagline IS 'The company tagline or slogan';
COMMENT ON COLUMN public.user_website_settings.description IS 'Detailed company description';
COMMENT ON COLUMN public.user_website_settings.contact_info IS 'JSON object containing contact information';
COMMENT ON COLUMN public.user_website_settings.social_media IS 'JSON object containing social media links';
COMMENT ON COLUMN public.user_website_settings.branding IS 'JSON object containing branding preferences';
COMMENT ON COLUMN public.user_website_settings.website_settings IS 'JSON object containing website configuration';
COMMENT ON COLUMN public.user_website_settings.seo_settings IS 'JSON object containing SEO preferences';
COMMENT ON COLUMN public.user_website_settings.published_url IS 'The published website URL';
COMMENT ON COLUMN public.user_website_settings.is_published IS 'Whether the website is currently published';

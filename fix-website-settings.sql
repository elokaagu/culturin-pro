-- Fixed SQL script for user_website_settings table

-- Step 1: Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own website settings" ON public.user_website_settings;
DROP POLICY IF EXISTS "Users can insert their own website settings" ON public.user_website_settings;
DROP POLICY IF EXISTS "Users can update their own website settings" ON public.user_website_settings;
DROP POLICY IF EXISTS "Users can delete their own website settings" ON public.user_website_settings;

-- Step 2: Create new policies
CREATE POLICY "Users can view their own website settings" ON public.user_website_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own website settings" ON public.user_website_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own website settings" ON public.user_website_settings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own website settings" ON public.user_website_settings
  FOR DELETE USING (auth.uid() = user_id);

-- Step 3: Success message
SELECT 'Policies created successfully!' as result;

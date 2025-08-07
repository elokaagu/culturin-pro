-- Drop existing tables if they exist (for clean slate)
DROP TABLE IF EXISTS public.blog_posts CASCADE;
DROP TABLE IF EXISTS public.bookings CASCADE;
DROP TABLE IF EXISTS public.tours CASCADE;
DROP TABLE IF EXISTS public.itineraries CASCADE;
DROP TABLE IF EXISTS public.itinerary_modules CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- Drop existing functions and triggers
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Create users table
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

-- Enable RLS on users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;

-- Create policies for users
CREATE POLICY "Users can view their own user data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own user data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own user data" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
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
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create tours table
CREATE TABLE IF NOT EXISTS public.tours (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  duration TEXT,
  location TEXT,
  operator_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  image_url TEXT,
  category TEXT,
  max_participants INTEGER,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'inactive')),
  days INTEGER DEFAULT 1,
  theme_type TEXT DEFAULT 'cultural',
  regions TEXT[],
  currency TEXT DEFAULT 'USD',
  group_size_min INTEGER DEFAULT 1,
  group_size_max INTEGER DEFAULT 10,
  difficulty TEXT DEFAULT 'easy',
  tags TEXT[]
);

-- Enable RLS on tours
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Tours are viewable by everyone" ON public.tours;
DROP POLICY IF EXISTS "Operators can manage their own tours" ON public.tours;

-- Create policies for tours
CREATE POLICY "Tours are viewable by everyone" ON public.tours
  FOR SELECT USING (status = 'active');

CREATE POLICY "Operators can manage their own tours" ON public.tours
  FOR ALL USING (auth.uid() = operator_id);

-- Create itineraries table
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

-- Create itinerary_modules table
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

-- Enable RLS on itineraries
ALTER TABLE public.itineraries ENABLE ROW LEVEL SECURITY;

-- Enable RLS on itinerary_modules
ALTER TABLE public.itinerary_modules ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Itineraries are viewable by everyone when published" ON public.itineraries;
DROP POLICY IF EXISTS "Operators can manage their own itineraries" ON public.itineraries;
DROP POLICY IF EXISTS "Itinerary modules are viewable by everyone when itinerary is published" ON public.itinerary_modules;
DROP POLICY IF EXISTS "Operators can manage modules for their own itineraries" ON public.itinerary_modules;

-- Create policies for itineraries
CREATE POLICY "Itineraries are viewable by everyone when published" ON public.itineraries
  FOR SELECT USING (status = 'published');

CREATE POLICY "Operators can manage their own itineraries" ON public.itineraries
  FOR ALL USING (auth.uid() = operator_id);

-- Create policies for itinerary_modules
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

-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tour_id UUID REFERENCES public.tours(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  booking_date DATE NOT NULL,
  booking_time TIME,
  participants INTEGER NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT,
  special_requests TEXT,
  currency TEXT DEFAULT 'USD'
);

-- Enable RLS on bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can create their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Operators can view bookings for their tours" ON public.bookings;

-- Create policies for bookings
CREATE POLICY "Users can view their own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Operators can view bookings for their tours" ON public.bookings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.tours 
      WHERE tours.id = bookings.tour_id 
      AND tours.operator_id = auth.uid()
    )
  );

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT[] NOT NULL,
  category TEXT NOT NULL,
  author_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  featured_image_url TEXT,
  featured_image_path TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  meta_title TEXT,
  meta_description TEXT,
  tags TEXT[]
);

-- Enable RLS on blog_posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Blog posts are viewable by everyone when published" ON public.blog_posts;
DROP POLICY IF EXISTS "Authors can manage their own blog posts" ON public.blog_posts;

-- Create policies for blog_posts
CREATE POLICY "Blog posts are viewable by everyone when published" ON public.blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Authors can manage their own blog posts" ON public.blog_posts
  FOR ALL USING (auth.uid() = author_id);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('blog-images', 'blog-images', true),
  ('tour-images', 'tour-images', true),
  ('itinerary-images', 'itinerary-images', true),
  ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies if they exist
DROP POLICY IF EXISTS "Blog Images Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Tour Images Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Itinerary Images Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Avatars Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own uploads" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own uploads" ON storage.objects;

-- Create storage policies
CREATE POLICY "Blog Images Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');
CREATE POLICY "Tour Images Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'tour-images');
CREATE POLICY "Itinerary Images Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'itinerary-images');
CREATE POLICY "Avatars Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update their own uploads" ON storage.objects FOR UPDATE USING (auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete their own uploads" ON storage.objects FOR DELETE USING (auth.uid()::text = (storage.foldername(name))[1]);

-- Create loyalty_cards table
CREATE TABLE IF NOT EXISTS public.loyalty_cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  card_id TEXT UNIQUE NOT NULL,
  tier TEXT DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
  balance DECIMAL(15,2) DEFAULT 0,
  rewards_balance DECIMAL(15,2) DEFAULT 0,
  wallet_address TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended')),
  kyc_status TEXT DEFAULT 'pending',
  aml_check TEXT DEFAULT 'pending',
  member_since TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create loyalty_transactions table
CREATE TABLE IF NOT EXISTS public.loyalty_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  card_id UUID REFERENCES public.loyalty_cards(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES public.bookings(id),
  amount DECIMAL(15,2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('purchase', 'reward', 'refund', 'transfer')),
  blockchain_tx_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on loyalty_cards
ALTER TABLE public.loyalty_cards ENABLE ROW LEVEL SECURITY;

-- Create policies for loyalty_cards
CREATE POLICY "Users can view their own loyalty cards" ON public.loyalty_cards
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own loyalty cards" ON public.loyalty_cards
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own loyalty cards" ON public.loyalty_cards
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Enable RLS on loyalty_transactions
ALTER TABLE public.loyalty_transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for loyalty_transactions
CREATE POLICY "Users can view their own loyalty transactions" ON public.loyalty_transactions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.loyalty_cards 
      WHERE loyalty_cards.id = loyalty_transactions.card_id 
      AND loyalty_cards.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own loyalty transactions" ON public.loyalty_transactions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.loyalty_cards 
      WHERE loyalty_cards.id = loyalty_transactions.card_id 
      AND loyalty_cards.user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tours_operator_id ON public.tours(operator_id);
CREATE INDEX IF NOT EXISTS idx_tours_status ON public.tours(status);
CREATE INDEX IF NOT EXISTS idx_itineraries_operator_id ON public.itineraries(operator_id);
CREATE INDEX IF NOT EXISTS idx_itineraries_status ON public.itineraries(status);
CREATE INDEX IF NOT EXISTS idx_itinerary_modules_itinerary_id ON public.itinerary_modules(itinerary_id);
CREATE INDEX IF NOT EXISTS idx_itinerary_modules_day ON public.itinerary_modules(day);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_tour_id ON public.bookings(tour_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_id ON public.blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug); 
CREATE INDEX IF NOT EXISTS idx_loyalty_cards_user_id ON public.loyalty_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_loyalty_cards_card_id ON public.loyalty_cards(card_id);
CREATE INDEX IF NOT EXISTS idx_loyalty_transactions_card_id ON public.loyalty_transactions(card_id);
CREATE INDEX IF NOT EXISTS idx_loyalty_transactions_created_at ON public.loyalty_transactions(created_at);

-- Cards System
CREATE TABLE IF NOT EXISTS public.cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    operator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    cardholder_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    card_token TEXT UNIQUE NOT NULL, -- Tokenized card ID from issuing partner
    card_type TEXT NOT NULL CHECK (card_type IN ('virtual', 'physical')),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'frozen', 'cancelled', 'shipped')),
    monthly_limit DECIMAL(10,2) NOT NULL,
    daily_limit DECIMAL(10,2),
    weekly_limit DECIMAL(10,2),
    current_balance DECIMAL(10,2) DEFAULT 0.00,
    blocked_categories TEXT[], -- Array of blocked merchant categories
    funding_source TEXT DEFAULT 'culturin-wallet' CHECK (funding_source IN ('culturin-wallet', 'bank-account', 'manual')),
    shipping_address JSONB, -- For physical cards
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.card_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    card_id UUID REFERENCES public.cards(id) ON DELETE CASCADE,
    transaction_id TEXT UNIQUE NOT NULL, -- From issuing partner
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    merchant_name TEXT,
    merchant_category TEXT,
    location TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'declined')),
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('purchase', 'refund', 'adjustment')),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.card_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    operator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    default_monthly_limit DECIMAL(10,2) DEFAULT 1000.00,
    default_daily_limit DECIMAL(10,2) DEFAULT 200.00,
    default_weekly_limit DECIMAL(10,2) DEFAULT 500.00,
    default_funding_source TEXT DEFAULT 'culturin-wallet',
    auto_freeze_on_limit BOOLEAN DEFAULT true,
    require_approval BOOLEAN DEFAULT false,
    default_blocked_categories TEXT[] DEFAULT ARRAY['gambling', 'jewelry'],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for cards system
CREATE INDEX IF NOT EXISTS idx_cards_operator_id ON public.cards(operator_id);
CREATE INDEX IF NOT EXISTS idx_cards_cardholder_id ON public.cards(cardholder_id);
CREATE INDEX IF NOT EXISTS idx_cards_status ON public.cards(status);
CREATE INDEX IF NOT EXISTS idx_cards_card_type ON public.cards(card_type);
CREATE INDEX IF NOT EXISTS idx_card_transactions_card_id ON public.card_transactions(card_id);
CREATE INDEX IF NOT EXISTS idx_card_transactions_status ON public.card_transactions(status);
CREATE INDEX IF NOT EXISTS idx_card_transactions_created_at ON public.card_transactions(created_at);
CREATE INDEX IF NOT EXISTS idx_card_settings_operator_id ON public.card_settings(operator_id);

-- RLS Policies for cards system
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.card_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.card_settings ENABLE ROW LEVEL SECURITY;

-- Cards policies
CREATE POLICY "Operators can view their own cards" ON public.cards
    FOR SELECT USING (auth.uid() = operator_id);

CREATE POLICY "Operators can update their own cards" ON public.cards
    FOR UPDATE USING (auth.uid() = operator_id);

CREATE POLICY "Operators can insert their own cards" ON public.cards
    FOR INSERT WITH CHECK (auth.uid() = operator_id);

-- Cardholders can view their assigned cards
CREATE POLICY "Cardholders can view their assigned cards" ON public.cards
    FOR SELECT USING (auth.uid() = cardholder_id);

-- Card transactions policies
CREATE POLICY "Operators can view transactions for their cards" ON public.card_transactions
    FOR SELECT USING (auth.uid() IN (
        SELECT operator_id FROM public.cards WHERE id = card_transactions.card_id
    ));

CREATE POLICY "Cardholders can view their own transactions" ON public.card_transactions
    FOR SELECT USING (auth.uid() IN (
        SELECT cardholder_id FROM public.cards WHERE id = card_transactions.card_id
    ));

-- Card settings policies
CREATE POLICY "Operators can view their own card settings" ON public.card_settings
    FOR SELECT USING (auth.uid() = operator_id);

CREATE POLICY "Operators can update their own card settings" ON public.card_settings
    FOR UPDATE USING (auth.uid() = operator_id);

CREATE POLICY "Operators can insert their own card settings" ON public.card_settings
    FOR INSERT WITH CHECK (auth.uid() = operator_id); 
-- Migration script for Culturin Cards System
-- Run this in your Supabase SQL editor

-- Drop existing cards tables if they exist (for clean slate)
DROP TABLE IF EXISTS public.card_transactions CASCADE;
DROP TABLE IF EXISTS public.card_settings CASCADE;
DROP TABLE IF EXISTS public.cards CASCADE;

-- Drop existing policies
DROP POLICY IF EXISTS "Operators can view their own cards" ON public.cards;
DROP POLICY IF EXISTS "Operators can update their own cards" ON public.cards;
DROP POLICY IF EXISTS "Operators can insert their own cards" ON public.cards;
DROP POLICY IF EXISTS "Cardholders can view their assigned cards" ON public.cards;
DROP POLICY IF EXISTS "Operators can view transactions for their cards" ON public.card_transactions;
DROP POLICY IF EXISTS "Cardholders can view their own transactions" ON public.card_transactions;
DROP POLICY IF EXISTS "Operators can view their own card settings" ON public.card_settings;
DROP POLICY IF EXISTS "Operators can update their own card settings" ON public.card_settings;
DROP POLICY IF EXISTS "Operators can insert their own card settings" ON public.card_settings;

-- Create Cards System Tables
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

-- Create Indexes for cards system
CREATE INDEX IF NOT EXISTS idx_cards_operator_id ON public.cards(operator_id);
CREATE INDEX IF NOT EXISTS idx_cards_cardholder_id ON public.cards(cardholder_id);
CREATE INDEX IF NOT EXISTS idx_cards_status ON public.cards(status);
CREATE INDEX IF NOT EXISTS idx_cards_card_type ON public.cards(card_type);
CREATE INDEX IF NOT EXISTS idx_card_transactions_card_id ON public.card_transactions(card_id);
CREATE INDEX IF NOT EXISTS idx_card_transactions_status ON public.card_transactions(status);
CREATE INDEX IF NOT EXISTS idx_card_transactions_created_at ON public.card_transactions(created_at);
CREATE INDEX IF NOT EXISTS idx_card_settings_operator_id ON public.card_settings(operator_id);

-- Enable RLS on all cards tables
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.card_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.card_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for cards
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

-- Insert some sample data for testing
INSERT INTO public.card_settings (operator_id, default_monthly_limit, default_daily_limit, default_weekly_limit)
SELECT id, 1000.00, 200.00, 500.00
FROM auth.users
WHERE email = 'eloka.agu@icloud.com'
ON CONFLICT (operator_id) DO NOTHING;

-- Success message
SELECT 'Cards system migration completed successfully!' as status; 
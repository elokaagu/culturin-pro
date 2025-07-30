-- Step-by-step migration for Culturin Cards System
-- Run this in your Supabase SQL editor

-- STEP 1: Create the cards table first
CREATE TABLE IF NOT EXISTS public.cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    operator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    cardholder_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    card_token TEXT UNIQUE NOT NULL,
    card_type TEXT NOT NULL CHECK (card_type IN ('virtual', 'physical')),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'frozen', 'cancelled', 'shipped')),
    monthly_limit DECIMAL(10,2) NOT NULL,
    daily_limit DECIMAL(10,2),
    weekly_limit DECIMAL(10,2),
    current_balance DECIMAL(10,2) DEFAULT 0.00,
    blocked_categories TEXT[],
    funding_source TEXT DEFAULT 'culturin-wallet' CHECK (funding_source IN ('culturin-wallet', 'bank-account', 'manual')),
    shipping_address JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- STEP 2: Create the card_transactions table
CREATE TABLE IF NOT EXISTS public.card_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    card_id UUID REFERENCES public.cards(id) ON DELETE CASCADE,
    transaction_id TEXT UNIQUE NOT NULL,
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

-- STEP 3: Create the card_settings table
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

-- STEP 4: Create indexes
CREATE INDEX IF NOT EXISTS idx_cards_operator_id ON public.cards(operator_id);
CREATE INDEX IF NOT EXISTS idx_cards_cardholder_id ON public.cards(cardholder_id);
CREATE INDEX IF NOT EXISTS idx_cards_status ON public.cards(status);
CREATE INDEX IF NOT EXISTS idx_cards_card_type ON public.cards(card_type);
CREATE INDEX IF NOT EXISTS idx_card_transactions_card_id ON public.card_transactions(card_id);
CREATE INDEX IF NOT EXISTS idx_card_transactions_status ON public.card_transactions(status);
CREATE INDEX IF NOT EXISTS idx_card_transactions_created_at ON public.card_transactions(created_at);
CREATE INDEX IF NOT EXISTS idx_card_settings_operator_id ON public.card_settings(operator_id);

-- STEP 5: Enable RLS
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.card_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.card_settings ENABLE ROW LEVEL SECURITY;

-- STEP 6: Create policies for cards table
CREATE POLICY "Operators can view their own cards" ON public.cards
    FOR SELECT USING (auth.uid() = operator_id);

CREATE POLICY "Operators can update their own cards" ON public.cards
    FOR UPDATE USING (auth.uid() = operator_id);

CREATE POLICY "Operators can insert their own cards" ON public.cards
    FOR INSERT WITH CHECK (auth.uid() = operator_id);

CREATE POLICY "Cardholders can view their assigned cards" ON public.cards
    FOR SELECT USING (auth.uid() = cardholder_id);

-- STEP 7: Create policies for card_transactions table
CREATE POLICY "Operators can view transactions for their cards" ON public.card_transactions
    FOR SELECT USING (auth.uid() IN (
        SELECT operator_id FROM public.cards WHERE id = card_transactions.card_id
    ));

CREATE POLICY "Cardholders can view their own transactions" ON public.card_transactions
    FOR SELECT USING (auth.uid() IN (
        SELECT cardholder_id FROM public.cards WHERE id = card_transactions.card_id
    ));

-- STEP 8: Create policies for card_settings table
CREATE POLICY "Operators can view their own card settings" ON public.card_settings
    FOR SELECT USING (auth.uid() = operator_id);

CREATE POLICY "Operators can update their own card settings" ON public.card_settings
    FOR UPDATE USING (auth.uid() = operator_id);

CREATE POLICY "Operators can insert their own card settings" ON public.card_settings
    FOR INSERT WITH CHECK (auth.uid() = operator_id);

-- STEP 9: Insert sample settings for testing
INSERT INTO public.card_settings (operator_id, default_monthly_limit, default_daily_limit, default_weekly_limit)
SELECT id, 1000.00, 200.00, 500.00
FROM auth.users
WHERE email = 'eloka.agu@icloud.com'
ON CONFLICT (operator_id) DO NOTHING;

-- STEP 10: Verify tables were created
SELECT 'Tables created successfully!' as status;
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'card%'; 
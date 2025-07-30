-- Fix script for card_settings table
-- Run this in your Supabase SQL editor to fix the ON CONFLICT error

-- Add unique constraint to operator_id if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'card_settings_operator_id_key'
    ) THEN
        ALTER TABLE public.card_settings ADD CONSTRAINT card_settings_operator_id_key UNIQUE (operator_id);
    END IF;
END $$;

-- Now insert sample settings safely
INSERT INTO public.card_settings (operator_id, default_monthly_limit, default_daily_limit, default_weekly_limit)
SELECT id, 1000.00, 200.00, 500.00
FROM auth.users
WHERE email = 'eloka.agu@icloud.com'
ON CONFLICT (operator_id) DO NOTHING;

-- Verify the fix
SELECT 'Card settings table fixed successfully!' as status;
SELECT * FROM public.card_settings; 
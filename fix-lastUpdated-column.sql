-- Fix the lastUpdated column naming issue in itineraries table
-- The frontend expects 'lastUpdated' (camelCase) but database has 'last_updated' (snake_case)

-- First, check if the column exists with the old name
DO $$ 
BEGIN
    -- If last_updated exists, rename it to lastUpdated
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'itineraries' 
        AND column_name = 'last_updated'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.itineraries RENAME COLUMN last_updated TO "lastUpdated";
        RAISE NOTICE 'Renamed last_updated column to lastUpdated';
    END IF;
    
    -- If neither exists, add the lastUpdated column
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'itineraries' 
        AND column_name = 'lastUpdated'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.itineraries ADD COLUMN "lastUpdated" TEXT DEFAULT 'just now';
        RAISE NOTICE 'Added lastUpdated column';
    END IF;
END $$;

-- Verify the column exists
SELECT column_name, data_type, column_default
FROM information_schema.columns 
WHERE table_name = 'itineraries' 
AND table_schema = 'public'
AND column_name IN ('last_updated', 'lastUpdated')
ORDER BY column_name;

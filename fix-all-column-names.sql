-- Fix all column naming mismatches between frontend (camelCase) and database (snake_case)
-- The frontend expects camelCase but database has snake_case

-- Fix itineraries table column names
DO $$ 
BEGIN
    -- Rename theme_type to themeType
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'itineraries' 
        AND column_name = 'theme_type'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.itineraries RENAME COLUMN theme_type TO "themeType";
        RAISE NOTICE 'Renamed theme_type column to themeType';
    END IF;
    
    -- Rename last_updated to lastUpdated
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
    
    -- Rename group_size_min to groupSizeMin
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'itineraries' 
        AND column_name = 'group_size_min'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.itineraries RENAME COLUMN group_size_min TO "groupSizeMin";
        RAISE NOTICE 'Renamed group_size_min column to groupSizeMin';
    END IF;
    
    -- Rename group_size_max to groupSizeMax
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'itineraries' 
        AND column_name = 'group_size_max'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.itineraries RENAME COLUMN group_size_max TO "groupSizeMax";
        RAISE NOTICE 'Renamed group_size_max column to groupSizeMax';
    END IF;
    
    -- Rename operator_id to operatorId (note: keep snake_case for foreign keys to match auth table)
    -- Actually, let's keep operator_id as is since it references users table
    
    -- Add any missing columns if they don't exist
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'itineraries' 
        AND column_name = 'themeType'
        AND table_schema = 'public'
    ) AND NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'itineraries' 
        AND column_name = 'theme_type'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.itineraries ADD COLUMN "themeType" TEXT DEFAULT 'cultural';
        RAISE NOTICE 'Added themeType column';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'itineraries' 
        AND column_name = 'lastUpdated'
        AND table_schema = 'public'
    ) AND NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'itineraries' 
        AND column_name = 'last_updated'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.itineraries ADD COLUMN "lastUpdated" TEXT DEFAULT 'just now';
        RAISE NOTICE 'Added lastUpdated column';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'itineraries' 
        AND column_name = 'groupSizeMin'
        AND table_schema = 'public'
    ) AND NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'itineraries' 
        AND column_name = 'group_size_min'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.itineraries ADD COLUMN "groupSizeMin" INTEGER DEFAULT 1;
        RAISE NOTICE 'Added groupSizeMin column';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'itineraries' 
        AND column_name = 'groupSizeMax'
        AND table_schema = 'public'
    ) AND NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'itineraries' 
        AND column_name = 'group_size_max'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.itineraries ADD COLUMN "groupSizeMax" INTEGER DEFAULT 10;
        RAISE NOTICE 'Added groupSizeMax column';
    END IF;
END $$;

-- Verify the columns exist
SELECT column_name, data_type, column_default
FROM information_schema.columns 
WHERE table_name = 'itineraries' 
AND table_schema = 'public'
AND column_name IN ('themeType', 'theme_type', 'lastUpdated', 'last_updated', 'groupSizeMin', 'group_size_min', 'groupSizeMax', 'group_size_max', 'operator_id')
ORDER BY column_name;

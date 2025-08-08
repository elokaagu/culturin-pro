-- Verify and fix user data issues
-- Run this in your Supabase SQL Editor

-- Step 1: Show any duplicate emails
SELECT email, COUNT(*) as count, array_agg(id) as user_ids
FROM public.users
GROUP BY email
HAVING COUNT(*) > 1;

-- Step 2: Show any orphaned users (no matching auth.users record)
SELECT u.* 
FROM public.users u
LEFT JOIN auth.users au ON u.id = au.id
WHERE au.id IS NULL;

-- Step 3: Show any auth users without a profile
SELECT au.* 
FROM auth.users au
LEFT JOIN public.users u ON au.id = u.id
WHERE u.id IS NULL;

-- Step 4: Clean up orphaned records
DELETE FROM public.users u
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users au WHERE au.id = u.id
);

-- Step 5: Fix any remaining duplicate emails by keeping the most recent record
WITH duplicates AS (
  SELECT email, array_agg(id ORDER BY created_at DESC) as ids
  FROM public.users
  GROUP BY email
  HAVING COUNT(*) > 1
)
DELETE FROM public.users u
USING duplicates d
WHERE u.email = d.email
AND u.id = ANY(d.ids[2:]);

-- Step 6: Show final state
SELECT 'Cleanup complete!' as status;
SELECT COUNT(*) as total_users, 
       COUNT(DISTINCT email) as unique_emails
FROM public.users;

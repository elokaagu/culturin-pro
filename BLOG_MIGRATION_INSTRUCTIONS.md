# Blog Posts Migration Instructions

This guide will help you migrate all existing blog posts from the static data to your Supabase database.

## Prerequisites

1. Make sure you have created your `.env.local` file with Supabase credentials
2. Make sure you have run the `supabase-blog-setup.sql` script first to create the database tables
3. Your Supabase project should be running and accessible

## Option 1: Using SQL Script (Recommended)

1. **Open your Supabase Dashboard**

   - Go to https://supabase.com/dashboard
   - Select your project
   - Navigate to "SQL Editor"

2. **Run the Migration Script**

   - Copy the contents of `migrate-existing-blog-posts.sql`
   - Paste it into the SQL Editor
   - Click "Run" to execute the migration

3. **Verify the Migration**
   - The script will show statistics at the end
   - You should see 6 blog posts inserted
   - Check the `blog_posts` table in the Table Editor

## Option 2: Using Node.js Script

1. **Install Required Dependencies**

   ```bash
   npm install @supabase/supabase-js dotenv
   ```

2. **Create the Migration Script**
   Create a file called `migrate-blog-posts.js` with the Node.js migration code

3. **Run the Migration**
   ```bash
   node migrate-blog-posts.js
   ```

## What Gets Migrated

The migration includes all 6 existing blog posts:

1. **5 Strategies to Increase Tour Bookings During Slow Seasons** (Marketing)
2. **How Cultural Tour Operators Can Create More Immersive Experiences** (Experience Design)
3. **The Rise of Solo Cultural Tourism: What Operators Need to Know** (Industry Trends)
4. **Using Customer Data to Personalize Cultural Experiences** (Technology)
5. **Sustainable Cultural Tourism: Balancing Growth with Preservation** (Sustainability)
6. **Tour Operator Success Story: Barcelona Food Tours Increases Bookings by 35%** (Case Study)

## Migration Details

Each blog post will be inserted with:

- ✅ Original title, slug, excerpt, and content
- ✅ Proper category assignment
- ✅ Featured image URLs from Unsplash
- ✅ Published status set to `true`
- ✅ Publication dates preserved
- ✅ SEO meta titles and descriptions
- ✅ Relevant tags automatically generated
- ✅ Author set to "Culturin Editorial Team"
- ✅ Proper timestamps

## After Migration

1. **Test Your Blog Pages**

   - Visit `/blog` to see all posts
   - Click on individual posts to verify they display correctly
   - Check that images load properly

2. **Admin Panel Access**

   - Go to `/admin/blog` to manage posts
   - You should see all migrated posts
   - Test editing and creating new posts

3. **SEO Verification**
   - Check that meta titles and descriptions are set
   - Verify that slugs work correctly for SEO-friendly URLs

## Troubleshooting

### If you get permission errors:

- Make sure your Supabase RLS policies allow authenticated users to insert/read blog posts
- Check that your API keys have the correct permissions

### If posts don't appear:

- Verify the `published` field is set to `true`
- Check that the `published_at` date is not in the future
- Ensure your frontend is fetching from the database, not static data

### If images don't load:

- The migration uses Unsplash URLs which should work immediately
- If you want to use your own images, upload them to Supabase Storage and update the URLs

## Next Steps

After successful migration:

1. Update your blog components to fetch from database instead of static data
2. Consider removing the static `data/blogPosts.ts` file
3. Start creating new blog posts through the admin interface
4. Set up automated backups for your blog content

## Support

If you encounter any issues during migration, check:

- Supabase project status and connectivity
- Database table structure matches the expected schema
- Environment variables are correctly set
- No conflicts with existing data (the script uses `ON CONFLICT (slug) DO NOTHING`)

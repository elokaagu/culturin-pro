-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT[] NOT NULL DEFAULT '{}',
    category TEXT NOT NULL,
    author_id UUID NOT NULL,
    author_name TEXT NOT NULL,
    author_email TEXT NOT NULL,
    featured_image_url TEXT,
    featured_image_path TEXT,
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    meta_title TEXT,
    meta_description TEXT,
    tags TEXT[] DEFAULT '{}'
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_posts
-- Allow public read access to published posts
CREATE POLICY "Public can view published blog posts" ON blog_posts
    FOR SELECT USING (published = true);

-- Allow authenticated users to view all posts (for admin)
CREATE POLICY "Authenticated users can view all blog posts" ON blog_posts
    FOR SELECT TO authenticated USING (true);

-- Allow authenticated users to insert posts
CREATE POLICY "Authenticated users can insert blog posts" ON blog_posts
    FOR INSERT TO authenticated WITH CHECK (true);

-- Allow authenticated users to update posts
CREATE POLICY "Authenticated users can update blog posts" ON blog_posts
    FOR UPDATE TO authenticated USING (true);

-- Allow authenticated users to delete posts
CREATE POLICY "Authenticated users can delete blog posts" ON blog_posts
    FOR DELETE TO authenticated USING (true);

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for blog images
-- Allow public read access to blog images
CREATE POLICY "Public can view blog images" ON storage.objects
    FOR SELECT USING (bucket_id = 'blog-images');

-- Allow authenticated users to upload blog images
CREATE POLICY "Authenticated users can upload blog images" ON storage.objects
    FOR INSERT TO authenticated WITH CHECK (bucket_id = 'blog-images');

-- Allow authenticated users to update blog images
CREATE POLICY "Authenticated users can update blog images" ON storage.objects
    FOR UPDATE TO authenticated USING (bucket_id = 'blog-images');

-- Allow authenticated users to delete blog images
CREATE POLICY "Authenticated users can delete blog images" ON storage.objects
    FOR DELETE TO authenticated USING (bucket_id = 'blog-images');

-- Insert some sample blog posts (optional)
INSERT INTO blog_posts (
    title, 
    slug, 
    excerpt, 
    content, 
    category, 
    author_id, 
    author_name, 
    author_email, 
    published, 
    published_at,
    meta_title,
    meta_description,
    tags
) VALUES 
(
    'Welcome to Culturin Blog',
    'welcome-to-culturin-blog',
    'Discover insights, strategies, and inspiration for cultural experience creators and tour operators.',
    ARRAY[
        'Welcome to the Culturin blog, your go-to resource for insights, strategies, and inspiration in the world of cultural tourism and experience creation.',
        'Here, we share valuable content to help tour operators, cultural experience creators, and travel entrepreneurs build successful businesses while promoting authentic cultural exchange.',
        'Our blog covers topics ranging from marketing strategies and operational best practices to cultural sensitivity and sustainable tourism approaches.',
        'Whether you''re just starting your journey in cultural tourism or looking to scale your existing operations, you''ll find actionable insights and expert advice to help you succeed.',
        'Join our community of cultural experience creators and let''s build a more connected and understanding world through authentic travel experiences.'
    ],
    'Cultural Experiences',
    gen_random_uuid(),
    'Culturin Team',
    'hello@culturin.com',
    true,
    now(),
    'Welcome to Culturin Blog - Cultural Tourism Insights',
    'Discover insights, strategies, and inspiration for cultural experience creators and tour operators on the Culturin blog.',
    ARRAY['welcome', 'cultural-tourism', 'travel', 'blog-launch']
),
(
    'Building Authentic Cultural Experiences',
    'building-authentic-cultural-experiences',
    'Learn how to create meaningful cultural experiences that respect local traditions while providing value to travelers.',
    ARRAY[
        'Creating authentic cultural experiences is at the heart of meaningful travel. It''s about bridging the gap between visitors and local communities in a way that benefits everyone involved.',
        'Authenticity doesn''t mean turning culture into a performance. Instead, it means creating opportunities for genuine interaction and understanding between travelers and locals.',
        'Start by building relationships with local community members. Listen to their stories, understand their perspectives, and learn about their daily lives beyond the tourist attractions.',
        'Involve local people as partners, not just service providers. Give them agency in how their culture is shared and ensure they benefit economically from tourism activities.',
        'Focus on storytelling that goes beyond surface-level facts. Share the emotions, struggles, and triumphs that make each culture unique and relatable.',
        'Remember that cultural exchange is a two-way street. Encourage travelers to share their own stories and create opportunities for meaningful dialogue.'
    ],
    'Cultural Experiences',
    gen_random_uuid(),
    'Sarah Martinez',
    'sarah@culturin.com',
    true,
    now(),
    'Building Authentic Cultural Experiences - A Guide for Tour Operators',
    'Learn how to create meaningful cultural experiences that respect local traditions while providing value to travelers.',
    ARRAY['authentic-travel', 'cultural-experiences', 'community-tourism', 'travel-tips']
),
(
    'Marketing Your Cultural Tours in 2024',
    'marketing-cultural-tours-2024',
    'Effective marketing strategies for promoting cultural tours and experiences in today''s digital landscape.',
    ARRAY[
        'Marketing cultural tours in 2024 requires a blend of digital savvy and authentic storytelling. The landscape has evolved significantly, with travelers seeking more meaningful and personalized experiences.',
        'Social media remains crucial, but the approach has shifted from generic promotional posts to authentic storytelling. Share behind-the-scenes content, local stories, and real experiences from past travelers.',
        'User-generated content is gold. Encourage your guests to share their experiences and create a community around your brand. Authentic reviews and photos from real travelers carry more weight than any professional marketing material.',
        'SEO and content marketing are essential for long-term success. Create valuable content that addresses your potential customers'' questions and concerns about cultural travel.',
        'Email marketing still delivers excellent ROI. Build a newsletter that provides value beyond just promotional content – share cultural insights, travel tips, and stories from your destinations.',
        'Consider partnerships with local influencers and cultural ambassadors who can authentically represent your experiences to their communities.',
        'Don''t forget about offline marketing. Partner with cultural centers, museums, and community organizations to reach people who are already interested in cultural experiences.'
    ],
    'Marketing',
    gen_random_uuid(),
    'David Chen',
    'david@culturin.com',
    true,
    now(),
    'Marketing Your Cultural Tours in 2024 - Digital Strategies That Work',
    'Effective marketing strategies for promoting cultural tours and experiences in today''s digital landscape.',
    ARRAY['marketing', 'digital-marketing', 'tour-operators', 'social-media', 'seo']
)
ON CONFLICT (slug) DO NOTHING; 
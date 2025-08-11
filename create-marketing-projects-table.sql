-- Create marketing projects table for persistent storage
CREATE TABLE IF NOT EXISTS marketing_projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL, -- 'blog', 'social', 'email', 'flyer', 'scratch', 'url_import'
    platform VARCHAR(100), -- 'instagram', 'facebook', 'twitter', 'linkedin', 'email', 'general'
    content TEXT,
    metadata JSONB, -- Store additional project data like attachments, settings, etc.
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'archived', 'deleted'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat conversations table for persistent chat history
CREATE TABLE IF NOT EXISTS marketing_conversations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES marketing_projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    message_type VARCHAR(20) NOT NULL, -- 'user' or 'bot'
    content TEXT NOT NULL,
    metadata JSONB, -- Store attachments, generated content, images, etc.
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sequence_order INTEGER NOT NULL -- To maintain conversation order
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_marketing_projects_user_id ON marketing_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_marketing_projects_type ON marketing_projects(type);
CREATE INDEX IF NOT EXISTS idx_marketing_projects_created_at ON marketing_projects(created_at);
CREATE INDEX IF NOT EXISTS idx_marketing_conversations_project_id ON marketing_conversations(project_id);
CREATE INDEX IF NOT EXISTS idx_marketing_conversations_sequence ON marketing_conversations(project_id, sequence_order);

-- Enable Row Level Security
ALTER TABLE marketing_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_conversations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own marketing projects" ON marketing_projects
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own marketing projects" ON marketing_projects
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own marketing projects" ON marketing_projects
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own marketing projects" ON marketing_projects
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view conversations for their own projects" ON marketing_conversations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM marketing_projects 
            WHERE id = marketing_conversations.project_id 
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert conversations for their own projects" ON marketing_conversations
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM marketing_projects 
            WHERE id = marketing_conversations.project_id 
            AND user_id = auth.uid()
        )
    );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_marketing_projects_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER trigger_update_marketing_projects_updated_at
    BEFORE UPDATE ON marketing_projects
    FOR EACH ROW
    EXECUTE FUNCTION update_marketing_projects_updated_at();

-- Create function to update last_accessed timestamp
CREATE OR REPLACE FUNCTION update_marketing_projects_last_accessed()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_accessed = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update last_accessed
CREATE TRIGGER trigger_update_marketing_projects_last_accessed
    BEFORE UPDATE ON marketing_projects
    FOR EACH ROW
    EXECUTE FUNCTION update_marketing_projects_last_accessed();

-- Insert some sample data for testing
INSERT INTO marketing_projects (user_id, title, type, platform, content, metadata) VALUES
    ('00000000-0000-0000-0000-000000000000', 'Barcelona Tapas Experience Marketing Campaign', 'social', 'instagram', 'Marketing campaign for Barcelona tapas experience', '{"tags": ["barcelona", "tapas", "food", "culture"]}'),
    ('00000000-0000-0000-0000-000000000000', 'Traditional Moroccan Cooking Class Promotion', 'social', 'facebook', 'Promotion for Moroccan cooking class', '{"tags": ["morocco", "cooking", "culture", "food"]}'),
    ('00000000-0000-0000-0000-000000000000', 'Kyoto Tea Ceremony Cultural Experience', 'blog', 'general', 'Blog post about Kyoto tea ceremony', '{"tags": ["kyoto", "tea", "japan", "culture"]}'),
    ('00000000-0000-0000-0000-000000000000', 'Venice Gondola Ride Social Media Content', 'social', 'instagram', 'Social media content for Venice gondola rides', '{"tags": ["venice", "gondola", "italy", "romance"]}'),
    ('00000000-0000-0000-0000-000000000000', 'Istanbul Bazaar Cultural Tour Email Newsletter', 'email', 'email', 'Email newsletter for Istanbul bazaar tour', '{"tags": ["istanbul", "bazaar", "turkey", "culture"]}')
ON CONFLICT DO NOTHING;

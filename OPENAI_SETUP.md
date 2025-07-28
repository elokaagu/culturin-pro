# OpenAI Integration Setup Guide

This guide will help you set up the OpenAI integration for the AI-powered content generation features in Culturin Pro.

## Prerequisites

1. An OpenAI account with API access
2. A valid OpenAI API key

## Setup Instructions

### 1. Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign in or create an account
3. Navigate to the API Keys section
4. Create a new API key
5. Copy the API key (it starts with `sk-`)

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory of your project with the following variables:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Supabase Configuration (if not already set)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Other configurations
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

**Important:** Replace `your_openai_api_key_here` with your actual OpenAI API key.

### 3. Restart Your Development Server

After adding the environment variables, restart your development server:

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

## Available AI Features

Once configured, you'll have access to the following AI-powered content generation features:

### 1. Experience Description Generator

- Generates compelling descriptions for cultural experiences
- Customizable writing styles (Engaging, Informative, Casual, Professional)
- Optimized for attracting travelers

### 2. Blog Post Generator

- Creates engaging blog posts about cultural experiences
- SEO-optimized with target keywords
- Includes proper structure with headlines and subheadings

### 3. Email Campaign Generator

- Generates email marketing content
- Multiple campaign types (Promotional, Newsletter, Announcement, Follow-up)
- Includes subject lines and calls to action

## Usage

1. Navigate to the Marketing section in your Pro Dashboard
2. Go to the Content Creator tab
3. Fill in the experience details
4. Choose your desired content type
5. Click "Generate Content"
6. Copy and use the generated content

## API Endpoints

The following API endpoints are available:

- `POST /api/generate-description` - Generate experience descriptions
- `POST /api/generate-blog-post` - Generate blog posts
- `POST /api/generate-email-campaign` - Generate email campaigns

## Troubleshooting

### Common Issues

1. **"OpenAI API key not configured" error**

   - Make sure your `.env.local` file exists and contains the correct API key
   - Restart your development server after adding environment variables

2. **"Failed to generate content" error**

   - Check your OpenAI API key is valid and has sufficient credits
   - Verify your internet connection
   - Check the browser console for detailed error messages

3. **Rate limiting errors**
   - OpenAI has rate limits on API calls
   - Wait a moment and try again
   - Consider upgrading your OpenAI plan if you hit limits frequently

### Testing the Integration

To test if the integration is working:

1. Fill in the experience details form
2. Click "Generate Content" for any content type
3. You should see a loading spinner and then generated content
4. If you see an error, check the browser console for details

## Security Notes

- Never commit your `.env.local` file to version control
- The `.env.local` file is already in `.gitignore`
- Keep your OpenAI API key secure and don't share it publicly

## Cost Considerations

- OpenAI API calls are charged based on usage
- GPT-3.5-turbo is used for cost efficiency
- Monitor your OpenAI usage in the OpenAI dashboard
- Consider setting up usage alerts to avoid unexpected charges

## Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Verify your environment variables are correctly set
3. Check the browser console for error messages
4. Ensure your OpenAI account has sufficient credits

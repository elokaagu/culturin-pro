# Supabase Setup Guide for Culturin

This guide will help you complete the Supabase setup for your Culturin project.

## 🔧 Environment Variables

Create a `.env.local` file in your project root and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://leiesulmdjrfmufwjiam.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlaWVzdWxtZGpyZm11ZndqaWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExOTkwMDUsImV4cCI6MjA2Njc3NTAwNX0.7E0y71DcLV7Wo3mEmqOW7ztb_E-bA3GjLCjBb95n7oA
```

## 📊 Database Schema

Run these SQL commands in your Supabase SQL Editor to create the necessary tables:

### 1. Enable Row Level Security and Create Profiles Table

```sql
-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  updated_at TIMESTAMP WITH TIME ZONE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  PRIMARY KEY (id)
);

-- Set up Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone." ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

### 2. Create Tours Table

```sql
-- Create tours table
CREATE TABLE tours (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  duration TEXT,
  location TEXT,
  operator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT,
  category TEXT,
  max_participants INTEGER,
  status TEXT DEFAULT 'draft' CHECK (status IN ('active', 'inactive', 'draft'))
);

-- Enable RLS
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Tours are viewable by everyone." ON tours
  FOR SELECT USING (status = 'active');

CREATE POLICY "Operators can view their own tours." ON tours
  FOR SELECT USING (auth.uid() = operator_id);

CREATE POLICY "Operators can insert their own tours." ON tours
  FOR INSERT WITH CHECK (auth.uid() = operator_id);

CREATE POLICY "Operators can update their own tours." ON tours
  FOR UPDATE USING (auth.uid() = operator_id);

CREATE POLICY "Operators can delete their own tours." ON tours
  FOR DELETE USING (auth.uid() = operator_id);
```

### 3. Create Bookings Table

```sql
-- Create bookings table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  tour_id UUID REFERENCES tours(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  booking_date TIMESTAMP WITH TIME ZONE NOT NULL,
  participants INTEGER NOT NULL DEFAULT 1,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT,
  special_requests TEXT
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own bookings." ON bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Operators can view bookings for their tours." ON bookings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM tours
      WHERE tours.id = bookings.tour_id
      AND tours.operator_id = auth.uid()
    )
  );

CREATE POLICY "Users can create bookings." ON bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Operators can update bookings for their tours." ON bookings
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM tours
      WHERE tours.id = bookings.tour_id
      AND tours.operator_id = auth.uid()
    )
  );
```

### 4. Create Functions for Analytics

```sql
-- Function to get revenue data
CREATE OR REPLACE FUNCTION get_revenue_data(
  operator_id UUID,
  period_days INTEGER DEFAULT 30
)
RETURNS TABLE (
  date DATE,
  revenue DECIMAL,
  bookings_count INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    DATE(b.created_at) as date,
    SUM(b.total_price) as revenue,
    COUNT(*)::INTEGER as bookings_count
  FROM bookings b
  JOIN tours t ON b.tour_id = t.id
  WHERE t.operator_id = get_revenue_data.operator_id
    AND b.created_at >= NOW() - INTERVAL '1 day' * period_days
    AND b.status IN ('confirmed', 'completed')
  GROUP BY DATE(b.created_at)
  ORDER BY date DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## 🗂️ Storage Buckets

Create storage buckets for file uploads:

```sql
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
  ('tour-images', 'tour-images', true),
  ('profile-avatars', 'profile-avatars', true);

-- Set up storage policies
CREATE POLICY "Tour images are publicly accessible." ON storage.objects
  FOR SELECT USING (bucket_id = 'tour-images');

CREATE POLICY "Operators can upload tour images." ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'tour-images' AND auth.role() = 'authenticated');

CREATE POLICY "Profile avatars are publicly accessible." ON storage.objects
  FOR SELECT USING (bucket_id = 'profile-avatars');

CREATE POLICY "Users can upload their own avatar." ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'profile-avatars' AND auth.role() = 'authenticated');
```

## 🔐 Authentication Setup

### Email Templates (Optional)

Go to Authentication > Email Templates in your Supabase dashboard to customize:

1. **Confirm signup** - Welcome email with verification link
2. **Reset password** - Password reset instructions
3. **Magic link** - Passwordless login link

### Auth Providers (Optional)

Enable social login providers in Authentication > Providers:

- Google
- Facebook
- GitHub
- etc.

## 🚀 Usage Examples

### Using the Authentication Provider

Wrap your app with the AuthProvider:

```tsx
// app/layout.tsx
import { AuthProvider } from "@/components/auth/AuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

### Using the Login Form

```tsx
// pages/sign-in.tsx
import { LoginForm } from "@/components/auth/LoginForm";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm
        onSuccess={() => {
          // Redirect to dashboard or home page
          window.location.href = "/dashboard";
        }}
      />
    </div>
  );
}
```

### Using Supabase Hooks

```tsx
// Example component using tours data
import { useTours } from "@/hooks/useSupabase";

export function ToursGrid() {
  const { tours, loading, error, createTour } = useTours();

  if (loading) return <div>Loading tours...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tours.map((tour) => (
        <div key={tour.id} className="border rounded-lg p-4">
          <h3 className="font-bold">{tour.title}</h3>
          <p>{tour.description}</p>
          <p className="text-lg font-semibold">${tour.price}</p>
        </div>
      ))}
    </div>
  );
}
```

### Direct Supabase Usage

```tsx
import { supabase } from "@/lib/supabase";
import { tourUtils, bookingUtils } from "@/lib/supabase-utils";

// Fetch tours
const { data: tours, error } = await tourUtils.getActiveTours();

// Create a booking
const bookingData = {
  tour_id: "tour-uuid",
  user_id: "user-uuid",
  booking_date: "2024-01-15",
  participants: 2,
  total_price: 118.0,
  guest_name: "John Doe",
  guest_email: "john@example.com",
};

const { data: booking, error } = await bookingUtils.createBooking(bookingData);
```

## 🔍 Testing the Setup

1. **Test Authentication**: Try signing up and signing in
2. **Test Database**: Create a tour and booking
3. **Test Storage**: Upload an image
4. **Test Real-time**: Subscribe to table changes

## 📝 Next Steps

1. Set up your environment variables
2. Run the SQL commands in your Supabase dashboard
3. Test the authentication flow
4. Start building your tour operator features!

## 🛟 Troubleshooting

### Common Issues:

1. **Environment variables not loading**: Make sure `.env.local` is in your project root
2. **RLS policies blocking access**: Check your Row Level Security policies
3. **CORS errors**: Ensure your domain is added to Supabase allowed origins
4. **Type errors**: Generate TypeScript types from your Supabase dashboard

### Generate TypeScript Types:

```bash
npx supabase gen types typescript --project-id leiesulmdjrfmufwjiam > lib/database.types.ts
```

For more help, check the [Supabase documentation](https://supabase.com/docs) or reach out to the team!

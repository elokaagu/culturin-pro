# Setting Up Unik Ernest as Super Admin

This guide will help you create a login for **Unik Ernest** (`unik@culturin.com`) with super admin privileges, just like `eloka.agu@icloud.com`.

## 📋 User Details
- **Email**: `unik@culturin.com`
- **Name**: Unik Ernest
- **Password**: `culturin`
- **Role**: Super Admin
- **Studio Access**: Enabled

## 🚀 Method 1: Using the Node.js Script (Recommended)

### Prerequisites
1. Make sure you have the `SUPABASE_SERVICE_ROLE_KEY` from your Supabase dashboard
2. The service role key is found in: **Supabase Dashboard > Settings > API > Project API keys > service_role**

### Steps
1. **Set Environment Variables**:
   ```bash
   export SUPABASE_SERVICE_ROLE_KEY="your_service_role_key_here"
   export NEXT_PUBLIC_SUPABASE_URL="your_supabase_url_here"
   ```

2. **Run the Script**:
   ```bash
   node create-unik-user.js
   ```

3. **Verify Success**:
   The script will output confirmation that the user was created successfully.

## 🎯 Method 2: Manual Setup via Supabase Dashboard

### Step 1: Create Auth User
1. Go to **Supabase Dashboard > Authentication > Users**
2. Click **"Add User"**
3. Fill in the details:
   - **Email**: `unik@culturin.com`
   - **Password**: `culturin`
   - **Metadata**: `{"full_name": "Unik Ernest"}`
4. Click **"Create User"**

### Step 2: Update Database Function
1. Go to **Supabase Dashboard > SQL Editor**
2. Run the SQL script from `create-unik-admin.sql`
3. This updates the `handle_new_user()` function to recognize `unik@culturin.com` as admin

### Step 3: Verify User Record
1. Go to **Supabase Dashboard > Table Editor > users**
2. Look for the record with email `unik@culturin.com`
3. Ensure `role` is set to `admin` and `studio_access` is `true`

## 🔐 What This Gives Unik Ernest

- **Admin Dashboard Access** - Can access `/admin` routes
- **Studio Access** - Full access to Marketing Studio and all features
- **User Management** - Can manage other users and system settings
- **All Pro Dashboard Features** - Complete access to the platform

## 🧪 Testing the Login

1. **Sign Out** of your current account (if logged in)
2. **Sign In** with:
   - Email: `unik@culturin.com`
   - Password: `culturin`
3. **Verify Admin Access**:
   - Check that "Admin Dashboard" appears in the user menu
   - Navigate to `/admin` to confirm access
   - Check that all Studio features are accessible

## 🚨 Troubleshooting

### If the user can't sign in:
- Check that the auth user was created in **Authentication > Users**
- Verify the password is correct
- Check browser console for any errors

### If admin features aren't working:
- Run the SQL script to update the `handle_new_user()` function
- Check that the `public.users` record has `role: 'admin'`
- Verify `studio_access: true`

### If you get permission errors:
- Ensure you're using the **service role key** (not the anon key)
- Check that RLS policies are properly configured
- Verify the trigger function is working correctly

## 📞 Support

If you encounter any issues, check:
1. **Supabase Logs** - Dashboard > Logs
2. **Browser Console** - For frontend errors
3. **Network Tab** - For API request failures

---

**Note**: The service role key has full database access, so keep it secure and never expose it in client-side code.

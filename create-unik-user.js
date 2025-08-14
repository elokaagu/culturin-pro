// Create Unik Ernest User Account
// This script helps create a new admin user via Supabase

const { createClient } = require('@supabase/supabase-js');

// You'll need to set these environment variables or replace with your actual values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role key for admin operations

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables:');
  console.error('   NEXT_PUBLIC_SUPABASE_URL');
  console.error('   SUPABASE_SERVICE_ROLE_KEY');
  console.error('');
  console.error('Please set these environment variables and try again.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createUnikUser() {
  try {
    console.log('🚀 Creating Unik Ernest user account...');
    
    // Step 1: Create the user in auth.users
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: 'unik@culturin.com',
      password: 'culturin',
      email_confirm: true,
      user_metadata: {
        full_name: 'Unik Ernest'
      }
    });

    if (authError) {
      console.error('❌ Error creating auth user:', authError);
      return;
    }

    console.log('✅ Auth user created successfully:', authUser.user.id);
    
    // Step 2: The trigger should automatically create the public.users record
    // But let's verify and create it manually if needed
    const { data: publicUser, error: publicError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.user.id)
      .single();

    if (publicError || !publicUser) {
      console.log('⚠️  Public user record not found, creating manually...');
      
      const { data: newPublicUser, error: insertError } = await supabase
        .from('users')
        .insert({
          id: authUser.user.id,
          email: 'unik@culturin.com',
          full_name: 'Unik Ernest',
          role: 'admin',
          studio_access: true
        })
        .select()
        .single();

      if (insertError) {
        console.error('❌ Error creating public user record:', insertError);
        return;
      }

      console.log('✅ Public user record created:', newPublicUser);
    } else {
      console.log('✅ Public user record already exists:', publicUser);
    }

    console.log('');
    console.log('🎉 Unik Ernest user account created successfully!');
    console.log('📧 Email: unik@culturin.com');
    console.log('🔑 Password: culturin');
    console.log('👑 Role: admin');
    console.log('🎨 Studio Access: enabled');
    console.log('');
    console.log('The user can now sign in at your application!');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the function
createUnikUser();

// Debug script to check experience loading
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials not configured');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugItineraryLoading() {
  console.log('🔍 Debugging experience loading...\n');

  try {
    // Check if we can connect to Supabase
    console.log('1. Testing Supabase connection...');
    const { data: testData, error: testError } = await supabase
      .from('experiences')
      .select('count')
      .limit(1);
    
    if (testError) {
      console.error('❌ Supabase connection failed:', testError);
    } else {
      console.log('✅ Supabase connection successful');
    }

    // Check for users
    console.log('\n2. Checking users table...');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email, role')
      .limit(5);

    if (usersError) {
      console.error('❌ Error fetching users:', usersError);
    } else {
      console.log(`✅ Found ${users?.length || 0} users:`);
      users?.forEach(user => {
        console.log(`   - ${user.email} (${user.role})`);
      });
    }

    // Check for experiences
    console.log('\n3. Checking experiences table...');
    const { data: experiences, error: itinerariesError } = await supabase
      .from('experiences')
      .select('id, title, operator_id, created_at')
      .limit(10);

    if (itinerariesError) {
      console.error('❌ Error fetching experiences:', itinerariesError);
    } else {
      console.log(`✅ Found ${experiences?.length || 0} experiences:`);
      experiences?.forEach(experience => {
        console.log(`   - ${experience.title} (operator: ${experience.operator_id})`);
      });
    }

    // Check specific user experiences
    console.log('\n4. Checking experiences for specific users...');
    const testEmails = ['eloka@satellitelabs.xyz', 'eloka.agu@icloud.com'];
    
    for (const email of testEmails) {
      console.log(`\n   Checking ${email}:`);
      
      // First get the user
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id, email, role')
        .eq('email', email)
        .single();

      if (userError) {
        console.log(`   ❌ User not found: ${userError.message}`);
      } else {
        console.log(`   ✅ User found: ${user.email} (${user.role})`);
        
        // Check their experiences
        const { data: userItineraries, error: userItinerariesError } = await supabase
          .from('experiences')
          .select('id, title, status')
          .eq('operator_id', user.id);

        if (userItinerariesError) {
          console.log(`   ❌ Error fetching experiences: ${userItinerariesError.message}`);
        } else {
          console.log(`   ✅ Found ${userItineraries?.length || 0} experiences:`);
          userItineraries?.forEach(experience => {
            console.log(`      - ${experience.title} (${experience.status})`);
          });
        }
      }
    }

  } catch (error) {
    console.error('❌ Debug script error:', error);
  }
}

debugItineraryLoading();

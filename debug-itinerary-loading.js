// Debug script to check itinerary loading
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
  console.log('🔍 Debugging itinerary loading...\n');

  try {
    // Check if we can connect to Supabase
    console.log('1. Testing Supabase connection...');
    const { data: testData, error: testError } = await supabase
      .from('itineraries')
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

    // Check for itineraries
    console.log('\n3. Checking itineraries table...');
    const { data: itineraries, error: itinerariesError } = await supabase
      .from('itineraries')
      .select('id, title, operator_id, created_at')
      .limit(10);

    if (itinerariesError) {
      console.error('❌ Error fetching itineraries:', itinerariesError);
    } else {
      console.log(`✅ Found ${itineraries?.length || 0} itineraries:`);
      itineraries?.forEach(itinerary => {
        console.log(`   - ${itinerary.title} (operator: ${itinerary.operator_id})`);
      });
    }

    // Check specific user itineraries
    console.log('\n4. Checking itineraries for specific users...');
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
        
        // Check their itineraries
        const { data: userItineraries, error: userItinerariesError } = await supabase
          .from('itineraries')
          .select('id, title, status')
          .eq('operator_id', user.id);

        if (userItinerariesError) {
          console.log(`   ❌ Error fetching itineraries: ${userItinerariesError.message}`);
        } else {
          console.log(`   ✅ Found ${userItineraries?.length || 0} itineraries:`);
          userItineraries?.forEach(itinerary => {
            console.log(`      - ${itinerary.title} (${itinerary.status})`);
          });
        }
      }
    }

  } catch (error) {
    console.error('❌ Debug script error:', error);
  }
}

debugItineraryLoading();

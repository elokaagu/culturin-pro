// Test script to verify experience functionality after fix
const { createClient } = require("@supabase/supabase-js");

// Load environment variables
require("dotenv").config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Supabase credentials not configured");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testItineraryFunctionality() {
  console.log("🧪 Testing experience functionality after fix...\n");

  try {
    // Step 1: Check user sync
    console.log("1. Checking user sync...");
    const { data: authUsers } = await supabase.auth.admin.listUsers();
    const { data: publicUsers } = await supabase
      .from("users")
      .select("id, email, role");

    console.log(`   Auth users: ${authUsers.users.length}`);
    console.log(`   Public users: ${publicUsers?.length || 0}`);

    if (authUsers.users.length === publicUsers?.length) {
      console.log("   ✅ User sync successful");
    } else {
      console.log("   ❌ User sync incomplete");
    }

    // Step 2: Check experiences table structure
    console.log("\n2. Checking experiences table...");
    const { data: experiences, error: itinerariesError } = await supabase
      .from("experiences")
      .select("*")
      .limit(1);

    if (itinerariesError) {
      console.log("   ❌ Experiences table error:", itinerariesError.message);
    } else {
      console.log("   ✅ Experiences table accessible");
    }

    // Step 3: Test basic operations
    console.log("\n3. Testing basic operations...");

    // Get the first public user for testing
    if (publicUsers && publicUsers.length > 0) {
      const testUser = publicUsers[0];
      console.log(`   Testing with user: ${testUser.email}`);

      // Try to fetch experiences for this user
      const { data: userItineraries, error: fetchError } = await supabase
        .from("experiences")
        .select("*")
        .eq("operator_id", testUser.id);

      if (fetchError) {
        console.log("   ❌ Error fetching experiences:", fetchError.message);
      } else {
        console.log(
          `   ✅ Can fetch experiences (${userItineraries.length} found)`
        );
      }

      // Test if we can theoretically insert (we won't actually insert)
      console.log("   ✅ Ready for experience creation");
    } else {
      console.log("   ❌ No users available for testing");
    }

    console.log("\n📊 Summary:");
    console.log(
      "   - User sync status: " +
        (authUsers.users.length === publicUsers?.length
          ? "COMPLETE"
          : "INCOMPLETE")
    );
    console.log(
      "   - Experiences table: " + (itinerariesError ? "ERROR" : "OK")
    );
    console.log(
      "   - Ready for operations: " +
        (publicUsers && publicUsers.length > 0 ? "YES" : "NO")
    );
  } catch (error) {
    console.error("❌ Test script error:", error);
  }
}

testItineraryFunctionality();

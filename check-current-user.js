// Check current user state directly
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

async function checkCurrentUser() {
  console.log("🔍 Checking current user state...\n");

  try {
    // Check if we can access the database
    console.log("1. Testing database connection...");
    const { data: testData, error: testError } = await supabase
      .from("users")
      .select("count");

    if (testError) {
      console.log("❌ Database connection error:", testError.message);
    } else {
      console.log("✅ Database connection successful");
    }

    // Try to get current session (this should work without admin privileges)
    console.log("\n2. Checking current session...");
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.log("❌ Session error:", sessionError.message);
    } else if (session?.user) {
      console.log("✅ User session found:");
      console.log(`   Email: ${session.user.email}`);
      console.log(`   ID: ${session.user.id}`);
      console.log(`   Created: ${session.user.created_at}`);

      // Check if this user exists in public.users
      console.log("\n3. Checking if user exists in public.users...");
      const { data: publicUser, error: publicUserError } = await supabase
        .from("users")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (publicUserError) {
        console.log(
          "❌ User NOT found in public.users:",
          publicUserError.message
        );
        console.log("   This is the ROOT CAUSE of the infinite loading!");
      } else {
        console.log("✅ User found in public.users:");
        console.log(`   Email: ${publicUser.email}`);
        console.log(`   Role: ${publicUser.role}`);
      }

      // Check if user can access experiences
      console.log("\n4. Testing experience access...");
      const { data: experiences, error: itinerariesError } = await supabase
        .from("experiences")
        .select("*")
        .eq("operator_id", session.user.id);

      if (itinerariesError) {
        console.log("❌ Cannot access experiences:", itinerariesError.message);
      } else {
        console.log(`✅ Can access experiences (${experiences.length} found)`);
      }
    } else {
      console.log("❌ No active session found");
    }
  } catch (error) {
    console.error("❌ Script error:", error.message);
  }
}

checkCurrentUser();

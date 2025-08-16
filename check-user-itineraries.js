// Script to check experiences for eloka@satellitelabs.xyz
const { createClient } = require("@supabase/supabase-js");

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log("❌ Supabase credentials not configured");
  console.log(
    "Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUserItineraries() {
  try {
    console.log("🔍 Checking experiences for eloka@satellitelabs.xyz...\n");

    // First, try to find the user by email
    const { data: userData, error: userError } =
      await supabase.auth.admin.listUsers();

    if (userError) {
      console.log("❌ Error fetching users:", userError.message);
      return;
    }

    const user = userData.users.find(
      (u) => u.email === "eloka@satellitelabs.xyz"
    );

    if (!user) {
      console.log("❌ User eloka@satellitelabs.xyz not found in database");
      return;
    }

    console.log(`✅ Found user: ${user.email} (ID: ${user.id})`);
    console.log(`   Created: ${user.created_at}`);
    console.log(`   Last sign in: ${user.last_sign_in_at}\n`);

    // Check database experiences
    console.log("📊 Checking database experiences...");
    const { data: dbItineraries, error: dbError } = await supabase
      .from("experiences")
      .select("*")
      .eq("operator_id", user.id)
      .order("created_at", { ascending: false });

    if (dbError) {
      console.log("❌ Error fetching database experiences:", dbError.message);
    } else {
      console.log(`✅ Found ${dbItineraries.length} experiences in database:`);
      dbItineraries.forEach((experience, index) => {
        console.log(`   ${index + 1}. ${experience.title}`);
        console.log(`      ID: ${experience.id}`);
        console.log(`      Status: ${experience.status}`);
        console.log(`      Created: ${experience.created_at}`);
        console.log(`      Updated: ${experience.updated_at}`);
        console.log("");
      });
    }

    // Check localStorage keys (this would need to be run in browser context)
    console.log("💾 localStorage keys to check (run in browser console):");
    console.log(`   culturinItineraries_${user.id.substring(0, 8)}`);
    console.log("   culturinItineraries (generic key)");
    console.log("   publishedItineraries");
    console.log("   publishedWebsiteContent");
    console.log("   websiteData");
    console.log("   websiteData_" + user.id.substring(0, 8));
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

// Run the check
checkUserItineraries();

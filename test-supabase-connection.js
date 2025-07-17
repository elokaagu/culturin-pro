require("dotenv").config({ path: ".env.local" });

const { createClient } = require("@supabase/supabase-js");

console.log("Environment variables:");
console.log("NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log(
  "NEXT_PUBLIC_SUPABASE_ANON_KEY:",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set (truncated)" : "Not set"
);

if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
  console.error("❌ Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testConnection() {
  try {
    console.log("\nTesting Supabase connection...");

    // Test auth connection
    const { data: session, error: sessionError } =
      await supabase.auth.getSession();
    if (sessionError) {
      console.error("❌ Auth connection failed:", sessionError.message);
    } else {
      console.log("✅ Auth connection successful");
    }

    // Test database connection
    const { data, error } = await supabase
      .from("profiles")
      .select("count")
      .limit(1);
    if (error) {
      console.error("❌ Database connection failed:", error.message);
    } else {
      console.log("✅ Database connection successful");
    }
  } catch (error) {
    console.error("❌ Connection test failed:", error.message);
  }
}

testConnection();

// Test environment variables loading
require("dotenv").config({ path: ".env.local" });
console.log("Testing environment variables...");

// Check if we're in a browser environment
if (typeof window !== "undefined") {
  console.log("Browser environment detected");
  console.log(
    "NEXT_PUBLIC_SUPABASE_URL:",
    process.env.NEXT_PUBLIC_SUPABASE_URL
  );
  console.log(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY:",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set" : "Not set"
  );
} else {
  console.log("Node.js environment detected");
  console.log(
    "NEXT_PUBLIC_SUPABASE_URL:",
    process.env.NEXT_PUBLIC_SUPABASE_URL
  );
  console.log(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY:",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set" : "Not set"
  );
}

// Test Supabase client creation
try {
  const { createClient } = require("@supabase/supabase-js");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log("Supabase URL:", supabaseUrl);
  console.log(
    "Supabase Anon Key length:",
    supabaseAnonKey ? supabaseAnonKey.length : "Not set"
  );

  if (supabaseUrl && supabaseAnonKey) {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log("✅ Supabase client created successfully");
  } else {
    console.log("❌ Missing Supabase environment variables");
  }
} catch (error) {
  console.log("❌ Error creating Supabase client:", error.message);
}

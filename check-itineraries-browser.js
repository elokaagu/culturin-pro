// Browser console script to check experiences for eloka@satellitelabs.xyz
// Run this in your browser console on the Culturin Studio page

console.log("🔍 Checking experiences for eloka@satellitelabs.xyz...\n");

// Check localStorage for experiences
function checkLocalStorage() {
  console.log("💾 Checking localStorage for experiences...\n");

  // Get all localStorage keys
  const allKeys = Object.keys(localStorage);
  const itineraryKeys = allKeys.filter(
    (key) =>
      key.includes("experience") ||
      key.includes("culturin") ||
      key.includes("website")
  );

  console.log("📋 Found localStorage keys:", itineraryKeys);

  // Check each relevant key
  itineraryKeys.forEach((key) => {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        const parsed = JSON.parse(data);
        console.log(`\n📦 ${key}:`);
        if (Array.isArray(parsed)) {
          console.log(`   Array with ${parsed.length} items`);
          parsed.forEach((item, index) => {
            if (item.title) {
              console.log(`   ${index + 1}. ${item.title} (ID: ${item.id})`);
            }
          });
        } else if (parsed.title) {
          console.log(`   Single item: ${parsed.title} (ID: ${parsed.id})`);
        } else {
          console.log(`   Object with keys: ${Object.keys(parsed).join(", ")}`);
        }
      }
    } catch (error) {
      console.log(`   Error parsing ${key}:`, error.message);
    }
  });
}

// Check for user-specific keys
function checkUserSpecificKeys() {
  console.log("\n👤 Checking for user-specific keys...\n");

  // Common user ID patterns
  const possibleUserIds = ["eloka", "satellite", "labs", "elokaagu"];

  const allKeys = Object.keys(localStorage);

  possibleUserIds.forEach((userId) => {
    const userKeys = allKeys.filter((key) => key.includes(userId));
    if (userKeys.length > 0) {
      console.log(`Found keys for ${userId}:`, userKeys);
    }
  });
}

// Check current user session
function checkCurrentUser() {
  console.log("\n🔐 Checking current user session...\n");

  // Try to get user from various sources
  if (window.supabase) {
    console.log("Supabase client available");
  }

  // Check if there's a user object in the page
  const userElements = document.querySelectorAll("[data-user], [data-email]");
  if (userElements.length > 0) {
    console.log("Found user elements:", userElements);
  }

  // Check for any user-related data in the page
  const pageText = document.body.innerText;
  if (pageText.includes("eloka@satellitelabs.xyz")) {
    console.log("Found email in page content");
  }
}

// Run all checks
checkLocalStorage();
checkUserSpecificKeys();
checkCurrentUser();

console.log("\n✅ Check complete! Look for experience data above.");

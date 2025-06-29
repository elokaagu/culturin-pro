const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

async function testBlogPosts() {
  console.log("🧪 Testing Blog Posts Integration\n");

  // Test 1: Check if Supabase is configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.log("❌ Supabase not configured - using static data");
    return;
  }

  console.log("✅ Supabase credentials found");

  // Test 2: Check database connection
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Test connection
    const { data, error } = await supabase
      .from("blog_posts")
      .select("count")
      .limit(1);

    if (error) {
      console.log("❌ Database connection failed:", error.message);
      return;
    }

    console.log("✅ Database connection successful");

    // Test 3: Check if blog_posts table exists and has data
    const { data: posts, error: postsError } = await supabase
      .from("blog_posts")
      .select("id, title, slug, published, created_at")
      .order("created_at", { ascending: false });

    if (postsError) {
      console.log("❌ Error fetching blog posts:", postsError.message);
      return;
    }

    console.log(`✅ Found ${posts.length} blog posts in database`);

    if (posts.length === 0) {
      console.log("\n📝 No blog posts found in database.");
      console.log("   Run the migration script to import existing posts.");
      return;
    }

    // Test 4: Display blog posts summary
    console.log("\n📚 Blog Posts Summary:");
    posts.forEach((post, index) => {
      const status = post.published ? "✅" : "❌";
      console.log(`   ${index + 1}. ${status} ${post.title}`);
      console.log(`      Slug: ${post.slug}`);
      console.log(
        `      Created: ${new Date(post.created_at).toLocaleDateString()}`
      );
    });

    // Test 5: Check specific slugs from original data
    const expectedSlugs = [
      "strategies-increase-tour-bookings-slow-seasons",
      "cultural-tour-operators-create-immersive-experiences",
      "solo-cultural-tourism-what-operators-need-to-know",
      "using-customer-data-personalize-cultural-experiences",
      "sustainable-cultural-tourism-balancing-growth-preservation",
      "tour-operator-success-story-barcelona-food-tours",
    ];

    console.log("\n🔍 Checking for migrated posts:");
    for (const slug of expectedSlugs) {
      const { data: post } = await supabase
        .from("blog_posts")
        .select("title")
        .eq("slug", slug)
        .single();

      if (post) {
        console.log(`   ✅ ${slug}`);
      } else {
        console.log(`   ❌ ${slug} - NOT FOUND`);
      }
    }

    // Test 6: Check categories
    const { data: categories } = await supabase
      .from("blog_posts")
      .select("category")
      .not("category", "is", null);

    if (categories) {
      const uniqueCategories = [...new Set(categories.map((c) => c.category))];
      console.log(`\n📂 Categories: ${uniqueCategories.join(", ")}`);
    }

    console.log("\n🎉 Blog posts test completed!");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

// Run the test
testBlogPosts();

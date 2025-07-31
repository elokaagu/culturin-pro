import { supabase } from "./supabase";
import type { Database } from "./supabase";

type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
type BlogPostInsert = Database["public"]["Tables"]["blog_posts"]["Insert"];
type BlogPostUpdate = Database["public"]["Tables"]["blog_posts"]["Update"];

// Check if Supabase is configured and we're in a browser environment
const isSupabaseConfigured = () => {
  // During build time (SSR), return false to use fallback data
  if (typeof window === 'undefined') {
    return false;
  }
  return !!supabase;
};

// Fallback data for when Supabase is not configured (build time)
const getFallbackBlogPosts = (): BlogPost[] => {
  const now = new Date().toISOString();
  return [
    {
      id: "1",
      created_at: "2025-05-15T10:00:00Z",
      updated_at: "2025-05-15T10:00:00Z",
      title: "5 Strategies to Increase Tour Bookings During Slow Seasons",
      slug: "strategies-increase-tour-bookings-slow-seasons",
      excerpt:
        "Learn proven methods to maintain revenue streams even during traditional off-peak periods in tourism.",
      content: [
        "For cultural tour operators, seasonal fluctuations can significantly impact revenue. Understanding how to navigate these slow periods can be the difference between struggling to keep your business afloat and maintaining a steady income throughout the year.",
        "In this comprehensive guide, we explore five proven strategies that successful tour operators employ to increase bookings even during traditionally quiet periods. These approaches not only help to generate immediate revenue but can also strengthen your business's long-term resilience.",
        "First, consider developing specialized seasonal offerings that highlight unique aspects of your destination during off-peak times. Whether it's cozy winter walking tours that emphasize indoor cultural sites or rainy season experiences that showcase how locals embrace the weather, leaning into the season rather than fighting against it can attract curious travelers.",
        "Second, implement dynamic pricing strategies that reflect demand fluctuations. While discounting should be strategic rather than desperate, offering early-bird specials, last-minute deals, or package bundles can entice visitors who might otherwise wait for peak season.",
        "Third, target different demographics during different seasons. While summer might bring families, off-seasons often attract retirees, digital nomads, or local weekend travelers. Tailoring your marketing and tour offerings to these specific groups can fill calendar gaps effectively.",
        "Fourth, forge strategic partnerships with complementary businesses. Collaborating with hotels, restaurants, or indoor attractions on package deals can create compelling offers that provide value to guests while ensuring everyone gets a share of limited off-season traffic.",
        "Finally, use slow periods to nurture your past guest relationships. Implementing loyalty programs, referral incentives, or special returning guest promotions can activate your existing customer base when you need them most.",
        "Implementing even a few of these strategies can help smooth out the financial roller coaster that seasonal tourism often creates, allowing for more sustainable business growth and peace of mind for tour operators.",
      ],
      category: "Marketing",
      author_id: "1",
      author_name: "Culturin Editorial Team",
      author_email: "editorial@culturin.com",
      featured_image_url:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2000&auto=format&fit=crop",
      featured_image_path: null,
      published: true,
      published_at: "2025-05-15T10:00:00Z",
      meta_title:
        "5 Strategies to Increase Tour Bookings During Slow Seasons - Culturin",
      meta_description:
        "Learn proven methods to maintain revenue streams even during traditional off-peak periods in tourism.",
      tags: [
        "marketing",
        "tour-operators",
        "seasonal-tourism",
        "revenue-strategies",
        "business-growth",
      ],
    },
    {
      id: "2",
      created_at: "2025-05-07T10:00:00Z",
      updated_at: "2025-05-07T10:00:00Z",
      title:
        "How Cultural Tour Operators Can Create More Immersive Experiences",
      slug: "cultural-tour-operators-create-immersive-experiences",
      excerpt:
        "Discover how storytelling and local connections can transform standard tours into unforgettable experiences.",
      content: [
        "In today's experience economy, travelers are increasingly seeking authentic connections with the places they visit. Simply pointing out landmarks or reciting historical facts is no longer enough to create memorable tourism experiences that generate word-of-mouth recommendations and repeat business.",
        "Immersive cultural experiences engage all the senses and create emotional connections between visitors and destinations. When done well, they transform tourists into temporary locals, giving them genuine insight into a place's culture, traditions, and daily life.",
        "The foundation of any immersive experience is powerful storytelling. Rather than presenting disconnected facts, successful tour operators weave narratives that connect historical events to present-day culture. They highlight individual stories that personalize history and help visitors emotionally connect with the destination.",
        "Involving local communities authentically is another crucial element. This might mean visiting family-owned businesses, arranging conversations with local artisans, or incorporating community members as guides for specific portions of your tours. These interactions should be mutually beneficial and respectful, never exploitative.",
        "Multisensory experiences also contribute to immersion. Beyond what guests see and hear, consider how they can touch, taste, and smell elements of the local culture. Food experiences, hands-on craft demonstrations, or even passing around historical artifacts (or replicas) can deepen engagement.",
        "Creating moments of active participation rather than passive observation is essential for immersion. Whether it's learning a few words in the local language, trying a traditional dance step, or participating in a cooking demonstration, active involvement creates stronger memories and connections.",
        "Finally, consider how technology might enhance rather than distract from immersion. Augmented reality that shows historical overlays, carefully selected audio that enhances rather than overwhelms, or even post-tour digital experiences can extend and deepen the connection guests feel.",
        "By implementing these approaches thoughtfully, tour operators can create truly transformative experiences that stand out in an increasingly competitive market while providing meaningful cultural exchange that benefits both visitors and local communities.",
      ],
      category: "Experience Design",
      author_id: "1",
      author_name: "Culturin Editorial Team",
      author_email: "editorial@culturin.com",
      featured_image_url:
        "https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2000&auto=format&fit=crop",
      featured_image_path: null,
      published: true,
      published_at: "2025-05-07T10:00:00Z",
      meta_title:
        "How Cultural Tour Operators Can Create More Immersive Experiences - Culturin",
      meta_description:
        "Discover how storytelling and local connections can transform standard tours into unforgettable experiences.",
      tags: [
        "experience-design",
        "storytelling",
        "cultural-tourism",
        "tour-operators",
        "immersive-experiences",
      ],
    },
    {
      id: "3",
      created_at: "2025-04-29T10:00:00Z",
      updated_at: "2025-04-29T10:00:00Z",
      title: "The Rise of Solo Cultural Tourism: What Operators Need to Know",
      slug: "solo-cultural-tourism-what-operators-need-to-know",
      excerpt:
        "Solo travel is booming in the cultural tourism sector. Here's how operators can adapt their offerings.",
      content: [
        "Solo travel has evolved from a niche market to a powerful tourism trend, with particular significance for cultural tourism operators. Today's solo travelers are diverse—spanning all age groups, genders, and backgrounds—and are often seeking meaningful cultural connections during their independent journeys.",
        "Understanding this growing market segment is crucial for tour operators who want to capture its potential. Far from being lonely travelers, modern solo tourists are often highly social, curious, and eager to connect with both locals and fellow travelers. They typically value flexibility, authenticity, and opportunities for personal growth.",
        "One key adaptation for tour operators is reconsidering pricing structures. Single supplements have long been a point of frustration for solo travelers. Progressive operators are finding creative alternatives, such as room-sharing options, studio accommodation choices, or even eliminating single supplements entirely during certain periods.",
        "Safety concerns remain paramount for solo travelers, especially in unfamiliar cultural contexts. Successful operators provide clear safety information, establish communication protocols, and create environments where solo travelers can feel secure while still enjoying independence and discovery.",
        "Group dynamics require careful consideration when accommodating solo travelers alongside couples and families. Creating natural opportunities for social interaction without forcing togetherness allows solo travelers to connect when they wish while maintaining their independence.",
        "Digital platforms have become essential for reaching this market. Solo travelers often rely heavily on online resources for planning and booking. Having mobile-friendly booking systems, transparent policies regarding solo travelers, and showcasing testimonials from previous solo guests can significantly impact booking decisions.",
        "Finally, creating solo-friendly add-ons can enhance the appeal of your offerings. Optional dining experiences, evening cultural activities, or skill-building workshops provide structure for those who want it while remaining optional for those who prefer exploration on their own terms.",
        "By understanding and accommodating the unique needs and motivations of solo cultural travelers, tour operators can tap into this growing market while creating more inclusive experiences for all guests.",
      ],
      category: "Industry Trends",
      author_id: "1",
      author_name: "Culturin Editorial Team",
      author_email: "editorial@culturin.com",
      featured_image_url:
        "https://images.unsplash.com/photo-1487252665478-49b61b47f302?q=80&w=2000&auto=format&fit=crop",
      featured_image_path: null,
      published: true,
      published_at: "2025-04-29T10:00:00Z",
      meta_title:
        "The Rise of Solo Cultural Tourism: What Operators Need to Know - Culturin",
      meta_description:
        "Solo travel is booming in the cultural tourism sector. Here's how operators can adapt their offerings.",
      tags: [
        "solo-travel",
        "cultural-tourism",
        "industry-trends",
        "tour-operators",
        "market-analysis",
      ],
    },
    {
      id: "4",
      created_at: "2025-04-22T10:00:00Z",
      updated_at: "2025-04-22T10:00:00Z",
      title: "Using Customer Data to Personalize Cultural Experiences",
      slug: "using-customer-data-personalize-cultural-experiences",
      excerpt:
        "Learn how smart data collection can help you tailor experiences to your guests' preferences.",
      content: [
        "In an era of increasing personalization across all consumer experiences, cultural tour operators who successfully leverage guest data gain a significant competitive advantage. Personalization isn't just about using someone's name in an email—it's about creating experiences that respond to individual preferences, backgrounds, and interests.",
        "Effective data utilization begins well before guests arrive. Pre-trip questionnaires and booking processes can collect valuable information about language preferences, physical accessibility needs, special interests, and previous travel experiences. This information allows operators to make thoughtful adjustments to tours before they even begin.",
        "Modern booking systems can track repeat visitors and their previous choices, enabling tour operators to recommend complementary experiences or acknowledge returning guests. This recognition creates a sense of belonging and appreciation that enhances the overall experience.",
        "During experiences, attentive guides and operators can gather informal data through conversation and observation. Noting which aspects of a tour generate the most engagement from specific guest types allows for real-time customization and informs future experience design.",
        "Post-experience feedback, when collected systematically, provides invaluable insights. Beyond generic satisfaction metrics, targeted questions about specific aspects of the experience can reveal opportunities for enhancement or expansion that might otherwise be missed.",
        "Responsible data practices are essential for building trust. Being transparent about what data is collected and how it will be used, obtaining appropriate consent, and maintaining strong data security measures are non-negotiable aspects of data-driven personalization.",
        "Implementation can start small. Even tour operators with limited technical resources can begin with simple spreadsheets or basic CRM systems to track guest preferences and history. As operations scale, more sophisticated solutions can be adopted incrementally.",
        "When done thoughtfully, personalization based on guest data creates experiences that feel uniquely relevant to each participant while still celebrating the universal aspects of cultural heritage that bring diverse travelers together.",
      ],
      category: "Technology",
      author_id: "1",
      author_name: "Culturin Editorial Team",
      author_email: "editorial@culturin.com",
      featured_image_url:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2000&auto=format&fit=crop",
      featured_image_path: null,
      published: true,
      published_at: "2025-04-22T10:00:00Z",
      meta_title:
        "Using Customer Data to Personalize Cultural Experiences - Culturin",
      meta_description:
        "Learn how smart data collection can help you tailor experiences to your guests' preferences.",
      tags: [
        "data-analytics",
        "personalization",
        "customer-experience",
        "technology",
        "tour-operators",
      ],
    },
    {
      id: "5",
      created_at: "2025-04-15T10:00:00Z",
      updated_at: "2025-04-15T10:00:00Z",
      title: "Sustainable Cultural Tourism: Balancing Growth with Preservation",
      slug: "sustainable-cultural-tourism-balancing-growth-preservation",
      excerpt:
        "Explore strategies for growing your tour business while protecting cultural heritage and local communities.",
      content: [
        "Sustainability in cultural tourism extends beyond environmental considerations to encompass the preservation of cultural heritage and the well-being of local communities. As tourism numbers grow globally, cultural tour operators face the complex challenge of building successful businesses while ensuring their operations contribute positively to the cultures and communities they showcase.",
        "The concept of carrying capacity is as relevant to cultural sites as it is to natural ones. Understanding how many visitors a cultural space can accommodate without degradation of either the physical site or the experience quality is essential. Responsible operators work within these limits, even when it means capping participant numbers.",
        "Economic sustainability requires ensuring that tourism revenue reaches local communities rather than being extracted by external entities. This might involve partnering with local businesses, employing local guides, featuring local products, and creating opportunities for authentic (non-exploitative) cultural exchange that benefits local practitioners.",
        "Interpretation approaches significantly impact sustainability. Moving beyond exoticization or oversimplification of cultural practices, thoughtful interpretation contextualizes traditions, acknowledges complexity, and presents living cultures as dynamic rather than static. This approach fosters respect and deeper understanding among visitors.",
        "Digital technologies offer innovative solutions to preservation challenges. Virtual access to fragile sites, augmented reality that reduces physical impact while enhancing education, and digital documentation of cultural practices all contribute to sustainability while potentially creating new revenue streams.",
        "Community involvement in tourism planning and management is perhaps the most crucial sustainability factor. When local communities have agency in how their culture is presented and shared, tourism becomes a tool for cultural resilience rather than erosion.",
        "Measuring success beyond simple visitor numbers is essential for sustainable operators. Metrics might include local employment created, cultural preservation projects supported, guest education outcomes, and community satisfaction with tourism activities.",
        "By embracing these principles, cultural tour operators can build businesses that thrive financially while contributing to the vitality and continuity of the cultural traditions they celebrate—creating truly sustainable cultural tourism for generations to come.",
      ],
      category: "Sustainability",
      author_id: "1",
      author_name: "Culturin Editorial Team",
      author_email: "editorial@culturin.com",
      featured_image_url:
        "https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=2000&auto=format&fit=crop",
      featured_image_path: null,
      published: true,
      published_at: "2025-04-15T10:00:00Z",
      meta_title:
        "Sustainable Cultural Tourism: Balancing Growth with Preservation - Culturin",
      meta_description:
        "Explore strategies for growing your tour business while protecting cultural heritage and local communities.",
      tags: [
        "sustainability",
        "cultural-preservation",
        "responsible-tourism",
        "community-development",
        "heritage",
      ],
    },
    {
      id: "6",
      created_at: "2025-04-08T10:00:00Z",
      updated_at: "2025-04-08T10:00:00Z",
      title:
        "Tour Operator Success Story: Barcelona Food Tours Increases Bookings by 35%",
      slug: "tour-operator-success-story-barcelona-food-tours",
      excerpt:
        "How one cultural tour company transformed their digital presence and saw dramatic growth.",
      content: [
        "When Maria Puig founded Barcelona Taste Trails in 2020, she faced the worst possible timing for a tourism business. Launching just before global travel restrictions, her intimate food tour company struggled to gain traction despite offering expertly curated culinary experiences that showcased Barcelona's rich gastronomic heritage beyond the typical tourist haunts.",
        "After two difficult years of limited operations, Maria recognized that the company's approach to digital marketing and booking management wasn't serving their recovery. Despite featuring exceptional local partnerships with family-owned restaurants and food artisans, the company's online presence failed to communicate their unique value proposition effectively.",
        "The turning point came when Barcelona Taste Trails implemented a comprehensive digital transformation focused on three key areas: storytelling, technical optimization, and operational efficiency. The results were remarkable—a 35% increase in bookings within six months and sustained growth thereafter.",
        "The company's storytelling overhaul began with professional photography that captured both the food and the human connections that made their tours special. They developed rich content around the stories of their vendor partners, highlighting the generational knowledge and passion behind each culinary experience rather than just the food itself.",
        "Technical improvements included rebuilding their website for mobile users (who comprised 68% of their traffic), implementing a streamlined booking system that reduced abandonment by 40%, and developing a strategic approach to local SEO that significantly improved their visibility for relevant searches.",
        "On the operational side, the company introduced automated reservation management and follow-up communications that freed Maria and her small team to focus on experience quality rather than administrative tasks. This efficiency allowed them to maintain their intimate, high-touch approach to guest experience even as bookings increased.",
        "Perhaps most importantly, Barcelona Taste Trails developed a systematic approach to collecting and showcasing guest feedback. By featuring authentic visitor stories prominently throughout their digital presence, they built credibility that significantly improved conversion rates.",
        "Maria's advice to other cultural tour operators: 'Invest in properly communicating what makes your experience unique. We were offering something special all along, but we weren't telling that story effectively online. Once we fixed that disconnect, everything changed.'",
      ],
      category: "Case Study",
      author_id: "1",
      author_name: "Culturin Editorial Team",
      author_email: "editorial@culturin.com",
      featured_image_url:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop",
      featured_image_path: null,
      published: true,
      published_at: "2025-04-08T10:00:00Z",
      meta_title:
        "Tour Operator Success Story: Barcelona Food Tours Increases Bookings by 35% - Culturin",
      meta_description:
        "How one cultural tour company transformed their digital presence and saw dramatic growth.",
      tags: [
        "case-study",
        "success-story",
        "digital-marketing",
        "food-tours",
        "business-growth",
      ],
    },
  ];
};

export interface CreateBlogPostData {
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  category: string;
  author_id: string;
  author_name: string;
  author_email: string;
  featured_image?: File;
  published?: boolean;
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
}

export interface UpdateBlogPostData extends Partial<CreateBlogPostData> {
  id: string;
}

// Upload image to Supabase Storage
export async function uploadBlogImage(
  file: File,
  blogId: string
): Promise<{ url: string; path: string } | null> {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${blogId}-${Date.now()}.${fileExt}`;
    const filePath = `blog-images/${fileName}`;

    const { data, error } = await supabase.storage
      .from("blog-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Error uploading image:", error);
      return null;
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("blog-images").getPublicUrl(filePath);

    return {
      url: publicUrl,
      path: filePath,
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}

// Delete image from Supabase Storage
export async function deleteBlogImage(imagePath: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from("blog-images")
      .remove([imagePath]);

    if (error) {
      console.error("Error deleting image:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    return false;
  }
}

// Create a new blog post
export async function createBlogPost(
  data: CreateBlogPostData
): Promise<BlogPost | null> {
  try {
    // Generate a unique ID for the blog post
    const blogId = crypto.randomUUID();

    let imageUrl = null;
    let imagePath = null;

    // Upload image if provided
    if (data.featured_image) {
      const uploadResult = await uploadBlogImage(data.featured_image, blogId);
      if (uploadResult) {
        imageUrl = uploadResult.url;
        imagePath = uploadResult.path;
      }
    }

    const blogPostData: BlogPostInsert = {
      id: blogId,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      category: data.category,
      author_id: data.author_id,
      author_name: data.author_name,
      author_email: data.author_email,
      featured_image_url: imageUrl,
      featured_image_path: imagePath,
      published: data.published || false,
      published_at: data.published ? new Date().toISOString() : null,
      meta_title: data.meta_title,
      meta_description: data.meta_description,
      tags: data.tags || [],
    };

    const { data: blogPost, error } = await supabase
      .from("blog_posts")
      .insert(blogPostData)
      .select()
      .single();

    if (error) {
      console.error("Error creating blog post:", error);
      return null;
    }

    return blogPost;
  } catch (error) {
    console.error("Error creating blog post:", error);
    return null;
  }
}

// Get all blog posts
export async function getBlogPosts(filters?: {
  published?: boolean;
  category?: string;
  limit?: number;
  offset?: number;
}): Promise<BlogPost[]> {
  try {
    // If Supabase is not configured, return fallback data
    if (!isSupabaseConfigured()) {
      console.warn("Supabase not configured, using fallback blog posts");
      const fallbackPosts = getFallbackBlogPosts();
      
      // Apply filters to fallback data
      let filteredPosts = fallbackPosts;
      
      if (filters?.published !== undefined) {
        filteredPosts = filteredPosts.filter(post => post.published === filters.published);
      }
      
      if (filters?.category) {
        filteredPosts = filteredPosts.filter(post => post.category === filters.category);
      }
      
      if (filters?.limit) {
        filteredPosts = filteredPosts.slice(0, filters.limit);
      }
      
      if (filters?.offset) {
        filteredPosts = filteredPosts.slice(filters.offset, filters.offset + (filters.limit || 10));
      }
      
      return filteredPosts;
    }

    let query = supabase.from("blog_posts").select("*");

    if (filters?.published !== undefined) {
      query = query.eq("published", filters.published);
    }

    if (filters?.category) {
      query = query.eq("category", filters.category);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error } = await query.order("published_at", { ascending: false });

    if (error) {
      console.error("Error fetching blog posts:", error);
      // Return fallback data on error
      return getFallbackBlogPosts();
    }

    return data || [];
  } catch (error) {
    console.error("Error in getBlogPosts:", error);
    // Return fallback data on any error
    return getFallbackBlogPosts();
  }
}

// Get a single blog post by slug
export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  try {
    // If Supabase is not configured, return fallback data
    if (!isSupabaseConfigured()) {
      console.warn("Supabase not configured, using fallback blog post");
      const fallbackPosts = getFallbackBlogPosts();
      return fallbackPosts.find(post => post.slug === slug) || null;
    }

    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Error fetching blog post:", error);
      // Return fallback data on error
      const fallbackPosts = getFallbackBlogPosts();
      return fallbackPosts.find(post => post.slug === slug) || null;
    }

    return data;
  } catch (error) {
    console.error("Error in getBlogPostBySlug:", error);
    // Return fallback data on any error
    const fallbackPosts = getFallbackBlogPosts();
    return fallbackPosts.find(post => post.slug === slug) || null;
  }
}

// Get a single blog post by ID
export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching blog post:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

// Update a blog post
export async function updateBlogPost(
  data: UpdateBlogPostData
): Promise<BlogPost | null> {
  try {
    const existingPost = await getBlogPostById(data.id);
    if (!existingPost) {
      console.error("Blog post not found");
      return null;
    }

    let imageUrl = existingPost.featured_image_url;
    let imagePath = existingPost.featured_image_path;

    // Handle image update
    if (data.featured_image) {
      // Delete old image if it exists
      if (existingPost.featured_image_path) {
        await deleteBlogImage(existingPost.featured_image_path);
      }

      // Upload new image
      const uploadResult = await uploadBlogImage(data.featured_image, data.id);
      if (uploadResult) {
        imageUrl = uploadResult.url;
        imagePath = uploadResult.path;
      }
    }

    const updateData: BlogPostUpdate = {
      updated_at: new Date().toISOString(),
      ...(data.title && { title: data.title }),
      ...(data.slug && { slug: data.slug }),
      ...(data.excerpt && { excerpt: data.excerpt }),
      ...(data.content && { content: data.content }),
      ...(data.category && { category: data.category }),
      ...(data.author_name && { author_name: data.author_name }),
      ...(data.author_email && { author_email: data.author_email }),
      ...(data.featured_image && {
        featured_image_url: imageUrl,
        featured_image_path: imagePath,
      }),
      ...(data.published !== undefined && {
        published: data.published,
        published_at: data.published ? new Date().toISOString() : null,
      }),
      ...(data.meta_title !== undefined && { meta_title: data.meta_title }),
      ...(data.meta_description !== undefined && {
        meta_description: data.meta_description,
      }),
      ...(data.tags !== undefined && { tags: data.tags }),
    };

    const { data: updatedPost, error } = await supabase
      .from("blog_posts")
      .update(updateData)
      .eq("id", data.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating blog post:", error);
      return null;
    }

    return updatedPost;
  } catch (error) {
    console.error("Error updating blog post:", error);
    return null;
  }
}

// Delete a blog post
export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    const existingPost = await getBlogPostById(id);
    if (!existingPost) {
      console.error("Blog post not found");
      return false;
    }

    // Delete associated image if it exists
    if (existingPost.featured_image_path) {
      await deleteBlogImage(existingPost.featured_image_path);
    }

    const { error } = await supabase.from("blog_posts").delete().eq("id", id);

    if (error) {
      console.error("Error deleting blog post:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return false;
  }
}

// Generate a unique slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Check if slug is unique
export async function isSlugUnique(
  slug: string,
  excludeId?: string
): Promise<boolean> {
  // If Supabase is not configured, check against fallback data
  if (!isSupabaseConfigured()) {
    const fallbackPosts = getFallbackBlogPosts();
    const existingPost = fallbackPosts.find((post) => post.slug === slug);

    if (excludeId && existingPost) {
      return existingPost.id !== excludeId;
    }

    return !existingPost;
  }

  try {
    let query = supabase.from("blog_posts").select("id").eq("slug", slug);

    if (excludeId) {
      query = query.neq("id", excludeId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error checking slug uniqueness:", error);
      // In case of error, allow the slug to be used rather than blocking
      console.warn(
        "Allowing slug due to database error - please check manually"
      );
      return true;
    }

    return data.length === 0;
  } catch (error) {
    console.error("Error checking slug uniqueness:", error);
    // In case of error, allow the slug to be used rather than blocking
    console.warn("Allowing slug due to database error - please check manually");
    return true;
  }
}

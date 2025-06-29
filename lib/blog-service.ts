import { supabase } from "./supabase";
import type { Database } from "./supabase";

type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
type BlogPostInsert = Database["public"]["Tables"]["blog_posts"]["Insert"];
type BlogPostUpdate = Database["public"]["Tables"]["blog_posts"]["Update"];

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !==
      "https://placeholder.supabase.co" &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "placeholder-key"
  );
};

// Fallback data for when Supabase is not configured (build time)
const getFallbackBlogPosts = (): BlogPost[] => {
  const now = new Date().toISOString();
  return [
    {
      id: "1",
      created_at: now,
      updated_at: now,
      title: "Welcome to Culturin Blog",
      slug: "welcome-to-culturin-blog",
      excerpt:
        "Discover insights, strategies, and inspiration for cultural experience creators and tour operators.",
      content: [
        "Welcome to the Culturin blog, your go-to resource for insights, strategies, and inspiration in the world of cultural tourism and experience creation.",
        "Here, we share valuable content to help tour operators, cultural experience creators, and travel entrepreneurs build successful businesses while promoting authentic cultural exchange.",
      ],
      category: "Cultural Experiences",
      author_id: "1",
      author_name: "Culturin Team",
      author_email: "hello@culturin.com",
      featured_image_url: null,
      featured_image_path: null,
      published: true,
      published_at: now,
      meta_title: "Welcome to Culturin Blog - Cultural Tourism Insights",
      meta_description:
        "Discover insights, strategies, and inspiration for cultural experience creators and tour operators on the Culturin blog.",
      tags: ["welcome", "cultural-tourism", "travel", "blog-launch"],
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
  // Return fallback data if Supabase is not configured
  if (!isSupabaseConfigured()) {
    const fallbackPosts = getFallbackBlogPosts();
    let filteredPosts = fallbackPosts;

    if (filters?.published !== undefined) {
      filteredPosts = filteredPosts.filter(
        (post) => post.published === filters.published
      );
    }

    if (filters?.category) {
      filteredPosts = filteredPosts.filter(
        (post) => post.category === filters.category
      );
    }

    return filteredPosts;
  }

  try {
    let query = supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

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
      query = query.range(
        filters.offset,
        filters.offset + (filters.limit || 10) - 1
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching blog posts:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

// Get a single blog post by slug
export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  // Return fallback data if Supabase is not configured
  if (!isSupabaseConfigured()) {
    const fallbackPosts = getFallbackBlogPosts();
    return fallbackPosts.find((post) => post.slug === slug) || null;
  }

  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
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
  try {
    let query = supabase.from("blog_posts").select("id").eq("slug", slug);

    if (excludeId) {
      query = query.neq("id", excludeId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error checking slug uniqueness:", error);
      return false;
    }

    return data.length === 0;
  } catch (error) {
    console.error("Error checking slug uniqueness:", error);
    return false;
  }
}

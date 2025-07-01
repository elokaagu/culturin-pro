"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, ChevronRight, Loader2 } from "lucide-react";
import { Link } from "../../lib/navigation";
import { getBlogPosts } from "@/lib/blog-service";
import type { Database } from "@/lib/supabase";
import NewFooter from "@/components/sections/NewFooter";

type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];

const BlogPage = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAnimateItems(true);
    document.title = "Blog | Culturin";
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      console.log("🔍 BlogPage: Starting to load blog posts...");
      setLoading(true);
      const posts = await getBlogPosts({ published: true });
      console.log("📚 BlogPage: Received posts:", posts?.length, posts);
      setBlogPosts(posts);
      console.log("✅ BlogPage: State updated with posts");
    } catch (error) {
      console.error("❌ BlogPage: Error loading blog posts:", error);
      // Set empty array on error to show "no posts" message instead of infinite loading
      setBlogPosts([]);
    } finally {
      setLoading(false);
      console.log(
        "🏁 BlogPage: Loading finished, posts count:",
        blogPosts.length
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Tourism & Culture Blog
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl">
                Insights, strategies, and inspiration for cultural experience
                creators and tour operators.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2 text-gray-600">
                  Loading blog posts...
                </span>
              </div>
            ) : blogPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                  <Card
                    key={post.id}
                    className={`overflow-hidden border-0 shadow-sm transition-all duration-500 ${
                      animateItems
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="aspect-video bg-gray-200">
                        {post.featured_image_url ? (
                          <img
                            src={post.featured_image_url}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-500">No image</span>
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                        <div className="flex items-center ml-4">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>
                            {new Date(post.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Link to={`/blog/${post.slug}`}>
                        <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <Button
                        variant="link"
                        className="p-0 h-auto font-medium text-blue-600 flex items-center"
                        asChild
                      >
                        <Link to={`/blog/${post.slug}`}>
                          Read more <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-600">No blog posts available yet.</p>
              </div>
            )}

            {!loading && blogPosts.length > 0 && (
              <div className="mt-16 text-center">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg">
                  Load more articles
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-gray-600 mb-8">
                Get the latest insights and tips delivered straight to your
                inbox.
              </p>
              <div className="flex flex-col md:flex-row gap-3 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <NewFooter />
    </div>
  );
};

export default BlogPage;

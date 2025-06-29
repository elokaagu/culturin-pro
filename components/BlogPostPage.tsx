"use client";

import { useEffect } from "react";
import { Link } from "../lib/navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar, Tag } from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";
import FreeGuidesSection from "@/components/sections/FreeGuidesSection";
import type { Database } from "@/lib/supabase";

type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];

interface BlogPostPageProps {
  post: BlogPost;
}

const BlogPostPage = ({ post }: BlogPostPageProps) => {
  useEffect(() => {
    document.title = `${post.title} | Culturin Blog`;
  }, [post.title]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      <main className="flex-1 pt-24">
        {/* Header Section */}
        <div className="bg-white py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-6">
              <Button
                variant="ghost"
                asChild
                className="flex items-center gap-1 text-gray-600 mb-8 hover:text-blue-600 -ml-3"
              >
                <Link to="/blog">
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back to all articles</span>
                </Link>
              </Button>

              <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  <span>{post.category}</span>
                </div>
                {post.author_name && (
                  <>
                    <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                    <span>By {post.author_name}</span>
                  </>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {post.title}
              </h1>
            </div>

            {/* Featured Image */}
            {post.featured_image_url && (
              <div className="aspect-video rounded-xl overflow-hidden mb-10">
                <img
                  src={post.featured_image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white py-8">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="prose prose-lg max-w-none">
              {post.content.map((paragraph, index) => (
                <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* More Articles Section */}
        <FreeGuidesSection />
      </main>

      <NewFooter />
    </div>
  );
};

export default BlogPostPage;

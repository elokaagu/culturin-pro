"use client";

import { useState, useEffect } from "react";
import { useParams } from "../../../lib/navigation";
import { Link } from "../../../lib/navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Eye } from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";
import { getBlogPostBySlug } from "@/lib/blog-service";
import type { Database } from "@/lib/supabase";

type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];

const EditBlogPost = () => {
  const params = useParams();
  const slug = params.slug as string;
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const foundPost = await getBlogPostBySlug(slug);
        setPost(foundPost);
      } catch (error) {
        console.error("Error loading blog post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header type="operator" />
        <main className="flex-1 pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header type="operator" />
        <main className="flex-1 pt-24 flex items-center justify-center">
          <Card className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Post Not Found</h2>
            <Button asChild>
              <Link to="/admin/blog">Back to Blog Management</Link>
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header type="operator" />
      <main className="flex-1 pt-24">
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Link
                to="/admin/blog"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Blog Management
              </Link>

              <h1 className="text-4xl font-bold mb-4">Edit: {post.title}</h1>
              <p className="text-gray-600 mb-4">
                Edit functionality coming soon...
              </p>

              {/* Show post details for debugging */}
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h3 className="font-semibold mb-2">Post Details:</h3>
                <p>
                  <strong>ID:</strong> {post.id}
                </p>
                <p>
                  <strong>Slug:</strong> {post.slug}
                </p>
                <p>
                  <strong>Category:</strong> {post.category}
                </p>
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
                <p>
                  <strong>Published:</strong> {post.published ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <NewFooter />
    </div>
  );
};

export default EditBlogPost;

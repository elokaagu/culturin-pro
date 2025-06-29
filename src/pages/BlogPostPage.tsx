'use client'

import { useEffect, useState } from "react";
import { useParams, Link } from "../../lib/navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar, Tag } from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";
import { blogPosts } from "@/data/blogPosts";
import FreeGuidesSection from "@/components/sections/FreeGuidesSection";

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Find the post with the matching slug
    const foundPost = blogPosts.find(p => p.slug === slug);
    
    if (foundPost) {
      setPost(foundPost);
      document.title = `${foundPost.title} | Culturin Blog`;
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header type="operator" />
        <main className="flex-1 pt-24 px-4">
          <div className="container mx-auto max-w-3xl py-12">
            <h1 className="text-3xl font-bold">Post Not Found</h1>
            <p className="mt-4 mb-8">Sorry, the blog post you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/blog">Return to Blog</Link>
            </Button>
          </div>
        </main>
        <NewFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />
      
      <main className="flex-1 pt-24">
        {/* Header Section */}
        <div className="bg-white py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-6">
              <Button variant="ghost" asChild className="flex items-center gap-1 text-gray-600 mb-8 hover:text-blue-600 -ml-3">
                <Link to="/blog">
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back to all articles</span>
                </Link>
              </Button>
              
              <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{post.date}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  <span>{post.category}</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {post.title}
              </h1>
            </div>
            
            {/* Featured Image */}
            <div className="aspect-video rounded-xl overflow-hidden mb-10">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
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

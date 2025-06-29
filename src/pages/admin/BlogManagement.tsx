"use client";

import { useState, useEffect } from "react";
import { Link } from "../../../lib/navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Edit,
  Eye,
  Trash2,
  Search,
  Filter,
  ArrowLeft,
} from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";
import { blogPosts } from "@/data/blogPosts";

const BlogManagement = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setAnimateItems(true);
    document.title = "Blog Management | Admin - Culturin";
  }, []);

  const categories = [
    "All",
    ...new Set(blogPosts.map((post) => post.category)),
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.some((paragraph) =>
        paragraph.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeletePost = (postId: number) => {
    // In a real application, this would make an API call to delete the post
    console.log("Delete post:", postId);
    alert("Delete functionality would be implemented with backend API");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header type="operator" />

      <main className="flex-1 pt-24">
        {/* Header Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl">
              <Link
                to="/admin"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Admin Dashboard
              </Link>

              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Blog Management
                  </h1>
                  <p className="text-lg md:text-xl text-gray-600">
                    Manage all your blog posts, create new content, and edit
                    existing articles.
                  </p>
                </div>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link to="/admin/blog/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Post
                  </Link>
                </Button>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search blog posts..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {blogPosts.length}
                    </p>
                    <p className="text-sm text-gray-600">Total Posts</p>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {filteredPosts.length}
                    </p>
                    <p className="text-sm text-gray-600">Filtered Results</p>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      {categories.length - 1}
                    </p>
                    <p className="text-sm text-gray-600">Categories</p>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">
                      {
                        blogPosts.filter((post) => {
                          const postDate = new Date(post.date);
                          const thirtyDaysAgo = new Date();
                          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                          return postDate > thirtyDaysAgo;
                        }).length
                      }
                    </p>
                    <p className="text-sm text-gray-600">Recent Posts</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts List */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl">
              {filteredPosts.length > 0 ? (
                <div className="space-y-6">
                  {filteredPosts.map((post, index) => (
                    <Card
                      key={post.id}
                      className={`p-6 transition-all duration-500 ${
                        animateItems
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      }`}
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {post.category}
                            </span>
                            <span className="text-sm text-gray-500">
                              {post.date}
                            </span>
                            <span className="text-xs text-gray-400">
                              ID: {post.id}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 mb-3">{post.excerpt}</p>
                          <div className="text-sm text-gray-500">
                            <span>Slug: /{post.slug}</span>
                            <span className="mx-2">•</span>
                            <span>{post.content.length} paragraphs</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-6">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/blog/${post.slug}`} target="_blank">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/admin/blog/edit/${post.slug}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <div className="max-w-md mx-auto">
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      No posts found
                    </h3>
                    <p className="text-gray-600 mb-6">
                      No blog posts match your current search criteria. Try
                      adjusting your search terms or filters.
                    </p>
                    <Button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("All");
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>

      <NewFooter />
    </div>
  );
};

export default BlogManagement;

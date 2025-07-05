"use client";

import { useState, useEffect } from "react";
import { Link } from "../../../lib/navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Plus,
  Edit,
  Eye,
  Users,
  Settings,
  FileText,
  TrendingUp,
  Calendar,
  MessageSquare,
  Briefcase,
} from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";
import { getBlogPosts } from "@/lib/blog-service";
import type { Database } from "@/lib/supabase";

type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];

const AdminDashboard = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAnimateItems(true);
    document.title = "Admin Dashboard | Culturin";
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      const posts = await getBlogPosts();
      setBlogPosts(posts);
    } catch (error) {
      console.error("Error loading blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      title: "Total Blog Posts",
      value: blogPosts.length,
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Published Posts",
      value: blogPosts.filter((post) => post.published).length,
      icon: Eye,
      color: "text-green-600",
    },
    {
      title: "Draft Posts",
      value: blogPosts.filter((post) => !post.published).length,
      icon: Edit,
      color: "text-yellow-600",
    },
    {
      title: "This Month",
      value: blogPosts.filter((post) => {
        const postDate = new Date(post.created_at);
        const now = new Date();
        return (
          postDate.getMonth() === now.getMonth() &&
          postDate.getFullYear() === now.getFullYear()
        );
      }).length,
      icon: Calendar,
      color: "text-purple-600",
    },
  ];

  const quickActions = [
    {
      title: "Create New Blog Post",
      description: "Write and publish a new blog article",
      icon: Plus,
      link: "/admin/blog/new",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Manage Blog Posts",
      description: "View, edit, and manage existing blog posts",
      icon: Edit,
      link: "/admin/blog",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Manage Testimonials",
      description: "Add, edit, and organize customer testimonials",
      icon: Users,
      link: "/admin/testimonials",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Manage Careers",
      description: "View job applications and manage postings",
      icon: Users,
      link: "/admin/careers",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Manage Help Center",
      description: "Update FAQs and help center content",
      icon: Settings,
      link: "/admin/help-center",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Manage Case Studies",
      description: "Add and edit success stories",
      icon: FileText,
      link: "/admin/case-studies",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "View Live Blog",
      description: "See how the blog appears to visitors",
      icon: Eye,
      link: "/blog",
      color: "bg-gray-600 hover:bg-gray-700",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header type="operator" />

      <main className="flex-1 pt-20">
        {/* Header Section */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Admin Dashboard
                  </h1>
                  <p className="text-lg md:text-xl text-gray-600">
                    Manage your content, users, and website settings from this
                    central hub.
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <Card
                    key={index}
                    className={`p-6 transition-all duration-500 ${
                      animateItems
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                      <div className={`p-3 rounded-full bg-gray-100`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {quickActions.map((action, index) => (
                    <Card
                      key={index}
                      className={`p-6 hover:shadow-lg transition-all duration-500 ${
                        animateItems
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      }`}
                      style={{ transitionDelay: `${200 + index * 100}ms` }}
                    >
                      <div className="text-center">
                        <div
                          className={`inline-flex p-4 rounded-full ${action.color} text-white mb-4`}
                        >
                          <action.icon className="h-8 w-8" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          {action.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {action.description}
                        </p>
                        <Button asChild className={action.color}>
                          <Link to={action.link}>Get Started</Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Recent Blog Posts */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Recent Blog Posts</h2>
                  <Button asChild>
                    <Link to="/admin/blog">View All Posts</Link>
                  </Button>
                </div>
                {loading ? (
                  <Card className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading blog posts...</p>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {blogPosts.slice(0, 5).map((post, index) => (
                      <Card
                        key={post.id}
                        className={`p-6 transition-all duration-500 ${
                          animateItems
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                        }`}
                        style={{ transitionDelay: `${400 + index * 50}ms` }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 mb-3">{post.excerpt}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                {post.category}
                              </span>
                              <span>
                                {new Date(post.created_at).toLocaleDateString()}
                              </span>
                              <span
                                className={`px-2 py-1 rounded text-xs ${
                                  post.published
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {post.published ? "Published" : "Draft"}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/admin/blog/edit/${post.slug}`}>
                                Edit
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/blog/${post.slug}`}>View</Link>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <NewFooter />
    </div>
  );
};

export default AdminDashboard;

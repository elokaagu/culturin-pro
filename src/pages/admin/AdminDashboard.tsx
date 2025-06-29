"use client";

import { useState, useEffect } from "react";
import { Link } from "../../../lib/navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FileText,
  Users,
  BarChart3,
  Settings,
  Plus,
  Edit,
  Eye,
} from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";
import { blogPosts } from "@/data/blogPosts";

const AdminDashboard = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);

  useEffect(() => {
    setAnimateItems(true);
    document.title = "Admin Dashboard | Culturin";
  }, []);

  const stats = [
    {
      title: "Total Blog Posts",
      value: blogPosts.length.toString(),
      icon: FileText,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Published Posts",
      value: blogPosts.length.toString(),
      icon: Eye,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Categories",
      value: new Set(blogPosts.map((post) => post.category)).size.toString(),
      icon: BarChart3,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Recent Posts",
      value: blogPosts
        .filter((post) => {
          const postDate = new Date(post.date);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return postDate > thirtyDaysAgo;
        })
        .length.toString(),
      icon: Plus,
      color: "bg-orange-100 text-orange-600",
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
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "View Live Blog",
      description: "See how the blog appears to visitors",
      icon: Eye,
      link: "/blog",
      color: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header type="operator" />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Admin Dashboard
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Manage your Culturin content, blog posts, and platform settings.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
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
                      <p className="text-gray-600 mb-4">{action.description}</p>
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
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Recent Blog Posts</h2>
                <Button asChild>
                  <Link to="/admin/blog">View All Posts</Link>
                </Button>
              </div>
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
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {post.category}
                          </span>
                          <span className="text-sm text-gray-500">
                            {post.date}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600">{post.excerpt}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/blog/${post.slug}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/admin/blog/edit/${post.slug}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
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

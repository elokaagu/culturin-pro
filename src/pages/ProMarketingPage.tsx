"use client";

import React, { useState } from "react";
import ProDashboardLayout from "@/components/pro/ProDashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  Mail,
  Share,
  Search,
  FileText,
  Zap,
  BarChart3,
  Target,
  Globe,
  MessageSquare,
} from "lucide-react";

// Import the new marketing components
import EmailCampaigns from "@/components/pro/marketing/EmailCampaigns";
import SocialMediaManager from "@/components/pro/marketing/SocialMediaManager";
import ContentCreator from "@/components/pro/marketing/ContentCreator";
import SEOOptimizer from "@/components/pro/marketing/SEOOptimizer";

const ProMarketingPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const marketingMetrics = [
    {
      title: "Website Traffic",
      value: "12,847",
      change: "+18%",
      icon: <Eye className="h-8 w-8 text-blue-600" />,
      description: "Monthly visitors",
    },
    {
      title: "Email Subscribers",
      value: "3,521",
      change: "+12%",
      icon: <Mail className="h-8 w-8 text-green-600" />,
      description: "Active subscribers",
    },
    {
      title: "Social Followers",
      value: "5,284",
      change: "+8%",
      icon: <Users className="h-8 w-8 text-purple-600" />,
      description: "Total followers",
    },
    {
      title: "Conversion Rate",
      value: "4.2%",
      change: "+0.8%",
      icon: <Target className="h-8 w-8 text-orange-600" />,
      description: "Visitor to booking",
    },
  ];

  const recentActivity = [
    {
      type: "Email Campaign",
      title: "Summer Cultural Tours Promotion",
      status: "Sent",
      metric: "24.5% open rate",
      time: "2 hours ago",
    },
    {
      type: "Social Post",
      title: "Traditional Cooking Class Photos",
      status: "Published",
      metric: "324 likes",
      time: "4 hours ago",
    },
    {
      type: "Blog Post",
      title: "Hidden Gems of Barcelona",
      status: "Published",
      metric: "156 views",
      time: "1 day ago",
    },
    {
      type: "SEO Update",
      title: "Optimized Experience Pages",
      status: "Completed",
      metric: "+3 avg position",
      time: "2 days ago",
    },
  ];

  const quickActions = [
    {
      title: "Create Email Campaign",
      description: "Send targeted emails to your subscribers",
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      action: () => setActiveTab("email"),
    },
    {
      title: "Schedule Social Post",
      description: "Plan your social media content",
      icon: <Share className="h-6 w-6 text-green-600" />,
      action: () => setActiveTab("social"),
    },
    {
      title: "Generate Content",
      description: "Create marketing copy with AI",
      icon: <FileText className="h-6 w-6 text-purple-600" />,
      action: () => setActiveTab("content"),
    },
    {
      title: "SEO Analysis",
      description: "Optimize for search engines",
      icon: <Search className="h-6 w-6 text-orange-600" />,
      action: () => setActiveTab("seo"),
    },
  ];

  return (
    <ProDashboardLayout
      title="Marketing Studio"
      subtitle="Grow your cultural tourism business with powerful marketing tools"
    >
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-1">
            <Share className="h-4 w-4" />
            Social
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-1">
            <Search className="h-4 w-4" />
            SEO
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Marketing Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketingMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{metric.title}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className="text-xs text-gray-500">
                        {metric.description}
                      </p>
                    </div>
                    {metric.icon}
                  </div>
                  <p className="text-xs text-green-600 mt-2">
                    {metric.change} from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Jump into your most common marketing tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quickActions.map((action, index) => (
                      <div
                        key={index}
                        onClick={action.action}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          {action.icon}
                          <h3 className="font-medium">{action.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                          {action.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Marketing Performance */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Marketing Performance</CardTitle>
                  <CardDescription>
                    Key metrics for your marketing efforts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          28.4%
                        </div>
                        <p className="text-sm text-gray-600">Email Open Rate</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          5.7%
                        </div>
                        <p className="text-sm text-gray-600">
                          Click Through Rate
                        </p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">
                          4.2%
                        </div>
                        <p className="text-sm text-gray-600">
                          Social Engagement
                        </p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-600">
                          68
                        </div>
                        <p className="text-sm text-gray-600">SEO Score</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest marketing activities and results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="border-b pb-3 last:border-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{activity.type}</Badge>
                            <Badge
                              className={
                                activity.status === "Sent" ||
                                activity.status === "Published" ||
                                activity.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                              }
                            >
                              {activity.status}
                            </Badge>
                          </div>
                          <span className="text-xs text-gray-500">
                            {activity.time}
                          </span>
                        </div>
                        <h4 className="font-medium text-sm">
                          {activity.title}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {activity.metric}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Marketing Assistant */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    AI Marketing Assistant
                  </CardTitle>
                  <CardDescription>
                    Smart recommendations for your marketing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <h4 className="font-medium text-sm text-blue-800">
                        Content Suggestion
                      </h4>
                      <p className="text-xs text-blue-700 mt-1">
                        Create a blog post about "Traditional Spanish Cooking
                        Techniques" - trending keyword with high search volume
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <h4 className="font-medium text-sm text-green-800">
                        Email Opportunity
                      </h4>
                      <p className="text-xs text-green-700 mt-1">
                        Send a follow-up email to guests from last month's tours
                        - 68% typically book again within 3 months
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <h4 className="font-medium text-sm text-purple-800">
                        Social Media Tip
                      </h4>
                      <p className="text-xs text-purple-700 mt-1">
                        Post between 6-8 PM today for 23% higher engagement
                        based on your audience analysis
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Marketing Tools Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Marketing Tools</CardTitle>
              <CardDescription>
                Comprehensive tools to grow your cultural tourism business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Mail className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-medium mb-2">Email Marketing</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Create campaigns, automate sequences, and track performance
                  </p>
                  <Badge variant="outline">24 campaigns sent</Badge>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Share className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-medium mb-2">Social Media</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Schedule posts, manage content, and analyze engagement
                  </p>
                  <Badge variant="outline">127 posts published</Badge>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <FileText className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-medium mb-2">Content Creation</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    AI-powered content generation for all your marketing needs
                  </p>
                  <Badge variant="outline">147 pieces created</Badge>
                </div>
                <div className="text-center">
                  <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Search className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-medium mb-2">SEO Optimization</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Improve search rankings and attract organic traffic
                  </p>
                  <Badge variant="outline">68 SEO score</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <EmailCampaigns />
        </TabsContent>

        <TabsContent value="social">
          <SocialMediaManager />
        </TabsContent>

        <TabsContent value="content">
          <ContentCreator />
        </TabsContent>

        <TabsContent value="seo">
          <SEOOptimizer />
        </TabsContent>
      </Tabs>
    </ProDashboardLayout>
  );
};

export default ProMarketingPage;

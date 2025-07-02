"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  Globe, 
  BarChart3, 
  Search, 
  Zap, 
  Settings,
  Eye,
  Users,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Clock,
  Palette,
  FileText,
  Activity
} from 'lucide-react';

// Import the website components
import WebsiteBuilder from '@/components/pro/website/WebsiteBuilder';
import WebsiteAnalytics from '@/components/pro/website/WebsiteAnalytics';
import DomainManager from '@/components/pro/website/DomainManager';
import SEOManager from '@/components/pro/website/SEOManager';
import PerformanceMonitor from '@/components/pro/website/PerformanceMonitor';

const ProWebsitePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  const websiteStats = {
    visitors: 2847,
    pageViews: 8934,
    conversionRate: 3.1,
    uptime: 99.9,
    performanceScore: 83,
    seoScore: 85,
    activeDomains: 2,
    publishedPages: 12
  };

  const quickActions = [
    { 
      title: 'Publish Changes', 
      description: 'Deploy your latest website updates', 
      icon: Globe, 
      action: () => toast({ title: "Publishing...", description: "Your changes are being deployed." }),
      variant: 'default' as const
    },
    { 
      title: 'Run SEO Audit', 
      description: 'Check your site\'s search optimization', 
      icon: Search, 
      action: () => setActiveTab('seo'),
      variant: 'outline' as const
    },
    { 
      title: 'Performance Test', 
      description: 'Analyze your website speed', 
      icon: Zap, 
      action: () => setActiveTab('performance'),
      variant: 'outline' as const
    },
    { 
      title: 'View Analytics', 
      description: 'Check your visitor insights', 
      icon: BarChart3, 
      action: () => setActiveTab('analytics'),
      variant: 'outline' as const
    }
  ];

  const recentActivity = [
    { action: 'Website published', time: '2 hours ago', status: 'success' },
    { action: 'SEO optimization completed', time: '1 day ago', status: 'success' },
    { action: 'New domain added', time: '2 days ago', status: 'success' },
    { action: 'Performance test run', time: '3 days ago', status: 'warning' },
    { action: 'Analytics report generated', time: '1 week ago', status: 'success' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Website Management</h1>
          <p className="text-gray-600">Build, optimize, and manage your online presence</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <Activity className="h-3 w-3 mr-1" />
            Live
          </Badge>
          <Button onClick={() => setActiveTab('builder')}>
            <Palette className="h-4 w-4 mr-2" />
            Edit Website
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-6 w-full max-w-4xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="domains">Domains</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Website Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Visitors</p>
                    <p className="text-2xl font-bold">{websiteStats.visitors.toLocaleString()}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Page Views</p>
                    <p className="text-2xl font-bold">{websiteStats.pageViews.toLocaleString()}</p>
                  </div>
                  <Eye className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">↑ 8% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold">{websiteStats.conversionRate}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">↑ 0.4% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Uptime</p>
                    <p className="text-2xl font-bold">{websiteStats.uptime}%</p>
                  </div>
                  <Activity className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">↑ 0.2% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Scores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Performance Score</CardTitle>
                <CardDescription>Website speed and optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-yellow-600">{websiteStats.performanceScore}</div>
                  <Zap className="h-8 w-8 text-yellow-600" />
                </div>
                <p className="text-sm text-gray-600 mt-2">Needs improvement on mobile</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3"
                  onClick={() => setActiveTab('performance')}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">SEO Score</CardTitle>
                <CardDescription>Search engine optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-green-600">{websiteStats.seoScore}</div>
                  <Search className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mt-2">Good optimization overall</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3"
                  onClick={() => setActiveTab('seo')}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Website Status</CardTitle>
                <CardDescription>Overall health and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-green-600">Active</div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mt-2">{websiteStats.activeDomains} domains, {websiteStats.publishedPages} pages</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3"
                  onClick={() => setActiveTab('domains')}
                >
                  Manage Domains
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common website management tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <action.icon className="h-5 w-5 text-gray-600" />
                      <h4 className="font-medium">{action.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                    <Button 
                      variant={action.variant} 
                      size="sm" 
                      className="w-full"
                      onClick={action.action}
                    >
                      {action.title}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest website changes and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {getStatusIcon(activity.status)}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Website Health</CardTitle>
                <CardDescription>Key indicators of your website's performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SSL Certificate</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Valid</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">DNS Configuration</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Configured</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Backup Status</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Up to date</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Security Scan</span>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">1 issue found</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Website Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Optimization Tips</CardTitle>
              <CardDescription>Recommendations to improve your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="font-medium text-blue-800">Improve Mobile Performance</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Your mobile performance score is 74. Optimize images and reduce JavaScript to improve loading speed.
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <h4 className="font-medium text-green-800">Great SEO Progress</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Your SEO score improved by 8 points this month. Keep adding quality content and optimizing meta descriptions.
                  </p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <h4 className="font-medium text-yellow-800">Update Security Settings</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Consider enabling additional security features like two-factor authentication for your website admin.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="builder">
          <WebsiteBuilder />
        </TabsContent>

        <TabsContent value="analytics">
          <WebsiteAnalytics />
        </TabsContent>

        <TabsContent value="seo">
          <SEOManager />
        </TabsContent>

        <TabsContent value="performance">
          <PerformanceMonitor />
        </TabsContent>

        <TabsContent value="domains">
          <DomainManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProWebsitePage;

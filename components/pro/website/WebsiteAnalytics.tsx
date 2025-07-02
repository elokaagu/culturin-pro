"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { 
  BarChart3, 
  Users, 
  Eye, 
  MousePointer, 
  TrendingUp, 
  TrendingDown,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  MapPin,
  Clock,
  Search,
  Share2,
  Mail,
  ExternalLink,
  Download,
  RefreshCw
} from 'lucide-react';

const WebsiteAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  const analyticsData = {
    period: selectedPeriod,
    visitors: 2847,
    pageViews: 8934,
    bounceRate: 34.2,
    avgSessionDuration: '3m 24s',
    conversions: 89,
    conversionRate: 3.1
  };

  const trafficSources = [
    { source: 'Organic Search', visitors: 1247, percentage: 43.8, change: 12.3 },
    { source: 'Direct', visitors: 856, percentage: 30.1, change: -2.1 },
    { source: 'Social Media', visitors: 423, percentage: 14.9, change: 18.7 },
    { source: 'Email', visitors: 198, percentage: 7.0, change: 8.4 },
    { source: 'Referral', visitors: 123, percentage: 4.3, change: -5.2 }
  ];

  const popularPages = [
    { page: '/experiences/cooking-class', views: 1247, uniqueViews: 1089, avgTime: '4m 32s', bounceRate: 28.5 },
    { page: '/experiences/art-workshop', views: 987, uniqueViews: 856, avgTime: '3m 45s', bounceRate: 31.2 },
    { page: '/', views: 2134, uniqueViews: 1876, avgTime: '2m 18s', bounceRate: 45.6 },
    { page: '/about', views: 567, uniqueViews: 489, avgTime: '2m 56s', bounceRate: 38.9 },
    { page: '/contact', views: 423, uniqueViews: 398, avgTime: '1m 47s', bounceRate: 52.1 }
  ];

  const deviceData = [
    { device: 'Desktop', percentage: 58.3, visitors: 1659 },
    { device: 'Mobile', percentage: 35.7, visitors: 1016 },
    { device: 'Tablet', percentage: 6.0, visitors: 172 }
  ];

  const locationData = [
    { country: 'Spain', city: 'Barcelona', visitors: 847, percentage: 29.8 },
    { country: 'United States', city: 'New York', visitors: 423, percentage: 14.9 },
    { country: 'United Kingdom', city: 'London', visitors: 356, percentage: 12.5 },
    { country: 'France', city: 'Paris', visitors: 289, percentage: 10.2 },
    { country: 'Germany', city: 'Berlin', visitors: 234, percentage: 8.2 }
  ];

  const handleRefreshData = () => {
    toast({
      title: "Analytics Refreshed",
      description: "Your website analytics data has been updated."
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your analytics report is being prepared for download."
    });
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'Desktop': return <Monitor className="h-4 w-4" />;
      case 'Mobile': return <Smartphone className="h-4 w-4" />;
      case 'Tablet': return <Tablet className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Website Analytics</h2>
          <p className="text-gray-600">Track your website performance and visitor insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleRefreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="conversions">Conversions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Visitors</p>
                    <p className="text-2xl font-bold">{analyticsData.visitors.toLocaleString()}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">↑ 12% from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Page Views</p>
                    <p className="text-2xl font-bold">{analyticsData.pageViews.toLocaleString()}</p>
                  </div>
                  <Eye className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">↑ 8% from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Bounce Rate</p>
                    <p className="text-2xl font-bold">{analyticsData.bounceRate}%</p>
                  </div>
                  <MousePointer className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">↓ 3% from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg. Session</p>
                    <p className="text-2xl font-bold">{analyticsData.avgSessionDuration}</p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">↑ 15% from last period</p>
              </CardContent>
            </Card>
          </div>

          {/* Traffic Sources Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your visitors are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSources.slice(0, 3).map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-600" style={{ 
                        backgroundColor: index === 0 ? '#3b82f6' : index === 1 ? '#10b981' : '#f59e0b' 
                      }}></div>
                      <span className="font-medium">{source.source}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{source.visitors.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{source.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Real-time Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Real-time Activity</CardTitle>
              <CardDescription>Current visitors on your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">23</div>
                  <p className="text-sm text-gray-600">Active Users</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">47</div>
                  <p className="text-sm text-gray-600">Page Views (last hour)</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">5</div>
                  <p className="text-sm text-gray-600">Active Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Detailed breakdown of your website traffic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSources.map((source, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {source.source === 'Organic Search' && <Search className="h-5 w-5 text-green-600" />}
                        {source.source === 'Direct' && <Globe className="h-5 w-5 text-blue-600" />}
                        {source.source === 'Social Media' && <Share2 className="h-5 w-5 text-purple-600" />}
                        {source.source === 'Email' && <Mail className="h-5 w-5 text-orange-600" />}
                        {source.source === 'Referral' && <ExternalLink className="h-5 w-5 text-gray-600" />}
                        <h4 className="font-medium">{source.source}</h4>
                      </div>
                      <div className={`flex items-center gap-1 ${getChangeColor(source.change)}`}>
                        {getChangeIcon(source.change)}
                        <span className="text-sm">{Math.abs(source.change)}%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Visitors</p>
                        <p className="font-medium">{source.visitors.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Percentage</p>
                        <p className="font-medium">{source.percentage}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Change</p>
                        <p className={`font-medium ${getChangeColor(source.change)}`}>
                          {source.change >= 0 ? '+' : ''}{source.change}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Popular Pages</CardTitle>
              <CardDescription>Most visited pages on your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularPages.map((page, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{page.page}</h4>
                      <Badge variant="outline">{page.views.toLocaleString()} views</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Unique Views</p>
                        <p className="font-medium">{page.uniqueViews.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Avg. Time</p>
                        <p className="font-medium">{page.avgTime}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Bounce Rate</p>
                        <p className="font-medium">{page.bounceRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Engagement</p>
                        <p className="font-medium text-green-600">
                          {page.bounceRate < 40 ? 'High' : page.bounceRate < 60 ? 'Medium' : 'Low'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Device Usage</CardTitle>
                <CardDescription>How visitors access your website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deviceData.map((device, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getDeviceIcon(device.device)}
                        <span className="font-medium">{device.device}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{device.visitors.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">{device.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Locations</CardTitle>
                <CardDescription>Where your visitors are located</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {locationData.map((location, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium text-sm">{location.city}</p>
                          <p className="text-xs text-gray-500">{location.country}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm">{location.visitors}</div>
                        <div className="text-xs text-gray-500">{location.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Conversions</p>
                    <p className="text-2xl font-bold">{analyticsData.conversions}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">↑ 18% from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold">{analyticsData.conversionRate}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">↑ 0.4% from last period</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>Track visitor journey to booking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { stage: 'Website Visitors', count: 2847, percentage: 100 },
                  { stage: 'Experience Page Views', count: 1423, percentage: 50 },
                  { stage: 'Booking Page Visits', count: 456, percentage: 16 },
                  { stage: 'Booking Started', count: 234, percentage: 8.2 },
                  { stage: 'Booking Completed', count: 89, percentage: 3.1 }
                ].map((stage, index) => (
                  <div key={index} className="flex items-center justify-between border rounded-lg p-3">
                    <div>
                      <h4 className="font-medium">{stage.stage}</h4>
                      <p className="text-sm text-gray-600">{stage.count.toLocaleString()} visitors</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{stage.percentage}%</div>
                      {index > 0 && (
                        <div className="text-xs text-gray-500">
                          {Math.round((stage.count / 2847) * 100)}% of total
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebsiteAnalytics;

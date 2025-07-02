"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { 
  Activity, 
  Zap, 
  Globe, 
  Smartphone, 
  Monitor,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Download,
  Settings,
  Eye,
  Users,
  Server,
  Wifi,
  Image,
  Code,
  Database
} from 'lucide-react';

const PerformanceMonitor: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  const performanceMetrics = [
    { name: 'Page Load Time', value: 2.1, unit: 's', status: 'needs-improvement', change: -0.3, target: 1.5 },
    { name: 'First Contentful Paint', value: 1.8, unit: 's', status: 'good', change: -0.2, target: 1.8 },
    { name: 'Largest Contentful Paint', value: 2.4, unit: 's', status: 'needs-improvement', change: 0.1, target: 2.5 },
    { name: 'First Input Delay', value: 89, unit: 'ms', status: 'good', change: -12, target: 100 },
    { name: 'Cumulative Layout Shift', value: 0.08, unit: '', status: 'good', change: -0.02, target: 0.1 }
  ];

  const uptimeData = [
    { date: '2024-02-01', uptime: 99.9, downtime: 2, incidents: 0 },
    { date: '2024-02-02', uptime: 100, downtime: 0, incidents: 0 },
    { date: '2024-02-03', uptime: 99.8, downtime: 5, incidents: 1 },
    { date: '2024-02-04', uptime: 100, downtime: 0, incidents: 0 },
    { date: '2024-02-05', uptime: 99.9, downtime: 1, incidents: 0 },
    { date: '2024-02-06', uptime: 100, downtime: 0, incidents: 0 },
    { date: '2024-02-07', uptime: 100, downtime: 0, incidents: 0 }
  ];

  const pageSpeedData = [
    {
      url: '/',
      desktop: { score: 92, fcp: 1.2, lcp: 2.1, fid: 45, cls: 0.05 },
      mobile: { score: 78, fcp: 1.8, lcp: 2.8, fid: 89, cls: 0.08 }
    },
    {
      url: '/experiences/cooking-class',
      desktop: { score: 88, fcp: 1.4, lcp: 2.3, fid: 52, cls: 0.06 },
      mobile: { score: 74, fcp: 2.1, lcp: 3.2, fid: 95, cls: 0.09 }
    },
    {
      url: '/experiences/art-workshop',
      desktop: { score: 85, fcp: 1.6, lcp: 2.5, fid: 58, cls: 0.07 },
      mobile: { score: 71, fcp: 2.3, lcp: 3.5, fid: 102, cls: 0.11 }
    }
  ];

  const currentUptime = uptimeData.reduce((acc, day) => acc + day.uptime, 0) / uptimeData.length;
  const totalIncidents = uptimeData.reduce((acc, day) => acc + day.incidents, 0);

  const handleRunTest = () => {
    toast({
      title: "Performance Test Started",
      description: "Running comprehensive performance analysis..."
    });
  };

  const handleRefreshData = () => {
    toast({
      title: "Data Refreshed",
      description: "Performance metrics have been updated."
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'needs-improvement': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'needs-improvement': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getChangeIcon = (change) => {
    return change < 0 ? <TrendingDown className="h-3 w-3 text-green-500" /> : <TrendingUp className="h-3 w-3 text-red-500" />;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Performance Monitor</h2>
          <p className="text-gray-600">Track your website's speed, uptime, and user experience</p>
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
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleRefreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleRunTest}>
            <Zap className="h-4 w-4 mr-2" />
            Run Test
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="speed">Page Speed</TabsTrigger>
          <TabsTrigger value="uptime">Uptime</TabsTrigger>
          <TabsTrigger value="vitals">Core Vitals</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Performance Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Uptime</p>
                    <p className="text-2xl font-bold">{currentUptime.toFixed(1)}%</p>
                  </div>
                  <Activity className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">↑ 0.2% from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg. Load Time</p>
                    <p className="text-2xl font-bold">2.1s</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">↓ 0.3s from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Performance Score</p>
                    <p className="text-2xl font-bold">83</p>
                  </div>
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">↑ 5 points from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Incidents</p>
                    <p className="text-2xl font-bold">{totalIncidents}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">↓ 2 from last period</p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Core Performance Metrics</CardTitle>
              <CardDescription>Key metrics affecting user experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{metric.name}</h4>
                      <Badge className={getStatusBadge(metric.status)}>
                        {metric.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                          {metric.value}{metric.unit}
                        </span>
                        <div className="flex items-center gap-1 text-sm">
                          {getChangeIcon(metric.change)}
                          <span className={metric.change < 0 ? 'text-green-600' : 'text-red-600'}>
                            {Math.abs(metric.change)}{metric.unit}
                          </span>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <p>Target: {metric.target}{metric.unit}</p>
                        <Progress 
                          value={Math.min((metric.target / metric.value) * 100, 100)} 
                          className="w-20 mt-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Real-time Status */}
          <Card>
            <CardHeader>
              <CardTitle>Real-time Status</CardTitle>
              <CardDescription>Current website status and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h4 className="font-medium">Website Status</h4>
                  <p className="text-sm text-gray-600">All systems operational</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Server className="h-8 w-8 text-blue-500" />
                  </div>
                  <h4 className="font-medium">Server Response</h4>
                  <p className="text-sm text-gray-600">145ms average</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Wifi className="h-8 w-8 text-green-500" />
                  </div>
                  <h4 className="font-medium">CDN Status</h4>
                  <p className="text-sm text-gray-600">Global delivery active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="speed" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Page Speed Analysis</CardTitle>
              <CardDescription>Performance scores for your key pages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pageSpeedData.map((page, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">{page.url}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Monitor className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">Desktop</span>
                          <span className={`text-lg font-bold ${getScoreColor(page.desktop.score)}`}>
                            {page.desktop.score}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-600">FCP</p>
                            <p className="font-medium">{page.desktop.fcp}s</p>
                          </div>
                          <div>
                            <p className="text-gray-600">LCP</p>
                            <p className="font-medium">{page.desktop.lcp}s</p>
                          </div>
                          <div>
                            <p className="text-gray-600">FID</p>
                            <p className="font-medium">{page.desktop.fid}ms</p>
                          </div>
                          <div>
                            <p className="text-gray-600">CLS</p>
                            <p className="font-medium">{page.desktop.cls}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Smartphone className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">Mobile</span>
                          <span className={`text-lg font-bold ${getScoreColor(page.mobile.score)}`}>
                            {page.mobile.score}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-600">FCP</p>
                            <p className="font-medium">{page.mobile.fcp}s</p>
                          </div>
                          <div>
                            <p className="text-gray-600">LCP</p>
                            <p className="font-medium">{page.mobile.lcp}s</p>
                          </div>
                          <div>
                            <p className="text-gray-600">FID</p>
                            <p className="font-medium">{page.mobile.fid}ms</p>
                          </div>
                          <div>
                            <p className="text-gray-600">CLS</p>
                            <p className="font-medium">{page.mobile.cls}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="uptime" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">7-day Uptime</p>
                    <p className="text-2xl font-bold">{currentUptime.toFixed(2)}%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <Progress value={currentUptime} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Downtime</p>
                    <p className="text-2xl font-bold">8m</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">↓ 5m from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Incidents</p>
                    <p className="text-2xl font-bold">{totalIncidents}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">↓ 2 from last period</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Uptime History</CardTitle>
              <CardDescription>Daily uptime percentage over the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {uptimeData.map((day, index) => (
                  <div key={index} className="flex items-center justify-between border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      {day.uptime === 100 ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      )}
                      <span className="font-medium">
                        {new Date(day.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">{day.uptime}%</p>
                        <p className="text-sm text-gray-600">{day.downtime}m downtime</p>
                      </div>
                      <div className="w-20">
                        <Progress value={day.uptime} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Core Web Vitals</CardTitle>
              <CardDescription>Google's user experience metrics that affect search rankings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-yellow-600">2.4s</div>
                    <h4 className="font-medium">Largest Contentful Paint</h4>
                    <p className="text-sm text-gray-600">Time to render largest element</p>
                  </div>
                  <Progress value={60} className="mb-2" />
                  <Badge className="bg-yellow-100 text-yellow-800">Needs Improvement</Badge>
                </div>
                <div className="text-center">
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-green-600">89ms</div>
                    <h4 className="font-medium">First Input Delay</h4>
                    <p className="text-sm text-gray-600">Time to first user interaction</p>
                  </div>
                  <Progress value={90} className="mb-2" />
                  <Badge className="bg-green-100 text-green-800">Good</Badge>
                </div>
                <div className="text-center">
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-green-600">0.08</div>
                    <h4 className="font-medium">Cumulative Layout Shift</h4>
                    <p className="text-sm text-gray-600">Visual stability during load</p>
                  </div>
                  <Progress value={85} className="mb-2" />
                  <Badge className="bg-green-100 text-green-800">Good</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Optimization</CardTitle>
              <CardDescription>Recommendations to improve your website performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-800">Critical: Optimize Images</h4>
                      <p className="text-sm text-red-700 mt-1">
                        Large images are slowing down your page load. Compress and resize images to improve LCP by ~40%.
                      </p>
                      <Button size="sm" className="mt-2" variant="outline">
                        <Image className="h-4 w-4 mr-2" />
                        Optimize Images
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Reduce JavaScript Execution Time</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Heavy JavaScript is blocking the main thread. Consider code splitting and lazy loading.
                      </p>
                      <Button size="sm" className="mt-2" variant="outline">
                        <Code className="h-4 w-4 mr-2" />
                        Analyze Scripts
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Database className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">Enable Browser Caching</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Set up proper cache headers to reduce repeat visitor load times by up to 50%.
                      </p>
                      <Button size="sm" className="mt-2" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure Caching
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Fixes</CardTitle>
              <CardDescription>One-click optimizations you can apply now</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Compress Images</h4>
                  <p className="text-sm text-gray-600 mb-3">Automatically compress all images on your site</p>
                  <Button className="w-full">
                    <Image className="h-4 w-4 mr-2" />
                    Compress Now
                  </Button>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Minify CSS/JS</h4>
                  <p className="text-sm text-gray-600 mb-3">Remove unnecessary characters from code files</p>
                  <Button className="w-full">
                    <Code className="h-4 w-4 mr-2" />
                    Minify Files
                  </Button>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Enable CDN</h4>
                  <p className="text-sm text-gray-600 mb-3">Serve content from global edge locations</p>
                  <Button className="w-full">
                    <Globe className="h-4 w-4 mr-2" />
                    Enable CDN
                  </Button>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Lazy Load Images</h4>
                  <p className="text-sm text-gray-600 mb-3">Load images only when they're needed</p>
                  <Button className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    Enable Lazy Loading
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceMonitor;

"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { 
  Search, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Globe,
  FileText,
  Image,
  Link,
  Target,
  BarChart3,
  Lightbulb,
  Zap,
  Eye,
  Clock,
  Star,
  ExternalLink,
  RefreshCw,
  Download
} from 'lucide-react';

const SEOManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPage, setSelectedPage] = useState('');
  const { toast } = useToast();

  const seoPages = [
    {
      url: '/',
      title: 'Barcelona Cultural Tours - Authentic Local Experiences',
      metaDescription: 'Discover authentic Barcelona through our cultural tours. Local guides, small groups, and unique experiences that showcase the real Catalonia.',
      score: 85,
      issues: [
        { type: 'warning', category: 'title', message: 'Title could be more specific', impact: 'medium' },
        { type: 'suggestion', category: 'content', message: 'Add more internal links', impact: 'low' }
      ],
      keywords: ['barcelona tours', 'cultural experiences', 'local guides'],
      status: 'optimized'
    },
    {
      url: '/experiences/cooking-class',
      title: 'Traditional Catalan Cooking Class',
      metaDescription: 'Learn to cook authentic Catalan dishes in our hands-on cooking class. Perfect for food lovers visiting Barcelona.',
      score: 72,
      issues: [
        { type: 'error', category: 'meta', message: 'Meta description too short', impact: 'high' },
        { type: 'warning', category: 'images', message: '3 images missing alt text', impact: 'medium' }
      ],
      keywords: ['cooking class barcelona', 'catalan cuisine', 'food experience'],
      status: 'needs-work'
    },
    {
      url: '/experiences/art-workshop',
      title: 'Art Workshop',
      metaDescription: '',
      score: 45,
      issues: [
        { type: 'error', category: 'title', message: 'Title too generic', impact: 'high' },
        { type: 'error', category: 'meta', message: 'Missing meta description', impact: 'high' },
        { type: 'error', category: 'content', message: 'No H1 tag found', impact: 'high' }
      ],
      keywords: ['art workshop', 'barcelona art'],
      status: 'critical'
    }
  ];

  const keywords = [
    { keyword: 'barcelona tours', position: 3, searchVolume: 8900, difficulty: 65, trend: 'up', clicks: 234, impressions: 5670 },
    { keyword: 'cultural experiences barcelona', position: 7, searchVolume: 2400, difficulty: 45, trend: 'stable', clicks: 89, impressions: 1890 },
    { keyword: 'cooking class barcelona', position: 12, searchVolume: 1800, difficulty: 55, trend: 'up', clicks: 45, impressions: 890 },
    { keyword: 'barcelona food tour', position: 18, searchVolume: 3200, difficulty: 70, trend: 'down', clicks: 23, impressions: 567 },
    { keyword: 'art workshop barcelona', position: 25, searchVolume: 890, difficulty: 35, trend: 'stable', clicks: 12, impressions: 234 }
  ];

  const overallSEOScore = Math.round(seoPages.reduce((acc, page) => acc + page.score, 0) / seoPages.length);

  const handleOptimizePage = (pageUrl) => {
    toast({
      title: "SEO Optimization Started",
      description: `Analyzing and optimizing ${pageUrl}...`
    });
  };

  const handleRefreshData = () => {
    toast({
      title: "SEO Data Refreshed",
      description: "Your SEO metrics have been updated with the latest data."
    });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimized': return 'bg-green-100 text-green-800';
      case 'needs-work': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIssueIcon = (type) => {
    switch (type) {
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'suggestion': return <Lightbulb className="h-4 w-4 text-blue-500" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      case 'stable': return <div className="w-4 h-0.5 bg-gray-400"></div>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">SEO Manager</h2>
          <p className="text-gray-600">Optimize your website for search engines</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleRefreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="recommendations">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Overall SEO Score */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Performance Overview</CardTitle>
              <CardDescription>Your website's overall search engine optimization score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getScoreColor(overallSEOScore)}`}>
                    {overallSEOScore}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Overall SEO Score</p>
                  <Progress value={overallSEOScore} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {seoPages.filter(p => p.status === 'optimized').length}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Optimized Pages</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {seoPages.filter(p => p.status === 'needs-work').length}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Need Improvement</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {seoPages.filter(p => p.status === 'critical').length}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Critical Issues</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg. Position</p>
                    <p className="text-2xl font-bold">12.8</p>
                  </div>
                  <Search className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">↑ 2.3 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Clicks</p>
                    <p className="text-2xl font-bold">1,247</p>
                  </div>
                  <Eye className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">↑ 18% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Impressions</p>
                    <p className="text-2xl font-bold">23,456</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Top Issues */}
          <Card>
            <CardHeader>
              <CardTitle>Priority Issues</CardTitle>
              <CardDescription>Critical SEO issues that need immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {seoPages
                  .flatMap(page => page.issues.map(issue => ({ ...issue, page: page.url })))
                  .filter(issue => issue.type === 'error')
                  .slice(0, 5)
                  .map((issue, index) => (
                    <div key={index} className="flex items-center justify-between border rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        {getIssueIcon(issue.type)}
                        <div>
                          <p className="font-medium">{issue.message}</p>
                          <p className="text-sm text-gray-600">{issue.page}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{issue.impact} impact</Badge>
                        <Button size="sm" variant="outline">
                          Fix
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Keywords */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Keywords</CardTitle>
              <CardDescription>Keywords driving the most traffic to your site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {keywords.slice(0, 5).map((keyword, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">{keyword.position}</span>
                      </div>
                      <div>
                        <p className="font-medium">{keyword.keyword}</p>
                        <p className="text-sm text-gray-600">{keyword.searchVolume.toLocaleString()} searches/month</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(keyword.trend)}
                      <span className="text-sm text-gray-600">{keyword.clicks} clicks</span>
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
              <CardTitle>Page SEO Analysis</CardTitle>
              <CardDescription>Individual page optimization scores and issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {seoPages.map((page, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`text-2xl font-bold ${getScoreColor(page.score)}`}>
                          {page.score}
                        </div>
                        <div>
                          <h4 className="font-medium">{page.title}</h4>
                          <p className="text-sm text-gray-600">{page.url}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(page.status)}>
                          {page.status.replace('-', ' ')}
                        </Badge>
                        <Button size="sm" onClick={() => handleOptimizePage(page.url)}>
                          <Zap className="h-4 w-4 mr-1" />
                          Optimize
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-xs text-gray-500">Meta Description</p>
                      <p className="text-sm">{page.metaDescription || 'No meta description'}</p>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs text-gray-500">Target Keywords</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {page.keywords.map((keyword, kIndex) => (
                          <Badge key={kIndex} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {page.issues.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-500">Issues ({page.issues.length})</p>
                        <div className="space-y-2 mt-1">
                          {page.issues.slice(0, 3).map((issue, iIndex) => (
                            <div key={iIndex} className="flex items-center gap-2 text-sm">
                              {getIssueIcon(issue.type)}
                              <span>{issue.message}</span>
                              <Badge variant="outline" className="text-xs">
                                {issue.impact}
                              </Badge>
                            </div>
                          ))}
                          {page.issues.length > 3 && (
                            <p className="text-xs text-gray-500">
                              +{page.issues.length - 3} more issues
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Performance</CardTitle>
              <CardDescription>Track your keyword rankings and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {keywords.map((keyword, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <div className="text-lg font-bold">{keyword.position}</div>
                          <p className="text-xs text-gray-500">Position</p>
                        </div>
                        <div>
                          <h4 className="font-medium">{keyword.keyword}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>{keyword.searchVolume.toLocaleString()} searches/month</span>
                            <span>•</span>
                            <span>Difficulty: {keyword.difficulty}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(keyword.trend)}
                        <Badge variant="outline">
                          {keyword.difficulty < 30 ? 'Easy' : keyword.difficulty < 70 ? 'Medium' : 'Hard'}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Clicks</p>
                        <p className="font-medium">{keyword.clicks}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Impressions</p>
                        <p className="font-medium">{keyword.impressions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">CTR</p>
                        <p className="font-medium">{((keyword.clicks / keyword.impressions) * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Technical SEO Health</CardTitle>
              <CardDescription>Technical aspects affecting your search rankings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Page Speed</span>
                    <div className="flex items-center gap-2">
                      <Progress value={78} className="w-20" />
                      <span className="text-sm font-medium">78/100</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Mobile Friendliness</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Passed</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>HTTPS Security</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Secure</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>XML Sitemap</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Found</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Robots.txt</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Valid</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Structured Data</span>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">Partial</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Canonical Tags</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Correct</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Crawl Errors</span>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">3 errors</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Recommendations</CardTitle>
              <CardDescription>Personalized suggestions to improve your rankings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">High Priority</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Optimize your cooking class page - it has high search volume but low rankings. 
                        Focus on improving the title tag and adding more detailed content.
                      </p>
                      <Button size="sm" className="mt-2" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800">Content Opportunity</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Create a blog post about "Best Cultural Activities in Barcelona" - this keyword has 
                        high search volume and low competition.
                      </p>
                      <Button size="sm" className="mt-2" variant="outline">
                        Create Content
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Technical Improvement</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Your page load speed could be improved. Consider optimizing images and 
                        enabling browser caching to boost Core Web Vitals scores.
                      </p>
                      <Button size="sm" className="mt-2" variant="outline">
                        Optimize Speed
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SEOManager;

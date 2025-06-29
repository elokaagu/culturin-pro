'use client'

import React, { useState } from 'react';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';
import AnalyticsOverviewCards from '@/components/pro/analytics/AnalyticsOverviewCards';
import RevenueChart from '@/components/pro/analytics/RevenueChart';
import BookingSourcesChart from '@/components/pro/analytics/BookingSourcesChart';
import GuestDemographicsChart from '@/components/pro/analytics/GuestDemographicsChart';
import RatingsTrendsChart from '@/components/pro/analytics/RatingsTrendsChart';
import AnalyticsFilter from '@/components/pro/analytics/AnalyticsFilter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, ArrowUpRight, BellRing, Users, DollarSign, TrendingUp, Lightbulb } from 'lucide-react';

const ProAnalyticsPage: React.FC = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>("30days");
  const [activeTab, setActiveTab] = useState<string>("overview");
  
  return (
    <ProDashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Culturin Central</h1>
            <p className="mt-1 text-gray-600">
              Your command centre for business growth and intelligence
            </p>
          </div>
          <AnalyticsFilter 
            timeFrame={selectedTimeFrame} 
            onTimeFrameChange={setSelectedTimeFrame} 
          />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-3xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue & Margins</TabsTrigger>
            <TabsTrigger value="insights">Conversion Insights</TabsTrigger>
            <TabsTrigger value="vendor">Vendor Manager</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <AnalyticsOverviewCards />
            <RevenueChart />
            
            {/* Operator Pulse Dashboard */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-amber-500" /> 
                    Operator Pulse
                  </CardTitle>
                  <Badge variant="outline" className="bg-amber-50">6 New Insights</Badge>
                </div>
                <CardDescription>Actionable recommendations based on your data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      title: "Morning Tour Opportunity", 
                      description: "Your afternoon 'Cultural Heritage Walk' is popular. Try offering a morning version of this tour to increase bookings.",
                      type: "opportunity", 
                      action: "Experiment" 
                    },
                    { 
                      title: "Price Point Optimization", 
                      description: "You could increase the price point of your 'Local Cuisine Experience' by 15% based on competitive analysis and high demand.",
                      type: "revenue", 
                      action: "Adjust Pricing" 
                    },
                    { 
                      title: "Booking Abandonment Alert", 
                      description: "23% of customers abandon booking at the payment page - consider offering more payment options.",
                      type: "alert", 
                      action: "Check Settings" 
                    },
                  ].map((insight, index) => (
                    <div key={index} className="bg-white border rounded-lg p-4 relative">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          {insight.type === "opportunity" && (
                            <div className="bg-green-100 p-2 rounded-full mr-3">
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            </div>
                          )}
                          {insight.type === "revenue" && (
                            <div className="bg-blue-100 p-2 rounded-full mr-3">
                              <DollarSign className="h-4 w-4 text-blue-600" />
                            </div>
                          )}
                          {insight.type === "alert" && (
                            <div className="bg-amber-100 p-2 rounded-full mr-3">
                              <AlertCircle className="h-4 w-4 text-amber-600" />
                            </div>
                          )}
                          <div>
                            <h4 className="font-medium text-sm">{insight.title}</h4>
                            <p className="text-gray-500 text-xs mt-1">{insight.description}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="whitespace-nowrap text-xs h-8">
                          {insight.action}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Two-column charts layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BookingSourcesChart />
              <GuestDemographicsChart />
            </div>
            
            {/* Ratings and Reviews */}
            <RatingsTrendsChart />
          </TabsContent>
          
          {/* Revenue & Margins Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average Margin</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">58.3%</div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" /> +2.5% from previous period
                  </p>
                  <Progress value={58.3} className="h-2 mt-3" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Revenue Per Guest</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$76.40</div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" /> +$4.20 from previous period
                  </p>
                  <Progress value={76.4} max={100} className="h-2 mt-3" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$12,750</div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" /> +8.3% from previous month
                  </p>
                  <Progress value={83} className="h-2 mt-3" />
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Pricing Strategy Assistant</CardTitle>
                <CardDescription>Optimize your pricing for maximum profitability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { 
                        experience: "Cultural Heritage Walk", 
                        currentPrice: "$45", 
                        recommendedPrice: "$55",
                        status: "Underpriced" 
                      },
                      { 
                        experience: "Local Cuisine Tour", 
                        currentPrice: "$75", 
                        recommendedPrice: "$85",
                        status: "Underpriced" 
                      },
                      { 
                        experience: "Historical City Tour", 
                        currentPrice: "$65", 
                        recommendedPrice: "$60",
                        status: "Optimal" 
                      }
                    ].map((pricing, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h4 className="font-medium text-sm">{pricing.experience}</h4>
                        <div className="mt-2 flex justify-between items-center">
                          <div>
                            <div className="text-xs text-gray-500">Current</div>
                            <div className="font-medium">{pricing.currentPrice}</div>
                          </div>
                          <ArrowUpRight className="h-4 w-4 text-gray-400" />
                          <div>
                            <div className="text-xs text-gray-500">Recommended</div>
                            <div className="font-medium">{pricing.recommendedPrice}</div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <Badge 
                            variant={pricing.status === "Underpriced" ? "destructive" : "default"}
                            className={pricing.status === "Optimal" ? "bg-green-500" : ""}
                          >
                            {pricing.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full sm:w-auto">Run Pricing Analysis</Button>
                </div>
              </CardContent>
            </Card>
            
            <RevenueChart />
          </TabsContent>
          
          {/* Conversion Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
                <CardDescription>Track how visitors convert through each stage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { stage: "Page View", count: 2580, percentage: 100, color: "bg-gray-400" },
                    { stage: "Experience Details", count: 1240, percentage: 48, color: "bg-blue-400" },
                    { stage: "Date Selection", count: 890, percentage: 34.5, color: "bg-blue-500" },
                    { stage: "Checkout Started", count: 520, percentage: 20.2, color: "bg-blue-600" },
                    { stage: "Purchase Complete", count: 320, percentage: 12.4, color: "bg-blue-700" }
                  ].map((stage, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{stage.stage}</span>
                        <div>
                          <span className="font-medium">{stage.count}</span>
                          <span className="text-gray-500 ml-2">({stage.percentage}%)</span>
                        </div>
                      </div>
                      <Progress value={stage.percentage} className={`h-2 ${stage.color}`} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Best-Selling Experiences</CardTitle>
                <CardDescription>Your top-performing cultural experiences</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Experience</TableHead>
                      <TableHead>Conversion Rate</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Avg. Rating</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "Local Cuisine Tour", conversionRate: "24.5%", revenue: "$3,850", rating: "4.9" },
                      { name: "Cultural Heritage Walk", conversionRate: "18.3%", revenue: "$2,730", rating: "4.8" },
                      { name: "Historical City Tour", conversionRate: "15.7%", revenue: "$2,150", rating: "4.7" },
                    ].map((exp, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{exp.name}</TableCell>
                        <TableCell>{exp.conversionRate}</TableCell>
                        <TableCell>{exp.revenue}</TableCell>
                        <TableCell>{exp.rating}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Drop-off Points Analysis</CardTitle>
                <CardDescription>Identify where customers abandon the booking process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { stage: "Date Selection", percentage: 28, reason: "Limited availability on popular dates" },
                    { stage: "Payment Page", percentage: 23, reason: "Limited payment methods" },
                    { stage: "Guest Info Form", percentage: 15, reason: "Too many required fields" }
                  ].map((point, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-3">
                      <div>
                        <h4 className="font-medium">{point.stage}</h4>
                        <p className="text-sm text-gray-500 mt-1">{point.reason}</p>
                      </div>
                      <Badge variant="outline" className="bg-red-50 text-red-700">{point.percentage}% Drop-off</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Vendor Manager Tab */}
          <TabsContent value="vendor" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Vendor Management</CardTitle>
                  <CardDescription>Manage your guides, storytellers, drivers and partners</CardDescription>
                </div>
                <Button>+ Add Vendor</Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Availability</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { 
                        name: "Maria Rodriguez", 
                        role: "Cultural Guide", 
                        performance: "4.9/5",
                        availability: "Mon-Thu",
                        status: "Active" 
                      },
                      { 
                        name: "Ahmed Hassan", 
                        role: "Local Storyteller", 
                        performance: "4.8/5",
                        availability: "Weekends",
                        status: "Active" 
                      },
                      { 
                        name: "Sophie Chen", 
                        role: "Culinary Expert", 
                        performance: "4.7/5",
                        availability: "Tue-Sat",
                        status: "On Leave" 
                      },
                      { 
                        name: "Carlos Silva", 
                        role: "Transport Partner", 
                        performance: "4.6/5",
                        availability: "Full Week",
                        status: "Active" 
                      },
                    ].map((vendor, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{vendor.name}</TableCell>
                        <TableCell>{vendor.role}</TableCell>
                        <TableCell>{vendor.performance}</TableCell>
                        <TableCell>{vendor.availability}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`${vendor.status === "Active" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}
                          >
                            {vendor.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BellRing className="h-5 w-5 mr-2 text-amber-500" />
                    Vendor Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { message: "Carlos Silva (Transport) requested schedule change for Aug 15", time: "2 hours ago" },
                      { message: "Sophie Chen (Culinary) returning from leave on Aug 20", time: "Yesterday" },
                      { message: "Performance review due for Maria Rodriguez", time: "3 days ago" }
                    ].map((notification, index) => (
                      <div key={index} className="flex items-start space-x-3 border-b pb-3 last:border-0">
                        <div className="bg-amber-100 p-2 rounded-full">
                          <BellRing className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-500" />
                    Vendor Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Maria Rodriguez", rating: 98 },
                      { name: "Ahmed Hassan", rating: 96 },
                      { name: "Sophie Chen", rating: 94 },
                      { name: "Carlos Silva", rating: 92 }
                    ].map((vendor, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{vendor.name}</span>
                          <span className="font-medium">{vendor.rating}%</span>
                        </div>
                        <Progress value={vendor.rating} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProDashboardLayout>
  );
};

export default ProAnalyticsPage;

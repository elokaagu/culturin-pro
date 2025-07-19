"use client";

import React, { useState } from "react";
import ProDashboardLayout from "@/components/pro/ProDashboardLayout";
import AnalyticsOverviewCards from "@/components/pro/analytics/AnalyticsOverviewCards";
import RevenueChart from "@/components/pro/analytics/RevenueChart";
import BookingSourcesChart from "@/components/pro/analytics/BookingSourcesChart";
import GuestDemographicsChart from "@/components/pro/analytics/GuestDemographicsChart";
import RatingsTrendsChart from "@/components/pro/analytics/RatingsTrendsChart";
import AnalyticsFilter from "@/components/pro/analytics/AnalyticsFilter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  ArrowUpRight,
  BellRing,
  Users,
  DollarSign,
  TrendingUp,
  Lightbulb,
} from "lucide-react";

const ProAnalyticsPage: React.FC = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>("30days");
  const [activeTab, setActiveTab] = useState<string>("overview");

  return (
    <ProDashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="mt-1 text-gray-600">
              Track performance, analyze guest behavior, and optimize your
              cultural experiences
            </p>
          </div>
          <AnalyticsFilter
            timeFrame={selectedTimeFrame}
            onTimeFrameChange={setSelectedTimeFrame}
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-1 w-full max-w-3xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
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
                    <Lightbulb className="h-5 w-5 mr-2 text-blue-500" />
                    Operator Pulse
                  </CardTitle>
                  <Badge variant="outline" className="bg-amber-50">
                    6 New Insights
                  </Badge>
                </div>
                <CardDescription>
                  Actionable recommendations based on your data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Morning Tour Opportunity",
                      description:
                        "Your afternoon 'Cultural Heritage Walk' is popular. Try offering a morning version of this tour to increase bookings.",
                      type: "opportunity",
                      action: "Experiment",
                    },
                    {
                      title: "Price Point Optimization",
                      description:
                        "You could increase the price point of your 'Local Cuisine Experience' by 15% based on competitive analysis and high demand.",
                      type: "revenue",
                      action: "Adjust Pricing",
                    },
                    {
                      title: "Booking Abandonment Alert",
                      description:
                        "23% of customers abandon booking at the payment page - consider offering more payment options.",
                      type: "alert",
                      action: "Check Settings",
                    },
                  ].map((insight, index) => (
                    <div
                      key={index}
                      className="bg-white border rounded-lg p-4 relative"
                    >
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          {insight.type === "opportunity" && (
                            <div className="bg-blue-100 p-2 rounded-full mr-3">
                              <TrendingUp className="h-4 w-4 text-blue-600" />
                            </div>
                          )}
                          {insight.type === "revenue" && (
                            <div className="bg-blue-100 p-2 rounded-full mr-3">
                              <DollarSign className="h-4 w-4 text-blue-600" />
                            </div>
                          )}
                          {insight.type === "alert" && (
                            <div className="bg-blue-100 p-2 rounded-full mr-3">
                              <AlertCircle className="h-4 w-4 text-blue-600" />
                            </div>
                          )}
                          <div>
                            <h4 className="font-medium text-sm">
                              {insight.title}
                            </h4>
                            <p className="text-gray-500 text-xs mt-1">
                              {insight.description}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="whitespace-nowrap text-xs h-8"
                        >
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
        </Tabs>
      </div>
    </ProDashboardLayout>
  );
};

export default ProAnalyticsPage;

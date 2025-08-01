'use client'

import { useState } from "react";
import ProDashboardLayout from "@/components/pro/ProDashboardLayout";
import AnalyticsFilter from "@/components/pro/analytics/AnalyticsFilter";
import AnalyticsOverviewCards from "@/components/pro/analytics/AnalyticsOverviewCards";
import RevenueChart from "@/components/pro/analytics/RevenueChart";
import BookingSourcesChart from "@/components/pro/analytics/BookingSourcesChart";
import GuestDemographicsChart from "@/components/pro/analytics/GuestDemographicsChart";
import RatingsTrendsChart from "@/components/pro/analytics/RatingsTrendsChart";
import { useToast } from "@/components/ui/use-toast";

const ProAnalytics = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>("90days");
  const { toast } = useToast();
  
  const handleExport = () => {
    // Generate comprehensive analytics report
    const reportData = {
      exportDate: new Date().toISOString(),
      timeFrame: selectedTimeFrame,
      reportType: "Analytics Dashboard Report",
      data: {
        revenue: {
          total: 45600,
          average: 3800,
          trend: "+12%",
          peak: "March - $9,800"
        },
        bookings: {
          total: 456,
          average: 38,
          trend: "+8%",
          conversion: "3.2%"
        },
        insights: [
          "Spring Wellness Retreat success drove March peak",
          "Upselling strategy increased average order value by 12%",
          "Consider A/B testing landing page for better conversion"
        ]
      }
    };
    
    // Create and download the report
    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-report-${selectedTimeFrame}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Successful",
      description: `Analytics report for ${selectedTimeFrame} has been downloaded.`,
    });
  };
  
  return (
    <ProDashboardLayout
      title="Analytics Dashboard"
      subtitle="Track your performance and understand your guests"
    >
      <div className="space-y-8 w-full">
        {/* Filters */}
        <AnalyticsFilter 
          timeFrame={selectedTimeFrame} 
          onTimeFrameChange={setSelectedTimeFrame}
          onExport={handleExport}
        />
        
        {/* Analytics Overview Cards */}
        <div className="w-full">
          <h2 className="text-lg font-medium mb-4">Overview</h2>
          <AnalyticsOverviewCards />
        </div>
        
        {/* Revenue & Bookings Chart - Full Width */}
        <div className="w-full">
          <div className="w-full bg-white rounded-lg shadow-soft p-6">
            <RevenueChart timeFrame={selectedTimeFrame} />
          </div>
        </div>
        
        {/* Booking Sources & Demographics Charts */}
        <div className="w-full">
          <h2 className="text-lg font-medium mb-4">Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-soft p-6">
              <BookingSourcesChart />
            </div>
            <div className="bg-white rounded-lg shadow-soft p-6">
              <GuestDemographicsChart />
            </div>
          </div>
        </div>
        
        {/* Guest Ratings and Reviews - Full Width */}
        <div className="w-full bg-white rounded-lg shadow-soft p-6">
          <RatingsTrendsChart />
        </div>
      </div>
    </ProDashboardLayout>
  );
};

export default ProAnalytics;

'use client'

import { useState } from "react";
import ProDashboardLayout from "@/components/pro/ProDashboardLayout";
import AnalyticsFilter from "@/components/pro/analytics/AnalyticsFilter";
import AnalyticsOverviewCards from "@/components/pro/analytics/AnalyticsOverviewCards";
import RevenueChart from "@/components/pro/analytics/RevenueChart";
import BookingSourcesChart from "@/components/pro/analytics/BookingSourcesChart";
import GuestDemographicsChart from "@/components/pro/analytics/GuestDemographicsChart";
import RatingsTrendsChart from "@/components/pro/analytics/RatingsTrendsChart";

const ProAnalytics = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>("month");
  
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
        />
        
        {/* Analytics Overview Cards */}
        <div className="w-full">
          <h2 className="text-lg font-medium mb-4">Overview</h2>
          <AnalyticsOverviewCards />
        </div>
        
        {/* Revenue & Bookings Chart - Full Width */}
        <div className="w-full">
          <h2 className="text-lg font-medium mb-4">Revenue & Bookings</h2>
          <div className="w-full bg-white rounded-lg shadow-soft p-6">
            <RevenueChart />
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
        
        {/* Export Section */}
        <div className="flex justify-end pt-4">
          <button className="px-4 py-2 text-sm bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white rounded-md transition-colors">
            Export Analytics Report
          </button>
        </div>
      </div>
    </ProDashboardLayout>
  );
};

export default ProAnalytics;

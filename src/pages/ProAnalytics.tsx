
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
      <div className="space-y-8">
        {/* Filters */}
        <AnalyticsFilter 
          timeFrame={selectedTimeFrame} 
          onTimeFrameChange={setSelectedTimeFrame} 
        />
        
        {/* Analytics Overview Cards */}
        <div>
          <h2 className="text-lg font-medium mb-4">Overview</h2>
          <AnalyticsOverviewCards />
        </div>
        
        {/* Revenue & Bookings Chart - Full Width */}
        <div className="w-full">
          <h2 className="text-lg font-medium mb-4">Revenue & Bookings</h2>
          <div className="w-full">
            <RevenueChart />
          </div>
        </div>
        
        {/* Booking Sources & Demographics Charts */}
        <div>
          <h2 className="text-lg font-medium mb-4">Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BookingSourcesChart />
            <GuestDemographicsChart />
          </div>
        </div>
        
        {/* Guest Ratings and Reviews - Full Width */}
        <div className="w-full">
          <RatingsTrendsChart />
        </div>
        
        {/* Export Section */}
        <div className="flex justify-end pt-4">
          <button className="px-4 py-2 text-sm bg-black text-white rounded-md">
            Export Analytics Report
          </button>
        </div>
      </div>
    </ProDashboardLayout>
  );
};

export default ProAnalytics;

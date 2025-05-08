
import React from 'react';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';
import AnalyticsOverviewCards from '@/components/pro/analytics/AnalyticsOverviewCards';
import RevenueChart from '@/components/pro/analytics/RevenueChart';
import BookingSourcesChart from '@/components/pro/analytics/BookingSourcesChart';
import GuestDemographicsChart from '@/components/pro/analytics/GuestDemographicsChart';
import RatingsTrendsChart from '@/components/pro/analytics/RatingsTrendsChart';
import AnalyticsFilter from '@/components/pro/analytics/AnalyticsFilter';

const ProAnalyticsPage: React.FC = () => {
  return (
    <ProDashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Business Analytics</h1>
            <p className="mt-1 text-gray-600">
              Track performance metrics and make data-driven decisions for your experiences
            </p>
          </div>
          <AnalyticsFilter />
        </div>
        
        {/* Overview Cards */}
        <AnalyticsOverviewCards />
        
        {/* Revenue Chart */}
        <RevenueChart />
        
        {/* Two-column charts layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BookingSourcesChart />
          <GuestDemographicsChart />
        </div>
        
        {/* Ratings and Reviews */}
        <RatingsTrendsChart />
      </div>
    </ProDashboardLayout>
  );
};

export default ProAnalyticsPage;

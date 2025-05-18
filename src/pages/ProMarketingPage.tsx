
import React from 'react';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';

const ProMarketingPage = () => {
  return (
    <ProDashboardLayout
      title="Marketing"
      subtitle="Grow your audience and increase bookings"
    >
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Marketing Tools</h2>
        <p className="text-gray-600">This feature will be available soon. Stay tuned!</p>
      </div>
    </ProDashboardLayout>
  );
};

export default ProMarketingPage;

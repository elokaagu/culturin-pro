
import React from 'react';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';

const ProWebsitePage = () => {
  return (
    <ProDashboardLayout
      title="Website"
      subtitle="Manage your online presence"
    >
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Website Builder</h2>
        <p className="text-gray-600">This feature will be available soon. Stay tuned!</p>
      </div>
    </ProDashboardLayout>
  );
};

export default ProWebsitePage;

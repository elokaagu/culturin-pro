
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
        <p className="text-gray-600">Create and customize your experience website with our easy-to-use builder.</p>
        <div className="mt-4 p-4 border border-gray-200 rounded bg-gray-50">
          <p className="text-sm text-gray-500">Coming soon: Advanced website templates for cultural experience providers.</p>
        </div>
      </div>
    </ProDashboardLayout>
  );
};

export default ProWebsitePage;

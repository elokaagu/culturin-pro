
import React from 'react';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';

const ProCRMPage = () => {
  return (
    <ProDashboardLayout
      title="Client CRM"
      subtitle="Manage your customer relationships"
    >
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Customer Relationship Management</h2>
        <p className="text-gray-600">This feature will be available soon. Stay tuned!</p>
      </div>
    </ProDashboardLayout>
  );
};

export default ProCRMPage;

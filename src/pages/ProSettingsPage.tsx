
import React from 'react';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';

const ProSettingsPage = () => {
  return (
    <ProDashboardLayout
      title="Settings"
      subtitle="Configure your account preferences"
    >
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Account Settings</h2>
        <p className="text-gray-600">Manage your account settings and preferences.</p>
      </div>
    </ProDashboardLayout>
  );
};

export default ProSettingsPage;

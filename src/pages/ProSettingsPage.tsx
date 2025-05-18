
import React from 'react';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';
import SettingsManager from '@/components/pro/settings/SettingsManager';

const ProSettingsPage = () => {
  return (
    <ProDashboardLayout
      title="Settings"
      subtitle="Configure your account preferences"
    >
      <SettingsManager />
    </ProDashboardLayout>
  );
};

export default ProSettingsPage;


import React from 'react';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';
import WebsiteBuilder from '@/components/pro/website/WebsiteBuilder';

const ProWebsitePage: React.FC = () => {
  return (
    <ProDashboardLayout 
      title="Website Builder" 
      subtitle="Build and manage your tour operator website"
    >
      <WebsiteBuilder />
    </ProDashboardLayout>
  );
};

export default ProWebsitePage;

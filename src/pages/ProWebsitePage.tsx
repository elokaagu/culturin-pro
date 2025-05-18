
import React from 'react';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';
import WebsiteBuilder from '@/components/pro/website/WebsiteBuilder';

const ProWebsitePage = () => {
  return (
    <ProDashboardLayout
      title="Website"
      subtitle="Manage your online presence"
    >
      <WebsiteBuilder />
    </ProDashboardLayout>
  );
};

export default ProWebsitePage;


import React from 'react';
import ProSidebar from './ProSidebar';

interface ProDashboardLayoutProps {
  children: React.ReactNode;
}

const ProDashboardLayout: React.FC<ProDashboardLayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <ProSidebar />
      <div className="ml-64 p-6 lg:p-8">
        {children}
      </div>
    </div>
  );
};

export default ProDashboardLayout;

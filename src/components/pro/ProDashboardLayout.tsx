import React from "react";
import ProSidebar from "./ProSidebar";

interface ProDashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const ProDashboardLayout: React.FC<ProDashboardLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <ProSidebar />
      <div className="ml-64 p-6 lg:p-8 min-h-screen">
        {(title || subtitle) && (
          <div className="mb-6">
            {title && <h1 className="text-2xl font-bold">{title}</h1>}
            {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default ProDashboardLayout;

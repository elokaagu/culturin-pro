
import React from 'react';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';
import WebsiteBuilder from '@/components/pro/website/WebsiteBuilder';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InfoIcon } from 'lucide-react';

const ProWebsitePage: React.FC = () => {
  return (
    <ProDashboardLayout 
      title="Website Builder" 
      subtitle="Build and manage your tour operator website"
    >
      <Card className="mb-6 border-blue-100 bg-blue-50">
        <CardContent className="p-4 flex items-start gap-3">
          <div className="mt-0.5">
            <InfoIcon className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h3 className="font-medium text-blue-800">Getting Started with Your Website</h3>
            <p className="text-sm text-blue-700 mt-1">
              Customize your website appearance in the Themes tab, edit your content in the Content tab, 
              and use the Preview tab to see how your website looks. When you're ready, click "Publish Changes" 
              to make your website live.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <WebsiteBuilder />
    </ProDashboardLayout>
  );
};

export default ProWebsitePage;

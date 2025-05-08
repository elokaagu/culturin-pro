
import React from 'react';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';
import WebsiteBuilder from '@/components/pro/website/WebsiteBuilder';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const ProWebsitePage: React.FC = () => {
  return (
    <ProDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">Website Builder</h1>
              <Badge variant="secondary" className="bg-[#FFEDD1] text-[#996B00]">
                Add-on
              </Badge>
            </div>
            <p className="mt-1 text-gray-600">
              Create and manage your professional website to showcase your experiences
            </p>
          </div>
        </div>

        <Alert className="bg-blue-50 border-blue-100">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            The Website Builder is an add-on feature. Contact our sales team to unlock its full potential.
          </AlertDescription>
        </Alert>

        <WebsiteBuilder />
      </div>
    </ProDashboardLayout>
  );
};

export default ProWebsitePage;

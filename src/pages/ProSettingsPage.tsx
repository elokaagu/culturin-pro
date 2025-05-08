
import React from 'react';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';
import SettingsManager from '@/components/pro/settings/SettingsManager';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const ProSettingsPage: React.FC = () => {
  return (
    <ProDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="mt-1 text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        <Alert className="bg-blue-50 border-blue-100">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            Changes to your account settings will be applied across all Culturin Pro services.
          </AlertDescription>
        </Alert>

        <SettingsManager />
      </div>
    </ProDashboardLayout>
  );
};

export default ProSettingsPage;

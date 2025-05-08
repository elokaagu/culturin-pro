
import React from 'react';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';
import TeamManagement from '@/components/pro/team/TeamManagement';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const ProTeamPage: React.FC = () => {
  return (
    <ProDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Team & Staff</h1>
          <p className="mt-1 text-gray-600">
            Manage your team members and staff permissions
          </p>
        </div>

        <Alert className="bg-blue-50 border-blue-100">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            Team management allows you to add team members, assign roles, and control what each person can access.
          </AlertDescription>
        </Alert>

        <TeamManagement />
      </div>
    </ProDashboardLayout>
  );
};

export default ProTeamPage;

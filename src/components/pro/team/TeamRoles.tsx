
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

interface Permission {
  name: string;
  description: string;
  roles: {
    owner: boolean;
    admin: boolean;
    contentManager: boolean;
    guide: boolean;
  };
}

const permissions: Permission[] = [
  {
    name: 'Dashboard Access',
    description: 'View main dashboard and analytics',
    roles: {
      owner: true,
      admin: true,
      contentManager: true,
      guide: true,
    }
  },
  {
    name: 'Booking Management',
    description: 'Create, edit, and delete bookings',
    roles: {
      owner: true,
      admin: true,
      contentManager: false,
      guide: true,
    }
  },
  {
    name: 'Team Management',
    description: 'Add, remove, and edit team members',
    roles: {
      owner: true,
      admin: true,
      contentManager: false,
      guide: false,
    }
  },
  {
    name: 'Financial Data',
    description: 'View revenue and financial reports',
    roles: {
      owner: true,
      admin: true,
      contentManager: false,
      guide: false,
    }
  },
  {
    name: 'Content Editing',
    description: 'Edit website and marketing content',
    roles: {
      owner: true,
      admin: true,
      contentManager: true,
      guide: false,
    }
  },
  {
    name: 'Experience Management',
    description: 'Create and edit experiences',
    roles: {
      owner: true,
      admin: true,
      contentManager: true,
      guide: true,
    }
  },
];

const TeamRoles: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RoleCard 
          title="Owner" 
          description="Full access to all features and settings"
          isPrimary={true}
          canEdit={false}
        />
        <RoleCard 
          title="Admin" 
          description="Manage all aspects except billing and plan changes"
          isPrimary={false}
          canEdit={true}
        />
        <RoleCard 
          title="Content Manager" 
          description="Create and edit content and marketing materials"
          isPrimary={false}
          canEdit={true}
        />
        <RoleCard 
          title="Guide" 
          description="Manage bookings and experiences"
          isPrimary={false}
          canEdit={true}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Permission Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-medium">Permission</th>
                  <th className="text-center p-3 font-medium">Owner</th>
                  <th className="text-center p-3 font-medium">Admin</th>
                  <th className="text-center p-3 font-medium">Content Manager</th>
                  <th className="text-center p-3 font-medium">Guide</th>
                </tr>
              </thead>
              <tbody>
                {permissions.map((permission, index) => (
                  <tr key={permission.name} className={index % 2 === 0 ? 'bg-white' : 'bg-muted/20'}>
                    <td className="p-3">
                      <div className="font-medium">{permission.name}</div>
                      <div className="text-sm text-muted-foreground">{permission.description}</div>
                    </td>
                    <td className="text-center p-3">
                      <Switch checked={permission.roles.owner} disabled />
                    </td>
                    <td className="text-center p-3">
                      <Switch checked={permission.roles.admin} />
                    </td>
                    <td className="text-center p-3">
                      <Switch checked={permission.roles.contentManager} />
                    </td>
                    <td className="text-center p-3">
                      <Switch checked={permission.roles.guide} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const RoleCard: React.FC<{
  title: string;
  description: string;
  isPrimary: boolean;
  canEdit: boolean;
}> = ({ title, description, isPrimary, canEdit }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{title}</CardTitle>
          {isPrimary && (
            <Badge className="bg-primary">Primary</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        {canEdit && (
          <div className="text-sm text-blue-600 cursor-pointer hover:underline">
            Edit role permissions
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamRoles;

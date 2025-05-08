
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralSettings from './GeneralSettings';
import NotificationSettings from './NotificationSettings';
import BillingSettings from './BillingSettings';
import SecuritySettings from './SecuritySettings';
import IntegrationsSettings from './IntegrationsSettings';

const SettingsManager: React.FC = () => {
  return (
    <div>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6 grid grid-cols-5 gap-4 bg-transparent">
          <TabsTrigger 
            value="general" 
            className="data-[state=active]:bg-gray-100 data-[state=active]:shadow-sm"
          >
            General
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="data-[state=active]:bg-gray-100 data-[state=active]:shadow-sm"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger 
            value="billing" 
            className="data-[state=active]:bg-gray-100 data-[state=active]:shadow-sm"
          >
            Billing
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className="data-[state=active]:bg-gray-100 data-[state=active]:shadow-sm"
          >
            Security
          </TabsTrigger>
          <TabsTrigger 
            value="integrations" 
            className="data-[state=active]:bg-gray-100 data-[state=active]:shadow-sm"
          >
            Integrations
          </TabsTrigger>
        </TabsList>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <TabsContent value="general">
            <GeneralSettings />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>
          
          <TabsContent value="billing">
            <BillingSettings />
          </TabsContent>
          
          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>
          
          <TabsContent value="integrations">
            <IntegrationsSettings />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default SettingsManager;

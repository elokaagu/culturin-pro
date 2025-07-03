"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralSettings from "./GeneralSettings";
import NotificationSettings from "./NotificationSettings";
import BillingSettings from "./BillingSettings";
import SecuritySettings from "./SecuritySettings";
import IntegrationsSettings from "./IntegrationsSettings";

const SettingsManager: React.FC = () => {
  return (
    <div>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6 flex space-x-8 border-b border-gray-200 w-full">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <div className="bg-white p-6 rounded-lg border border-gray-100">
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

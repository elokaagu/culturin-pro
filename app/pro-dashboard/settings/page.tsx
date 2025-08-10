"use client";

import ProDashboardLayout from "../../../components/pro/ProDashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralSettings from "../../../components/pro/settings/GeneralSettings";
import NotificationSettings from "../../../components/pro/settings/NotificationSettings";
import BillingSettings from "../../../components/pro/settings/BillingSettings";
import SecuritySettings from "../../../components/pro/settings/SecuritySettings";
import IntegrationsSettings from "../../../components/pro/settings/IntegrationsSettings";

export default function Settings() {
  return (
    <ProDashboardLayout>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">
              Configure your account preferences
            </p>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>

            <div className="bg-white rounded-lg border">
              <TabsContent value="general" className="p-6">
                <GeneralSettings />
              </TabsContent>

              <TabsContent value="notifications" className="p-6">
                <NotificationSettings />
              </TabsContent>

              <TabsContent value="billing" className="p-6">
                <BillingSettings />
              </TabsContent>

              <TabsContent value="security" className="p-6">
                <SecuritySettings />
              </TabsContent>

              <TabsContent value="integrations" className="p-6">
                <IntegrationsSettings />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </ProDashboardLayout>
  );
}

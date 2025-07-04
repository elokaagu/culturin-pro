"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Link2, Calendar, MessageSquare, Share2, FileText } from "lucide-react";
import { toast } from "sonner";

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  connected: boolean;
  connectAction: () => void;
  disconnectAction: () => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  title,
  description,
  icon,
  connected,
  connectAction,
  disconnectAction,
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-2 rounded-md">{icon}</div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                connected ? "bg-green-500" : "bg-gray-300"
              }`}
            ></div>
            <span className="text-sm text-gray-500">
              {connected ? "Connected" : "Disconnected"}
            </span>
          </div>
          <Switch
            checked={connected}
            onCheckedChange={(checked) => {
              if (checked) {
                connectAction();
              } else {
                disconnectAction();
              }
            }}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          {connected ? "Configure Settings" : "Connect"}
        </Button>
      </CardFooter>
    </Card>
  );
};

const IntegrationsSettings: React.FC = () => {
  const handleConnect = (service: string) => {
    toast.success(`Connected to ${service}`);
  };

  const handleDisconnect = (service: string) => {
    toast.info(`Disconnected from ${service}`);
  };

  const availableIntegrations = [
    {
      id: "calendar",
      title: "Google Calendar",
      description: "Sync your bookings with Google Calendar",
      icon: <Calendar className="h-5 w-5 text-blue-600" />,
      connected: true,
    },
    {
      id: "mailchimp",
      title: "Mailchimp",
      description: "Email marketing automation",
      icon: <MessageSquare className="h-5 w-5 text-yellow-600" />,
      connected: false,
    },
    {
      id: "docs",
      title: "Google Docs",
      description: "Create and manage documents",
      icon: <FileText className="h-5 w-5 text-green-600" />,
      connected: false,
    },
    {
      id: "facebook",
      title: "Facebook",
      description: "Social media integration",
      icon: <Share2 className="h-5 w-5 text-blue-700" />,
      connected: true,
    },
    {
      id: "zapier",
      title: "Zapier",
      description: "Connect with thousands of apps",
      icon: <Link2 className="h-5 w-5 text-orange-600" />,
      connected: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Integrations</h2>
        <p className="text-gray-500">
          Connect your account with other services.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {availableIntegrations.map((integration) => (
          <IntegrationCard
            key={integration.id}
            title={integration.title}
            description={integration.description}
            icon={integration.icon}
            connected={integration.connected}
            connectAction={() => handleConnect(integration.title)}
            disconnectAction={() => handleDisconnect(integration.title)}
          />
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <Button variant="outline">
          <Link2 className="mr-2 h-4 w-4" />
          Browse More Integrations
        </Button>
      </div>
    </div>
  );
};

export default IntegrationsSettings;

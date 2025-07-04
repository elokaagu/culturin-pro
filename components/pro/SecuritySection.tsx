
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, CreditCard, Shield } from "lucide-react";

const SecuritySection: React.FC = () => {
  return (
    <Card className="bg-gray-50 border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-culturin-indigo" />
          Security & Trust
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-4">
            <Shield className="h-10 w-10 text-culturin-indigo mb-3" />
            <h4 className="font-medium">Identity-Verified Hosts</h4>
            <p className="text-sm text-gray-600 mt-1">All hosts are thoroughly verified for authenticity and safety</p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <CreditCard className="h-10 w-10 text-culturin-indigo mb-3" />
            <h4 className="font-medium">Secure Payments</h4>
            <p className="text-sm text-gray-600 mt-1">Protected transactions via secure payment with fraud prevention</p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <Lock className="h-10 w-10 text-culturin-indigo mb-3" />
            <h4 className="font-medium">Privacy-Focused</h4>
            <p className="text-sm text-gray-600 mt-1">Guest data handling with strict privacy controls</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySection;

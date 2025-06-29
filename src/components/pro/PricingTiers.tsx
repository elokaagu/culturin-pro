'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface PricingProps {
  onTierSelect: (tier: string) => void;
  selectedTier: string;
}

const PricingTiers: React.FC<PricingProps> = ({ onTierSelect, selectedTier }) => {
  const handleUpgrade = () => {
    toast({
      title: "Upgrade initiated",
      description: "You'll be redirected to complete your subscription.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold">Choose Your Plan</h3>
          <p className="text-gray-500 mt-1">Select the right tier for your business needs</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Monthly</span>
          <Button variant="outline" className="text-xs px-3 py-1 h-auto">Coming Soon: Annual (Save 20%)</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Starter Tier */}
        <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-md ${selectedTier === 'starter' ? 'border-culturin-indigo ring-2 ring-culturin-indigo/20' : 'border-gray-200'}`}>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-400"></div>
          <CardHeader>
            <CardTitle>Starter</CardTitle>
            <CardDescription>For new or part-time operators</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">£49</span>
              <span className="text-gray-500 ml-1">/month</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <PricingFeature included>Basic booking management</PricingFeature>
              <PricingFeature included>Guest profiles</PricingFeature>
              <PricingFeature included>Simple analytics</PricingFeature>
              <PricingFeature included>Onboarding concierge</PricingFeature>
              <PricingFeature>Website builder</PricingFeature>
              <PricingFeature>Team management</PricingFeature>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              variant={selectedTier === 'starter' ? 'default' : 'outline'}
              className="w-full"
              onClick={() => onTierSelect('starter')}
            >
              {selectedTier === 'starter' ? 'Selected' : 'Select Plan'}
            </Button>
          </CardFooter>
        </Card>

        {/* Growth Tier - Most Popular */}
        <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-md ${selectedTier === 'growth' ? 'border-culturin-indigo ring-2 ring-culturin-indigo/20' : 'border-gray-200'}`}>
          <div className="absolute top-0 left-0 right-0 h-1 bg-culturin-indigo"></div>
          <div className="absolute top-4 right-4">
            <Badge className="bg-culturin-mustard text-culturin-indigo">Most Popular</Badge>
          </div>
          <CardHeader>
            <CardTitle>Growth</CardTitle>
            <CardDescription>For full-time boutique businesses</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">£99</span>
              <span className="text-gray-500 ml-1">/month</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <PricingFeature included>Advanced booking tools</PricingFeature>
              <PricingFeature included>Full CRM functionality</PricingFeature>
              <PricingFeature included>Comprehensive analytics</PricingFeature>
              <PricingFeature included>Website builder</PricingFeature>
              <PricingFeature included>Up to 3 team members</PricingFeature>
              <PricingFeature included>Onboarding concierge</PricingFeature>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              variant={selectedTier === 'growth' ? 'default' : 'outline'}
              className="w-full"
              onClick={() => onTierSelect('growth')}
            >
              {selectedTier === 'growth' ? 'Selected' : 'Select Plan'}
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Tier */}
        <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-md ${selectedTier === 'pro' ? 'border-culturin-indigo ring-2 ring-culturin-indigo/20' : 'border-gray-200'}`}>
          <div className="absolute top-0 left-0 right-0 h-1 bg-culturin-indigo"></div>
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>For teams, agencies, or multi-region</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">£199</span>
              <span className="text-gray-500 ml-1">/month</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <PricingFeature included>Everything in Growth</PricingFeature>
              <PricingFeature included>Unlimited team members</PricingFeature>
              <PricingFeature included>API access</PricingFeature>
              <PricingFeature included>Data exports</PricingFeature>
              <PricingFeature included>Multi-language support</PricingFeature>
              <PricingFeature included>Onboarding concierge</PricingFeature>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              variant={selectedTier === 'pro' ? 'default' : 'outline'}
              className="w-full"
              onClick={() => onTierSelect('pro')}
            >
              {selectedTier === 'pro' ? 'Selected' : 'Contact Sales'}
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h4 className="text-lg font-medium mb-2">Key Policies</h4>
        <ul className="space-y-1">
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>No commission on bookings</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Onboarding concierge included in all tiers</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Cancel anytime, no hidden fees</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Helper component for pricing features
const PricingFeature = ({ children, included = false }: { children: React.ReactNode; included?: boolean }) => (
  <li className="flex items-center gap-2">
    {included ? (
      <Check className="h-4 w-4 text-green-500" />
    ) : (
      <X className="h-4 w-4 text-gray-300" />
    )}
    <span className={included ? "text-gray-700" : "text-gray-400"}>{children}</span>
  </li>
);

export default PricingTiers;

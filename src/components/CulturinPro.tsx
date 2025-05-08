
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

// Import our modular components
import FeatureHighlights from './pro/FeatureHighlights';
import PricingTiers from './pro/PricingTiers';
import FeaturesCatalogue from './pro/FeaturesCatalogue';
import SecuritySection from './pro/SecuritySection';
import ProCta from './pro/ProCta';
import ProBenefitsCarousel from './pro/ProBenefitsCarousel';

const CulturinPro = () => {
  const [selectedTier, setSelectedTier] = useState<string>("growth");
  const [activeTab, setActiveTab] = useState<string>("overview");

  const handleTierSelect = (tier: string) => {
    setSelectedTier(tier);
    toast({
      title: `${tier.charAt(0).toUpperCase() + tier.slice(1)} plan selected`,
      description: "Your selection has been updated.",
    });
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8 w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-8">
          {/* Overview Card */}
          <FeatureHighlights />
          
          {/* Pricing Tiers Preview */}
          <PricingTiers onTierSelect={handleTierSelect} selectedTier={selectedTier} />
          
          {/* Security Section */}
          <SecuritySection />
          
          {/* CTA Button */}
          <ProCta selectedTier={selectedTier} />
        </TabsContent>
        
        <TabsContent value="features" className="space-y-8">
          <FeatureHighlights />
          <FeaturesCatalogue />
        </TabsContent>
        
        <TabsContent value="pricing" className="space-y-8">
          <PricingTiers onTierSelect={handleTierSelect} selectedTier={selectedTier} />
          <SecuritySection />
          <ProCta selectedTier={selectedTier} />
        </TabsContent>
        
        <TabsContent value="testimonials" className="space-y-8">
          <ProBenefitsCarousel />
          <ProCta selectedTier={selectedTier} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CulturinPro;

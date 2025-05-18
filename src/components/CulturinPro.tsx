
import React, { useState } from 'react';
import { toast } from "@/components/ui/use-toast";

// Import our modular components
import FeatureHighlights from './pro/FeatureHighlights';
import PricingTiers from './pro/PricingTiers';
import SecuritySection from './pro/SecuritySection';
import ProCta from './pro/ProCta';

const CulturinPro = () => {
  const [selectedTier, setSelectedTier] = useState<string>("growth");

  const handleTierSelect = (tier: string) => {
    setSelectedTier(tier);
    toast({
      title: `${tier.charAt(0).toUpperCase() + tier.slice(1)} plan selected`,
      description: "Your selection has been updated.",
    });
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Overview Card */}
      <FeatureHighlights />
      
      {/* Pricing Tiers */}
      <PricingTiers onTierSelect={handleTierSelect} selectedTier={selectedTier} />
      
      {/* Security Section */}
      <SecuritySection />
      
      {/* CTA Button */}
      <ProCta selectedTier={selectedTier} />
    </div>
  );
};

export default CulturinPro;

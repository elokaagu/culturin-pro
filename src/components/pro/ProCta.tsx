
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

interface ProCtaProps {
  selectedTier: string;
}

const ProCta: React.FC<ProCtaProps> = ({ selectedTier }) => {
  const navigate = useNavigate();
  
  const handleUpgrade = () => {
    toast({
      title: "Upgrade initiated",
      description: `Starting your upgrade to Culturin Pro - ${selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)} plan.`,
      variant: "default",
    });
    // Navigate to the dedicated Culturin Pro page
    navigate('/culturin-pro');
  };

  return (
    <div className="text-center pt-4 pb-12">
      <Button 
        size="lg" 
        variant="culturin-pro"
        className="px-8 py-6 text-lg rounded-xl shadow-md hover:shadow-lg transition-all"
        onClick={handleUpgrade}
      >
        Upgrade to Culturin Pro <ChevronRight className="ml-2 h-5 w-5" />
      </Button>
      <p className="text-sm text-gray-500 mt-3">Start with a 14-day free trial. Cancel anytime.</p>
    </div>
  );
};

export default ProCta;

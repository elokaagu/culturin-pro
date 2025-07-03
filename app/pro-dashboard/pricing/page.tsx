import React from "react";
import DynamicPricingDashboard from "../../../components/pro/pricing/DynamicPricingDashboard";

export const metadata = {
  title: "Dynamic Pricing | Culturin Studio",
  description:
    "AI-powered pricing optimization for your cultural experiences based on market conditions.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <DynamicPricingDashboard />
      </div>
    </div>
  );
}

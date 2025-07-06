import React from "react";
import DynamicPricingDashboard from "../../../components/pro/pricing/DynamicPricingDashboard";
import ProDashboardLayout from "../../../components/pro/ProDashboardLayout";

export const metadata = {
  title: "Dynamic Pricing | Culturin Studio",
  description:
    "AI powered pricing optimization for your cultural experiences based on market conditions.",
};

export default function PricingPage() {
  return (
    <ProDashboardLayout
      title="Dynamic Pricing"
      subtitle="AI powered pricing optimization based on market conditions"
    >
      <DynamicPricingDashboard />
    </ProDashboardLayout>
  );
}

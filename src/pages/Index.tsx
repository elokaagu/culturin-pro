
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import OperatorInvitation from "@/components/sections/OperatorInvitation";
import TravelWithMeSection from "@/components/sections/TravelWithMeSection";
import JoinCommunity from "@/components/sections/JoinCommunity";
import Footer from "@/components/sections/Footer";

const Index = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  
  useEffect(() => {
    setAnimateItems(true);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header type="traveler" />
      <Hero />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialSection />
      <OperatorInvitation />
      <TravelWithMeSection />
      <JoinCommunity />
      <Footer />
    </div>
  );
};

export default Index;

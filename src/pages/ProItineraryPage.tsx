"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "../../lib/navigation";
import ProDashboardLayout from "@/components/pro/ProDashboardLayout";
import ItineraryTabs from "@/components/pro/itinerary/ItineraryTabs";
import { useItineraries } from "@/hooks/useItineraries";
import { useAuth } from "@/components/auth/AuthProvider";
import { localStorageUtils } from "@/lib/localStorage";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProItineraryPage: React.FC = () => {
  const navigate = useNavigate();
  const { itineraries, isLoading, error, createItinerary } = useItineraries();
  const { user } = useAuth();
  const [hasCheckedSampleData, setHasCheckedSampleData] = useState(false);

  useEffect(() => {
    localStorage.setItem("lastRoute", "/pro-dashboard/itinerary");
  }, []);

  // Check for sample data if no itineraries exist
  useEffect(() => {
    if (!isLoading && itineraries.length === 0 && user && !hasCheckedSampleData) {
      console.log("🔍 No itineraries found, checking for sample data...");
      setHasCheckedSampleData(true);
      
      // Check if we have sample data in localStorage
      const userSpecificKey = `culturinItineraries_${user.id}`;
      const existingData = localStorageUtils.getItem(userSpecificKey);
      
      if (!existingData) {
        console.log("📝 Creating sample itinerary for user...");
        
        // Create a sample itinerary based on user email
        const isStTropez = user.email?.includes('satellitelabs');
        const sampleItinerary = {
          id: `local-${Date.now()}`,
          title: isStTropez ? 'St Tropez Soireé' : 'Tuscany Cultural Journey',
          description: isStTropez 
            ? 'A luxurious cultural experience in the French Riviera, exploring local art, cuisine, and traditions.'
            : 'An immersive journey through Tuscany\'s rich cultural heritage, from Renaissance art to culinary traditions.',
          days: isStTropez ? 3 : 5,
          lastUpdated: 'just now',
          status: 'published',
          image: '',
          themeType: 'cultural',
          regions: isStTropez 
            ? ['French Riviera', 'Mediterranean'] 
            : ['Tuscany', 'Italy'],
          price: isStTropez ? 2500 : 3200,
          currency: 'USD',
          groupSize: { min: 2, max: 8 },
          difficulty: 'easy',
          tags: isStTropez 
            ? ['luxury', 'cultural', 'french-riviera', 'art'] 
            : ['cultural', 'italy', 'renaissance', 'culinary'],
          modules: []
        };

        // Save to localStorage
        localStorageUtils.setItem(userSpecificKey, JSON.stringify([sampleItinerary]));
        console.log("✅ Sample itinerary created in localStorage");
        
        // Reload the page to trigger itinerary loading
        window.location.reload();
      }
    }
  }, [itineraries, isLoading, user, hasCheckedSampleData]);

  console.log("🎯 ProItineraryPage - Current state:", {
    itinerariesCount: itineraries.length,
    isLoading,
    error,
    userId: user?.id,
    userEmail: user?.email
  });

  return (
    <ProDashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Itinerary Builder
          </h1>
          <p className="text-gray-600">
            Create and manage your experience itineraries
          </p>
        </div>

        <Tabs value="itineraries" className="w-full">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="itineraries">Itineraries</TabsTrigger>
          </TabsList>
          <ItineraryTabs
            activeTab="itineraries"
            itineraries={itineraries}
            isLoading={isLoading}
            onCreateNewItinerary={() => navigate("/pro-dashboard/itinerary/new")}
            onEditItinerary={(itinerary) => navigate(`/pro-dashboard/itinerary/${itinerary.id}`)}
          />
        </Tabs>
      </div>
    </ProDashboardLayout>
  );
};

export default ProItineraryPage;

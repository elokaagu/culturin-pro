"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "../../lib/navigation";
import ProDashboardLayout from "@/components/pro/ProDashboardLayout";
import { useToast } from "@/components/ui/use-toast";
import { useItineraries } from "@/hooks/useItineraries";
import { supabaseStorage } from "@/lib/supabase-storage";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ProItineraryPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { itineraries, loading, error, saveItinerary, deleteItinerary, refreshItineraries } = useItineraries();
  const [hasCheckedSampleData, setHasCheckedSampleData] = useState(false);

  useEffect(() => {
    // Save current route to Supabase storage
    supabaseStorage.setItem("lastRoute", "/pro-dashboard/itinerary");
  }, []);

  // Check for sample data if no itineraries exist
  useEffect(() => {
    const checkSampleData = async () => {
      if (!loading && itineraries.length === 0 && !hasCheckedSampleData) {
        console.log("🔍 No itineraries found, checking for sample data...");
        setHasCheckedSampleData(true);
        
        // Check if we have sample data in Supabase storage
        const existingData = await supabaseStorage.getItem("sampleItineraries");
        
        if (!existingData) {
          console.log("📝 Creating sample itinerary...");
          
          // Create a sample itinerary
          const sampleItinerary = {
            id: `sample-${Date.now()}`,
            title: 'Tuscany Cultural Journey',
            description: 'An immersive journey through Tuscany\'s rich cultural heritage, from Renaissance art to culinary traditions.',
            days: 5,
            status: 'published',
            image: '',
            price: 3200,
            currency: 'USD',
            highlights: ['Renaissance Art', 'Culinary Traditions', 'Cultural Heritage'],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };

          // Save to Supabase storage
          await supabaseStorage.setItem("sampleItineraries", [sampleItinerary]);
          console.log("✅ Sample itinerary created in Supabase storage");
          
          // Refresh itineraries
          await refreshItineraries();
        }
      }
    };

    checkSampleData();
  }, [itineraries, loading, hasCheckedSampleData, refreshItineraries]);

  const handleCreateNew = () => {
    navigate("/pro-dashboard/itinerary/new");
  };

  const handleEditItinerary = (itineraryId: string) => {
    navigate(`/pro-dashboard/itinerary/${itineraryId}`);
  };

  const handleDeleteItinerary = async (itineraryId: string) => {
    try {
      const success = await deleteItinerary(itineraryId);
      if (success) {
        toast({
          title: "Itinerary Deleted",
          description: "The itinerary has been successfully deleted.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete the itinerary.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting itinerary:", error);
      toast({
        title: "Error",
        description: "An error occurred while deleting the itinerary.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <ProDashboardLayout>
        <div className="p-6">
          <div className="flex items-center justify-center min-h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </ProDashboardLayout>
    );
  }

  return (
    <ProDashboardLayout>
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Itineraries
            </h1>
            <p className="text-gray-600">
              Create and manage your experience itineraries
            </p>
          </div>
          <Button onClick={handleCreateNew} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Itinerary
          </Button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {itineraries.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No itineraries yet
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first itinerary to get started with your cultural experiences.
              </p>
              <Button onClick={handleCreateNew} className="flex items-center gap-2 mx-auto">
                <Plus className="h-4 w-4" />
                Create Your First Itinerary
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itineraries.map((itinerary) => (
              <Card key={itinerary.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{itinerary.title}</CardTitle>
                      <CardDescription>
                        {itinerary.days} day{itinerary.days !== 1 ? 's' : ''} • {itinerary.status}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditItinerary(itinerary.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteItinerary(itinerary.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    {itinerary.description}
                  </p>
                  {itinerary.price && (
                    <div className="text-sm font-medium text-gray-900">
                      ${itinerary.price} {itinerary.currency}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ProDashboardLayout>
  );
};

export default ProItineraryPage;

import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Calendar, Sparkles } from "lucide-react";
import { ItineraryType } from "@/data/itineraryData";
import ItineraryCard from "./ItineraryCard";
import { useNavigate } from "../../../lib/navigation";

interface ItineraryTabsProps {
  activeTab: string;
  itineraries: ItineraryType[];
  isLoading?: boolean;
  onCreateNewItinerary: () => void;
  onEditItinerary: (itinerary: ItineraryType) => void;
}

const ItineraryTabs: React.FC<ItineraryTabsProps> = ({
  activeTab,
  itineraries,
  isLoading = false,
  onCreateNewItinerary,
  onEditItinerary,
}) => {
  const navigate = useNavigate();

  const handleCreateNewItinerary = () => {
    // Navigate to the dedicated new itinerary page
    navigate("/pro-dashboard/itinerary/new");
  };

  return (
    <>
      <TabsContent value="itineraries" className="mt-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Toggle
              variant="outline"
              pressed={true}
              onPressedChange={() => {}}
              className="data-[state=on]:bg-slate-100 flex-1 sm:flex-initial text-xs sm:text-sm"
            >
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> 
              <span className="hidden xs:inline">Daily View</span>
              <span className="xs:hidden">Daily</span>
            </Toggle>
          </div>
          <Button onClick={handleCreateNewItinerary} className="w-full sm:w-auto text-sm">
            <span className="hidden sm:inline">Create New Itinerary</span>
            <span className="sm:hidden">Create New</span>
          </Button>
        </div>
        
        {itineraries.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed mx-4 sm:mx-0">
            <h3 className="text-lg sm:text-xl font-medium mb-2">No Itineraries Yet</h3>
            <p className="text-gray-500 mb-6 text-sm sm:text-base px-4">Start creating your first itinerary</p>
            <Button onClick={handleCreateNewItinerary} className="text-sm">
              Create New Itinerary
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itineraries.map((itinerary) => (
              <ItineraryCard
                key={itinerary.id}
                {...itinerary}
                onEdit={() => onEditItinerary(itinerary)}
              />
            ))}
          </div>
        )}
      </TabsContent>
    </>
  );
};

export default ItineraryTabs;

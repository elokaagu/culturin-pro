import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Calendar, Sparkles } from "lucide-react";
import { ExperienceType } from "@/data/experienceData";
import ExperienceCard from "./ExperienceCard";
import { useNavigate } from "../../../lib/navigation";

interface ExperienceTabsProps {
  activeTab: string;
  experiences: ExperienceType[];
  isLoading?: boolean;
  onCreateNewItinerary: () => void;
  onEditItinerary: (experience: ExperienceType) => void;
  onDeleteItinerary?: (id: string) => void;
}

const ExperienceTabs: React.FC<ExperienceTabsProps> = ({
  activeTab,
  experiences,
  isLoading = false,
  onCreateNewItinerary,
  onEditItinerary,
  onDeleteItinerary,
}) => {
  const navigate = useNavigate();

  const handleCreateNewItinerary = () => {
    // Navigate to the dedicated new experience page
    navigate("/pro-dashboard/experience/new");
  };

  return (
    <>
      <TabsContent value="experiences" className="mt-6">
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
          <div className="flex gap-2 w-full sm:w-auto">
            <Button onClick={handleCreateNewItinerary} className="text-sm">
              <span className="hidden sm:inline">Create New Experience</span>
              <span className="sm:hidden">Create New</span>
            </Button>
          </div>
        </div>

        {experiences.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed mx-4 sm:mx-0">
            <h3 className="text-lg sm:text-xl font-medium mb-2">
              No Experiences Yet
            </h3>
            <p className="text-gray-500 mb-6 text-sm sm:text-base px-4">
              Start creating your first experience
            </p>
            <Button onClick={handleCreateNewItinerary} className="text-sm">
              Create New Experience
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((experience) => (
              <ExperienceCard
                key={experience.id}
                {...experience}
                onEdit={() => onEditItinerary(experience)}
                onDelete={onDeleteItinerary}
              />
            ))}
          </div>
        )}
      </TabsContent>
    </>
  );
};

export default ExperienceTabs;

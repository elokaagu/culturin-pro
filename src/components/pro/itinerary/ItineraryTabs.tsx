
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Toggle } from '@/components/ui/toggle';
import { Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ItineraryCard from './ItineraryCard';
import TemplateCard from './TemplateCard';
import { ItineraryType } from '@/data/itineraryData';

interface ItineraryTabsProps {
  activeTab: string;
  viewType: 'daily' | 'thematic';
  setViewType: (type: 'daily' | 'thematic') => void;
  itineraries: ItineraryType[];
  templates: any[];
  onCreateNewItinerary: () => void;
  onEditItinerary: (itinerary: ItineraryType) => void;
  onUseTemplate: (template: any) => void;
}

const ItineraryTabs: React.FC<ItineraryTabsProps> = ({
  activeTab,
  viewType,
  setViewType,
  itineraries,
  templates,
  onCreateNewItinerary,
  onEditItinerary,
  onUseTemplate,
}) => {
  // Group itineraries by theme type for thematic view
  const groupedItineraries = itineraries.reduce((acc, itinerary) => {
    const theme = itinerary.themeType || 'general';
    if (!acc[theme]) {
      acc[theme] = [];
    }
    acc[theme].push(itinerary);
    return acc;
  }, {} as Record<string, ItineraryType[]>);

  const renderItinerariesView = () => {
    if (viewType === 'thematic') {
      return (
        <div className="space-y-8">
          {Object.entries(groupedItineraries).map(([theme, themeItineraries]) => (
            <div key={theme} className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium capitalize">{theme} Experiences</h3>
                <Badge variant="outline">{themeItineraries.length}</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {themeItineraries.map((itinerary) => (
                  <ItineraryCard
                    key={itinerary.id}
                    {...itinerary}
                    onEdit={() => onEditItinerary(itinerary)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Daily view (default)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {itineraries.map((itinerary) => (
          <ItineraryCard
            key={itinerary.id}
            {...itinerary}
            onEdit={() => onEditItinerary(itinerary)}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <TabsContent value="itineraries" className="mt-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Toggle
              variant="outline"
              pressed={viewType === 'daily'}
              onPressedChange={() => setViewType('daily')}
              className="data-[state=on]:bg-slate-100 flex-1 sm:flex-initial text-xs sm:text-sm"
            >
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> 
              <span className="hidden xs:inline">Daily View</span>
              <span className="xs:hidden">Daily</span>
            </Toggle>
            <Toggle
              variant="outline"
              pressed={viewType === 'thematic'}
              onPressedChange={() => setViewType('thematic')}
              className="data-[state=on]:bg-slate-100 flex-1 sm:flex-initial text-xs sm:text-sm"
            >
              <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> 
              <span className="hidden xs:inline">Thematic View</span>
              <span className="xs:hidden">Thematic</span>
            </Toggle>
          </div>
          <Button onClick={onCreateNewItinerary} className="w-full sm:w-auto text-sm">
            <span className="hidden sm:inline">Create New Itinerary</span>
            <span className="sm:hidden">Create New</span>
          </Button>
        </div>
        
        {itineraries.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed mx-4 sm:mx-0">
            <h3 className="text-lg sm:text-xl font-medium mb-2">No Itineraries Yet</h3>
            <p className="text-gray-500 mb-6 text-sm sm:text-base px-4">Start creating your first itinerary</p>
            <Button onClick={onCreateNewItinerary} className="text-sm">
              Create New Itinerary
            </Button>
          </div>
        ) : (
          renderItinerariesView()
        )}
      </TabsContent>
      
      <TabsContent value="templates" className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
          {templates.map((template, index) => (
            <TemplateCard
              key={index}
              {...template}
              onUse={() => onUseTemplate(template)}
            />
          ))}
        </div>
      </TabsContent>
      
    </>
  );
};

export default ItineraryTabs;

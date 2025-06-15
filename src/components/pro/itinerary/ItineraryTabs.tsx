
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
  onStartStoryMode: () => void;
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
  onStartStoryMode,
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
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Toggle
              variant="outline"
              pressed={viewType === 'daily'}
              onPressedChange={() => setViewType('daily')}
              className="data-[state=on]:bg-slate-100"
            >
              <Calendar className="h-4 w-4 mr-1" /> Daily View
            </Toggle>
            <Toggle
              variant="outline"
              pressed={viewType === 'thematic'}
              onPressedChange={() => setViewType('thematic')}
              className="data-[state=on]:bg-slate-100"
            >
              <FileText className="h-4 w-4 mr-1" /> Thematic View
            </Toggle>
          </div>
          <Button onClick={onCreateNewItinerary}>
            Create New Itinerary
          </Button>
        </div>
        
        {itineraries.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed">
            <h3 className="text-xl font-medium mb-2">No Itineraries Yet</h3>
            <p className="text-gray-500 mb-6">Start creating your first itinerary</p>
            <Button onClick={onCreateNewItinerary}>
              Create New Itinerary
            </Button>
          </div>
        ) : (
          renderItinerariesView()
        )}
      </TabsContent>
      
      <TabsContent value="templates" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <TemplateCard
              key={index}
              {...template}
              onUse={() => onUseTemplate(template)}
            />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="story-mode" className="mt-6">
        <div className="text-center py-16 bg-slate-50 rounded-lg border-2 border-dashed">
          <h3 className="text-xl font-medium mb-2">Story Mode</h3>
          <p className="text-gray-500 mb-1">Create narrative-driven experiences</p>
          <p className="text-gray-400 text-sm mb-6">Perfect for walking tours and cultural journeys</p>
          
          <div className="flex flex-col items-center gap-2">
            <Badge variant="outline" className="mb-4">New Feature</Badge>
            <Button onClick={onStartStoryMode} className="px-8">
              Start Story Mode
            </Button>
          </div>
        </div>
      </TabsContent>
    </>
  );
};

export default ItineraryTabs;

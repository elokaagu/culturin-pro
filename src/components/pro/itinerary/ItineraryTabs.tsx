
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, LayoutGrid, FileText, Book } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import ItineraryCard from './ItineraryCard';
import TemplateCard from './TemplateCard';
import { ItineraryType, TemplateType } from '@/data/itineraryData';

interface ItineraryTabsProps {
  activeTab: string;
  viewType: 'daily' | 'thematic';
  setViewType: (type: 'daily' | 'thematic') => void;
  itineraries: ItineraryType[];
  templates: TemplateType[];
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
  onStartStoryMode
}) => {
  // Helper function to get thematic data
  const getThematicData = () => {
    const themes = Array.from(new Set(itineraries.map(item => item.themeType)));
    return themes.map(theme => ({
      theme,
      itineraries: itineraries.filter(item => item.themeType === theme)
    }));
  };

  return (
    <>
      <TabsContent value="itineraries" className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Button
              variant={viewType === 'daily' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewType('daily')}
              className="h-8"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Daily View
            </Button>
            <Button
              variant={viewType === 'thematic' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewType('thematic')}
              className="h-8"
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Thematic View
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select className="text-sm border rounded px-2 py-1">
              <option>Last Updated</option>
              <option>Name</option>
              <option>Status</option>
            </select>
          </div>
        </div>

        {viewType === 'daily' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itineraries.map(itinerary => (
              <ItineraryCard 
                key={itinerary.id}
                {...itinerary}
                onEdit={() => onEditItinerary(itinerary)}
              />
            ))}
            
            {/* Add New Experience Card */}
            <div 
              className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden flex flex-col items-center justify-center p-10 hover:bg-gray-100 transition-colors cursor-pointer min-h-[400px]"
              onClick={onCreateNewItinerary}
            >
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Add New Itinerary</h3>
              <p className="text-sm text-gray-500 text-center max-w-xs">Create a new cultural itinerary for your guests.</p>
            </div>
          </div>
        ) : (
          // Thematic view
          <div className="space-y-10">
            {getThematicData().map((themeGroup, index) => (
              <div key={index} className="space-y-4">
                <h2 className="text-xl font-medium capitalize">
                  {themeGroup.theme === 'spiritual' ? 'Spiritual & Heritage' : 
                  themeGroup.theme === 'culinary' ? 'Food & Culinary' : 'Arts & Culture'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {themeGroup.itineraries.map(itinerary => (
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
        )}
      </TabsContent>
      
      <TabsContent value="templates" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map(template => (
            <TemplateCard 
              key={template.id}
              {...template}
              onUse={() => onUseTemplate(template)}
            />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="story-mode" className="mt-6">
        <div className="bg-gray-50 border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Story Mode Builder</h3>
              <p className="text-gray-500 mt-1">
                Frame your trips as narratives rather than just itineraries. Perfect for spiritual paths, 
                heritage journeys, or transformation experiences.
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Define Your Narrative</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-gray-500">
                    Establish the cultural context and transformation journey
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Create Chapters</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-gray-500">
                    Organize experiences into meaningful narrative sections
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Personalize Paths</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-gray-500">
                    Adapt the journey based on traveler interests and needs
                  </CardContent>
                </Card>
              </div>
              <Button className="mt-4" onClick={onStartStoryMode}>Start Story Mode</Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </>
  );
};

export default ItineraryTabs;

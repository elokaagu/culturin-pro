
import React, { useState } from 'react';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ItineraryTabs from '@/components/pro/itinerary/ItineraryTabs';
import ItineraryEditor from '@/components/pro/itinerary/ItineraryEditor';
import ResourcesSection from '@/components/pro/itinerary/ResourcesSection';
import { sampleItineraries, sampleTemplates, resourcesData, ItineraryType, ResourceType } from '@/data/itineraryData';
import { useToast } from '@/components/ui/use-toast';

const ProItineraryPage = () => {
  const [activeTab, setActiveTab] = useState('itineraries');
  const [viewType, setViewType] = useState<'daily' | 'thematic'>('daily');
  const [itineraries, setItineraries] = useState<ItineraryType[]>(sampleItineraries);
  const [selectedItinerary, setSelectedItinerary] = useState<ItineraryType | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const { toast } = useToast();

  const handleCreateNewItinerary = () => {
    const newItinerary: ItineraryType = {
      id: `new-${Date.now()}`,
      title: "New Itinerary",
      days: 3,
      lastUpdated: "just now",
      status: 'draft',
      image: "/lovable-uploads/2e9a9e9e-af76-4913-8148-9fce248d55c9.png",
      themeType: "general", // Added required themeType property
      description: "Start building your cultural experience itinerary",
      regions: []
    };
    
    setItineraries([newItinerary, ...itineraries]);
    setSelectedItinerary(newItinerary);
    setShowEditor(true);
  };

  const handleEditItinerary = (itinerary: ItineraryType) => {
    setSelectedItinerary(itinerary);
    setShowEditor(true);
  };

  const handleUseTemplate = (template: any) => {
    const newItinerary: ItineraryType = {
      id: `template-${Date.now()}`,
      title: template.title,
      days: 5,
      lastUpdated: "just now",
      status: 'draft',
      image: template.image,
      themeType: template.theme.toLowerCase(),
      description: template.description,
      regions: []
    };
    
    setItineraries([newItinerary, ...itineraries]);
    setSelectedItinerary(newItinerary);
    setActiveTab('itineraries');
    setShowEditor(true);
    
    toast({
      title: "Template Applied",
      description: `${template.title} template has been applied to your new itinerary.`,
    });
  };

  const handleStartStoryMode = () => {
    const newStoryItinerary: ItineraryType = {
      id: `story-${Date.now()}`,
      title: "New Story Experience",
      days: 1,
      lastUpdated: "just now",
      status: 'draft',
      image: "/lovable-uploads/31055680-5e98-433a-a30a-747997259663.png",
      themeType: "narrative",
      description: "Create an immersive narrative experience",
      storyMode: true,
      regions: []
    };
    
    setItineraries([newStoryItinerary, ...itineraries]);
    setSelectedItinerary(newStoryItinerary);
    setActiveTab('itineraries');
    setShowEditor(true);
  };

  const handleEditorClose = () => {
    setShowEditor(false);
    setSelectedItinerary(null);
  };

  const handleResourceClick = (resource: ResourceType) => {
    if (resource.id === 'r1') {
      // Open AI assistant
      setShowAIAssistant(true);
      
      if (!showEditor && itineraries.length > 0) {
        // If editor is not open yet, open it with the first itinerary
        setSelectedItinerary(itineraries[0]);
        setShowEditor(true);
      }
      
      toast({
        title: "AI Content Assistant",
        description: "AI assistant is ready to help you create engaging content.",
      });
    } else {
      toast({
        title: resource.title,
        description: `Opening ${resource.title.toLowerCase()} tool...`,
      });
    }
  };

  const handleItinerarySave = (updatedItinerary: ItineraryType) => {
    // Fixed the type issue by ensuring we're only using ItineraryType
    setItineraries(prevItineraries => 
      prevItineraries.map(item => 
        item.id === updatedItinerary.id ? updatedItinerary : item
      )
    );
  };

  return (
    <ProDashboardLayout
      title="Itinerary Builder"
      subtitle="Create and manage your experience itineraries"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="itineraries">Your Itineraries</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="story-mode" className="relative">
            Story Mode
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              β
            </span>
          </TabsTrigger>
        </TabsList>
        
        <ItineraryTabs
          activeTab={activeTab}
          viewType={viewType}
          setViewType={setViewType}
          itineraries={itineraries}
          templates={sampleTemplates}
          onCreateNewItinerary={handleCreateNewItinerary}
          onEditItinerary={handleEditItinerary}
          onUseTemplate={handleUseTemplate}
          onStartStoryMode={handleStartStoryMode}
        />
      </Tabs>
      
      {showEditor && selectedItinerary && (
        <ItineraryEditor
          showEditor={showEditor}
          selectedItinerary={selectedItinerary}
          showAIAssistant={showAIAssistant}
          onAIAssistantClose={() => setShowAIAssistant(false)}
          onEditorClose={handleEditorClose}
          onItinerarySave={handleItinerarySave}
        />
      )}
      
      {!showEditor && (
        <ResourcesSection
          resources={resourcesData}
          onResourceClick={handleResourceClick}
        />
      )}
    </ProDashboardLayout>
  );
};

export default ProItineraryPage;

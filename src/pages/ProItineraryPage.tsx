
import React, { useState } from 'react';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PencilRuler, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ItineraryTabs from '@/components/pro/itinerary/ItineraryTabs';
import ItineraryEditor from '@/components/pro/itinerary/ItineraryEditor';
import ResourcesSection from '@/components/pro/itinerary/ResourcesSection';
import { 
  sampleItineraries, 
  sampleTemplates, 
  resourcesData, 
  ItineraryType, 
  ResourceType 
} from '@/data/itineraryData';

const ProItineraryPage: React.FC = () => {
  const [viewType, setViewType] = useState<'daily' | 'thematic'>('daily');
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedItinerary, setSelectedItinerary] = useState<ItineraryType | null>(null);
  const [activeTab, setActiveTab] = useState("itineraries");
  const { toast } = useToast();
  
  const handleCreateNewItinerary = () => {
    setSelectedItinerary({
      id: `new-${Date.now()}`,
      title: "New Itinerary",
      days: 1,
      status: "draft",
      lastUpdated: "just now",
      image: "/lovable-uploads/31055680-5e98-433a-a30a-747997259663.png",
      description: "Start building your new cultural experience."
    });
    setShowEditor(true);
    toast({
      title: "New Itinerary Created",
      description: "Start building your itinerary by adding days and activities.",
    });
  };

  const handleEditItinerary = (itinerary: ItineraryType) => {
    setSelectedItinerary(itinerary);
    setShowEditor(true);
    toast({
      title: `Editing: ${itinerary.title}`,
      description: "Make changes to your itinerary.",
    });
  };

  const handleUseTemplate = (template: any) => {
    setSelectedItinerary({
      ...template,
      id: `new-${Date.now()}`,
      status: "draft" as const,
      lastUpdated: "just now",
      days: 3, // Default days for templates
      title: `My ${template.title}`
    });
    setShowEditor(true);
    toast({
      title: `Template Applied: ${template.title}`,
      description: "Customize this template to fit your needs.",
    });
  };

  const handleStartStoryMode = () => {
    setSelectedItinerary({
      id: `story-${Date.now()}`,
      title: "My Story Journey",
      storyMode: true,
      status: "draft",
      lastUpdated: "just now",
      days: 5, // Default days for story mode
      image: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png",
      description: "Create a narrative-driven experience."
    });
    setShowEditor(true);
    toast({
      title: "Story Mode Activated",
      description: "Start crafting your narrative-driven journey.",
    });
  };
  
  const handleResourceClick = (resource: ResourceType) => {
    if (resource.title.includes("AI")) {
      setShowAIAssistant(true);
    }
    toast({
      title: `${resource.title} Launched`,
      description: "Use this tool to enhance your itinerary.",
    });
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
  };
  
  return (
    <ProDashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Itinerary Builder</h1>
            <p className="mt-1 text-gray-600">
              Create interactive travel itineraries and compelling storytelling experiences
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowAIAssistant(!showAIAssistant)}>
              <FileText className="mr-2 h-4 w-4" />
              AI Content Assistant
            </Button>
            <Button 
              className="bg-[#1E1E1E] text-white hover:bg-[#000000]"
              onClick={handleCreateNewItinerary}
            >
              <PencilRuler className="mr-2 h-4 w-4" />
              Create New Itinerary
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="itineraries">My Itineraries</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="story-mode">Story Mode</TabsTrigger>
          </TabsList>
          
          <ItineraryTabs 
            activeTab={activeTab}
            viewType={viewType}
            setViewType={setViewType}
            itineraries={sampleItineraries}
            templates={sampleTemplates}
            onCreateNewItinerary={handleCreateNewItinerary}
            onEditItinerary={handleEditItinerary}
            onUseTemplate={handleUseTemplate}
            onStartStoryMode={handleStartStoryMode}
          />
        </Tabs>
        
        <ItineraryEditor 
          showEditor={showEditor}
          selectedItinerary={selectedItinerary}
          showAIAssistant={showAIAssistant}
          onAIAssistantClose={() => setShowAIAssistant(false)}
          onEditorClose={handleCloseEditor}
        />

        <ResourcesSection 
          resources={resourcesData}
          onResourceClick={handleResourceClick}
        />
      </div>
    </ProDashboardLayout>
  );
};

export default ProItineraryPage;

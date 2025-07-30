'use client'

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
      <div className="px-4 sm:px-0">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <ItineraryTabs
            activeTab={activeTab}
            itineraries={itineraries}
            onCreateNewItinerary={handleCreateNewItinerary}
            onEditItinerary={handleEditItinerary}
          />
        </Tabs>
      </div>
      
      {showEditor && selectedItinerary && (
        <div className="mx-4 sm:mx-0">
          <ItineraryEditor
            showEditor={showEditor}
            selectedItinerary={selectedItinerary}
            showAIAssistant={showAIAssistant}
            onAIAssistantClose={() => setShowAIAssistant(false)}
            onEditorClose={handleEditorClose}
            onItinerarySave={handleItinerarySave}
          />
        </div>
      )}
      
      {!showEditor && (
        <div className="px-4 sm:px-0">
          <ResourcesSection
            resources={resourcesData}
            onResourceClick={handleResourceClick}
          />
        </div>
      )}
    </ProDashboardLayout>
  );
};

export default ProItineraryPage;

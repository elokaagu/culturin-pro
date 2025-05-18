
import React, { useState } from 'react';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PencilRuler, FileText, Map, Image as ImageIcon, Clock, LayoutGrid, Calendar, Plus, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { useToast } from '@/components/ui/use-toast';
import Image from '@/components/ui/image';
import ItineraryPreview from '@/components/pro/itinerary/ItineraryPreview';
import ModuleLibrary from '@/components/pro/itinerary/ModuleLibrary';
import AIContentAssistant from '@/components/pro/itinerary/AIContentAssistant';

// Sample itinerary data for demo purposes
const sampleItineraries = [
  { 
    id: "1",
    title: "Sacred Japan Journey", 
    days: 7,
    lastUpdated: "3 days ago",
    status: "published" as const,
    image: "/lovable-uploads/31055680-5e98-433a-a30a-747997259663.png",
    themeType: "spiritual",
    description: "A spiritual journey through Japan's sacred sites and temples.",
    regions: ["Kyoto", "Tokyo", "Mount Fuji"]
  },
  { 
    id: "2",
    title: "Morocco Culinary Expedition", 
    days: 10,
    lastUpdated: "1 week ago",
    status: "draft" as const,
    image: "/lovable-uploads/8ee97e98-fd03-4f2b-8d3e-dcb87af6a6ba.png",
    themeType: "culinary",
    description: "Explore Morocco's rich food traditions and cooking techniques.",
    regions: ["Marrakech", "Fez", "Casablanca"]
  },
  { 
    id: "3",
    title: "Oaxacan Art & Soul", 
    days: 6,
    lastUpdated: "2 weeks ago",
    status: "published" as const,
    image: "/lovable-uploads/38b3d0e5-8ce3-41eb-bc8f-7dd21ee77dc2.png",
    themeType: "arts",
    description: "Immerse in the vibrant arts and crafts traditions of Oaxaca.",
    regions: ["Oaxaca City", "Puerto Escondido"]
  }
];

// Sample template data
const sampleTemplates = [
  {
    id: "t1",
    title: "Diaspora Heritage Journey",
    description: "For reconnection trips to ancestral homelands",
    theme: "Heritage",
    image: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png"
  },
  {
    id: "t2",
    title: "Wellness Retreat",
    description: "For spiritual and health-focused experiences",
    theme: "Wellness",
    image: "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png"
  },
  {
    id: "t3",
    title: "Culinary Discovery",
    description: "For food-centered cultural immersions",
    theme: "Food",
    image: "/lovable-uploads/8ee97e98-fd03-4f2b-8d3e-dcb87af6a6ba.png"
  }
];

// Sample resources data
const resourcesData = [
  {
    id: "r1",
    title: "AI Content Assistant",
    description: "Generate culturally rich descriptions for your activities",
    icon: <FileText className="h-5 w-5" />,
    actionUrl: "#ai-assistant"
  },
  {
    id: "r2",
    title: "Interactive Maps",
    description: "Visualize your itinerary with custom route mapping",
    icon: <Map className="h-5 w-5" />,
    actionUrl: "#maps"
  },
  {
    id: "r3",
    title: "Media Library",
    description: "Access free high-quality images for your destinations",
    icon: <ImageIcon className="h-5 w-5" />,
    actionUrl: "#media"
  }
];

// Define the ItineraryType to ensure consistent typing
type ItineraryType = {
  id: string;
  title: string;
  days: number;
  lastUpdated: string;
  status: 'published' | 'draft';
  image: string;
  themeType?: string;
  description?: string;
  regions?: string[];
  storyMode?: boolean;
};

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
  
  const handleResourceClick = (resource: any) => {
    if (resource.title.includes("AI")) {
      setShowAIAssistant(true);
    }
    toast({
      title: `${resource.title} Launched`,
      description: "Use this tool to enhance your itinerary.",
    });
  };

  // Filtered data for thematic view
  const getThematicData = () => {
    const themes = Array.from(new Set(sampleItineraries.map(item => item.themeType)));
    return themes.map(theme => ({
      theme,
      itineraries: sampleItineraries.filter(item => item.themeType === theme)
    }));
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
                {/* Sample Itinerary Cards */}
                {sampleItineraries.map(itinerary => (
                  <ItineraryCard 
                    key={itinerary.id}
                    {...itinerary}
                    onEdit={() => handleEditItinerary(itinerary)}
                  />
                ))}
                
                {/* Add New Experience Card */}
                <div 
                  className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden flex flex-col items-center justify-center p-10 hover:bg-gray-100 transition-colors cursor-pointer min-h-[400px]"
                  onClick={handleCreateNewItinerary}
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
                          onEdit={() => handleEditItinerary(itinerary)}
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
              {/* Sample Template Cards */}
              {sampleTemplates.map(template => (
                <TemplateCard 
                  key={template.id}
                  {...template}
                  onUse={() => handleUseTemplate(template)}
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
                  <Button className="mt-4" onClick={handleStartStoryMode}>Start Story Mode</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Itinerary Editor Interface - Only show when editing */}
        {showEditor && (
          <Collapsible 
            open={true} 
            className="border rounded-lg overflow-hidden bg-white"
          >
            <CollapsibleTrigger asChild>
              <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  <h3 className="font-medium">
                    {selectedItinerary?.storyMode ? 'Story Editor' : 'Itinerary Editor'}: {selectedItinerary?.title}
                  </h3>
                </div>
                <Badge variant="outline">
                  {selectedItinerary?.status === 'published' ? 'Published' : 'Draft'}
                </Badge>
              </div>
            </CollapsibleTrigger>
            <Separator />
            <CollapsibleContent>
              <ResizablePanelGroup direction="horizontal" className="min-h-[600px]">
                <ResizablePanel defaultSize={25}>
                  <ModuleLibrary isStoryMode={selectedItinerary?.storyMode} />
                </ResizablePanel>
                
                <ResizableHandle withHandle />
                
                <ResizablePanel defaultSize={50}>
                  <ItineraryPreview itinerary={selectedItinerary} />
                </ResizablePanel>
                
                <ResizableHandle withHandle />
                
                <ResizablePanel defaultSize={25}>
                  {showAIAssistant ? (
                    <AIContentAssistant onClose={() => setShowAIAssistant(false)} />
                  ) : (
                    <div className="flex flex-col h-full p-4 border-l">
                      <h3 className="font-medium mb-4">Properties</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-gray-500">Title</label>
                          <input 
                            type="text" 
                            className="w-full border p-2 rounded-md text-sm" 
                            value={selectedItinerary?.title || ''}
                            onChange={() => {}}
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Description</label>
                          <textarea 
                            className="w-full border p-2 rounded-md text-sm" 
                            rows={3}
                            value={selectedItinerary?.description || ''}
                            onChange={() => {}}
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Status</label>
                          <select className="w-full border p-2 rounded-md text-sm">
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                          </select>
                        </div>
                        <Button 
                          className="w-full mt-4"
                          onClick={() => {
                            toast({
                              title: "Itinerary Saved",
                              description: "Your changes have been saved successfully."
                            });
                            setShowEditor(false);
                          }}
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  )}
                </ResizablePanel>
              </ResizablePanelGroup>
            </CollapsibleContent>
          </Collapsible>
        )}

        <div className="bg-gray-50 border rounded-lg p-6">
          <h2 className="text-lg font-medium">Itinerary Building Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {resourcesData.map(resource => (
              <ResourceCard 
                key={resource.id}
                title={resource.title}
                description={resource.description}
                icon={resource.icon}
                onClick={() => handleResourceClick(resource)}
              />
            ))}
          </div>
        </div>
      </div>
    </ProDashboardLayout>
  );
};

// Updated components with additional props and functionality
interface ItineraryCardProps {
  id: string;
  title: string;
  days: number;
  lastUpdated: string;
  status: 'published' | 'draft';
  image: string;
  onEdit: () => void;
  themeType?: string;
  description?: string;
  regions?: string[];
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({ 
  title, days, lastUpdated, status, image, onEdit, themeType, regions
}) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="h-40 overflow-hidden relative">
        <Image src={image} alt={title} aspectRatio="wide" />
        {themeType && (
          <Badge className="absolute top-2 right-2 bg-black/70 text-white">
            {themeType.charAt(0).toUpperCase() + themeType.slice(1)}
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant={status === 'published' ? 'default' : 'outline'}>
            {status === 'published' ? 'Published' : 'Draft'}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> {days} days
          {regions && regions.length > 0 && (
            <span className="ml-2 text-xs text-gray-500">
              {regions.join(', ')}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-2 flex justify-between">
        <span className="text-xs text-gray-500">Last updated {lastUpdated}</span>
        <Button variant="outline" size="sm" className="h-8" onClick={onEdit}>
          <Edit className="h-3 w-3 mr-1" /> Edit
        </Button>
      </CardFooter>
    </Card>
  );
};

interface TemplateCardProps {
  id: string;
  title: string;
  description: string;
  theme: string;
  image: string;
  onUse: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ title, description, theme, image, onUse }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="h-40 overflow-hidden">
        <Image src={image} alt={title} aspectRatio="wide" />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant="outline" className="bg-gray-50">{theme}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={onUse}>Use Template</Button>
      </CardFooter>
    </Card>
  );
};

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, icon, onClick }) => {
  return (
    <Card className="hover:shadow-md transition-all duration-200 cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-2 flex flex-row items-center gap-2">
        <div className="bg-gray-100 p-2 rounded-full">
          {icon}
        </div>
        <div>
          <CardTitle className="text-sm">{title}</CardTitle>
          <CardDescription className="text-xs">{description}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ProItineraryPage;


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
import Image from '@/components/ui/image';
import ItineraryPreview from '@/components/pro/itinerary/ItineraryPreview';
import ModuleLibrary from '@/components/pro/itinerary/ModuleLibrary';
import AIContentAssistant from '@/components/pro/itinerary/AIContentAssistant';

const ProItineraryPage: React.FC = () => {
  const [viewType, setViewType] = useState<'daily' | 'thematic'>('daily');
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  
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
            <Button className="bg-[#1E1E1E] text-white hover:bg-[#000000]">
              <PencilRuler className="mr-2 h-4 w-4" />
              Create New Itinerary
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="itineraries" className="w-full">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample Itinerary Cards */}
              <ItineraryCard 
                title="Sacred Japan Journey" 
                days={7}
                lastUpdated="3 days ago"
                status="published"
                image="/lovable-uploads/31055680-5e98-433a-a30a-747997259663.png"
              />
              <ItineraryCard 
                title="Morocco Culinary Expedition" 
                days={10}
                lastUpdated="1 week ago"
                status="draft"
                image="/lovable-uploads/8ee97e98-fd03-4f2b-8d3e-dcb87af6a6ba.png"
              />
              <ItineraryCard 
                title="Oaxacan Art & Soul" 
                days={6}
                lastUpdated="2 weeks ago"
                status="published"
                image="/lovable-uploads/38b3d0e5-8ce3-41eb-bc8f-7dd21ee77dc2.png"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="templates" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample Template Cards */}
              <TemplateCard 
                title="Diaspora Heritage Journey" 
                description="For reconnection trips to ancestral homelands"
                theme="Heritage"
              />
              <TemplateCard 
                title="Wellness Retreat" 
                description="For spiritual and health-focused experiences"
                theme="Wellness"
              />
              <TemplateCard 
                title="Culinary Discovery" 
                description="For food-centered cultural immersions"
                theme="Food"
              />
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
                  <Button className="mt-4">Start Story Mode</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* New Itinerary Editor Interface */}
        <Collapsible 
          open={true} 
          className="border rounded-lg overflow-hidden bg-white"
        >
          <CollapsibleTrigger asChild>
            <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                <h3 className="font-medium">Itinerary Editor</h3>
              </div>
              <Badge variant="outline">Preview Available</Badge>
            </div>
          </CollapsibleTrigger>
          <Separator />
          <CollapsibleContent>
            <ResizablePanelGroup direction="horizontal" className="min-h-[600px]">
              <ResizablePanel defaultSize={25}>
                <ModuleLibrary />
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              <ResizablePanel defaultSize={50}>
                <ItineraryPreview />
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              <ResizablePanel defaultSize={25}>
                {showAIAssistant ? (
                  <AIContentAssistant onClose={() => setShowAIAssistant(false)} />
                ) : (
                  <div className="flex flex-col h-full p-4 border-l">
                    <h3 className="font-medium mb-4">Properties</h3>
                    <div className="text-sm text-gray-500 flex-1 flex items-center justify-center">
                      <p>Select an element to edit its properties</p>
                    </div>
                  </div>
                )}
              </ResizablePanel>
            </ResizablePanelGroup>
          </CollapsibleContent>
        </Collapsible>

        <div className="bg-gray-50 border rounded-lg p-6">
          <h2 className="text-lg font-medium">Itinerary Building Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <ResourceCard 
              title="AI Content Assistant" 
              description="Generate culturally rich descriptions for your activities"
              icon={<FileText className="h-5 w-5" />}
            />
            <ResourceCard 
              title="Interactive Maps" 
              description="Visualize your itinerary with custom route mapping"
              icon={<Map className="h-5 w-5" />}
            />
            <ResourceCard 
              title="Media Library" 
              description="Access free high-quality images for your destinations"
              icon={<ImageIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </div>
    </ProDashboardLayout>
  );
};

// Previous components but updated
interface ItineraryCardProps {
  title: string;
  days: number;
  lastUpdated: string;
  status: 'published' | 'draft';
  image: string;
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({ title, days, lastUpdated, status, image }) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="h-40 overflow-hidden">
        <Image src={image} alt={title} aspectRatio="wide" />
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
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-2 flex justify-between">
        <span className="text-xs text-gray-500">Last updated {lastUpdated}</span>
        <Button variant="outline" size="sm" className="h-8">
          <Edit className="h-3 w-3 mr-1" /> Edit
        </Button>
      </CardFooter>
    </Card>
  );
};

interface TemplateCardProps {
  title: string;
  description: string;
  theme: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ title, description, theme }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant="outline" className="bg-gray-50">{theme}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="outline" className="w-full">Use Template</Button>
      </CardFooter>
    </Card>
  );
};

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, icon }) => {
  return (
    <Card>
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

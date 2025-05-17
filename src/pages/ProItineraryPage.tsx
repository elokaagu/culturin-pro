
import React from 'react';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PencilRuler, FileText, Map, Image as ImageIcon, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ProItineraryPage: React.FC = () => {
  return (
    <ProDashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Itinerary Builder</h1>
            <p className="mt-1 text-gray-600">
              Create and manage your interactive travel itineraries
            </p>
          </div>
          <Button className="bg-[#1E1E1E] text-white hover:bg-[#000000]">
            <PencilRuler className="mr-2 h-4 w-4" />
            Create New Itinerary
          </Button>
        </div>
        
        <Tabs defaultValue="itineraries" className="w-full">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="itineraries">My Itineraries</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="story-mode">Story Mode</TabsTrigger>
          </TabsList>
          <TabsContent value="itineraries" className="mt-6">
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

interface ItineraryCardProps {
  title: string;
  days: number;
  lastUpdated: string;
  status: 'published' | 'draft';
  image: string;
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({ title, days, lastUpdated, status, image }) => {
  return (
    <Card className="overflow-hidden">
      <div className="h-40 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
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
      <CardFooter className="pt-2 text-xs text-gray-500">
        Last updated {lastUpdated}
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

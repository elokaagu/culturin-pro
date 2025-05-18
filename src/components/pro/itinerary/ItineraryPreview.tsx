
import React, { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  LayoutGrid, 
  Map, 
  Image as ImageIcon, 
  Plus,
  ChevronDown,
  Book,
  Pencil
} from 'lucide-react';
import Image from '@/components/ui/image';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ItineraryPreviewProps {
  itinerary?: any;
}

const ItineraryPreview: React.FC<ItineraryPreviewProps> = ({ itinerary }) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [view, setView] = useState<'visual' | 'map'>('visual');
  
  // If no itinerary is provided, show a placeholder
  if (!itinerary) {
    return (
      <div className="flex flex-col h-full border-l border-r">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8" onClick={() => setView('visual')}>
              <ImageIcon className="h-4 w-4 mr-1" /> Visual
            </Button>
            <Button variant="outline" size="sm" className="h-8" onClick={() => setView('map')}>
              <Map className="h-4 w-4 mr-1" /> Map View
            </Button>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={viewMode === 'desktop' ? 'default' : 'outline'} 
              size="sm" 
              className="h-8"
              onClick={() => setViewMode('desktop')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'mobile' ? 'default' : 'outline'} 
              size="sm" 
              className="h-8"
              onClick={() => setViewMode('mobile')}
            >
              <div className="w-3 h-5 border-2 border-current rounded-sm" />
            </Button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Preview Available</h3>
            <p className="text-sm text-gray-500 max-w-md">
              Select or create an itinerary to view and edit its contents.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full border-l border-r">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex gap-2">
          <Button 
            variant={view === 'visual' ? 'default' : 'outline'} 
            size="sm" 
            className="h-8" 
            onClick={() => setView('visual')}
          >
            <ImageIcon className="h-4 w-4 mr-1" /> Visual
          </Button>
          <Button 
            variant={view === 'map' ? 'default' : 'outline'} 
            size="sm" 
            className="h-8" 
            onClick={() => setView('map')}
          >
            <Map className="h-4 w-4 mr-1" /> Map View
          </Button>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={viewMode === 'desktop' ? 'default' : 'outline'} 
            size="sm" 
            className="h-8"
            onClick={() => setViewMode('desktop')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === 'mobile' ? 'default' : 'outline'} 
            size="sm" 
            className="h-8"
            onClick={() => setViewMode('mobile')}
          >
            <div className="w-3 h-5 border-2 border-current rounded-sm" />
          </Button>
        </div>
      </div>

      <div className={`flex-1 p-6 overflow-auto bg-gray-50 ${viewMode === 'mobile' ? 'flex justify-center' : ''}`}>
        <div 
          className={
            viewMode === 'mobile' 
              ? 'w-80 bg-white shadow-md rounded-lg h-[550px] overflow-auto' 
              : 'bg-white shadow-sm rounded-lg p-6'
          }
        >
          {view === 'visual' ? (
            <div className="space-y-8">
              <div className="relative">
                <AspectRatio ratio={16/9} className="bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <Image 
                    src={itinerary.image || "/lovable-uploads/31055680-5e98-433a-a30a-747997259663.png"} 
                    alt={itinerary.title} 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Button size="sm" variant="secondary" className="bg-white/80 hover:bg-white">
                      <Pencil className="h-4 w-4 mr-1" /> Edit Cover
                    </Button>
                  </div>
                </AspectRatio>
                <h1 className="text-2xl font-bold mb-2">{itinerary.title}</h1>
                <p className="text-gray-600">
                  {itinerary.description || 'Add a description for your itinerary.'}
                </p>
              </div>

              {itinerary.storyMode ? (
                // Story Mode Content
                <StoryModeContent />
              ) : (
                // Regular Itinerary Content
                <ItineraryDaysContent days={itinerary.days || 1} />
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="text-center">
                <Map className="h-10 w-10 mx-auto text-gray-400" />
                <p className="mt-2 text-gray-500">Interactive Map View</p>
                <p className="text-xs text-gray-400">Displays route visualization</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ItineraryDaysContent: React.FC<{ days: number }> = ({ days }) => {
  return (
    <>
      {[...Array(days)].map((_, index) => (
        <div className="space-y-4" key={index}>
          <h2 className="text-lg font-medium border-b pb-2 flex items-center justify-between">
            Day {index + 1}: {index === 0 ? 'Arrival' : `Exploration Day ${index}`}
            <Button variant="ghost" size="sm">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </h2>
          
          {index === 0 && (
            <div className="border rounded-md p-4">
              <h3 className="font-medium">Arrival & Welcome Experience</h3>
              <p className="text-sm text-gray-600 my-2">
                Welcome guests and help them settle in with a brief orientation.
              </p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>2:00 PM - 4:30 PM</span>
                <span>Welcome Ceremony</span>
              </div>
            </div>
          )}
          
          <div className="bg-gray-50 p-4 rounded-md border border-dashed border-gray-300 flex items-center justify-center">
            <Button variant="outline" size="sm" className="flex items-center">
              <Plus className="h-4 w-4 mr-1" /> Add Activity
            </Button>
          </div>
        </div>
      ))}
      
      <div className="bg-gray-50 p-4 rounded-md border border-dashed border-gray-300 flex items-center justify-center">
        <Button variant="outline" size="sm" className="flex items-center">
          <Plus className="h-4 w-4 mr-1" /> Add Day
        </Button>
      </div>
    </>
  );
};

const StoryModeContent: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-lg font-medium border-b pb-2 flex items-center">
          <Book className="h-5 w-5 mr-2 text-indigo-500" /> 
          Chapter 1: Beginning the Journey
        </h2>
        
        <Card className="border-l-4 border-l-indigo-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Introduction</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <p className="text-sm text-gray-600">
              The journey begins as travelers arrive and are introduced to the cultural significance of their upcoming experience.
            </p>
          </CardContent>
          <CardFooter className="pt-0 flex justify-end">
            <Button variant="ghost" size="sm">Edit</Button>
          </CardFooter>
        </Card>
        
        <div className="bg-gray-50 p-4 rounded-md border border-dashed border-gray-300 flex items-center justify-center">
          <Button variant="outline" size="sm" className="flex items-center">
            <Plus className="h-4 w-4 mr-1" /> Add Story Element
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-lg font-medium border-b pb-2 flex items-center">
          <Book className="h-5 w-5 mr-2 text-indigo-500" /> 
          Chapter 2: Cultural Immersion
        </h2>
        
        <div className="bg-gray-50 p-4 rounded-md border border-dashed border-gray-300 flex items-center justify-center">
          <Button variant="outline" size="sm" className="flex items-center">
            <Plus className="h-4 w-4 mr-1" /> Add Story Element
          </Button>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md border border-dashed border-gray-300 flex items-center justify-center">
        <Button variant="outline" size="sm" className="flex items-center">
          <Plus className="h-4 w-4 mr-1" /> Add Chapter
        </Button>
      </div>
      
      <div className="border-t pt-4">
        <h3 className="font-medium text-sm mb-2">Narrative Themes</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-indigo-50">Transformation</Badge>
          <Badge variant="outline" className="bg-indigo-50">Heritage</Badge>
          <Badge variant="outline" className="bg-indigo-50">Tradition</Badge>
          <Button variant="ghost" size="sm" className="h-6 text-xs">
            <Plus className="h-3 w-3 mr-1" /> Add Theme
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPreview;

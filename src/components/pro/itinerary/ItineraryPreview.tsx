
import React, { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, LayoutGrid, Map, Image as ImageIcon, Plus } from 'lucide-react';
import Image from '@/components/ui/image';

const ItineraryPreview: React.FC = () => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [view, setView] = useState<'visual' | 'map'>('visual');
  
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

      <div className={`flex-1 p-6 overflow-auto bg-gray-50 ${viewMode === 'mobile' ? 'flex justify-center' : ''}`}>
        <div 
          className={
            viewMode === 'mobile' 
              ? 'w-80 bg-white shadow-md rounded-lg h-[550px] overflow-hidden' 
              : 'bg-white shadow-sm rounded-lg p-6'
          }
        >
          {view === 'visual' ? (
            <div className="space-y-8">
              <div className="relative">
                <AspectRatio ratio={16/9} className="bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <Image 
                    src="/lovable-uploads/31055680-5e98-433a-a30a-747997259663.png" 
                    alt="Sacred Japan Journey" 
                    fill 
                    className="object-cover"
                  />
                </AspectRatio>
                <h1 className="text-2xl font-bold mb-2">Sacred Japan Journey</h1>
                <p className="text-gray-600">
                  Experience the spiritual heart of Japan through ancient temples, sacred mountains, and traditional ceremonies.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-medium border-b pb-2">Day 1: Arrival in Kyoto</h2>
                
                <div className="bg-gray-50 p-4 rounded-md border border-dashed border-gray-300 flex items-center justify-center">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Plus className="h-4 w-4 mr-1" /> Add Activity
                  </Button>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium">Fushimi Inari Shrine Visit</h3>
                  <p className="text-sm text-gray-600 my-2">
                    Walk through thousands of vermilion torii gates at this iconic shrine dedicated to Inari, the Shinto god of rice.
                  </p>
                  <AspectRatio ratio={16/9} className="bg-gray-100 rounded-md overflow-hidden my-3">
                    <Image 
                      src="/lovable-uploads/8ee97e98-fd03-4f2b-8d3e-dcb87af6a6ba.png" 
                      alt="Fushimi Inari Shrine" 
                      fill 
                      className="object-cover"
                    />
                  </AspectRatio>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>2:00 PM - 4:30 PM</span>
                    <span>Cultural Experience</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md border border-dashed border-gray-300 flex items-center justify-center">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Plus className="h-4 w-4 mr-1" /> Add Day
                </Button>
              </div>
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

export default ItineraryPreview;

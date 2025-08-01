
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bed, UtensilsCrossed, Camera, Landmark, MapPin, Bus, Navigation, Sun, Moon, Coffee, Music, Ticket, Bot } from 'lucide-react';

interface ModuleLibraryProps {
  // Removed isStoryMode prop since Story Mode is being removed
}

interface ModuleItem {
  id: string;
  title: string;
  description: string;
  type: string;
  icon: JSX.Element;
}

const ModuleLibrary: React.FC<ModuleLibraryProps> = () => {
  const standardModules: ModuleItem[] = [
    {
      id: 'accommodation',
      title: 'Accommodation',
      description: 'Hotel, hostel, camping, etc.',
      type: 'Accommodation',
      icon: <Bed className="h-4 w-4 text-blue-500" />
    },
    {
      id: 'meal',
      title: 'Meal',
      description: 'Restaurant, cafe, food experience',
      type: 'Meal',
      icon: <UtensilsCrossed className="h-4 w-4 text-orange-500" />
    },
    {
      id: 'attraction',
      title: 'Attraction',
      description: 'Museum, landmark, sightseeing',
      type: 'Attraction',
      icon: <Landmark className="h-4 w-4 text-purple-500" />
    },
    {
      id: 'transportation',
      title: 'Transportation',
      description: 'Bus, train, taxi, walking',
      type: 'Transportation',
      icon: <Bus className="h-4 w-4 text-green-500" />
    },
    {
      id: 'activity',
      title: 'Activity',
      description: 'Tour, workshop, experience',
      type: 'Activity',
      icon: <Navigation className="h-4 w-4 text-cyan-500" />
    },
    {
      id: 'photo',
      title: 'Photo Opportunity',
      description: 'Scenic views, photo spots',
      type: 'Photo Opportunity',
      icon: <Camera className="h-4 w-4 text-pink-500" />
    },
    {
      id: 'break',
      title: 'Break',
      description: 'Free time, rest, etc.',
      type: 'Break',
      icon: <Coffee className="h-4 w-4 text-amber-500" />
    },
    {
      id: 'location',
      title: 'Location',
      description: 'Meeting point, address',
      type: 'Location',
      icon: <MapPin className="h-4 w-4 text-red-500" />
    }
  ];

  const modules = standardModules;
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, module: ModuleItem) => {
    // Make a clean copy of the module data without React elements
    const transferData = {
      ...module,
      icon: null // Remove the icon as JSX elements can't be serialized
    };
    
    try {
      const jsonData = JSON.stringify(transferData);
      e.dataTransfer.setData('moduleData', jsonData);
      e.dataTransfer.effectAllowed = 'copy';
    } catch (error) {
      console.error('Error in drag start:', error);
    }
  };

  return (
    <div className="h-full border-r">
      <div className="p-4 border-b bg-gray-50">
        <h3 className="font-medium">Module Library</h3>
        <p className="text-xs text-gray-500 mt-1">Drag modules to the itinerary</p>
      </div>
      <ScrollArea className="h-[calc(100%-60px)]">
        <div className="p-4">
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            {/* Removed isStoryMode ? 'Story & Experience Modules' : 'Standard Modules' */}
            Standard Modules
          </h4>
          <div className="space-y-2">
            {modules.map((module) => (
              <div
                key={module.id}
                draggable
                onDragStart={(e) => handleDragStart(e, module)}
                className="border rounded-lg p-4 cursor-move bg-white hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-gray-100">
                    {module.icon}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-sm text-gray-900">{module.title}</span>
                    <p className="text-xs text-gray-500 mt-1">{module.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ModuleLibrary;

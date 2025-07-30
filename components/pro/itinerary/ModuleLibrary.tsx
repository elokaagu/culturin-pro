
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
      icon: <Moon className="h-4 w-4 text-indigo-500" />
    },
    {
      id: 'break',
      title: 'Break',
      description: 'Free time, rest, etc.',
      type: 'Break',
      icon: <Coffee className="h-4 w-4 text-brown-500" />
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
      e.dataTransfer.setData('moduleData', JSON.stringify(transferData));
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
                className="border rounded-md p-3 cursor-move bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  {module.icon}
                  <span className="ml-2 font-medium text-sm">{module.title}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{module.description}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ModuleLibrary;

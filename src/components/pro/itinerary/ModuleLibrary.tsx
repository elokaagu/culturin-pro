
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bed, UtensilsCrossed, Camera, Landmark, MapPin, Bus, Navigation, Sun, Moon, Coffee, Music, Ticket, Bot } from 'lucide-react';

interface ModuleLibraryProps {
  isStoryMode?: boolean;
}

interface ModuleItem {
  id: string;
  title: string;
  description: string;
  type: string;
  icon: JSX.Element;
}

const ModuleLibrary: React.FC<ModuleLibraryProps> = ({ isStoryMode = false }) => {
  const standardModules: ModuleItem[] = [
    {
      id: 'accommodation',
      title: 'Accommodation',
      description: 'Hotel, hostel, homestay, etc.',
      type: 'Accommodation',
      icon: <Bed className="h-4 w-4 text-blue-500" />
    },
    {
      id: 'meal',
      title: 'Meal',
      description: 'Restaurant, food stop, etc.',
      type: 'Meal',
      icon: <UtensilsCrossed className="h-4 w-4 text-orange-500" />
    },
    {
      id: 'photo',
      title: 'Photo Opportunity',
      description: 'Great spot for photography',
      type: 'Photo Opportunity',
      icon: <Camera className="h-4 w-4 text-pink-500" />
    },
    {
      id: 'attraction',
      title: 'Attraction',
      description: 'Museum, monument, etc.',
      type: 'Attraction',
      icon: <Landmark className="h-4 w-4 text-purple-500" />
    },
    {
      id: 'location',
      title: 'Location',
      description: 'Meeting point, specific place',
      type: 'Location',
      icon: <MapPin className="h-4 w-4 text-red-500" />
    },
    {
      id: 'transport',
      title: 'Transportation',
      description: 'Bus, train, taxi, etc.',
      type: 'Transportation',
      icon: <Bus className="h-4 w-4 text-green-500" />
    },
    {
      id: 'activity',
      title: 'Activity',
      description: 'Workshop, class, etc.',
      type: 'Activity',
      icon: <Navigation className="h-4 w-4 text-cyan-500" />
    },
    {
      id: 'morning',
      title: 'Morning Section',
      description: 'Start of day activities',
      type: 'Time Section',
      icon: <Sun className="h-4 w-4 text-yellow-500" />
    },
    {
      id: 'evening',
      title: 'Evening Section',
      description: 'End of day activities',
      type: 'Time Section',
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

  const storyModules: ModuleItem[] = [
    {
      id: 'narrative',
      title: 'Narrative Segment',
      description: 'Story section with cultural context',
      type: 'Narrative',
      icon: <Music className="h-4 w-4 text-teal-500" />
    },
    {
      id: 'experience',
      title: 'Interactive Experience',
      description: 'Hands-on cultural activity',
      type: 'Experience',
      icon: <Ticket className="h-4 w-4 text-amber-500" />
    },
    {
      id: 'journey',
      title: 'Journey Segment',
      description: 'Moving from one place to another',
      type: 'Journey',
      icon: <Bot className="h-4 w-4 text-blue-600" />
    }
  ];

  const modules = isStoryMode ? [...standardModules, ...storyModules] : standardModules;
  
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
            {isStoryMode ? 'Story & Experience Modules' : 'Standard Modules'}
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

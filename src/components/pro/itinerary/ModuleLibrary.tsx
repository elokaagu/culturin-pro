
import React, { useState } from 'react';
import { Search, Plus, LayoutGrid, Clock, MapPin, Utensils, Camera, Music, BookOpen, Users, CalendarClock, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ModuleLibraryProps {
  isStoryMode?: boolean;
}

const ModuleLibrary: React.FC<ModuleLibraryProps> = ({ isStoryMode = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const standardModules = [
    { id: 'm1', title: 'Activity', description: 'Regular activity or experience', icon: <LayoutGrid className="h-4 w-4" />, category: 'basic' },
    { id: 'm2', title: 'Tour', description: 'Guided exploration', icon: <Users className="h-4 w-4" />, category: 'basic' },
    { id: 'm3', title: 'Meal', description: 'Dining experience', icon: <Utensils className="h-4 w-4" />, category: 'basic' },
    { id: 'm4', title: 'Free Time', description: 'Unstructured leisure time', icon: <Clock className="h-4 w-4" />, category: 'basic' },
    { id: 'm5', title: 'Location', description: 'Place or venue', icon: <MapPin className="h-4 w-4" />, category: 'basic' },
    { id: 'm6', title: 'Photo Opportunity', description: 'Scenic photo spot', icon: <Camera className="h-4 w-4" />, category: 'media' },
    { id: 'm7', title: 'Cultural Performance', description: 'Music, dance, etc.', icon: <Music className="h-4 w-4" />, category: 'cultural' },
    { id: 'm8', title: 'Important Note', description: 'Highlight key information', icon: <TriangleAlert className="h-4 w-4" />, category: 'basic' },
    { id: 'm9', title: 'Scheduled Break', description: 'Rest period', icon: <CalendarClock className="h-4 w-4" />, category: 'basic' },
  ];
  
  const storyModules = [
    { id: 's1', title: 'Chapter Intro', description: 'Start of narrative section', icon: <BookOpen className="h-4 w-4" />, category: 'story' },
    { id: 's2', title: 'Story Element', description: 'Key narrative moment', icon: <BookOpen className="h-4 w-4" />, category: 'story' },
    { id: 's3', title: 'Cultural Context', description: 'Background information', icon: <BookOpen className="h-4 w-4" />, category: 'story' },
    { id: 's4', title: 'Character', description: 'Important person in story', icon: <Users className="h-4 w-4" />, category: 'story' },
    { id: 's5', title: 'Reflection Prompt', description: 'Guided personal reflection', icon: <BookOpen className="h-4 w-4" />, category: 'story' },
    { id: 's6', title: 'Transformation Moment', description: 'Key insight or change', icon: <BookOpen className="h-4 w-4" />, category: 'story' },
    ...standardModules.slice(4, 8) // Include some standard modules too
  ];
  
  const modules = isStoryMode ? storyModules : standardModules;
  
  const filteredModules = modules.filter(module => 
    module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDragStart = (e: React.DragEvent, module: any) => {
    e.dataTransfer.setData('moduleData', JSON.stringify(module));
    e.dataTransfer.effectAllowed = 'copy';
  };
  
  return (
    <div className="flex flex-col h-full border-r">
      <div className="p-4 border-b">
        <h3 className="font-medium mb-2">
          {isStoryMode ? 'Story Elements' : 'Module Library'}
        </h3>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${isStoryMode ? 'elements' : 'modules'}...`}
            className="w-full pl-8 pr-3 py-1.5 text-sm border rounded-md"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <div className="px-4 border-b">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="all" className="text-xs py-1.5">All</TabsTrigger>
            <TabsTrigger value="basic" className="text-xs py-1.5">
              {isStoryMode ? 'Narrative' : 'Basic'}
            </TabsTrigger>
            <TabsTrigger value="cultural" className="text-xs py-1.5">
              {isStoryMode ? 'Elements' : 'Cultural'}
            </TabsTrigger>
          </TabsList>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-4">
            <TabsContent value="all" className="m-0">
              <ModuleGrid 
                modules={filteredModules} 
                onDragStart={handleDragStart}
                isStoryMode={isStoryMode}
              />
            </TabsContent>
            
            <TabsContent value="basic" className="m-0">
              <ModuleGrid 
                modules={filteredModules.filter(m => 
                  isStoryMode ? m.category === 'story' : m.category === 'basic'
                )} 
                onDragStart={handleDragStart}
                isStoryMode={isStoryMode}
              />
            </TabsContent>
            
            <TabsContent value="cultural" className="m-0">
              <ModuleGrid 
                modules={filteredModules.filter(m => 
                  isStoryMode ? 
                    ['story', 'cultural'].includes(m.category) : 
                    m.category === 'cultural' || m.category === 'media'
                )} 
                onDragStart={handleDragStart}
                isStoryMode={isStoryMode}
              />
            </TabsContent>
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full text-sm flex items-center">
            <Plus className="h-4 w-4 mr-1" /> 
            Custom {isStoryMode ? 'Element' : 'Module'}
          </Button>
        </div>
      </Tabs>
    </div>
  );
};

interface ModuleGridProps {
  modules: any[];
  onDragStart: (e: React.DragEvent, module: any) => void;
  isStoryMode?: boolean;
}

const ModuleGrid: React.FC<ModuleGridProps> = ({ modules, onDragStart, isStoryMode = false }) => {
  if (modules.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        <p>No {isStoryMode ? 'elements' : 'modules'} found</p>
        <p className="text-sm">Try a different search term</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 gap-2">
      {modules.map(module => (
        <Card 
          key={module.id}
          className="cursor-move hover:shadow-sm hover:border-gray-300 transition-all"
          draggable
          onDragStart={(e) => onDragStart(e, module)}
        >
          <CardContent className="p-3 flex items-center gap-2">
            <div className={`p-1.5 rounded-full ${
              module.category === 'story' ? 'bg-indigo-100' :
              module.category === 'cultural' ? 'bg-amber-100' :
              module.category === 'media' ? 'bg-emerald-100' : 
              'bg-gray-100'
            }`}>
              {module.icon}
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{module.title}</p>
              <p className="text-xs text-gray-500">{module.description}</p>
            </div>
            <Badge variant="outline" className="text-[10px]">
              {module.category === 'story' ? 'Story' :
               module.category === 'cultural' ? 'Cultural' :
               module.category === 'media' ? 'Media' : 
               'Basic'}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ModuleLibrary;

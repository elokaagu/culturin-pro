
import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ModuleLibrary: React.FC = () => {
  const categories = ['All', 'Transport', 'Accommodation', 'Activities', 'Food', 'Media', 'Upsells'];
  const [filter, setFilter] = useState('All');
  
  // Handle drag start event
  const handleDragStart = (e: React.DragEvent, module: string, type: string) => {
    e.dataTransfer.setData('moduleType', type);
    e.dataTransfer.setData('moduleName', module);
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-medium mb-2">Module Library</h3>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search modules..."
            className="w-full border rounded-md pl-8 py-2 text-sm"
          />
        </div>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`text-xs px-2 py-1 rounded ${
                filter === category 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <Tabs defaultValue="blocks">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="blocks" className="text-xs">Blocks</TabsTrigger>
            <TabsTrigger value="templates" className="text-xs">Templates</TabsTrigger>
            <TabsTrigger value="saved" className="text-xs">Saved</TabsTrigger>
          </TabsList>
          
          <TabsContent value="blocks">
            <div className="space-y-4">
              <ModuleGroup 
                title="Transport" 
                modules={['Flight', 'Train', 'Private Transfer', 'Public Transit']} 
                onDragStart={handleDragStart}
                type="transport"
              />
              <ModuleGroup 
                title="Accommodation" 
                modules={['Hotel', 'Traditional Stay', 'Boutique', 'Home Stay']} 
                onDragStart={handleDragStart}
                type="accommodation"
              />
              <ModuleGroup 
                title="Activities" 
                modules={['Cultural Experience', 'Guided Tour', 'Workshop', 'Free Time']} 
                onDragStart={handleDragStart}
                type="activity"
              />
              <ModuleGroup 
                title="Food" 
                modules={['Restaurant', 'Street Food', 'Cooking Class', 'Market Visit']} 
                onDragStart={handleDragStart}
                type="food"
              />
              <ModuleGroup 
                title="Media" 
                modules={['Photo Gallery', 'Video', 'Audio Guide', 'Interactive Map']} 
                onDragStart={handleDragStart}
                type="media"
              />
              <ModuleGroup 
                title="Upsells" 
                modules={['Tea Ceremony', 'Private Guide', 'Photography Session', 'Local Elder Meeting', 'Special Dinner']} 
                onDragStart={handleDragStart}
                type="upsell"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="templates">
            <div className="space-y-3">
              <TemplateItem title="Full Day Template" description="Morning, lunch, afternoon activity, dinner" />
              <TemplateItem title="Arrival Day" description="Airport transfer, hotel check-in, welcome dinner" />
              <TemplateItem title="Cultural Immersion" description="Workshop, local meal, guided neighborhood walk" />
              <TemplateItem title="Checkout Experience" description="Personalized farewell, memory book, follow-up" />
            </div>
          </TabsContent>
          
          <TabsContent value="saved">
            <div className="flex items-center justify-center h-40 border rounded-md border-dashed">
              <p className="text-sm text-gray-500">No saved modules yet</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface ModuleGroupProps {
  title: string;
  modules: string[];
  type: string;
  onDragStart: (e: React.DragEvent, module: string, type: string) => void;
}

const ModuleGroup: React.FC<ModuleGroupProps> = ({ title, modules, onDragStart, type }) => {
  return (
    <div>
      <h4 className="text-xs font-medium text-gray-500 mb-2">{title}</h4>
      <div className="grid grid-cols-2 gap-2">
        {modules.map((module) => (
          <div 
            key={module} 
            className="border rounded p-2 text-xs cursor-move hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center justify-between"
            draggable
            onDragStart={(e) => onDragStart(e, module, type)}
          >
            <span>{module}</span>
            {type === 'upsell' && <Badge className="bg-green-100 text-green-800 text-[10px] px-1">Upsell</Badge>}
          </div>
        ))}
      </div>
      <Separator className="my-4" />
    </div>
  );
};

interface TemplateItemProps {
  title: string;
  description: string;
}

const TemplateItem: React.FC<TemplateItemProps> = ({ title, description }) => {
  return (
    <div className="border rounded p-3 hover:bg-gray-50 cursor-pointer">
      <h4 className="text-sm font-medium">{title}</h4>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
};

export default ModuleLibrary;

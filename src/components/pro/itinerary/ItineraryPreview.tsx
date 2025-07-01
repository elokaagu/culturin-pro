'use client'

import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Save, Eye } from 'lucide-react';
import { ItineraryType } from '@/data/itineraryData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { 
import Image from "@/components/ui/image";
  Bed, UtensilsCrossed, Camera, Landmark, MapPin, Bus, 
  Navigation, Sun, Moon, Coffee, Music, Ticket, Bot
} from 'lucide-react';

interface ItineraryPreviewProps {
  itinerary: ItineraryType;
  onSaveChanges?: () => void;
}

interface ItineraryModule {
  id: string;
  title: string;
  type: string;
  description: string;
  position: number;
  day: number;
  icon?: JSX.Element;
  properties?: Record<string, any>;
}

const ItineraryPreview: React.FC<ItineraryPreviewProps> = ({ itinerary, onSaveChanges }) => {
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [activeDay, setActiveDay] = useState(1);
  const [modules, setModules] = useState<ItineraryModule[]>([]);
  const [editingModule, setEditingModule] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Reset modules when itinerary changes
  useEffect(() => {
    if (itinerary.id) {
      setModules([]);
      setActiveDay(1);
    }
  }, [itinerary.id]);

  // Create tabs for each day in the itinerary
  const dayTabs = Array.from({ length: itinerary.days || 3 }, (_, i) => i + 1);
  
  // Get the appropriate icon based on module type
  const getModuleIcon = (type: string) => {
    switch(type) {
      case 'Accommodation': return <Bed className="h-4 w-4 text-blue-500" />;
      case 'Meal': return <UtensilsCrossed className="h-4 w-4 text-orange-500" />;
      case 'Photo Opportunity': return <Camera className="h-4 w-4 text-pink-500" />;
      case 'Attraction': return <Landmark className="h-4 w-4 text-purple-500" />;
      case 'Location': return <MapPin className="h-4 w-4 text-red-500" />;
      case 'Transportation': return <Bus className="h-4 w-4 text-green-500" />;
      case 'Activity': return <Navigation className="h-4 w-4 text-cyan-500" />;
      case 'Time Section': return <Sun className="h-4 w-4 text-yellow-500" />;
      case 'Break': return <Coffee className="h-4 w-4 text-brown-500" />;
      case 'Narrative': return <Music className="h-4 w-4 text-teal-500" />;
      case 'Experience': return <Ticket className="h-4 w-4 text-amber-500" />;
      case 'Journey': return <Bot className="h-4 w-4 text-blue-600" />;
      default: return <Landmark className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, day: number) => {
    e.preventDefault();
    
    try {
      const moduleData = e.dataTransfer.getData('moduleData');
      if (!moduleData) {
        console.log("No module data found in drop event");
        return;
      }
      
      const moduleInfo = JSON.parse(moduleData);
      
      // Add icon back based on type since it couldn't be serialized
      const newModule: ItineraryModule = {
        ...moduleInfo,
        id: `${moduleInfo.id}-${Date.now()}`,
        day,
        position: modules.filter(m => m.day === day).length,
        properties: {},
        icon: getModuleIcon(moduleInfo.type)
      };
      
      setModules(prev => [...prev, newModule]);
      toast({
        title: "Module Added",
        description: `Added ${moduleInfo.title} to Day ${day}`,
      });
    } catch (err) {
      console.error("Failed to parse module data:", err);
      toast({
        title: "Error",
        description: "Failed to add module. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDelete = (moduleId: string) => {
    setModules(prev => prev.filter(m => m.id !== moduleId));
    setEditingModule(null);
    toast({
      title: "Module Removed",
      description: "Module has been removed from the itinerary",
    });
  };

  const handleEdit = (moduleId: string) => {
    setEditingModule(moduleId === editingModule ? null : moduleId);
  };

  const handlePropertyChange = (moduleId: string, property: string, value: any) => {
    setModules(prev => prev.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          properties: {
            ...(m.properties || {}),
            [property]: value
          }
        };
      }
      return m;
    }));
  };

  const handleSaveChanges = () => {
    // In a real application, this would save to a backend
    toast({
      title: "Changes Saved",
      description: "Your itinerary changes have been published successfully.",
    });
    if (onSaveChanges) onSaveChanges();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-medium">
          {itinerary.storyMode ? 'Story Journey' : 'Travel Itinerary'}: {itinerary.title}
        </h3>
        <div className="flex gap-2">
          <div className="border rounded-md overflow-hidden">
            <Button 
              variant={viewMode === 'edit' ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode('edit')}
              className="rounded-none"
            >
              Edit
            </Button>
            <Button 
              variant={viewMode === 'preview' ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode('preview')}
              className="rounded-none"
              aria-label="Preview"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
          <Button size="sm" onClick={handleSaveChanges}>
            <Save className="h-4 w-4 mr-1" /> Save Changes
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue={String(activeDay)} onValueChange={(value) => setActiveDay(Number(value))} className="flex-1">
        <div className="border-b sticky top-0 bg-white z-10">
          <TabsList className="mx-4 my-2">
            {dayTabs.map((day) => (
              <TabsTrigger key={day} value={String(day)}>
                {itinerary.storyMode ? `Chapter ${day}` : `Day ${day}`}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        <ScrollArea className="flex-1">
          {dayTabs.map((day) => (
            <TabsContent key={day} value={String(day)} className="m-0 p-0">
              <div 
                className="min-h-[400px] p-4"
                onDrop={(e) => handleDrop(e, day)}
                onDragOver={handleDragOver}
              >
                <div className="border-2 border-dashed rounded-lg p-4 mb-4 bg-gray-50 text-center">
                  <p className="text-gray-500">
                    {modules.filter(m => m.day === day).length === 0 ? (
                      "Drag modules here to build your itinerary"
                    ) : (
                      "Drag more modules or rearrange existing ones"
                    )}
                  </p>
                </div>
                
                {modules
                  .filter(module => module.day === day)
                  .sort((a, b) => a.position - b.position)
                  .map((module) => (
                    <div 
                      key={module.id} 
                      className="border rounded-lg mb-4 overflow-hidden"
                    >
                      <div className="bg-white p-3 flex justify-between items-center">
                        <div className="flex items-center">
                          {module.icon}
                          <span className="ml-2 font-medium">{module.title}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEdit(module.id)}
                          >
                            {editingModule === module.id ? 'Done' : 'Edit'}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDelete(module.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                      
                      {editingModule === module.id && (
                        <div className="bg-gray-50 p-4 border-t">
                          <h4 className="font-medium mb-2">Edit Properties</h4>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                              </label>
                              <input 
                                type="text"
                                className="w-full p-2 border rounded-md"
                                value={module.properties?.title || ''}
                                onChange={(e) => handlePropertyChange(module.id, 'title', e.target.value)}
                                placeholder="Enter title..."
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                              </label>
                              <textarea 
                                className="w-full p-2 border rounded-md"
                                rows={3}
                                value={module.properties?.description || ''}
                                onChange={(e) => handlePropertyChange(module.id, 'description', e.target.value)}
                                placeholder="Enter description..."
                              />
                            </div>
                            
                            {module.type === 'Photo Opportunity' && (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Upload Image
                                </label>
                                <input 
                                  type="file" 
                                  accept="image/*"
                                  className="w-full border rounded-md p-2"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      // In a real app, this would upload to a server and get a URL
                                      const fileReader = new FileReader();
                                      fileReader.onload = (event) => {
                                        handlePropertyChange(module.id, 'imageUrl', event.target?.result);
                                      };
                                      fileReader.readAsDataURL(file);
                                    }
                                  }}
                                />
                                {module.properties?.imageUrl && (
                                  <div className="mt-2">
                                    <img 
                                      src={module.properties.imageUrl} 
                                      alt="Uploaded" 
                                      className="w-full h-40 object-cover rounded-md"
                                    />
                                  </div>
                                )}
                              </div>
                            )}

                            {module.type === 'Location' && (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Address
                                </label>
                                <input 
                                  type="text"
                                  className="w-full p-2 border rounded-md"
                                  value={module.properties?.address || ''}
                                  onChange={(e) => handlePropertyChange(module.id, 'address', e.target.value)}
                                  placeholder="Enter address..."
                                />
                              </div>
                            )}
                            
                            {module.type === 'Meal' && (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Restaurant Name
                                </label>
                                <input 
                                  type="text"
                                  className="w-full p-2 border rounded-md"
                                  value={module.properties?.restaurant || ''}
                                  onChange={(e) => handlePropertyChange(module.id, 'restaurant', e.target.value)}
                                  placeholder="Enter restaurant name..."
                                />
                              </div>
                            )}
                            
                            {(module.type === 'Activity' || module.type === 'Tour') && (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Duration (hours)
                                </label>
                                <input 
                                  type="number"
                                  className="w-full p-2 border rounded-md"
                                  value={module.properties?.duration || ''}
                                  onChange={(e) => handlePropertyChange(module.id, 'duration', e.target.value)}
                                  placeholder="Enter duration in hours..."
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {!editingModule && (module.properties?.title || module.properties?.description) && (
                        <div className="p-3 border-t">
                          {module.properties?.title && (
                            <h4 className="font-medium mb-1">{module.properties.title}</h4>
                          )}
                          {module.properties?.description && (
                            <p className="text-sm text-gray-700">{module.properties.description}</p>
                          )}
                          {module.properties?.imageUrl && (
                            <img 
                              src={module.properties.imageUrl} 
                              alt={module.properties.title || 'Module image'} 
                              className="mt-2 w-full h-40 object-cover rounded-md"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default ItineraryPreview;

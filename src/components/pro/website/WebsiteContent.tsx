
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
  DraggableProvided,
} from '@hello-pangea/dnd';
import { Plus, GripVertical, Trash2, Upload, Image } from 'lucide-react';
import { toast } from 'sonner';

// Mock experience data
const experiences = [
  {
    id: 'exp1',
    title: 'Traditional Cooking Class',
    active: true
  },
  {
    id: 'exp2',
    title: 'City Walking Tour',
    active: true
  },
  {
    id: 'exp3',
    title: 'Cultural Heritage Tour',
    active: false
  }
];

// Mock sections
const sections = [
  { 
    id: 'header', 
    name: 'Header & Navigation', 
    fixed: true
  },
  { 
    id: 'hero', 
    name: 'Hero Banner', 
    fixed: false
  },
  { 
    id: 'about', 
    name: 'About Us', 
    fixed: false
  },
  { 
    id: 'experiences', 
    name: 'Featured Experiences', 
    fixed: false
  },
  { 
    id: 'testimonials', 
    name: 'Testimonials', 
    fixed: false
  },
  { 
    id: 'contact', 
    name: 'Contact Information', 
    fixed: false
  }
];

const WebsiteContent: React.FC = () => {
  const [sectionList, setSectionList] = React.useState(sections);
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(sectionList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setSectionList(items);
    toast.success("Section order updated");
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card>
          <CardContent className="p-5">
            <h3 className="text-lg font-medium mb-4">General Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Business Name</label>
                <Input defaultValue="Cultural Explorations" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Tagline</label>
                <Input defaultValue="Authentic cultural experiences with local hosts" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">About your business</label>
                <Textarea defaultValue="We provide authentic cultural experiences led by expert local hosts. Our mission is to connect travelers with genuine local traditions and customs through immersive activities." rows={4} />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Logo</label>
                <div className="flex items-center gap-3">
                  <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center border">
                    <Image className="h-6 w-6 text-gray-400" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" /> Upload Logo
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-5">
            <h3 className="text-lg font-medium mb-4">Experiences to Display</h3>
            
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id} className="flex items-center space-x-3">
                  <Checkbox id={exp.id} defaultChecked={exp.active} />
                  <label htmlFor={exp.id} className="text-sm font-medium cursor-pointer">
                    {exp.title}
                  </label>
                </div>
              ))}
            </div>
            
            <Button className="mt-4 w-full" variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" /> Add More Experiences
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardContent className="p-5">
            <h3 className="text-lg font-medium mb-4">Page Structure</h3>
            <p className="text-sm text-gray-500 mb-4">
              Drag sections to reorder them on your page
            </p>
            
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="sections">
                {(provided: DroppableProvided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    {sectionList.map((section, index) => (
                      <Draggable
                        key={section.id}
                        draggableId={section.id}
                        index={index}
                        isDragDisabled={section.fixed}
                      >
                        {(provided: DraggableProvided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`flex items-center justify-between p-3 rounded-md bg-white border ${
                              section.fixed ? 'bg-gray-50' : 'hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              {!section.fixed && (
                                <div {...provided.dragHandleProps}>
                                  <GripVertical className="h-5 w-5 text-gray-400" />
                                </div>
                              )}
                              <span className="font-medium">{section.name}</span>
                              {section.fixed && (
                                <span className="text-xs text-gray-500">(Fixed)</span>
                              )}
                            </div>
                            
                            {!section.fixed && (
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-gray-500 hover:text-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            
            <Button className="mt-4 w-full" variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" /> Add New Section
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-5">
            <h3 className="text-lg font-medium mb-4">Business Owner</h3>
            
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <Input defaultValue="Jane Doe" className="mb-2" placeholder="Your name" />
                <Textarea 
                  defaultValue="Passionate cultural guide with 10+ years of experience showcasing authentic local traditions." 
                  placeholder="Short bio"
                  rows={2}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WebsiteContent;

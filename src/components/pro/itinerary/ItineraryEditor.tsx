
import React from 'react';
import { Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ModuleLibrary from '@/components/pro/itinerary/ModuleLibrary';
import ItineraryPreview from '@/components/pro/itinerary/ItineraryPreview';
import AIContentAssistant from '@/components/pro/itinerary/AIContentAssistant';
import { ItineraryType } from '@/data/itineraryData';

interface ItineraryEditorProps {
  showEditor: boolean;
  selectedItinerary: ItineraryType | null;
  showAIAssistant: boolean;
  onAIAssistantClose: () => void;
  onEditorClose: () => void;
}

const ItineraryEditor: React.FC<ItineraryEditorProps> = ({
  showEditor,
  selectedItinerary,
  showAIAssistant,
  onAIAssistantClose,
  onEditorClose,
}) => {
  const { toast } = useToast();

  if (!showEditor || !selectedItinerary) {
    return null;
  }

  return (
    <Collapsible 
      open={true} 
      className="border rounded-lg overflow-hidden bg-white"
    >
      <CollapsibleTrigger asChild>
        <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
          <div className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            <h3 className="font-medium">
              {selectedItinerary.storyMode ? 'Story Editor' : 'Itinerary Editor'}: {selectedItinerary.title}
            </h3>
          </div>
          <Badge variant="outline">
            {selectedItinerary.status === 'published' ? 'Published' : 'Draft'}
          </Badge>
        </div>
      </CollapsibleTrigger>
      <Separator />
      <CollapsibleContent>
        <ResizablePanelGroup direction="horizontal" className="min-h-[600px]">
          <ResizablePanel defaultSize={25}>
            <ModuleLibrary isStoryMode={selectedItinerary.storyMode} />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={50}>
            <ItineraryPreview itinerary={selectedItinerary} />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={25}>
            {showAIAssistant ? (
              <AIContentAssistant onClose={onAIAssistantClose} />
            ) : (
              <div className="flex flex-col h-full p-4 border-l">
                <h3 className="font-medium mb-4">Properties</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Title</label>
                    <input 
                      type="text" 
                      className="w-full border p-2 rounded-md text-sm" 
                      value={selectedItinerary.title || ''}
                      onChange={() => {}}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Description</label>
                    <textarea 
                      className="w-full border p-2 rounded-md text-sm" 
                      rows={3}
                      value={selectedItinerary.description || ''}
                      onChange={() => {}}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Status</label>
                    <select className="w-full border p-2 rounded-md text-sm">
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <Button 
                    className="w-full mt-4"
                    onClick={() => {
                      toast({
                        title: "Itinerary Saved",
                        description: "Your changes have been saved successfully."
                      });
                      onEditorClose();
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ItineraryEditor;

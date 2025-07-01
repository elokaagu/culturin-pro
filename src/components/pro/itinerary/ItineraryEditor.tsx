'use client'
import React, { useState, useEffect } from "react";
import { Edit, Save, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "../../../../lib/navigation";
import ModuleLibrary from "@/components/pro/itinerary/ModuleLibrary";
import ItineraryPreview from "@/components/pro/itinerary/ItineraryPreview";
import AIContentAssistant from "@/components/pro/itinerary/AIContentAssistant";
import { ItineraryType } from "@/data/itineraryData";
import Image from "@/components/ui/image";

interface ItineraryEditorProps {
  showEditor: boolean;
  selectedItinerary: ItineraryType | null;
  showAIAssistant: boolean;
  onAIAssistantClose: () => void;
  onEditorClose: () => void;
  onItinerarySave?: (itinerary: ItineraryType) => void;
}

const ItineraryEditor: React.FC<ItineraryEditorProps> = ({
  showEditor,
  selectedItinerary,
  showAIAssistant,
  onAIAssistantClose,
  onEditorClose,
  onItinerarySave,
}) => {
  const { toast } = useToast();
  const [itinerary, setItinerary] = useState<ItineraryType | null>(
    selectedItinerary
  );
  const [isPublishing, setIsPublishing] = useState(false);

  // Update local state when selectedItinerary changes
  useEffect(() => {
    setItinerary(selectedItinerary);
  }, [selectedItinerary]);

  if (!showEditor || !itinerary) {
    return null;
  }

  const handlePropertyChange = (property: keyof ItineraryType, value: any) => {
    setItinerary((prev) => {
      if (!prev) return prev;
      return { ...prev, [property]: value };
    });
  };

  const handleSaveChanges = () => {
    setIsPublishing(true);

    // Simulate API call with timeout
    setTimeout(() => {
      if (itinerary && onItinerarySave) {
        const updatedItinerary = {
          ...itinerary,
          lastUpdated: "just now",
        };
        onItinerarySave(updatedItinerary);
      }

      toast({
        title: "Itinerary Published",
        description: "Your itinerary has been successfully published.",
      });

      setIsPublishing(false);
      onEditorClose();
    }, 1000);
  };

  const handlePreviewSaveChanges = () => {
    if (itinerary && onItinerarySave) {
      const updatedItinerary = {
        ...itinerary,
        lastUpdated: "just now",
      };
      onItinerarySave(updatedItinerary);
    }

    toast({
      title: "Changes Saved",
      description: "Your changes have been saved to the preview.",
    });
  };

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
              {itinerary.storyMode ? "Story Editor" : "Itinerary Editor"}:{" "}
              {itinerary.title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link
                to={`/product/booking-preview/${itinerary.id}`}
                target="_blank"
              >
                <ExternalLink className="h-4 w-4 mr-1" /> Preview Booking
              </Link>
            </Button>
            <Badge variant="outline">
              {itinerary.status === "published" ? "Published" : "Draft"}
            </Badge>
          </div>
        </div>
      </CollapsibleTrigger>
      <Separator />
      <CollapsibleContent>
        <ResizablePanelGroup direction="horizontal" className="min-h-[600px]">
          <ResizablePanel defaultSize={25}>
            <ModuleLibrary isStoryMode={itinerary.storyMode || false} />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={50}>
            <ItineraryPreview
              itinerary={itinerary}
              onSaveChanges={handlePreviewSaveChanges}
            />
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
                      value={itinerary.title || ""}
                      onChange={(e) =>
                        handlePropertyChange("title", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Description</label>
                    <textarea
                      className="w-full border p-2 rounded-md text-sm"
                      rows={3}
                      value={itinerary.description || ""}
                      onChange={(e) =>
                        handlePropertyChange("description", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Days</label>
                    <input
                      type="number"
                      className="w-full border p-2 rounded-md text-sm"
                      value={itinerary.days || 1}
                      onChange={(e) =>
                        handlePropertyChange(
                          "days",
                          parseInt(e.target.value) || 1
                        )
                      }
                      min={1}
                      max={30}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Status</label>
                    <select
                      className="w-full border p-2 rounded-md text-sm"
                      value={itinerary.status}
                      onChange={(e) =>
                        handlePropertyChange(
                          "status",
                          e.target.value as "draft" | "published"
                        )
                      }
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Cover Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full border p-2 rounded-md text-sm"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Simulating image upload (in a real app, we would upload to a server)
                          const reader = new FileReader();
                          reader.onload = () => {
                            handlePropertyChange(
                              "image",
                              reader.result as string
                            );
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    {itinerary.image && (
                      <div className="mt-2">
                        <img
                          src={itinerary.image}
                          alt="Cover"
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
                  <Button
                    className="w-full mt-4"
                    onClick={handleSaveChanges}
                    disabled={isPublishing}
                  >
                    {isPublishing ? (
                      "Publishing..."
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-1" /> Publish Changes
                      </>
                    )}
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

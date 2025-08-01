'use client'
import React, { useState, useEffect } from "react";
import { Edit, Save, ExternalLink, Globe, Eye } from "lucide-react";
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
import { Link } from "../../../lib/navigation";
import ModuleLibrary from "@/components/pro/itinerary/ModuleLibrary";
import ItineraryPreview from "@/components/pro/itinerary/ItineraryPreview";
import AIContentAssistant from "@/components/pro/itinerary/AIContentAssistant";
import { ItineraryType } from "@/data/itineraryData";
import Image from "@/components/ui/image";
import { itineraryService } from "@/lib/itinerary-service";

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
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSaveChanges = async () => {
    if (!itinerary) return;

    setIsSaving(true);

    try {
      let savedItinerary: ItineraryType;

      if (
        itinerary.id.startsWith("temp-") ||
        itinerary.id.startsWith("duplicate-")
      ) {
        // Create new itinerary
        const { id, lastUpdated, ...itineraryData } = itinerary;
        savedItinerary = await itineraryService.createItinerary(itineraryData);
      } else {
        // Update existing itinerary
        savedItinerary = await itineraryService.updateItinerary(
          itinerary.id,
          itinerary
        );
      }

      if (onItinerarySave) {
        onItinerarySave(savedItinerary);
      }

      toast({
        title: "Itinerary Saved",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving itinerary:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to save itinerary",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!itinerary) return;

    // Validate required fields before publishing
    if (!itinerary.title || !itinerary.title.trim()) {
      toast({
        title: "Cannot Publish",
        description: "Please add a title to your itinerary before publishing.",
        variant: "destructive",
      });
      return;
    }

    if (!itinerary.description || !itinerary.description.trim()) {
      toast({
        title: "Cannot Publish",
        description: "Please add a description to your itinerary before publishing.",
        variant: "destructive",
      });
      return;
    }

    setIsPublishing(true);

    try {
      // Set status to published
      const publishedItinerary = {
        ...itinerary,
        status: "published" as const,
        lastUpdated: "just now",
      };

      let savedItinerary: ItineraryType;

      if (
        itinerary.id.startsWith("temp-") ||
        itinerary.id.startsWith("duplicate-")
      ) {
        // Create new itinerary as published
        const { id, lastUpdated, ...itineraryData } = publishedItinerary;
        savedItinerary = await itineraryService.createItinerary(itineraryData);
      } else {
        // Update existing itinerary as published
        savedItinerary = await itineraryService.updateItinerary(
          itinerary.id,
          publishedItinerary
        );
      }

      // Update local state
      setItinerary(savedItinerary);

      if (onItinerarySave) {
        onItinerarySave(savedItinerary);
      }

      toast({
        title: "Itinerary Published! 🎉",
        description: "Your itinerary is now live and visible to travelers.",
      });

    } catch (error) {
      console.error("Error publishing itinerary:", error);
      toast({
        title: "Publish Failed",
        description:
          error instanceof Error
            ? error.message
            : "Failed to publish itinerary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleUnpublish = async () => {
    if (!itinerary) return;

    setIsPublishing(true);

    try {
      // Set status back to draft
      const draftItinerary = {
        ...itinerary,
        status: "draft" as const,
        lastUpdated: "just now",
      };

      const savedItinerary = await itineraryService.updateItinerary(
        itinerary.id,
        draftItinerary
      );

      // Update local state
      setItinerary(savedItinerary);

      if (onItinerarySave) {
        onItinerarySave(savedItinerary);
      }

      toast({
        title: "Itinerary Unpublished",
        description: "Your itinerary is now back to draft status.",
      });

    } catch (error) {
      console.error("Error unpublishing itinerary:", error);
      toast({
        title: "Unpublish Failed",
        description:
          error instanceof Error
            ? error.message
            : "Failed to unpublish itinerary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
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

  const isPublished = itinerary.status === "published";

  return (
    <Collapsible
      open={true}
      className="border rounded-lg overflow-hidden bg-white"
    >
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              Itinerary Editor: {selectedItinerary.title}
            </h2>
            <Badge variant="outline" className="text-xs">
              {selectedItinerary.status}
            </Badge>
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
            <ModuleLibrary />
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

                  {/* Publish/Unpublish Button */}
                  {isPublished ? (
                    <Button
                      variant="outline"
                      className="w-full mt-4 bg-yellow-50 text-yellow-700 border-yellow-300 hover:bg-yellow-100"
                      onClick={handleUnpublish}
                      disabled={isPublishing}
                    >
                      {isPublishing ? (
                        "Unpublishing..."
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-2" />
                          Unpublish Itinerary
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
                      onClick={handlePublish}
                      disabled={isPublishing}
                    >
                      {isPublishing ? (
                        "Publishing..."
                      ) : (
                        <>
                          <Globe className="h-4 w-4 mr-2" />
                          Publish Itinerary
                        </>
                      )}
                    </Button>
                  )}

                  {/* Save Changes Button */}
                  <Button
                    className="w-full mt-2"
                    onClick={handleSaveChanges}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      "Saving..."
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-1" /> Save Changes
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

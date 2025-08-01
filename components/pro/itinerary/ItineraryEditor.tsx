import React, { useState, useEffect } from "react";
import {
  Edit,
  Save,
  ExternalLink,
  Image as ImageIcon,
  ShoppingCart,
  Plus,
  X,
  Sparkles,
  Globe,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "../../../lib/navigation";
import ModuleLibrary from "@/components/pro/itinerary/ModuleLibrary";
import ItineraryPreview from "@/components/pro/itinerary/ItineraryPreview";
import AIContentAssistant from "@/components/pro/itinerary/AIContentAssistant";
import { ItineraryType } from "@/data/itineraryData";
import Image from "@/components/ui/image";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [itinerary, setItinerary] = useState<ItineraryType | null>(
    selectedItinerary
  );
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);

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

      // Show success message with next steps
      setTimeout(() => {
        toast({
          title: "Next Steps",
          description: "Share your itinerary link with potential travelers or add it to your website.",
        });
      }, 2000);

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

  const isPublished = itinerary.status === "published";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl h-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold">Itinerary Editor</h2>
            {isPublished && (
              <Badge className="bg-green-100 text-green-800">
                <Globe className="h-3 w-3 mr-1" />
                Published
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onEditorClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={25} minSize={20}>
                         <div className="p-6 h-full overflow-y-auto">
               <ModuleLibrary />
             </div>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={50}>
            <div className="p-6 h-full overflow-y-auto">
              <div className="space-y-6">
                {/* Title and Description */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Itinerary Title
                    </label>
                    {editingTitle ? (
                      <div className="flex items-center space-x-2 mt-1">
                        <Input
                          value={itinerary.title}
                          onChange={(e) =>
                            handlePropertyChange("title", e.target.value)
                          }
                          onBlur={() => setEditingTitle(false)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") setEditingTitle(false);
                          }}
                          autoFocus
                        />
                      </div>
                    ) : (
                      <div
                        className="flex items-center space-x-2 mt-1 cursor-pointer hover:bg-gray-50 p-2 rounded"
                        onClick={() => setEditingTitle(true)}
                      >
                        <h3 className="text-lg font-semibold">
                          {itinerary.title || "Untitled Itinerary"}
                        </h3>
                        <Edit className="h-4 w-4 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Description
                    </label>
                    {editingDescription ? (
                      <div className="mt-1">
                        <Textarea
                          value={itinerary.description || ""}
                          onChange={(e) =>
                            handlePropertyChange("description", e.target.value)
                          }
                          onBlur={() => setEditingDescription(false)}
                          placeholder="Describe your itinerary..."
                          rows={3}
                        />
                      </div>
                    ) : (
                      <div
                        className="mt-1 cursor-pointer hover:bg-gray-50 p-2 rounded"
                        onClick={() => setEditingDescription(true)}
                      >
                        <p className="text-gray-600">
                          {itinerary.description || "Add a description..."}
                        </p>
                        <Edit className="h-4 w-4 text-gray-400 mt-1" />
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Itinerary Content */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-4">
                    Drag more modules or rearrange existing ones
                  </h4>
                  <p className="text-xs text-gray-500 mb-4">
                    Available modules: Accommodation, Meal, Attraction,
                    Transportation, Activity, Photo, Break, Location
                  </p>

                  {/* Sample modules - in a real app, these would be dynamic */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-600 text-sm">🍽️</span>
                        </div>
                        <div>
                          <p className="font-medium">Local</p>
                          <p className="text-sm text-gray-500">
                            09:00 (1h) • Restaurant, cafe, food experience
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-500">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-sm">✈️</span>
                        </div>
                        <div>
                          <p className="font-medium">Activity</p>
                          <p className="text-sm text-gray-500">
                            09:00 (1h) • Tour, workshop, experience
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-500">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={25}>
            <div className="p-6 h-full overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg py-3 rounded-xl shadow-lg transition-all duration-300"
                    onClick={() => {
                      toast({
                        title: "AI Assistant",
                        description:
                          "Your itinerary request is being processed...",
                      });
                    }}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Itinerary
                  </Button>
                </div>

                <div className="space-y-4">
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

                  {/* Publish/Unpublish Button */}
                  {isPublished ? (
                    <Button
                      variant="outline"
                      className="w-full mt-4 bg-yellow-50 text-yellow-700 border-yellow-300 hover:bg-yellow-100 transition-all duration-300"
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
                      className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white text-lg py-3 rounded-xl shadow-lg transition-all duration-300"
                      onClick={handlePublish}
                      disabled={isPublishing}
                    >
                      {isPublishing ? (
                        "Publishing..."
                      ) : (
                        <>
                          <Globe className="h-5 w-5 mr-2" />
                          Publish Itinerary
                        </>
                      )}
                    </Button>
                  )}

                  {/* Save Changes Button */}
                  <Button
                    className="w-full mt-2 bg-culturin-indigo hover:bg-culturin-indigo/90 text-white py-3 rounded-xl shadow-lg transition-all duration-300"
                    onClick={handleSaveChanges}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      "Saving..."
                    ) : (
                      <>
                        <Save className="h-5 w-5 mr-2" /> Save Changes
                      </>
                    )}
                  </Button>

                  {/* Status Display */}
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="text-sm text-gray-500">Status</label>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-medium">
                        {isPublished ? "Published" : "Draft"}
                      </span>
                      <Badge 
                        variant={isPublished ? "default" : "secondary"}
                        className={isPublished ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                      >
                        {isPublished ? "Live" : "Draft"}
                      </Badge>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full mt-2 text-culturin-indigo border-culturin-indigo hover:bg-culturin-indigo/10 transition-all duration-300"
                    onClick={() =>
                      router.push(`/product/booking-preview/${itinerary.id}`)
                    }
                  >
                    <ExternalLink className="h-4 w-4 mr-1" /> Preview Booking
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full mt-2 text-culturin-indigo border-culturin-indigo hover:bg-culturin-indigo/10 transition-all duration-300"
                    onClick={() => {
                      const duplicateItinerary = {
                        ...itinerary,
                        id: `duplicate-${Date.now()}`,
                        title: `${itinerary.title} (Copy)`,
                        status: "draft" as const,
                        lastUpdated: "just now",
                      };
                      if (onItinerarySave) {
                        onItinerarySave(duplicateItinerary);
                      }
                      toast({
                        title: "Itinerary Duplicated",
                        description: "A copy of this itinerary has been created.",
                      });
                      onEditorClose();
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Duplicate Itinerary
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full mt-2 text-culturin-indigo border-culturin-indigo hover:bg-culturin-indigo/10 transition-all duration-300"
                    onClick={() => router.push(`/pro-dashboard/booking`)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" /> View Bookings
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full mt-2 text-red-600 border-red-600 hover:bg-red-50 transition-all duration-300"
                    onClick={async () => {
                      if (
                        confirm(
                          "Are you sure you want to delete this itinerary? This action cannot be undone."
                        )
                      ) {
                        try {
                          if (
                            !itinerary.id.startsWith("temp-") &&
                            !itinerary.id.startsWith("duplicate-")
                          ) {
                            await itineraryService.deleteItinerary(itinerary.id);
                          }
                          toast({
                            title: "Itinerary Deleted",
                            description:
                              "The itinerary has been deleted successfully.",
                          });
                          onEditorClose();
                        } catch (error) {
                          console.error("Error deleting itinerary:", error);
                          toast({
                            title: "Error",
                            description:
                              error instanceof Error
                                ? error.message
                                : "Failed to delete itinerary",
                            variant: "destructive",
                          });
                        }
                      }
                    }}
                  >
                    <X className="h-4 w-4 mr-1" /> Delete Itinerary
                  </Button>
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default ItineraryEditor;

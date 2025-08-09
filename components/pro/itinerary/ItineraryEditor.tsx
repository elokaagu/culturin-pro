'use client'
import React, { useState, useEffect } from "react";
import { Edit, Save, ExternalLink, Image as ImageIcon, Eye, Share2, Copy, Archive, Trash2 } from "lucide-react";
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
import { useAuth } from "@/src/components/auth/AuthProvider";

interface ItineraryEditorProps {
  showEditor: boolean;
  selectedItinerary: ItineraryType | null;
  showAIAssistant: boolean;
  onAIAssistantClose: () => void;
  onEditorClose: () => void;
  onItinerarySave?: (itinerary: ItineraryType) => void;
  onQuickAction?: (action: string) => void;
}

const ItineraryEditor: React.FC<ItineraryEditorProps> = ({
  showEditor,
  selectedItinerary,
  showAIAssistant,
  onAIAssistantClose,
  onEditorClose,
  onItinerarySave,
  onQuickAction,
}) => {
  const { toast } = useToast();
  const { user, isLoggedIn, isReady } = useAuth();
  const [itinerary, setItinerary] = useState<ItineraryType | null>(
    selectedItinerary
  );
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [isSavingInProgress, setIsSavingInProgress] = useState(false);

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
    if (!itinerary || isSavingInProgress) return;

    setIsSavingInProgress(true);
    setIsSaving(true);

    try {
      console.log("💾 Saving itinerary:", itinerary.title);
      
      // Use the parent's save handler if provided (new approach)
      if (onItinerarySave) {
        console.log("📤 Using parent save handler");
        await onItinerarySave(itinerary);
        console.log("✅ Parent save handler completed");
        
        // Show success toast since parent doesn't handle it
        toast({
          title: "Changes Saved",
          description: `"${itinerary.title}" has been saved successfully.`,
        });
        
        // Don't return here - let the finally block execute
      } else {

      // Fallback to database save (legacy approach)
      console.log("🗄️ Using database save fallback");
      let savedItinerary: ItineraryType;

      if (
        itinerary.id.startsWith("temp-") ||
        itinerary.id.startsWith("duplicate-") ||
        itinerary.id.startsWith("new-") ||
        itinerary.id.startsWith("local-")
      ) {
        // Create new itinerary - let database generate UUID
        const { id, ...itineraryData } = itinerary;
        // Convert ItineraryType to Itinerary format for database
        const newItinerary = {
          ...itineraryData,
          // Don't include id - let database generate UUID
        };
        const success = await itineraryService.saveItinerary(newItinerary);
        if (success) {
          // Get the saved itinerary from the service
          const savedItineraries = await itineraryService.getItineraries();
          const foundItinerary = savedItineraries.find(i => i.title === itinerary.title);
          // Convert database Itinerary to ItineraryType format
          savedItinerary = foundItinerary ? {
            ...itinerary,
            id: foundItinerary.id || `itinerary-${Date.now()}`,
            lastUpdated: "just now"
          } : itinerary;
          toast({
            title: "Itinerary Created",
            description: `"${savedItinerary.title}" has been saved to your database.`,
          });
        } else {
          throw new Error("Failed to save itinerary");
        }
      } else {
        // Update existing itinerary
        const success = await itineraryService.updateItinerary(itinerary);
        if (success) {
          // Get the updated itinerary from the service
          const savedItineraries = await itineraryService.getItineraries();
          const foundItinerary = savedItineraries.find(i => i.id === itinerary.id);
          // Convert database Itinerary to ItineraryType format
          savedItinerary = foundItinerary ? {
            ...itinerary,
            id: foundItinerary.id || itinerary.id,
            lastUpdated: "just now"
          } : itinerary;
          toast({
            title: "Changes Saved",
            description: `"${savedItinerary.title}" has been updated in your database.`,
          });
        } else {
          throw new Error("Failed to update itinerary");
        }
      }

      // Update local state with saved itinerary
      setItinerary(savedItinerary);

      if (onItinerarySave) {
        onItinerarySave(savedItinerary);
      }

      // Dispatch event to notify website builder of itinerary changes
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("itineraryChanged", {
            detail: { action: "saved", itinerary: savedItinerary }
          })
        );
        
        // Also trigger itinerary refresh for other components
        window.dispatchEvent(new CustomEvent("userAuthenticated"));
      }
      } // Close the else block

    } catch (error) {
      console.error("Error saving itinerary:", error);
      toast({
        title: "Save Failed",
        description:
          error instanceof Error 
            ? `Failed to save: ${error.message}` 
            : "Failed to save itinerary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
      setIsSavingInProgress(false);
    }
  };

  const handlePublish = async () => {
    if (!itinerary || isSavingInProgress) return;

    // Check if user is ready and authenticated
    if (!isReady) {
      toast({
        title: "Please wait",
        description: "Authentication is loading. Please try again in a moment.",
        variant: "destructive",
      });
      return;
    }

    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to publish your itinerary to the database.",
        variant: "destructive",
      });
      return;
    }

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

    setIsSavingInProgress(true);
    setIsPublishing(true);

    try {
      console.log("📤 Publishing itinerary:", itinerary.title);
      
      // Set status to published
      const publishedItinerary = {
        ...itinerary,
        status: "published" as const,
        lastUpdated: "just now",
      };

      // Use the parent's save handler if provided (new approach)
      if (onItinerarySave) {
        console.log("📤 Using parent save handler for publish");
        await onItinerarySave(publishedItinerary);
        
        // Update local state
        setItinerary(publishedItinerary);
        
        console.log("✅ Parent save handler completed for publish");
        return; // Parent handles the toast and persistence
      }

      // Fallback to database save (legacy approach)
      console.log("🗄️ Using database save fallback for publish");
      let savedItinerary: ItineraryType;

      if (
        itinerary.id.startsWith("temp-") ||
        itinerary.id.startsWith("duplicate-") ||
        itinerary.id.startsWith("new-") ||
        itinerary.id.startsWith("local-")
      ) {
        // Create new itinerary as published
        const { id, lastUpdated, ...itineraryData } = publishedItinerary;
        const newItinerary = {
          ...itineraryData,
          id: `new-${Date.now()}`,
        };
        const success = await itineraryService.saveItinerary(newItinerary);
        if (success) {
          const savedItineraries = await itineraryService.getItineraries();
          const foundItinerary = savedItineraries.find(i => i.title === itinerary.title);
          // Convert database Itinerary to ItineraryType format
          savedItinerary = foundItinerary ? {
            ...publishedItinerary,
            id: foundItinerary.id || `itinerary-${Date.now()}`,
            lastUpdated: "just now"
          } : publishedItinerary;
        } else {
          throw new Error("Failed to save itinerary");
        }
      } else {
        // Update existing itinerary as published
        const success = await itineraryService.updateItinerary(publishedItinerary);
        if (success) {
          const savedItineraries = await itineraryService.getItineraries();
          const foundItinerary = savedItineraries.find(i => i.id === itinerary.id);
          // Convert database Itinerary to ItineraryType format
          savedItinerary = foundItinerary ? {
            ...publishedItinerary,
            id: foundItinerary.id || itinerary.id,
            lastUpdated: "just now"
          } : publishedItinerary;
        } else {
          throw new Error("Failed to update itinerary");
        }
      }

      // Update local state
      setItinerary(savedItinerary);

      if (onItinerarySave) {
        onItinerarySave(savedItinerary);
      }

      // Dispatch event to notify website builder of itinerary changes
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("itineraryChanged", {
            detail: { action: "published", itinerary: savedItinerary }
          })
        );
        
        // Also trigger itinerary refresh for other components
        window.dispatchEvent(new CustomEvent("userAuthenticated"));
      }

      toast({
        title: "Itinerary Published! 🎉",
        description: `"${savedItinerary.title}" is now live and saved to your database.`,
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
      setIsSavingInProgress(false);
    }
  };

  const handleUnpublish = async () => {
    if (!itinerary || isSavingInProgress) return;

    // Check if user is ready and authenticated
    if (!isReady) {
      toast({
        title: "Please wait",
        description: "Authentication is loading. Please try again in a moment.",
        variant: "destructive",
      });
      return;
    }

    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to unpublish your itinerary.",
        variant: "destructive",
      });
      return;
    }

    setIsSavingInProgress(true);
    setIsPublishing(true);

    try {
      // Set status back to draft
      const draftItinerary = {
        ...itinerary,
        status: "draft" as const,
        lastUpdated: "just now",
      };

      const success = await itineraryService.updateItinerary(draftItinerary);
      if (success) {
        const savedItineraries = await itineraryService.getItineraries();
        const foundItinerary = savedItineraries.find(i => i.id === itinerary.id);
        // Convert database Itinerary to ItineraryType format
        const savedItinerary: ItineraryType = foundItinerary ? {
          ...draftItinerary,
          id: foundItinerary.id || itinerary.id,
          lastUpdated: "just now"
        } : draftItinerary;
        
        // Update local state
        setItinerary(savedItinerary);

        if (onItinerarySave) {
          onItinerarySave(savedItinerary);
        }

        // Dispatch event to notify website builder of itinerary changes
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("itineraryChanged", {
              detail: { action: "unpublished", itinerary: savedItinerary }
            })
          );
        }

        toast({
          title: "Itinerary Unpublished",
          description: "Your itinerary is now back to draft status.",
        });
      } else {
        throw new Error("Failed to update itinerary");
      }

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
      setIsSavingInProgress(false);
    }
  };

  const handlePreviewSaveChanges = () => {
    if (itinerary && onItinerarySave) {
      const updatedItinerary = {
        ...itinerary,
        updated_at: new Date().toISOString(),
      };
      onItinerarySave(updatedItinerary);
    }

    toast({
      title: "Changes Saved",
      description: "Your changes have been saved to the preview.",
    });
  };

  const handleQuickAction = (action: string) => {
    if (!itinerary) return;

    // For delete action, delegate to parent if available
    if (action === 'delete' && onQuickAction) {
      if (window.confirm(`Are you sure you want to delete "${itinerary.title}"? This action cannot be undone.`)) {
        onQuickAction(action);
        onEditorClose(); // Close editor after delete
      }
      return;
    }

    switch (action) {
      case 'view-website':
        // Open website preview in new tab
        if (itinerary.status === 'published') {
          const websiteUrl = `/tour/operator/${user?.id || 'demo'}`;
          window.open(websiteUrl, '_blank');
        } else {
          toast({
            title: "Itinerary Not Published",
            description: "Please publish your itinerary before viewing it on the website.",
            variant: "destructive",
          });
        }
        break;

      case 'share':
        // Copy share link to clipboard
        const shareUrl = `${window.location.origin}/product/booking-preview/${itinerary.id}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
          toast({
            title: "Link Copied",
            description: "Share link has been copied to your clipboard.",
          });
        }).catch(() => {
          toast({
            title: "Failed to Copy",
            description: "Please copy the URL manually from your browser.",
            variant: "destructive",
          });
        });
        break;

      case 'duplicate':
        // Create a duplicate itinerary
        const duplicatedItinerary: ItineraryType = {
          ...itinerary,
          id: `duplicate-${Date.now()}`,
          title: `${itinerary.title} (Copy)`,
          status: 'draft',
          lastUpdated: 'just now',
        };
        
        if (onItinerarySave) {
          onItinerarySave(duplicatedItinerary);
          toast({
            title: "Itinerary Duplicated",
            description: `"${duplicatedItinerary.title}" has been created.`,
          });
        }
        break;

      case 'archive':
        // Archive the itinerary
        const archivedItinerary = {
          ...itinerary,
          status: 'archived' as const,
          lastUpdated: 'just now',
        };
        
        if (onItinerarySave) {
          onItinerarySave(archivedItinerary);
          toast({
            title: "Itinerary Archived",
            description: `"${itinerary.title}" has been archived.`,
          });
          onEditorClose(); // Close editor after archiving
        }
        break;

      case 'delete':
        // Fallback delete handling if no parent handler
        if (window.confirm(`Are you sure you want to delete "${itinerary.title}"? This action cannot be undone.`)) {
          toast({
            title: "Itinerary Deleted",
            description: `"${itinerary.title}" has been deleted.`,
          });
          onEditorClose();
        }
        break;

      default:
        console.log(`Unhandled quick action: ${action}`);
        toast({
          title: "Feature Coming Soon",
          description: `${action} functionality will be available soon.`,
        });
    }
  };

  const isPublished = itinerary.status === "published";

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 animate-fade-in">
      {/* Cover Image with Overlay */}
      <div className="relative h-64 md:h-80 w-full group">
        {itinerary.image ? (
          <img
            src={itinerary.image}
            alt="Cover"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-culturin-indigo/80 to-blue-200">
            <ImageIcon className="w-16 h-16 text-white/60" />
          </div>
        )}
        {/* Overlay for title/description */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-8">
          <div className="mb-2 flex items-center gap-2">
            <Badge
              variant="outline"
              className="backdrop-blur bg-white/70 text-culturin-indigo font-semibold text-xs px-3 py-1"
            >
              {itinerary.status === "published" ? "Published" : "Draft"}
            </Badge>
            <span className="text-xs text-white/80">
              {itinerary.lastUpdated || 'Recently updated'}
            </span>
          </div>
          {/* Inline editable title */}
          {editingTitle ? (
            <input
              className="text-3xl md:text-5xl font-bold bg-white/80 rounded px-2 py-1 mb-2 text-culturin-indigo w-full outline-none border-none shadow"
              value={itinerary.title}
              onChange={(e) => handlePropertyChange("title", e.target.value)}
              onBlur={() => setEditingTitle(false)}
              autoFocus
            />
          ) : (
            <h1
              className="text-3xl md:text-5xl font-bold text-white drop-shadow cursor-pointer hover:underline"
              onClick={() => setEditingTitle(true)}
            >
              {itinerary.title}
            </h1>
          )}
          {/* Inline editable description */}
          {editingDescription ? (
            <textarea
              className="mt-2 text-lg md:text-2xl bg-white/80 rounded px-2 py-1 text-culturin-indigo w-full outline-none border-none shadow resize-none"
              value={itinerary.description}
              onChange={(e) =>
                handlePropertyChange("description", e.target.value)
              }
              onBlur={() => setEditingDescription(false)}
              rows={2}
              autoFocus
            />
          ) : (
            <p
              className="mt-2 text-lg md:text-2xl text-white/90 drop-shadow cursor-pointer hover:underline"
              onClick={() => setEditingDescription(true)}
            >
              {itinerary.description || "Click to add a description..."}
            </p>
          )}
        </div>
        {/* Change Cover Button */}
        <div className="absolute top-4 right-4">
          <label className="inline-flex items-center gap-2 bg-white/80 hover:bg-white/90 text-culturin-indigo px-3 py-1 rounded shadow cursor-pointer text-sm font-medium transition-all duration-200">
            <ImageIcon className="w-4 h-4" /> Change Cover
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    handlePropertyChange("image", reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
        </div>
      </div>

      {/* Itinerary Details Form */}
      <div className="p-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold mb-4 text-culturin-indigo">
            Itinerary Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Days</label>
                <input
                  type="number"
                  className="w-full border p-2 rounded-md text-sm mt-1"
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
                <label className="text-sm font-medium text-gray-700">Status</label>
                <select
                  className="w-full border p-2 rounded-md text-sm mt-1"
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
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Price (USD)</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full border p-2 rounded-md text-sm mt-1"
                  value={itinerary.price || ""}
                  onChange={(e) =>
                    handlePropertyChange(
                      "price",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Editorial Layout */}
      <div className="flex flex-col lg:flex-row gap-6 p-6 transition-all duration-500">
        {/* Left: Module Library */}
        <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-lg p-6">
          <ModuleLibrary />
        </div>
        {/* Center: Itinerary Preview */}
        <div className="w-full lg:w-2/4 bg-white rounded-xl shadow-lg p-6">
          <ItineraryPreview
            itinerary={itinerary}
            onSaveChanges={handlePreviewSaveChanges}
          />
        </div>
        {/* Right: Properties/AI Assistant */}
        <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-lg p-6">
          {showAIAssistant ? (
            <AIContentAssistant onClose={onAIAssistantClose} />
          ) : (
            <div className="flex flex-col h-full">
              <h3 className="font-medium mb-4 text-culturin-indigo">
                Actions
              </h3>

              {/* Publish/Unpublish Button */}
              {isPublished ? (
                <Button
                  variant="outline"
                  className="w-full mb-4 bg-yellow-50 text-yellow-700 border-yellow-300 hover:bg-yellow-100"
                  onClick={handleUnpublish}
                  disabled={isPublishing}
                >
                  {isPublishing ? (
                    "Unpublishing..."
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Unpublish Itinerary
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  className="w-full mb-4 bg-green-600 hover:bg-green-700 text-white"
                  onClick={handlePublish}
                  disabled={isPublishing}
                >
                  {isPublishing ? (
                    "Publishing..."
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Publish Itinerary
                    </>
                  )}
                </Button>
              )}

              {/* Save Changes Button */}
              <Button
                className="w-full mb-4"
                onClick={handleSaveChanges}
                disabled={isSaving}
              >
                {isSaving ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" /> Save Changes
                  </>
                )}
              </Button>

              {/* Preview Booking Button */}
              <Button
                variant="outline"
                className="w-full mb-4 text-culturin-indigo border-culturin-indigo hover:bg-culturin-indigo/10"
                asChild
              >
                <Link
                  to={`/product/booking-preview/${itinerary.id}`}
                  target="_blank"
                >
                  <ExternalLink className="h-4 w-4 mr-2" /> Preview Booking
                </Link>
              </Button>

              {/* Quick Actions Section */}
              <div className="mt-8">
                <h3 className="font-medium mb-4 text-culturin-indigo">
                  Quick Actions
                </h3>
                
                {/* View on Website */}
                <Button
                  variant="outline"
                  className="w-full mb-3 justify-start"
                  onClick={() => handleQuickAction('view-website')}
                >
                  <Eye className="h-4 w-4 mr-2" /> View on Website
                </Button>

                {/* Share Link */}
                <Button
                  variant="outline"
                  className="w-full mb-3 justify-start"
                  onClick={() => handleQuickAction('share')}
                >
                  <Share2 className="h-4 w-4 mr-2" /> Share Link
                </Button>

                {/* Duplicate */}
                <Button
                  variant="outline"
                  className="w-full mb-3 justify-start"
                  onClick={() => handleQuickAction('duplicate')}
                >
                  <Copy className="h-4 w-4 mr-2" /> Duplicate
                </Button>

                {/* Archive */}
                <Button
                  variant="outline"
                  className="w-full mb-3 justify-start"
                  onClick={() => handleQuickAction('archive')}
                >
                  <Archive className="h-4 w-4 mr-2" /> Archive
                </Button>

                {/* Delete Itinerary */}
                <Button
                  variant="outline"
                  className="w-full mb-3 justify-start text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => handleQuickAction('delete')}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Delete Itinerary
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryEditor;

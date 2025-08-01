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

  const handleSaveChanges = () => {
    setIsPublishing(true);
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

  // --- Editorial Cover Section ---
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
              {itinerary.lastUpdated}
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
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={itinerary.title || ""}
                  onChange={(e) =>
                    handlePropertyChange("title", e.target.value)
                  }
                  placeholder="Enter itinerary title"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={itinerary.description || ""}
                  onChange={(e) =>
                    handlePropertyChange("description", e.target.value)
                  }
                  placeholder="Describe your itinerary..."
                  rows={4}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="regions">Destinations</Label>
                <Input
                  id="regions"
                  value={
                    Array.isArray(itinerary.regions)
                      ? itinerary.regions.join(", ")
                      : ""
                  }
                  onChange={(e) =>
                    handlePropertyChange(
                      "regions",
                      e.target.value.split(", ").filter(Boolean)
                    )
                  }
                  placeholder="e.g., Paris, Lyon, Nice"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="themeType">Theme</Label>
                <Select
                  value={itinerary.themeType || "general"}
                  onValueChange={(value) =>
                    handlePropertyChange("themeType", value)
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="culinary">Culinary</SelectItem>
                    <SelectItem value="historical">Historical</SelectItem>
                    <SelectItem value="nature">Nature</SelectItem>
                    <SelectItem value="urban">Urban</SelectItem>
                    <SelectItem value="spiritual">Spiritual</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="price">Price (USD)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={itinerary.price || ""}
                  onChange={(e) =>
                    handlePropertyChange(
                      "price",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  placeholder="0.00"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="groupSize">Group Size</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={itinerary.groupSize?.min || ""}
                    onChange={(e) =>
                      handlePropertyChange("groupSize", {
                        ...itinerary.groupSize,
                        min: parseInt(e.target.value) || 1,
                      })
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={itinerary.groupSize?.max || ""}
                    onChange={(e) =>
                      handlePropertyChange("groupSize", {
                        ...itinerary.groupSize,
                        max: parseInt(e.target.value) || 10,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select
                  value={itinerary.difficulty || "easy"}
                  onValueChange={(value) =>
                    handlePropertyChange("difficulty", value)
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="challenging">Challenging</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
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
          <ItineraryPreview itinerary={itinerary} onSaveChanges={() => {}} />
        </div>
        {/* Right: Properties/AI Assistant */}
        <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-lg p-6">
          {showAIAssistant ? (
            <AIContentAssistant onClose={onAIAssistantClose} />
          ) : (
            <div className="flex flex-col h-full">
              <h3 className="font-medium mb-4 text-culturin-indigo">
                Properties
              </h3>

              {/* Natural Language Input */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="text-sm font-medium text-blue-900 mb-2">
                  AI Assistant
                </h4>
                <textarea
                  placeholder="Describe your itinerary in natural language... (e.g., 'Create a 3-day cultural tour of Barcelona with cooking classes, museum visits, and local food experiences')"
                  className="w-full p-3 text-sm border border-blue-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
                <Button
                  className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2"
                  onClick={() => {
                    toast({
                      title: "AI Processing",
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
                <Button
                  className="w-full mt-4 bg-culturin-indigo hover:bg-culturin-indigo/90 text-white text-lg py-3 rounded-xl shadow-lg transition-all duration-300"
                  onClick={handleSaveChanges}
                  disabled={isPublishing}
                >
                  {isPublishing ? (
                    "Publishing..."
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" /> Publish Changes
                    </>
                  )}
                </Button>
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
                  onClick={() => {
                    if (
                      confirm(
                        "Are you sure you want to delete this itinerary? This action cannot be undone."
                      )
                    ) {
                      toast({
                        title: "Itinerary Deleted",
                        description:
                          "The itinerary has been deleted successfully.",
                      });
                      onEditorClose();
                    }
                  }}
                >
                  <X className="h-4 w-4 mr-1" /> Delete Itinerary
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

"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WebsitePreview from "./WebsitePreview";
import WebsiteThemes from "./WebsiteThemes";
import WebsiteContent from "./WebsiteContent";
import WebsiteSettings from "./WebsiteSettings";
import BookingFlowBuilder from "./BookingFlowBuilder";
import HeaderFooterCustomizer from "./HeaderFooterCustomizer";
import FontCustomizer from "./FontCustomizer";
import DragDropBuilder from "./DragDropBuilder";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Globe,
  ExternalLink,
  Check,
  Loader2,
  ShoppingCart,
  RefreshCw,
  Palette,
  Settings,
  Eye,
  Zap,
  Save,
  History,
  Undo,
  Redo,
} from "lucide-react";
import { useNavigate } from "../../../lib/navigation";
import { sampleItineraries, ItineraryType } from "@/data/itineraryData";
import { useUserData } from "../../../src/contexts/UserDataContext";

// History management for undo/redo functionality
interface HistoryState {
  websiteSettings: any;
  itineraries: ItineraryType[];
  timestamp: number;
}

interface HistoryInput {
  websiteSettings: any;
  itineraries: ItineraryType[];
}

const WebsiteBuilder: React.FC = () => {
  const [publishLoading, setPublishLoading] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");
  const [publishedUrl, setPublishedUrl] = useState("");
  const [itineraries, setItineraries] = useState<ItineraryType[]>([]);
  const [previewKey, setPreviewKey] = useState(0);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // History management
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isUndoRedoAction, setIsUndoRedoAction] = useState(false);

  const navigate = useNavigate();
  const { userData, updateWebsiteSettings, saveUserData } = useUserData();

  // Initialize data - only on client side
  useEffect(() => {
    // Initialize published URL from localStorage
    const storedUrl = localStorage.getItem("publishedWebsiteUrl");
    setPublishedUrl(storedUrl || "tour/demo");

    // Get itineraries from localStorage or use sample data
    const storedItineraries = localStorage.getItem("culturinItineraries");
    if (storedItineraries) {
      try {
        const parsedItineraries = JSON.parse(storedItineraries);
        setItineraries(parsedItineraries);
        addToHistory({
          websiteSettings: userData.websiteSettings,
          itineraries: parsedItineraries,
        });
      } catch (e) {
        console.error("Error parsing itineraries:", e);
        setItineraries(sampleItineraries);
        localStorage.setItem(
          "culturinItineraries",
          JSON.stringify(sampleItineraries)
        );
        addToHistory({
          websiteSettings: userData.websiteSettings,
          itineraries: sampleItineraries,
        });
      }
    } else {
      setItineraries(sampleItineraries);
      localStorage.setItem(
        "culturinItineraries",
        JSON.stringify(sampleItineraries)
      );
      addToHistory({
        websiteSettings: userData.websiteSettings,
        itineraries: sampleItineraries,
      });
    }
  }, [userData.websiteSettings]);

  // Auto-refresh preview when user data changes
  useEffect(() => {
    if (!isUndoRedoAction) {
      setPreviewKey((prev) => prev + 1);
      setHasUnsavedChanges(true);

      // Auto-save if enabled
      if (autoSaveEnabled) {
        const timeoutId = setTimeout(() => {
          handleAutoSave();
        }, 2000); // Auto-save after 2 seconds of inactivity

        return () => clearTimeout(timeoutId);
      }
    }
    setIsUndoRedoAction(false);
  }, [userData.websiteSettings, autoSaveEnabled]);

  // Listen for website settings changes
  useEffect(() => {
    const handleSettingsChange = (event: CustomEvent) => {
      setPreviewKey((prev) => prev + 1);
      // Update itineraries if they changed
      if (event.detail?.filteredItineraries) {
        setItineraries(event.detail.filteredItineraries);
        addToHistory({
          websiteSettings: userData.websiteSettings,
          itineraries: event.detail.filteredItineraries,
        });
      }
      toast.success("Preview updated", {
        description: "Website preview reflects your latest settings",
      });
    };

    const handleThemeChange = (event: CustomEvent) => {
      setPreviewKey((prev) => prev + 1);
      addToHistory({ websiteSettings: userData.websiteSettings, itineraries });
      toast.success("Theme applied", {
        description: `Applied "${event.detail.theme}" theme to preview`,
      });
    };

    if (typeof window !== "undefined") {
      window.addEventListener(
        "websiteSettingsChanged",
        handleSettingsChange as EventListener
      );
      window.addEventListener(
        "themeChanged",
        handleThemeChange as EventListener
      );
      return () => {
        window.removeEventListener(
          "websiteSettingsChanged",
          handleSettingsChange as EventListener
        );
        window.removeEventListener(
          "themeChanged",
          handleThemeChange as EventListener
        );
      };
    }
  }, [userData.websiteSettings, itineraries]);

  // History management functions
  const addToHistory = useCallback(
    (state: HistoryInput) => {
      if (isUndoRedoAction) return;

      setHistory((prev) => {
        const newHistory = prev.slice(0, historyIndex + 1);
        newHistory.push({
          ...state,
          timestamp: Date.now(),
        });
        // Keep only last 20 states
        return newHistory.slice(-20);
      });
      setHistoryIndex((prev) => prev + 1);
    },
    [historyIndex, isUndoRedoAction]
  );

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setIsUndoRedoAction(true);
      const previousState = history[historyIndex - 1];
      setHistoryIndex((prev) => prev - 1);

      // Restore state
      updateWebsiteSettings(previousState.websiteSettings);
      setItineraries(previousState.itineraries);
      localStorage.setItem(
        "culturinItineraries",
        JSON.stringify(previousState.itineraries)
      );

      toast.success("Undone", {
        description: "Reverted to previous state",
      });
    }
  }, [history, historyIndex, updateWebsiteSettings]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setIsUndoRedoAction(true);
      const nextState = history[historyIndex + 1];
      setHistoryIndex((prev) => prev + 1);

      // Restore state
      updateWebsiteSettings(nextState.websiteSettings);
      setItineraries(nextState.itineraries);
      localStorage.setItem(
        "culturinItineraries",
        JSON.stringify(nextState.itineraries)
      );

      toast.success("Redone", {
        description: "Applied next state",
      });
    }
  }, [history, historyIndex, updateWebsiteSettings]);

  const handleSettingsChange = useCallback(() => {
    // Trigger immediate preview refresh when settings change
    setPreviewKey((prev) => prev + 1);
    setHasUnsavedChanges(true);
  }, []);

  const handleAutoSave = useCallback(async () => {
    try {
      saveUserData();
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      toast.success("Auto-saved", {
        description: "Your changes have been saved automatically",
      });
    } catch (error) {
      console.error("Auto-save failed:", error);
    }
  }, [saveUserData]);

  const handleManualSave = useCallback(async () => {
    try {
      await handleAutoSave();
      toast.success("Saved successfully", {
        description: "All changes have been saved",
      });
    } catch (error) {
      toast.error("Save failed", {
        description: "Please try again",
      });
    }
  }, [handleAutoSave]);

  const handlePublish = async () => {
    if (!userData.businessName) {
      toast.error("Please complete your business profile first", {
        description: "Add your business name in the settings",
      });
      return;
    }

    setPublishLoading(true);

    try {
      // Save current state before publishing
      await handleManualSave();

      // Generate a unique slug for the website
      const slug = `${userData.businessName
        .toLowerCase()
        .replace(/\s+/g, "-")}-${Date.now().toString(36)}`;
      const newPublishedUrl = `tour/${slug}`;

      // Simulate publishing process - in a real app, this would save to a backend
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setPublishedUrl(newPublishedUrl);

      // Save the published URL to localStorage
      localStorage.setItem("publishedWebsiteUrl", newPublishedUrl);

      // Save website content and theme to localStorage for the tour operator website
      const websiteContent = {
        companyName: userData.websiteSettings.companyName,
        tagline: userData.websiteSettings.tagline,
        description: userData.websiteSettings.description,
        primaryColor: userData.websiteSettings.primaryColor,
        headerImage: userData.websiteSettings.headerImage,
        enableBooking: userData.websiteSettings.enableBooking,
        bookingSettings: userData.websiteSettings.bookingSettings,
      };

      localStorage.setItem(
        "publishedWebsiteTheme",
        userData.websiteSettings.theme
      );
      localStorage.setItem(
        "publishedWebsiteContent",
        JSON.stringify(websiteContent)
      );
      localStorage.setItem("publishedItineraries", JSON.stringify(itineraries));

      setHasUnsavedChanges(false);
      toast.success("Website published successfully!", {
        description:
          "Your changes are now live with the latest booking settings.",
      });
    } catch (error) {
      toast.error("Failed to publish website", {
        description: "Please try again or contact support",
      });
    } finally {
      setPublishLoading(false);
    }
  };

  const handlePreviewSite = () => {
    try {
      if (typeof window !== "undefined") {
        window.open(`/${publishedUrl}`, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      toast.error("Failed to open preview", {
        description: "Please check your browser settings",
      });
    }
  };

  const handleReloadPreview = async () => {
    setRefreshLoading(true);

    try {
      // Trigger a refresh for the preview
      const storedItineraries = localStorage.getItem("culturinItineraries");
      if (storedItineraries) {
        try {
          const parsedItineraries = JSON.parse(storedItineraries);
          setItineraries(parsedItineraries);
        } catch (e) {
          console.error("Error parsing itineraries:", e);
          toast.error("Error loading itineraries", {
            description: "Using default data",
          });
        }
      }

      // Simulate refresh delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      setPreviewKey((prev) => prev + 1);
      toast.success("Preview refreshed with latest changes");
    } catch (error) {
      toast.error("Failed to refresh preview", {
        description: "Please try again",
      });
    } finally {
      setRefreshLoading(false);
    }
  };

  const handleQuickUpdate = useCallback(
    (field: string, value: any) => {
      try {
        updateWebsiteSettings({ [field]: value });
        addToHistory({
          websiteSettings: { ...userData.websiteSettings, [field]: value },
          itineraries,
        });
        toast.success("Website updated - changes will appear in preview");
      } catch (error) {
        toast.error("Failed to update website", {
          description: "Please try again",
        });
      }
    },
    [updateWebsiteSettings, userData.websiteSettings, itineraries, addToHistory]
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast.success(`Switched to ${value} tab`);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "resetColor":
        handleQuickUpdate("primaryColor", "#9b87f5");
        break;
      case "toggleBooking":
        handleQuickUpdate(
          "enableBooking",
          !userData.websiteSettings.enableBooking
        );
        break;
      case "configureBooking":
        setActiveTab("booking");
        break;
      case "toggleAutoSave":
        setAutoSaveEnabled((prev) => !prev);
        toast.success(
          autoSaveEnabled ? "Auto-save disabled" : "Auto-save enabled"
        );
        break;
      default:
        toast.error("Unknown action");
    }
  };

  // Memoized values for performance
  const canUndo = useMemo(() => historyIndex > 0, [historyIndex]);
  const canRedo = useMemo(
    () => historyIndex < history.length - 1,
    [historyIndex, history.length]
  );
  const lastSavedText = useMemo(() => {
    if (!lastSaved) return "Never saved";
    const now = new Date();
    const diff = now.getTime() - lastSaved.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  }, [lastSaved]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Your Website</h2>
          <p className="text-sm text-gray-600 mb-4">
            Customize your tour operator website with real-time preview and booking functionality.
          </p>
          
          {/* Status indicators */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  hasUnsavedChanges ? "bg-orange-500" : "bg-green-500"
                }`}
              ></div>
              <span
                className={
                  hasUnsavedChanges ? "text-orange-600" : "text-green-600"
                }
              >
                {hasUnsavedChanges ? "Unsaved changes" : "All changes saved"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3" />
              <span className="text-gray-600">
                Auto-save: {autoSaveEnabled ? "On" : "Off"}
              </span>
            </div>
            <div className="text-gray-500">Last saved: {lastSavedText}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-b border-gray-200 space-y-3">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={undo}
              disabled={!canUndo}
              className="flex-1"
            >
              <Undo className="h-4 w-4 mr-1" />
              Undo
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={redo}
              disabled={!canRedo}
              className="flex-1"
            >
              <Redo className="h-4 w-4 mr-1" />
              Redo
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleManualSave}
              className="flex-1"
            >
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button
              variant="outline"
              onClick={handleReloadPreview}
              disabled={refreshLoading}
              className="flex-1"
            >
              {refreshLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Refresh
            </Button>
          </div>

          <Button
            onClick={handlePublish}
            disabled={publishLoading}
            className="w-full"
          >
            {publishLoading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                Publishing...
              </>
            ) : (
              <>
                <Globe className="mr-2 h-4 w-4" />
                Publish Changes
              </>
            )}
          </Button>
        </div>

        {/* Published URL Status */}
        {publishedUrl && (
          <div className="p-6 border-b border-gray-200">
            <div className="bg-green-50 border border-green-200 rounded-md p-3">
              <div className="flex items-center mb-2">
                <div className="rounded-full bg-green-100 p-1">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span className="ml-2 text-sm font-medium text-green-800">
                  Site Published
                </span>
              </div>
              <div className="text-xs text-green-700 mb-2">
                <a
                  href={`/${publishedUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-green-900 break-all"
                >
                  {typeof window !== "undefined" ? window.location.origin : ""}/
                  {publishedUrl}
                </a>
              </div>
              {userData.websiteSettings.enableBooking && (
                <div className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  <ShoppingCart className="h-3 w-3" />
                  Booking Enabled
                </div>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handlePreviewSite}
                className="w-full mt-2"
              >
                <Eye className="h-4 w-4 mr-1" />
                Visit Site
              </Button>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuickAction("resetColor")}
              className="w-full justify-start"
            >
              <Palette className="h-4 w-4 mr-2" />
              Reset Brand Color
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuickAction("toggleBooking")}
              className="w-full justify-start"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {userData.websiteSettings.enableBooking ? "Disable" : "Enable"} Booking
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuickAction("configureBooking")}
              className="w-full justify-start"
            >
              <Settings className="h-4 w-4 mr-2" />
              Configure Booking Flow
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuickAction("toggleAutoSave")}
              className={`w-full justify-start ${
                autoSaveEnabled ? "bg-green-50 border-green-200" : ""
              }`}
            >
              <Zap className="h-4 w-4 mr-2" />
              {autoSaveEnabled ? "Auto-save On" : "Auto-save Off"}
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex-1 p-6">
          <h3 className="text-sm font-medium mb-3">Website Builder</h3>
          <Tabs
            defaultValue="preview"
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="flex flex-col w-full h-auto bg-transparent">
              <TabsTrigger value="preview" className="w-full justify-start h-10">Preview</TabsTrigger>
              <TabsTrigger value="builder" className="w-full justify-start h-10">Builder</TabsTrigger>
              <TabsTrigger value="themes" className="w-full justify-start h-10">Themes</TabsTrigger>
              <TabsTrigger value="content" className="w-full justify-start h-10">Content</TabsTrigger>
              <TabsTrigger value="header-footer" className="w-full justify-start h-10">Header</TabsTrigger>
              <TabsTrigger value="fonts" className="w-full justify-start h-10">Fonts</TabsTrigger>
              <TabsTrigger value="booking" className="w-full justify-start h-10">Booking</TabsTrigger>
              <TabsTrigger value="settings" className="w-full justify-start h-10">Settings</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Content based on active tab */}
        <div className="flex-1 overflow-auto">
          {activeTab === "preview" && (
            <WebsitePreview
              key={previewKey}
              itineraries={itineraries}
              refreshKey={previewKey}
            />
          )}
          
          {activeTab === "builder" && (
            <div className="p-6">
              <DragDropBuilder />
            </div>
          )}
          
          {activeTab === "themes" && (
            <div className="p-6">
              <WebsiteThemes />
            </div>
          )}
          
          {activeTab === "content" && (
            <div className="p-6">
              <WebsiteContent />
            </div>
          )}
          
          {activeTab === "header-footer" && (
            <div className="p-6">
              <HeaderFooterCustomizer onSettingsChange={handleSettingsChange} />
            </div>
          )}
          
          {activeTab === "fonts" && (
            <div className="p-6">
              <FontCustomizer onSettingsChange={handleSettingsChange} />
            </div>
          )}
          
          {activeTab === "booking" && (
            <div className="p-6">
              <BookingFlowBuilder />
            </div>
          )}
          
          {activeTab === "settings" && (
            <div className="p-6">
              <WebsiteSettings
                itineraries={itineraries}
                setItineraries={setItineraries}
                onSettingsChange={handleSettingsChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebsiteBuilder;

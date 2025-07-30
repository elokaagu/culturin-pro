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
  Monitor,
  Tablet,
  Cloud,
  Download,
  Upload,
  FileText,
  Image,
} from "lucide-react";
import { useNavigate } from "../../../lib/navigation";
import { sampleItineraries, ItineraryType } from "@/data/itineraryData";
import { useUserData } from "../../../src/contexts/UserDataContext";
import MediaLibrary from "./MediaLibrary";

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

// Website data structure for persistence
interface WebsiteData {
  settings: any;
  itineraries: ItineraryType[];
  blocks: any[];
  theme: string;
  publishedUrl: string;
  lastModified: Date;
  version: string;
}

const WebsiteBuilder: React.FC = () => {
  const [publishLoading, setPublishLoading] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");
  const [publishedUrl, setPublishedUrl] = useState("");
  const [itineraries, setItineraries] = useState<ItineraryType[]>([]);
  const [previewKey, setPreviewKey] = useState(0);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');

  // History management
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isUndoRedoAction, setIsUndoRedoAction] = useState(false);

  const navigate = useNavigate();
  const { userData, updateWebsiteSettings, saveUserData } = useUserData();

  // Initialize data - only on client side
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Load website data from localStorage
    const loadWebsiteData = () => {
      try {
        // Load published URL
        const storedUrl = localStorage.getItem("publishedWebsiteUrl");
        setPublishedUrl(storedUrl || "tour/demo");

        // Load itineraries
        const storedItineraries = localStorage.getItem("culturinItineraries");
        if (storedItineraries) {
          const parsedItineraries = JSON.parse(storedItineraries);
          setItineraries(parsedItineraries);
        } else {
          setItineraries(sampleItineraries);
          localStorage.setItem("culturinItineraries", JSON.stringify(sampleItineraries));
        }

        // Load last saved timestamp
        const lastSavedStr = localStorage.getItem("websiteLastSaved");
        if (lastSavedStr) {
          setLastSaved(new Date(lastSavedStr));
        }

        // Load auto-save preference
        const autoSavePref = localStorage.getItem("websiteAutoSave");
        if (autoSavePref !== null) {
          setAutoSaveEnabled(autoSavePref === 'true');
        }

        // Add initial state to history
        addToHistory({
          websiteSettings: userData.websiteSettings,
          itineraries: storedItineraries ? JSON.parse(storedItineraries) : sampleItineraries,
        });

        console.log("Website data loaded successfully");
      } catch (error) {
        console.error("Error loading website data:", error);
        // Fallback to default data
        setItineraries(sampleItineraries);
        localStorage.setItem("culturinItineraries", JSON.stringify(sampleItineraries));
      }
    };

    loadWebsiteData();
  }, [userData.websiteSettings]);

  // Auto-refresh preview when user data changes
  useEffect(() => {
    if (!isUndoRedoAction) {
      setPreviewKey((prev) => prev + 1);
      setHasUnsavedChanges(true);
      setSaveStatus('saving');

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
      setHasUnsavedChanges(true);
      setSaveStatus('saving');
      
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
      setHasUnsavedChanges(true);
      setSaveStatus('saving');
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
    setSaveStatus('saving');
  }, []);

  // Enhanced auto-save function
  const handleAutoSave = useCallback(async () => {
    try {
      setSaveLoading(true);
      
      // Save user data
      saveUserData();
      
      // Save website-specific data
      const websiteData: WebsiteData = {
        settings: userData.websiteSettings,
        itineraries: itineraries,
        blocks: userData.websiteSettings.placedBlocks || [],
        theme: userData.websiteSettings.theme,
        publishedUrl: publishedUrl,
        lastModified: new Date(),
        version: '1.0.0'
      };

      localStorage.setItem("websiteData", JSON.stringify(websiteData));
      localStorage.setItem("websiteLastSaved", new Date().toISOString());
      localStorage.setItem("websiteAutoSave", autoSaveEnabled.toString());
      
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      setSaveStatus('saved');
      
      console.log("Website auto-saved successfully");
    } catch (error) {
      console.error("Auto-save failed:", error);
      setSaveStatus('error');
      toast.error("Auto-save failed", {
        description: "Please save manually",
      });
    } finally {
      setSaveLoading(false);
    }
  }, [saveUserData, userData.websiteSettings, itineraries, publishedUrl, autoSaveEnabled]);

  // Enhanced manual save function
  const handleManualSave = useCallback(async () => {
    try {
      setSaveLoading(true);
      setSaveStatus('saving');
      
      await handleAutoSave();
      
      toast.success("Website saved successfully", {
        description: "All changes have been saved",
      });
    } catch (error) {
      setSaveStatus('error');
      toast.error("Save failed", {
        description: "Please try again",
      });
    } finally {
      setSaveLoading(false);
    }
  }, [handleAutoSave]);

  // Export website data
  const handleExportWebsite = useCallback(() => {
    try {
      const websiteData: WebsiteData = {
        settings: userData.websiteSettings,
        itineraries: itineraries,
        blocks: userData.websiteSettings.placedBlocks || [],
        theme: userData.websiteSettings.theme,
        publishedUrl: publishedUrl,
        lastModified: new Date(),
        version: '1.0.0'
      };

      const dataStr = JSON.stringify(websiteData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `website-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Website exported", {
        description: "Backup file downloaded",
      });
    } catch (error) {
      toast.error("Export failed", {
        description: "Please try again",
      });
    }
  }, [userData.websiteSettings, itineraries, publishedUrl]);

  // Import website data
  const handleImportWebsite = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const websiteData: WebsiteData = JSON.parse(e.target?.result as string);
        
        // Validate the imported data
        if (websiteData.settings && websiteData.itineraries) {
          updateWebsiteSettings(websiteData.settings);
          setItineraries(websiteData.itineraries);
          if (websiteData.publishedUrl) {
            setPublishedUrl(websiteData.publishedUrl);
            localStorage.setItem("publishedWebsiteUrl", websiteData.publishedUrl);
          }
          
          // Save the imported data
          localStorage.setItem("websiteData", JSON.stringify(websiteData));
          localStorage.setItem("culturinItineraries", JSON.stringify(websiteData.itineraries));
          
          toast.success("Website imported", {
            description: "Your website data has been restored",
          });
        } else {
          throw new Error("Invalid website data format");
        }
      } catch (error) {
        toast.error("Import failed", {
          description: "Invalid file format",
        });
      }
    };
    reader.readAsText(file);
  }, [updateWebsiteSettings]);

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
        }
      }

      setPreviewKey((prev) => prev + 1);
      toast.success("Preview refreshed", {
        description: "Website preview has been updated",
      });
    } catch (error) {
      toast.error("Failed to refresh preview", {
        description: "Please try again",
      });
    } finally {
      setRefreshLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "reset-brand-color":
        updateWebsiteSettings({ primaryColor: "#3B82F6" });
        toast.success("Brand color reset", {
          description: "Reset to default blue color",
        });
        break;
      case "disable-booking":
        updateWebsiteSettings({ enableBooking: false });
        toast.success("Booking disabled", {
          description: "Booking functionality has been turned off",
        });
        break;
      default:
        break;
    }
  };

  // Format last saved time
  const lastSavedText = useMemo(() => {
    if (!lastSaved) return "Never";
    const now = new Date();
    const diff = now.getTime() - lastSaved.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }, [lastSaved]);

  // Save status indicator
  const getSaveStatusIcon = () => {
    switch (saveStatus) {
      case 'saving':
        return <Loader2 className="h-3 w-3 animate-spin text-blue-500" />;
      case 'error':
        return <div className="h-3 w-3 rounded-full bg-red-500" />;
      case 'saved':
        return <Check className="h-3 w-3 text-green-500" />;
      default:
        return <div className="h-3 w-3 rounded-full bg-gray-300" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
        {/* Sidebar Header - Fixed */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">Your Website</h2>
            <p className="text-sm text-gray-600">
              Customize your tour operator website with real-time preview and booking functionality.
            </p>
          </div>
          
          {/* Status Indicators */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              {getSaveStatusIcon()}
              <span className={saveStatus === 'error' ? 'text-red-600' : 'text-gray-600'}>
                {saveStatus === 'saving' ? 'Saving...' : 
                 saveStatus === 'error' ? 'Save failed' : 
                 hasUnsavedChanges ? 'Unsaved changes' : 'All changes saved'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Zap className="h-3 w-3" />
              Auto-save: {autoSaveEnabled ? 'On' : 'Off'}
            </div>
            <div className="text-sm text-gray-500">
              Last saved: {lastSavedText}
            </div>
          </div>
        </div>

        {/* Scrollable Content Area - Everything below status indicators */}
        <div className="flex-1 overflow-y-auto">
          {/* Action Buttons (now scrollable) */}
          <div className="p-6 border-b border-gray-200 space-y-4">
            <div className="flex gap-2">
              <Button 
                onClick={handleManualSave}
                disabled={saveLoading || !hasUnsavedChanges}
                className="flex-1"
                variant={hasUnsavedChanges ? "default" : "outline"}
              >
                {saveLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save
              </Button>
              <Button 
                onClick={handleReloadPreview}
                disabled={refreshLoading}
                variant="outline"
                size="icon"
              >
                {refreshLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={undo}
                disabled={historyIndex <= 0}
                variant="outline"
                size="icon"
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button 
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
                variant="outline"
                size="icon"
              >
                <Redo className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Published URL Status (scrollable) */}
          {publishedUrl && (
            <div className="p-6 border-b border-gray-200">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-800">Site Published</span>
                </div>
                <div className="text-sm text-green-700 mb-3">
                  {publishedUrl}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <ShoppingCart className="h-3 w-3 text-green-600" />
                  <span className="text-sm text-green-700">Booking Enabled</span>
                </div>
                <Button
                  onClick={handlePreviewSite}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Visit Site
                </Button>
              </div>
            </div>
          )}

          {/* Quick Actions (scrollable) */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-medium text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">BRAND SETTINGS</h4>
                <Button
                  onClick={() => handleQuickAction("reset-brand-color")}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Reset Brand Color
                </Button>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">BOOKING SETTINGS</h4>
                <Button
                  onClick={() => handleQuickAction("disable-booking")}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Disable Booking
                </Button>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">BACKUP & RESTORE</h4>
                <div className="space-y-2">
                  <Button
                    onClick={handleExportWebsite}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Website
                  </Button>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportWebsite}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Import Website
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs (scrollable) */}
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="flex flex-col w-full justify-start">
                <TabsTrigger value="preview" className="w-full justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="builder" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Builder
                </TabsTrigger>
                <TabsTrigger value="themes" className="w-full justify-start">
                  <Palette className="h-4 w-4 mr-2" />
                  Themes
                </TabsTrigger>
                <TabsTrigger value="content" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Content
                </TabsTrigger>
                <TabsTrigger value="booking" className="w-full justify-start">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Booking
                </TabsTrigger>
                <TabsTrigger value="media-library" className="w-full justify-start">
                  <Image className="h-4 w-4 mr-2" />
                  Media Library
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Preview Controls (fixed) */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Website Preview</h2>
              <p className="text-sm text-gray-600">See your changes in real-time</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleReloadPreview}
                disabled={refreshLoading}
                variant="outline"
                size="sm"
              >
                {refreshLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Monitor className="h-4 w-4 mr-2" />
                Desktop
              </Button>
              <Button variant="outline" size="sm">
                <Tablet className="h-4 w-4 mr-2" />
                Mobile
              </Button>
            </div>
          </div>
        </div>

        {/* Content based on active tab (scrollable) */}
        <div className="flex-1 overflow-auto">
                     <TabsContent value="preview" className="h-full">
             <WebsitePreview
               key={previewKey}
               itineraries={itineraries}
             />
           </TabsContent>

          <TabsContent value="builder" className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Building Blocks</h3>
                  <p className="text-sm text-gray-600">Drag blocks to build your website</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
              <DragDropBuilder />
            </div>
          </TabsContent>

          <TabsContent value="themes" className="p-6">
            <WebsiteThemes />
          </TabsContent>

          <TabsContent value="content" className="p-6">
            <WebsiteContent />
          </TabsContent>

          <TabsContent value="booking" className="p-6">
            <BookingFlowBuilder />
          </TabsContent>

          <TabsContent value="media-library" className="p-6">
            <MediaLibrary />
          </TabsContent>
        </div>
      </div>

      {/* Publish Button - Fixed at bottom */}
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={handlePublish}
          disabled={publishLoading}
          size="lg"
          className="bg-culturin-indigo hover:bg-culturin-indigo/90 shadow-lg"
        >
          {publishLoading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Publishing...
            </>
          ) : (
            <>
              <Globe className="h-5 w-5 mr-2" />
              Publish Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default WebsiteBuilder;

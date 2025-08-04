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
import { ItineraryType } from "@/data/itineraryData";
import { useUserData } from "../../../src/contexts/UserDataContext";
import MediaLibrary from "./MediaLibrary";
import { settingsService } from "@/lib/settings-service";
import { itineraryService } from "@/lib/itinerary-service";
import { supabase } from "@/lib/supabase";
import { localStorageUtils } from "@/lib/localStorage";

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
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile' | 'tablet'>('desktop');

  // History management
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isUndoRedoAction, setIsUndoRedoAction] = useState(false);

  const navigate = useNavigate();
  const { userData, updateWebsiteSettings, saveUserData } = useUserData();

  // Initialize data - only on client side
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Load website data from localStorage and database
    const loadWebsiteData = async () => {
      try {
        // Load published URL
        const storedUrl = localStorage.getItem("publishedWebsiteUrl");
        setPublishedUrl(storedUrl || "tour/demo");

        // Load itineraries from database only - no sample data fallback
        try {
          const { data: user } = await supabase.auth.getUser();
          if (user.user) {
      
            const dbItineraries = await itineraryService.getItineraries(user.user.id);
            
            if (dbItineraries && dbItineraries.length > 0) {
              setItineraries(dbItineraries);
              localStorage.setItem("culturinItineraries", JSON.stringify(dbItineraries));
              
            } else {
              
              setItineraries([]);
              localStorage.removeItem("culturinItineraries");
            }
          } else {

            setItineraries([]);
            localStorage.removeItem("culturinItineraries");
          }
        } catch (error) {
          console.error("Error loading itineraries from database:", error);
          setItineraries([]);
          localStorage.removeItem("culturinItineraries");
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
        const initialHistory: HistoryState = {
          websiteSettings: userData?.websiteSettings || {},
          itineraries: itineraries,
          timestamp: Date.now(),
        };
        setHistory([initialHistory]);
        setHistoryIndex(0);


      } catch (error) {
        console.error("Error loading website data:", error);
        // No fallback - keep empty state
        setItineraries([]);
        localStorage.removeItem("culturinItineraries");
      }
    };

    loadWebsiteData();
  }, [userData?.websiteSettings]);

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
  }, [userData?.websiteSettings, autoSaveEnabled]);

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
          websiteSettings: userData?.websiteSettings || {},
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
      addToHistory({ websiteSettings: userData?.websiteSettings || {}, itineraries });
      toast.success("Theme applied", {
        description: `Applied "${event.detail.theme}" theme to preview`,
      });
    };

    const handleItineraryChange = async (event: CustomEvent) => {

      try {
        // Refresh itineraries from database when itinerary changes
        const { data: user } = await supabase.auth.getUser();
        if (user.user) {
          const dbItineraries = await itineraryService.getItineraries(user.user.id);
          
          
          // Always update itineraries, even if empty
          setItineraries(dbItineraries || []);
          
          if (dbItineraries && dbItineraries.length > 0) {
            localStorage.setItem("culturinItineraries", JSON.stringify(dbItineraries));

          } else {
            localStorage.removeItem("culturinItineraries");
          }
          
          setPreviewKey((prev) => prev + 1);
          toast.success("Itineraries updated", {
            description: "Website preview reflects latest itinerary changes",
          });
        }
      } catch (error) {
        console.error("Error updating itineraries:", error);
        toast.error("Failed to update itineraries", {
          description: "Please try refreshing the page",
        });
      }
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
      window.addEventListener(
        "itineraryChanged",
        handleItineraryChange as EventListener
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
        window.removeEventListener(
          "itineraryChanged",
          handleItineraryChange as EventListener
        );
      };
    }
  }, [userData.websiteSettings]);

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
      
      // Save website-specific data with compression
      const websiteData: WebsiteData = {
        settings: {
          ...userData?.websiteSettings,
          // Don't save large objects to localStorage
          placedBlocks: undefined,
          headerImage: userData?.websiteSettings?.headerImage ? 'saved' : null,
        },
        itineraries: itineraries.slice(0, 10), // Limit to 10 itineraries for localStorage
        blocks: [], // Don't save blocks to localStorage
        theme: userData?.websiteSettings?.theme || "classic",
        publishedUrl: publishedUrl,
        lastModified: new Date(),
        version: '1.0.0'
      };

      try {
        // Use localStorage utility for better quota handling
        const success1 = localStorageUtils.setItem("websiteData", JSON.stringify(websiteData));
        const success2 = localStorageUtils.setItem("websiteLastSaved", new Date().toISOString());
        const success3 = localStorageUtils.setItem("websiteAutoSave", autoSaveEnabled.toString());
        
        if (success1 && success2 && success3) {
          setLastSaved(new Date());
          setHasUnsavedChanges(false);
          setSaveStatus('saved');
  
        } else {
          throw new Error("Failed to save to localStorage");
        }
      } catch (storageError) {
        console.error("localStorage quota exceeded, clearing space and retrying");
        
        // Clear some space and try again
        try {
          localStorageUtils.clearNonEssential();
          
          // Save minimal data
          const minimalData = {
            theme: userData?.websiteSettings?.theme || "classic",
            publishedUrl: publishedUrl,
            lastModified: new Date().toISOString(),
          };
          
          const success = localStorageUtils.setItem("websiteData", JSON.stringify(minimalData));
          localStorageUtils.setItem("websiteLastSaved", new Date().toISOString());
          
          if (success) {
            setLastSaved(new Date());
            setHasUnsavedChanges(false);
            setSaveStatus('saved');

          } else {
            throw new Error("Failed to save minimal data");
          }
        } catch (retryError) {
          console.error("Failed to save even minimal data:", retryError);
          setSaveStatus('error');
          toast.error("Storage full", {
            description: "Please clear browser data or save manually",
          });
        }
      }
    } catch (error) {
      console.error("Auto-save failed:", error);
      setSaveStatus('error');
      toast.error("Auto-save failed", {
        description: "Please save manually",
      });
    } finally {
      setSaveLoading(false);
    }
  }, [saveUserData, userData?.websiteSettings, itineraries, publishedUrl, autoSaveEnabled]);

  // Enhanced manual save function
  const handleManualSave = useCallback(async () => {
    try {
      setSaveLoading(true);
      setSaveStatus('saving');
      
      const websiteData = {
        settings: {
          ...userData?.websiteSettings,
          // Don't save large objects to localStorage
          placedBlocks: undefined,
          headerImage: userData?.websiteSettings?.headerImage ? 'saved' : null,
        },
        itineraries: itineraries.slice(0, 10), // Limit itineraries for localStorage
        blocks: [], // Don't save blocks to localStorage
        theme: userData?.websiteSettings?.theme || "classic",
        publishedUrl: publishedUrl,
      };

      try {
        // Save using the settings service
        await settingsService.saveWebsiteData(websiteData);
        
        // Also save user data locally
        saveUserData();
        
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
        setSaveStatus('saved');
        
        toast.success("Website saved successfully", {
          description: "All changes have been saved",
        });
      } catch (storageError) {
        console.error("Storage quota exceeded, trying minimal save");
        
        // Try saving minimal data
        try {
          const minimalData = {
            settings: {
              companyName: userData?.websiteSettings?.companyName || "",
              tagline: userData?.websiteSettings?.tagline || "",
              theme: userData?.websiteSettings?.theme || "classic",
              enableBooking: userData?.websiteSettings?.enableBooking || true,
            },
            theme: userData?.websiteSettings?.theme || "classic",
            publishedUrl: publishedUrl,
          };
          
          await settingsService.saveWebsiteData(minimalData);
          saveUserData();
          
          setLastSaved(new Date());
          setHasUnsavedChanges(false);
          setSaveStatus('saved');
          
          toast.success("Website saved with minimal data", {
            description: "Some data was too large to save",
          });
        } catch (retryError) {
          console.error("Failed to save even minimal data:", retryError);
          setSaveStatus('error');
          toast.error("Storage full", {
            description: "Please clear browser data or try again",
          });
        }
      }
    } catch (error) {
      console.error('Error saving website:', error);
      setSaveStatus('error');
      toast.error("Save failed", {
        description: error instanceof Error ? error.message : "Please try again",
      });
    } finally {
      setSaveLoading(false);
    }
  }, [userData?.websiteSettings, itineraries, publishedUrl, saveUserData]);

  // Export website data
  const handleExportWebsite = useCallback(() => {
    try {
      const websiteData: WebsiteData = {
        settings: userData?.websiteSettings || {},
        itineraries: itineraries,
        blocks: userData?.websiteSettings?.placedBlocks || [],
        theme: userData?.websiteSettings?.theme || "classic",
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
  }, [userData?.websiteSettings, itineraries, publishedUrl]);

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
    if (!userData?.businessName) {
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
      const slug = `${userData?.businessName
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
        companyName: userData?.websiteSettings?.companyName || "",
        tagline: userData?.websiteSettings?.tagline || "",
        description: userData?.websiteSettings?.description || "",
        primaryColor: userData?.websiteSettings?.primaryColor || "#9b87f5",
        headerImage: userData?.websiteSettings?.headerImage || null,
        enableBooking: userData?.websiteSettings?.enableBooking || true,
        bookingSettings: userData?.websiteSettings?.bookingSettings || {},
      };

      localStorage.setItem(
        "publishedWebsiteTheme",
        userData?.websiteSettings?.theme || "classic"
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
      // Refresh itineraries from database
      const { data: user } = await supabase.auth.getUser();
      if (user.user) {
        const dbItineraries = await itineraryService.getItineraries(user.user.id);

        
        // Always update itineraries, even if empty
        setItineraries(dbItineraries || []);
        
        if (dbItineraries && dbItineraries.length > 0) {
          localStorage.setItem("culturinItineraries", JSON.stringify(dbItineraries));

        } else {
          localStorage.removeItem("culturinItineraries");
        }
      } else {

        setItineraries([]);
        localStorage.removeItem("culturinItineraries");
      }

      setPreviewKey((prev) => prev + 1);
      toast.success("Preview refreshed", {
        description: "Website preview has been updated with latest itineraries",
      });
    } catch (error) {
      console.error("Error refreshing preview:", error);
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
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col overflow-hidden rounded-r-lg">
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

        {/* Navigation Tabs - Moved to top */}
        <div className="p-6 border-b border-gray-200">
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

        {/* Scrollable Content Area - Everything below navigation */}
        <div className="flex-1 overflow-y-auto">
          {/* Action Buttons - Save and Publish */}
          <div className="p-6 border-b border-gray-200 space-y-4">
            <div className="flex gap-2">
              <Button 
                onClick={handleManualSave}
                disabled={saveLoading}
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
                onClick={handlePublish}
                disabled={publishLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {publishLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Globe className="h-4 w-4 mr-2" />
                )}
                Publish
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={undo}
                disabled={historyIndex <= 0 || history.length === 0}
                variant="outline"
                size="icon"
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button 
                onClick={redo}
                disabled={historyIndex >= history.length - 1 || history.length === 0}
                variant="outline"
                size="icon"
              >
                <Redo className="h-4 w-4" />
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
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Content based on active tab */}
        <div className="flex-1 overflow-auto">
          {activeTab === "preview" && (
            <div className="h-full p-6">
              <WebsitePreview
                key={previewKey}
                itineraries={itineraries}
                viewMode={viewMode}
              />
            </div>
          )}

          {activeTab === "builder" && (
            <div className="h-full p-6">
              <div className="space-y-6 h-full">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Building Blocks</h3>
                    <p className="text-sm text-gray-600">Drag blocks to build your website</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setActiveTab("preview")}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleExportWebsite}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button 
                      size="sm"
                      onClick={handleManualSave}
                      disabled={saveLoading}
                    >
                      {saveLoading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      Save
                    </Button>
                  </div>
                </div>
                <div className="flex-1 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <DragDropBuilder />
                </div>
              </div>
            </div>
          )}

          {activeTab === "themes" && (
            <div className="h-full p-6">
              <WebsiteThemes />
            </div>
          )}

          {activeTab === "content" && (
            <div className="h-full p-6">
              <WebsiteContent />
            </div>
          )}

          {activeTab === "booking" && (
            <div className="h-full p-6">
              <BookingFlowBuilder />
            </div>
          )}

          {activeTab === "media-library" && (
            <div className="h-full p-6">
              <MediaLibrary />
            </div>
          )}
        </div>
      </div>


    </div>
  );
};

export default WebsiteBuilder;

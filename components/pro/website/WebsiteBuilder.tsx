"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WebsitePreview from "./WebsitePreview";
import WebsiteThemes from "./WebsiteThemes";
import WebsiteContent from "./WebsiteContent";
import WebsiteSettings from "./WebsiteSettings";
import UserWebsiteSettings from "./UserWebsiteSettings";
import { userWebsiteService } from "./UserWebsiteService";
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
  Copy,
  Share,
  HelpCircle,
  MessageCircle,
  Maximize,
  Minimize,
} from "lucide-react";
import { useNavigate } from "../../../lib/navigation";
import { Itinerary } from "@/hooks/useItineraries";
import { useUserData } from "../../../src/contexts/UserDataContext";
import MediaLibrary from "./MediaLibrary";
import { settingsService } from "@/lib/settings-service";
import { itineraryService } from "@/lib/itinerary-service";
import { supabase } from "@/lib/supabase";
import { supabaseStorage } from "@/lib/supabase-storage";
import { useAuth } from "@/src/components/auth/AuthProvider";

// History management for undo/redo functionality
interface HistoryState {
  websiteSettings: any;
  itineraries: Itinerary[];
  timestamp: number;
}

interface HistoryInput {
  websiteSettings: any;
  itineraries: Itinerary[];
}

// Website data structure for persistence
interface WebsiteData {
  settings: any;
  itineraries: Itinerary[];
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
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [previewKey, setPreviewKey] = useState(0);
  const [websiteSettingsChanged, setWebsiteSettingsChanged] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "error">(
    "saved"
  );
  const [viewMode, setViewMode] = useState<"desktop" | "mobile" | "tablet">(
    "desktop"
  );
  const [isFullScreen, setIsFullScreen] = useState(false);

  // History management
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isUndoRedoAction, setIsUndoRedoAction] = useState(false);

  const navigate = useNavigate();
  const { userData } = useUserData();
  const { user, isLoggedIn } = useAuth();

  // Initialize data - only on client side
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadWebsiteData = async () => {
      try {
        if (!user?.id) {
          console.log("No authenticated user, using defaults");
          setItineraries([]);
          setPublishedUrl("tour/demo");
          setHasUnsavedChanges(false);
          return;
        }

        // Load user website data using UserWebsiteService
        const websiteData = await userWebsiteService.getUserWebsiteData(user.id);
        
        if (websiteData) {
          // Set published URL from settings
          if (websiteData.settings.published_url) {
            setPublishedUrl(websiteData.settings.published_url);
          } else {
            // Generate default URL if none exists
            const defaultUrl = userWebsiteService.generateWebsiteUrl(
              user.id, 
              websiteData.settings.company_name
            );
            setPublishedUrl(defaultUrl);
          }

          // Set itineraries
          setItineraries(websiteData.itineraries || []);

          // Store in localStorage for compatibility
          localStorage.setItem(`websiteData_${user.id}`, JSON.stringify({
            settings: websiteData.settings,
            itineraries: websiteData.itineraries,
            publishedUrl: websiteData.settings.published_url,
            lastLoaded: new Date().toISOString()
          }));

          // Store published URL for persistence
          if (websiteData.settings.published_url) {
            localStorage.setItem(`publishedWebsiteUrl_${user.id}`, websiteData.settings.published_url);
          }
        }

        // Add initial state to history
        const initialHistory: HistoryState = {
          websiteSettings: websiteData?.settings || {},
          itineraries: websiteData?.itineraries || [],
          timestamp: Date.now(),
        };
        setHistory([initialHistory]);
        setHistoryIndex(0);

        // Set hasUnsavedChanges to false initially
        setHasUnsavedChanges(false);
        setLastSaved(new Date());
        setSaveStatus("saved");
      } catch (error) {
        console.error("Error loading website data:", error);
        setItineraries([]);
        setPublishedUrl("tour/demo");
        setHasUnsavedChanges(false);
      }
    };

    loadWebsiteData();
  }, [user?.id]);

  // Auto-refresh preview when user data changes
  useEffect(() => {
    if (!isUndoRedoAction) {
      setPreviewKey((prev) => prev + 1);
      setHasUnsavedChanges(true);
      setSaveStatus("saving");

      // Auto-save if enabled
      if (autoSaveEnabled) {
        const timeoutId = setTimeout(() => {
          handleAutoSave();
        }, 2000); // Auto-save after 2 seconds of inactivity

        return () => clearTimeout(timeoutId);
      }
    }
    setIsUndoRedoAction(false);
  }, [autoSaveEnabled]);

  // Listen for website settings changes
  useEffect(() => {
    const handleSettingsChange = (event: CustomEvent) => {
      setPreviewKey((prev) => prev + 1);
      setHasUnsavedChanges(true);
      setSaveStatus("saving");

      // Update itineraries if they changed
      if (event.detail?.filteredItineraries) {
        setItineraries(event.detail.filteredItineraries);
        addToHistory({
          websiteSettings: {},
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
      setSaveStatus("saving");
      addToHistory({
        websiteSettings: {},
        itineraries,
      });
      toast.success("Theme applied", {
        description: `Applied "${event.detail.theme}" theme to preview`,
      });
    };

    const handleItineraryChange = async (event: CustomEvent) => {
      try {
        // Refresh itineraries from database when itinerary changes
        const { data: user } = await supabase.auth.getUser();
        if (user.user) {
          const dbItineraries = await itineraryService.getItineraries();

          // Always update itineraries, even if empty
          setItineraries(dbItineraries || []);

          if (dbItineraries && dbItineraries.length > 0) {
            // Note: Itineraries are now saved to Supabase storage
          } else {
            // Note: Itineraries are now saved to Supabase storage
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
  }, []);

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
      // Note: Website settings would be saved to a separate service in the new structure
      setItineraries(previousState.itineraries);
      // Note: Itineraries are now saved to Supabase storage

      toast.success("Undone", {
        description: "Reverted to previous state",
      });
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setIsUndoRedoAction(true);
      const nextState = history[historyIndex + 1];
      setHistoryIndex((prev) => prev + 1);

      // Restore state
      // Note: Website settings would be saved to a separate service in the new structure
      setItineraries(nextState.itineraries);
      // Note: Itineraries are now saved to Supabase storage

      toast.success("Redone", {
        description: "Applied next state",
      });
    }
  }, [history, historyIndex]);

  const handleSettingsChange = useCallback(() => {
    // Trigger immediate preview refresh when settings change
    setPreviewKey((prev) => prev + 1);
    setHasUnsavedChanges(true);
    setSaveStatus("saving");
  }, []);

  // Enhanced auto-save function with authentication
  const handleAutoSave = useCallback(async () => {
    try {
      setSaveLoading(true);

      if (!isLoggedIn || !user) {
        // Note: Data persistence is now handled by Supabase storage
        setSaveStatus("saved");
        return;
      }

      // Note: User data is now handled by Supabase storage

      // Save website data to Supabase for authenticated users
      const websiteData = {
        settings: {
          companyName: "Your Tour Company",
          tagline: "Discover amazing cultural experiences",
          description: "We specialize in authentic cultural tours",
          primaryColor: "#3B82F6",
          theme: "classic",
          enableBooking: true,
        },
        itineraries: itineraries.slice(0, 5), // Limit to 5 itineraries
        publishedUrl: publishedUrl,
        lastModified: new Date().toISOString(),
      };

      try {
        // Save to Supabase user_settings table
        const { error } = await supabase.from("user_settings").upsert({
          user_id: user.id,
          website_settings: websiteData,
          updated_at: new Date().toISOString(),
        });

        if (error) {
          throw new Error(`Supabase save failed: ${error.message}`);
        }

        setLastSaved(new Date());
        setHasUnsavedChanges(false);
        setSaveStatus("saved");
      } catch (error) {
        console.error("Auto-save failed:", error);
        setSaveStatus("error");
      } finally {
        setSaveLoading(false);
      }
    } catch (error) {
      console.error("Auto-save failed:", error);
      setSaveStatus("error");
    } finally {
      setSaveLoading(false);
    }
  }, [itineraries, publishedUrl, autoSaveEnabled, isLoggedIn, user]);

  // Enhanced manual save function with authentication
  const handleManualSave = useCallback(async () => {
    if (!user?.id) {
      toast.error("Please log in to save your website");
      return;
    }

    setSaveLoading(true);
    setSaveStatus("saving");
    
    try {
      // Get current website settings
      const currentSettings = await userWebsiteService.getUserWebsiteSettings(user.id);
      
      // Get any customizations from localStorage
      const websiteContentStr = localStorage.getItem("publishedWebsiteContent");
      const websiteDataStr = localStorage.getItem(`websiteData_${user.id}`);
      
      let updatedSettings = { ...currentSettings };
      
      // Apply customizations from WebsiteContent component
      if (websiteContentStr) {
        try {
          const websiteContent = JSON.parse(websiteContentStr);
          updatedSettings = {
            ...updatedSettings,
            company_name: websiteContent.companyName || updatedSettings.company_name,
            tagline: websiteContent.tagline || updatedSettings.tagline,
            description: websiteContent.description || updatedSettings.description,
            branding: {
              ...updatedSettings.branding,
              primary_color: websiteContent.primaryColor || updatedSettings.branding.primary_color,
              header_image: websiteContent.headerImage || updatedSettings.branding.header_image,
              theme: websiteContent.theme || updatedSettings.branding.theme,
            }
          };
        } catch (e) {
          console.error("Error parsing website content:", e);
        }
      }

      // Apply any builder-specific settings
      if (websiteDataStr) {
        try {
          const websiteData = JSON.parse(websiteDataStr);
          if (websiteData.settings) {
            updatedSettings = {
              ...updatedSettings,
              ...websiteData.settings,
              user_id: user.id, // Ensure user_id is correct
            };
          }
        } catch (e) {
          console.error("Error parsing website data:", e);
        }
      }

      // Save to UserWebsiteService
      const success = await userWebsiteService.saveUserWebsiteSettings(updatedSettings);
      
      if (success) {
        toast.success("Website saved successfully!", {
          description: "All changes have been saved to your account",
        });
        
        setHasUnsavedChanges(false);
        setLastSaved(new Date());
        setSaveStatus("saved");
        
        // Update localStorage with consistent data
        localStorage.setItem(`websiteData_${user.id}`, JSON.stringify({
          settings: updatedSettings,
          itineraries: itineraries.slice(0, 10), // Save current itineraries
          publishedUrl: publishedUrl,
          lastSaved: new Date().toISOString()
        }));

        // Force preview refresh
        setPreviewKey(prev => prev + 1);
      } else {
        throw new Error("Failed to save to database");
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save website", {
        description: "Please try again or contact support if the issue persists",
      });
      setSaveStatus("error");
    } finally {
      setSaveLoading(false);
    }
  }, [user?.id, itineraries, publishedUrl]);

  // Export website data
  const handleExportWebsite = useCallback(() => {
    try {
      const websiteData: WebsiteData = {
        settings: {
          companyName: "Your Tour Company",
          tagline: "Discover amazing cultural experiences",
          description: "We specialize in authentic cultural tours",
          primaryColor: "#3B82F6",
          theme: "classic",
          enableBooking: true,
        },
        itineraries: itineraries,
        blocks: [],
        theme: "classic",
        publishedUrl: publishedUrl,
        lastModified: new Date(),
        version: "1.0.0",
      };

      const dataStr = JSON.stringify(websiteData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `website-backup-${
        new Date().toISOString().split("T")[0]
      }.json`;
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
  }, [itineraries, publishedUrl]);

  // Import website data
  const handleImportWebsite = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const websiteData: WebsiteData = JSON.parse(
            e.target?.result as string
          );

          // Validate the imported data
          if (websiteData.settings && websiteData.itineraries) {
            // Note: Website settings would be saved to a separate service in the new structure
            setItineraries(websiteData.itineraries);
            if (websiteData.publishedUrl) {
              setPublishedUrl(websiteData.publishedUrl);
              localStorage.setItem(
                "publishedWebsiteUrl",
                websiteData.publishedUrl
              );
            }

            // Note: Data persistence is now handled by Supabase storage

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
    },
    []
  );

  const handlePublish = async () => {
    if (!user?.id) {
      toast.error("Please log in to publish your website");
      return;
    }

    setPublishLoading(true);

    try {
      // Save current state before publishing
      await handleManualSave();

      // Get current website settings
      const currentSettings = await userWebsiteService.getUserWebsiteSettings(user.id);
      
      // Validate required fields
      if (!currentSettings.company_name || currentSettings.company_name === "Your Cultural Tours") {
        toast.error("Please set your company name before publishing", {
          description: "Go to Content tab and add your business details",
        });
        return;
      }

      // Publish website using UserWebsiteService
      const result = await userWebsiteService.publishWebsite(user.id);
      
      if (result.success && result.url) {
        setPublishedUrl(result.url);
        
        // Store published URL for persistence
        localStorage.setItem(`publishedWebsiteUrl_${user.id}`, result.url);
        
        toast.success("Website published successfully!", {
          description: `Your website is now live at: ${window.location.origin}/${result.url}`,
          action: {
            label: "View Website",
            onClick: () => window.open(`/${result.url}`, '_blank')
          }
        });

        setHasUnsavedChanges(false);
      } else {
        throw new Error("Failed to publish website");
      }
    } catch (error) {
      console.error("Publish error:", error);
      toast.error("Failed to publish website", {
        description: "Please try again or contact support",
      });
    } finally {
      setPublishLoading(false);
    }
  };

  const handleCopyUrl = async () => {
    try {
      const fullUrl = `${window.location.origin}/${publishedUrl}`;
      await navigator.clipboard.writeText(fullUrl);
      toast.success("URL copied to clipboard!", {
        description: "You can now share your website link",
      });
    } catch (error) {
      toast.error("Failed to copy URL", {
        description: "Please try again",
      });
    }
  };

  const handlePreviewSite = () => {
    try {
      if (typeof window !== "undefined") {
        // Use the current domain with the published URL path
        const fullUrl = `${window.location.origin}/${publishedUrl}`;
        window.open(fullUrl, "_blank", "noopener,noreferrer");
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
        const dbItineraries = await itineraryService.getItineraries();

        // Always update itineraries, even if empty
        setItineraries(dbItineraries || []);

        // Note: Itineraries are now saved to Supabase storage
      } else {
        setItineraries([]);
        // Note: Itineraries are now saved to Supabase storage
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

  const handleToggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    toast.success(
      isFullScreen ? "Exited full-screen mode" : "Entered full-screen mode",
      {
        description: isFullScreen
          ? "Website builder returned to normal view"
          : "Website builder now takes full page",
      }
    );
  };

  // Update published URL when business name changes
  const updatePublishedUrl = useCallback(async () => {
    const businessName = "tour-company";

    // Get current user for unique URL generation
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user || (await supabase.auth.getUser()).data.user;

    if (
      businessName &&
      user?.id &&
      !publishedUrl.includes(user.id.substring(0, 8))
    ) {
      const cleanBusinessName = businessName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      const userId = user.id.substring(0, 8);
      const timestamp = Date.now().toString(36);
      const newUrl = `tour/${cleanBusinessName}-${userId}-${timestamp}`;
      setPublishedUrl(newUrl);

      // Note: Published URL would be saved to Supabase storage
    }
  }, [publishedUrl]);

  // Update URL when business name changes
  useEffect(() => {
    updatePublishedUrl();
  }, [updatePublishedUrl]);

  // Format last saved time
  const lastSavedText = useMemo(() => {
    if (!lastSaved) return "Never";
    const now = new Date();
    const diff = now.getTime() - lastSaved.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }, [lastSaved]);

  // Save status indicator
  const getSaveStatusIcon = () => {
    switch (saveStatus) {
      case "saving":
        return <Loader2 className="h-3 w-3 animate-spin text-blue-500" />;
      case "error":
        return <div className="h-3 w-3 rounded-full bg-red-500" />;
      case "saved":
        return <Check className="h-3 w-3 text-green-500" />;
      default:
        return <div className="h-3 w-3 rounded-full bg-gray-300" />;
    }
  };

  return (
    <div
      className={`flex ${
        isFullScreen ? "fixed inset-0 z-50" : "h-screen"
      } bg-gray-50`}
    >
      {/* Sidebar */}
      <div
        className={`${
          isFullScreen ? "w-96" : "w-80"
        } bg-white border-r border-gray-200 flex flex-col overflow-hidden rounded-r-lg transition-all duration-300`}
      >
        {/* Sidebar Header - Fixed */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Your Website
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Customize your tour operator website with real-time preview and
              booking functionality.
            </p>
          </div>

          {/* Status Indicators */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              {getSaveStatusIcon()}
              <span
                className={
                  saveStatus === "error" ? "text-red-600" : "text-gray-600"
                }
              >
                {saveStatus === "saving"
                  ? "Saving..."
                  : saveStatus === "error"
                  ? "Save failed"
                  : hasUnsavedChanges
                  ? "Unsaved changes"
                  : "All changes saved"}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Zap className="h-3 w-3" />
              Auto-save: {autoSaveEnabled ? "On" : "Off"}
            </div>
            <div className="text-sm text-gray-500">
              Last saved: {lastSavedText}
            </div>
          </div>
        </div>

        {/* Scrollable Content Area - Everything below header */}
        <div className="flex-1 overflow-y-auto">
          {/* Navigation Tabs */}
          <div className="p-6 border-b border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Navigation
            </h4>
            <div className="space-y-2">
              <Button
                variant={activeTab === "preview" ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start text-xs"
                onClick={() => handleTabChange("preview")}
              >
                <Eye className="h-3 w-3 mr-2" />
                Preview
              </Button>
              <Button
                variant={activeTab === "builder" ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start text-xs"
                onClick={() => handleTabChange("builder")}
              >
                <Settings className="h-3 w-3 mr-2" />
                Builder
              </Button>
              <Button
                variant={activeTab === "themes" ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start text-xs"
                onClick={() => handleTabChange("themes")}
              >
                <Palette className="h-3 w-3 mr-2" />
                Themes
              </Button>
              <Button
                variant={activeTab === "content" ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start text-xs"
                onClick={() => handleTabChange("content")}
              >
                <FileText className="h-3 w-3 mr-2" />
                Content
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start text-xs"
                onClick={() => handleTabChange("settings")}
              >
                <Settings className="h-3 w-3 mr-2" />
                Settings
              </Button>
              <Button
                variant={activeTab === "booking" ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start text-xs"
                onClick={() => handleTabChange("booking")}
              >
                <ShoppingCart className="h-3 w-3 mr-2" />
                Booking
              </Button>
              <Button
                variant={activeTab === "media-library" ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start text-xs"
                onClick={() => handleTabChange("media-library")}
              >
                <Image className="h-3 w-3 mr-2" />
                Media Library
              </Button>
            </div>
          </div>
          {/* Action Buttons - Save and Publish */}
          <div className="p-6 border-b border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Actions</h4>
            <div className="flex gap-2">
              <Button
                onClick={handleManualSave}
                disabled={saveLoading}
                className="flex-1"
                variant="default"
                size="sm"
              >
                {saveLoading ? (
                  <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                ) : (
                  <Save className="h-3 w-3 mr-2" />
                )}
                Save
              </Button>
              <Button
                onClick={handlePublish}
                disabled={publishLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                {publishLoading ? (
                  <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                ) : (
                  <Globe className="h-3 w-3 mr-2" />
                )}
                Publish
              </Button>
            </div>
          </div>

          {/* Published URL Status (scrollable) */}
          {publishedUrl && (
            <div className="p-6 border-b border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Site Status
              </h4>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="h-3 w-3 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Site Published
                  </span>
                </div>
                <div className="text-xs text-green-700 mb-3 break-all">
                  {typeof window !== "undefined"
                    ? `${window.location.origin}/${publishedUrl}`
                    : publishedUrl}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <ShoppingCart className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-700">
                    Booking Enabled
                  </span>
                </div>
                <Button
                  onClick={handlePreviewSite}
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                >
                  <Eye className="h-3 w-3 mr-2" />
                  Visit Site
                </Button>
              </div>
            </div>
          )}

          {/* Additional spacing to ensure scroll works */}
          <div className="p-6 space-y-4">
            <div className="text-xs text-gray-400 text-center">
              Website Builder v1.0
            </div>

            {/* Quick Actions Section */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Quick Actions
              </h4>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs"
                >
                  <Download className="h-3 w-3 mr-2" />
                  Export Website
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs"
                  onClick={handleCopyUrl}
                >
                  <Copy className="h-3 w-3 mr-2" />
                  Copy URL
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs"
                >
                  <Share className="h-3 w-3 mr-2" />
                  Share Site
                </Button>
              </div>
            </div>

            {/* Help Section */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Help & Support
              </h4>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs"
                >
                  <HelpCircle className="h-3 w-3 mr-2" />
                  Documentation
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs"
                >
                  <MessageCircle className="h-3 w-3 mr-2" />
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Content based on active tab */}
        <div className="flex-1 overflow-auto">
          {activeTab === "preview" && (
            <div className="h-full">
              <WebsitePreview
                key={previewKey}
                itineraries={itineraries}
                viewMode={viewMode}
              />
            </div>
          )}

          {activeTab === "builder" && (
            <div className="h-full p-6 pl-8">
              <div className="space-y-6 h-full">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Building Blocks</h3>
                    <p className="text-sm text-gray-600">
                      Drag blocks to build your website
                    </p>
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
                      onClick={handleToggleFullScreen}
                    >
                      {isFullScreen ? (
                        <Minimize className="h-4 w-4 mr-2" />
                      ) : (
                        <Maximize className="h-4 w-4 mr-2" />
                      )}
                      {isFullScreen ? "Collapse" : "Expand"}
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
            <div className="h-full p-6 pl-8">
              <WebsiteThemes />
            </div>
          )}

          {activeTab === "content" && (
            <div className="h-full p-6 pl-8">
              <WebsiteContent />
            </div>
          )}

          {activeTab === "settings" && (
            <div className="h-full p-6 pl-8">
              <UserWebsiteSettings
                onSettingsChange={() => {
                  setWebsiteSettingsChanged(true);
                  setPreviewKey((prev) => prev + 1);
                }}
              />
            </div>
          )}

          {activeTab === "booking" && (
            <div className="h-full p-6 pl-8">
              <BookingFlowBuilder />
            </div>
          )}

          {activeTab === "media-library" && (
            <div className="h-full p-6 pl-8">
              <MediaLibrary />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebsiteBuilder;

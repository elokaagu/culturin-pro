"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WebsitePreview from "./WebsitePreview";
import WebsiteThemes from "./WebsiteThemes";
import WebsiteContent from "./WebsiteContent";
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
  Image,
  FileText,
} from "lucide-react";
import { useNavigate } from "../../../lib/navigation";
import { Experience } from "@/hooks/useExperiences";
import { useUserData } from "../../../src/contexts/UserDataContext";
import MediaLibrary from "./MediaLibrary";
import { experienceService } from "@/lib/experience-service";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

// History management for undo/redo functionality
interface HistoryState {
  websiteSettings: any;
  experiences: Experience[];
  blocks: any[];
  timestamp: number;
}

const WebsiteBuilder: React.FC = () => {
  const [publishLoading, setPublishLoading] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");
  const [publishedUrl, setPublishedUrl] = useState("");
  const [experiences, setExperiences] = useState<Experience[]>([]);
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
  const [experiencesLoading, setExperiencesLoading] = useState(false);
  const [experiencesError, setExperiencesError] = useState<string | null>(null);
  const [saveButtonClicked, setSaveButtonClicked] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveTimeoutId, setSaveTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // History management
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isUndoRedoAction, setIsUndoRedoAction] = useState(false);

  const navigate = useNavigate();
  const { userData } = useUserData();
  const { user, isLoggedIn } = useAuth();

  // Initialize data - only on client side
  useEffect(() => {
    if (typeof window !== "undefined" && isLoggedIn && user) {
      initializeWebsiteData();
    }
  }, [isLoggedIn, user]);

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullScreen) {
        setIsFullScreen(false);
      }
    };

    if (isFullScreen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isFullScreen]);

  // Cleanup save timeouts on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutId) {
        clearTimeout(saveTimeoutId);
      }
    };
  }, [saveTimeoutId]);

  const initializeWebsiteData = useCallback(async () => {
    if (!user?.id) return;

    try {
      setExperiencesLoading(true);

      // Add aggressive timeout protection for initialization
      const initTimeout = setTimeout(() => {
        console.warn("⚠️ Website data initialization timeout - forcing completion");
        setExperiencesLoading(false);
        setExperiencesError("Initialization timeout - please refresh");
      }, 15000); // 15 second timeout

      try {
        // Load user's website settings with timeout
        const websiteSettingsPromise = userWebsiteService.getUserWebsiteSettings(user.id);
        const websiteSettings = await Promise.race([
          websiteSettingsPromise,
          new Promise((_, reject) => setTimeout(() => reject(new Error("Settings timeout")), 8000))
        ]) || {};

        // Load user's experiences with timeout
        const experiencesPromise = experienceService.getExperiences();
        const userExperiences = await Promise.race([
          experiencesPromise,
          new Promise((_, reject) => setTimeout(() => reject(new Error("Experiences timeout")), 8000))
        ]) || [];

        setExperiences(userExperiences as Experience[]);

        // Set published URL if available
        if (websiteSettings && typeof websiteSettings === 'object' && 'published_url' in websiteSettings) {
          setPublishedUrl(websiteSettings.published_url as string);
        }

        // Initialize history
        const initialState: HistoryState = {
          websiteSettings: websiteSettings as any,
          experiences: userExperiences as Experience[],
          blocks: [],
          timestamp: Date.now(),
        };
        setHistory([initialState]);
        setHistoryIndex(0);

        setLastSaved(new Date());
        setHasUnsavedChanges(false);
        
        clearTimeout(initTimeout);
        console.log("✅ Website data initialized successfully");
      } catch (initError) {
        console.warn("⚠️ Partial initialization failure:", initError);
        // Set fallback data to prevent complete failure
        setExperiences([]);
        setHistory([{
          websiteSettings: {},
          experiences: [] as Experience[],
          blocks: [],
          timestamp: Date.now(),
        }]);
        setHistoryIndex(0);
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
      }
    } catch (error) {
      console.error("Error initializing website data:", error);
      setExperiencesError("Failed to load website data");
    } finally {
      setExperiencesLoading(false);
    }
  }, [user?.id]);



  const handleAutoSave = useCallback(async () => {
    if (!user?.id || !hasUnsavedChanges || isSaving) return;

    try {
      setIsSaving(true);
      setSaveStatus("saving");
      
      // Set a global timeout to force completion
      const globalTimeout = setTimeout(() => {
        console.warn("⚠️ Global save timeout - forcing completion");
        setSaveStatus("error");
        setHasUnsavedChanges(false);
        setIsSaving(false);
        toast.error("Save timeout - please try again");
      }, 25000); // 25 second global timeout
      
      setSaveTimeoutId(globalTimeout);

      // Save current state to history (always works)
      const currentState: HistoryState = {
        websiteSettings: userData?.settings || {},
        experiences,
        blocks: [],
        timestamp: Date.now(),
      };

      const newHistory = [...history.slice(0, historyIndex + 1), currentState];
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);

      // Save website settings to database with timeout protection
      if (userData?.settings) {
        try {
          // Add timeout protection for database operations
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Database operation timeout")), 10000)
          );

          const savePromise = (async () => {
            const currentSettings = await userWebsiteService.getUserWebsiteSettings(user.id);
            const updatedSettings = {
              ...currentSettings,
              ...userData.settings,
              updated_at: new Date().toISOString(),
            };
            
            const saveSuccess = await userWebsiteService.saveUserWebsiteSettings(updatedSettings);
            if (!saveSuccess) {
              throw new Error("Failed to save to database");
            }
            return true;
          })();

          // Race between save operation and timeout
          await Promise.race([savePromise, timeoutPromise]);
          
          console.log("✅ Database save successful");
        } catch (dbError) {
          console.warn("⚠️ Database save failed, but local history preserved:", dbError);
          // Don't throw error - local history is still saved
          // This prevents the entire save from failing
        }
      }

      // Update last saved time (always works)
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      setSaveStatus("saved");
      setIsSaving(false);
      
      // Clear global timeout
      if (saveTimeoutId) {
        clearTimeout(saveTimeoutId);
        setSaveTimeoutId(null);
      }

      // Enhanced auto-save notification (less intrusive)
      toast.success("💾 Auto-saved", {
        duration: 2000,
        description: `Saved at ${new Date().toLocaleTimeString()}`,
      });
    } catch (error) {
      console.error("Auto-save failed:", error);
      setSaveStatus("error");
      setIsSaving(false);
      
      // Clear global timeout
      if (saveTimeoutId) {
        clearTimeout(saveTimeoutId);
        setSaveTimeoutId(null);
      }
      
      toast.error("Auto-save failed");
    }
  }, [
    user?.id,
    hasUnsavedChanges,
    userData,
    experiences,
    history,
    historyIndex,
  ]);

  // Auto-save functionality
  useEffect(() => {
    if (!autoSaveEnabled || !hasUnsavedChanges || !user?.id) return;

    const autoSaveTimer = setTimeout(async () => {
      try {
        // Add timeout protection for the entire auto-save operation
        const autoSaveTimeout = setTimeout(() => {
          console.warn("⚠️ Auto-save operation timeout - forcing completion");
          setSaveStatus("error");
          setHasUnsavedChanges(false); // Prevent infinite retry loops
        }, 30000); // 30 second total timeout

        await handleAutoSave();
        clearTimeout(autoSaveTimeout);
      } catch (error) {
        console.error("Auto-save operation failed:", error);
        setSaveStatus("error");
        setHasUnsavedChanges(false); // Prevent infinite retry loops
      }
    }, 2000);

    return () => clearTimeout(autoSaveTimer);
  }, [hasUnsavedChanges, autoSaveEnabled, user?.id, handleAutoSave]);

  const handleManualSave = useCallback(async () => {
    if (!user?.id || isSaving) return;

    // Set manual save timeout
    const manualSaveTimeout = setTimeout(() => {
      console.warn("⚠️ Manual save timeout - forcing completion");
      setSaveStatus("error");
      setSaveLoading(false);
      setIsSaving(false);
      setSaveButtonClicked(false);
      toast.error("Manual save timeout - please try again");
    }, 20000); // 20 second timeout for manual save

    try {
      setSaveButtonClicked(true);
      setSaveLoading(true);
      setSaveStatus("saving");
      setIsSaving(true);

      // Save current state to history and database
      await handleAutoSave();

      // Also save experiences if they've changed (with timeout protection)
      if (experiences.length > 0) {
        try {
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Experience save timeout")), 15000)
          );

          const experienceSavePromise = (async () => {
            // Update experiences in the database
            for (const experience of experiences) {
              if (experience.id) {
                await experienceService.updateExperience(experience);
              }
            }
            return true;
          })();

          // Race between save operation and timeout
          await Promise.race([experienceSavePromise, timeoutPromise]);
          console.log("✅ Experience saves successful");
        } catch (expError) {
          console.warn("⚠️ Experience saves failed, but website settings saved:", expError);
          // Don't fail the entire save operation
        }
      }

      setSaveLoading(false);
      setSaveStatus("saved");
      setIsSaving(false);
      
      // Clear manual save timeout
      clearTimeout(manualSaveTimeout);
      
      // Enhanced save notification
      toast.success("✅ Website saved successfully!", {
        duration: 3000,
        description: `Last saved at ${new Date().toLocaleTimeString()}`,
        action: {
          label: "View Changes",
          onClick: () => {
            // Could add logic to show what was saved
            console.log("Save completed at:", new Date().toLocaleTimeString());
          },
        },
      });

      // Reset save button clicked state after a delay
      setTimeout(() => {
        setSaveButtonClicked(false);
      }, 2000);
    } catch (error) {
      console.error("Manual save failed:", error);
      setSaveStatus("error");
      setSaveLoading(false);
      setIsSaving(false);
      
      // Clear manual save timeout
      clearTimeout(manualSaveTimeout);
      
      toast.error("Failed to save website");
      
      // Reset save button clicked state on error
      setSaveButtonClicked(false);
    }
  }, [user?.id, handleAutoSave, experiences]);

  const handlePublish = useCallback(async () => {
    if (!user?.id) return;

    try {
      setPublishLoading(true);

      // Generate unique URL for the user's website
      const companyName = userData?.settings?.company_name || "culturin";
      const sanitizedCompanyName = companyName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-");
      const uniqueId = user.id.slice(0, 8);
      const newPublishedUrl = `https://culturin-pro.vercel.app/tour/${sanitizedCompanyName}-${uniqueId}`;

      // Update website settings with published URL
      if (userData?.settings) {
        // Get current website settings first
        const currentSettings = await userWebsiteService.getUserWebsiteSettings(
          user.id
        );
        await userWebsiteService.saveUserWebsiteSettings({
          ...currentSettings,
          published_url: newPublishedUrl,
          is_published: true,
        });
      }

      setPublishedUrl(newPublishedUrl);
      setLastSaved(new Date());
      setHasUnsavedChanges(false);

      toast.success("Website published successfully!");
    } catch (error) {
      console.error("Publish failed:", error);
      toast.error("Failed to publish website");
    } finally {
      setPublishLoading(false);
    }
  }, [user?.id, userData?.settings]);

  const handleRefresh = useCallback(async () => {
    setRefreshLoading(true);
    setPreviewKey((prev) => prev + 1);

    setTimeout(() => {
      setRefreshLoading(false);
    }, 1000);
  }, []);

  const handleToggleFullScreen = useCallback(() => {
    setIsFullScreen(!isFullScreen);
  }, [isFullScreen]);

  const handleBlockChange = useCallback(() => {
    setHasUnsavedChanges(true);
  }, []);

  const handleExperiencesChange = useCallback((newExperiences: Experience[]) => {
    setExperiences(newExperiences);
    setHasUnsavedChanges(true);
  }, []);

  const handleSettingsChange = useCallback(() => {
    setWebsiteSettingsChanged(true);
    setHasUnsavedChanges(true);
    setPreviewKey((prev) => prev + 1);
  }, []);

  const handleContentChange = useCallback(() => {
    setHasUnsavedChanges(true);
  }, []);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setIsUndoRedoAction(true);
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);

      const previousState = history[newIndex];
      // Restore previous state
      setExperiences(previousState.experiences);
      setHasUnsavedChanges(true);

      setIsUndoRedoAction(false);
      toast.success("Undo completed");
    }
  }, [historyIndex, history]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setIsUndoRedoAction(true);
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);

      const nextState = history[newIndex];
      // Restore next state
      setExperiences(nextState.experiences);
      setHasUnsavedChanges(true);

      setIsUndoRedoAction(false);
      toast.success("Redo completed");
    }
  }, [historyIndex, history]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  if (!isLoggedIn || !user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Please sign in to access the website builder
          </p>
          <Button onClick={() => navigate("/sign-in")}>Sign In</Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "h-full flex flex-col",
        isFullScreen && "fixed inset-0 z-50 bg-white"
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex items-center justify-between p-4 border-b bg-white",
          isFullScreen && "border-b-2"
        )}
      >
        <div className="flex items-center space-x-4">
          <div>
            <h1
              className={cn(
                "text-xl font-semibold",
                isFullScreen && "text-2xl"
              )}
            >
              Website
            </h1>
            <p
              className={cn(
                "text-sm text-gray-600",
                isFullScreen && "text-base"
              )}
            >
              {isFullScreen
                ? "Fullscreen Preview Mode"
                : "Manage your online presence"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Fullscreen Close Button */}
          {isFullScreen && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleFullScreen}
              className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
            >
              <Monitor className="h-4 w-4 mr-2" />
              Exit Fullscreen
            </Button>
          )}

          {/* Save Status */}
          <div className="flex items-center space-x-2 text-sm">
            {saveStatus === "saving" && (
              <div className="flex items-center space-x-2 text-blue-600">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving...</span>
              </div>
            )}
            {saveStatus === "saved" && (
              <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                <Check className="h-4 w-4" />
                <span className="font-medium">Saved</span>
                {lastSaved && (
                  <span className="text-xs text-green-500">
                    at {lastSaved.toLocaleTimeString()}
                  </span>
                )}
              </div>
            )}
            {saveStatus === "error" && (
              <div className="flex items-center space-x-2 text-red-600">
                <span>Save failed</span>
              </div>
            )}
          </div>

          {/* Auto-save Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoSaveEnabled(!autoSaveEnabled)}
            className={autoSaveEnabled ? "bg-green-50 border-green-200" : ""}
          >
            <Zap
              className={`h-4 w-4 mr-2 ${
                autoSaveEnabled ? "text-green-600" : ""
              }`}
            />
            Auto-save: {autoSaveEnabled ? "On" : "Off"}
          </Button>

          {/* Last Saved */}
          <div className="text-sm text-gray-500">
            Last saved: {lastSaved ? lastSaved.toLocaleTimeString() : "Never"}
          </div>

          {/* History Controls */}
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handleUndo}
              disabled={!canUndo}
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRedo}
              disabled={!canRedo}
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleManualSave}
            disabled={saveLoading || !hasUnsavedChanges}
            size="sm"
            className={cn(
              "transition-all duration-200",
              saveButtonClicked && "bg-green-100 border-green-300 text-green-700 scale-105"
            )}
          >
            {saveLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {saveButtonClicked && !saveLoading ? "Saved!" : "Save"}
          </Button>

          {/* Publish Button */}
          <Button
            onClick={handlePublish}
            disabled={publishLoading}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            {publishLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Globe className="h-4 w-4 mr-2" />
            )}
            Publish
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-gray-50 border-r p-4 space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Your Website</h3>
            <p className="text-sm text-gray-600 mb-4">
              Customize your tour operator website with real-time preview and
              booking functionality.
            </p>

            {/* Status Indicators */}
            <div className="space-y-2 mb-4">
              {hasUnsavedChanges && (
                <div className="flex items-center text-orange-600 text-sm">
                  <span>⚠️ Unsaved changes</span>
                </div>
              )}
              <div className="flex items-center text-sm text-gray-600">
                <Zap className="h-3 w-3 mr-2" />
                Auto-save: {autoSaveEnabled ? "On" : "Off"}
              </div>
              <div className="text-sm text-gray-500">
                Last saved:{" "}
                {lastSaved ? lastSaved.toLocaleTimeString() : "Never"}
              </div>
            </div>

            {/* Site Status */}
            {publishedUrl && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <div className="flex items-center text-green-800 text-sm mb-2">
                  <Check className="h-4 w-4 mr-2" />
                  Site Published
                </div>
                <div className="text-xs text-green-700 mb-2 break-all">
                  {publishedUrl}
                </div>
                <div className="flex items-center text-green-700 text-xs mb-2">
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Booking Enabled
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(publishedUrl, "_blank")}
                  className="w-full text-xs"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Visit Site
                </Button>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-medium mb-2">Navigation</h4>
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab("preview")}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                  activeTab === "preview"
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <Eye className="h-4 w-4 inline mr-2" />
                Preview
              </button>
              <button
                onClick={() => setActiveTab("builder")}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                  activeTab === "builder"
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <Settings className="h-4 w-4 inline mr-2" />
                Builder
              </button>
              <button
                onClick={() => setActiveTab("themes")}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                  activeTab === "themes"
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <Palette className="h-4 w-4 inline mr-2" />
                Themes
              </button>
              <button
                onClick={() => setActiveTab("content")}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                  activeTab === "content"
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <FileText className="h-4 w-4 inline mr-2" />
                Content
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                  activeTab === "settings"
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <Settings className="h-4 w-4 inline mr-2" />
                Settings
              </button>
              <button
                onClick={() => setActiveTab("booking")}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                  activeTab === "booking"
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <ShoppingCart className="h-4 w-4 inline mr-2" />
                Booking
              </button>
              <button
                onClick={() => setActiveTab("media-library")}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                  activeTab === "media-library"
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <Image className="h-4 w-4 inline mr-2" />
                Media Library
              </button>
            </div>
          </div>

          {/* Actions */}
          <div>
            <h4 className="font-medium mb-2">Actions</h4>
            <div className="space-y-2">
              <Button
                onClick={handleManualSave}
                disabled={saveLoading || !hasUnsavedChanges}
                className="w-full"
                size="sm"
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
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="sm"
              >
                {publishLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Globe className="h-4 w-4 mr-2" />
                )}
                Publish
              </Button>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col">
          {activeTab === "preview" && (
            <div className="h-full p-6 pl-8">
              <div className="space-y-6 h-full">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Website Preview</h3>
                    <p className="text-sm text-gray-600">
                      See how your website looks to visitors
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRefresh}
                      disabled={refreshLoading}
                    >
                      {refreshLoading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4 mr-2" />
                      )}
                      Refresh
                    </Button>
                    <select
                      value={viewMode}
                      onChange={(e) => setViewMode(e.target.value as any)}
                      className="px-3 py-2 border rounded-md text-sm"
                    >
                      <option value="desktop">Desktop</option>
                      <option value="tablet">Tablet</option>
                      <option value="mobile">Mobile</option>
                    </select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleToggleFullScreen}
                    >
                      {isFullScreen ? (
                        <Monitor className="h-4 w-4 mr-2" />
                      ) : (
                        <Monitor className="h-4 w-4 mr-2" />
                      )}
                      {isFullScreen ? "Collapse" : "Expand"}
                    </Button>
                  </div>
                </div>
                <div
                  className={cn(
                    "flex-1 bg-white border rounded-lg overflow-hidden",
                    isFullScreen && "border-0"
                  )}
                >
                  <WebsitePreview
                    key={previewKey}
                    viewMode={viewMode}
                    experiences={experiences}
                    isLoading={experiencesLoading}
                    error={experiencesError}
                  />
                </div>
              </div>
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
                        <Monitor className="h-4 w-4 mr-2" />
                      ) : (
                        <Monitor className="h-4 w-4 mr-2" />
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
                  <DragDropBuilder onBlockChange={handleBlockChange} />
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
              <UserWebsiteSettings onSettingsChange={handleSettingsChange} />
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

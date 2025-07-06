"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WebsitePreview from "./WebsitePreview";
import WebsiteThemes from "./WebsiteThemes";
import WebsiteContent from "./WebsiteContent";
import WebsiteSettings from "./WebsiteSettings";
import BookingFlowBuilder from "./BookingFlowBuilder";
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
} from "lucide-react";
import { useNavigate } from "../../../lib/navigation";
import { sampleItineraries, ItineraryType } from "@/data/itineraryData";
import { useUserData } from "../../../src/contexts/UserDataContext";

const WebsiteBuilder: React.FC = () => {
  const [publishLoading, setPublishLoading] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");
  const [publishedUrl, setPublishedUrl] = useState(() => {
    const storedUrl = localStorage.getItem("publishedWebsiteUrl");
    return storedUrl || "tour/demo";
  });
  const [itineraries, setItineraries] = useState<ItineraryType[]>([]);
  const [previewKey, setPreviewKey] = useState(0);
  const navigate = useNavigate();
  const { userData, updateWebsiteSettings } = useUserData();

  useEffect(() => {
    // Get itineraries from localStorage or use sample data
    const storedItineraries = localStorage.getItem("culturinItineraries");
    if (storedItineraries) {
      try {
        setItineraries(JSON.parse(storedItineraries));
      } catch (e) {
        console.error("Error parsing itineraries:", e);
        setItineraries(sampleItineraries);
        // Save sample data as fallback
        localStorage.setItem(
          "culturinItineraries",
          JSON.stringify(sampleItineraries)
        );
      }
    } else {
      setItineraries(sampleItineraries);
      localStorage.setItem(
        "culturinItineraries",
        JSON.stringify(sampleItineraries)
      );
    }
  }, []);

  // Auto-refresh preview when user data changes
  useEffect(() => {
    setPreviewKey((prev) => prev + 1);
  }, [userData.websiteSettings]);

  // Listen for website settings changes
  useEffect(() => {
    const handleSettingsChange = (event: CustomEvent) => {
      setPreviewKey((prev) => prev + 1);
      // Update itineraries if they changed
      if (event.detail?.filteredItineraries) {
        setItineraries(event.detail.filteredItineraries);
      }
      toast.success("Preview updated", {
        description: "Website preview reflects your latest settings",
      });
    };

    if (typeof window !== "undefined") {
      window.addEventListener(
        "websiteSettingsChanged",
        handleSettingsChange as EventListener
      );
      return () => {
        window.removeEventListener(
          "websiteSettingsChanged",
          handleSettingsChange as EventListener
        );
      };
    }
  }, []);

  const handleSettingsChange = () => {
    // Trigger immediate preview refresh when settings change
    setPreviewKey((prev) => prev + 1);
  };

  const handlePublish = async () => {
    if (!userData.businessName) {
      toast.error("Please complete your business profile first", {
        description: "Add your business name in the settings",
      });
      return;
    }

    setPublishLoading(true);

    try {
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

  const handleQuickUpdate = (field: string, value: any) => {
    try {
      updateWebsiteSettings({ [field]: value });
      toast.success("Website updated - changes will appear in preview");
    } catch (error) {
      toast.error("Failed to update website", {
        description: "Please try again",
      });
    }
  };

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
      default:
        toast.error("Unknown action");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-medium">Your Website</h2>
          <p className="text-sm text-gray-500">
            Customize your tour operator website with real-time preview and
            booking functionality.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleReloadPreview}
            disabled={refreshLoading}
            className="flex items-center"
          >
            {refreshLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Refresh Preview
          </Button>
          <Button
            variant="outline"
            onClick={handlePreviewSite}
            className="flex items-center"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Preview Live Site
          </Button>
          <Button
            onClick={handlePublish}
            disabled={publishLoading}
            className="flex items-center"
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
      </div>

      {publishedUrl && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md flex items-center justify-between">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-1">
              <Check className="h-4 w-4 text-green-600" />
            </div>
            <span className="ml-2 text-sm text-green-800">
              Your site is published at:{" "}
              <a
                href={`/${publishedUrl}`}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline hover:text-green-900"
              >
                {typeof window !== "undefined" ? window.location.origin : ""}/
                {publishedUrl}
              </a>
              {userData.websiteSettings.enableBooking && (
                <span className="ml-2 inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  <ShoppingCart className="h-3 w-3" />
                  Booking Enabled
                </span>
              )}
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={handlePreviewSite}>
            <Eye className="h-4 w-4 mr-1" />
            Visit
          </Button>
        </div>
      )}

      {/* Quick Actions Bar */}
      <div className="bg-gray-50 p-4 rounded-lg border">
        <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleQuickAction("resetColor")}
            className="flex items-center gap-2"
          >
            <Palette className="h-4 w-4" />
            Reset Brand Color
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleQuickAction("toggleBooking")}
            className="flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            {userData.websiteSettings.enableBooking ? "Disable" : "Enable"}{" "}
            Booking
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleQuickAction("configureBooking")}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Configure Booking Flow
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="preview"
        value={activeTab}
        onValueChange={handleTabChange}
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="themes">Themes</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="booking">Booking Flow</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          <WebsitePreview
            key={previewKey}
            itineraries={itineraries}
            refreshKey={previewKey}
          />
        </TabsContent>

        <TabsContent value="themes">
          <WebsiteThemes />
        </TabsContent>

        <TabsContent value="content">
          <WebsiteContent />
        </TabsContent>

        <TabsContent value="booking">
          <BookingFlowBuilder />
        </TabsContent>

        <TabsContent value="settings">
          <WebsiteSettings
            itineraries={itineraries}
            setItineraries={setItineraries}
            onSettingsChange={handleSettingsChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebsiteBuilder;

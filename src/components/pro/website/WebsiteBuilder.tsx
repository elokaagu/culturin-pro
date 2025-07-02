"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WebsitePreview from "./WebsitePreview";
import WebsiteThemes from "./WebsiteThemes";
import WebsiteContent from "./WebsiteContent";
import WebsiteSettings from "./WebsiteSettings";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Globe, ExternalLink, Check, Loader2 } from "lucide-react";
import { useNavigate } from "../../../../lib/navigation";
import { sampleItineraries, ItineraryType } from "@/data/itineraryData";
import { safeLocalStorage } from "../../../../lib/localStorage";

const WebsiteBuilder: React.FC = () => {
  const [publishLoading, setPublishLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");
  const [publishedUrl, setPublishedUrl] = useState("tour/demo");
  const [itineraries, setItineraries] = useState<ItineraryType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Safely load published URL from localStorage
    const storedUrl = safeLocalStorage.getItem("publishedWebsiteUrl");
    if (storedUrl) {
      setPublishedUrl(storedUrl);
    }

    // Get itineraries from localStorage or use sample data
    const storedItineraries = safeLocalStorage.getItem("culturinItineraries");
    if (storedItineraries) {
      try {
        setItineraries(JSON.parse(storedItineraries));
      } catch (e) {
        console.error("Error parsing itineraries:", e);
        setItineraries(sampleItineraries);
      }
    } else {
      setItineraries(sampleItineraries);
      safeLocalStorage.setItem(
        "culturinItineraries",
        JSON.stringify(sampleItineraries)
      );
    }
  }, []);

  const handlePublish = () => {
    setPublishLoading(true);

    // Generate a unique slug for the website
    const slug = `demo-${Date.now().toString(36)}`;
    const newPublishedUrl = `tour/${slug}`;

    // Simulate publishing process - in a real app, this would save to a backend
    setTimeout(() => {
      setPublishLoading(false);
      setPublishedUrl(newPublishedUrl);

      // Save the published URL to localStorage
      safeLocalStorage.setItem("publishedWebsiteUrl", newPublishedUrl);

      // Get current theme from localStorage
      const currentTheme =
        safeLocalStorage.getItem("selectedWebsiteTheme") || "classic";

      // Save website content and theme to localStorage for the tour operator website
      const websiteContent = {
        companyName:
          safeLocalStorage.getItem("websiteCompanyName") || "Culturin Tours",
        tagline:
          safeLocalStorage.getItem("websiteTagline") ||
          "Authentic cultural experiences curated by Eloka Agu",
        description:
          safeLocalStorage.getItem("websiteDescription") ||
          "Founded by Eloka Agu, Culturin Tours specializes in immersive cultural experiences that connect travelers with authentic local traditions, stories, and communities around the world.",
        primaryColor:
          safeLocalStorage.getItem("websitePrimaryColor") || "#9b87f5",
        headerImage: safeLocalStorage.getItem("websiteHeaderImage") || null,
      };

      safeLocalStorage.setItem("publishedWebsiteTheme", currentTheme);
      safeLocalStorage.setItem(
        "publishedWebsiteContent",
        JSON.stringify(websiteContent)
      );
      safeLocalStorage.setItem(
        "publishedItineraries",
        JSON.stringify(itineraries)
      );

      toast.success("Website published successfully!", {
        description: "Your changes are now live.",
      });
    }, 1500);
  };

  const handlePreviewSite = () => {
    if (typeof window !== "undefined") {
      window.open(`/${publishedUrl}`, "_blank");
    }
  };

  const handleReloadPreview = () => {
    // Trigger a refresh for the preview
    const storedItineraries = safeLocalStorage.getItem("culturinItineraries");
    if (storedItineraries) {
      try {
        setItineraries(JSON.parse(storedItineraries));
      } catch (e) {
        console.error("Error parsing itineraries:", e);
      }
    }
    toast.success("Preview refreshed");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-medium">Your Website</h2>
          <p className="text-sm text-gray-500">
            Customize your tour operator website and publish it for your
            customers.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleReloadPreview}
            className="flex items-center"
          >
            <Loader2 className="mr-2 h-4 w-4" />
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
                className="font-medium underline"
              >
                {typeof window !== "undefined"
                  ? window.location.origin
                  : "https://yoursite.com"}
                /{publishedUrl}
              </a>
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={handlePreviewSite}>
            Visit
          </Button>
        </div>
      )}

      <Tabs
        defaultValue="preview"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="themes">Themes</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          <WebsitePreview itineraries={itineraries} />
        </TabsContent>

        <TabsContent value="themes">
          <WebsiteThemes />
        </TabsContent>

        <TabsContent value="content">
          <WebsiteContent />
        </TabsContent>

        <TabsContent value="settings">
          <WebsiteSettings
            itineraries={itineraries}
            setItineraries={setItineraries}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebsiteBuilder;

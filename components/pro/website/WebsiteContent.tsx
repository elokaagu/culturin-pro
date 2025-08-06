"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Upload, X, Eye, EyeOff } from "lucide-react";
import { useUserData } from "../../../src/contexts/UserDataContext";
import { settingsService } from "@/lib/settings-service";

const WebsiteContent: React.FC = () => {
  const { userData, updateWebsiteSettings } = useUserData();
  const [previewChanges, setPreviewChanges] = useState(false);

  // Local state for form inputs
  const [companyName, setCompanyName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [headerImage, setHeaderImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize form with user data
  useEffect(() => {
    if (userData?.websiteSettings) {
      setCompanyName(userData.websiteSettings.companyName || "");
      setTagline(userData.websiteSettings.tagline || "");
      setDescription(userData.websiteSettings.description || "");
      setPrimaryColor(userData.websiteSettings.primaryColor || "#9b87f5");
      setHeaderImage(userData.websiteSettings.headerImage || null);
    }
  }, [userData?.websiteSettings]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file", {
        description: "Only image files are supported",
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size too large", {
        description: "Please upload an image smaller than 5MB",
      });
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setHeaderImage(imageUrl);
        handleQuickSave("headerImage", imageUrl);
        toast.success("Image uploaded successfully");
      };
      reader.onerror = () => {
        toast.error("Failed to read image file", {
          description: "Please try again with a different image",
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Failed to upload image", {
        description: "Please try again",
      });
    }
  };

  const handleRemoveImage = () => {
    try {
      setHeaderImage(null);
      handleQuickSave("headerImage", null);
      toast.success("Header image removed");
    } catch (error) {
      toast.error("Failed to remove image", {
        description: "Please try again",
      });
    }
  };

  const handleQuickSave = async (field: string, value: any) => {
    try {
      updateWebsiteSettings({ [field]: value });
      toast.success(`${field} updated`, {
        description: "Changes will appear in your website preview",
      });
    } catch (error) {
      toast.error("Failed to save changes", {
        description: "Please try again",
      });
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Validate required fields
      if (!companyName.trim()) {
        toast.error("Company name is required");
        return;
      }

      if (!tagline.trim()) {
        toast.error("Tagline is required");
        return;
      }

      if (!description.trim()) {
        toast.error("Description is required");
        return;
      }

      if (!primaryColor) {
        toast.error("Primary color is required");
        return;
      }

      const updates = {
        companyName: companyName.trim(),
        tagline: tagline.trim(),
        description: description.trim(),
        primaryColor,
        headerImage,
      };

      // Update local state immediately
      updateWebsiteSettings(updates);

      // Save to localStorage as fallback
      localStorage.setItem("websiteSettings", JSON.stringify(updates));
      
      toast({
        title: "Content Saved",
        description: "Website content has been saved successfully.",
      });

      // Save published content for website preview
      const publishedContent = {
        companyName: updates.companyName,
        tagline: updates.tagline,
        description: updates.description,
        primaryColor: updates.primaryColor,
        headerImage: updates.headerImage,
        theme: userData?.websiteSettings?.theme || "classic",
        lastUpdated: new Date().toISOString(),
      };

      localStorage.setItem(
        "publishedWebsiteContent",
        JSON.stringify(publishedContent)
      );

      toast.success("Website content saved successfully!", {
        description:
          "Your changes have been applied and are live on your website",
      });

      // Optional: Trigger a page refresh or update preview
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save content", {
        description: error instanceof Error ? error.message : "Please try again or contact support if the issue persists",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    try {
      const defaultSettings = {
        companyName: userData?.businessName || "Your Business Name",
                  tagline: `Authentic cultural experiences curated by ${
            userData?.businessName || "Your Business"
          }`,
                  description: userData?.bio || "Add your business description here",
        primaryColor: "#9b87f5",
        headerImage: null,
      };

      setCompanyName(defaultSettings.companyName);
      setTagline(defaultSettings.tagline);
      setDescription(defaultSettings.description);
      setPrimaryColor(defaultSettings.primaryColor);
      setHeaderImage(defaultSettings.headerImage);

      updateWebsiteSettings(defaultSettings);

      toast.success("Content reset to defaults");
    } catch (error) {
      toast.error("Failed to reset content", {
        description: "Please try again",
      });
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium">Website Content</h2>
          <p className="text-gray-600 text-sm">
            Customize the content of your tour operator website with real-time
            updates
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setPreviewChanges(!previewChanges)}
            size="sm"
          >
            {previewChanges ? (
              <EyeOff className="h-4 w-4 mr-2" />
            ) : (
              <Eye className="h-4 w-4 mr-2" />
            )}
            {previewChanges ? "Hide" : "Show"} Preview
          </Button>
          <Button variant="outline" onClick={handleReset} size="sm">
            Reset to Defaults
          </Button>
        </div>
      </div>

      {previewChanges && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-medium mb-2">Live Preview</h3>
          <div
            className="bg-white p-4 rounded border"
            style={{ color: primaryColor }}
          >
            <h4 className="text-xl font-bold">{companyName}</h4>
            <p className="text-sm italic">{tagline}</p>
            <p className="text-sm mt-2">{description}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => {
              setCompanyName(e.target.value);
              handleQuickSave("companyName", e.target.value);
            }}
            placeholder="Your company name"
          />
          <p className="text-xs text-gray-500">
            This will be the main heading on your website
          </p>
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="tagline">Tagline</Label>
          <Input
            id="tagline"
            value={tagline}
            onChange={(e) => {
              setTagline(e.target.value);
              handleQuickSave("tagline", e.target.value);
            }}
            placeholder="A short, catchy tagline"
          />
          <p className="text-xs text-gray-500">
            Appears below your company name
          </p>
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              handleQuickSave("description", e.target.value);
            }}
            placeholder="Describe your tour company"
            rows={4}
          />
          <p className="text-xs text-gray-500">
            Main description for your business
          </p>
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="primaryColor">Primary Brand Color</Label>
          <div className="flex items-center gap-3">
            <Input
              id="primaryColor"
              type="color"
              value={primaryColor}
              onChange={(e) => {
                setPrimaryColor(e.target.value);
                handleQuickSave("primaryColor", e.target.value);
              }}
              className="w-16 h-10 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={primaryColor}
              onChange={(e) => {
                setPrimaryColor(e.target.value);
                handleQuickSave("primaryColor", e.target.value);
              }}
              className="w-32"
              placeholder="#9b87f5"
            />
            <div
              className="w-8 h-8 rounded border-2 border-gray-300"
              style={{ backgroundColor: primaryColor }}
            />
          </div>
          <p className="text-xs text-gray-500">
            This color will be used for buttons, links, and accents
          </p>
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="headerImage">Header Image</Label>
          <div className="flex items-center gap-3">
            {headerImage ? (
              <div className="relative">
                <img
                  src={headerImage}
                  alt="Header"
                  className="w-32 h-20 object-cover rounded border"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <div className="w-32 h-20 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                <span className="text-sm text-gray-500">No image</span>
              </div>
            )}
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById("image-upload")?.click()}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Upload Image
              </Button>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Optional header image for your website (recommended: 1200x400px)
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <div className="text-sm text-gray-500">
            Changes are automatically saved as you type
          </div>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="min-w-[140px]"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              "Save All Changes"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WebsiteContent;

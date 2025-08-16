"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useUserData } from "../../../src/contexts/UserDataContext";
import { useAuth } from "@/hooks/useAuth";
import { userWebsiteService } from "./UserWebsiteService";
import { Settings, Palette, Globe, Shield, Search, Eye } from "lucide-react";

interface WebsiteSettingsProps {
  onSettingsChange: () => void;
}

const UserWebsiteSettings: React.FC<WebsiteSettingsProps> = ({ onSettingsChange }) => {
  const { userData, updateUserData } = useUserData();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    // Website Settings
    showBooking: true,
    showReviews: true,
    showTestimonials: true,
    currency: "USD",
    language: "en",
    timezone: "UTC",
    
    // SEO Settings
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    
    // Branding Settings
    primaryColor: "#3B82F6",
    logoUrl: "",
    headerImage: "",
    theme: "classic",
  });

  useEffect(() => {
    if (userData?.settings) {
      // Load existing settings from user data
      const userSettings = userData.settings;
      setSettings({
        showBooking: userSettings.website_settings?.show_booking ?? true,
        showReviews: userSettings.website_settings?.show_reviews ?? true,
        showTestimonials: userSettings.website_settings?.show_testimonials ?? true,
        currency: userSettings.website_settings?.currency ?? "USD",
        language: userSettings.website_settings?.language ?? "en",
        timezone: userSettings.website_settings?.timezone ?? "UTC",
        seoTitle: userSettings.seo_settings?.title ?? "",
        seoDescription: userSettings.seo_settings?.description ?? "",
        seoKeywords: userSettings.seo_settings?.keywords?.join(", ") ?? "",
        primaryColor: userSettings.branding?.primary_color ?? "#3B82F6",
        logoUrl: userSettings.branding?.logo_url ?? "",
        headerImage: userSettings.branding?.header_image ?? "",
        theme: userSettings.branding?.theme ?? "classic",
      });
    }
  }, [userData]);

  const handleSettingChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
    onSettingsChange();
  };

  const handleSave = async () => {
    if (!user?.id) {
      toast.error("Please sign in to save settings");
      return;
    }

    setLoading(true);
    try {
      // Get current website settings
      const currentSettings = await userWebsiteService.getUserWebsiteSettings(user.id);

      // Update settings
      const updatedSettings = {
        ...currentSettings,
        website_settings: {
          ...currentSettings.website_settings,
          show_booking: settings.showBooking,
          show_reviews: settings.showReviews,
          show_testimonials: settings.showTestimonials,
          currency: settings.currency,
          language: settings.language,
          timezone: settings.timezone,
        },
        seo_settings: {
          ...currentSettings.seo_settings,
          title: settings.seoTitle,
          description: settings.seoDescription,
          keywords: settings.seoKeywords.split(",").map(k => k.trim()).filter(k => k),
        },
        branding: {
          ...currentSettings.branding,
          primary_color: settings.primaryColor,
          logo_url: settings.logoUrl,
          header_image: settings.headerImage,
          theme: settings.theme,
        },
        updated_at: new Date().toISOString(),
      };

      // Save to database
      const success = await userWebsiteService.saveUserWebsiteSettings(updatedSettings);

      if (success) {
        // Update local state
        await updateUserData({
          settings: {
            ...userData?.settings,
            website_settings: updatedSettings.website_settings,
            seo_settings: updatedSettings.seo_settings,
            branding: updatedSettings.branding,
          },
        });

        toast.success("Settings saved successfully!");
      } else {
        toast.error("Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full p-6 pl-8">
      <div className="space-y-6 h-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Website Settings</h3>
            <p className="text-sm text-gray-600">
              Configure your website functionality and appearance
            </p>
          </div>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Settings"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Website Functionality */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Website Functionality
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showBooking">Show Booking</Label>
                  <p className="text-sm text-gray-600">Enable booking functionality on your website</p>
                </div>
                <Switch
                  id="showBooking"
                  checked={settings.showBooking}
                  onCheckedChange={(checked) => handleSettingChange("showBooking", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showReviews">Show Reviews</Label>
                  <p className="text-sm text-gray-600">Display customer reviews and ratings</p>
                </div>
                <Switch
                  id="showReviews"
                  checked={settings.showReviews}
                  onCheckedChange={(checked) => handleSettingChange("showReviews", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showTestimonials">Show Testimonials</Label>
                  <p className="text-sm text-gray-600">Display customer testimonials</p>
                </div>
                <Switch
                  id="showTestimonials"
                  checked={settings.showTestimonials}
                  onCheckedChange={(checked) => handleSettingChange("showTestimonials", checked)}
                />
              </div>

              <Separator />

              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select value={settings.currency} onValueChange={(value) => handleSettingChange("currency", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="CAD">CAD (C$)</SelectItem>
                    <SelectItem value="AUD">AUD (A$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="language">Language</Label>
                <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={settings.timezone} onValueChange={(value) => handleSettingChange("timezone", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="America/New_York">Eastern Time</SelectItem>
                    <SelectItem value="America/Chicago">Central Time</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    <SelectItem value="Europe/London">London</SelectItem>
                    <SelectItem value="Europe/Paris">Paris</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                SEO Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="seoTitle">Page Title</Label>
                <Input
                  id="seoTitle"
                  value={settings.seoTitle}
                  onChange={(e) => handleSettingChange("seoTitle", e.target.value)}
                  placeholder="Your Company - Cultural Experiences"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This appears in browser tabs and search results
                </p>
              </div>

              <div>
                <Label htmlFor="seoDescription">Meta Description</Label>
                <Input
                  id="seoDescription"
                  value={settings.seoDescription}
                  onChange={(e) => handleSettingChange("seoDescription", e.target.value)}
                  placeholder="Discover authentic cultural experiences and tours"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Brief description for search engines (150-160 characters)
                </p>
              </div>

              <div>
                <Label htmlFor="seoKeywords">Keywords</Label>
                <Input
                  id="seoKeywords"
                  value={settings.seoKeywords}
                  onChange={(e) => handleSettingChange("seoKeywords", e.target.value)}
                  placeholder="cultural tours, authentic experiences, travel"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate keywords with commas
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Branding Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Branding
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => handleSettingChange("primaryColor", e.target.value)}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={settings.primaryColor}
                    onChange={(e) => handleSettingChange("primaryColor", e.target.value)}
                    className="flex-1"
                    placeholder="#3B82F6"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="theme">Theme Style</Label>
                <Select value={settings.theme} onValueChange={(value) => handleSettingChange("theme", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classic">Classic</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="elegant">Elegant</SelectItem>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                    <SelectItem value="bold">Bold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="logoUrl">Logo URL</Label>
                <Input
                  id="logoUrl"
                  value={settings.logoUrl}
                  onChange={(e) => handleSettingChange("logoUrl", e.target.value)}
                  placeholder="https://example.com/logo.png"
                />
              </div>

              <div>
                <Label htmlFor="headerImage">Header Image URL</Label>
                <Input
                  id="headerImage"
                  value={settings.headerImage}
                  onChange={(e) => handleSettingChange("headerImage", e.target.value)}
                  placeholder="https://example.com/header.jpg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Settings Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Settings Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Current Configuration:</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Booking:</span>
                    <span className={settings.showBooking ? "text-green-600" : "text-red-600"}>
                      {settings.showBooking ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reviews:</span>
                    <span className={settings.showReviews ? "text-green-600" : "text-red-600"}>
                      {settings.showReviews ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Currency:</span>
                    <span>{settings.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Language:</span>
                    <span>{settings.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Theme:</span>
                    <span className="capitalize">{settings.theme}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium text-sm">Color Preview:</h5>
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded border-2 border-gray-300"
                    style={{ backgroundColor: settings.primaryColor }}
                  />
                  <span className="text-sm text-gray-600">{settings.primaryColor}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Tips */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <h4 className="font-medium text-blue-800 mb-2">
                Settings Tips
              </h4>
              <p className="text-sm text-blue-700">
                Configure your website settings to match your business needs. Enable features that 
                will help your customers, and optimize SEO settings to improve search visibility. 
                Your branding settings will be applied across your entire website.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserWebsiteSettings;

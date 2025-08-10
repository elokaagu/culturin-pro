"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { userWebsiteService, UserWebsiteSettings } from "./UserWebsiteService";
import { Save, RefreshCw, Eye, Globe } from "lucide-react";

interface UserWebsiteSettingsProps {
  onSettingsChange?: (settings: UserWebsiteSettings) => void;
}

const UserWebsiteSettingsComponent: React.FC<UserWebsiteSettingsProps> = ({
  onSettingsChange,
}) => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<UserWebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);

  // Load user's website settings
  useEffect(() => {
    const loadSettings = async () => {
      if (!user?.id) {
        // If no user, show default settings without loading
        setSettings({
          user_id: "demo",
          company_name: "Your Cultural Tours",
          tagline: "Discover Authentic Cultural Experiences",
          description: "We specialize in creating immersive cultural experiences that connect you with local traditions and communities.",
          contact_info: {
            phone: "",
            email: "",
            address: "",
          },
          social_media: {},
          branding: {
            primary_color: "#9b87f5",
            theme: "classic",
          },
          website_settings: {
            show_booking: true,
            show_reviews: true,
            show_testimonials: true,
            currency: "USD",
            language: "en",
            timezone: "UTC",
          },
          seo_settings: {
            keywords: ["cultural tours", "authentic experiences", "travel"],
          },
          is_published: false,
        });
        setLoading(false);
        return;
      }

      // Add timeout to prevent infinite loading
      const timeoutId = setTimeout(() => {
        console.warn("Settings loading timeout - forcing default settings");
        setSettings({
          user_id: user.id,
          company_name: "Your Cultural Tours",
          tagline: "Discover Authentic Cultural Experiences",
          description: "We specialize in creating immersive cultural experiences that connect you with local traditions and communities.",
          contact_info: {
            phone: "",
            email: "",
            address: "",
          },
          social_media: {},
          branding: {
            primary_color: "#9b87f5",
            theme: "classic",
          },
          website_settings: {
            show_booking: true,
            show_reviews: true,
            show_testimonials: true,
            currency: "USD",
            language: "en",
            timezone: "UTC",
          },
          seo_settings: {
            keywords: ["cultural tours", "authentic experiences", "travel"],
          },
          is_published: false,
        });
        setLoading(false);
      }, 5000); // 5 second timeout

      try {
        setLoading(true);
        
        // Try localStorage first (faster)
        const savedSettings = localStorage.getItem(`userWebsiteSettings_${user.id}`);
        if (savedSettings) {
          try {
            const parsed = JSON.parse(savedSettings);
            setSettings(parsed);
            clearTimeout(timeoutId);
            setLoading(false);
            return;
          } catch (e) {
            console.error("Error parsing saved settings:", e);
          }
        }
        
        // Then try database
        const userSettings = await userWebsiteService.getUserWebsiteSettings(user.id);
        setSettings(userSettings);
        clearTimeout(timeoutId);
      } catch (error) {
        console.error("Error loading website settings:", error);
        
        // Try localStorage as fallback
        const savedSettings = localStorage.getItem(`userWebsiteSettings_${user.id}`);
        if (savedSettings) {
          try {
            const parsed = JSON.parse(savedSettings);
            setSettings(parsed);
            clearTimeout(timeoutId);
            setLoading(false);
            return;
          } catch (e) {
            console.error("Error parsing saved settings:", e);
          }
        }
        
        toast.error("Failed to load website settings", {
          description: "Using default settings for now"
        });
        
        // Fallback to default settings
        setSettings({
          user_id: user.id,
          company_name: "Your Cultural Tours",
          tagline: "Discover Authentic Cultural Experiences",
          description: "We specialize in creating immersive cultural experiences that connect you with local traditions and communities.",
          contact_info: {
            phone: "",
            email: "",
            address: "",
          },
          social_media: {},
          branding: {
            primary_color: "#9b87f5",
            theme: "classic",
          },
          website_settings: {
            show_booking: true,
            show_reviews: true,
            show_testimonials: true,
            currency: "USD",
            language: "en",
            timezone: "UTC",
          },
          seo_settings: {
            keywords: ["cultural tours", "authentic experiences", "travel"],
          },
          is_published: false,
        });
        clearTimeout(timeoutId);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [user?.id]);

  const handleInputChange = (field: string, value: any) => {
    if (!settings) return;

    const newSettings = { ...settings };

    // Handle nested objects
    if (field.includes(".")) {
      const keys = field.split(".");
      let current = newSettings as any;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
    } else {
      (newSettings as any)[field] = value;
    }

    setSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  const handleSave = async () => {
    if (!settings || !user?.id) return;

    try {
      setSaving(true);
      const success = await userWebsiteService.saveUserWebsiteSettings(
        settings
      );

      if (success) {
        toast.success("Website settings saved successfully!");
      } else {
        // Fallback to localStorage
        try {
          localStorage.setItem(`userWebsiteSettings_${user.id}`, JSON.stringify(settings));
          toast.success("Website settings saved locally!", {
            description: "Data saved to browser storage"
          });
        } catch (localError) {
          console.error("Failed to save to localStorage:", localError);
          toast.error("Failed to save website settings");
        }
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      // Try localStorage fallback
      try {
        localStorage.setItem(`userWebsiteSettings_${user.id}`, JSON.stringify(settings));
        toast.success("Website settings saved locally!", {
          description: "Data saved to browser storage"
        });
      } catch (localError) {
        console.error("Failed to save to localStorage:", localError);
        toast.error("An error occurred while saving");
      }
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!user?.id) return;

    try {
      setPublishLoading(true);
      const result = await userWebsiteService.publishWebsite(user.id);

      if (result.success && result.url) {
        toast.success("Website published successfully!");
        toast.success(`Your website is now live at: ${result.url}`);

        // Update settings with published URL
        if (settings) {
          setSettings({
            ...settings,
            published_url: result.url,
            is_published: true,
          });
        }
      } else {
        toast.error("Failed to publish website");
      }
    } catch (error) {
      console.error("Error publishing website:", error);
      toast.error("An error occurred while publishing");
    } finally {
      setPublishLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Failed to load website settings</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Website Settings</h2>
          <p className="text-gray-600">
            Customize your website content and appearance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save"}
          </Button>
          <Button onClick={handlePublish} disabled={publishLoading}>
            <Globe className="h-4 w-4 mr-2" />
            {publishLoading ? "Publishing..." : "Publish Website"}
          </Button>
        </div>
      </div>

      {/* Published URL */}
      {settings.published_url && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-green-800">
                  Your website is live!
                </p>
                <p className="text-sm text-green-600">
                  {settings.published_url}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(`/${settings.published_url}`, "_blank")
                }
              >
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                value={settings.company_name}
                onChange={(e) =>
                  handleInputChange("company_name", e.target.value)
                }
                placeholder="Your Cultural Tours"
              />
            </div>

            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={settings.tagline}
                onChange={(e) => handleInputChange("tagline", e.target.value)}
                placeholder="Discover Authentic Cultural Experiences"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={settings.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Tell visitors about your company..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={settings.contact_info.email}
                onChange={(e) =>
                  handleInputChange("contact_info.email", e.target.value)
                }
                placeholder="contact@yourcompany.com"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={settings.contact_info.phone}
                onChange={(e) =>
                  handleInputChange("contact_info.phone", e.target.value)
                }
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={settings.contact_info.address}
                onChange={(e) =>
                  handleInputChange("contact_info.address", e.target.value)
                }
                placeholder="Your business address"
              />
            </div>
          </CardContent>
        </Card>

        {/* Branding */}
        <Card>
          <CardHeader>
            <CardTitle>Branding</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="primary_color">Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="primary_color"
                  type="color"
                  value={settings.branding.primary_color}
                  onChange={(e) =>
                    handleInputChange("branding.primary_color", e.target.value)
                  }
                  className="w-16 h-10"
                />
                <Input
                  value={settings.branding.primary_color}
                  onChange={(e) =>
                    handleInputChange("branding.primary_color", e.target.value)
                  }
                  placeholder="#9b87f5"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="logo_url">Logo URL</Label>
              <Input
                id="logo_url"
                value={settings.branding.logo_url || ""}
                onChange={(e) =>
                  handleInputChange("branding.logo_url", e.target.value)
                }
                placeholder="https://your-logo-url.com/logo.png"
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                value={settings.social_media.facebook || ""}
                onChange={(e) =>
                  handleInputChange("social_media.facebook", e.target.value)
                }
                placeholder="https://facebook.com/yourcompany"
              />
            </div>

            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={settings.social_media.instagram || ""}
                onChange={(e) =>
                  handleInputChange("social_media.instagram", e.target.value)
                }
                placeholder="https://instagram.com/yourcompany"
              />
            </div>

            <div>
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                value={settings.social_media.twitter || ""}
                onChange={(e) =>
                  handleInputChange("social_media.twitter", e.target.value)
                }
                placeholder="https://twitter.com/yourcompany"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserWebsiteSettingsComponent;

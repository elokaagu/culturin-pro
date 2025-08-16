"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useUserData } from "../../../src/contexts/UserDataContext";
import { useAuth } from "@/hooks/useAuth";
import { userWebsiteService } from "./UserWebsiteService";
import { Image, Globe, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

const WebsiteContent: React.FC = () => {
  const { userData, updateUserData } = useUserData();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState({
    companyName: "",
    tagline: "",
    description: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    linkedin: "",
  });

  useEffect(() => {
    if (userData?.settings) {
      // Load existing content from user settings
      const settings = userData.settings;
      setContent({
        companyName: settings.company_name || "",
        tagline: settings.tagline || "",
        description: settings.description || "",
        email: settings.contact_info?.email || "",
        phone: settings.contact_info?.phone || "",
        address: settings.contact_info?.address || "",
        website: settings.contact_info?.website || "",
        facebook: settings.social_media?.facebook || "",
        twitter: settings.social_media?.twitter || "",
        instagram: settings.social_media?.instagram || "",
        youtube: settings.social_media?.youtube || "",
        linkedin: settings.social_media?.linkedin || "",
      });
    }
  }, [userData]);

  const handleContentChange = (field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!user?.id) {
      toast.error("Please sign in to save content");
      return;
    }

    setLoading(true);
    try {
      // Get current website settings
      const currentSettings = await userWebsiteService.getUserWebsiteSettings(user.id);

      // Update settings with new content
      const updatedSettings = {
        ...currentSettings,
        company_name: content.companyName,
        tagline: content.tagline,
        description: content.description,
        contact_info: {
          ...currentSettings.contact_info,
          email: content.email,
          phone: content.phone,
          address: content.address,
          website: content.website,
        },
        social_media: {
          ...currentSettings.social_media,
          facebook: content.facebook,
          twitter: content.twitter,
          instagram: content.instagram,
          youtube: content.youtube,
          linkedin: content.linkedin,
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
            company_name: content.companyName,
            tagline: content.tagline,
            description: content.description,
            contact_info: updatedSettings.contact_info,
            social_media: updatedSettings.social_media,
          },
        });

        toast.success("Content saved successfully!");
      } else {
        toast.error("Failed to save content");
      }
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Failed to save content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full p-6 pl-8">
      <div className="space-y-6 h-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Website Content</h3>
            <p className="text-sm text-gray-600">
              Customize your website content and contact information
            </p>
          </div>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Content"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={content.companyName}
                  onChange={(e) => handleContentChange("companyName", e.target.value)}
                  placeholder="Your Tour Company"
                />
              </div>
              <div>
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={content.tagline}
                  onChange={(e) => handleContentChange("tagline", e.target.value)}
                  placeholder="Discover Amazing Cultural Experiences"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={content.description}
                  onChange={(e) => handleContentChange("description", e.target.value)}
                  placeholder="We specialize in creating authentic cultural experiences that connect you with local traditions and communities."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={content.email}
                  onChange={(e) => handleContentChange("email", e.target.value)}
                  placeholder="contact@yourcompany.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={content.phone}
                  onChange={(e) => handleContentChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={content.address}
                  onChange={(e) => handleContentChange("address", e.target.value)}
                  placeholder="Your business address"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={content.website}
                  onChange={(e) => handleContentChange("website", e.target.value)}
                  placeholder="https://yourcompany.com"
                />
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Facebook className="h-5 w-5" />
                Social Media
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={content.facebook}
                  onChange={(e) => handleContentChange("facebook", e.target.value)}
                  placeholder="https://facebook.com/yourcompany"
                />
              </div>
              <div>
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={content.twitter}
                  onChange={(e) => handleContentChange("twitter", e.target.value)}
                  placeholder="https://twitter.com/yourcompany"
                />
              </div>
              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={content.instagram}
                  onChange={(e) => handleContentChange("instagram", e.target.value)}
                  placeholder="https://instagram.com/yourcompany"
                />
              </div>
              <div>
                <Label htmlFor="youtube">YouTube</Label>
                <Input
                  id="youtube"
                  value={content.youtube}
                  onChange={(e) => handleContentChange("youtube", e.target.value)}
                  placeholder="https://youtube.com/yourcompany"
                />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={content.linkedin}
                  onChange={(e) => handleContentChange("linkedin", e.target.value)}
                  placeholder="https://linkedin.com/company/yourcompany"
                />
              </div>
            </CardContent>
          </Card>

          {/* Content Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Content Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">{content.companyName || "Your Company Name"}</h4>
                <p className="text-gray-600 mb-3">{content.tagline || "Your tagline will appear here"}</p>
                <p className="text-sm text-gray-700">{content.description || "Your description will appear here"}</p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h5 className="font-medium text-sm">Contact Details:</h5>
                {content.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    {content.email}
                  </div>
                )}
                {content.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    {content.phone}
                  </div>
                )}
                {content.address && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {content.address}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tips */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <h4 className="font-medium text-blue-800 mb-2">
                Content Tips
              </h4>
              <p className="text-sm text-blue-700">
                Write compelling content that tells your story and connects with your audience. 
                Use clear, engaging language and include specific details about your experiences 
                and what makes your tours unique.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WebsiteContent;

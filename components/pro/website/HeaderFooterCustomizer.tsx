"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  Upload,
  X,
  Eye,
  EyeOff,
  Save,
  Palette,
  Layout,
  Type,
  Image as ImageIcon,
  Link,
  Phone,
  Mail,
  MapPin,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import { useUserData } from "../../../src/contexts/UserDataContext";

interface HeaderFooterCustomizerProps {
  onSettingsChange?: () => void;
}

const HeaderFooterCustomizer: React.FC<HeaderFooterCustomizerProps> = ({
  onSettingsChange,
}) => {
  const { userData, updateWebsiteSettings } = useUserData();
  const [saving, setSaving] = useState(false);

  // Header settings
  const [headerLayout, setHeaderLayout] = useState("hero-top");
  const [headerHeight, setHeaderHeight] = useState("medium");
  const [headerTextAlign, setHeaderTextAlign] = useState("center");
  const [showHeaderNav, setShowHeaderNav] = useState(true);
  const [headerNavItems, setHeaderNavItems] = useState([
    "Home",
    "Tours",
    "About",
    "Contact",
  ]);
  const [headerLogo, setHeaderLogo] = useState<string | null>(null);
  const [headerBackgroundType, setHeaderBackgroundType] = useState("image");

  // Footer settings
  const [footerLayout, setFooterLayout] = useState("3-column");
  const [showFooterLogo, setShowFooterLogo] = useState(true);
  const [footerLogo, setFooterLogo] = useState<string | null>(null);
  const [footerBackgroundColor, setFooterBackgroundColor] = useState("#1f2937");
  const [footerTextColor, setFooterTextColor] = useState("#ffffff");
  const [showSocialLinks, setShowSocialLinks] = useState(true);
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
  });

  // Contact information
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    address: "",
    website: "",
  });

  // Initialize with user data
  useEffect(() => {
    const storedHeaderSettings = localStorage.getItem("headerSettings");
    const storedFooterSettings = localStorage.getItem("footerSettings");

    if (storedHeaderSettings) {
      const headerData = JSON.parse(storedHeaderSettings);
      setHeaderLayout(headerData.layout || "hero-top");
      setHeaderHeight(headerData.height || "medium");
      setHeaderTextAlign(headerData.textAlign || "center");
      setShowHeaderNav(headerData.showNav !== false);
      setHeaderNavItems(
        headerData.navItems || ["Home", "Tours", "About", "Contact"]
      );
      setHeaderLogo(headerData.logo || null);
      setHeaderBackgroundType(headerData.backgroundType || "image");
    }

    if (storedFooterSettings) {
      const footerData = JSON.parse(storedFooterSettings);
      setFooterLayout(footerData.layout || "3-column");
      setShowFooterLogo(footerData.showLogo !== false);
      setFooterLogo(footerData.logo || null);
      setFooterBackgroundColor(footerData.backgroundColor || "#1f2937");
      setFooterTextColor(footerData.textColor || "#ffffff");
      setShowSocialLinks(footerData.showSocial !== false);
      setSocialLinks(
        footerData.socialLinks || {
          facebook: "",
          twitter: "",
          instagram: "",
          youtube: "",
        }
      );
      setContactInfo(
        footerData.contactInfo || {
          phone: "",
          email: "",
          address: "",
          website: "",
        }
      );
    }
  }, []);

  const handleHeaderImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size too large (max 5MB)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setHeaderLogo(imageUrl);
      saveHeaderSettings();
      toast.success("Header logo uploaded successfully");
    };
    reader.readAsDataURL(file);
  };

  const handleFooterImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size too large (max 5MB)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setFooterLogo(imageUrl);
      saveFooterSettings();
      toast.success("Footer logo uploaded successfully");
    };
    reader.readAsDataURL(file);
  };

  const saveHeaderSettings = () => {
    const headerSettings = {
      layout: headerLayout,
      height: headerHeight,
      textAlign: headerTextAlign,
      showNav: showHeaderNav,
      navItems: headerNavItems,
      logo: headerLogo,
      backgroundType: headerBackgroundType,
    };
    localStorage.setItem("headerSettings", JSON.stringify(headerSettings));
  };

  const saveFooterSettings = () => {
    const footerSettings = {
      layout: footerLayout,
      showLogo: showFooterLogo,
      logo: footerLogo,
      backgroundColor: footerBackgroundColor,
      textColor: footerTextColor,
      showSocial: showSocialLinks,
      socialLinks,
      contactInfo,
    };
    localStorage.setItem("footerSettings", JSON.stringify(footerSettings));
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      saveHeaderSettings();
      saveFooterSettings();

      // Update website settings context
      updateWebsiteSettings({
        headerSettings: {
          layout: headerLayout,
          height: headerHeight,
          textAlign: headerTextAlign,
          showNav: showHeaderNav,
          navItems: headerNavItems,
          logo: headerLogo,
          backgroundType: headerBackgroundType,
        },
        footerSettings: {
          layout: footerLayout,
          showLogo: showFooterLogo,
          logo: footerLogo,
          backgroundColor: footerBackgroundColor,
          textColor: footerTextColor,
          showSocial: showSocialLinks,
          socialLinks,
          contactInfo,
        },
      });

      if (onSettingsChange) {
        onSettingsChange();
      }

      toast.success("Header and footer settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const addNavItem = () => {
    const newItem = `Item ${headerNavItems.length + 1}`;
    setHeaderNavItems([...headerNavItems, newItem]);
  };

  const removeNavItem = (index: number) => {
    setHeaderNavItems(headerNavItems.filter((_, i) => i !== index));
  };

  const updateNavItem = (index: number, value: string) => {
    const newItems = [...headerNavItems];
    newItems[index] = value;
    setHeaderNavItems(newItems);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Layout className="h-5 w-5" />
            Header & Footer Customization
          </h2>
          <p className="text-gray-600 text-sm">
            Customize your website header and footer layout, content, and
            styling
          </p>
        </div>
        <Badge variant="outline">Customizable</Badge>
      </div>

      <Tabs defaultValue="header" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="header">Header Settings</TabsTrigger>
          <TabsTrigger value="footer">Footer Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="header" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="h-5 w-5" />
                Header Layout
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="headerLayout">Layout Style</Label>
                  <Select value={headerLayout} onValueChange={setHeaderLayout}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hero-top">
                        Hero with Top Navigation
                      </SelectItem>
                      <SelectItem value="hero-center">
                        Hero with Centered Navigation
                      </SelectItem>
                      <SelectItem value="minimal">Minimal Header</SelectItem>
                      <SelectItem value="sidebar">
                        Sidebar Navigation
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="headerHeight">Header Height</Label>
                  <Select value={headerHeight} onValueChange={setHeaderHeight}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="full">Full Height</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="headerTextAlign">Text Alignment</Label>
                  <Select
                    value={headerTextAlign}
                    onValueChange={setHeaderTextAlign}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="headerBackgroundType">Background Type</Label>
                  <Select
                    value={headerBackgroundType}
                    onValueChange={setHeaderBackgroundType}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="color">Solid Color</SelectItem>
                      <SelectItem value="gradient">Gradient</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showHeaderNav"
                  checked={showHeaderNav}
                  onCheckedChange={(checked) =>
                    setShowHeaderNav(checked as boolean)
                  }
                />
                <Label htmlFor="showHeaderNav">Show Navigation Menu</Label>
              </div>

              {showHeaderNav && (
                <div className="space-y-3">
                  <Label>Navigation Items</Label>
                  <div className="space-y-2">
                    {headerNavItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={item}
                          onChange={(e) => updateNavItem(index, e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeNavItem(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addNavItem}>
                      Add Navigation Item
                    </Button>
                  </div>
                </div>
              )}

              <div>
                <Label>Header Logo</Label>
                <div className="flex items-center gap-3 mt-2">
                  {headerLogo ? (
                    <div className="relative">
                      <img
                        src={headerLogo}
                        alt="Header Logo"
                        className="w-16 h-16 object-contain border rounded"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setHeaderLogo(null)}
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleHeaderImageUpload}
                      className="hidden"
                      id="header-logo-upload"
                    />
                    <Button
                      variant="outline"
                      onClick={() =>
                        document.getElementById("header-logo-upload")?.click()
                      }
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="footer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="h-5 w-5" />
                Footer Layout
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="footerLayout">Layout Style</Label>
                  <Select value={footerLayout} onValueChange={setFooterLayout}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-column">Single Column</SelectItem>
                      <SelectItem value="2-column">Two Columns</SelectItem>
                      <SelectItem value="3-column">Three Columns</SelectItem>
                      <SelectItem value="4-column">Four Columns</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="footerBackgroundColor">
                    Background Color
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      value={footerBackgroundColor}
                      onChange={(e) => setFooterBackgroundColor(e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      type="text"
                      value={footerBackgroundColor}
                      onChange={(e) => setFooterBackgroundColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="footerTextColor">Text Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      value={footerTextColor}
                      onChange={(e) => setFooterTextColor(e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      type="text"
                      value={footerTextColor}
                      onChange={(e) => setFooterTextColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showFooterLogo"
                  checked={showFooterLogo}
                  onCheckedChange={(checked) =>
                    setShowFooterLogo(checked as boolean)
                  }
                />
                <Label htmlFor="showFooterLogo">Show Footer Logo</Label>
              </div>

              {showFooterLogo && (
                <div>
                  <Label>Footer Logo</Label>
                  <div className="flex items-center gap-3 mt-2">
                    {footerLogo ? (
                      <div className="relative">
                        <img
                          src={footerLogo}
                          alt="Footer Logo"
                          className="w-16 h-16 object-contain border rounded"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setFooterLogo(null)}
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFooterImageUpload}
                        className="hidden"
                        id="footer-logo-upload"
                      />
                      <Button
                        variant="outline"
                        onClick={() =>
                          document.getElementById("footer-logo-upload")?.click()
                        }
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Logo
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showSocialLinks"
                    checked={showSocialLinks}
                    onCheckedChange={(checked) =>
                      setShowSocialLinks(checked as boolean)
                    }
                  />
                  <Label htmlFor="showSocialLinks">
                    Show Social Media Links
                  </Label>
                </div>

                {showSocialLinks && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="facebook">Facebook URL</Label>
                      <Input
                        value={socialLinks.facebook}
                        onChange={(e) =>
                          setSocialLinks({
                            ...socialLinks,
                            facebook: e.target.value,
                          })
                        }
                        placeholder="https://facebook.com/yourpage"
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitter">Twitter URL</Label>
                      <Input
                        value={socialLinks.twitter}
                        onChange={(e) =>
                          setSocialLinks({
                            ...socialLinks,
                            twitter: e.target.value,
                          })
                        }
                        placeholder="https://twitter.com/yourhandle"
                      />
                    </div>
                    <div>
                      <Label htmlFor="instagram">Instagram URL</Label>
                      <Input
                        value={socialLinks.instagram}
                        onChange={(e) =>
                          setSocialLinks({
                            ...socialLinks,
                            instagram: e.target.value,
                          })
                        }
                        placeholder="https://instagram.com/yourprofile"
                      />
                    </div>
                    <div>
                      <Label htmlFor="youtube">YouTube URL</Label>
                      <Input
                        value={socialLinks.youtube}
                        onChange={(e) =>
                          setSocialLinks({
                            ...socialLinks,
                            youtube: e.target.value,
                          })
                        }
                        placeholder="https://youtube.com/yourchannel"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label>Contact Information</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        value={contactInfo.phone}
                        onChange={(e) =>
                          setContactInfo({
                            ...contactInfo,
                            phone: e.target.value,
                          })
                        }
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        value={contactInfo.email}
                        onChange={(e) =>
                          setContactInfo({
                            ...contactInfo,
                            email: e.target.value,
                          })
                        }
                        placeholder="info@yourcompany.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        value={contactInfo.website}
                        onChange={(e) =>
                          setContactInfo({
                            ...contactInfo,
                            website: e.target.value,
                          })
                        }
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        value={contactInfo.address}
                        onChange={(e) =>
                          setContactInfo({
                            ...contactInfo,
                            address: e.target.value,
                          })
                        }
                        placeholder="123 Main Street, City, State 12345"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between items-center pt-4 border-t">
        <div className="text-sm text-gray-500">
          Changes will be applied to your website preview
        </div>
        <Button
          onClick={handleSaveAll}
          disabled={saving}
          className="flex items-center gap-2"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save All Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default HeaderFooterCustomizer;

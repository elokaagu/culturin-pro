"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Mountain,
  Crown,
  Building2,
  Heart,
  Leaf,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { useUserData } from "../../../src/contexts/UserDataContext";
import { useAuth } from "@/hooks/useAuth";
import { userWebsiteService } from "./UserWebsiteService";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  features: string[];
  isPopular?: boolean;
  isNew?: boolean;
  themeSettings: {
    primaryColor: string;
    fontFamily: string;
    heroClass: string;
    headerStyle: string;
    footerStyle: string;
    animationStyle: string;
  };
}

const templates: Template[] = [
  {
    id: "adventure",
    name: "Adventure Explorer",
    description: "Perfect for outdoor and adventure tours",
    category: "Adventure",
    image: "bg-gradient-to-br from-green-400 to-blue-500",
    features: [
      "Hero section with action shots",
      "Adventure-focused content",
      "Dynamic color scheme",
    ],
    isPopular: true,
    themeSettings: {
      primaryColor: "#10B981",
      fontFamily: "Inter",
      heroClass: "hero-adventure",
      headerStyle: "header-modern",
      footerStyle: "footer-dark",
      animationStyle: "fade-in-up",
    },
  },
  {
    id: "cultural",
    name: "Cultural Heritage",
    description: "Ideal for cultural and historical tours",
    category: "Cultural",
    image: "bg-gradient-to-br from-amber-400 to-orange-500",
    features: [
      "Elegant typography",
      "Cultural imagery focus",
      "Warm color palette",
    ],
    isPopular: true,
    themeSettings: {
      primaryColor: "#F59E0B",
      fontFamily: "Playfair Display",
      heroClass: "hero-cultural",
      headerStyle: "header-elegant",
      footerStyle: "footer-elegant",
      animationStyle: "slide-in-left",
    },
  },
  {
    id: "luxury",
    name: "Luxury Premium",
    description: "High-end luxury tour experiences",
    category: "Luxury",
    image: "bg-gradient-to-br from-purple-400 to-pink-500",
    features: [
      "Premium design elements",
      "Luxury-focused messaging",
      "Sophisticated layout",
    ],
    isNew: true,
    themeSettings: {
      primaryColor: "#8B5CF6",
      fontFamily: "Cormorant Garamond",
      heroClass: "hero-luxury",
      headerStyle: "header-premium",
      footerStyle: "footer-premium",
      animationStyle: "fade-in-scale",
    },
  },
  {
    id: "family",
    name: "Family Friendly",
    description: "Great for family-oriented tours",
    category: "Family",
    image: "bg-gradient-to-br from-blue-400 to-cyan-500",
    features: [
      "Family-friendly design",
      "Bright, cheerful colors",
      "Easy navigation",
    ],
    themeSettings: {
      primaryColor: "#3B82F6",
      fontFamily: "Nunito",
      heroClass: "hero-family",
      headerStyle: "header-friendly",
      footerStyle: "footer-friendly",
      animationStyle: "bounce-in",
    },
  },
  {
    id: "eco",
    name: "Eco Conscious",
    description: "Perfect for sustainable and eco tours",
    category: "Eco",
    image: "bg-gradient-to-br from-emerald-400 to-teal-500",
    features: [
      "Nature-inspired design",
      "Eco-friendly messaging",
      "Organic layouts",
    ],
    themeSettings: {
      primaryColor: "#059669",
      fontFamily: "Source Sans Pro",
      heroClass: "hero-eco",
      headerStyle: "header-natural",
      footerStyle: "footer-natural",
      animationStyle: "grow-in",
    },
  },
  {
    id: "urban",
    name: "Urban Explorer",
    description: "Ideal for city and urban tours",
    category: "Urban",
    image: "bg-gradient-to-br from-gray-400 to-slate-500",
    features: [
      "Modern urban aesthetic",
      "City-focused design",
      "Contemporary layout",
    ],
    themeSettings: {
      primaryColor: "#6B7280",
      fontFamily: "Roboto",
      heroClass: "hero-urban",
      headerStyle: "header-modern",
      footerStyle: "footer-modern",
      animationStyle: "slide-in-right",
    },
  },
];

const WebsiteThemes: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { userData, updateUserData } = useUserData();
  const { user } = useAuth();

  useEffect(() => {
    if (userData?.settings?.branding?.theme) {
      setSelectedTheme(userData.settings.branding.theme);
    }
  }, [userData]);

  const handleThemeSelect = async (themeId: string) => {
    if (!user?.id) {
      toast.error("Please sign in to apply themes");
      return;
    }

    setLoading(true);
    try {
      const theme = templates.find((t) => t.id === themeId);
      if (!theme) {
        toast.error("Theme not found");
        return;
      }

      // Get current website settings
      const currentSettings = await userWebsiteService.getUserWebsiteSettings(
        user.id
      );

      // Update settings with new theme
      const updatedSettings = {
        ...currentSettings,
        branding: {
          ...currentSettings.branding,
          theme: themeId,
          primary_color: theme.themeSettings.primaryColor,
        },
        updated_at: new Date().toISOString(),
      };

      // Save to database
      const success = await userWebsiteService.saveUserWebsiteSettings(
        updatedSettings
      );

      if (success) {
        // Update local state
        await updateUserData({
          settings: {
            ...userData?.settings,
            branding: updatedSettings.branding,
          },
        });

        setSelectedTheme(themeId);
        toast.success(`Applied ${theme.name} theme successfully!`);
      } else {
        toast.error("Failed to apply theme");
      }
    } catch (error) {
      console.error("Error applying theme:", error);
      toast.error("Failed to apply theme");
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "adventure":
        return <Mountain className="h-5 w-5" />;
      case "luxury":
        return <Crown className="h-5 w-5" />;
      case "cultural":
        return <Building2 className="h-5 w-5" />;
      case "family":
        return <Heart className="h-5 w-5" />;
      case "eco":
        return <Leaf className="h-5 w-5" />;
      case "urban":
        return <Building2 className="h-5 w-5" />;
      default:
        return <Sparkles className="h-5 w-5" />;
    }
  };

  return (
    <div className="h-full p-6 pl-8">
      <div className="space-y-6 h-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Website Themes</h3>
            <p className="text-sm text-gray-600">
              Choose a theme to customize your website's appearance
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card
              key={template.id}
              className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedTheme === template.id
                  ? "ring-2 ring-blue-500 border-blue-200"
                  : "hover:border-gray-300"
              }`}
              onClick={() => handleThemeSelect(template.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(template.category)}
                    <Badge variant="secondary" className="text-xs">
                      {template.category}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    {template.isPopular && (
                      <Badge
                        variant="default"
                        className="text-xs bg-orange-500"
                      >
                        Popular
                      </Badge>
                    )}
                    {template.isNew && (
                      <Badge variant="default" className="text-xs bg-green-500">
                        New
                      </Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <p className="text-sm text-gray-600">{template.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Theme Preview */}
                <div
                  className={`h-32 rounded-lg ${template.image} flex items-center justify-center`}
                >
                  <div className="text-white text-center">
                    <div className="text-2xl font-bold">{template.name}</div>
                    <div className="text-sm opacity-90">Preview</div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Features:</h4>
                  <ul className="space-y-1">
                    {template.features.map((feature, index) => (
                      <li
                        key={index}
                        className="text-xs text-gray-600 flex items-center"
                      >
                        <Check className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Apply Button */}
                <Button
                  className={`w-full ${
                    selectedTheme === template.id
                      ? "bg-green-600 hover:bg-green-700"
                      : ""
                  }`}
                  disabled={loading}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleThemeSelect(template.id);
                  }}
                >
                  {loading ? (
                    "Applying..."
                  ) : selectedTheme === template.id ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Applied
                    </>
                  ) : (
                    "Apply Theme"
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Theme Customization Info */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <h4 className="font-medium text-blue-800 mb-2">
                Customize Your Theme
              </h4>
              <p className="text-sm text-blue-700">
                After selecting a theme, you can further customize colors,
                fonts, and layouts in the Settings tab. Each theme provides a
                unique starting point that you can adapt to match your brand
                perfectly.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WebsiteThemes;

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Mountain, Crown, Building2, Heart, Leaf, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useUserData } from "../../../src/contexts/UserDataContext";

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
    description: "Perfect for adventure tour operators with stunning imagery and bold typography",
    category: "Adventure",
    image: "/lovable-uploads/2e9a9e9e-af76-4913-8148-9fce248d55c9.png",
    features: ["Hero video background", "Adventure gallery", "Trip difficulty levels", "Booking calendar"],
    isPopular: true,
    themeSettings: {
      primaryColor: "#059669",
      fontFamily: "Inter",
      heroClass: "bg-gradient-to-r from-green-600 to-green-800",
      headerStyle: "modern",
      footerStyle: "clean",
      animationStyle: "smooth"
    }
  },
  {
    id: "luxury",
    name: "Luxury Retreat",
    description: "Elegant design for high-end travel experiences with sophisticated styling",
    category: "Luxury",
    image: "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png",
    features: ["Premium imagery", "Luxury amenities", "Concierge booking", "VIP testimonials"],
    isNew: true,
    themeSettings: {
      primaryColor: "#7C3AED",
      fontFamily: "Playfair Display",
      heroClass: "bg-gradient-to-r from-purple-600 to-purple-800",
      headerStyle: "elegant",
      footerStyle: "sophisticated",
      animationStyle: "subtle"
    }
  },
  {
    id: "city-tours",
    name: "City Explorer",
    description: "Urban-focused design perfect for city tour operators and cultural experiences",
    category: "City Tours",
    image: "/lovable-uploads/31055680-5e98-433a-a30a-747997259663.png",
    features: ["Interactive maps", "Local highlights", "Cultural insights", "Group bookings"],
    themeSettings: {
      primaryColor: "#1E40AF",
      fontFamily: "Inter",
      heroClass: "bg-gradient-to-r from-blue-600 to-blue-800",
      headerStyle: "urban",
      footerStyle: "modern",
      animationStyle: "dynamic"
    }
  },
  {
    id: "cultural",
    name: "Cultural Immersion",
    description: "Deep cultural experiences with rich storytelling and local connections",
    category: "Cultural",
    image: "/lovable-uploads/1a12120c-6cfd-4fe3-9571-0ea00be99ff3.png",
    features: ["Story-driven content", "Local guides", "Cultural workshops", "Community impact"],
    themeSettings: {
      primaryColor: "#DC2626",
      fontFamily: "Merriweather",
      heroClass: "bg-gradient-to-r from-red-600 to-red-800",
      headerStyle: "traditional",
      footerStyle: "warm",
      animationStyle: "gentle"
    }
  },
  {
    id: "eco-tourism",
    name: "Eco Adventure",
    description: "Sustainable tourism focus with nature-inspired design and eco-friendly messaging",
    category: "Eco-Tourism",
    image: "/lovable-uploads/1b4ba777-0a40-4904-98a9-11b727de21a6.png",
    features: ["Sustainability focus", "Nature photography", "Eco-certifications", "Conservation impact"],
    themeSettings: {
      primaryColor: "#16A34A",
      fontFamily: "Inter",
      heroClass: "bg-gradient-to-r from-green-500 to-green-700",
      headerStyle: "natural",
      footerStyle: "eco-friendly",
      animationStyle: "organic"
    }
  }
];

const WebsiteThemes: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [applyingTemplate, setApplyingTemplate] = useState(false);
  const { userData, updateWebsiteSettings } = useUserData();

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleApplyTemplate = async (template: Template) => {
    setApplyingTemplate(true);
    
    try {
      // Apply the template settings to the website
      const updatedSettings = {
        ...userData.websiteSettings,
        theme: template.id,
        primaryColor: template.themeSettings.primaryColor,
        fontSettings: {
          ...userData.websiteSettings.fontSettings,
          family: template.themeSettings.fontFamily,
        },
        headerSettings: {
          ...userData.websiteSettings.headerSettings,
          style: template.themeSettings.headerStyle,
        },
        footerSettings: {
          ...userData.websiteSettings.footerSettings,
          style: template.themeSettings.footerStyle,
        },
        animationSettings: {
          ...userData.websiteSettings.animationSettings,
          style: template.themeSettings.animationStyle,
        },
      };

      // Update the website settings
      updateWebsiteSettings(updatedSettings);

      // Dispatch theme change event for preview update
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("themeChanged", {
            detail: { theme: template.id, settings: template.themeSettings }
          })
        );
      }

      toast.success(`${template.name} template applied successfully!`);
      setSelectedTemplate(null);
    } catch (error) {
      toast.error("Failed to apply template", {
        description: "Please try again"
      });
    } finally {
      setApplyingTemplate(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Adventure":
        return <Mountain className="h-4 w-4" />;
      case "Luxury":
        return <Crown className="h-4 w-4" />;
      case "City Tours":
        return <Building2 className="h-4 w-4" />;
      case "Cultural":
        return <Heart className="h-4 w-4" />;
      case "Eco-Tourism":
        return <Leaf className="h-4 w-4" />;
      default:
        return <Sparkles className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Template</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select a template that matches your brand and tour style. Each template is fully customizable 
          and optimized for tour operators.
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedTemplate === template.id
                ? "ring-2 ring-culturin-indigo border-culturin-indigo"
                : "hover:border-gray-300"
            }`}
            onClick={() => handleTemplateSelect(template.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(template.category)}
                  <Badge variant="outline" className="text-xs">
                    {template.category}
                  </Badge>
                </div>
                <div className="flex gap-1">
                  {template.isPopular && (
                    <Badge className="bg-orange-100 text-orange-700 text-xs">
                      Popular
                    </Badge>
                  )}
                  {template.isNew && (
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      New
                    </Badge>
                  )}
                </div>
              </div>
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <CardDescription className="text-sm">
                {template.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              {/* Template Preview Image */}
              <div className="relative mb-4">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                {selectedTemplate === template.id && (
                  <div className="absolute inset-0 bg-culturin-indigo/20 rounded-lg flex items-center justify-center">
                    <Check className="h-8 w-8 text-white bg-culturin-indigo rounded-full p-1" />
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-medium text-gray-700">Key Features:</h4>
                <ul className="space-y-1">
                  {template.features.map((feature, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-center gap-1">
                      <Check className="h-3 w-3 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Apply Button */}
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleApplyTemplate(template);
                }}
                disabled={applyingTemplate}
                className="w-full"
              >
                {applyingTemplate ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Applying...
                  </>
                ) : (
                  "Apply Template"
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Custom Template Option */}
      <Card className="border-dashed border-2 border-gray-300 hover:border-culturin-indigo transition-colors">
        <CardContent className="p-6 text-center">
          <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Template</h3>
          <p className="text-gray-600 mb-4">
            Start from scratch and build your perfect website with our drag-and-drop builder.
          </p>
          <Button variant="outline" className="w-full">
            Start from Scratch
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsiteThemes;

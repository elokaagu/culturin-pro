import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Check } from "lucide-react";
import { toast } from "sonner";
import { useUserData } from "../../../src/contexts/UserDataContext";

const themes = [
  {
    id: 1,
    name: "Classic",
    image: "bg-gradient-to-r from-gray-100 to-gray-200",
    premium: false,
  },
  {
    id: 2,
    name: "Modern",
    image: "bg-gradient-to-r from-blue-100 to-blue-200",
    premium: false,
  },
  {
    id: 3,
    name: "Elegant",
    image: "bg-gradient-to-r from-amber-100 to-amber-200",
    premium: true,
  },
  {
    id: 4,
    name: "Minimalist",
    image: "bg-gradient-to-r from-stone-100 to-stone-200",
    premium: false,
  },
  {
    id: 5,
    name: "Bold",
    image: "bg-gradient-to-r from-purple-100 to-purple-200",
    premium: true,
  },
  {
    id: 6,
    name: "Artisan",
    image: "bg-gradient-to-r from-emerald-100 to-emerald-200",
    premium: true,
  },
];

const WebsiteThemes: React.FC = () => {
  const { userData, updateWebsiteSettings } = useUserData();
  const [applyingTheme, setApplyingTheme] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<number>(() => {
    // Get theme from UserDataContext first, then fallback to localStorage
    const currentTheme = userData.websiteSettings.theme;
    if (currentTheme) {
      const themeObj = themes.find(
        (t) => t.name.toLowerCase() === currentTheme.toLowerCase()
      );
      return themeObj ? themeObj.id : 1;
    }

    const saved = localStorage.getItem("selectedWebsiteTheme");
    if (saved) {
      const themeObj = themes.find(
        (t) => t.name.toLowerCase() === saved.toLowerCase()
      );
      return themeObj ? themeObj.id : 1;
    }
    return 1;
  });

  // Update selectedTheme when userData changes
  useEffect(() => {
    const currentTheme = userData.websiteSettings.theme;
    if (currentTheme) {
      const themeObj = themes.find(
        (t) => t.name.toLowerCase() === currentTheme.toLowerCase()
      );
      if (themeObj && themeObj.id !== selectedTheme) {
        setSelectedTheme(themeObj.id);
      }
    }
  }, [userData.websiteSettings.theme]);

  const handleSelectTheme = (id: number, isPremium: boolean) => {
    if (isPremium) {
      toast.error("Premium theme requires upgrade", {
        description: "Upgrade to Pro Plus to access premium themes",
      });
      return;
    }

    setSelectedTheme(id);
    const themeName =
      themes.find((t) => t.id === id)?.name.toLowerCase() || "classic";

    // Update both localStorage and UserDataContext
    localStorage.setItem("selectedWebsiteTheme", themeName);
    updateWebsiteSettings({ theme: themeName });

    toast.success(`"${themes.find((t) => t.id === id)?.name}" theme selected`, {
      description: "Theme will be applied when you click Apply Theme",
    });
  };

  const handleApplyTheme = async () => {
    const theme = themes.find((t) => t.id === selectedTheme);
    if (theme) {
      setApplyingTheme(true);
      const themeName = theme.name.toLowerCase();

      try {
        // Update both localStorage and UserDataContext
        localStorage.setItem("selectedWebsiteTheme", themeName);
        updateWebsiteSettings({ theme: themeName });

        // Simulate a brief delay for better UX
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Trigger a custom event to notify other components
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("themeChanged", {
              detail: { theme: themeName },
            })
          );
        }

        toast.success(`"${theme.name}" theme applied successfully`, {
          description:
            "Your website preview will update with the new theme. Switch to Preview tab to see changes.",
        });
      } catch (error) {
        toast.error("Failed to apply theme", {
          description: "Please try again.",
        });
      } finally {
        setApplyingTheme(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-medium">Select a Theme</h2>
        <p className="text-gray-600 text-sm">
          Choose a theme that best represents your brand
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <Card
            key={theme.id}
            className={`overflow-hidden cursor-pointer transition-all ${
              selectedTheme === theme.id
                ? "ring-2 ring-primary"
                : "hover:shadow-md"
            }`}
            onClick={() => handleSelectTheme(theme.id, theme.premium)}
          >
            <div className={`h-36 ${theme.image}`}>
              {theme.premium && (
                <div className="flex justify-end p-2">
                  <Badge className="bg-gray-900/80 text-white">Premium</Badge>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{theme.name}</h3>
                {theme.premium ? (
                  <Lock className="h-4 w-4 text-gray-400" />
                ) : (
                  selectedTheme === theme.id && (
                    <Check className="h-4 w-4 text-green-500" />
                  )
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="pt-4 flex gap-3 items-center">
        <Button
          onClick={handleApplyTheme}
          disabled={applyingTheme}
          className="flex items-center gap-2"
        >
          {applyingTheme && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {applyingTheme ? "Applying Theme..." : "Apply Theme"}
        </Button>
        {selectedTheme && (
          <span className="text-sm text-gray-500">
            Selected: {themes.find((t) => t.id === selectedTheme)?.name}
          </span>
        )}
      </div>
    </div>
  );
};

export default WebsiteThemes;

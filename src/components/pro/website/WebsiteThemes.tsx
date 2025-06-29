"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Check } from "lucide-react";
import { toast } from "sonner";
import { safeLocalStorage } from "../../../../lib/localStorage";

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
  const [selectedTheme, setSelectedTheme] = useState<number>(1);

  useEffect(() => {
    const saved = safeLocalStorage.getItem("selectedWebsiteTheme");
    if (saved) {
      const themeObj = themes.find(
        (t) => t.name.toLowerCase() === saved.toLowerCase()
      );
      if (themeObj) {
        setSelectedTheme(themeObj.id);
      }
    }
  }, []);

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
    safeLocalStorage.setItem("selectedWebsiteTheme", themeName);
    toast.success(`"${themes.find((t) => t.id === id)?.name}" theme selected`);
  };

  const handleApplyTheme = () => {
    const theme = themes.find((t) => t.id === selectedTheme);
    if (theme) {
      safeLocalStorage.setItem(
        "selectedWebsiteTheme",
        theme.name.toLowerCase()
      );
      toast.success(`Theme applied successfully`, {
        description: "Your theme will be applied when you publish your website",
      });
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

      <div className="pt-4">
        <Button onClick={handleApplyTheme}>Apply Theme</Button>
      </div>
    </div>
  );
};

export default WebsiteThemes;

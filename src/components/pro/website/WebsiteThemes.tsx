"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Check } from "lucide-react";
import { toast } from "sonner";
import { safeLocalStorage } from "../../../../lib/localStorage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const themes = [
  {
    id: 1,
    name: "Classic",
    image: "bg-gradient-to-r from-gray-100 to-gray-200",
    layout: "hero-top",
  },
  {
    id: 2,
    name: "Modern",
    image: "bg-gradient-to-r from-blue-100 to-blue-200",
    layout: "magazine",
  },
  {
    id: 3,
    name: "Elegant",
    image: "bg-gradient-to-r from-amber-100 to-amber-200",
    layout: "newspaper",
  },
  {
    id: 4,
    name: "Minimalist",
    image: "bg-gradient-to-r from-stone-100 to-stone-200",
    layout: "feed",
  },
  {
    id: 5,
    name: "Bold",
    image: "bg-gradient-to-r from-purple-100 to-purple-200",
    layout: "hero-side",
  },
  {
    id: 6,
    name: "Artisan",
    image: "bg-gradient-to-r from-emerald-100 to-emerald-200",
    layout: "hero-top",
  },
];

const WebsiteThemes: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<number>(1);
  const [showModal, setShowModal] = useState(false);

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

  const handleSelectTheme = (id: number) => {
    setSelectedTheme(id);
    const themeName =
      themes.find((t) => t.id === id)?.name.toLowerCase() || "classic";
    safeLocalStorage.setItem("selectedWebsiteTheme", themeName);
  };

  const handleApplyTheme = () => {
    const theme = themes.find((t) => t.id === selectedTheme);
    if (theme) {
      safeLocalStorage.setItem(
        "selectedWebsiteTheme",
        theme.name.toLowerCase()
      );
      safeLocalStorage.setItem("selectedWebsiteLayout", theme.layout);
      // Dispatch a custom event so WebsitePreview can refresh
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("themeChanged", {
            detail: { theme: theme.name.toLowerCase(), layout: theme.layout },
          })
        );
      }
      setShowModal(true);
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
            onClick={() => handleSelectTheme(theme.id)}
          >
            {/* Mini layout preview */}
            <div className="h-20 flex items-center justify-center bg-gray-50 border-b">
              {theme.layout === "hero-top" && (
                <div className="w-full flex flex-col items-center">
                  <div className="w-3/4 h-3 bg-blue-300 rounded mb-1" />
                  <div className="w-2/3 h-2 bg-gray-300 rounded mb-1" />
                  <div className="w-1/2 h-2 bg-gray-200 rounded" />
                </div>
              )}
              {theme.layout === "hero-side" && (
                <div className="w-full flex flex-row items-center gap-1">
                  <div className="w-1/2 h-8 bg-blue-300 rounded" />
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="w-full h-2 bg-gray-300 rounded" />
                    <div className="w-full h-2 bg-gray-200 rounded" />
                  </div>
                </div>
              )}
              {theme.layout === "magazine" && (
                <div className="w-full flex flex-row gap-1">
                  <div className="w-1/3 h-12 bg-purple-200 rounded" />
                  <div className="w-1/3 h-12 bg-pink-200 rounded" />
                  <div className="w-1/3 h-12 bg-blue-200 rounded" />
                </div>
              )}
              {theme.layout === "newspaper" && (
                <div className="w-full flex flex-row gap-1">
                  <div className="w-1/4 h-16 bg-gray-300 rounded" />
                  <div className="w-1/4 h-16 bg-gray-200 rounded" />
                  <div className="w-1/4 h-16 bg-gray-300 rounded" />
                  <div className="w-1/4 h-16 bg-gray-200 rounded" />
                </div>
              )}
              {theme.layout === "feed" && (
                <div className="w-full flex flex-col gap-1 items-center">
                  <div className="w-3/4 h-2 bg-blue-200 rounded" />
                  <div className="w-2/3 h-2 bg-blue-100 rounded" />
                  <div className="w-1/2 h-2 bg-blue-50 rounded" />
                </div>
              )}
            </div>
            {/* End mini layout preview */}
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{theme.name}</h3>
                {selectedTheme === theme.id && (
                  <Check className="h-4 w-4 text-green-500" />
                )}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Layout: {theme.layout.replace("-", " ")}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="pt-4">
        <Button onClick={handleApplyTheme}>Apply Theme</Button>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Theme Applied!</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <p>
              Your "{themes.find((t) => t.id === selectedTheme)?.name}" theme
              has been applied successfully.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Switch to the Preview tab to see your updated website.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowModal(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WebsiteThemes;

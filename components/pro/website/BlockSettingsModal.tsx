"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { PlacedBlock, BlockSettings } from "./DragDropBuilder";
import { useToast } from "@/hooks/use-toast";
import { useUserData } from "@/src/contexts/UserDataContext";
import { X, Palette, Type, Layout, Image as ImageIcon } from "lucide-react";
import { settingsService } from "@/lib/settings-service";

interface BlockSettingsModalProps {
  block: PlacedBlock | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedBlock: PlacedBlock) => void;
}

export default function BlockSettingsModal({
  block,
  isOpen,
  onClose,
  onSave,
}: BlockSettingsModalProps) {
  const { toast } = useToast();
  const { userData } = useUserData();

  const [localBlock, setLocalBlock] = useState<PlacedBlock | null>(null);
  const [activeTab, setActiveTab] = useState("content");

  useEffect(() => {
    if (block) {
      setLocalBlock({ ...block });
    }
  }, [block]);

  if (!localBlock) return null;

  const handleSave = async () => {
    if (localBlock) {
      try {
        // Save block settings using the settings service
        await settingsService.saveWebsiteSettings({
          placedBlocks: [localBlock], // This would need to be integrated with the full blocks array
        });
        
        onSave(localBlock);
        toast({
          title: "Settings Saved",
          description: "Block settings have been updated successfully and saved to database.",
        });
        onClose();
      } catch (error) {
        console.error('Error saving block settings:', error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to save settings. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const updateContent = (key: string, value: any) => {
    setLocalBlock((prev) =>
      prev
        ? {
            ...prev,
            content: {
              ...prev.content,
              [key]: value,
            },
          }
        : null
    );
  };

  const updateSettings = (key: string, value: any) => {
    setLocalBlock((prev) =>
      prev
        ? {
            ...prev,
            settings: {
              ...prev.settings,
              [key]: value,
            },
          }
        : null
    );
  };

  const renderContentTab = () => {
    switch (localBlock.blockType) {
      case "header":
        return (
          <div className="space-y-4">
            <div>
              <Label>Logo Text</Label>
              <Input
                value={localBlock.content.logo}
                onChange={(e) => updateContent("logo", e.target.value)}
                placeholder="Your Logo"
              />
            </div>
            <div>
              <Label>Navigation Items</Label>
              <div className="space-y-2">
                {localBlock.content.navigation.map(
                  (item: string, index: number) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => {
                          const newNav = [...localBlock.content.navigation];
                          newNav[index] = e.target.value;
                          updateContent("navigation", newNav);
                        }}
                        placeholder="Navigation item"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const newNav = localBlock.content.navigation.filter(
                            (_: string, i: number) => i !== index
                          );
                          updateContent("navigation", newNav);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const newNav = [
                      ...localBlock.content.navigation,
                      "New Item",
                    ];
                    updateContent("navigation", newNav);
                  }}
                >
                  Add Navigation Item
                </Button>
              </div>
            </div>
            <div>
              <Label>CTA Button Text</Label>
              <Input
                value={localBlock.content.cta}
                onChange={(e) => updateContent("cta", e.target.value)}
                placeholder="Book Now"
              />
            </div>
          </div>
        );

      case "hero":
        return (
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={localBlock.content.title}
                onChange={(e) => updateContent("title", e.target.value)}
                placeholder="Hero title"
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Textarea
                value={localBlock.content.subtitle}
                onChange={(e) => updateContent("subtitle", e.target.value)}
                placeholder="Hero subtitle"
                rows={3}
              />
            </div>
            <div>
              <Label>CTA Button Text</Label>
              <Input
                value={localBlock.content.ctaText}
                onChange={(e) => updateContent("ctaText", e.target.value)}
                placeholder="Start Exploring"
              />
            </div>
            <div>
              <Label>Background Image URL</Label>
              <Input
                value={localBlock.content.backgroundImage}
                onChange={(e) =>
                  updateContent("backgroundImage", e.target.value)
                }
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        );

      case "text":
        return (
          <div>
            <Label>Text Content</Label>
            <Textarea
              value={localBlock.content.text}
              onChange={(e) => updateContent("text", e.target.value)}
              placeholder="Enter your text content..."
              rows={6}
            />
          </div>
        );

      case "heading":
        return (
          <div className="space-y-4">
            <div>
              <Label>Heading Text</Label>
              <Input
                value={localBlock.content.text}
                onChange={(e) => updateContent("text", e.target.value)}
                placeholder="Your heading"
              />
            </div>
            <div>
              <Label>Heading Level</Label>
              <Select
                value={localBlock.content.level}
                onValueChange={(value) => updateContent("level", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="h1">H1 - Main Heading</SelectItem>
                  <SelectItem value="h2">H2 - Section Heading</SelectItem>
                  <SelectItem value="h3">H3 - Subsection Heading</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "image":
        return (
          <div className="space-y-4">
            <div>
              <Label>Image URL</Label>
              <Input
                value={localBlock.content.src}
                onChange={(e) => updateContent("src", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <Label>Alt Text</Label>
              <Input
                value={localBlock.content.alt}
                onChange={(e) => updateContent("alt", e.target.value)}
                placeholder="Image description"
              />
            </div>
            <div>
              <Label>Caption (Optional)</Label>
              <Input
                value={localBlock.content.caption}
                onChange={(e) => updateContent("caption", e.target.value)}
                placeholder="Image caption"
              />
            </div>
          </div>
        );

      case "grid":
        return (
          <div className="space-y-4">
            <div>
              <Label>Number of Columns</Label>
              <Select
                value={localBlock.content.columns.toString()}
                onValueChange={(value) =>
                  updateContent("columns", parseInt(value))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Column</SelectItem>
                  <SelectItem value="2">2 Columns</SelectItem>
                  <SelectItem value="3">3 Columns</SelectItem>
                  <SelectItem value="4">4 Columns</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Grid Items</Label>
              <div className="space-y-2">
                {localBlock.content.items.map((item: any, index: number) => (
                  <div key={index} className="border rounded p-3 space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={item.title}
                        onChange={(e) => {
                          const newItems = [...localBlock.content.items];
                          newItems[index] = { ...item, title: e.target.value };
                          updateContent("items", newItems);
                        }}
                        placeholder="Item title"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const newItems = localBlock.content.items.filter(
                            (_: any, i: number) => i !== index
                          );
                          updateContent("items", newItems);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea
                      value={item.content}
                      onChange={(e) => {
                        const newItems = [...localBlock.content.items];
                        newItems[index] = { ...item, content: e.target.value };
                        updateContent("items", newItems);
                      }}
                      placeholder="Item content"
                      rows={2}
                    />
                  </div>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const newItems = [
                      ...localBlock.content.items,
                      { title: "New Item", content: "Content" },
                    ];
                    updateContent("items", newItems);
                  }}
                >
                  Add Grid Item
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-500 py-8">
            Content settings for this block type are not yet available.
          </div>
        );
    }
  };

  const renderStyleTab = () => (
    <div className="space-y-6">
      {/* Typography */}
      <div>
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Type className="h-4 w-4" />
          Typography
        </h4>
        <div className="space-y-4">
          <div>
            <Label>Text Alignment</Label>
            <Select
              value={localBlock.settings.textAlign || "left"}
              onValueChange={(value) => updateSettings("textAlign", value)}
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
            <Label>Font Size</Label>
            <Input
              value={localBlock.settings.fontSize || "16px"}
              onChange={(e) => updateSettings("fontSize", e.target.value)}
              placeholder="16px"
            />
          </div>
          <div>
            <Label>Font Weight</Label>
            <Select
              value={localBlock.settings.fontWeight || "400"}
              onValueChange={(value) => updateSettings("fontWeight", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="300">Light (300)</SelectItem>
                <SelectItem value="400">Normal (400)</SelectItem>
                <SelectItem value="500">Medium (500)</SelectItem>
                <SelectItem value="600">Semi Bold (600)</SelectItem>
                <SelectItem value="700">Bold (700)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* Colors */}
      <div>
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Colors
        </h4>
        <div className="space-y-4">
          <div>
            <Label>Text Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={localBlock.settings.color || "#374151"}
                onChange={(e) => updateSettings("color", e.target.value)}
                className="w-16 h-10"
              />
              <Input
                value={localBlock.settings.color || "#374151"}
                onChange={(e) => updateSettings("color", e.target.value)}
                placeholder="#374151"
              />
            </div>
          </div>
          <div>
            <Label>Background Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={localBlock.settings.backgroundColor || "#ffffff"}
                onChange={(e) =>
                  updateSettings("backgroundColor", e.target.value)
                }
                className="w-16 h-10"
              />
              <Input
                value={localBlock.settings.backgroundColor || "#ffffff"}
                onChange={(e) =>
                  updateSettings("backgroundColor", e.target.value)
                }
                placeholder="#ffffff"
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Layout */}
      <div>
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Layout className="h-4 w-4" />
          Layout
        </h4>
        <div className="space-y-4">
          <div>
            <Label>Padding</Label>
            <Input
              value={localBlock.settings.padding || "1rem"}
              onChange={(e) => updateSettings("padding", e.target.value)}
              placeholder="1rem"
            />
          </div>
          <div>
            <Label>Margin</Label>
            <Input
              value={localBlock.settings.margin || "0"}
              onChange={(e) => updateSettings("margin", e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <Label>Width</Label>
            <Input
              value={localBlock.settings.width || "100%"}
              onChange={(e) => updateSettings("width", e.target.value)}
              placeholder="100%"
            />
          </div>
          <div>
            <Label>Border Radius</Label>
            <Input
              value={localBlock.settings.borderRadius || "0"}
              onChange={(e) => updateSettings("borderRadius", e.target.value)}
              placeholder="8px"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Badge variant="outline">{localBlock.blockType}</Badge>
            Block Settings
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="mt-6">
            {renderContentTab()}
          </TabsContent>

          <TabsContent value="style" className="mt-6">
            {renderStyleTab()}
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

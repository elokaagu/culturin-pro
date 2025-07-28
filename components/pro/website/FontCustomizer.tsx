"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Type, Save, Eye, EyeOff, Palette, Zap, Sparkles } from "lucide-react";
import { useUserData } from "../../../src/contexts/UserDataContext";

interface FontCustomizerProps {
  onSettingsChange?: () => void;
}

const FontCustomizer: React.FC<FontCustomizerProps> = ({
  onSettingsChange,
}) => {
  const { userData, updateWebsiteSettings } = useUserData();
  const [saving, setSaving] = useState(false);

  // Font settings
  const [headingFont, setHeadingFont] = useState("Inter");
  const [bodyFont, setBodyFont] = useState("Inter");
  const [headingFontWeight, setHeadingFontWeight] = useState([600]);
  const [bodyFontWeight, setBodyFontWeight] = useState([400]);
  const [headingFontSize, setHeadingFontSize] = useState([32]);
  const [bodyFontSize, setBodyFontSize] = useState([16]);
  const [lineHeight, setLineHeight] = useState([1.5]);
  const [letterSpacing, setLetterSpacing] = useState([0]);

  // Animation settings
  const [enableAnimations, setEnableAnimations] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState([0.3]);
  const [animationType, setAnimationType] = useState("fade");
  const [enableHoverEffects, setEnableHoverEffects] = useState(true);
  const [enableScrollAnimations, setEnableScrollAnimations] = useState(true);

  // Google Fonts list
  const googleFonts = [
    { name: "Inter", category: "Sans-serif" },
    { name: "Roboto", category: "Sans-serif" },
    { name: "Open Sans", category: "Sans-serif" },
    { name: "Lato", category: "Sans-serif" },
    { name: "Poppins", category: "Sans-serif" },
    { name: "Montserrat", category: "Sans-serif" },
    { name: "Source Sans Pro", category: "Sans-serif" },
    { name: "Nunito", category: "Sans-serif" },
    { name: "Playfair Display", category: "Serif" },
    { name: "Merriweather", category: "Serif" },
    { name: "Lora", category: "Serif" },
    { name: "Crimson Text", category: "Serif" },
    { name: "Georgia", category: "Serif" },
    { name: "Times New Roman", category: "Serif" },
    { name: "Arial", category: "Sans-serif" },
    { name: "Helvetica", category: "Sans-serif" },
    { name: "Verdana", category: "Sans-serif" },
    { name: "Tahoma", category: "Sans-serif" },
    { name: "Trebuchet MS", category: "Sans-serif" },
    { name: "Courier New", category: "Monospace" },
  ];

  const animationTypes = [
    { value: "fade", label: "Fade In", description: "Smooth fade-in effect" },
    {
      value: "slide-up",
      label: "Slide Up",
      description: "Elements slide up from bottom",
    },
    {
      value: "slide-down",
      label: "Slide Down",
      description: "Elements slide down from top",
    },
    {
      value: "slide-left",
      label: "Slide Left",
      description: "Elements slide in from right",
    },
    {
      value: "slide-right",
      label: "Slide Right",
      description: "Elements slide in from left",
    },
    {
      value: "zoom-in",
      label: "Zoom In",
      description: "Elements scale up from center",
    },
    {
      value: "zoom-out",
      label: "Zoom Out",
      description: "Elements scale down from center",
    },
    { value: "bounce", label: "Bounce", description: "Playful bounce effect" },
    { value: "flip", label: "Flip", description: "3D flip animation" },
    { value: "rotate", label: "Rotate", description: "Rotation animation" },
  ];

  // Initialize with user data
  useEffect(() => {
    const storedFontSettings = localStorage.getItem("fontSettings");
    const storedAnimationSettings = localStorage.getItem("animationSettings");

    if (storedFontSettings) {
      const fontData = JSON.parse(storedFontSettings);
      setHeadingFont(fontData.headingFont || "Inter");
      setBodyFont(fontData.bodyFont || "Inter");
      setHeadingFontWeight(fontData.headingFontWeight || [600]);
      setBodyFontWeight(fontData.bodyFontWeight || [400]);
      setHeadingFontSize(fontData.headingFontSize || [32]);
      setBodyFontSize(fontData.bodyFontSize || [16]);
      setLineHeight(fontData.lineHeight || [1.5]);
      setLetterSpacing(fontData.letterSpacing || [0]);
    }

    if (storedAnimationSettings) {
      const animationData = JSON.parse(storedAnimationSettings);
      setEnableAnimations(animationData.enableAnimations !== false);
      setAnimationSpeed(animationData.animationSpeed || [0.3]);
      setAnimationType(animationData.animationType || "fade");
      setEnableHoverEffects(animationData.enableHoverEffects !== false);
      setEnableScrollAnimations(animationData.enableScrollAnimations !== false);
    }
  }, []);

  const saveFontSettings = () => {
    const fontSettings = {
      headingFont,
      bodyFont,
      headingFontWeight: headingFontWeight[0],
      bodyFontWeight: bodyFontWeight[0],
      headingFontSize: headingFontSize[0],
      bodyFontSize: bodyFontSize[0],
      lineHeight: lineHeight[0],
      letterSpacing: letterSpacing[0],
    };
    localStorage.setItem("fontSettings", JSON.stringify(fontSettings));
  };

  const saveAnimationSettings = () => {
    const animationSettings = {
      enableAnimations,
      animationSpeed: animationSpeed[0],
      animationType,
      enableHoverEffects,
      enableScrollAnimations,
    };
    localStorage.setItem(
      "animationSettings",
      JSON.stringify(animationSettings)
    );
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      saveFontSettings();
      saveAnimationSettings();

      // Update website settings context
      updateWebsiteSettings({
        fontSettings: {
          headingFont,
          bodyFont,
          headingFontWeight: headingFontWeight[0],
          bodyFontWeight: bodyFontWeight[0],
          headingFontSize: headingFontSize[0],
          bodyFontSize: bodyFontSize[0],
          lineHeight: lineHeight[0],
          letterSpacing: letterSpacing[0],
        },
        animationSettings: {
          enableAnimations,
          animationSpeed: animationSpeed[0],
          animationType,
          enableHoverEffects,
          enableScrollAnimations,
        },
      });

      if (onSettingsChange) {
        onSettingsChange();
      }

      toast.success("Font and animation settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const getFontPreviewStyle = (
    fontFamily: string,
    fontSize: number,
    fontWeight: number
  ) => ({
    fontFamily: `"${fontFamily}", sans-serif`,
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    lineHeight: lineHeight[0],
    letterSpacing: `${letterSpacing[0]}px`,
  });

  const getAnimationClass = (type: string) => {
    const speed = animationSpeed[0];
    const baseClass = "transition-all duration-300 ease-in-out";

    switch (type) {
      case "fade":
        return `${baseClass} opacity-0 animate-fade-in`;
      case "slide-up":
        return `${baseClass} transform translate-y-8 opacity-0 animate-slide-up`;
      case "slide-down":
        return `${baseClass} transform -translate-y-8 opacity-0 animate-slide-down`;
      case "slide-left":
        return `${baseClass} transform translate-x-8 opacity-0 animate-slide-left`;
      case "slide-right":
        return `${baseClass} transform -translate-x-8 opacity-0 animate-slide-right`;
      case "zoom-in":
        return `${baseClass} transform scale-95 opacity-0 animate-zoom-in`;
      case "zoom-out":
        return `${baseClass} transform scale-105 opacity-0 animate-zoom-out`;
      case "bounce":
        return `${baseClass} animate-bounce`;
      case "flip":
        return `${baseClass} transform rotate-y-180 animate-flip`;
      case "rotate":
        return `${baseClass} animate-spin`;
      default:
        return baseClass;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Type className="h-5 w-5" />
            Font & Animation Customization
          </h2>
          <p className="text-gray-600 text-sm">
            Choose custom fonts and animations to make your website stand out
          </p>
        </div>
        <Badge variant="outline">Customizable</Badge>
      </div>

      <Tabs defaultValue="fonts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="fonts">Font Settings</TabsTrigger>
          <TabsTrigger value="animations">Animations</TabsTrigger>
        </TabsList>

        <TabsContent value="fonts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5" />
                Typography Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Heading Font */}
              <div className="space-y-4">
                <Label>Heading Font</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Select value={headingFont} onValueChange={setHeadingFont}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {googleFonts.map((font) => (
                          <SelectItem key={font.name} value={font.name}>
                            <div className="flex items-center justify-between w-full">
                              <span>{font.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                {font.category}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Font Weight</Label>
                    <Slider
                      value={headingFontWeight}
                      onValueChange={setHeadingFontWeight}
                      max={900}
                      min={100}
                      step={100}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Weight: {headingFontWeight[0]}
                    </div>
                  </div>
                </div>

                {/* Heading Preview */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Label className="text-sm text-gray-600 mb-2">Preview</Label>
                  <h1
                    className="text-2xl"
                    style={getFontPreviewStyle(
                      headingFont,
                      headingFontSize[0],
                      headingFontWeight[0]
                    )}
                  >
                    Your Website Heading
                  </h1>
                </div>
              </div>

              {/* Body Font */}
              <div className="space-y-4">
                <Label>Body Font</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Select value={bodyFont} onValueChange={setBodyFont}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {googleFonts.map((font) => (
                          <SelectItem key={font.name} value={font.name}>
                            <div className="flex items-center justify-between w-full">
                              <span>{font.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                {font.category}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Font Weight</Label>
                    <Slider
                      value={bodyFontWeight}
                      onValueChange={setBodyFontWeight}
                      max={900}
                      min={100}
                      step={100}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Weight: {bodyFontWeight[0]}
                    </div>
                  </div>
                </div>

                {/* Body Preview */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Label className="text-sm text-gray-600 mb-2">Preview</Label>
                  <p
                    style={getFontPreviewStyle(
                      bodyFont,
                      bodyFontSize[0],
                      bodyFontWeight[0]
                    )}
                  >
                    This is how your body text will appear on your website. The
                    font, size, and weight can all be customized to match your
                    brand.
                  </p>
                </div>
              </div>

              {/* Font Sizes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Heading Font Size</Label>
                  <Slider
                    value={headingFontSize}
                    onValueChange={setHeadingFontSize}
                    max={72}
                    min={16}
                    step={2}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Size: {headingFontSize[0]}px
                  </div>
                </div>
                <div>
                  <Label>Body Font Size</Label>
                  <Slider
                    value={bodyFontSize}
                    onValueChange={setBodyFontSize}
                    max={24}
                    min={12}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Size: {bodyFontSize[0]}px
                  </div>
                </div>
              </div>

              {/* Typography Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Line Height</Label>
                  <Slider
                    value={lineHeight}
                    onValueChange={setLineHeight}
                    max={3}
                    min={1}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Line Height: {lineHeight[0]}
                  </div>
                </div>
                <div>
                  <Label>Letter Spacing</Label>
                  <Slider
                    value={letterSpacing}
                    onValueChange={setLetterSpacing}
                    max={2}
                    min={-1}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Letter Spacing: {letterSpacing[0]}px
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="animations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Animation Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Animation Toggle */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="enableAnimations"
                  checked={enableAnimations}
                  onCheckedChange={(checked) =>
                    setEnableAnimations(checked as boolean)
                  }
                />
                <Label htmlFor="enableAnimations">Enable Animations</Label>
              </div>

              {enableAnimations && (
                <>
                  {/* Animation Type */}
                  <div>
                    <Label>Animation Type</Label>
                    <Select
                      value={animationType}
                      onValueChange={setAnimationType}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {animationTypes.map((anim) => (
                          <SelectItem key={anim.value} value={anim.value}>
                            <div className="flex items-center justify-between w-full">
                              <span>{anim.label}</span>
                              <span className="text-xs text-gray-500">
                                {anim.description}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Animation Speed */}
                  <div>
                    <Label>Animation Speed</Label>
                    <Slider
                      value={animationSpeed}
                      onValueChange={setAnimationSpeed}
                      max={1}
                      min={0.1}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Speed: {animationSpeed[0]}s
                    </div>
                  </div>

                  {/* Animation Preview */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Label className="text-sm text-gray-600 mb-2">
                      Animation Preview
                    </Label>
                    <div
                      className={`p-4 bg-white rounded border ${getAnimationClass(
                        animationType
                      )}`}
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-blue-500" />
                        <span>
                          This element will animate with {animationType} effect
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Animation Options */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="enableHoverEffects"
                        checked={enableHoverEffects}
                        onCheckedChange={(checked) =>
                          setEnableHoverEffects(checked as boolean)
                        }
                      />
                      <Label htmlFor="enableHoverEffects">
                        Enable Hover Effects
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="enableScrollAnimations"
                        checked={enableScrollAnimations}
                        onCheckedChange={(checked) =>
                          setEnableScrollAnimations(checked as boolean)
                        }
                      />
                      <Label htmlFor="enableScrollAnimations">
                        Enable Scroll Animations
                      </Label>
                    </div>
                  </div>

                  {/* Animation Examples */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div
                      className={`p-3 bg-blue-100 rounded text-center text-sm ${getAnimationClass(
                        "fade"
                      )}`}
                    >
                      Fade
                    </div>
                    <div
                      className={`p-3 bg-green-100 rounded text-center text-sm ${getAnimationClass(
                        "slide-up"
                      )}`}
                    >
                      Slide Up
                    </div>
                    <div
                      className={`p-3 bg-purple-100 rounded text-center text-sm ${getAnimationClass(
                        "zoom-in"
                      )}`}
                    >
                      Zoom In
                    </div>
                    <div
                      className={`p-3 bg-orange-100 rounded text-center text-sm ${getAnimationClass(
                        "bounce"
                      )}`}
                    >
                      Bounce
                    </div>
                  </div>
                </>
              )}
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

export default FontCustomizer;

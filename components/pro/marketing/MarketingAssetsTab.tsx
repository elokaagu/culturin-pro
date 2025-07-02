"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Grid3X3, FileText, Image, QrCode, Download, Eye } from "lucide-react";
import { toast } from "sonner";

const MarketingAssetsTab = () => {
  const [experienceTitle, setExperienceTitle] = useState(
    "Traditional Cooking Workshop"
  );
  const [location, setLocation] = useState("Amsterdam, Netherlands");
  const [duration, setDuration] = useState("2 hours");
  const [keyDetails, setKeyDetails] = useState(
    "What to bring, meeting point, inclusions..."
  );
  const [price, setPrice] = useState("$49 per person");
  const [colorTheme, setColorTheme] = useState("blue-ocean");
  const [templateStyle, setTemplateStyle] = useState("modern");

  const handleGenerateAsset = (assetType: string) => {
    toast.success(`Generating ${assetType}...`);
  };

  const handlePreview = () => {
    toast.info("Opening preview...");
  };

  const handleDownload = () => {
    toast.success("Asset downloaded!");
  };

  const templateStyles = [
    {
      value: "minimal",
      label: "Minimal",
      icon: <Grid3X3 className="h-6 w-6" />,
    },
    {
      value: "classic",
      label: "Classic",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      value: "photo-based",
      label: "Photo-based",
      icon: <Image className="h-6 w-6" />,
    },
    { value: "modern", label: "Modern", icon: <Grid3X3 className="h-6 w-6" /> },
  ];

  const colorThemes = [
    { value: "blue-ocean", label: "Blue Ocean" },
    { value: "sunset-orange", label: "Sunset Orange" },
    { value: "forest-green", label: "Forest Green" },
    { value: "royal-purple", label: "Royal Purple" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Marketing Materials Creator</h2>
        <p className="text-gray-600">
          Design and generate professional marketing materials for your cultural
          experiences
        </p>
      </div>

      <Tabs defaultValue="info-cards" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="info-cards" className="flex items-center gap-2">
            <Grid3X3 className="h-4 w-4" />
            Info Cards
          </TabsTrigger>
          <TabsTrigger value="flyers" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Flyers
          </TabsTrigger>
          <TabsTrigger
            value="social-graphics"
            className="flex items-center gap-2"
          >
            <Image className="h-4 w-4" />
            Social Graphics
          </TabsTrigger>
          <TabsTrigger value="qr-codes" className="flex items-center gap-2">
            <QrCode className="h-4 w-4" />
            QR Codes
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {/* Common Experience Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Experience Details</CardTitle>
              <CardDescription>
                Information that will be used across all marketing materials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="experience-title">Experience Title</Label>
                  <Input
                    id="experience-title"
                    value={experienceTitle}
                    onChange={(e) => setExperienceTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="key-details">Key Details</Label>
                <Textarea
                  id="key-details"
                  value={keyDetails}
                  onChange={(e) => setKeyDetails(e.target.value)}
                  placeholder="What to bring, meeting point, inclusions..."
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Design Customization */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Design Customization</CardTitle>
              <CardDescription>
                Choose your preferred style and colors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Template Style</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                  {templateStyles.map((style) => (
                    <div
                      key={style.value}
                      onClick={() => setTemplateStyle(style.value)}
                      className={`p-4 border rounded-lg cursor-pointer text-center transition-colors ${
                        templateStyle === style.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex justify-center mb-2">
                        {style.icon}
                      </div>
                      <p className="text-sm font-medium">{style.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="color-theme">Color Theme</Label>
                  <Select value={colorTheme} onValueChange={setColorTheme}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color theme" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorThemes.map((theme) => (
                        <SelectItem key={theme.value} value={theme.value}>
                          {theme.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Asset Generation Tabs */}
          <TabsContent value="info-cards">
            <Card>
              <CardHeader>
                <CardTitle>Information Cards</CardTitle>
                <CardDescription>
                  Create compact info cards perfect for handouts and displays
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleGenerateAsset("info card")}
                    className="flex-1"
                  >
                    Generate Info Card
                  </Button>
                  <Button variant="outline" onClick={handlePreview}>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flyers">
            <Card>
              <CardHeader>
                <CardTitle>Marketing Flyers</CardTitle>
                <CardDescription>
                  Design eye-catching flyers for promoting your experiences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleGenerateAsset("flyer")}
                    className="flex-1"
                  >
                    Generate Flyer
                  </Button>
                  <Button variant="outline" onClick={handlePreview}>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social-graphics">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Graphics</CardTitle>
                <CardDescription>
                  Create graphics optimized for social media platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <Badge variant="outline" className="mb-2">
                      Instagram Post
                    </Badge>
                    <p className="text-sm text-gray-600">1080x1080px</p>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="mb-2">
                      Instagram Story
                    </Badge>
                    <p className="text-sm text-gray-600">1080x1920px</p>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="mb-2">
                      Facebook Post
                    </Badge>
                    <p className="text-sm text-gray-600">1200x630px</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => handleGenerateAsset("social graphics")}
                    className="flex-1"
                  >
                    Generate All Formats
                  </Button>
                  <Button variant="outline" onClick={handlePreview}>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="qr-codes">
            <Card>
              <CardHeader>
                <CardTitle>QR Code Generator</CardTitle>
                <CardDescription>
                  Generate QR codes linking to your experience booking page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="booking-url">Booking URL</Label>
                  <Input
                    id="booking-url"
                    placeholder="https://yoursite.com/book-experience"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => handleGenerateAsset("QR code")}
                    className="flex-1"
                  >
                    Generate QR Code
                  </Button>
                  <Button variant="outline" onClick={handlePreview}>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">QR Code Features:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• High resolution for print materials</li>
                    <li>• Customizable with your brand colors</li>
                    <li>• Error correction for reliable scanning</li>
                    <li>• Multiple formats (PNG, SVG, PDF)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default MarketingAssetsTab;

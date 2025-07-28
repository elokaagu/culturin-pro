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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Grid3X3,
  FileText,
  Image,
  QrCode,
  Download,
  Eye,
  Loader2,
  Copy,
  Check,
  Sparkles,
  MapPin,
  Clock,
  DollarSign,
  Users,
} from "lucide-react";
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

  // AI Generation states
  const [generatedCopy, setGeneratedCopy] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedContent, setCopiedContent] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleGenerateAsset = async (assetType: string) => {
    // Validate required fields
    if (!experienceTitle || !location || !duration) {
      toast.error(
        "Please fill in the Experience Title, Location, and Duration fields."
      );
      return;
    }

    setIsGenerating(true);
    setGeneratedCopy(null);

    try {
      const response = await fetch("/api/generate-marketing-copy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          experienceTitle,
          location,
          duration,
          price,
          keyDetails,
          assetType,
          templateStyle,
          colorTheme,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate marketing copy");
      }

      setGeneratedCopy(data.marketingCopy);
      toast.success(`${assetType} copy generated successfully!`);
    } catch (error: any) {
      console.error("Error generating marketing copy:", error);
      toast.error(
        error.message || "Failed to generate marketing copy. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyContent = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedContent(true);
      toast.success("Content copied to clipboard!");
      setTimeout(() => setCopiedContent(false), 2000);
    } catch (err) {
      toast.error("Failed to copy content");
    }
  };

  const handlePreview = () => {
    if (!generatedCopy) {
      toast.error("Please generate content first before previewing");
      return;
    }
    setIsPreviewOpen(true);
  };

  const handleDownload = () => {
    toast.success("Asset downloaded!");
  };

  const getThemeColors = (theme: string) => {
    switch (theme) {
      case "blue-ocean":
        return {
          primary: "bg-blue-600",
          secondary: "bg-blue-100",
          text: "text-blue-600",
          border: "border-blue-200",
        };
      case "sunset-orange":
        return {
          primary: "bg-orange-500",
          secondary: "bg-orange-100",
          text: "text-orange-500",
          border: "border-orange-200",
        };
      case "forest-green":
        return {
          primary: "bg-green-600",
          secondary: "bg-green-100",
          text: "text-green-600",
          border: "border-green-200",
        };
      case "royal-purple":
        return {
          primary: "bg-purple-600",
          secondary: "bg-purple-100",
          text: "text-purple-600",
          border: "border-purple-200",
        };
      default:
        return {
          primary: "bg-blue-600",
          secondary: "bg-blue-100",
          text: "text-blue-600",
          border: "border-blue-200",
        };
    }
  };

  const InfoCardPreview = ({ content }: { content: any }) => {
    const colors = getThemeColors(colorTheme);

    return (
      <div className="max-w-sm mx-auto">
        <div
          className={`rounded-lg shadow-lg overflow-hidden border ${colors.border}`}
        >
          {/* Header */}
          <div className={`${colors.primary} text-white p-4`}>
            <h3 className="text-lg font-bold mb-1">
              {content.headline || "Dive into Dutch Culinary Tradition"}
            </h3>
            <div className="flex items-center gap-2 text-sm opacity-90">
              <MapPin className="h-3 w-3" />
              <span>{location}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 bg-white">
            <p className="text-gray-700 mb-4">
              {content.description ||
                "Immerse yourself in Amsterdam's rich culture through a hands-on traditional cooking workshop."}
            </p>

            {/* Key Highlights */}
            {content.highlights && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-800 mb-2">
                  Key Highlights:
                </h4>
                <ul className="space-y-1">
                  {content.highlights.map(
                    (highlight: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className={`${colors.text} mt-1`}>•</span>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {/* Details */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">{duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">{price}</span>
              </div>
            </div>

            {/* Call to Action */}
            {content.callToAction && (
              <div className={`${colors.secondary} p-3 rounded-lg mb-3`}>
                <p className="font-medium text-gray-800 text-center">
                  {content.callToAction}
                </p>
              </div>
            )}

            {/* Hashtags */}
            {content.hashtags && (
              <div className="flex flex-wrap gap-1">
                {content.hashtags.map((tag: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className={`${colors.text} text-xs`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
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

  const renderGeneratedContent = (content: any, assetType: string) => {
    if (!content) return null;

    switch (assetType) {
      case "info-card":
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Headline:</h4>
              <p className="text-lg font-semibold text-gray-800">
                {content.headline}
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Description:</h4>
              <p className="text-gray-700">{content.description}</p>
            </div>
            {content.highlights && (
              <div>
                <h4 className="font-medium mb-2">Key Highlights:</h4>
                <ul className="space-y-1">
                  {content.highlights.map(
                    (highlight: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
            {content.callToAction && (
              <div>
                <h4 className="font-medium mb-2">Call to Action:</h4>
                <p className="text-gray-700 font-medium">
                  {content.callToAction}
                </p>
              </div>
            )}
            {content.hashtags && (
              <div>
                <h4 className="font-medium mb-2">Suggested Hashtags:</h4>
                <div className="flex flex-wrap gap-2">
                  {content.hashtags.map((tag: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-blue-600"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "flyer":
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Headline:</h4>
              <p className="text-xl font-bold text-gray-800">
                {content.headline}
              </p>
            </div>
            {content.subheading && (
              <div>
                <h4 className="font-medium mb-2">Subheading:</h4>
                <p className="text-lg text-gray-700">{content.subheading}</p>
              </div>
            )}
            {content.benefits && (
              <div>
                <h4 className="font-medium mb-2">Key Benefits:</h4>
                <ul className="space-y-1">
                  {content.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {content.included && (
              <div>
                <h4 className="font-medium mb-2">What's Included:</h4>
                <ul className="space-y-1">
                  {content.included.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {content.callToAction && (
              <div>
                <h4 className="font-medium mb-2">Call to Action:</h4>
                <p className="text-gray-700 font-semibold">
                  {content.callToAction}
                </p>
              </div>
            )}
            {content.contactInfo && (
              <div>
                <h4 className="font-medium mb-2">Contact Info:</h4>
                <p className="text-gray-700">{content.contactInfo}</p>
              </div>
            )}
            {content.socialProof && (
              <div>
                <h4 className="font-medium mb-2">Social Proof:</h4>
                <p className="text-gray-600 italic">{content.socialProof}</p>
              </div>
            )}
          </div>
        );

      case "social-graphics":
        return (
          <div className="space-y-6">
            {content.instagramPost && (
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  Instagram Post
                </h4>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    {content.instagramPost.caption}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {content.instagramPost.hashtags?.map(
                      (tag: string, index: number) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-pink-600"
                        >
                          {tag}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
            {content.instagramStory && (
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  Instagram Story
                </h4>
                <p className="text-gray-700">{content.instagramStory.text}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {content.instagramStory.hashtags?.map(
                    (tag: string, index: number) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-pink-600"
                      >
                        {tag}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            )}
            {content.facebookPost && (
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Facebook Post
                </h4>
                <p className="text-gray-700">
                  {content.facebookPost.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {content.facebookPost.hashtags?.map(
                    (tag: string, index: number) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-blue-600"
                      >
                        {tag}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">{JSON.stringify(content, null, 2)}</p>
          </div>
        );
    }
  };

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
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  Information Cards
                </CardTitle>
                <CardDescription>
                  Create compact info cards perfect for handouts and displays
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleGenerateAsset("info-card")}
                    disabled={isGenerating}
                    className="flex-1"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Info Card
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handlePreview}
                    disabled={!generatedCopy}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>

                {generatedCopy && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Generated Content:</h4>
                      <Button
                        onClick={() =>
                          handleCopyContent(
                            JSON.stringify(generatedCopy, null, 2)
                          )
                        }
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        {copiedContent ? (
                          <>
                            <Check className="h-4 w-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    {renderGeneratedContent(generatedCopy, "info-card")}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preview Modal */}
          <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Information Card Preview</DialogTitle>
                <DialogDescription>
                  How your information card will look with the current design
                  settings
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex justify-center">
                  <InfoCardPreview content={generatedCopy} />
                </div>

                <div className="flex gap-2 justify-center">
                  <Button onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Card
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsPreviewOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <TabsContent value="flyers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-green-600" />
                  Marketing Flyers
                </CardTitle>
                <CardDescription>
                  Design eye-catching flyers for promoting your experiences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleGenerateAsset("flyer")}
                    disabled={isGenerating}
                    className="flex-1"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Flyer
                      </>
                    )}
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

                {generatedCopy && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Generated Content:</h4>
                      <Button
                        onClick={() =>
                          handleCopyContent(
                            JSON.stringify(generatedCopy, null, 2)
                          )
                        }
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        {copiedContent ? (
                          <>
                            <Check className="h-4 w-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    {renderGeneratedContent(generatedCopy, "flyer")}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social-graphics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  Social Media Graphics
                </CardTitle>
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
                    onClick={() => handleGenerateAsset("social-graphics")}
                    disabled={isGenerating}
                    className="flex-1"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate All Formats
                      </>
                    )}
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

                {generatedCopy && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Generated Content:</h4>
                      <Button
                        onClick={() =>
                          handleCopyContent(
                            JSON.stringify(generatedCopy, null, 2)
                          )
                        }
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        {copiedContent ? (
                          <>
                            <Check className="h-4 w-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    {renderGeneratedContent(generatedCopy, "social-graphics")}
                  </div>
                )}
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

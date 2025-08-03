"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useUserData } from "@/src/contexts/UserDataContext";
import BlockSettingsModal from "./BlockSettingsModal";
import {
  Type,
  Image,
  Grid3X3,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  List,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Trash2,
  Copy,
  Move,
  Settings,
  Eye,
  Download,
  Save,
} from "lucide-react";

// Building block types
export interface BuildingBlock {
  id: string;
  type: string;
  title: string;
  icon: React.ReactNode;
  category: string;
  description: string;
  defaultContent: any;
  settings: BlockSettings;
}

export interface BlockSettings {
  textAlign?: "left" | "center" | "right";
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  border?: string;
  shadow?: string;
  gap?: string;
  fontStyle?: string;
}

export interface PlacedBlock {
  id: string;
  blockType: string;
  content: any;
  settings: BlockSettings;
  position: number;
}

// Available building blocks
const buildingBlocks: BuildingBlock[] = [
  // Layout Blocks
  {
    id: "header",
    type: "header",
    title: "Header",
    icon: <Heading1 className="h-5 w-5" />,
    category: "Layout",
    description: "Website header with navigation",
    defaultContent: {
      logo: "Your Logo",
      navigation: ["Home", "About", "Tours", "Contact"],
      cta: "Book Now",
    },
    settings: {
      backgroundColor: "#ffffff",
      textAlign: "center",
      padding: "1rem",
      border: "1px solid #e5e7eb",
    },
  },
  {
    id: "footer",
    type: "footer",
    title: "Footer",
    icon: <AlignCenter className="h-5 w-5" />,
    category: "Layout",
    description: "Website footer with links",
    defaultContent: {
      companyName: "Your Company",
      links: ["Privacy Policy", "Terms of Service", "Contact"],
      socialMedia: ["Facebook", "Twitter", "Instagram"],
    },
    settings: {
      backgroundColor: "#1f2937",
      color: "#ffffff",
      padding: "2rem",
      textAlign: "center",
    },
  },
  {
    id: "hero",
    type: "hero",
    title: "Hero Section",
    icon: <Heading1 className="h-5 w-5" />,
    category: "Layout",
    description: "Main hero section with call-to-action",
    defaultContent: {
      title: "Discover Amazing Experiences",
      subtitle: "Explore unique cultural tours and adventures",
      ctaText: "Start Exploring",
      backgroundImage: "",
    },
    settings: {
      textAlign: "center",
      padding: "4rem 2rem",
      backgroundColor: "#f8fafc",
      color: "#1f2937",
    },
  },

  // Content Blocks
  {
    id: "text",
    type: "text",
    title: "Text Block",
    icon: <Type className="h-5 w-5" />,
    category: "Content",
    description: "Add text content",
    defaultContent: {
      text: "Enter your text here...",
    },
    settings: {
      fontSize: "16px",
      fontWeight: "400",
      color: "#374151",
      textAlign: "left",
      padding: "1rem",
    },
  },
  {
    id: "heading",
    type: "heading",
    title: "Heading",
    icon: <Heading2 className="h-5 w-5" />,
    category: "Content",
    description: "Add a heading",
    defaultContent: {
      text: "Your Heading",
      level: "h2",
    },
    settings: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#1f2937",
      textAlign: "left",
      padding: "1rem",
    },
  },
  {
    id: "image",
    type: "image",
    title: "Image",
    icon: <Image className="h-5 w-5" />,
    category: "Content",
    description: "Add an image",
    defaultContent: {
      src: "",
      alt: "Image description",
      caption: "",
    },
    settings: {
      width: "100%",
      height: "auto",
      borderRadius: "8px",
      padding: "1rem",
    },
  },
  {
    id: "grid",
    type: "grid",
    title: "Grid Layout",
    icon: <Grid3X3 className="h-5 w-5" />,
    category: "Layout",
    description: "Create a grid layout",
    defaultContent: {
      columns: 3,
      items: [
        { title: "Item 1", content: "Content 1" },
        { title: "Item 2", content: "Content 2" },
        { title: "Item 3", content: "Content 3" },
      ],
    },
    settings: {
      gap: "1rem",
      padding: "1rem",
    },
  },
  {
    id: "quote",
    type: "quote",
    title: "Quote",
    icon: <Quote className="h-5 w-5" />,
    category: "Content",
    description: "Add a testimonial or quote",
    defaultContent: {
      text: "This is an amazing experience!",
      author: "Happy Customer",
      role: "Traveler",
    },
    settings: {
      fontSize: "1.25rem",
      fontStyle: "italic",
      color: "#6b7280",
      textAlign: "center",
      padding: "2rem",
      backgroundColor: "#f9fafb",
      borderRadius: "8px",
    },
  },
  {
    id: "list",
    type: "list",
    title: "List",
    icon: <List className="h-5 w-5" />,
    category: "Content",
    description: "Create a bulleted or numbered list",
    defaultContent: {
      type: "bullet",
      items: ["Item 1", "Item 2", "Item 3"],
    },
    settings: {
      fontSize: "16px",
      color: "#374151",
      padding: "1rem",
    },
  },

  // Interactive Blocks
  {
    id: "contact",
    type: "contact",
    title: "Contact Form",
    icon: <Mail className="h-5 w-5" />,
    category: "Interactive",
    description: "Add a contact form",
    defaultContent: {
      title: "Get in Touch",
      fields: ["Name", "Email", "Message"],
      submitText: "Send Message",
    },
    settings: {
      backgroundColor: "#ffffff",
      padding: "2rem",
      borderRadius: "8px",
      border: "1px solid #e5e7eb",
    },
  },
  {
    id: "booking",
    type: "booking",
    title: "Booking Widget",
    icon: <Calendar className="h-5 w-5" />,
    category: "Interactive",
    description: "Add a booking widget",
    defaultContent: {
      title: "Book Your Experience",
      tours: ["Tour 1", "Tour 2", "Tour 3"],
    },
    settings: {
      backgroundColor: "#ffffff",
      padding: "2rem",
      borderRadius: "8px",
      border: "1px solid #e5e7eb",
    },
  },
  {
    id: "map",
    type: "map",
    title: "Map",
    icon: <MapPin className="h-5 w-5" />,
    category: "Interactive",
    description: "Add a location map",
    defaultContent: {
      location: "Your Location",
      address: "123 Main St, City, Country",
    },
    settings: {
      height: "300px",
      borderRadius: "8px",
      padding: "1rem",
    },
  },
];

// Categories for organization
const categories = ["Layout", "Content", "Interactive"];

export default function DragDropBuilder() {
  const { toast } = useToast();
  const { userData, updateUserData } = useUserData();

  const [placedBlocks, setPlacedBlocks] = useState<PlacedBlock[]>(
    userData?.websiteSettings?.placedBlocks || []
  );
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<PlacedBlock | null>(null);

  // Handle drag start
  const handleDragStart = useCallback(
    (e: React.DragEvent, block: BuildingBlock) => {
      e.dataTransfer.setData("blockType", block.type);
      setIsDragging(true);
    },
    []
  );

  // Handle drag over
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  // Handle drag leave
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  // Handle drop
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      setIsDragging(false);

      const blockType = e.dataTransfer.getData("blockType");
      const block = buildingBlocks.find((b) => b.type === blockType);

      if (block) {
        const newBlock: PlacedBlock = {
          id: `${block.type}-${Date.now()}`,
          blockType: block.type,
          content: { ...block.defaultContent },
          settings: {
            ...block.settings,
            textAlign: block.settings.textAlign as "left" | "center" | "right",
          },
          position: placedBlocks.length,
        };

        const updatedBlocks = [...placedBlocks, newBlock];
        setPlacedBlocks(updatedBlocks);

        // Update user data
        updateUserData({
          ...userData,
          websiteSettings: {
            ...userData?.websiteSettings,
            placedBlocks: updatedBlocks,
          },
        });

        toast({
          title: "Block Added",
          description: `${block.title} has been added to your website.`,
        });
      }
    },
    [placedBlocks, updateUserData, userData, toast]
  );

  // Remove block
  const removeBlock = useCallback(
    (blockId: string) => {
      const updatedBlocks = placedBlocks.filter(
        (block) => block.id !== blockId
      );
      setPlacedBlocks(updatedBlocks);

      updateUserData({
        ...userData,
        websiteSettings: {
          ...userData?.websiteSettings,
          placedBlocks: updatedBlocks,
        },
      });

      toast({
        title: "Block Removed",
        description: "Block has been removed from your website.",
      });
    },
    [placedBlocks, updateUserData, userData, toast]
  );

  // Duplicate block
  const duplicateBlock = useCallback(
    (block: PlacedBlock) => {
      const newBlock: PlacedBlock = {
        ...block,
        id: `${block.blockType}-${Date.now()}`,
        position: placedBlocks.length,
      };

      const updatedBlocks = [...placedBlocks, newBlock];
      setPlacedBlocks(updatedBlocks);

      updateUserData({
        ...userData,
        websiteSettings: {
          ...userData.websiteSettings,
          placedBlocks: updatedBlocks,
        },
      });

      toast({
        title: "Block Duplicated",
        description: "Block has been duplicated.",
      });
    },
    [placedBlocks, updateUserData, userData, toast]
  );

  // Open settings modal
  const openSettingsModal = useCallback((block: PlacedBlock) => {
    setEditingBlock(block);
    setSettingsModalOpen(true);
  }, []);

  // Save block settings
  const saveBlockSettings = useCallback(
    (updatedBlock: PlacedBlock) => {
      const updatedBlocks = placedBlocks.map((block) =>
        block.id === updatedBlock.id ? updatedBlock : block
      );
      setPlacedBlocks(updatedBlocks);

      updateUserData({
        ...userData,
        websiteSettings: {
          ...userData.websiteSettings,
          placedBlocks: updatedBlocks,
        },
      });
    },
    [placedBlocks, updateUserData, userData]
  );

  // Render block content
  const renderBlockContent = (block: PlacedBlock) => {
    const blockConfig = buildingBlocks.find((b) => b.type === block.blockType);
    if (!blockConfig) return null;

    const style = {
      textAlign: block.settings.textAlign,
      fontSize: block.settings.fontSize,
      fontWeight: block.settings.fontWeight,
      color: block.settings.color,
      backgroundColor: block.settings.backgroundColor,
      padding: block.settings.padding,
      margin: block.settings.margin,
      width: block.settings.width,
      height: block.settings.height,
      borderRadius: block.settings.borderRadius,
      border: block.settings.border,
      boxShadow: block.settings.shadow,
    };

    switch (block.blockType) {
      case "header":
        return (
          <header style={style} className="flex justify-between items-center">
            <div className="font-bold text-xl">{block.content.logo}</div>
            <nav className="flex gap-4">
              {block.content.navigation.map((item: string, index: number) => (
                <a key={index} href="#" className="hover:text-blue-600">
                  {item}
                </a>
              ))}
            </nav>
            <Button size="sm">{block.content.cta}</Button>
          </header>
        );

      case "footer":
        return (
          <footer style={style} className="flex flex-col gap-4">
            <div className="font-bold">{block.content.companyName}</div>
            <div className="flex gap-4">
              {block.content.links.map((link: string, index: number) => (
                <a key={index} href="#" className="hover:underline">
                  {link}
                </a>
              ))}
            </div>
            <div className="flex gap-2">
              {block.content.socialMedia.map(
                (social: string, index: number) => (
                  <a key={index} href="#" className="hover:opacity-80">
                    {social}
                  </a>
                )
              )}
            </div>
          </footer>
        );

      case "hero":
        return (
          <section
            style={style}
            className="flex flex-col items-center justify-center min-h-[400px]"
          >
            <h1 className="text-4xl font-bold mb-4">{block.content.title}</h1>
            <p className="text-xl mb-6">{block.content.subtitle}</p>
            <Button size="lg">{block.content.ctaText}</Button>
          </section>
        );

      case "text":
        return (
          <div style={style}>
            <p>{block.content.text}</p>
          </div>
        );

      case "heading":
        return (
          <div style={style}>
            {block.content.level === "h1" && <h1>{block.content.text}</h1>}
            {block.content.level === "h2" && <h2>{block.content.text}</h2>}
            {block.content.level === "h3" && <h3>{block.content.text}</h3>}
          </div>
        );

      case "image":
        return (
          <div style={style}>
            <img
              src={
                block.content.src ||
                "https://via.placeholder.com/400x300?text=Add+Image"
              }
              alt={block.content.alt}
              className="w-full h-auto"
            />
            {block.content.caption && (
              <p className="text-sm text-gray-600 mt-2">
                {block.content.caption}
              </p>
            )}
          </div>
        );

      case "grid":
        return (
          <div
            style={style}
            className={`grid grid-cols-${block.content.columns} gap-4`}
          >
            {block.content.items.map((item: any, index: number) => (
              <div key={index} className="p-4 border rounded">
                <h3 className="font-bold">{item.title}</h3>
                <p>{item.content}</p>
              </div>
            ))}
          </div>
        );

      case "quote":
        return (
          <blockquote style={style} className="text-center">
            <p className="mb-4">"{block.content.text}"</p>
            <footer>
              <cite className="font-bold">{block.content.author}</cite>
              {block.content.role && (
                <span className="text-gray-600">, {block.content.role}</span>
              )}
            </footer>
          </blockquote>
        );

      case "list":
        return (
          <div style={style}>
            {block.content.type === "bullet" ? (
              <ul className="list-disc list-inside">
                {block.content.items.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <ol className="list-decimal list-inside">
                {block.content.items.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            )}
          </div>
        );

      case "contact":
        return (
          <div style={style} className="max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4">{block.content.title}</h3>
            <form className="space-y-4">
              {block.content.fields.map((field: string, index: number) => (
                <div key={index}>
                  <label className="block text-sm font-medium mb-1">
                    {field}
                  </label>
                  {field === "Message" ? (
                    <textarea className="w-full p-2 border rounded" rows={4} />
                  ) : (
                    <input type="text" className="w-full p-2 border rounded" />
                  )}
                </div>
              ))}
              <Button type="submit" className="w-full">
                {block.content.submitText}
              </Button>
            </form>
          </div>
        );

      case "booking":
        return (
          <div style={style} className="max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4">{block.content.title}</h3>
            <div className="space-y-4">
              <select className="w-full p-2 border rounded">
                <option>Select a tour</option>
                {block.content.tours.map((tour: string, index: number) => (
                  <option key={index}>{tour}</option>
                ))}
              </select>
              <Button className="w-full">Book Now</Button>
            </div>
          </div>
        );

      case "map":
        return (
          <div
            style={style}
            className="bg-gray-200 flex items-center justify-center"
          >
            <div className="text-center">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-600" />
              <p className="font-bold">{block.content.location}</p>
              <p className="text-sm text-gray-600">{block.content.address}</p>
            </div>
          </div>
        );

      default:
        return <div>Unknown block type</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Building Blocks Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Building Blocks</h2>
          <p className="text-sm text-gray-600">
            Drag blocks to build your website
          </p>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="font-medium text-gray-900 mb-3">{category}</h3>
                <div className="space-y-2">
                  {buildingBlocks
                    .filter((block) => block.category === category)
                    .map((block) => (
                      <Card
                        key={block.id}
                        className="cursor-move hover:shadow-md transition-shadow"
                        draggable
                        onDragStart={(e) => handleDragStart(e, block)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="text-gray-600">{block.icon}</div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">
                                {block.title}
                              </h4>
                              <p className="text-xs text-gray-500">
                                {block.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">Website Builder</h1>
              <Badge variant="secondary">{placedBlocks.length} blocks</Badge>
            </div>
          </div>
        </div>

        {/* Drop Zone */}
        <div
          className={`flex-1 p-6 overflow-auto ${
            dragOver ? "bg-blue-50 border-2 border-blue-300 border-dashed" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {placedBlocks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-xl font-medium mb-2">
                Start Building Your Website
              </h3>
              <p className="text-center max-w-md">
                Drag building blocks from the sidebar to create your website
                layout. You can add headers, content sections, forms, and more.
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-w-4xl mx-auto">
              {placedBlocks.map((block, index) => (
                <div
                  key={block.id}
                  className={`relative group ${
                    selectedBlock === block.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedBlock(block.id)}
                >
                  {/* Block Controls */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <div className="flex gap-1 bg-white rounded-lg shadow-lg border p-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateBlock(block);
                        }}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          openSettingsModal(block);
                        }}
                      >
                        <Settings className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeBlock(block.id);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Block Content */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    {renderBlockContent(block)}
                  </div>

                  {/* Block Label */}
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Badge variant="secondary" className="text-xs">
                      {
                        buildingBlocks.find((b) => b.type === block.blockType)
                          ?.title
                      }
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Block Settings Modal */}
      <BlockSettingsModal
        block={editingBlock}
        isOpen={settingsModalOpen}
        onClose={() => {
          setSettingsModalOpen(false);
          setEditingBlock(null);
        }}
        onSave={saveBlockSettings}
      />
    </div>
  );
}

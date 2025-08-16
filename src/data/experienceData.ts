
// Sample experience data for the Experience Builder
export const sampleItineraries = [
  { 
    id: "1",
    title: "Sacred Japan Journey", 
    days: 7,
    lastUpdated: "3 days ago",
    status: "published" as const,
    image: "/lovable-uploads/31055680-5e98-433a-a30a-747997259663.png",
    themeType: "spiritual",
    description: "A spiritual journey through Japan's sacred sites and temples.",
    regions: ["Kyoto", "Tokyo", "Mount Fuji"]
  },
  { 
    id: "2",
    title: "Morocco Culinary Expedition", 
    days: 10,
    lastUpdated: "1 week ago",
    status: "draft" as const,
    image: "/lovable-uploads/8ee97e98-fd03-4f2b-8d3e-dcb87af6a6ba.png",
    themeType: "culinary",
    description: "Explore Morocco's rich food traditions and cooking techniques.",
    regions: ["Marrakech", "Fez", "Casablanca"]
  },
  { 
    id: "3",
    title: "Oaxacan Art & Soul", 
    days: 6,
    lastUpdated: "2 weeks ago",
    status: "published" as const,
    image: "/lovable-uploads/38b3d0e5-8ce3-41eb-bc8f-7dd21ee77dc2.png",
    themeType: "arts",
    description: "Immerse in the vibrant arts and crafts traditions of Oaxaca.",
    regions: ["Oaxaca City", "Puerto Escondido"]
  }
];

// Sample template data
export const sampleTemplates = [
  {
    id: "t1",
    title: "Diaspora Heritage Journey",
    description: "For reconnection trips to ancestral homelands",
    theme: "Heritage",
    image: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png"
  },
  {
    id: "t2",
    title: "Wellness Retreat",
    description: "For spiritual and health-focused experiences",
    theme: "Wellness",
    image: "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png"
  },
  {
    id: "t3",
    title: "Culinary Discovery",
    description: "For food-centered cultural immersions",
    theme: "Food",
    image: "/lovable-uploads/8ee97e98-fd03-4f2b-8d3e-dcb87af6a6ba.png"
  }
];

// Sample resources data
export const resourcesData = [
  {
    id: "r1",
    title: "AI Content Assistant",
    description: "Generate culturally rich descriptions for your activities",
    icon: "FileText",
    actionUrl: "#ai-assistant"
  },
  {
    id: "r2",
    title: "Interactive Maps",
    description: "Visualize your experience with custom route mapping",
    icon: "Map",
    actionUrl: "#maps"
  },
  {
    id: "r3",
    title: "Media Library",
    description: "Access free high-quality images for your destinations",
    icon: "ImageIcon",
    actionUrl: "#media"
  }
];

// Type definitions
export interface ExperienceType {
  id: string;
  title: string;
  description: string;
  days: number;
  lastUpdated: string;
  status: 'draft' | 'published' | 'archived';
  image: string;
  themeType: string;
  regions: string[];
}

export type TemplateType = {
  id: string;
  title: string;
  description: string;
  theme: string;
  image: string;
};

export type ResourceType = {
  id: string;
  title: string;
  description: string;
  icon: string;
  actionUrl: string;
};

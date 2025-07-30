// Sample itinerary data for the Itinerary Builder
export const sampleItineraries = [
  {
    id: "1",
    title: "Sacred Japan Journey",
    days: 7,
    lastUpdated: "3 days ago",
    status: "published" as const,
    image: "/lovable-uploads/31055680-5e98-433a-a30a-747997259663.png",
    themeType: "spiritual",
    description:
      "A spiritual journey through Japan's sacred sites and temples.",
    regions: ["Kyoto", "Tokyo", "Mount Fuji"],
    price: 2850,
    currency: "USD",
    groupSize: { min: 4, max: 12 },
    difficulty: "moderate" as const,
    tags: ["temples", "meditation", "cultural immersion", "traditional crafts"],
    modules: [
      {
        id: "mod1",
        day: 1,
        type: "Accommodation",
        title: "Traditional Ryokan Stay",
        description:
          "Experience authentic Japanese hospitality in a historic ryokan",
        time: "15:00",
        duration: 120,
        location: "Gion District, Kyoto",
        price: 180,
        notes: "Includes traditional kaiseki dinner",
        images: ["/lovable-uploads/31055680-5e98-433a-a30a-747997259663.png"],
      },
    ],
  },
  {
    id: "2",
    title: "Morocco Culinary Expedition",
    days: 10,
    lastUpdated: "1 week ago",
    status: "draft" as const,
    image: "/lovable-uploads/8ee97e98-fd03-4f2b-8d3e-dcb87af6a6ba.png",
    themeType: "culinary",
    description:
      "Explore Morocco's rich food traditions and cooking techniques.",
    regions: ["Marrakech", "Fez", "Casablanca"],
    price: 1950,
    currency: "USD",
    groupSize: { min: 6, max: 16 },
    difficulty: "easy" as const,
    tags: ["cooking", "markets", "spices", "traditional recipes"],
    modules: [],
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
    regions: ["Oaxaca City", "Puerto Escondido"],
    price: 1650,
    currency: "USD",
    groupSize: { min: 4, max: 10 },
    difficulty: "easy" as const,
    tags: ["pottery", "textiles", "local artists", "markets"],
    modules: [],
  },
];

// Sample template data
export const sampleTemplates = [
  {
    id: "t1",
    title: "Diaspora Heritage Journey",
    description: "For reconnection trips to ancestral homelands",
    theme: "Heritage",
    image: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png",
    defaultDays: 7,
    modules: [
      {
        id: "heritage1",
        type: "Location",
        title: "Ancestral Village Visit",
        description: "Connect with your family's historical roots",
      },
      {
        id: "heritage2",
        type: "Experience",
        title: "Traditional Ceremony Participation",
        description: "Join in authentic cultural practices",
      },
    ],
  },
  {
    id: "t2",
    title: "Wellness Retreat",
    description: "For spiritual and health-focused experiences",
    theme: "Wellness",
    image: "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png",
    defaultDays: 5,
    modules: [
      {
        id: "wellness1",
        type: "Activity",
        title: "Morning Meditation",
        description: "Start each day with mindful practice",
      },
      {
        id: "wellness2",
        type: "Experience",
        title: "Traditional Healing Session",
        description: "Learn ancient wellness techniques",
      },
    ],
  },
  {
    id: "t3",
    title: "Culinary Discovery",
    description: "For food-centered cultural immersions",
    theme: "Food",
    image: "/lovable-uploads/8ee97e98-fd03-4f2b-8d3e-dcb87af6a6ba.png",
    defaultDays: 8,
    modules: [
      {
        id: "culinary1",
        type: "Activity",
        title: "Cooking Class",
        description: "Learn traditional recipes from local chefs",
      },
      {
        id: "culinary2",
        type: "Location",
        title: "Local Market Tour",
        description: "Discover authentic ingredients and spices",
      },
    ],
  },
];

// Sample resources data
export const resourcesData = [
  {
    id: "r1",
    title: "AI Content Assistant",
    description: "Generate culturally rich descriptions for your activities",
    icon: "FileText",
    actionUrl: "#ai-assistant",
  },
  {
    id: "r2",
    title: "Interactive Maps",
    description: "Visualize your itinerary with custom route mapping",
    icon: "Map",
    actionUrl: "#maps",
  },
  {
    id: "r3",
    title: "Media Library",
    description: "Access free high-quality images for your destinations",
    icon: "ImageIcon",
    actionUrl: "#media",
  },
  {
    id: "r4",
    title: "Pricing Calculator",
    description: "Calculate costs and set pricing for your experiences",
    icon: "Calculator",
    actionUrl: "#pricing",
  },
  {
    id: "r5",
    title: "Weather Integration",
    description: "Get real-time weather data for better planning",
    icon: "Cloud",
    actionUrl: "#weather",
  },
  {
    id: "r6",
    title: "Translation Tools",
    description: "Multi-language support for international travelers",
    icon: "Languages",
    actionUrl: "#translation",
  },
];

// Enhanced module types
export const moduleTypes = [
  { id: "accommodation", name: "Accommodation", icon: "Bed", color: "blue" },
  { id: "meal", name: "Meal", icon: "UtensilsCrossed", color: "orange" },
  { id: "photo", name: "Photo Opportunity", icon: "Camera", color: "pink" },
  { id: "attraction", name: "Attraction", icon: "Landmark", color: "purple" },
  { id: "location", name: "Location", icon: "MapPin", color: "red" },
  { id: "transport", name: "Transportation", icon: "Bus", color: "green" },
  { id: "activity", name: "Activity", icon: "Navigation", color: "cyan" },
  { id: "morning", name: "Morning Section", icon: "Sun", color: "yellow" },
  { id: "evening", name: "Evening Section", icon: "Moon", color: "indigo" },
  { id: "break", name: "Break", icon: "Coffee", color: "brown" },
  { id: "narrative", name: "Narrative Segment", icon: "Music", color: "teal" },
  {
    id: "experience",
    name: "Interactive Experience",
    icon: "Ticket",
    color: "amber",
  },
  { id: "journey", name: "Journey Segment", icon: "Bot", color: "blue" },
];

// Type definitions
export type ItineraryModule = {
  id: string;
  day: number;
  type: string;
  title: string;
  description?: string;
  time?: string;
  duration?: number; // in minutes
  location?: string;
  price?: number;
  notes?: string;
  images?: string[];
  position?: number;
  properties?: Record<string, any>;
  coordinates?: {
    lat: number;
    lng: number;
  };
};

export interface ItineraryType {
  id: string;
  title: string;
  description: string;
  days: number;
  lastUpdated: string;
  status: 'draft' | 'published' | 'archived';
  image: string;
  themeType: string;
  regions: string[];
  price?: number;
  currency?: string;
  groupSize?: { min: number; max: number };
  difficulty?: 'easy' | 'moderate' | 'hard';
  tags?: string[];
  modules?: ItineraryModule[];
}

export type TemplateType = {
  id: string;
  title: string;
  description: string;
  theme: string;
  image: string;
  defaultDays?: number;
  modules?: Partial<ItineraryModule>[];
};

export type ResourceType = {
  id: string;
  title: string;
  description: string;
  icon: string;
  actionUrl: string;
};

export type ModuleType = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

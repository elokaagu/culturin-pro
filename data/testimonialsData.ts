export interface Testimonial {
  id: string;
  name: string;
  company?: string;
  role?: string;
  location?: string;
  quote: string;
  image: string;
  category: string;
  featured: boolean;
  rating?: number;
  dateAdded: string;
  status: "active" | "inactive" | "pending";
  type: "customer" | "operator" | "partner" | "general";
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Maria Sanchez",
    company: "Barcelona Tapas Tours",
    role: "Tour Guide",
    location: "Barcelona, Spain",
    quote:
      "Since using Culturin, our bookings have increased by 65% and the experience builder saved me countless hours of work.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
    category: "Food Tours",
    featured: true,
    rating: 5,
    dateAdded: "2024-01-15",
    status: "active",
    type: "operator",
  },
  {
    id: "2",
    name: "Kenji Yamamoto",
    company: "Tokyo Cultural Walks",
    role: "Cultural Guide",
    location: "Tokyo, Japan",
    quote:
      "The analytics dashboard helped us identify our most profitable experiences and optimize our pricing strategy.",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop",
    category: "Cultural Walks",
    featured: true,
    rating: 5,
    dateAdded: "2024-01-20",
    status: "active",
    type: "operator",
  },
  {
    id: "3",
    name: "Aisha Okafor",
    company: "Lagos Food Journeys",
    role: "Experience Creator",
    location: "Lagos, Nigeria",
    quote:
      "The storytelling tools helped us communicate our cultural heritage in ways that truly resonated with travelers.",
    image:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1000&auto=format&fit=crop",
    category: "Food Experiences",
    featured: true,
    rating: 5,
    dateAdded: "2024-02-01",
    status: "active",
    type: "operator",
  },
  {
    id: "4",
    name: "Alejandro Fuentes",
    company: "Lima Heritage Tours",
    role: "Heritage Guide",
    location: "Lima, Peru",
    quote:
      "Customer retention improved by 40% after implementing the automated follow-up emails and personalized recommendations.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    category: "Heritage Tours",
    featured: false,
    rating: 5,
    dateAdded: "2024-02-10",
    status: "active",
    type: "operator",
  },
  {
    id: "5",
    name: "Sophie Laurent",
    company: "Paris Art Walks",
    role: "Art Guide",
    location: "Paris, France",
    quote:
      "The mobile app has transformed how our guests interact with our tours. Engagement is up by 78% since launch.",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000&auto=format&fit=crop",
    category: "Art Experiences",
    featured: false,
    rating: 4,
    dateAdded: "2024-02-15",
    status: "active",
    type: "operator",
  },
  {
    id: "6",
    name: "Maria L.",
    company: "Culturin Pro Member",
    role: "Cooking Class Host",
    location: "Barcelona, Spain",
    quote:
      "Culturin Pro transformed how I run my cooking classes. The booking system alone saved me hours each week.",
    image: "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png",
    category: "Pro Member",
    featured: true,
    rating: 5,
    dateAdded: "2024-03-01",
    status: "active",
    type: "customer",
  },
  {
    id: "7",
    name: "Ahmed K.",
    company: "Cultural Tours Team",
    role: "Team Lead",
    location: "Marrakech, Morocco",
    quote:
      "As a small team running cultural tours, the analytics tools helped us understand exactly where to focus our efforts.",
    image: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png",
    category: "Pro Member",
    featured: true,
    rating: 5,
    dateAdded: "2024-03-05",
    status: "active",
    type: "customer",
  },
  {
    id: "8",
    name: "Priya S.",
    company: "Cultural Experiences",
    role: "Experience Host",
    location: "Jaipur, India",
    quote:
      "The website builder made it easy to create a professional online presence that truly represents our cultural experiences.",
    image: "/lovable-uploads/31055680-5e98-433a-a30a-747997259663.png",
    category: "Pro Member",
    featured: false,
    rating: 4,
    dateAdded: "2024-03-10",
    status: "active",
    type: "customer",
  },
  {
    id: "9",
    name: "Sofia",
    role: "Solo Traveler",
    location: "Barcelona, Spain",
    quote:
      "Culturin isn't just about travel — it's about meaning. I've never felt this seen on a trip before.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256",
    category: "Traveler",
    featured: true,
    rating: 5,
    dateAdded: "2024-03-15",
    status: "active",
    type: "customer",
  },
  {
    id: "10",
    name: "Maria Gonzalez",
    role: "Culinary Tour Guide",
    location: "Mexico City, Mexico",
    quote:
      "The booking management system has transformed how I run my cultural tours. I've reduced admin time by 70% and can focus on creating memorable experiences.",
    image: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png",
    category: "Booking Management",
    featured: false,
    rating: 5,
    dateAdded: "2024-03-20",
    status: "active",
    type: "operator",
  },
  {
    id: "11",
    name: "Ahmed Hassan",
    role: "Heritage Tour Operator",
    location: "Marrakech, Morocco",
    quote:
      "I can't imagine running my business without this platform. The calendar integration and automated reminders have virtually eliminated no-shows.",
    image: "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png",
    category: "Booking Management",
    featured: false,
    rating: 5,
    dateAdded: "2024-03-25",
    status: "active",
    type: "operator",
  },
];

export const testimonialCategories = [
  "Food Tours",
  "Cultural Walks",
  "Food Experiences",
  "Heritage Tours",
  "Art Experiences",
  "Pro Member",
  "Traveler",
  "Booking Management",
  "Analytics",
  "Website Builder",
  "CRM",
  "Marketing",
];

export const testimonialTypes = [
  { value: "customer", label: "Customer" },
  { value: "operator", label: "Operator" },
  { value: "partner", label: "Partner" },
  { value: "general", label: "General" },
];

// Helper functions
export const getFeaturedTestimonials = () =>
  testimonials.filter((t) => t.featured && t.status === "active");
export const getTestimonialsByType = (type: string) =>
  testimonials.filter((t) => t.type === type && t.status === "active");
export const getTestimonialsByCategory = (category: string) =>
  testimonials.filter((t) => t.category === category && t.status === "active");
export const getActiveTestimonials = () =>
  testimonials.filter((t) => t.status === "active");

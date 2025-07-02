export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface HelpCenterContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  supportOptions: {
    title: string;
    description: string;
    contactInfo: string;
    icon: string;
  }[];
}

export const faqCategories = [
  { id: "getting-started", name: "Getting Started" },
  { id: "account", name: "Account & Billing" },
  { id: "features", name: "Features & Tools" },
  { id: "troubleshooting", name: "Troubleshooting" },
];

export const helpCenterContent: HelpCenterContent = {
  heroTitle: "Help Center",
  heroSubtitle: "Find answers to your questions and get the support you need",
  heroImage:
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
  supportOptions: [
    {
      title: "Live Chat Support",
      description:
        "Get instant help from our support team during business hours",
      contactInfo: "Available Mon-Fri, 9AM-6PM EST",
      icon: "MessageCircle",
    },
    {
      title: "Email Support",
      description:
        "Send us a detailed message and we'll get back to you within 24 hours",
      contactInfo: "support@culturin.com",
      icon: "Mail",
    },
    {
      title: "Phone Support",
      description: "Speak directly with our team for urgent issues",
      contactInfo: "+1 (555) 123-4567",
      icon: "Phone",
    },
    {
      title: "Resource Library",
      description: "Browse our comprehensive guides and tutorials",
      contactInfo: "View all resources",
      icon: "BookOpen",
    },
  ],
};

export const faqItems: FAQ[] = [
  {
    id: "faq-1",
    category: "getting-started",
    question: "How do I create a Culturin account?",
    answer:
      'To create a Culturin account, click "Sign Up" on the top right of our homepage. Fill in your details, verify your email address, and follow our guided setup process to get started.',
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    isActive: true,
  },
  {
    id: "faq-2",
    category: "getting-started",
    question: "What type of experiences can I list on Culturin?",
    answer:
      "Culturin accepts authentic cultural experiences like food tours, cooking classes, artisan workshops, cultural performances, historical walks, and traditional craft demonstrations that showcase local heritage.",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    isActive: true,
  },
  {
    id: "faq-3",
    category: "account",
    question: "How do I change my account details?",
    answer:
      'Log in to your Culturin account, navigate to "Settings" from the dashboard, and select "Account Information". Here you can update your profile information, change your password, and manage notification preferences.',
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    isActive: true,
  },
  {
    id: "faq-4",
    category: "account",
    question: "How does Culturin pricing work?",
    answer:
      "Culturin offers tiered pricing plans designed for different business needs. We offer a free plan for beginners, and premium plans with additional features for growing businesses. Visit our Pricing page for detailed information.",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    isActive: true,
  },
  {
    id: "faq-5",
    category: "features",
    question: "How do I use the itinerary builder?",
    answer:
      'Access the itinerary builder from your dashboard by clicking "Create New Experience". You can add locations, activities, timing, and custom details. Drag and drop elements to reorder, and use our templates for quick setup.',
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    isActive: true,
  },
  {
    id: "faq-6",
    category: "features",
    question: "Can I integrate Culturin with my existing website?",
    answer:
      "Yes, Culturin offers website integration options. Use our API or embedded booking widgets to integrate your Culturin experiences directly on your website while maintaining your brand identity.",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    isActive: true,
  },
  {
    id: "faq-7",
    category: "troubleshooting",
    question: "Why is my calendar not syncing properly?",
    answer:
      "Calendar syncing issues may occur due to connection problems or incorrect settings. Try refreshing your connection in Settings > Integrations, ensure your external calendar permissions are correctly set, or contact our support team for assistance.",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    isActive: true,
  },
  {
    id: "faq-8",
    category: "troubleshooting",
    question: "How do I resolve payment processing issues?",
    answer:
      "For payment processing issues, first check that your payment method information is current. Verify your bank hasn't blocked the transaction, clear your browser cache, or try a different payment method. For persistent issues, contact our support team.",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    isActive: true,
  },
];

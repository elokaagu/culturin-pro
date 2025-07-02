export interface CaseStudy {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  tags: string[];
  excerpt: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial: {
    quote: string;
    author: string;
    position: string;
  };
  image: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  featured: boolean;
}

export interface CaseStudiesContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
}

export const caseStudiesCategories = [
  { id: "all", name: "All Categories" },
  { id: "food-tours", name: "Food Tours" },
  { id: "walking-tours", name: "Walking Tours" },
  { id: "culinary-experiences", name: "Culinary Experiences" },
  { id: "cultural-workshops", name: "Cultural Workshops" },
  { id: "historical-tours", name: "Historical Tours" },
];

export const caseStudiesContent: CaseStudiesContent = {
  heroTitle: "Case Studies",
  heroSubtitle:
    "Discover how tour operators and cultural experience hosts around the world are growing their businesses with Culturin.",
  heroImage:
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
};

export const caseStudies: CaseStudy[] = [
  {
    id: "barcelona-tapas-tours",
    title: "Doubling Bookings for Barcelona Tapas Tours",
    company: "Barcelona Tapas Tours",
    location: "Barcelona, Spain",
    category: "food-tours",
    tags: ["Food Tours", "Booking System", "Marketing"],
    excerpt:
      "How a small food tour business increased direct bookings by 100% and saved 15 hours per week on administrative tasks.",
    challenge:
      "Barcelona Tapas Tours was struggling with manual booking processes, limited visibility online, and difficulty showcasing the authentic cultural value of their experiences. They were spending too much time on administration and not enough on delivering amazing experiences.",
    solution:
      "Implementing Culturin's booking platform with integrated payment processing, multilingual support, and mobile-optimized booking flow. They also leveraged our storytelling tools to create compelling cultural narratives around each tour stop.",
    results: [
      "Increased direct bookings by 100% in the first six months",
      "Reduced administrative work by 15 hours per week",
      "Improved customer satisfaction ratings from 4.3 to 4.9 stars",
      "Expanded their tour offerings from 3 to 8 different experiences",
    ],
    testimonial: {
      quote:
        "Since using Culturin, our bookings have increased by 65% and the itinerary builder saved me countless hours of work.",
      author: "Maria Sanchez",
      position: "Owner, Barcelona Tapas Tours",
    },
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
    isActive: true,
    featured: true,
  },
  {
    id: "tokyo-cultural-walks",
    title: "Optimizing Pricing Strategy for Tokyo Cultural Walks",
    company: "Tokyo Cultural Walks",
    location: "Tokyo, Japan",
    category: "walking-tours",
    tags: ["Walking Tours", "Data Analytics", "Pricing Strategy"],
    excerpt:
      "How data-driven insights helped this walking tour company optimize their pricing and increase annual revenue by 40%.",
    challenge:
      "Tokyo Cultural Walks was unsure how to price their specialized cultural experiences. Their pricing was inconsistent, leaving money on the table for premium experiences while overpricing others, resulting in lower booking rates.",
    solution:
      "Culturin's analytics dashboard helped them analyze market rates, booking patterns, and customer demographics. With our A/B testing tools for pricing, they found the optimal price points for different tour types and seasons.",
    results: [
      "Increased average booking value by 35%",
      "Boosted overall booking conversion rate by 28%",
      "Identified optimal seasonal pricing strategy",
      "Introduced premium tour offerings with 60% higher margins",
    ],
    testimonial: {
      quote:
        "The analytics dashboard helped us identify our most profitable experiences and optimize our pricing strategy.",
      author: "Kenji Yamamoto",
      position: "Founder, Tokyo Cultural Walks",
    },
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop",
    createdAt: "2024-01-12T10:00:00Z",
    updatedAt: "2024-01-12T10:00:00Z",
    isActive: true,
    featured: true,
  },
  {
    id: "lagos-food-journeys",
    title: "Authentic Storytelling for Lagos Food Journeys",
    company: "Lagos Food Journeys",
    location: "Lagos, Nigeria",
    category: "culinary-experiences",
    tags: ["Food Experiences", "Storytelling", "Cultural Heritage"],
    excerpt:
      "How an emerging culinary tour company used storytelling tools to create immersive experiences that resonated with international travelers.",
    challenge:
      "Lagos Food Journeys offered amazing authentic cuisine experiences but struggled to communicate the rich cultural context behind their food tours. Their website and listings failed to capture the essence of Nigerian culinary traditions.",
    solution:
      "Using Culturin's storytelling tools, they created rich multimedia presentations for each food stop, complete with historical context, cultural significance, and personal stories from local chefs and food producers.",
    results: [
      "Increased international bookings by 120%",
      "Grew social media following by 300% in one year",
      "Featured in three international travel publications",
      'Successfully launched a premium "Chef\'s Table" experience at 3x their standard tour price',
    ],
    testimonial: {
      quote:
        "The storytelling tools helped us communicate our cultural heritage in ways that truly resonated with travelers.",
      author: "Aisha Okafor",
      position: "Founder, Lagos Food Journeys",
    },
    image:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1000&auto=format&fit=crop",
    createdAt: "2024-01-08T10:00:00Z",
    updatedAt: "2024-01-08T10:00:00Z",
    isActive: true,
    featured: false,
  },
  {
    id: "rome-historical-walks",
    title: "Scaling Rome Historical Walks with Culturin",
    company: "Rome Historical Walks",
    location: "Rome, Italy",
    category: "historical-tours",
    tags: ["Historical Tours", "Team Management", "Scaling"],
    excerpt:
      "How a family-run historical tour business scaled from 2 to 15 guides while maintaining quality and authenticity.",
    challenge:
      "Rome Historical Walks was a successful family business but struggled to scale operations. Managing multiple guides, ensuring consistent quality, and coordinating bookings across different tour types was becoming overwhelming.",
    solution:
      "Culturin's team management tools allowed them to onboard new guides with standardized training materials, coordinate schedules efficiently, and maintain quality control through customer feedback systems and guide performance tracking.",
    results: [
      "Scaled from 2 to 15 professional guides in 18 months",
      "Increased monthly tour capacity by 600%",
      "Maintained 4.8+ star rating across all tours",
      "Reduced booking conflicts by 95% with automated scheduling",
    ],
    testimonial: {
      quote:
        "Culturin's team management features allowed us to scale our business while keeping the personal touch that makes our tours special.",
      author: "Giuseppe Romano",
      position: "Owner, Rome Historical Walks",
    },
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1000&auto=format&fit=crop",
    createdAt: "2024-01-05T10:00:00Z",
    updatedAt: "2024-01-05T10:00:00Z",
    isActive: true,
    featured: false,
  },
];

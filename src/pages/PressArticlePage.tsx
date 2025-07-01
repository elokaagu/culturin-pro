'use client'

import { useState, useEffect } from "react";
import { useParams, Link } from "../../lib/navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar } from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";
import Image from "@/components/ui/image";

// This would normally come from an API or CMS
const pressArticles = [
  {
    id: "culturin-series-a",
    title: "Culturin Raises $15M Series A to Transform Cultural Tourism",
    date: "May 10, 2025",
    content: [
      "Culturin, the innovative platform connecting travelers with authentic cultural experiences, today announced it has raised $15 million in Series A funding. The round was led by Horizon Ventures, with participation from existing investors First Round Capital and several strategic angel investors from the tourism and technology sectors.",
      "The investment will primarily accelerate Culturin's product development, with a focus on expanding its suite of tools for cultural experience creators and tour operators. Additionally, the company plans to accelerate its international expansion, bringing its platform to new markets across Europe, Asia, and Latin America.",
      "\"Cultural tourism represents a massive market opportunity that has been underserved by technology,\" said Maya Chen, Culturin's CEO and co-founder. \"With this funding, we're positioned to build the definitive platform that helps creators of cultural experiences reach travelers, while giving travelers access to authentic local experiences they won't find in guidebooks.\"",
      "Since launching in 2023, Culturin has seen impressive growth, with the platform now featuring over 5,000 experiences across 25 countries. The company's focus on authentic cultural tourism has resonated with both travelers and experience providers, who praise the platform's commitment to supporting local communities and preserving cultural heritage.",
      "\"What sets Culturin apart is their deep understanding of both sides of the market—they've built tools that genuinely help tour operators grow their businesses while creating a discovery platform that helps travelers find exactly the kind of authentic experiences they're looking for,\" said Sarah Wu, Partner at Horizon Ventures, who will join Culturin's board as part of the investment.",
      "Culturin will use the funding to grow its team from 35 to approximately 70 employees over the next year, with a particular focus on engineering, product, and international growth roles."
    ],
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "culturin-pro-launch",
    title: "Culturin Launches Pro Platform for Tour Operators",
    date: "January 15, 2025",
    content: [
      "Culturin today announced the launch of Culturin Pro, a comprehensive suite of tools designed specifically for cultural tour operators and experience creators. The new platform offers commission-free bookings, advanced analytics, marketing tools, and business management features to help operators grow and scale their businesses.",
      "\"Cultural tour operators face unique challenges that generic booking platforms don't address,\" explained Raj Patel, Culturin's Chief Product Officer. \"Culturin Pro was built from the ground up to meet these specific needs, with features that support the creation and delivery of meaningful cultural experiences.\"",
      "Key features of Culturin Pro include a customizable booking widget that operators can embed on their own websites, detailed analytics dashboards for understanding guest demographics and booking patterns, marketing tools tailored for cultural tourism, and customer relationship management features designed to facilitate repeat bookings.",
      "The platform also introduces a commission-free booking model, setting it apart from traditional online travel agencies that typically charge 15-30% per booking. Instead, Culturin Pro uses a straightforward subscription model, allowing operators to predict costs and maximize their margins.",
      "\"We've been using Culturin Pro in beta for the past three months, and it's already transformed how we run our food tour business,\" said Maria Gonzalez of Barcelona Taste Trails. \"The analytics alone have helped us optimize our tour times and pricing, resulting in a 20% increase in bookings.\"",
      "Culturin Pro is available immediately for cultural tour operators worldwide, with tiered pricing options based on business size and feature requirements. The company is also offering a six-month free trial for early adopters."
    ],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "culturin-unesco-partnership",
    title: "Culturin Partners with UNESCO on Cultural Heritage Preservation Initiative",
    date: "November 20, 2024",
    content: [
      "Culturin and UNESCO today announced a strategic partnership aimed at promoting sustainable tourism practices that protect cultural heritage while supporting local economies. The collaboration will focus initially on five UNESCO World Heritage sites facing challenges from overtourism.",
      "The partnership will develop and implement responsible tourism guidelines for tour operators, launch educational initiatives for travelers, and create economic opportunities for local communities through cultural tourism. Additionally, a portion of all bookings made through Culturin for experiences at UNESCO sites will support heritage preservation efforts.",
      "\"Cultural heritage sites around the world face unprecedented pressures from tourism,\" said Elena Martínez, UNESCO's Director of Heritage. \"This partnership with Culturin represents an innovative approach to ensuring that tourism supports rather than harms these irreplaceable treasures.\"",
      "Initial pilot programs will launch in Dubrovnik, Croatia; Luang Prabang, Laos; Cusco, Peru; Kyoto, Japan; and Marrakech, Morocco. In each location, Culturin will work with local authorities and cultural practitioners to develop tourism experiences that disperse visitors beyond overcrowded landmarks and highlight lesser-known aspects of local culture.",
      "\"We believe that well-designed cultural tourism can be a powerful force for preservation,\" said Liam Wong, Culturin's Head of Sustainability. \"By directing tourism revenue to support traditional crafts, culinary practices, and performing arts, we can help ensure these cultural expressions thrive for generations to come.\"",
      "The partnership builds on Culturin's existing Responsible Tourism Pledge, which commits the company to principles of cultural respect, environmental sustainability, and economic inclusion across all its operations."
    ],
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2000&auto=format&fit=crop"
  }
];

const PressArticlePage = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Find the article with the matching ID
    const foundArticle = pressArticles.find(a => a.id === articleId);
    
    if (foundArticle) {
      setArticle(foundArticle);
      document.title = `${foundArticle.title} | Culturin Press`;
    }
    setLoading(false);
  }, [articleId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header type="operator" />
        <main className="flex-1 pt-24 px-4">
          <div className="container mx-auto max-w-3xl py-12">
            <h1 className="text-3xl font-bold">Article Not Found</h1>
            <p className="mt-4 mb-8">Sorry, the press article you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/press">Return to Press</Link>
            </Button>
          </div>
        </main>
        <NewFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />
      
      <main className="flex-1 pt-24">
        {/* Header Section */}
        <div className="bg-white py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-6">
              <Button variant="ghost" asChild className="flex items-center gap-1 text-gray-600 mb-8 hover:text-blue-600 -ml-3">
                <Link to="/press">
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back to Press</span>
                </Link>
              </Button>
              
              <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{article.date}</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {article.title}
              </h1>
            </div>
            
            {/* Featured Image */}
            <div className="aspect-video rounded-xl overflow-hidden mb-10">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Article Content */}
        <div className="bg-white py-8">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="prose prose-lg max-w-none">
              {article.content.map((paragraph, index) => (
                <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <NewFooter />
    </div>
  );
};

export default PressArticlePage;

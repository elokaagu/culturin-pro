
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Star, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface TestimonialCardProps {
  name: string;
  company: string;
  quote: string;
  image: string;
  category: string;
}

const TestimonialCard = ({ name, company, quote, image, category }: TestimonialCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Function to highlight numbers/percentages in quotes
  const highlightResults = (text: string) => {
    // This regex looks for numbers with % or numbers followed by "%"
    const parts = text.split(/(\d+%|\d+\s*percent)/g);
    
    return parts.map((part, index) => {
      // Check if this part matches our pattern for numbers/percentages
      if (/\d+%|\d+\s*percent/.test(part)) {
        return <span key={index} className="font-bold text-blue-600">{part}</span>;
      }
      return part;
    });
  };

  return (
    <Card 
      className={`h-full overflow-hidden border border-gray-200 transition-all duration-300 ${
        isHovered ? "shadow-lg translate-y-[-4px]" : "shadow-md"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64">
        <img 
          src={image} 
          alt={`${name}, ${company}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 flex flex-col justify-end p-5">
          <Badge className="mb-2 bg-blue-600 text-white border-none self-start">{category}</Badge>
          <h3 className="text-white font-medium text-xl">{name}</h3>
          <p className="text-white/80">Owner of {company}</p>
        </div>
      </div>
      <CardContent className="p-6 relative">
        <div className="text-blue-500 text-4xl font-serif absolute top-3 left-4 opacity-30">"</div>
        <p className="text-gray-700 relative pl-2 italic leading-relaxed">
          {highlightResults(quote)}
        </p>
      </CardContent>
    </Card>
  );
};

const TrustedOperators = () => {
  const testimonials = [
    {
      name: "Maria Sanchez",
      company: "Barcelona Tapas Tours",
      quote: "Since using Culturin, our bookings have increased by 65% and the itinerary builder saved me countless hours of work.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
      category: "Food Tours"
    },
    {
      name: "Kenji Yamamoto",
      company: "Tokyo Cultural Walks",
      quote: "The analytics dashboard helped us identify our most profitable experiences and optimize our pricing strategy.",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop",
      category: "Cultural Walks"
    },
    {
      name: "Aisha Okafor",
      company: "Lagos Food Journeys",
      quote: "The storytelling tools helped us communicate our cultural heritage in ways that truly resonated with travelers.",
      image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1000&auto=format&fit=crop",
      category: "Food Experiences"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-center mb-2">
          <div className="bg-gray-50 px-4 py-1.5 rounded-full flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-medium">Rated 4.9/5 across 297 reviews</span>
          </div>
        </div>
        
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-3">
            <Users className="h-6 w-6 text-black mr-2" />
            <h2 className="text-3xl font-medium">Trusted by thousands of tour operators</h2>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe className="h-4 w-4 text-blue-600" />
            <p className="text-gray-600">
              Used in 38+ countries by cultural experience hosts worldwide
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="outline" className="bg-gray-50">Food Tours</Badge>
            <Badge variant="outline" className="bg-gray-50">Cultural Walks</Badge>
            <Badge variant="outline" className="bg-gray-50">Heritage Guides</Badge>
            <Badge variant="outline" className="bg-gray-50">Art Experiences</Badge>
            <Badge variant="outline" className="bg-gray-50">Local Immersions</Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              name={testimonial.name}
              company={testimonial.company}
              quote={testimonial.quote}
              image={testimonial.image}
              category={testimonial.category}
            />
          ))}
        </div>
        
        {/* Added CTA section below testimonials */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-medium mb-4">Want to grow your tours like Maria and Aisha?</h3>
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            Book a Demo
          </Button>
          <p className="text-sm text-gray-500 mt-3">No credit card required. Free 14-day trial.</p>
        </div>
      </div>
    </section>
  );
};

export default TrustedOperators;

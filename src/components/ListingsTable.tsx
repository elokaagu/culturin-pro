
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Share, ExternalLink, TrendingUp, TrendingDown, Info } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "@/components/ui/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Listing {
  id: string;
  title: string;
  status: "draft" | "live";
  bookingPercentage: number;
  price: number;
  location: string;
  dates: string;
  image: string;
  trend?: "up" | "down" | "flat";
  daysInDraft?: number;
}

const mockListings: Listing[] = [
  {
    id: "1",
    title: "Traditional Pottery Workshop",
    status: "live",
    bookingPercentage: 75,
    price: 45,
    location: "Oaxaca, Mexico",
    dates: "Weekly, Tue & Thu",
    image: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png",
    trend: "up"
  },
  {
    id: "2",
    title: "Desert Stargazing Experience",
    status: "live",
    bookingPercentage: 60,
    price: 85,
    location: "Marrakech, Morocco",
    dates: "Nightly, Weather Permitting",
    image: "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png",
    trend: "flat"
  },
  {
    id: "3",
    title: "Farm to Table Cooking Class",
    status: "draft",
    bookingPercentage: 0,
    price: 65,
    location: "Bali, Indonesia",
    dates: "Mon, Wed, Fri",
    image: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png",
    daysInDraft: 12,
    trend: "down"
  }
];

const ListingsTable = () => {
  const { toast } = useToast();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const handleAction = (action: string, listing: Listing) => {
    toast({
      title: `${action}: ${listing.title}`,
      description: `You clicked the ${action.toLowerCase()} button for this experience.`,
    });
  };

  const getTrendIcon = (trend?: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-culturin-terracotta" />;
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockListings.map((listing) => (
        <Card 
          key={listing.id}
          className={`overflow-hidden transition-all duration-200 ${
            hoveredCard === listing.id ? 'shadow-lg ring-1 ring-culturin-indigo/10' : ''
          }`}
          onMouseEnter={() => setHoveredCard(listing.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="relative h-44 w-full overflow-hidden">
            <Image
              src={listing.image}
              alt={listing.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute top-3 right-3">
              <Badge 
                variant={listing.status === "live" ? "default" : "outline"}
                className={`
                  ${listing.status === "live" 
                    ? "bg-green-100 text-green-800 hover:bg-green-200" 
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }
                  px-3 py-1 font-medium
                `}
              >
                {listing.status === "live" ? "Published" : "Draft"}
              </Badge>
            </div>
            {listing.daysInDraft && listing.daysInDraft > 7 && (
              <div className="absolute bottom-3 left-3 right-3">
                <div className="bg-amber-100 text-amber-800 px-3 py-2 rounded-md text-xs font-medium shadow-sm">
                  Finish setting up your experience — you're 80% there! 
                  <br />
                  <span className="text-amber-700 font-normal">Draft for {listing.daysInDraft} days</span>
                </div>
              </div>
            )}
          </div>
          
          <CardHeader className="pb-0">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-900">{listing.title}</h3>
              <span className="text-lg font-bold text-culturin-indigo">${listing.price}</span>
            </div>
            <p className="text-sm text-gray-500">{listing.location}</p>
            <p className="text-xs text-gray-400">{listing.dates}</p>
          </CardHeader>
          
          <CardContent className="pt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <div className="flex items-center gap-2">
                <span>Booking Rate</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Booking Rate is calculated based on the % of page views that result in confirmed bookings.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {getTrendIcon(listing.trend)}
              </div>
              <span className="font-semibold">{listing.bookingPercentage}%</span>
            </div>
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div 
                  style={{ width: `${listing.bookingPercentage}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${
                    listing.bookingPercentage >= 80 ? 'bg-green-500' : 
                    listing.bookingPercentage >= 50 ? 'bg-culturin-mustard' : 
                    'bg-culturin-terracotta'
                  }`}
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="border-t mt-2 flex justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-600 hover:text-culturin-indigo hover:bg-culturin-sand/10"
                    onClick={() => handleAction("Edit", listing)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    <span className="text-xs">Edit</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit this experience</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-600 hover:text-culturin-indigo hover:bg-culturin-sand/10"
                    onClick={() => handleAction("Share", listing)}
                  >
                    <Share className="h-4 w-4 mr-1" />
                    <span className="text-xs">Share</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share this experience</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-600 hover:text-culturin-indigo hover:bg-culturin-sand/10"
                    onClick={() => handleAction("View", listing)}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    <span className="text-xs">View</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View live experience</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ListingsTable;

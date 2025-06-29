'use client'

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, ShieldCheck, Edit, Share, ExternalLink, TrendingUp, TrendingDown, Info, UserCheck, Eye } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardBadges } from "@/components/ui/card";
import Image from "@/components/ui/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Safety {
  femaleFriendly?: boolean;
  lgbtqSafe?: boolean;
  nightSafe?: boolean;
  backgroundChecked?: boolean;
  identityVerified?: boolean;
  safetyRating?: number;
}

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
  safety?: Safety;
}

// Updated mock data with safety information
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
    trend: "up",
    safety: {
      femaleFriendly: true,
      identityVerified: true,
      backgroundChecked: true,
      safetyRating: 4.8
    }
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
    trend: "flat",
    safety: {
      nightSafe: true,
      lgbtqSafe: true,
      identityVerified: true,
      safetyRating: 4.5
    }
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
    trend: "down",
    safety: {
      femaleFriendly: true,
      lgbtqSafe: true,
      identityVerified: false
    }
  }
];

const ListingsTable = () => {
  const { toast } = useToast();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [showSafetyBadges, setShowSafetyBadges] = useState(true);
  
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
    <div className="space-y-6">
      <div className="flex items-center justify-end mb-2">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="show-safety" 
            checked={showSafetyBadges} 
            onCheckedChange={(checked) => setShowSafetyBadges(checked as boolean)}
          />
          <Label htmlFor="show-safety" className="text-sm cursor-pointer flex items-center">
            <Shield className="h-4 w-4 mr-1 text-culturin-indigo" />
            Show Safety & Security Badges
          </Label>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockListings.map((listing) => (
          <Card 
            key={listing.id}
            className={`overflow-hidden transition-all duration-200 relative ${
              hoveredCard === listing.id ? 'shadow-lg ring-1 ring-culturin-indigo/10' : ''
            }`}
            onMouseEnter={() => setHoveredCard(listing.id)}
            onMouseLeave={() => setHoveredCard(null)}
            hasBadges={showSafetyBadges && listing.safety !== undefined}
          >
            {/* Safety Badges Section */}
            {showSafetyBadges && listing.safety && (
              <CardBadges>
                {listing.safety.identityVerified && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    <span>ID Verified</span>
                  </Badge>
                )}
                {listing.safety.backgroundChecked && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 flex items-center gap-1">
                    <UserCheck className="h-3 w-3" />
                    <span>Background Checked</span>
                  </Badge>
                )}
                {listing.safety.femaleFriendly && (
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    <span>Female Friendly</span>
                  </Badge>
                )}
                {listing.safety.lgbtqSafe && (
                  <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100 flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    <span>LGBTQ+ Safe</span>
                  </Badge>
                )}
                {listing.safety.nightSafe && (
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>Night Safe</span>
                  </Badge>
                )}
              </CardBadges>
            )}
            
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
              {/* Safety Rating */}
              {showSafetyBadges && listing.safety?.safetyRating && (
                <div className="mb-3 flex items-center justify-between pb-2 border-b border-gray-100">
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-culturin-indigo" />
                    <span className="text-sm font-medium">Safety Rating</span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center">
                          <span className="font-semibold">{listing.safety.safetyRating}</span>
                          <Info className="h-3 w-3 text-gray-400 ml-1 cursor-help" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">
                          Safety rating is based on traveler feedback, local safety data, and host verification status.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}

              {/* Booking Rate */}
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
    </div>
  );
};

export default ListingsTable;

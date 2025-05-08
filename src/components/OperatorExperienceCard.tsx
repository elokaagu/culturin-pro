
import React from 'react';
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, TrendingDown, Info, ChevronDown } from "lucide-react";
import Image from "@/components/ui/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ExperienceProps {
  id: string;
  title: string;
  status: "live" | "draft";
  bookingPercentage: number;
  price: number;
  location: string;
  dates: string;
  duration: string;
  image: string;
  trend?: "up" | "down" | "flat";
  daysInDraft?: number;
}

const OperatorExperienceCard = ({ 
  id, 
  title, 
  status, 
  bookingPercentage, 
  price, 
  location, 
  dates, 
  duration, 
  image, 
  trend, 
  daysInDraft 
}: ExperienceProps) => {
  
  const handleManageExperience = () => {
    toast({
      title: "Manage Experience",
      description: `You clicked to manage ${title}.`,
    });
  };

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />;
    return null;
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Card Image */}
      <div className="relative h-52">
        <Image
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <Badge 
            className={status === "live" 
              ? "bg-green-100 text-green-800 hover:bg-green-200" 
              : "bg-amber-100 text-amber-800 hover:bg-amber-200"
            }
          >
            {status === "live" ? "Published" : "Draft"}
          </Badge>
        </div>
        
        {/* Draft warning */}
        {status === "draft" && daysInDraft && daysInDraft > 5 && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-amber-100/90 text-amber-800 px-3 py-2 rounded-md text-xs font-medium">
              Finish setting up your experience — Draft for {daysInDraft} days 
            </div>
          </div>
        )}
      </div>
      
      {/* Card Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
          <p className="text-lg font-bold text-culturin-indigo">${price}</p>
        </div>
        
        <div className="flex items-center text-gray-500 mb-3 text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{location}</span>
        </div>
        
        <div className="flex justify-between mb-4">
          <span className="text-sm text-gray-500">{duration}</span>
          <span className="text-sm text-gray-500">{dates}</span>
        </div>
        
        {/* Booking Performance */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center gap-1">
              <span>Booking Rate</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Percentage of page views resulting in bookings</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {getTrendIcon()}
            </div>
            <span className="font-semibold">{bookingPercentage}%</span>
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
              <div 
                style={{ width: `${bookingPercentage}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${
                  bookingPercentage >= 70 ? 'bg-green-500' : 
                  bookingPercentage >= 40 ? 'bg-blue-500' : 
                  'bg-amber-500'
                }`}
              />
            </div>
          </div>
        </div>
        
        {/* Card Actions */}
        <div className="mt-6 flex justify-center">
          <Button 
            variant="outline" 
            className="w-full rounded-xl hover:bg-gray-100"
            onClick={handleManageExperience}
          >
            Manage Experience
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OperatorExperienceCard;

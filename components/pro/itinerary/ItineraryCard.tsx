import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Edit } from "lucide-react";
import Image from "@/components/ui/image";
import { ItineraryType } from "@/data/itineraryData";

interface ItineraryCardProps {
  id: string;
  title: string;
  description: string;
  days: number;
  lastUpdated: string;
  status: "published" | "draft" | "archived";
  image: string;
  themeType: string;
  regions: string[];
  onEdit: () => void;
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({
  title,
  days,
  lastUpdated,
  status,
  image,
  onEdit,
  themeType,
  regions,
}) => {
  return (
    <Card
      className="relative h-64 overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer group"
      onClick={onEdit}
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
      {/* Content overlayed at the bottom */}
      <div className="absolute bottom-0 left-0 w-full z-20 p-4 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg text-white drop-shadow font-semibold">
            {title}
          </CardTitle>
          <Badge
            variant={status === "published" ? "default" : "outline"}
            className="bg-white/80 text-gray-900"
          >
            {status === "published" ? "Published" : "Draft"}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1 text-white/90 text-sm">
          <Clock className="h-3 w-3" /> {days} days
          {regions && regions.length > 0 && (
            <span className="ml-2 text-xs text-white/80">
              {regions.join(", ")}
            </span>
          )}
        </CardDescription>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-white/80">
            Last updated {lastUpdated}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="h-8 bg-white/90 text-gray-900 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <Edit className="h-3 w-3 mr-1" /> Edit
          </Button>
        </div>
      </div>
      {/* Theme badge in the top right */}
      {themeType && (
        <Badge className="absolute top-2 right-2 bg-black/70 text-white z-30">
          {themeType.charAt(0).toUpperCase() + themeType.slice(1)}
        </Badge>
      )}
    </Card>
  );
};

export default ItineraryCard;

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
      className="overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer"
      onClick={onEdit}
    >
      <div className="h-40 overflow-hidden relative">
        <Image src={image} alt={title} aspectRatio="wide" />
        {themeType && (
          <Badge className="absolute top-2 right-2 bg-black/70 text-white">
            {themeType.charAt(0).toUpperCase() + themeType.slice(1)}
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant={status === "published" ? "default" : "outline"}>
            {status === "published" ? "Published" : "Draft"}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> {days} days
          {regions && regions.length > 0 && (
            <span className="ml-2 text-xs text-gray-500">
              {regions.join(", ")}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-2 flex justify-between">
        <span className="text-xs text-gray-500">
          Last updated {lastUpdated}
        </span>
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click from triggering
            onEdit();
          }}
        >
          <Edit className="h-3 w-3 mr-1" /> Edit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ItineraryCard;

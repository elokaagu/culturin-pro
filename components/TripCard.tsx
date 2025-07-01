import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "@/components/ui/image";

export interface TripCardProps {
  id: string;
  name: string;
  location: string;
  operatorName: string;
  operatorPhoto?: string;
  dates: string;
  groupSize: number;
  tags: string[];
  imageUrl: string;
}

export const TripCard = ({
  name,
  location,
  operatorName,
  operatorPhoto,
  dates,
  groupSize,
  tags,
  imageUrl,
}: TripCardProps) => {
  return (
    <Card className="overflow-hidden border-0 rounded-2xl shadow-soft transition-all duration-300 hover:shadow-card group">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          fill
        />
        <div className="absolute bottom-0 left-0 right-0 image-overlay p-6">
          <h3 className="font-serif font-medium text-white text-xl mb-1">
            {name}
          </h3>
          <p className="text-white/90 text-sm flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-culturin-mustard mr-2"></span>
            {location}
          </p>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-center mb-5">
          <div className="w-10 h-10 rounded-full bg-culturin-white flex items-center justify-center overflow-hidden mr-3 border-2 border-culturin-mustard/30">
            {operatorPhoto ? (
              <Image
                src={operatorPhoto}
                alt={operatorName}
                className="w-full h-full object-cover"
                fill
              />
            ) : (
              <User className="w-5 h-5 text-culturin-indigo" />
            )}
          </div>
          <span className="font-medium text-sm">{operatorName}</span>
        </div>

        <div className="flex justify-between text-sm mb-5">
          <div className="text-muted-foreground font-medium">{dates}</div>
          <div className="flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-culturin-clay mr-2"></span>
            <span>{groupSize} travelers</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-muted text-culturin-indigo border-culturin-mustard/20 font-medium rounded-lg"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TripCard;

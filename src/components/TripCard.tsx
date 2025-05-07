
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

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
  imageUrl
}: TripCardProps) => {
  return (
    <div className="trip-card group">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 image-overlay p-4">
          <h3 className="text-white font-semibold text-xl mb-1">{name}</h3>
          <p className="text-white/90 text-sm flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-culturin-mustard mr-2"></span>
            {location}
          </p>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-culturin-sand flex items-center justify-center overflow-hidden mr-3 border-2 border-culturin-mustard/30">
            {operatorPhoto ? (
              <img src={operatorPhoto} alt={operatorName} className="w-full h-full object-cover" />
            ) : (
              <User className="w-5 h-5 text-culturin-indigo" />
            )}
          </div>
          <span className="font-medium text-sm">{operatorName}</span>
        </div>
        
        <div className="flex justify-between text-sm mb-4">
          <div className="text-gray-600 font-medium">{dates}</div>
          <div className="flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-culturin-terracotta mr-2"></span>
            <span>{groupSize} travelers</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="bg-culturin-sand text-culturin-indigo border-none font-medium"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripCard;

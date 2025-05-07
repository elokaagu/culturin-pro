
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
    <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-semibold text-xl">{name}</h3>
          <p className="text-white/90 text-sm">{location}</p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 rounded-full bg-culturin-sand flex items-center justify-center overflow-hidden mr-2">
            {operatorPhoto ? (
              <img src={operatorPhoto} alt={operatorName} className="w-full h-full object-cover" />
            ) : (
              <User className="w-5 h-5 text-culturin-indigo" />
            )}
          </div>
          <span className="font-medium text-sm">{operatorName}</span>
        </div>
        
        <div className="flex justify-between text-sm mb-3">
          <div className="text-gray-600">{dates}</div>
          <div>{groupSize} travelers</div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-culturin-sand text-culturin-indigo">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripCard;

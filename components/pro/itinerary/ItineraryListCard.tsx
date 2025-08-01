import React from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  Edit, 
  MoreHorizontal, 
  Share2, 
  Copy, 
  Archive, 
  BarChart3,
  Globe,
  Eye,
  Calendar,
  MapPin
} from "lucide-react";
import Image from "@/components/ui/image";
import { ItineraryType } from "@/data/itineraryData";

interface ItineraryListCardProps {
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
  onQuickAction?: (itineraryId: string, action: string) => void;
  completionPercentage?: number;
}

const ItineraryListCard: React.FC<ItineraryListCardProps> = ({
  id,
  title,
  description,
  days,
  lastUpdated,
  status,
  image,
  onEdit,
  onQuickAction,
  completionPercentage = 0,
  themeType,
  regions,
}) => {
  const handleQuickAction = (action: string) => {
    if (onQuickAction) {
      onQuickAction(id, action);
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'published':
        return 'bg-green-500';
      case 'draft':
        return 'bg-yellow-500';
      case 'archived':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'published':
        return 'Live';
      case 'draft':
        return 'Draft';
      case 'archived':
        return 'Archived';
      default:
        return 'Draft';
    }
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Image */}
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image
              src={image}
              alt={title}
              className="w-full h-full object-cover rounded-lg"
            />
            <Badge
              className={`absolute -top-1 -right-1 ${getStatusColor()} text-white text-xs`}
            >
              {getStatusText()}
            </Badge>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
              </div>
              
              {/* Action Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {status !== 'published' && (
                    <DropdownMenuItem onClick={() => handleQuickAction('publish')}>
                      <Globe className="h-4 w-4 mr-2" />
                      Publish
                    </DropdownMenuItem>
                  )}
                  {status === 'published' && (
                    <DropdownMenuItem onClick={() => handleQuickAction('unpublish')}>
                      <Eye className="h-4 w-4 mr-2" />
                      Unpublish
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => handleQuickAction('duplicate')}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleQuickAction('share')}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleQuickAction('analytics')}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleQuickAction('push-to-website')}>
                    <Globe className="h-4 w-4 mr-2" />
                    Push to Website
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleQuickAction('archive')}>
                    <Archive className="h-4 w-4 mr-2" />
                    Archive
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Progress Bar */}
            {completionPercentage > 0 && (
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Completion</span>
                  <span>{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-1" />
              </div>
            )}

            {/* Meta Information */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {days} days
              </div>
              {regions && regions.length > 0 && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {regions.join(", ")}
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {lastUpdated}
              </div>
              {themeType && (
                <Badge variant="outline" className="text-xs">
                  {themeType.charAt(0).toUpperCase() + themeType.slice(1)}
                </Badge>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {status === 'published' ? (
              <Badge className="bg-green-500/80 text-white text-xs">
                <Globe className="h-3 w-3 mr-1" />
                Live
              </Badge>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction('publish')}
                className="text-green-600 border-green-600 hover:bg-green-50"
              >
                <Globe className="h-3 w-3 mr-1" /> Publish
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
            >
              <Edit className="h-3 w-3 mr-1" /> Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItineraryListCard; 
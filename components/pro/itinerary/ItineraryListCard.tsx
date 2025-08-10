import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  MapPin,
  Trash2,
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
  onDelete?: (id: string) => void;
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
  onDelete,
  onQuickAction,
  completionPercentage = 0,
  themeType,
  regions,
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleQuickAction = (action: string) => {
    if (onQuickAction) {
      onQuickAction(id, action);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
    setShowDeleteDialog(false);
  };

  const getStatusColor = () => {
    switch (status) {
      case "published":
        return "bg-green-500";
      case "draft":
        return "bg-yellow-500";
      case "archived":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "published":
        return "Live";
      case "draft":
        return "Draft";
      case "archived":
        return "Archived";
      default:
        return "Draft";
    }
  };

  return (
    <>
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
              {themeType && (
                <Badge className="absolute -top-1 -right-1 bg-black/70 text-white text-xs">
                  {themeType.charAt(0).toUpperCase() + themeType.slice(1)}
                </Badge>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground truncate">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {description}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2 ml-4">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
                  <span className="text-xs text-muted-foreground">
                    {getStatusText()}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
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
              </div>

              {/* Progress Bar */}
              {completionPercentage > 0 && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Completion</span>
                    <span>{completionPercentage}%</span>
                  </div>
                  <Progress value={completionPercentage} className="h-2" />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="h-8"
              >
                <Edit className="h-3 w-3 mr-1" /> Edit
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => handleQuickAction("duplicate")}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleQuickAction("share")}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleQuickAction("analytics")}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleQuickAction("push-to-website")}
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Push to Website
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleQuickAction("archive")}
                  >
                    <Archive className="h-4 w-4 mr-2" />
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setShowDeleteDialog(true)}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Itinerary</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{title}"? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ItineraryListCard;

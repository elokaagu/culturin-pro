import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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

import {
  Clock,
  Edit,
  MoreHorizontal,
  Share2,
  Copy,
  Archive,
  BarChart3,
  Globe,
  TrendingUp,
  Eye,
  Trash2,
} from "lucide-react";
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
  onDelete?: (id: string) => void;
  onQuickAction?: (itineraryId: string, action: string) => void;
  completionPercentage?: number;
  isTrending?: boolean;
  disableNavigation?: boolean; // New prop to disable internal navigation
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({
  id,
  title,
  days,
  lastUpdated,
  status,
  image,
  onEdit,
  onDelete,
  onQuickAction,
  completionPercentage = 0,
  isTrending = false,
  themeType,
  regions,
  disableNavigation = false,
}) => {
  const router = useRouter();
  const [showActions, setShowActions] = useState(false);
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

  return (
    <>
      <Card
        className="relative h-80 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer group"
        onClick={
          disableNavigation
            ? undefined
            : () => router.push(`/pro-dashboard/itinerary/${id}`)
        }
      >
        {/* Background Image */}
        <Image
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-300 group-hover:scale-110"
        />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-90" />

        {/* Action Menu */}
        <div className="absolute top-2 right-2 z-30">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 bg-black/50 text-white hover:bg-black/70"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handleQuickAction("duplicate")}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleQuickAction("share")}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleQuickAction("analytics")}>
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleQuickAction("push-to-website")}
              >
                <Globe className="h-4 w-4 mr-2" />
                Push to Website
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleQuickAction("archive")}>
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteDialog(true);
                }}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Content overlayed at the bottom */}
        <div className="absolute left-0 w-full z-20 p-6 flex flex-col gap-3 transition-transform duration-300 group-hover:translate-y-0 bottom-0">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl text-white drop-shadow font-semibold transition-all duration-300 group-hover:text-2xl">
              {title}
            </CardTitle>
          </div>

          <CardDescription className="flex items-center gap-2 text-white/90 text-base transition-all duration-300 group-hover:text-white">
            <Clock className="h-4 w-4" /> {days} days
            {regions && regions.length > 0 && (
              <span className="ml-3 text-sm text-white/80 group-hover:text-white transition-colors duration-300">
                {regions.join(", ")}
              </span>
            )}
          </CardDescription>

          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-white/80 group-hover:text-white transition-colors duration-300">
              Last updated {lastUpdated}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-10 bg-white/90 text-gray-900 hover:bg-white transition-all duration-300 group-hover:bg-white group-hover:scale-105 group-hover:shadow-md"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/pro-dashboard/itinerary/${id}`);
                }}
              >
                <Edit className="h-4 w-4 mr-2" /> Edit
              </Button>
            </div>
          </div>
        </div>

        {/* Theme badge - positioned below status badge */}
        {themeType && (
          <Badge className="absolute top-12 left-3 bg-black/70 text-white text-sm px-3 py-1 z-30 transition-all duration-300 group-hover:bg-black/90 group-hover:scale-110">
            {themeType.charAt(0).toUpperCase() + themeType.slice(1)}
          </Badge>
        )}
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

export default ItineraryCard;

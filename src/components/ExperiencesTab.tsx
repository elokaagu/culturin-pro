'use client'

import { useState } from "react";
import { Plus, Filter, ArrowUp, ArrowDown, Edit, Copy, Archive, MoreHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import Image from "@/components/ui/image";
import { Link } from "../../lib/navigation";

// Mock data for experiences
const mockExperiences = [
  {
    id: "exp-1",
    title: "Traditional Pottery Workshop",
    status: "live",
    location: "Oaxaca, Mexico",
    price: 45,
    currency: "USD",
    duration: "2 hours",
    imageUrl: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png",
    bookingPercentage: 75,
    featured: true,
    totalBookings: 32,
    dates: "Weekly, Tue & Thu",
    lastUpdated: "2 days ago",
    viewCount: 156
  },
  {
    id: "exp-2",
    title: "Desert Stargazing Experience",
    status: "live",
    location: "Marrakech, Morocco",
    price: 85,
    currency: "USD",
    duration: "3 hours",
    imageUrl: "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png",
    bookingPercentage: 60,
    featured: false,
    totalBookings: 18,
    dates: "Nightly, Weather Permitting",
    lastUpdated: "5 days ago",
    viewCount: 89
  },
  {
    id: "exp-3",
    title: "Farm to Table Cooking Class",
    status: "draft",
    location: "Bali, Indonesia",
    price: 65,
    currency: "USD",
    duration: "4 hours",
    imageUrl: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png",
    bookingPercentage: 0,
    featured: false,
    totalBookings: 0,
    dates: "Mon, Wed, Fri",
    lastUpdated: "12 days ago",
    viewCount: 0
  },
  {
    id: "exp-4",
    title: "Traditional Tea Ceremony",
    status: "draft",
    location: "Kyoto, Japan",
    price: 55,
    currency: "USD",
    duration: "1.5 hours",
    imageUrl: "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png",
    bookingPercentage: 0,
    featured: false,
    totalBookings: 0,
    dates: "Weekends",
    lastUpdated: "1 day ago",
    viewCount: 0
  }
];

type ExperienceStatus = "all" | "live" | "draft" | "archive";
type SortField = "title" | "bookingPercentage" | "price" | "lastUpdated" | "none";

const ExperiencesTab = () => {
  const { toast } = useToast();
  const [experiences, setExperiences] = useState(mockExperiences);
  const [filterStatus, setFilterStatus] = useState<ExperienceStatus>("all");
  const [sortBy, setSortBy] = useState<SortField>("none");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [experienceToArchive, setExperienceToArchive] = useState<string | null>(null);
  
  // Filter experiences based on status and search query
  const filteredExperiences = experiences.filter(exp => {
    const matchesStatus = filterStatus === "all" || exp.status === filterStatus;
    const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          exp.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });
  
  // Handle sort change
  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };
  
  // Handle status filter change
  const handleStatusFilter = (status: ExperienceStatus) => {
    setFilterStatus(status);
  };
  
  // Actions
  const handleEdit = (id: string) => {
    toast({
      title: "Edit Experience",
      description: "Opening experience builder..."
    });
    // Navigate to experience builder (handled by parent component)
  };
  
  const handleDuplicate = (id: string) => {
    toast({
      title: "Experience Duplicated",
      description: "A copy has been created in your drafts."
    });
  };
  
  const openArchiveDialog = (id: string) => {
    setExperienceToArchive(id);
    setArchiveDialogOpen(true);
  };
  
  const handleArchive = () => {
    if (experienceToArchive) {
      toast({
        title: "Experience Archived",
        description: "The experience has been moved to archive."
      });
      setArchiveDialogOpen(false);
      setExperienceToArchive(null);
    }
  };
  
  // Helper function to get border color based on status
  const getBorderColor = (status: string) => {
    switch (status) {
      case "live": return "border-green-200";
      case "draft": return "border-amber-200";
      case "archive": return "border-gray-200";
      default: return "border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top actions bar */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search experiences..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full sm:w-[300px]"
          />
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                {filterStatus === "all" ? "All Status" : 
                 filterStatus === "live" ? "Published" :
                 filterStatus === "draft" ? "Drafts" : "Archived"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleStatusFilter("all")}>
                All Experiences
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilter("live")}>
                Published Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilter("draft")}>
                Drafts Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilter("archive")}>
                Archived
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                {sortDirection === "asc" ? <ArrowUp className="h-4 w-4 mr-2" /> : <ArrowDown className="h-4 w-4 mr-2" />}
                {sortBy === "none" ? "Sort By" : 
                 sortBy === "title" ? "Title" :
                 sortBy === "bookingPercentage" ? "Booking %" :
                 sortBy === "price" ? "Price" : "Last Updated"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleSort("title")}>Title</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("bookingPercentage")}>Booking Rate</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("price")}>Price</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("lastUpdated")}>Last Updated</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            className="bg-culturin-terracotta hover:bg-culturin-clay text-white flex items-center ml-auto"
            onClick={() => toast({ title: "New Experience", description: "Opening experience builder..." })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Experience
          </Button>
        </div>
      </div>
      
      {/* Experience cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperiences.map((exp) => (
          <Card 
            key={exp.id}
            className={`overflow-hidden hover:shadow-md transition-shadow ${getBorderColor(exp.status)}`}
          >
            <div className="relative">
              <Image
                src={exp.imageUrl}
                alt={exp.title}
                className="w-full h-48 object-cover"
              />
              
              {/* Status badge */}
              <div className="absolute top-3 right-3">
                <Badge 
                  variant={exp.status === "live" ? "default" : "outline"}
                  className={`
                    ${exp.status === "live" 
                      ? "bg-green-100 text-green-800 hover:bg-green-200" 
                      : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                    }
                  `}
                >
                  {exp.status === "live" ? "Published" : "Draft"}
                </Badge>
              </div>
              
              {/* Featured badge */}
              {exp.featured && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-culturin-indigo text-white">
                    Featured
                  </Badge>
                </div>
              )}
            </div>
            
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg line-clamp-1">{exp.title}</h3>
                  <p className="text-sm text-gray-500">{exp.location}</p>
                </div>
                <p className="text-lg font-bold">${exp.price}</p>
              </div>
              
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-500">{exp.duration}</span>
                <span className="text-gray-500">{exp.dates}</span>
              </div>
              
              {/* Stats section */}
              <div className="mt-4 space-y-3">
                {exp.status === "live" ? (
                  <>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600">Booking Rate</span>
                        <span className="text-sm font-medium">{exp.bookingPercentage}%</span>
                      </div>
                      <Progress 
                        value={exp.bookingPercentage} 
                        className="h-1.5" 
                        indicatorClassName={
                          exp.bookingPercentage >= 70 ? "bg-green-500" : 
                          exp.bookingPercentage >= 40 ? "bg-amber-500" : 
                          "bg-culturin-terracotta"
                        }
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-center text-sm">
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-600">Total Bookings</p>
                        <p className="font-bold text-lg">{exp.totalBookings}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-600">Views</p>
                        <p className="font-bold text-lg">{exp.viewCount}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-amber-50 p-3 rounded-md border border-amber-100 text-amber-800 text-sm">
                    <p className="font-medium">This experience is not published yet</p>
                    <p className="text-xs mt-1">Last edited {exp.lastUpdated}</p>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-3 flex justify-between">
              <Button variant="ghost" size="sm" onClick={() => handleEdit(exp.id)}>
                <Edit className="h-4 w-4 mr-1.5" />
                <span>Edit</span>
              </Button>
              
              <TooltipProvider>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleEdit(exp.id)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    {exp.status === "live" && (
                      <DropdownMenuItem asChild>
                        <Link to={`/experiences/${exp.id}`} target="_blank">
                          <span className="flex items-center">
                            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 4.5V19.5M19.5 12H4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Preview
                          </span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => handleDuplicate(exp.id)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openArchiveDialog(exp.id)} className="text-red-600">
                      <Archive className="h-4 w-4 mr-2" />
                      Archive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipProvider>
            </CardFooter>
          </Card>
        ))}
        
        {/* Empty state */}
        {filteredExperiences.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Filter className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-1">No experiences found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery 
                ? "Try adjusting your search query or filters"
                : filterStatus !== "all"
                  ? `You don't have any ${filterStatus} experiences yet`
                  : "Start by creating your first cultural experience"
              }
            </p>
            <Button 
              onClick={() => {
                setSearchQuery("");
                setFilterStatus("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      
      {/* Pagination - simplified version */}
      {filteredExperiences.length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              disabled={true} 
              className="text-xs"
            >
              Previous
            </Button>
            <Button variant="outline" size="sm" className="text-xs bg-culturin-indigo/10">1</Button>
            <Button variant="outline" size="sm" className="text-xs">2</Button>
            <Button variant="outline" size="sm" className="text-xs">3</Button>
            <Button variant="outline" size="sm" className="text-xs">Next</Button>
          </div>
        </div>
      )}
      
      {/* Archive confirmation dialog */}
      <AlertDialog open={archiveDialogOpen} onOpenChange={setArchiveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive this experience?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the experience from your active listings. You can restore it from the archives later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleArchive} className="bg-red-600 hover:bg-red-700 text-white">
              Archive
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ExperiencesTab;

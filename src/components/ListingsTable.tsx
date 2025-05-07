
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Share, ExternalLink } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "@/components/ui/image";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Listing {
  id: string;
  title: string;
  status: "draft" | "live";
  bookingPercentage: number;
  price: number;
  location: string;
  dates: string;
  image: string;
}

const mockListings: Listing[] = [
  {
    id: "1",
    title: "Traditional Pottery Workshop",
    status: "live",
    bookingPercentage: 75,
    price: 45,
    location: "Oaxaca, Mexico",
    dates: "Weekly, Tue & Thu",
    image: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png"
  },
  {
    id: "2",
    title: "Desert Stargazing Experience",
    status: "live",
    bookingPercentage: 60,
    price: 85,
    location: "Marrakech, Morocco",
    dates: "Nightly, Weather Permitting",
    image: "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png"
  },
  {
    id: "3",
    title: "Farm to Table Cooking Class",
    status: "draft",
    bookingPercentage: 0,
    price: 65,
    location: "Bali, Indonesia",
    dates: "Mon, Wed, Fri",
    image: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png"
  }
];

const ListingsTable = () => {
  const { toast } = useToast();
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  
  const handleAction = (action: string, listing: Listing) => {
    toast({
      title: `${action}: ${listing.title}`,
      description: `You clicked the ${action.toLowerCase()} button for this experience.`,
    });
  };

  return (
    <Table className="border rounded-lg overflow-hidden">
      <TableHeader className="bg-culturin-sand/50">
        <TableRow>
          <TableHead className="w-1/3">Experience</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Booking %</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockListings.map((listing) => (
          <TableRow 
            key={listing.id} 
            className={`hover:bg-gray-50 transition-all duration-200 ${
              hoveredRow === listing.id ? 'bg-gray-50 shadow-sm' : ''
            }`}
            onMouseEnter={() => setHoveredRow(listing.id)} 
            onMouseLeave={() => setHoveredRow(null)}
          >
            <TableCell>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                  <div className="text-sm text-gray-500">{listing.location}</div>
                  <div className="text-xs text-gray-400">{listing.dates}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge 
                variant={listing.status === "live" ? "default" : "outline"}
                className={`
                  ${listing.status === "live" 
                    ? "bg-green-100 text-green-800 hover:bg-green-200" 
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }
                  transition-colors
                `}
              >
                {listing.status === "live" ? "Published" : "Draft"}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div 
                    style={{ width: `${listing.bookingPercentage}%` }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${
                      listing.bookingPercentage >= 80 ? 'bg-green-500' : 
                      listing.bookingPercentage >= 50 ? 'bg-culturin-mustard' : 
                      'bg-culturin-terracotta'
                    }`}
                  />
                </div>
                <div className="text-xs mt-1 font-medium">{listing.bookingPercentage}%</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="text-sm font-medium">${listing.price}</div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="inline-flex items-center hover:bg-culturin-sand/20"
                  onClick={() => handleAction("Edit", listing)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  <span className="sr-only lg:not-sr-only">Edit</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="inline-flex items-center hover:bg-culturin-sand/20"
                  onClick={() => handleAction("Share", listing)}
                >
                  <Share className="h-4 w-4 mr-1" />
                  <span className="sr-only lg:not-sr-only">Share</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="inline-flex items-center hover:bg-culturin-sand/20"
                  onClick={() => handleAction("View", listing)}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  <span className="sr-only lg:not-sr-only">View</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ListingsTable;

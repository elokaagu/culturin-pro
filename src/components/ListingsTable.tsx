
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Share, ExternalLink } from "lucide-react";

interface Listing {
  id: string;
  title: string;
  status: "draft" | "live";
  bookingPercentage: number;
  price: number;
  location: string;
  dates: string;
}

const mockListings: Listing[] = [
  {
    id: "1",
    title: "Traditional Pottery Workshop",
    status: "live",
    bookingPercentage: 75,
    price: 45,
    location: "Oaxaca, Mexico",
    dates: "Weekly, Tue & Thu"
  },
  {
    id: "2",
    title: "Desert Stargazing Experience",
    status: "live",
    bookingPercentage: 60,
    price: 85,
    location: "Marrakech, Morocco",
    dates: "Nightly, Weather Permitting"
  },
  {
    id: "3",
    title: "Farm to Table Cooking Class",
    status: "draft",
    bookingPercentage: 0,
    price: 65,
    location: "Bali, Indonesia",
    dates: "Mon, Wed, Fri"
  }
];

const ListingsTable = () => {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-culturin-sand/50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Experience
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Booking %
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mockListings.map((listing) => (
            <tr key={listing.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                  <div className="text-sm text-gray-500">{listing.location}</div>
                  <div className="text-xs text-gray-400">{listing.dates}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant={listing.status === "live" ? "default" : "outline"}
                       className={listing.status === "live" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}>
                  {listing.status === "live" ? "Published" : "Draft"}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div 
                      style={{ width: `${listing.bookingPercentage}%` }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                        listing.bookingPercentage >= 80 ? 'bg-green-500' : 
                        listing.bookingPercentage >= 50 ? 'bg-culturin-mustard' : 
                        'bg-culturin-terracotta'
                      }`}
                    />
                  </div>
                  <div className="text-xs mt-1">{listing.bookingPercentage}%</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm">${listing.price}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <Button variant="ghost" size="sm" className="inline-flex items-center">
                  <Edit className="h-4 w-4 mr-1" />
                  <span className="sr-only lg:not-sr-only">Edit</span>
                </Button>
                <Button variant="ghost" size="sm" className="inline-flex items-center">
                  <Share className="h-4 w-4 mr-1" />
                  <span className="sr-only lg:not-sr-only">Share</span>
                </Button>
                <Button variant="ghost" size="sm" className="inline-flex items-center">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  <span className="sr-only lg:not-sr-only">View</span>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListingsTable;

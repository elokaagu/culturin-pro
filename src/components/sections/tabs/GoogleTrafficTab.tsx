'use client'
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "@/components/ui/image";
import { useNavigate } from "../../../../lib/navigation";

const GoogleTrafficTab = () => {
  const navigate = useNavigate();

  return (
    <Card className="p-8 bg-[#f5f7ff] border-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-2xl font-medium mb-2 text-gray-500">
            Be the first result.
          </h3>
          <h2 className="text-3xl font-medium mb-6">
            When travelers search for food tours in Oaxaca — you should be the
            one they find.
          </h2>

          <ul className="space-y-3 text-gray-700 mb-8">
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 p-1 rounded-full mr-2">
                ✓
              </span>
              <span>
                <strong>SEO-ready pages, no tech needed</strong>
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 p-1 rounded-full mr-2">
                ✓
              </span>
              <span>
                <strong>Built to rank on Google</strong>
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 p-1 rounded-full mr-2">
                ✓
              </span>
              <span>
                <strong>Get 245% more clicks to your listings</strong>
              </span>
            </li>
          </ul>

          <Button
            className="flex items-center gap-2 bg-blue-100 text-blue-800 hover:bg-blue-200"
            onClick={() => navigate("/demo")}
          >
            <Search className="h-4 w-4" />
            Preview SEO listing
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative">
          <Image
            src="https://images.unsplash.com/photo-1469041797191-50ace28483c3"
            alt="Local guide showing cultural experience to tourists"
            className="rounded-lg shadow-lg object-cover h-full"
            aspectRatio="video"
          />

          {/* Before/After Overlay */}
          <div className="absolute bottom-4 right-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md">
            <div className="flex justify-between text-xs mb-2">
              <span className="font-bold text-red-500">Before Culturin</span>
              <span className="font-bold text-green-600">After Culturin</span>
            </div>
            <div className="w-full bg-gray-200 h-1 mb-3 relative">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-blue-500"></div>
              <div className="w-1/2 h-full bg-blue-500"></div>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">0 clicks/month</span>
              <span className="text-blue-600 font-semibold">
                +245% more clicks
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GoogleTrafficTab;

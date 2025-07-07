"use client";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "@/components/ui/image";
import { useNavigate } from "../../../../lib/navigation";

const OnlineSalesTab = () => {
  const navigate = useNavigate();

  return (
    <Card className="p-8 bg-[#f5f7ff] border-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-2xl font-medium mb-2 text-gray-500">
            Turn curiosity into cultural connection.
          </h3>
          <h2 className="text-3xl font-medium mb-6">
            Culturin's booking system respects both travelers and local
            communities — building trust through transparency.
          </h2>

          <ul className="space-y-3 text-gray-700 mb-8">
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">
                ✓
              </span>
              <span>
                <strong>Community conscious group sizing</strong>
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">
                ✓
              </span>
              <span>
                <strong>Transparent cultural guidelines</strong>
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">
                ✓
              </span>
              <span>
                <strong>Thoughtful traveler pre engagement</strong>
              </span>
            </li>
          </ul>

          <Button
            className="flex items-center gap-2 bg-green-100 text-green-800 hover:bg-green-200"
            onClick={() => navigate("/demo")}
          >
            <Calendar className="h-4 w-4" />
            Explore respectful booking flows
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative">
          <Image
            src="https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6"
            alt="Local guide thoughtfully preparing meaningful cultural experience for visitors"
            className="rounded-lg shadow-lg object-cover h-full"
            aspectRatio="video"
          />
        </div>
      </div>
    </Card>
  );
};

export default OnlineSalesTab;

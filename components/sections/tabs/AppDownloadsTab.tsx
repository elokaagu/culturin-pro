import { ArrowRight, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "@/components/ui/image";
import { useNavigate } from "../../../lib/navigation";

const AppDownloadsTab = () => {
  const navigate = useNavigate();

  return (
    <Card className="p-8 bg-[#f5f7ff] border-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-2xl font-medium mb-2 text-gray-500">
            Extend your cultural narrative digitally.
          </h3>
          <h2 className="text-3xl font-medium mb-6">
            Culturin transforms your cultural stories into a rich, respectful
            digital experience that honors local traditions.
          </h2>

          <ul className="space-y-3 text-gray-700 mb-8">
            <li className="flex items-start">
              <span className="bg-purple-100 text-purple-800 p-1 rounded-full mr-2">
                ✓
              </span>
              <span>
                <strong>Culturally-authentic digital experiences</strong>
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-purple-100 text-purple-800 p-1 rounded-full mr-2">
                ✓
              </span>
              <span>
                <strong>Community-approved content sharing</strong>
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-purple-100 text-purple-800 p-1 rounded-full mr-2">
                ✓
              </span>
              <span>
                <strong>Respectful, meaningful engagement</strong>
              </span>
            </li>
          </ul>

          <Button
            className="flex items-center gap-2 bg-purple-100 text-purple-800 hover:bg-purple-200"
            onClick={() => navigate("/demo")}
          >
            <Smartphone className="h-4 w-4" />
            Explore cultural storytelling
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative">
          <Image
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
            alt="Travelers respectfully engaging with authentic cultural content on mobile device"
            className="rounded-lg shadow-lg object-cover h-full"
            aspectRatio="video"
          />

          {/* App Usage Stats */}
          <div className="absolute bottom-4 right-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Cultural Engagement</span>
              <span className="text-xs text-purple-600">
                Meaningful vs Surface-level
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span>Deep Cultural Connection</span>
                <span className="font-bold text-purple-600">87% (+31%)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Cultural Learning Time</span>
                <span className="font-bold text-purple-600">
                  14.2 min avg (+62%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AppDownloadsTab;

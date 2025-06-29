
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
          <h3 className="text-2xl font-medium mb-2 text-gray-500">Give your guests an app they'll actually love.</h3>
          <h2 className="text-3xl font-medium mb-6">Culturin turns your stories into a rich digital experience — at their fingertips.</h2>
          
          <ul className="space-y-3 text-gray-700 mb-8">
            <li className="flex items-start">
              <span className="bg-purple-100 text-purple-800 p-1 rounded-full mr-2">✓</span>
              <span><strong>Custom-branded tour app</strong></span>
            </li>
            <li className="flex items-start">
              <span className="bg-purple-100 text-purple-800 p-1 rounded-full mr-2">✓</span>
              <span><strong>Cultural maps + guides</strong></span>
            </li>
            <li className="flex items-start">
              <span className="bg-purple-100 text-purple-800 p-1 rounded-full mr-2">✓</span>
              <span><strong>Smart, respectful notifications</strong></span>
            </li>
          </ul>
          
          <Button 
            className="flex items-center gap-2 bg-purple-100 text-purple-800 hover:bg-purple-200"
            onClick={() => navigate('/demo')}
          >
            <Smartphone className="h-4 w-4" />
            See sample app
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative">
          <Image 
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
            alt="Tourists using a cultural tour mobile app" 
            className="rounded-lg shadow-lg object-cover h-full"
            aspectRatio="video"
          />
          
          {/* App Usage Stats */}
          <div className="absolute bottom-4 right-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Digital Engagement</span>
              <span className="text-xs text-purple-600">Culturin vs Industry Avg</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span>App Open Rate</span>
                <span className="font-bold text-purple-600">87% (+31%)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Content Engagement</span>
                <span className="font-bold text-purple-600">14.2 min avg (+62%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AppDownloadsTab;

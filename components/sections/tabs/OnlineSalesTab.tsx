
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "@/components/ui/image";
import { useNavigate } from "../../../lib/navigation";

const OnlineSalesTab = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="p-8 bg-[#f5f7ff] border-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-2xl font-medium mb-2 text-gray-500">Turn browsers into bookings.</h3>
          <h2 className="text-3xl font-medium mb-6">Culturin's booking system is made for cultural tours — easy, local, and reliable.</h2>
          
          <ul className="space-y-3 text-gray-700 mb-8">
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
              <span><strong>Group-friendly scheduling</strong></span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
              <span><strong>Local payment methods</strong></span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
              <span><strong>Smart abandoned cart recovery</strong></span>
            </li>
          </ul>
          
          <Button 
            className="flex items-center gap-2 bg-green-100 text-green-800 hover:bg-green-200"
            onClick={() => navigate('/demo')}
          >
            <Calendar className="h-4 w-4" />
            See booking flows
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative">
          <Image 
            src="https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6" 
            alt="Guide helping tourists book a cultural experience" 
            className="rounded-lg shadow-lg object-cover h-full"
            aspectRatio="video"
          />
          
          {/* Conversion Rate Comparison */}
          <div className="absolute bottom-4 right-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md">
            <p className="text-sm font-medium text-center mb-2">Conversion Rate Improvement</p>
            <div className="flex items-end justify-between h-16">
              <div className="w-[45%] bg-gray-200 h-6 relative">
                <div className="absolute -top-5 left-0 text-xs">Before</div>
                <div className="absolute -bottom-5 w-full text-center text-xs">2.1%</div>
              </div>
              <div className="w-[45%] bg-green-500 h-14 relative">
                <div className="absolute -top-5 left-0 text-xs">After</div>
                <div className="absolute -bottom-5 w-full text-center text-xs font-bold">8.7%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OnlineSalesTab;

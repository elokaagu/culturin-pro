"use client";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "@/components/ui/image";
import { useNavigate } from "../../../../lib/navigation";

const RepeatOrdersTab = () => {
  const navigate = useNavigate();

  return (
    <Card className="p-8 bg-[#f5f7ff] border-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-2xl font-medium mb-2 text-gray-500">
            Create lasting cultural ambassadors.
          </h3>
          <h2 className="text-3xl font-medium mb-6">
            Build genuine relationships that connect travelers to your community
            long after their visit ends.
          </h2>

          <ul className="space-y-3 text-gray-700 mb-8">
            <li className="flex items-start">
              <span className="bg-amber-100 text-amber-800 p-1 rounded-full mr-2">
                ✓
              </span>
              <span>
                <strong>Cultural journey tracking & growth</strong>
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-amber-100 text-amber-800 p-1 rounded-full mr-2">
                ✓
              </span>
              <span>
                <strong>Community impact recognition</strong>
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-amber-100 text-amber-800 p-1 rounded-full mr-2">
                ✓
              </span>
              <span>
                <strong>Meaningful follow-up connections</strong>
              </span>
            </li>
          </ul>

          <Button
            className="flex items-center gap-2 bg-amber-100 text-amber-800 hover:bg-amber-200"
            onClick={() => navigate("/demo")}
          >
            <Mail className="h-4 w-4" />
            See relationship-building tools
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative">
          <Image
            src="https://images.unsplash.com/photo-1576267423445-b2e0074d68a4"
            alt="Cultural guide maintaining long-term relationships with community-minded travelers"
            className="rounded-lg shadow-lg object-cover h-full"
            aspectRatio="video"
          />

          {/* Repeat Customer Graph */}
          <div className="absolute bottom-4 right-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md">
            <p className="text-sm font-medium mb-2">
              Cultural Ambassador Growth
            </p>
            <div className="flex items-center gap-2">
              <div className="w-full bg-gray-200 h-4 rounded-full">
                <div
                  className="bg-amber-500 h-4 rounded-full"
                  style={{ width: "68%" }}
                ></div>
              </div>
              <span className="text-amber-800 font-bold">+68%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Travelers become lasting advocates for local culture
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RepeatOrdersTab;

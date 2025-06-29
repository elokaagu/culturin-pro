"use client";

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "../../lib/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  PencilRuler,
  ShoppingCart,
  Users,
  ChartBar,
  Settings,
  Crown,
  Megaphone,
  Globe,
  Home,
} from "lucide-react";
import Image from "@/components/ui/image";

const menuItems = [
  { name: "Dashboard", path: "/pro-dashboard", icon: LayoutDashboard },
  {
    name: "Itinerary Builder",
    path: "/pro-dashboard/itinerary",
    icon: PencilRuler,
  },
  {
    name: "Booking System",
    path: "/pro-dashboard/booking",
    icon: ShoppingCart,
  },
  { name: "Guest CRM", path: "/pro-dashboard/crm", icon: Users },
  { name: "Marketing", path: "/pro-dashboard/marketing", icon: Megaphone },
  { name: "Website", path: "/pro-dashboard/website", icon: Globe },
  {
    name: "Central Intelligence",
    path: "/pro-dashboard/analytics",
    icon: ChartBar,
  },
  { name: "Settings", path: "/pro-dashboard/settings", icon: Settings },
];

const ProSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState<string>("Cultural Host");
  const [planType, setplanType] = useState<string>("Growth Plan");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    } else {
      localStorage.setItem("userName", "Jane Doe");
      setUserName("Jane Doe");
    }

    const storedPlanType = localStorage.getItem("planType");
    if (storedPlanType) {
      setplanType(storedPlanType);
    } else {
      localStorage.setItem("planType", "Growth Plan");
      setplanType("Growth Plan");
    }
  }, []);

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col fixed left-0 top-0 font-sans">
      {/* Logo & Header */}
      <div className="p-4 border-b border-gray-100">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="h-14">
            {" "}
            {/* Increased from h-12 to h-14 */}
            <Image
              src="/lovable-uploads/3d2a4fd6-0242-4fb3-bfba-8d3a44eb6e71.png"
              alt="Culturin"
              className="h-full cursor-pointer"
              width={160} /* Increased from 140 to 160 */
              height={56} /* Increased from 48 to 56 */
            />
          </div>
        </button>
        <p className="text-xs text-gray-500 mt-1">
          Cultural Experience Platform
        </p>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-auto py-2">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex w-full items-center gap-2 px-3 py-2 rounded-md text-left transition-colors text-sm",
                location.pathname === item.path
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Plan & Account Section */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <Users className="h-4 w-4 text-gray-700" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-gray-500">{planType}</p>
          </div>
        </div>

        {/* Back to Culturin Home link */}
        <button
          onClick={() => navigate("/")}
          className="mt-4 flex w-full items-center gap-2 px-3 py-2 rounded-md text-left transition-colors text-sm text-blue-600 hover:bg-blue-50 border border-blue-100"
        >
          <Home className="h-4 w-4" />
          <span>Back to Culturin Home</span>
        </button>
      </div>
    </div>
  );
};

export default ProSidebar;

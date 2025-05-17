
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard,
  PencilRuler,
  ShoppingCart,
  Users,
  ChartBar,
  Settings,
  Crown,
  Globe,
  Megaphone
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/pro-dashboard", icon: LayoutDashboard },
  { name: "Itinerary Builder", path: "/pro-dashboard/itinerary", icon: PencilRuler },
  { name: "Booking & Checkout", path: "/pro-dashboard/booking", icon: ShoppingCart },
  { name: "CRM & Automation", path: "/pro-dashboard/crm", icon: Users },
  { name: "Marketing Toolkit", path: "/pro-dashboard/marketing", icon: Megaphone },
  { name: "Business Intelligence", path: "/pro-dashboard/analytics", icon: ChartBar },
  { name: "Settings", path: "/pro-dashboard/settings", icon: Settings }
];

const ProSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState<string>("Cultural Host");
  const [planType, setplanType] = useState<string>("Growth Plan");
  
  // In a real app, this would come from your authentication context
  // For demo purposes, we'll use localStorage
  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
    // For demo purposes, let's store a user name if none exists
    else {
      localStorage.setItem('userName', 'Jane Doe');
      setUserName('Jane Doe');
    }

    const storedPlanType = localStorage.getItem('planType');
    if (storedPlanType) {
      setplanType(storedPlanType);
    }
    else {
      localStorage.setItem('planType', 'Growth Plan');
      setplanType('Growth Plan');
    }
  }, []);
  
  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col fixed left-0 top-0">
      {/* Logo & Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-[#FFD700]" />
          <h1 className="font-medium text-xl">Culturin OS</h1>
        </div>
        <p className="text-xs text-gray-500 mt-1">Cultural Operating System</p>
      </div>
      
      {/* Navigation Items */}
      <div className="flex-1 overflow-auto py-4">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex w-full items-center gap-3 px-3 py-2 rounded-md text-left transition-colors",
                location.pathname === item.path 
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700 hover:bg-gray-50",
                "group"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="truncate">{item.name}</span>
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
      </div>
    </div>
  );
};

export default ProSidebar;


import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Crown, LayoutDashboard, Calendar, Users, ChartBar, Settings, CircleDollarSign, FileText, Image, Link } from "lucide-react";

const menuItems = [
  { name: "Dashboard Overview", path: "/pro-dashboard", icon: LayoutDashboard },
  { name: "Smart Booking Tools", path: "/pro-dashboard/booking", icon: Calendar },
  { name: "CRM for Hosts", path: "/pro-dashboard/crm", icon: Users },
  { name: "Business Analytics", path: "/pro-dashboard/analytics", icon: ChartBar },
  { name: "Marketing Tools", path: "/pro-dashboard/marketing", icon: FileText },
  { name: "Website Builder", path: "/pro-dashboard/website", icon: Image, isAddon: true },
  { name: "Team & Staff", path: "/pro-dashboard/team", icon: Users },
  { name: "Settings", path: "/pro-dashboard/settings", icon: Settings }
];

const ProSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState<string>("Cultural Host");
  
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
  }, []);
  
  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col fixed left-0 top-0">
      {/* Logo & Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-[#FFD700]" />
          <h1 className="font-medium text-xl">Culturin Pro</h1>
        </div>
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
              {item.isAddon && (
                <span className="ml-auto inline-flex items-center rounded-full bg-[#FFEDD1] px-2 py-0.5 text-xs font-medium text-[#996B00]">
                  Add-on
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
      
      {/* User/Account Section */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <Users className="h-4 w-4 text-gray-700" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-gray-500">Growth Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProSidebar;

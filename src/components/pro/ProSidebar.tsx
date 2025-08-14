"use client";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "../../../lib/navigation";
import { cn } from "@/lib/utils";
// Note: localStorage utilities have been replaced with Supabase storage
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
  CreditCard,
} from "lucide-react";
import Image from "@/components/ui/image";
import { useThemeAwareLogo } from "../../hooks/useThemeAwareLogo";

const menuItems = [
  { name: "Dashboard", path: "/pro-dashboard", icon: LayoutDashboard },
  {
    name: "Itineraries",
    path: "/pro-dashboard/itinerary",
    icon: PencilRuler,
  },
  {
    name: "Bookings",
    path: "/pro-dashboard/booking",
    icon: ShoppingCart,
  },
  { name: "Guests", path: "/pro-dashboard/crm", icon: Users },
  { name: "Marketing", path: "/pro-dashboard/marketing", icon: Megaphone },
  { name: "Website", path: "/pro-dashboard/website", icon: Globe },
  {
    name: "Cards",
    path: "/pro-dashboard/cards",
    icon: CreditCard,
  },
  {
    name: "Analytics",
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDarkMode = useThemeAwareLogo();

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    } else {
      localStorage.setItem("userName", "Eloka Agu");
      setUserName("Eloka Agu");
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
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16">
                  <Image
                    src="/lovable-uploads/3d2a4fd6-0242-4fb3-bfba-8d3a44eb6e71.png"
                    alt="Culturin"
                    className={`h-full w-full object-contain cursor-pointer ${
                      isDarkMode ? "brightness-0 invert" : ""
                    }`}
                    width={180}
                    height={64}
                  />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm lg:text-base font-semibold text-gray-900">Culturin Studio</p>
                  <p className="text-xs lg:text-sm text-gray-500">Cultural Experience Platform</p>
                </div>
              </button>
            </div>

            {/* Desktop Navigation Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    location.pathname === item.path
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>

            {/* User Account & Mobile Menu */}
            <div className="flex items-center space-x-3">
              {/* User Info */}
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <Users className="h-4 w-4 text-gray-700" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-500">{planType}</p>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg">
            <div className="px-4 py-2 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors text-sm font-medium",
                    location.pathname === item.path
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </button>
              ))}
              
              {/* Mobile Account Section */}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Users className="h-4 w-4 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{userName}</p>
                    <p className="text-xs text-gray-500">{planType}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    navigate("/");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors text-sm text-blue-600 hover:bg-blue-50 border border-blue-100 mt-2"
                >
                  <Home className="h-4 w-4" />
                  <span>Back to Culturin Home</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default ProSidebar;

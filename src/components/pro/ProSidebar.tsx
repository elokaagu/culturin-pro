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
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-lg shadow-lg border border-gray-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 bottom-0 z-40 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } w-64 bg-white h-full border-r border-gray-200 flex flex-col font-sans`}>
        {/* Logo & Header */}
        <div className="p-4 border-b border-gray-100">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="h-12 sm:h-16">
              <Image
                src="/lovable-uploads/3d2a4fd6-0242-4fb3-bfba-8d3a44eb6e71.png"
                alt="Culturin"
                className={`h-full w-auto object-contain cursor-pointer ${
                  isDarkMode ? "brightness-0 invert" : ""
                }`}
                width={180}
                height={64}
              />
            </div>
          </button>
          <p className="text-xs text-gray-500 mt-1">Culturin Studio</p>
        </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-auto py-2">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                navigate(item.path);
                // Close mobile menu on navigation
                if (window.innerWidth < 768) {
                  setIsMobileMenuOpen(false);
                }
              }}
              className={cn(
                "flex w-full items-center gap-2 px-3 py-2 rounded-md text-left transition-colors text-sm",
                location.pathname === item.path
                  ? "bg-gray-100 text-black"
                  : "text-black hover:bg-gray-50"
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
            <p className="text-sm font-medium text-black">{userName}</p>
            <p className="text-xs text-gray-500">{planType}</p>
          </div>
        </div>

        {/* Back to Culturin Home link */}
        <button
          onClick={() => {
            navigate("/");
            // Close mobile menu on navigation
            if (window.innerWidth < 768) {
              setIsMobileMenuOpen(false);
            }
          }}
          className="mt-4 flex w-full items-center gap-2 px-3 py-2 rounded-md text-left transition-colors text-sm text-blue-600 hover:bg-blue-50 border border-blue-100"
        >
          <Home className="h-4 w-4" />
          <span>Back to Culturin Home</span>
        </button>
      </div>
    </div>
    </>
  );
};

export default ProSidebar;

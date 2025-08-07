"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "../../lib/navigation";
import { useAuthState } from "@/src/hooks/useAuthState";
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
  LogOut,
  ChevronDown,
  BarChart3,
  Calendar,
  Map,
  CreditCard,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Image from "@/components/ui/image";

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
  { name: "Users", path: "/pro-dashboard/users", icon: Users },
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
  const { user, logout, isLoggedIn, isLoading, isReady } = useAuthState();


  // Use authenticated user's name if available, otherwise fallback to localStorage
  const userName = useMemo(() => {
    if (isLoading) {
      return "Loading...";
    }
    
    if (!user) {
      return "Guest";
    }

    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }

    // Extract name from email if no full name available
    if (user?.email) {
      const emailName = user.email.split("@")[0];
      // Convert eloka.agu to "Eloka Agu" or similar
      const formattedName = emailName
        .split(".")
        .map(
          (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        )
        .join(" ");
      return formattedName;
    }

    if (typeof window !== "undefined") {
      const storedUserName = localStorage.getItem("userName");
      if (storedUserName) {
        return storedUserName;
      }
      // Set default if not found
      localStorage.setItem("userName", "User");
      return "User";
    }

    return "User";
  }, [user]);

  const planType = useMemo(() => {
    if (isLoading) {
      return "Loading...";
    }
    
    if (!user) {
      return "No Plan";
    }

    if (typeof window !== "undefined") {
      const storedPlanType = localStorage.getItem("planType");
      if (storedPlanType) {
        return storedPlanType;
      }
      // Set default if not found
      localStorage.setItem("planType", "Growth Plan");
      return "Growth Plan";
    }
    return "Growth Plan";
  }, [user]);

  useEffect(() => {
    // Store the current route for navigation
    if (typeof window !== "undefined") {
      localStorage.setItem("lastRoute", "/pro-dashboard");
    }
  }, [location.pathname]);

  return (
    <div className="w-64 bg-white/95 backdrop-blur-md border-r border-gray-200 h-full flex flex-col fixed left-0 top-0 bottom-0 font-sans shadow-lg">
      {/* Logo & Header */}
      <div className="p-4 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="h-16">
            {" "}
            {/* Increased from h-14 to h-16 */}
            <Image
              src="/lovable-uploads/3d2a4fd6-0242-4fb3-bfba-8d3a44eb6e71.png"
              alt="Culturin"
              className="h-full cursor-pointer"
              width={180} /* Increased from 160 to 180 */
              height={64} /* Increased from 56 to 64 */
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
                "flex w-full items-center gap-2 px-3 py-2 rounded-md text-left transition-all duration-300 text-sm font-medium",
                location.pathname === item.path
                  ? "glass-active text-white shadow-lg bg-white/20"
                  : "text-gray-800 hover:glass-hover hover:text-gray-900 hover:bg-white/10"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Plan & Account Section */}
      <div className="p-4 border-t border-gray-200 bg-white/90 backdrop-blur-sm">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center gap-2 p-2 rounded-md glass-hover transition-all duration-300">
            <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
              <Users className="h-4 w-4 text-gray-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-800">{userName}</p>
              <p className="text-xs text-gray-600">{planType}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-600" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mb-2">
            <div className="px-3 py-2 text-sm text-gray-500">
              {isLoading ? "Loading..." : (user?.email || "Not signed in")}
            </div>
            <div className="px-3 py-1 text-xs text-gray-400 capitalize">
              {isLoading ? "Loading..." : (user ? (user.role === "admin" ? "Admin" : "User") : "Guest")} •
              Studio Access
            </div>
            <DropdownMenuSeparator />
            {user?.role === "admin" && (
              <DropdownMenuItem onClick={() => navigate("/admin")}>
                <Crown className="h-4 w-4 mr-2" />
                Admin Dashboard
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() => navigate("/pro-dashboard/settings")}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await logout();
                navigate("/");
              }}
              className="text-red-600"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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

"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "../../lib/navigation";
import { useAuth } from "../../src/components/auth/AuthProvider";
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
  const { user, logout } = useAuth();
  // Use authenticated user's name if available, otherwise fallback to localStorage
  const userName = useMemo(() => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }

    // Extract name from email if no full name available
    if (user?.email) {
      const emailName = user.email.split('@')[0];
      // Convert eloka.agu to "Eloka Agu" or similar
      const formattedName = emailName
        .split('.')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ');
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
  }, []);

  useEffect(() => {
    // Store the current route for navigation
    if (typeof window !== "undefined") {
      localStorage.setItem("lastRoute", "/pro-dashboard");
    }
  }, [location.pathname]);

  return (
    <div className="w-64 glass-sidebar h-full flex flex-col fixed left-0 top-0 bottom-0 font-sans">
      {/* Logo & Header */}
      <div className="p-4 border-b border-white/20 glass-light rounded-none">
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
                "flex w-full items-center gap-2 px-3 py-2 rounded-md text-left transition-all duration-300 text-sm",
                location.pathname === item.path
                  ? "glass-active text-white shadow-lg"
                  : "text-white/80 hover:glass-hover hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Plan & Account Section */}
      <div className="p-4 border-t border-white/20 glass-light rounded-none">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center gap-2 p-2 rounded-md glass-hover transition-all duration-300">
            <div className="w-8 h-8 rounded-full glass-card flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-white">{userName}</p>
              <p className="text-xs text-white/60">{planType}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-white/60" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mb-2">
            <div className="px-3 py-2 text-sm text-gray-500">
              {user?.email || "Not signed in"}
            </div>
            <div className="px-3 py-1 text-xs text-gray-400 capitalize">
              {user?.role === "admin" ? "Admin" : "User"} • Studio Access
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
            <DropdownMenuItem onClick={logout} className="text-red-600">
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

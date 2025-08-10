"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "../../lib/navigation";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
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
  Moon,
  Sun,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Image from "@/components/ui/image";
import { ThemeAwareImage } from "@/components/ui/theme-aware-image";

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
    name: "Analytics",
    path: "/pro-dashboard/analytics",
    icon: ChartBar,
  },
  { name: "Settings", path: "/pro-dashboard/settings", icon: Settings },
];

const ProSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isLoading, isReady } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // Client-side hydration fix
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Redirect to home if not authenticated
  useEffect(() => {
    // Only redirect if auth is ready and we definitely have no user
    if (isReady && !isLoading && !user) {
      console.log("No authenticated user, redirecting to home");
      // Add a small delay to ensure auth state is stable
      const timer = setTimeout(() => {
        navigate("/");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isReady, isLoading, user, navigate]);

  // Use authenticated user's name if available
  const userName = useMemo(() => {
    if (!user) return "";

    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }

    // Extract name from email
    if (user?.email) {
      const emailName = user.email.split("@")[0];
      // Convert eloka.agu to "Eloka Agu"
      return emailName
        .split(".")
        .map(
          (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        )
        .join(" ");
    }

    return "";
  }, [user]);

  const planType = useMemo(() => {
    if (!user) return "";

    // Default to Growth Plan if no specific plan is set
    return "Growth Plan";
  }, [user]);

  useEffect(() => {
    // Store the current route for navigation
    if (typeof window !== "undefined") {
      localStorage.setItem("lastRoute", "/pro-dashboard");
    }
  }, [location.pathname]);

  return (
    <div className="w-64 bg-background border-r border-border h-full flex flex-col fixed left-0 top-0 bottom-0 font-sans shadow-lg theme-transition">
      {/* Logo & Header */}
      <div className="p-4 border-b border-border bg-background theme-transition">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="h-16">
            {" "}
            {/* Increased from h-14 to h-16 */}
            <ThemeAwareImage
              src="/lovable-uploads/3d2a4fd6-0242-4fb3-bfba-8d3a44eb6e71.png"
              alt="Culturin"
              className="h-full w-auto cursor-pointer"
              width={180} /* Increased from 160 to 180 */
              height={64} /* Increased from 56 to 64 */
            />
          </div>
        </button>
        <p className="text-xs text-muted-foreground mt-1">
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
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Plan & Account Section */}
      <div className="p-4 border-t border-border bg-background theme-transition">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center gap-2 p-2 rounded-md hover:bg-accent transition-all duration-300">
            <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center">
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-foreground">{userName}</p>
              <p className="text-xs text-muted-foreground">{planType}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mb-2 glass-card border-border/50">
            <div className="px-3 py-2 text-sm text-muted-foreground">
              {user?.email || ""}
            </div>
            <div className="px-3 py-1 text-xs text-muted-foreground/70 capitalize">
              {user ? (user.role === "admin" ? "Admin" : "User") : ""} • Studio
              Access
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
            {isMounted && (
              <DropdownMenuItem onClick={toggleTheme}>
                {theme === "light" ? (
                  <Moon className="h-4 w-4 mr-2 text-blue-400" />
                ) : (
                  <Sun className="h-4 w-4 mr-2 text-yellow-500" />
                )}
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </DropdownMenuItem>
            )}
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
          className="mt-4 flex w-full items-center gap-2 px-3 py-2 rounded-md text-left transition-colors text-sm text-primary hover:bg-primary/10 border border-primary/20"
        >
          <Home className="h-4 w-4" />
          <span>Back to Culturin Home</span>
        </button>
      </div>
    </div>
  );
};

export default ProSidebar;

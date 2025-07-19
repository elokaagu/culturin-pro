"use client";

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "../lib/navigation";
import { useAuth } from "../src/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Image from "@/components/ui/image";
import TranslatableText from "./TranslatableText";

interface HeaderProps {
  type: "traveler" | "operator" | "default";
}

export const Header = ({ type = "default" }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoggedIn, isAdmin, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const productLinks = [
    {
      title: "Analytics Dashboard",
      description: "Track performance with real-time data",
      path: "/product/analytics",
    },
    {
      title: "Booking Management",
      description: "Streamline guest reservations",
      path: "/product/booking-management",
    },
    {
      title: "Guest CRM",
      description: "Manage customer relationships",
      path: "/product/crm",
    },
    {
      title: "Marketing Tools",
      description: "Promote your experiences",
      path: "/product/marketing",
    },
  ];

  return (
    <header className="sticky top-0 w-full z-[60] bg-gradient-to-r from-white/80 via-white/70 to-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 transition-all duration-300 supports-[backdrop-filter]:bg-white/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center"
              onClick={() => navigate("/")}
            >
              <div className="h-20 mr-2">
                {" "}
                {/* Increased height from h-16 to h-20 */}
                <Image
                  src="/lovable-uploads/3d2a4fd6-0242-4fb3-bfba-8d3a44eb6e71.png"
                  alt="Culturin"
                  className="h-full cursor-pointer"
                  width={220} /* Increased from 180 to 220 */
                  height={80} /* Increased from 64 to 80 */
                />
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <nav>
              <ul className="flex space-x-10">
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center font-medium text-gray-800 hover:text-gray-600 transition-colors focus:outline-none">
                      <TranslatableText text="Product" />{" "}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64 bg-white/90 backdrop-blur-lg shadow-xl rounded-md p-2 z-[9999] border border-white/20">
                      {productLinks.map((item, index) => (
                        <DropdownMenuItem key={index} asChild>
                          <Link
                            to={item.path}
                            className="flex items-start p-3 rounded-md hover:bg-gray-100"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">
                                <TranslatableText text={item.title} />
                              </span>
                              <span className="text-xs text-gray-500">
                                <TranslatableText text={item.description} />
                              </span>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="font-medium text-gray-800 hover:text-gray-600 transition-colors"
                  >
                    <TranslatableText text="Pricing" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/how-it-works"
                    className="font-medium text-gray-800 hover:text-gray-600 transition-colors"
                  >
                    <TranslatableText text="How it works" />
                  </Link>
                </li>
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center font-medium text-gray-800 hover:text-gray-600 transition-colors focus:outline-none">
                      <TranslatableText text="Company" />{" "}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 bg-white/90 backdrop-blur-lg shadow-xl rounded-md p-2 z-[9999] border border-white/20">
                      <DropdownMenuItem asChild>
                        <Link
                          to="/our-story"
                          className="flex items-start p-3 rounded-md hover:bg-gray-100"
                        >
                          <span className="font-medium">
                            <TranslatableText text="Our Story" />
                          </span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          to="/careers"
                          className="flex items-start p-3 rounded-md hover:bg-gray-100"
                        >
                          <span className="font-medium">
                            <TranslatableText text="Careers" />
                          </span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          to="/press"
                          className="flex items-start p-3 rounded-md hover:bg-gray-100"
                        >
                          <span className="font-medium">
                            <TranslatableText text="Press" />
                          </span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center font-medium text-gray-800 hover:text-gray-600 transition-colors focus:outline-none">
                      <TranslatableText text="Resources" />{" "}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 bg-white/90 backdrop-blur-lg shadow-xl rounded-md p-2 z-[9999] border border-white/20">
                      <DropdownMenuItem asChild>
                        <Link
                          to="/blog"
                          className="flex items-start p-3 rounded-md hover:bg-gray-100"
                        >
                          <span className="font-medium">
                            <TranslatableText text="Blog" />
                          </span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          to="/help-center"
                          className="flex items-start p-3 rounded-md hover:bg-gray-100"
                        >
                          <span className="font-medium">
                            <TranslatableText text="Help Center" />
                          </span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          to="/case-studies"
                          className="flex items-start p-3 rounded-md hover:bg-gray-100"
                        >
                          <span className="font-medium">
                            <TranslatableText text="Case Studies" />
                          </span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              {isLoggedIn && user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt={
                          user.user_metadata?.full_name || user.email || "User"
                        }
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <User className="w-6 h-6" />
                    )}
                    <span className="font-medium">
                      {user.user_metadata?.full_name?.split(" ")[0] ||
                        user.email?.split("@")[0] ||
                        "User"}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white/90 backdrop-blur-lg rounded-md shadow-xl py-2 z-50 border border-white/20">
                      <div className="px-3 py-2 border-b border-gray-100">
                        <div className="text-sm font-medium text-gray-800">
                          {user.user_metadata?.full_name?.split(" ")[0] ||
                            user.email?.split("@")[0] ||
                            "User"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.email}
                        </div>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/studio"
                          className="flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Culturin Studio
                        </Link>
                        {isAdmin && (
                          <Link
                            to="/admin"
                            className="flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <Link
                          to="/settings"
                          className="flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Settings
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/sign-in"
                    className="font-medium text-gray-800 hover:text-gray-600 transition-colors"
                  >
                    <TranslatableText text="Login" />
                  </Link>

                  <Button
                    className="bg-blue-600 hover:bg-blue-700 font-medium"
                    onClick={() => navigate("/demo")}
                  >
                    <TranslatableText text="Get a free demo" />
                  </Button>
                </>
              )}
            </div>
          </div>

          <button
            className="md:hidden p-2 text-gray-800"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/90 backdrop-blur-lg shadow-xl z-[9999] animate-fade-in border-b border-white/20">
          <nav className="py-4 px-6">
            <ul className="space-y-2">
              <li className="py-2">
                <button className="flex items-center justify-between w-full font-medium text-gray-800">
                  <span>Product</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-100">
                  {productLinks.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block py-1 text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="block py-2 font-medium text-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="block py-2 font-medium text-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How it works
                </Link>
              </li>

              <li className="py-2">
                <button className="flex items-center justify-between w-full font-medium text-gray-800">
                  <span>Company</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-100">
                  <Link
                    to="/our-story"
                    className="block py-1 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Our Story
                  </Link>
                  <Link
                    to="/careers"
                    className="block py-1 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Careers
                  </Link>
                  <Link
                    to="/press"
                    className="block py-1 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Press
                  </Link>
                </div>
              </li>

              <li className="py-2">
                <button className="flex items-center justify-between w-full font-medium text-gray-800">
                  <span>Resources</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-100">
                  <Link
                    to="/blog"
                    className="block py-1 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link
                    to="/help-center"
                    className="block py-1 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Help Center
                  </Link>
                  <Link
                    to="/case-studies"
                    className="block py-1 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Case Studies
                  </Link>
                </div>
              </li>

              <li className="pt-2 border-t border-gray-100 mt-2">
                {isLoggedIn && user ? (
                  <div className="space-y-2">
                    <div className="py-2">
                      <div className="text-sm font-medium text-gray-800">
                        {user.user_metadata?.full_name?.split(" ")[0] ||
                          user.email?.split("@")[0] ||
                          "User"}
                      </div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                    <Link
                      to="/studio"
                      className="block py-2 font-medium text-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Culturin Studio
                    </Link>
                    <Link
                      to="/settings"
                      className="block py-2 font-medium text-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="block py-2 font-medium text-gray-800"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 font-medium text-gray-800"
                    >
                      <LogOut className="inline w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/sign-in"
                      className="block py-2 font-medium text-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-sm mt-2"
                      onClick={() => {
                        navigate("/demo");
                        setIsMenuOpen(false);
                      }}
                    >
                      Get a free demo
                    </Button>
                  </>
                )}
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

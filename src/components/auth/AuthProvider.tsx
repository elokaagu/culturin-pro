"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasStudioAccess: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // During SSG, return default values instead of throwing
    if (typeof window === "undefined") {
      return {
        user: null,
        isLoggedIn: false,
        login: async () => {},
        logout: () => {},
        hasStudioAccess: false,
        isLoading: true,
      };
    }
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasStudioAccess, setHasStudioAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("culturin_user");
      const studioAccess = localStorage.getItem("culturinProAccess");

      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsLoggedIn(true);
          setHasStudioAccess(studioAccess === "true");
        } catch (error) {
          console.error("Error parsing stored user data:", error);
          localStorage.removeItem("culturin_user");
          localStorage.removeItem("culturinProAccess");
        }
      }
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // Simulate login - in real app, this would be an API call
    const userData: User = {
      id: "1",
      name: "Eloka Agu",
      email: email,
      avatar: "/eloka-agu-headshot.png",
    };

    setUser(userData);
    setIsLoggedIn(true);
    setHasStudioAccess(true);

    // Store user data and grant studio access
    if (typeof window !== "undefined") {
      localStorage.setItem("culturin_user", JSON.stringify(userData));
      localStorage.setItem("culturinProAccess", "true");
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setHasStudioAccess(false);

    if (typeof window !== "undefined") {
      localStorage.removeItem("culturin_user");
      localStorage.removeItem("culturinProAccess");
    }
  };

  const value: AuthContextType = {
    user,
    isLoggedIn,
    login,
    logout,
    hasStudioAccess,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

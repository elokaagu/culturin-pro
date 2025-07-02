"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasStudioAccess: boolean;
  isAdmin: boolean;
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
        isAdmin: false,
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
          // Clean up invalid data
          localStorage.removeItem("culturin_user");
          localStorage.removeItem("culturinProAccess");
        }
      }
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // Validate credentials
    const validCredentials = [
      {
        email: "eloka.agu@icloud.com",
        password: "Honour18!!",
        name: "Eloka Agu",
        role: "admin" as const,
      },
      {
        email: "demo@culturin.com",
        password: "demo123",
        name: "Demo User",
        role: "user" as const,
      },
    ];

    const validUser = validCredentials.find(
      (cred) => cred.email === email && cred.password === password
    );

    if (!validUser) {
      throw new Error(
        "Invalid email or password. Please check your credentials and try again."
      );
    }

    const userData: User = {
      id: validUser.email === "eloka.agu@icloud.com" ? "1" : "2",
      name: validUser.name,
      email: validUser.email,
      role: validUser.role,
      avatar:
        validUser.email === "eloka.agu@icloud.com"
          ? "/eloka-agu-headshot.png"
          : undefined,
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
    isAdmin: user?.role === "admin",
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

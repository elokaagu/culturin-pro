"use client";

import React, { createContext, useContext } from "react";
import { useAuth as useSupabaseAuth } from "@/hooks/useAuth";

interface AuthContextType {
  user: any;
  isLoggedIn: boolean;
  isLoading: boolean;
  hasStudioAccess: boolean;
  isAdmin: boolean;
  isReady: boolean;
  userData: any;
  login: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (
    email: string,
    password: string,
    metadata?: any
  ) => Promise<{ error: any }>;
  logout: () => Promise<{ error: any }>;
  updateUserPreferences: (preferences: any) => Promise<void>;
  updateUserSettings: (settings: any) => Promise<void>;
  refreshUserData: () => Promise<void>;
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
        isLoading: true,
        hasStudioAccess: false,
        isAdmin: false,
        isReady: false,
        userData: null,
        login: async () => ({ error: null }),
        signUp: async () => ({ error: null }),
        logout: async () => ({ error: null }),
        updateUserPreferences: async () => {},
        updateUserSettings: async () => {},
        refreshUserData: async () => {},
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
  const auth = useSupabaseAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

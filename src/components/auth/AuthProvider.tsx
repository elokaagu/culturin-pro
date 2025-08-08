"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useAuth as useSupabaseAuth } from "@/hooks/useAuth";

// Create context with proper typing
const AuthContext = createContext<ReturnType<typeof useSupabaseAuth> | null>(
  null
);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    // Handle SSR gracefully
    if (typeof window === "undefined") {
      return {
        user: null,
        session: null,
        userData: null,
        isLoading: true,
        isReady: false,
        isLoggedIn: false,
        isAdmin: false,
        hasStudioAccess: false,
        login: async () => ({ error: null }),
        signUp: async () => ({ error: null }),
        logout: async () => ({ error: null }),
        refreshUserData: async () => {},
      };
    }

    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useSupabaseAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

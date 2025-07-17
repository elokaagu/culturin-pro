"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth as useSupabaseAuth } from "@/hooks/useSupabase";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (
    email: string,
    password: string,
    metadata?: any
  ) => Promise<{ error: any }>;
  logout: () => Promise<{ error: any }>;
  hasStudioAccess: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  resetPassword: (email: string) => Promise<{ error: any }>;
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
        login: async () => ({ error: null }),
        signUp: async () => ({ error: null }),
        logout: async () => ({ error: null }),
        hasStudioAccess: false,
        isAdmin: false,
        isLoading: true,
        resetPassword: async () => ({ error: null }),
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
  const { user, session, loading, signIn, signUp, signOut } = useSupabaseAuth();
  const [hasStudioAccess, setHasStudioAccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check user permissions when user changes
    if (user) {
      checkUserPermissions(user);
    } else {
      setHasStudioAccess(false);
      setIsAdmin(false);
    }
  }, [user]);

  const checkUserPermissions = async (user: User) => {
    try {
      // Check if user has a user record with admin or studio access
      const { data: userData, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching user data:", error);
      }

      // For now, grant studio access to all authenticated users
      setHasStudioAccess(true);
      setIsAdmin(
        userData?.role === "admin" || user.email === "eloka.agu@icloud.com"
      );
    } catch (error) {
      console.error("Error checking user permissions:", error);
      setHasStudioAccess(true);
      setIsAdmin(false);
    }
  };

  const login = async (email: string, password: string) => {
    return await signIn(email, password);
  };

  const logout = async () => {
    return await signOut();
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    return { error };
  };

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    login,
    signUp,
    logout,
    hasStudioAccess,
    isAdmin,
    isLoading: loading,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

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
  const [useMockAuth, setUseMockAuth] = useState(false);

  // Check if Supabase is properly configured
  useEffect(() => {
    const checkSupabaseConfig = async () => {
      try {
        // Test if we can access the auth system
        const { data, error } = await supabase.auth.getSession();
        if (error && error.message.includes("Invalid API key")) {
          console.warn(
            "Supabase not properly configured, falling back to mock auth"
          );
          setUseMockAuth(true);
        }
      } catch (err) {
        console.warn("Supabase connection failed, falling back to mock auth");
        setUseMockAuth(true);
      }
    };

    checkSupabaseConfig();
  }, []);

  useEffect(() => {
    // Check user permissions when user changes
    if (user && !useMockAuth) {
      checkUserPermissions(user);
    } else if (useMockAuth) {
      // Mock auth fallback
      setHasStudioAccess(true);
      setIsAdmin(user?.email === "eloka.agu@icloud.com");
    } else {
      setHasStudioAccess(false);
      setIsAdmin(false);
    }
  }, [user, useMockAuth]);

  const checkUserPermissions = async (user: User) => {
    try {
      // Check if user has a profile with admin or studio access
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching user profile:", error);
      }

      // For now, grant studio access to all authenticated users
      // You can modify this logic based on your requirements
      setHasStudioAccess(true);
      setIsAdmin(
        profile?.role === "admin" || user.email === "eloka.agu@icloud.com"
      );
    } catch (error) {
      console.error("Error checking user permissions:", error);
      // Default to granting studio access
      setHasStudioAccess(true);
      setIsAdmin(false);
    }
  };

  const login = async (email: string, password: string) => {
    if (useMockAuth) {
      // Mock authentication fallback
      const validCredentials = [
        { email: "eloka.agu@icloud.com", password: "Honour18!!" },
        { email: "demo@culturin.com", password: "demo123" },
      ];

      const validUser = validCredentials.find(
        (cred) => cred.email === email && cred.password === password
      );

      if (!validUser) {
        return { error: { message: "Invalid email or password" } };
      }

      // Simulate successful login
      return { error: null };
    }

    return await signIn(email, password);
  };

  const logout = async () => {
    if (useMockAuth) {
      // Mock logout
      return { error: null };
    }
    return await signOut();
  };

  const resetPassword = async (email: string) => {
    if (useMockAuth) {
      return {
        error: { message: "Password reset not available in demo mode" },
      };
    }
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

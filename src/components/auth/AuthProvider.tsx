"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { useAuth as useSupabaseAuth } from "@/hooks/useSupabase";
import { supabase } from "@/lib/supabase";

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: any }>;
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
    // Return default values instead of throwing to prevent crashes
    console.warn(
      "useAuth must be used within an AuthProvider, returning default values"
    );
    return {
      user: null,
      isLoggedIn: false,
      login: async () => ({ error: null }),
      signUp: async () => ({ error: null }),
      logout: async () => ({ error: null }),
      hasStudioAccess: false,
      isAdmin: false,
      isLoading: false,
      resetPassword: async () => ({ error: null }),
    };
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
      // Trigger data loading for authenticated users
      loadUserData(user);
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

      // Grant studio access to all authenticated users
      setHasStudioAccess(true);
      
      // Check if user is admin based on email or database role
      const isAdminUser = userData?.role === "admin" || 
                         user.email === "eloka.agu@icloud.com" ||
                         user.email === "eloka@satellitelabs.xyz";
      setIsAdmin(isAdminUser);
    } catch (error) {
      console.error("Error checking user permissions:", error);
      setHasStudioAccess(true);
      setIsAdmin(false);
    }
  };

  const loadUserData = async (user: User) => {
    try {
      // Ensure user record exists in database
      await ensureUserRecord(user);
      
      // Trigger loading of user-specific data
      // This will be picked up by the useItineraries hook and other data hooks
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("userAuthenticated", {
            detail: { user }
          })
        );
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const ensureUserRecord = async (user: User) => {
    try {
      // Check if user record exists
      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("id, email, role")
        .eq("id", user.id)
        .single();

      if (fetchError && fetchError.code === "PGRST116") {
        // User doesn't exist, create record with proper admin detection
        const isAdminUser = user.email === "eloka.agu@icloud.com" || 
                           user.email === "eloka@satellitelabs.xyz";
        
        const { error: insertError } = await supabase
          .from("users")
          .insert({
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || null,
            first_name: user.user_metadata?.first_name || null,
            last_name: user.user_metadata?.last_name || null,
            role: isAdminUser ? "admin" : "user",
            studio_access: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });

        if (insertError) {
          console.error("Error creating user record:", insertError);
        } else {
          console.log(`✅ Created user record for ${user.email} with role: ${isAdminUser ? "admin" : "user"}`);
        }
      } else if (existingUser) {
        console.log(`✅ User record exists for ${user.email} with role: ${existingUser.role}`);
      }
    } catch (error) {
      console.error("Error ensuring user record:", error);
    }
  };

  const login = async (email: string, password: string) => {
    const result = await signIn(email, password);
    return result;
  };

  const logout = async () => {
    try {
      // Clear any cached data
      if (typeof window !== "undefined") {
        // Clear user-specific localStorage data
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (key.startsWith('culturinItineraries_') || 
                     key.startsWith('publishedWebsiteUrl_') ||
                     key.startsWith('websiteData_'))) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));

        // Dispatch logout event
        window.dispatchEvent(new CustomEvent("userLoggedOut"));
      }

      return await signOut();
    } catch (error) {
      console.error("Error during logout:", error);
      return { error };
    }
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
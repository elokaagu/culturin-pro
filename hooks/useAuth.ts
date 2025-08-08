"use client";

import { useState, useEffect, useCallback } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface UserData {
  id: string;
  email: string;
  full_name?: string;
  role?: string;
  studio_access?: boolean;
  preferences?: Record<string, any>;
  settings?: Record<string, any>;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  userData: UserData | null;
  isLoading: boolean;
  isReady: boolean;
}

const USER_DATA_KEY = "culturin-user-data";

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    userData: null,
    isLoading: true,
    isReady: false,
  });

  // Load user data from database
  const loadUserData = useCallback(async (user: User) => {
    try {
      // Check cache first
      const cachedData = sessionStorage.getItem(USER_DATA_KEY);
      if (cachedData) {
        try {
          const parsed = JSON.parse(cachedData);
          if (parsed.id === user.id) {
            setState((prev) => ({
              ...prev,
              userData: parsed,
            }));
            return;
          }
        } catch (e) {
          // Invalid cache, remove it
          sessionStorage.removeItem(USER_DATA_KEY);
        }
      }

      // Fetch from database
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching user data:", error);
        return;
      }

      if (data) {
        // Cache the result
        sessionStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
        setState((prev) => ({
          ...prev,
          userData: data,
        }));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }, []);

  // Initialize authentication state
  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        console.log("Initializing authentication...");
        
        // Check what's in localStorage for debugging
        if (typeof window !== "undefined") {
          const localStorageKeys = Object.keys(localStorage);
          const sessionKeys = localStorageKeys.filter(key => key.includes('supabase'));
          console.log("Supabase localStorage keys:", sessionKeys);
        }
        
        // Get current session
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session:", error);
        }

        console.log("Initial session check:", session ? "Session found" : "No session");
        if (session) {
          console.log("Session expires at:", session.expires_at);
          console.log("Session user:", session.user?.email);
        }

        if (mounted) {
          setState({
            user: session?.user || null,
            session: session,
            userData: null,
            isLoading: false,
            isReady: true,
          });

          // Load user data if we have a user
          if (session?.user) {
            console.log("Loading user data for:", session.user.email);
            await loadUserData(session.user);
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        if (mounted) {
          setState({
            user: null,
            session: null,
            userData: null,
            isLoading: false,
            isReady: true,
          });
        }
      }
    };

    initAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email, "at", new Date().toISOString());

      if (mounted) {
        console.log("Setting state for event:", event);
        
        // Don't clear user data on INITIAL_SESSION if we already have a user
        if (event === "INITIAL_SESSION" && !session && state.user) {
          console.log("Ignoring INITIAL_SESSION with no session - keeping existing user");
          return;
        }
        
        // Update state immediately
        setState((prev) => ({
          ...prev,
          user: session?.user || null,
          session: session,
          userData: null, // Reset user data, will be loaded if needed
          isLoading: false,
          isReady: true,
        }));

        if (session?.user) {
          console.log("Loading user data after auth change for:", session.user.email);
          await loadUserData(session.user);
        } else if (event !== "INITIAL_SESSION") {
          // Only clear data on actual logout, not initial session check
          console.log("Clearing user data - no session at", new Date().toISOString());
          sessionStorage.removeItem(USER_DATA_KEY);
        }
      } else {
        console.log("Component unmounted, ignoring auth change");
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadUserData]);

  // Authentication methods
  const login = useCallback(async (email: string, password: string) => {
    console.log("Attempting login for:", email);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error("Login error:", error);
    } else {
      console.log("Login successful for:", email);
    }
    
    return { error };
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, metadata?: any) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: metadata ? { data: metadata } : undefined,
      });
      return { error };
    },
    []
  );

  const logout = useCallback(async () => {
    console.log("Logging out user");
    // Clear cached data
    sessionStorage.removeItem(USER_DATA_KEY);

    const { error } = await supabase.auth.signOut();
    return { error };
  }, []);

  const refreshUserData = useCallback(async () => {
    if (state.user) {
      // Clear cache to force fresh fetch
      sessionStorage.removeItem(USER_DATA_KEY);
      await loadUserData(state.user);
    }
  }, [state.user, loadUserData]);

  // Computed values
  const isLoggedIn = !!state.user;
  const isAdmin = state.userData?.role === "admin";
  const hasStudioAccess = !!state.userData?.studio_access;

  return {
    ...state,
    isLoggedIn,
    isAdmin,
    hasStudioAccess,
    login,
    signUp,
    logout,
    refreshUserData,
  };
}

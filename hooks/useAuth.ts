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
        // Get current session
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session:", error);
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
      console.log("Auth state changed:", event);

      if (mounted) {
        setState({
          user: session?.user || null,
          session: session,
          userData: null,
          isLoading: false,
          isReady: true,
        });

        if (session?.user) {
          await loadUserData(session.user);
        } else {
          // Clear cached data on logout
          sessionStorage.removeItem(USER_DATA_KEY);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadUserData]);

  // Authentication methods
  const login = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
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

"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { User, Session } from "@supabase/supabase-js";

export interface AuthState {
  user: User | null;
  session: Session | null;
  userData: any | null;
  isLoading: boolean;
  isReady: boolean;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    userData: null,
    isLoading: true,
    isReady: false,
  });

  // Load user data from Supabase
  const loadUserData = useCallback(async (user: User) => {
    try {
      console.log("Loading user data for:", user.email);

      // Fetch user data from Supabase users table
      const { data: userData, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error loading user data:", error);
        return;
      }

      console.log("User data loaded:", userData);
      setState((prev) => ({ ...prev, userData }));
    } catch (error) {
      console.error("Error in loadUserData:", error);
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
          const sessionKeys = localStorageKeys.filter((key) =>
            key.includes("supabase")
          );
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

        console.log(
          "Initial session check:",
          session ? "Session found" : "No session"
        );
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
            try {
              const { data: userData, error } = await supabase
                .from("users")
                .select("*")
                .eq("id", session.user.id)
                .single();

              if (error) {
                console.error("Error loading user data:", error);
              } else {
                console.log("User data loaded:", userData);
                setState((prev) => ({ ...prev, userData }));
              }
            } catch (error) {
              console.error("Error in loadUserData:", error);
            }
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

    // Add a timeout failsafe to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (mounted) {
        console.warn("Auth initialization timeout - forcing ready state");
        setState((prev) => ({
          ...prev,
          isLoading: false,
          isReady: true,
        }));
      }
    }, 5000); // 5 second timeout

    initAuth().finally(() => {
      clearTimeout(timeoutId);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(
        "Auth state changed:",
        event,
        session?.user?.email,
        "at",
        new Date().toISOString()
      );

      if (mounted) {
        console.log("Setting state for event:", event);

        // Don't clear user data on INITIAL_SESSION if we already have a user
        if (event === "INITIAL_SESSION" && !session && state.user) {
          console.log(
            "Ignoring INITIAL_SESSION with no session - keeping existing user"
          );
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
          console.log(
            "Loading user data after auth change for:",
            session.user.email
          );
          try {
            const { data: userData, error } = await supabase
              .from("users")
              .select("*")
              .eq("id", session.user.id)
              .single();

            if (error) {
              console.error("Error loading user data:", error);
            } else {
              console.log("User data loaded:", userData);
              setState((prev) => ({ ...prev, userData }));
            }
          } catch (error) {
            console.error("Error loading user data:", error);
          }
        } else if (event !== "INITIAL_SESSION") {
          // Only clear data on actual logout, not initial session check
          console.log(
            "Clearing user data - no session at",
            new Date().toISOString()
          );
        }
      } else {
        console.log("Component unmounted, ignoring auth change");
      }
    });

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []); // Remove loadUserData dependency to prevent infinite loops

  // Login function
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

  // Sign up function
  const signUp = useCallback(async (email: string, password: string) => {
    console.log("Attempting sign up for:", email);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.error("Sign up error:", error);
    } else {
      console.log("Sign up successful for:", email);
    }
    return { error };
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    console.log("Attempting logout");
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error);
    } else {
      console.log("Logout successful");
    }
    return { error };
  }, []);

  // Computed properties
  const isLoggedIn = !!state.user;
  const isLoading = state.isLoading;
  const isReady = state.isReady;

  return {
    user: state.user,
    session: state.session,
    userData: state.userData,
    isLoading,
    isReady,
    isLoggedIn,
    login,
    signUp,
    logout,
    loadUserData,
  };
};

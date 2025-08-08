"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

const SESSION_STORAGE_KEY = "supabase.auth.token";
const AUTH_EVENT_KEY = "supabase.auth.event";
const USER_DATA_KEY = "user-data";
const USER_PERMISSIONS_KEY = "user-permissions";

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
  isLoading: boolean;
  isAdmin: boolean;
  hasStudioAccess: boolean;
  userData: UserData | null;
  isReady: boolean;
}

// Create a singleton instance for auth state
let authState: AuthState = {
  user: null,
  session: null,
  isLoading: true,
  isAdmin: false,
  hasStudioAccess: false,
  userData: null,
  isReady: false,
};

let listeners: Set<(state: AuthState) => void> = new Set();

const updateState = (newState: Partial<AuthState>) => {
  authState = { ...authState, ...newState };
  listeners.forEach((listener) => listener(authState));
};

export function useAuth() {
  const [state, setState] = useState<AuthState>(authState);

  useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  const loadUserData = useCallback(async (user: User) => {
    try {
      // Ensure we have a valid session first
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        // Session not available yet, this is normal during auth flow
        return;
      }

      // Try to get from cache first
      const cachedData = sessionStorage.getItem(USER_DATA_KEY);
      if (cachedData) {
        const parsed = JSON.parse(cachedData);
        if (parsed.id === user.id) {
          updateState({ userData: parsed });
          return;
        }
      }

      // Fetch fresh data with proper headers
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching user data:", error);
        // Don't throw, just log the error
        return;
      }

      if (data) {
        // Cache the result
        sessionStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
        updateState({
          userData: data,
          isAdmin: data.role === "admin",
          hasStudioAccess: !!data.studio_access,
        });
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }, []);

  const initSession = useCallback(async () => {
    try {
      // Try to recover session from storage first
      const storedSession = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (storedSession) {
        const session = JSON.parse(storedSession);
        if (session.expires_at && new Date(session.expires_at) > new Date()) {
          updateState({
            session,
            user: session.user,
            isLoading: false,
          });
          await loadUserData(session.user);
          return;
        }
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
      }

      // Get fresh session
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      if (session) {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
        updateState({
          session,
          user: session.user,
          isLoading: false,
        });
        await loadUserData(session.user);
      } else {
        updateState({
          session: null,
          user: null,
          isLoading: false,
          isAdmin: false,
          hasStudioAccess: false,
          userData: null,
        });
      }
    } catch (error) {
      console.error("Session initialization error:", error);
      updateState({
        isLoading: false,
        session: null,
        user: null,
      });
    }
  }, [loadUserData]);

  useEffect(() => {
    initSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
        updateState({
          session,
          user: session.user,
          isLoading: false,
        });
        await loadUserData(session.user);

        // Broadcast to other tabs
        localStorage.setItem(
          AUTH_EVENT_KEY,
          JSON.stringify({ event, timestamp: Date.now() })
        );
      } else {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
        sessionStorage.removeItem(USER_DATA_KEY);
        sessionStorage.removeItem(USER_PERMISSIONS_KEY);
        updateState({
          session: null,
          user: null,
          isLoading: false,
          isAdmin: false,
          hasStudioAccess: false,
          userData: null,
        });
      }
    });

    // Listen for auth events from other tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === AUTH_EVENT_KEY) {
        initSession();
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("storage", handleStorage);
    };
  }, [initSession, loadUserData]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error };
    }
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, metadata?: any) => {
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: metadata ? { data: metadata } : undefined,
        });
        return { error };
      } catch (error) {
        return { error };
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      // Clear all auth-related storage
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      sessionStorage.removeItem(USER_DATA_KEY);
      sessionStorage.removeItem(USER_PERMISSIONS_KEY);

      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      return { error };
    }
  }, []);

  const updateUserPreferences = useCallback(
    async (preferences: Record<string, any>) => {
      if (!state.user?.id || !state.userData) return;

      try {
        const { error } = await supabase
          .from("users")
          .update({ preferences })
          .eq("id", state.user.id);

        if (error) throw error;

        const newUserData = { ...state.userData, preferences };
        sessionStorage.setItem(USER_DATA_KEY, JSON.stringify(newUserData));
        updateState({ userData: newUserData });
      } catch (error) {
        console.error("Error updating preferences:", error);
      }
    },
    [state.user?.id, state.userData]
  );

  const updateUserSettings = useCallback(
    async (settings: Record<string, any>) => {
      if (!state.user?.id || !state.userData) return;

      try {
        const { error } = await supabase
          .from("users")
          .update({ settings })
          .eq("id", state.user.id);

        if (error) throw error;

        const newUserData = { ...state.userData, settings };
        sessionStorage.setItem(USER_DATA_KEY, JSON.stringify(newUserData));
        updateState({ userData: newUserData });
      } catch (error) {
        console.error("Error updating settings:", error);
      }
    },
    [state.user?.id, state.userData]
  );

  const refreshUserData = useCallback(async () => {
    if (state.user) {
      await loadUserData(state.user);
    }
  }, [state.user, loadUserData]);

  return {
    ...state,
    isLoggedIn: !!state.user,
    isReady: !state.isLoading && state.user !== undefined,
    login,
    signUp,
    logout,
    updateUserPreferences,
    updateUserSettings,
    refreshUserData,
  };
}

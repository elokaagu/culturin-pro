import { useState, useEffect, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { userDataService } from "@/src/services/userDataService";

/**
 * Centralized authentication state hook that ensures consistent user state
 * across all dashboard sections and handles session persistence
 */
export const useAuthState = () => {
  const { user, isLoggedIn, isLoading, hasStudioAccess, isAdmin, logout } = useAuth();
  const [initialized, setInitialized] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  // Initialize user data when authentication is loaded
  useEffect(() => {
    if (!isLoading && !initialized) {
      console.log("🔐 useAuthState - Initializing for user:", user?.email);
      setInitialized(true);
      
      if (user) {
        loadUserData(user);
      } else {
        clearUserData();
      }
    }
  }, [user, isLoading, initialized]);

  const loadUserData = useCallback(async (user: User) => {
    try {
      const userSpecificData = await userDataService.loadUserData(user);
      setUserData(userSpecificData);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }, []);

  const clearUserData = useCallback(() => {
    setUserData(null);
  }, []);

  const updateUserPreferences = useCallback((preferences: any) => {
    if (user && userData) {
      const updatedData = { ...userData, preferences };
      setUserData(updatedData);
      userDataService.updateUserPreferences(user.id, preferences);
    }
  }, [user, userData]);

  const updateUserSettings = useCallback((settings: any) => {
    if (user && userData) {
      const updatedData = { ...userData, settings };
      setUserData(updatedData);
      userDataService.updateUserSettings(user.id, settings);
    }
  }, [user, userData]);

  // Enhanced logout with proper cleanup
  const enhancedLogout = useCallback(async () => {
    try {
      // Clear user-specific data using the service
      if (user) {
        userDataService.clearUserData(user.id);
      }
      clearUserData();
      
      // Call the original logout function
      await logout();
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  }, [user, logout, clearUserData]);

  // Refresh user data
  const refreshUserData = useCallback(async () => {
    if (user) {
      try {
        const freshData = await userDataService.refreshUserData(user);
        setUserData(freshData);
      } catch (error) {
        console.error("Error refreshing user data:", error);
      }
    }
  }, [user]);

  return {
    // Core auth state
    user,
    isLoggedIn,
    isLoading,
    hasStudioAccess,
    isAdmin,
    initialized,
    
    // User data
    userData,
    
    // Actions
    updateUserPreferences,
    updateUserSettings,
    refreshUserData,
    logout: enhancedLogout,
    
    // Status
    isReady: initialized && !isLoading
  };
};

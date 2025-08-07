import { useState, useEffect, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { useAuth } from "@/src/components/auth/AuthProvider";

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
      console.log("📊 Loading user data for:", user.email);
      
      // Load user-specific data from localStorage
      const userSpecificData = {
        userId: user.id,
        email: user.email,
        lastLogin: new Date().toISOString(),
        preferences: JSON.parse(localStorage.getItem(`userPreferences_${user.id}`) || '{}'),
        settings: JSON.parse(localStorage.getItem(`userSettings_${user.id}`) || '{}')
      };
      
      setUserData(userSpecificData);
      
      // Update last login timestamp
      localStorage.setItem(`userLastLogin_${user.id}`, new Date().toISOString());
      
      console.log("✅ User data loaded successfully");
    } catch (error) {
      console.error("❌ Error loading user data:", error);
    }
  }, []);

  const clearUserData = useCallback(() => {
    console.log("🧹 Clearing user data");
    setUserData(null);
  }, []);

  const updateUserPreferences = useCallback((preferences: any) => {
    if (user && userData) {
      const updatedData = { ...userData, preferences };
      setUserData(updatedData);
      localStorage.setItem(`userPreferences_${user.id}`, JSON.stringify(preferences));
    }
  }, [user, userData]);

  const updateUserSettings = useCallback((settings: any) => {
    if (user && userData) {
      const updatedData = { ...userData, settings };
      setUserData(updatedData);
      localStorage.setItem(`userSettings_${user.id}`, JSON.stringify(settings));
    }
  }, [user, userData]);

  // Enhanced logout with proper cleanup
  const enhancedLogout = useCallback(async () => {
    try {
      console.log("🚪 Enhanced logout initiated");
      
      // Clear user-specific data
      clearUserData();
      
      // Clear all user-specific localStorage entries
      if (user && typeof window !== "undefined") {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (
            key.startsWith(`culturinItineraries_${user.id}`) ||
            key.startsWith(`userPreferences_${user.id}`) ||
            key.startsWith(`userSettings_${user.id}`) ||
            key.startsWith(`userLastLogin_${user.id}`) ||
            key.startsWith(`publishedWebsiteUrl_${user.id}`) ||
            key.startsWith(`websiteData_${user.id}`)
          )) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
      }
      
      // Call the original logout function
      await logout();
      
      console.log("✅ Enhanced logout completed");
    } catch (error) {
      console.error("❌ Error during enhanced logout:", error);
      throw error;
    }
  }, [user, logout, clearUserData]);

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
    logout: enhancedLogout,
    
    // Status
    isReady: initialized && !isLoading
  };
};

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { supabaseStorage } from "@/lib/supabase-storage";

interface UserData {
  id: string;
  email: string;
  full_name?: string;
  role?: string;
  studio_access?: boolean;
  preferences?: Record<string, any>;
  settings?: Record<string, any>;
  experiences?: any[];
  lastLogin?: string;
}

interface UserDataContextType {
  userData: UserData | null;
  isLoading: boolean;
  updateUserData: (updates: Partial<UserData>) => Promise<void>;
  refreshUserData: () => Promise<void>;
  clearUserData: () => Promise<void>;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};

interface UserDataProviderProps {
  children: ReactNode;
}

export const UserDataProvider: React.FC<UserDataProviderProps> = ({ children }) => {
  const { user, isLoggedIn } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data when user changes
  useEffect(() => {
    let isMounted = true;
    let loadingTimeout: NodeJS.Timeout;

    const loadUserData = async () => {
      if (!user || !isLoggedIn) {
        if (isMounted) {
          setUserData(null);
          setIsLoading(false);
        }
        return;
      }

      if (isMounted) {
        setIsLoading(true);
      }

      try {
        console.log("Loading user data for:", user.email);

        // Fetch user data from Supabase users table
        const { data: userProfile, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error loading user profile:", error);
        }

        // Load additional data from Supabase storage
        const [preferences, settings, experiences, lastLogin] = await Promise.all([
          supabaseStorage.getItem(`userPreferences_${user.id}`),
          supabaseStorage.getItem(`userSettings_${user.id}`),
          supabaseStorage.getItem(`userExperiences_${user.id}`),
          supabaseStorage.getItem(`userLastLogin_${user.id}`),
        ]);

        const completeUserData: UserData = {
          id: user.id,
          email: user.email,
          full_name: userProfile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0],
          role: userProfile?.role || 'user',
          studio_access: userProfile?.studio_access ?? true,
          preferences: preferences || {},
          settings: settings || {},
          experiences: experiences || [],
          lastLogin: lastLogin || new Date().toISOString(),
        };

        if (isMounted) {
          setUserData(completeUserData);
          console.log("User data loaded successfully:", completeUserData);
          
          // Save to localStorage for fallback
          try {
            localStorage.setItem(`userData_${user.id}`, JSON.stringify(completeUserData));
          } catch (localError) {
            console.warn("Failed to save user data to localStorage:", localError);
          }
        }

        // Save last login time
        await supabaseStorage.setItem(`userLastLogin_${user.id}`, completeUserData.lastLogin);
      } catch (error) {
        console.error("Error loading user data:", error);
        if (isMounted) {
          setUserData(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Set a timeout to prevent infinite loading
    loadingTimeout = setTimeout(() => {
      if (isMounted) {
        console.warn("User data loading timeout - forcing loading to false");
        setIsLoading(false);
        
        // Try to load from localStorage as fallback
        try {
          const localData = localStorage.getItem(`userData_${user.id}`);
          if (localData) {
            const parsed = JSON.parse(localData);
            setUserData(parsed);
            console.log("✅ Loaded user data from localStorage fallback");
          }
        } catch (localError) {
          console.error("LocalStorage fallback failed:", localError);
        }
      }
    }, 10000); // Increased to 10 seconds for better reliability

    loadUserData().finally(() => {
      // Clear timeout when data loading completes (success or failure)
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    });

    return () => {
      isMounted = false;
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    };
  }, [user, isLoggedIn]);

  // Update user data
  const updateUserData = async (updates: Partial<UserData>) => {
    if (!user) return;

    try {
      const updatedData = { ...userData, ...updates };
      setUserData(updatedData);

      // Save updates to Supabase storage
      if (updates.preferences) {
        await supabaseStorage.setItem(`userPreferences_${user.id}`, updates.preferences);
      }

      if (updates.settings) {
        await supabaseStorage.setItem(`userSettings_${user.id}`, updates.settings);
      }

      if (updates.experiences) {
        await supabaseStorage.setItem(`userExperiences_${user.id}`, updates.experiences);
      }

      console.log("User data updated:", updates);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // Refresh user data
  const refreshUserData = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Reload user data
      const { data: userProfile, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error refreshing user profile:", error);
      }

      const [preferences, settings, experiences, lastLogin] = await Promise.all([
        supabaseStorage.getItem(`userPreferences_${user.id}`),
        supabaseStorage.getItem(`userSettings_${user.id}`),
        supabaseStorage.getItem(`userExperiences_${user.id}`),
        supabaseStorage.getItem(`userLastLogin_${user.id}`),
      ]);

      const refreshedData: UserData = {
        id: user.id,
        email: user.email,
        full_name: userProfile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0],
        role: userProfile?.role || 'user',
        studio_access: userProfile?.studio_access ?? true,
        preferences: preferences || {},
        settings: settings || {},
        experiences: experiences || [],
        lastLogin: lastLogin || new Date().toISOString(),
      };

      setUserData(refreshedData);
      console.log("User data refreshed:", refreshedData);
    } catch (error) {
      console.error("Error refreshing user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear user data
  const clearUserData = async () => {
    if (!user) return;

    try {
      // Clear all user data from Supabase storage
      const keysToRemove = [
        `userPreferences_${user.id}`,
        `userSettings_${user.id}`,
        `userExperiences_${user.id}`,
        `userLastLogin_${user.id}`,
      ];

      const removePromises = keysToRemove.map(key => supabaseStorage.removeItem(key));
      await Promise.all(removePromises);

      setUserData(null);
      console.log("User data cleared");
    } catch (error) {
      console.error("Error clearing user data:", error);
    }
  };

  const value: UserDataContextType = {
    userData,
    isLoading,
    updateUserData,
    refreshUserData,
    clearUserData,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

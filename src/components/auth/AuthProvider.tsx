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
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Only process user changes when not loading
    if (!loading) {
      if (user) {
        checkUserPermissions(user);
        loadUserData(user);
      } else {
        setHasStudioAccess(false);
        setIsAdmin(false);
        
        // Clear user-specific localStorage data when user is null
        if (initialized && typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("userLoggedOut"));
        }
      }
      
      if (!initialized) {
        setInitialized(true);
      }
    }
  }, [user, loading, session, initialized]);

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
      
      // If user data doesn't exist in database, set permissions based on email
      if (!userData && (user.email === "eloka.agu@icloud.com" || user.email === "eloka@satellitelabs.xyz")) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error("Error checking user permissions:", error);
      setHasStudioAccess(true);
      
      // Set admin permissions based on email as fallback
      const isAdminUser = user.email === "eloka.agu@icloud.com" || 
                         user.email === "eloka@satellitelabs.xyz";
      setIsAdmin(isAdminUser);
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
        
        console.log(`🔧 Creating user record for ${user.email}...`);
        
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
          console.error("❌ Error creating user record:", insertError);
          // If RLS is blocking, try to create a sample itinerary in localStorage instead
          if (insertError.code === '42501') {
            console.log("🔄 RLS blocking user creation, will use localStorage fallback");
            await createSampleItineraryInLocalStorage(user);
          }
        } else {
          console.log(`✅ Created user record for ${user.email} with role: ${isAdminUser ? "admin" : "user"}`);
          // Create a sample itinerary for the new user
          await createSampleItinerary(user);
        }
      } else if (existingUser) {
        console.log(`✅ User record exists for ${user.email} with role: ${existingUser.role}`);
      }
    } catch (error) {
      console.error("Error ensuring user record:", error);
      // Fallback to localStorage
      await createSampleItineraryInLocalStorage(user);
    }
  };

  const createSampleItinerary = async (user: User) => {
    try {
      const isStTropez = user.email?.includes('satellitelabs');
      const sampleItinerary = {
        title: isStTropez ? 'St Tropez Soireé' : 'Tuscany Cultural Journey',
        description: isStTropez 
          ? 'A luxurious cultural experience in the French Riviera, exploring local art, cuisine, and traditions.'
          : 'An immersive journey through Tuscany\'s rich cultural heritage, from Renaissance art to culinary traditions.',
        days: isStTropez ? 3 : 5,
        status: 'published',
        theme_type: 'cultural',
        regions: isStTropez 
          ? ['French Riviera', 'Mediterranean'] 
          : ['Tuscany', 'Italy'],
        price: isStTropez ? 2500 : 3200,
        currency: 'USD',
        group_size_min: 2,
        group_size_max: 8,
        difficulty: 'easy',
        tags: isStTropez 
          ? ['luxury', 'cultural', 'french-riviera', 'art'] 
          : ['cultural', 'italy', 'renaissance', 'culinary'],
        operator_id: user.id,
        last_updated: 'just now',
      };

      const { data: itinerary, error } = await supabase
        .from('itineraries')
        .insert(sampleItinerary)
        .select()
        .single();

      if (!error && itinerary) {
        console.log(`✅ Created sample itinerary: "${itinerary.title}"`);
      }
    } catch (error) {
      console.log("Sample itinerary creation failed, using localStorage fallback");
    }
  };

  const createSampleItineraryInLocalStorage = async (user: User) => {
    try {
      const isStTropez = user.email?.includes('satellitelabs');
      const sampleItinerary = {
        id: `local-${Date.now()}`,
        title: isStTropez ? 'St Tropez Soireé' : 'Tuscany Cultural Journey',
        description: isStTropez 
          ? 'A luxurious cultural experience in the French Riviera, exploring local art, cuisine, and traditions.'
          : 'An immersive journey through Tuscany\'s rich cultural heritage, from Renaissance art to culinary traditions.',
        days: isStTropez ? 3 : 5,
        lastUpdated: 'just now',
        status: 'published',
        image: '',
        themeType: 'cultural',
        regions: isStTropez 
          ? ['French Riviera', 'Mediterranean'] 
          : ['Tuscany', 'Italy'],
        price: isStTropez ? 2500 : 3200,
        currency: 'USD',
        groupSize: { min: 2, max: 8 },
        difficulty: 'easy',
        tags: isStTropez 
          ? ['luxury', 'cultural', 'french-riviera', 'art'] 
          : ['cultural', 'italy', 'renaissance', 'culinary'],
        modules: []
      };

      const userSpecificKey = `culturinItineraries_${user.id}`;
      
      // Check if localStorage already has itineraries for this user
      const existingItineraries = localStorage.getItem(userSpecificKey);
      let itineraries = [];
      
      if (existingItineraries) {
        itineraries = JSON.parse(existingItineraries);
      }
      
      // Only add sample if no itineraries exist
      if (itineraries.length === 0) {
        itineraries.push(sampleItinerary);
        localStorage.setItem(userSpecificKey, JSON.stringify(itineraries));
      }
    } catch (error) {
      console.error("Error creating sample itinerary in localStorage:", error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Clear any conflicting localStorage data before login
      if (typeof window !== "undefined") {
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
        console.log("🧹 Cleared conflicting localStorage data before login");
      }

      const { data, error } = await signIn(email, password);
      
      if (error) {
        return { error };
      }
      
      // If login successful, ensure user record exists
      if (data.user) {
        try {
          await ensureUserRecord(data.user);
          console.log("✅ Login successful and user record ensured");
        } catch (recordError) {
          console.error("⚠️ Login successful but user record creation failed:", recordError);
          // Don't fail the login, but log the issue
        }
      }
      
      return { error: null };
    } catch (error) {
      console.error("❌ Login error:", error);
      return { error };
    }
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
        console.log("🧹 Cleared non-essential localStorage data");

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
import { supabase } from "@/lib/supabase";
import { supabaseStorage } from "@/lib/supabase-storage";

export interface UserData {
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

class UserDataService {
  private cache: Map<string, UserData> = new Map();

  /**
   * Load user data from Supabase
   */
  async loadUserData(user: any): Promise<UserData | null> {
    try {
      console.log("Loading user data for:", user.email);

      // Check cache first
      if (this.cache.has(user.id)) {
        console.log("Returning cached user data");
        return this.cache.get(user.id)!;
      }

      // Fetch user data from Supabase users table
      const { data: userData, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error loading user data:", error);
        return null;
      }

      // Load additional data from Supabase storage
      const [preferences, settings, experiences] = await Promise.all([
        supabaseStorage.getItem(`userPreferences_${user.id}`),
        supabaseStorage.getItem(`userSettings_${user.id}`),
        supabaseStorage.getItem(`userExperiences_${user.id}`),
      ]);

      const completeUserData: UserData = {
        ...userData,
        preferences: preferences || {},
        settings: settings || {},
        experiences: experiences || [],
        lastLogin: new Date().toISOString(),
      };

      // Cache the result
      this.cache.set(user.id, completeUserData);

      // Save last login time
      await supabaseStorage.setItem(`userLastLogin_${user.id}`, completeUserData.lastLogin);

      console.log("User data loaded successfully:", completeUserData);
      return completeUserData;
    } catch (error) {
      console.error("Error in loadUserData:", error);
      return null;
    }
  }

  /**
   * Load user data with fallback to Supabase storage
   */
  async loadUserDataWithFallback(user: any): Promise<UserData | null> {
    try {
      // Try to load from database first
      const userData = await this.loadUserData(user);
      if (userData) {
        return userData;
      }

      console.log("Database load failed, trying Supabase storage fallback");

      // Fallback to Supabase storage
      const [preferences, settings, experiences, lastLogin] = await Promise.all([
        supabaseStorage.getItem(`userPreferences_${user.id}`),
        supabaseStorage.getItem(`userSettings_${user.id}`),
        supabaseStorage.getItem(`userExperiences_${user.id}`),
        supabaseStorage.getItem(`userLastLogin_${user.id}`),
      ]);

      const fallbackUserData: UserData = {
        id: user.id,
        email: user.email,
        preferences: preferences || {},
        settings: settings || {},
        experiences: experiences || [],
        lastLogin: lastLogin || new Date().toISOString(),
      };

      console.log("Loaded fallback user data:", fallbackUserData);
      return fallbackUserData;
    } catch (error) {
      console.error("Error in loadUserDataWithFallback:", error);
      return null;
    }
  }

  /**
   * Save user preferences to Supabase storage
   */
  async saveUserPreferences(userId: string, preferences: Record<string, any>): Promise<boolean> {
    try {
      const success = await supabaseStorage.setItem(`userPreferences_${userId}`, preferences);
      if (success) {
        // Update cache if exists
        const cached = this.cache.get(userId);
        if (cached) {
          cached.preferences = preferences;
          this.cache.set(userId, cached);
        }
      }
      return success;
    } catch (error) {
      console.error("Error saving user preferences:", error);
      return false;
    }
  }

  /**
   * Save user settings to Supabase storage
   */
  async saveUserSettings(userId: string, settings: Record<string, any>): Promise<boolean> {
    try {
      const success = await supabaseStorage.setItem(`userSettings_${userId}`, settings);
      if (success) {
        // Update cache if exists
        const cached = this.cache.get(userId);
        if (cached) {
          cached.settings = settings;
          this.cache.set(userId, cached);
        }
      }
      return success;
    } catch (error) {
      console.error("Error saving user settings:", error);
      return false;
    }
  }

  /**
   * Save user experiences to Supabase storage
   */
  async saveUserItineraries(userId: string, experiences: any[]): Promise<boolean> {
    try {
      const success = await supabaseStorage.setItem(`userExperiences_${userId}`, experiences);
      if (success) {
        // Update cache if exists
        const cached = this.cache.get(userId);
        if (cached) {
          cached.experiences = experiences;
          this.cache.set(userId, cached);
        }
      }
      return success;
    } catch (error) {
      console.error("Error saving user experiences:", error);
      return false;
    }
  }

  /**
   * Clear all user data from cache and Supabase storage
   */
  async clearUserData(userId: string): Promise<boolean> {
    try {
      // Clear cache
      this.cache.delete(userId);

      // Clear all user data from Supabase storage
      const keysToRemove = [
        `userPreferences_${userId}`,
        `userSettings_${userId}`,
        `userExperiences_${userId}`,
        `userLastLogin_${userId}`,
      ];

      const removePromises = keysToRemove.map(key => supabaseStorage.removeItem(key));
      await Promise.all(removePromises);

      console.log("Cleared all user data for:", userId);
      return true;
    } catch (error) {
      console.error("Error clearing user data:", error);
      return false;
    }
  }

  /**
   * Get cached user data
   */
  getCachedUserData(userId: string): UserData | null {
    return this.cache.get(userId) || null;
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }
}

export const userDataService = new UserDataService();


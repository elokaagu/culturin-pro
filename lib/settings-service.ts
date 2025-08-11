import { supabase } from "./supabase";
import { supabaseStorage } from "./supabase-storage";

export interface UserSettings {
  theme: "light" | "dark";
  notifications: boolean;
  autoSave: boolean;
  language: string;
  timezone: string;
  currency: string;
  elevenLabsEnabled: boolean;
  [key: string]: any;
}

class SettingsService {
  /**
   * Save user settings to Supabase storage
   */
  async saveSettings(settings: UserSettings): Promise<boolean> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        console.warn("User not authenticated, saving to session storage");
        if (typeof window !== "undefined") {
          sessionStorage.setItem("userSettings", JSON.stringify(settings));
        }
        return true;
      }

      const userId = session.user.id;

      // Save to Supabase storage only if really needed
      return await supabaseStorage.setItem(`userSettings_${userId}`, settings);
    } catch (error) {
      console.error("Error saving settings:", error);
      return false;
    }
  }

  /**
   * Get user settings from Supabase storage
   */
  async getSettings(): Promise<UserSettings | null> {
    try {
      const isAuthenticated = await supabaseStorage.isAuthenticated();
      
      if (!isAuthenticated) {
        console.warn("User not authenticated, getting from Supabase storage only");
        return await supabaseStorage.getItem("userSettings");
      }

      const userId = await supabaseStorage.getCurrentUserId();
      if (!userId) {
        console.warn("No user ID found");
        return null;
      }

      // Get from Supabase storage
      const settings = await supabaseStorage.getItem(`userSettings_${userId}`);
      return settings;
    } catch (error) {
      console.error("Error getting settings:", error);
      return null;
    }
  }

  /**
   * Update specific settings
   */
  async updateSettings(updates: Partial<UserSettings>): Promise<boolean> {
    try {
      const currentSettings = await this.getSettings();
      if (!currentSettings) {
        return await this.saveSettings(updates as UserSettings);
      }

      const updatedSettings = { ...currentSettings, ...updates };
      return await this.saveSettings(updatedSettings);
    } catch (error) {
      console.error("Error updating settings:", error);
      return false;
    }
  }

  /**
   * Reset settings to defaults
   */
  async resetSettings(): Promise<boolean> {
    const defaultSettings: UserSettings = {
      theme: "light",
      notifications: true,
      autoSave: true,
      language: "en",
      timezone: "UTC",
      currency: "USD",
      elevenLabsEnabled: false,
    };

    return await this.saveSettings(defaultSettings);
  }

  /**
   * Clear all settings
   */
  async clearSettings(): Promise<boolean> {
    try {
      const isAuthenticated = await supabaseStorage.isAuthenticated();
      
      if (!isAuthenticated) {
        return await supabaseStorage.removeItem("userSettings");
      }

      const userId = await supabaseStorage.getCurrentUserId();
      if (!userId) {
        return false;
      }

      return await supabaseStorage.removeItem(`userSettings_${userId}`);
    } catch (error) {
      console.error("Error clearing settings:", error);
      return false;
    }
  }
}

export const settingsService = new SettingsService(); 
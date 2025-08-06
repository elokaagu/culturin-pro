import { supabase } from "./supabase";

export interface SettingsService {
  saveGeneralSettings: (settings: any) => Promise<void>;
  getGeneralSettings: () => Promise<any>;
}

class SupabaseSettingsService implements SettingsService {
  private async getCurrentUser() {
    try {
      // First try to get the current session
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        return session.user;
      }

      // Fallback to getUser
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }

  async saveGeneralSettings(settings: any): Promise<void> {
    const user = await this.getCurrentUser();
    if (!user) {
      console.log("User not authenticated, saving to localStorage");
      // Save to localStorage as fallback
      localStorage.setItem("userSettings", JSON.stringify(settings));
      return;
    }

    const { error } = await supabase
      .from('users')
      .update({
        full_name: settings.businessName,
        email: settings.email,
        bio: settings.bio,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (error) {
      console.error('Error saving general settings:', error);
      throw new Error(`Failed to save general settings: ${error.message}`);
    }
  }

  async getGeneralSettings(): Promise<any> {
    const user = await this.getCurrentUser();
    if (!user) {
      console.log("User not authenticated, getting from localStorage");
      // Get from localStorage as fallback
      const settingsStr = localStorage.getItem("userSettings");
      return settingsStr ? JSON.parse(settingsStr) : {};
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching general settings:', error);
      throw new Error(`Failed to fetch general settings: ${error.message}`);
    }

    return {
      businessName: data.full_name,
      email: data.email,
      bio: data.bio,
    };
  }
}

export const settingsService = new SupabaseSettingsService(); 
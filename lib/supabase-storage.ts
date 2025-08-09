import { supabase } from "./supabase";

export interface StorageData {
  key: string;
  value: any;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

export const supabaseStorage = {
  // Check if user is authenticated
  isAuthenticated: async (): Promise<boolean> => {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session?.user;
  },

  // Get current user ID
  getCurrentUserId: async (): Promise<string | null> => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user?.id || null;
  },

  // Save data to Supabase
  setItem: async (key: string, value: any): Promise<boolean> => {
    try {
      const userId = await supabaseStorage.getCurrentUserId();
      
      if (!userId) {
        console.warn("User not authenticated, cannot save to Supabase storage");
        return false;
      }

      const { error } = await supabase
        .from("user_storage")
        .upsert({
          key,
          value: JSON.stringify(value),
          user_id: userId,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,key'
        });

      if (error) {
        console.error("Error saving to Supabase storage:", error);
        return false;
      }

      console.log(`Saved ${key} to Supabase storage`);
      return true;
    } catch (error) {
      console.error("Error in setItem:", error);
      return false;
    }
  },

  // Get data from Supabase
  getItem: async (key: string): Promise<any | null> => {
    try {
      const userId = await supabaseStorage.getCurrentUserId();
      
      if (!userId) {
        console.warn("User not authenticated, cannot get from Supabase storage");
        return null;
      }

      const { data, error } = await supabase
        .from("user_storage")
        .select("value")
        .eq("key", key)
        .eq("user_id", userId)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // No data found
          return null;
        }
        console.error("Error getting from Supabase storage:", error);
        return null;
      }

      if (data?.value) {
        return JSON.parse(data.value);
      }

      return null;
    } catch (error) {
      console.error("Error in getItem:", error);
      return null;
    }
  },

  // Remove data from Supabase
  removeItem: async (key: string): Promise<boolean> => {
    try {
      const userId = await supabaseStorage.getCurrentUserId();
      
      if (!userId) {
        console.warn("User not authenticated, cannot remove from Supabase storage");
        return false;
      }

      const { error } = await supabase
        .from("user_storage")
        .delete()
        .eq("key", key)
        .eq("user_id", userId);

      if (error) {
        console.error("Error removing from Supabase storage:", error);
        return false;
      }

      console.log(`Removed ${key} from Supabase storage`);
      return true;
    } catch (error) {
      console.error("Error in removeItem:", error);
      return false;
    }
  },

  // Clear all user data
  clearAll: async (): Promise<boolean> => {
    try {
      const userId = await supabaseStorage.getCurrentUserId();
      
      if (!userId) {
        console.warn("User not authenticated, cannot clear Supabase storage");
        return false;
      }

      const { error } = await supabase
        .from("user_storage")
        .delete()
        .eq("user_id", userId);

      if (error) {
        console.error("Error clearing Supabase storage:", error);
        return false;
      }

      console.log("Cleared all user data from Supabase storage");
      return true;
    } catch (error) {
      console.error("Error in clearAll:", error);
      return false;
    }
  },

  // Get all keys for current user
  getAllKeys: async (): Promise<string[]> => {
    try {
      const userId = await supabaseStorage.getCurrentUserId();
      
      if (!userId) {
        return [];
      }

      const { data, error } = await supabase
        .from("user_storage")
        .select("key")
        .eq("user_id", userId);

      if (error) {
        console.error("Error getting keys from Supabase storage:", error);
        return [];
      }

      return data?.map(item => item.key) || [];
    } catch (error) {
      console.error("Error in getAllKeys:", error);
      return [];
    }
  },

  // Check if key exists
  hasKey: async (key: string): Promise<boolean> => {
    try {
      const userId = await supabaseStorage.getCurrentUserId();
      
      if (!userId) {
        return false;
      }

      const { data, error } = await supabase
        .from("user_storage")
        .select("key")
        .eq("key", key)
        .eq("user_id", userId)
        .single();

      if (error) {
        return false;
      }

      return !!data;
    } catch (error) {
      return false;
    }
  },
};

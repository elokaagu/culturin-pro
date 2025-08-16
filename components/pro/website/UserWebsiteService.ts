// User-specific website service for managing website content and settings
import { supabase } from "@/lib/supabase";
import { Experience } from "@/lib/experience-service";

export interface UserWebsiteSettings {
  id?: string;
  user_id: string;
  company_name: string;
  tagline: string;
  description: string;
  contact_info: {
    phone: string;
    email: string;
    address: string;
    website?: string;
  };
  social_media: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  };
  branding: {
    primary_color: string;
    logo_url?: string;
    header_image?: string;
    theme: string;
  };
  website_settings: {
    show_booking: boolean;
    show_reviews: boolean;
    show_testimonials: boolean;
    currency: string;
    language: string;
    timezone: string;
  };
  seo_settings: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  published_url?: string;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface UserWebsiteData {
  settings: UserWebsiteSettings;
  experiences: Experience[];
  stats: {
    total_tours: number;
    total_bookings: number;
    rating: number;
    reviews_count: number;
  };
}

class UserWebsiteService {
  /**
   * Get user's website settings with defaults
   */
  async getUserWebsiteSettings(userId: string): Promise<UserWebsiteSettings> {
    try {
      const { data: settings, error } = await supabase
        .from("user_website_settings")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // No record found, return defaults
          console.log("No website settings found for user, using defaults");
          return this.getDefaultSettings(userId);
        } else if (error.code === "42P01") {
          // Table doesn't exist
          console.warn(
            "user_website_settings table doesn't exist, using defaults"
          );
          return this.getDefaultSettings(userId);
        } else {
          console.error("Error fetching website settings:", error);
          return this.getDefaultSettings(userId);
        }
      }

      // Return settings or defaults
      return settings || this.getDefaultSettings(userId);
    } catch (error) {
      console.error("Error in getUserWebsiteSettings:", error);
      return this.getDefaultSettings(userId);
    }
  }

  /**
   * Save user's website settings
   */
  async saveUserWebsiteSettings(
    settings: UserWebsiteSettings
  ): Promise<boolean> {
    try {
      const { error } = await supabase.from("user_website_settings").upsert({
        ...settings,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Error saving website settings:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error in saveUserWebsiteSettings:", error);
      return false;
    }
  }

  /**
   * Get complete website data for a user
   */
  async getUserWebsiteData(userId: string): Promise<UserWebsiteData> {
    try {
      // Get website settings
      const settings = await this.getUserWebsiteSettings(userId);

      // Get user's experiences
      const { data: experiences, error: expError } = await supabase
        .from("experiences")
        .select("*")
        .eq("operator_id", userId)
        .order("created_at", { ascending: false });

      if (expError) {
        console.error("Error fetching experiences:", expError);
      }

      // Calculate stats
      const stats = {
        total_tours: experiences?.length || 0,
        total_bookings: 0, // TODO: Implement booking count
        rating: 0, // TODO: Implement rating calculation
        reviews_count: 0, // TODO: Implement review count
      };

      return {
        settings,
        experiences: experiences || [],
        stats,
      };
    } catch (error) {
      console.error("Error in getUserWebsiteData:", error);
      return {
        settings: this.getDefaultSettings(userId),
        experiences: [],
        stats: {
          total_tours: 0,
          total_bookings: 0,
          rating: 0,
          reviews_count: 0,
        },
      };
    }
  }

  /**
   * Publish user's website
   */
  async publishWebsite(
    userId: string
  ): Promise<{ success: boolean; url?: string }> {
    try {
      // Get current settings
      const currentSettings = await this.getUserWebsiteSettings(userId);

      // Generate unique URL
      const uniqueId = userId.slice(0, 8);
      const timestamp = Date.now().toString(36);
      const newUrl = `tour/${
        currentSettings.company_name
          ?.toLowerCase()
          .replace(/[^a-z0-9]/g, "-") || "experience"
      }-${uniqueId}-${timestamp}`;

      // Update settings with published URL
      const updatedSettings: UserWebsiteSettings = {
        ...currentSettings,
        published_url: newUrl,
        is_published: true,
        updated_at: new Date().toISOString(),
      };

      const success = await this.saveUserWebsiteSettings(updatedSettings);

      if (success) {
        return { success: true, url: newUrl };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error("Error publishing website:", error);
      return { success: false };
    }
  }

  /**
   * Get default website settings for a new user
   */
  private getDefaultSettings(userId: string): UserWebsiteSettings {
    return {
      user_id: userId,
      company_name: "Your Tour Company",
      tagline: "Discover Amazing Cultural Experiences",
      description:
        "We specialize in creating authentic cultural experiences that connect you with local traditions and communities.",
      contact_info: {
        phone: "+1 (555) 123-4567",
        email: "contact@yourcompany.com",
        address: "Your business address",
        website: "",
      },
      social_media: {
        facebook: "https://facebook.com/yourcompany",
        twitter: "",
        instagram: "",
        youtube: "",
        linkedin: "",
      },
      branding: {
        primary_color: "#3B82F6",
        logo_url: "",
        header_image: "",
        theme: "classic",
      },
      website_settings: {
        show_booking: true,
        show_reviews: true,
        show_testimonials: true,
        currency: "USD",
        language: "en",
        timezone: "UTC",
      },
      seo_settings: {
        title: "Your Tour Company - Cultural Experiences",
        description: "Discover authentic cultural experiences and tours",
        keywords: [
          "cultural tours",
          "authentic experiences",
          "travel",
          "tourism",
        ],
      },
      published_url: "",
      is_published: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  /**
   * Generate a unique website URL for a user
   */
  generateWebsiteUrl(userId: string, companyName?: string): string {
    const uniqueId = userId.slice(0, 8);
    const timestamp = Date.now().toString(36);
    const cleanCompanyName = companyName
      ? companyName.toLowerCase().replace(/[^a-z0-9]/g, "-")
      : "experience";

    return `tour/${cleanCompanyName}-${uniqueId}-${timestamp}`;
  }

  /**
   * Delete user's website settings
   */
  async deleteUserWebsiteSettings(userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("user_website_settings")
        .delete()
        .eq("user_id", userId);

      if (error) {
        console.error("Error deleting website settings:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error in deleteUserWebsiteSettings:", error);
      return false;
    }
  }
}

export const userWebsiteService = new UserWebsiteService();

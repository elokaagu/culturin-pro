// User-specific website service for managing website content and settings
import { supabase } from "@/lib/supabase";
import { Itinerary } from "@/lib/itinerary-service";

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
  itineraries: Itinerary[];
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

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching website settings:", error);
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
   * Get complete user website data (settings + itineraries)
   */
  async getUserWebsiteData(userId: string): Promise<UserWebsiteData> {
    try {
      // Get user settings
      const settings = await this.getUserWebsiteSettings(userId);

      // Get user's published itineraries
      const { data: itineraries, error: itinerariesError } = await supabase
        .from("itineraries")
        .select("*")
        .eq("operator_id", userId)
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (itinerariesError) {
        console.error("Error fetching itineraries:", itinerariesError);
      }

      // Transform itineraries to match interface
      const transformedItineraries = (itineraries || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        days: item.days,
        price: item.price,
        currency: item.currency || "USD",
        image: item.image,
        highlights: item.highlights || [],
        activities: item.activities || [],
        accommodations: item.accommodations || [],
        transportation: item.transportation || [],
        meals: item.meals || [],
        notes: item.notes || [],
        created_at: item.created_at,
        updated_at: item.updated_at,
        operator_id: item.operator_id,
        status: item.status || "draft",
      }));

      // Calculate stats
      const stats = {
        total_tours: transformedItineraries.length,
        total_bookings: 0, // TODO: Implement when bookings system is ready
        rating: 4.8, // TODO: Calculate from reviews
        reviews_count: transformedItineraries.length * 15, // Estimated
      };

      return {
        settings,
        itineraries: transformedItineraries,
        stats,
      };
    } catch (error) {
      console.error("Error in getUserWebsiteData:", error);
      return {
        settings: this.getDefaultSettings(userId),
        itineraries: [],
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
   * Generate unique website URL for user
   */
  generateWebsiteUrl(userId: string, companyName: string): string {
    const slug = companyName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const shortUserId = userId.substring(0, 8);
    return `tour/${slug}-${shortUserId}`;
  }

  /**
   * Publish user's website
   */
  async publishWebsite(
    userId: string
  ): Promise<{ success: boolean; url?: string }> {
    try {
      const settings = await this.getUserWebsiteSettings(userId);
      const url = this.generateWebsiteUrl(userId, settings.company_name);

      // Update settings with published URL
      const updatedSettings = {
        ...settings,
        published_url: url,
        is_published: true,
        updated_at: new Date().toISOString(),
      };

      const success = await this.saveUserWebsiteSettings(updatedSettings);

      return { success, url: success ? url : undefined };
    } catch (error) {
      console.error("Error publishing website:", error);
      return { success: false };
    }
  }

  /**
   * Get default settings for new user
   */
  private getDefaultSettings(userId: string): UserWebsiteSettings {
    return {
      user_id: userId,
      company_name: "Your Cultural Tours",
      tagline: "Discover Authentic Cultural Experiences",
      description:
        "We specialize in creating immersive cultural experiences that connect you with local traditions and communities.",
      contact_info: {
        phone: "",
        email: "",
        address: "",
      },
      social_media: {},
      branding: {
        primary_color: "#9b87f5",
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
        keywords: ["cultural tours", "authentic experiences", "travel"],
      },
      is_published: false,
    };
  }
}

export const userWebsiteService = new UserWebsiteService();

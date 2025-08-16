import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

// Add error handling for missing or invalid Supabase credentials
if (
  supabaseUrl === "https://placeholder.supabase.co" ||
  supabaseAnonKey === "placeholder-key"
) {
  console.warn(
    "Supabase credentials not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: "pkce",
    storage: {
      getItem: (key) => {
        if (typeof window === "undefined") {
          return null;
        }
        console.log("Getting storage item:", key);
        return localStorage.getItem(key);
      },
      setItem: (key, value) => {
        if (typeof window === "undefined") {
          return;
        }
        console.log("Setting storage item:", key);
        localStorage.setItem(key, value);
      },
      removeItem: (key) => {
        if (typeof window === "undefined") {
          return;
        }
        console.log("Removing storage item:", key);
        localStorage.removeItem(key);
      },
    },
  },
  global: {
    headers: {
      "X-Client-Info": "culturin-studio",
    },
  },
});

// Database types (you can generate these from your Supabase dashboard)
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          updated_at: string | null;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          website: string | null;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
        };
      };
      users: {
        Row: {
          id: string;
          email: string | null;
          first_name: string | null;
          last_name: string | null;
          full_name: string | null;
          avatar_url: string | null;
          website: string | null;
          bio: string | null;
          role: string;
          studio_access: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          bio?: string | null;
          role?: string;
          studio_access?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          bio?: string | null;
          role?: string;
          studio_access?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      tours: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          description: string | null;
          price: number | null;
          duration: string | null;
          location: string | null;
          operator_id: string;
          image_url: string | null;
          category: string | null;
          max_participants: number | null;
          status: "active" | "inactive" | "draft";
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          description?: string | null;
          price?: number | null;
          duration?: string | null;
          location?: string | null;
          operator_id: string;
          image_url?: string | null;
          category?: string | null;
          max_participants?: number | null;
          status?: "active" | "inactive" | "draft";
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          description?: string | null;
          price?: number | null;
          duration?: string | null;
          location?: string | null;
          operator_id?: string;
          image_url?: string | null;
          category?: string | null;
          max_participants?: number | null;
          status?: "active" | "inactive" | "draft";
        };
      };
      experiences: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          title: string;
          description: string | null;
          days: number;
          status: "draft" | "published" | "archived";
          image: string | null;
          theme_type: string;
          regions: string[] | null;
          price: number | null;
          currency: string;
          group_size_min: number;
          group_size_max: number;
          difficulty: "easy" | "moderate" | "challenging" | "expert";
          tags: string[] | null;
          operator_id: string;
          last_updated: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title: string;
          description?: string | null;
          days?: number;
          status?: "draft" | "published" | "archived";
          image?: string | null;
          theme_type?: string;
          regions?: string[] | null;
          price?: number | null;
          currency?: string;
          group_size_min?: number;
          group_size_max?: number;
          difficulty?: "easy" | "moderate" | "challenging" | "expert";
          tags?: string[] | null;
          operator_id: string;
          last_updated?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title?: string;
          description?: string | null;
          days?: number;
          status?: "draft" | "published" | "archived";
          image?: string | null;
          theme_type?: string;
          regions?: string[] | null;
          price?: number | null;
          currency?: string;
          group_size_min?: number;
          group_size_max?: number;
          difficulty?: "easy" | "moderate" | "challenging" | "expert";
          tags?: string[] | null;
          operator_id?: string;
          last_updated?: string;
        };
      };
      itinerary_modules: {
        Row: {
          id: string;
          itinerary_id: string;
          day: number;
          type: string;
          title: string;
          description: string | null;
          time: string | null;
          duration: number | null;
          location: string | null;
          price: number | null;
          notes: string | null;
          images: string[] | null;
          position: number;
          properties: any | null;
          coordinates: any | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          itinerary_id: string;
          day: number;
          type: string;
          title: string;
          description?: string | null;
          time?: string | null;
          duration?: number | null;
          location?: string | null;
          price?: number | null;
          notes?: string | null;
          images?: string[] | null;
          position?: number;
          properties?: any | null;
          coordinates?: any | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          itinerary_id?: string;
          day?: number;
          type?: string;
          title?: string;
          description?: string | null;
          time?: string | null;
          duration?: number | null;
          location?: string | null;
          price?: number | null;
          notes?: string | null;
          images?: string[] | null;
          position?: number;
          properties?: any | null;
          coordinates?: any | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          created_at: string;
          tour_id: string;
          user_id: string;
          booking_date: string;
          participants: number;
          total_price: number;
          status: "pending" | "confirmed" | "cancelled" | "completed";
          guest_name: string;
          guest_email: string;
          guest_phone: string | null;
          special_requests: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          tour_id: string;
          user_id: string;
          booking_date: string;
          participants: number;
          total_price: number;
          status?: "pending" | "confirmed" | "cancelled" | "completed";
          guest_name: string;
          guest_email: string;
          guest_phone?: string | null;
          special_requests?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          tour_id?: string;
          user_id?: string;
          booking_date?: string;
          participants?: number;
          total_price?: number;
          status?: "pending" | "confirmed" | "cancelled" | "completed";
          guest_name?: string;
          guest_email?: string;
          guest_phone?: string | null;
          special_requests?: string | null;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string[];
          category: string;
          author_id: string;
          author_name: string;
          author_email: string;
          featured_image_url: string | null;
          featured_image_path: string | null;
          published: boolean;
          published_at: string | null;
          meta_title: string | null;
          meta_description: string | null;
          tags: string[] | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string[];
          category: string;
          author_id: string;
          author_name: string;
          author_email: string;
          featured_image_url?: string | null;
          featured_image_path?: string | null;
          published?: boolean;
          published_at?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          tags?: string[] | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title?: string;
          slug?: string;
          excerpt?: string;
          content?: string[];
          category?: string;
          author_id?: string;
          author_name?: string;
          author_email?: string;
          featured_image_url?: string | null;
          featured_image_path?: string | null;
          published?: boolean;
          published_at?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          tags?: string[] | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};

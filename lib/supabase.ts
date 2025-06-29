import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";

// Authentication hook
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔐 useSupabase - Initializing auth state");

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("🔐 useSupabase - Initial session:", {
        hasSession: !!session,
        userEmail: session?.user?.email,
        userId: session?.user?.id,
      });
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("🔐 useSupabase - Auth state change:", {
        event,
        hasSession: !!session,
        userEmail: session?.user?.email,
        userId: session?.user?.id,
      });
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, metadata?: any) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: metadata
        ? {
            data: metadata,
          }
        : undefined,
    });
    return { error };
  };

  // Sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };
}

// Tours data hook
export function useTours() {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("tours")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTours(data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createTour = async (tourData: any) => {
    try {
      const { data, error } = await supabase
        .from("tours")
        .insert([tourData])
        .select();

      if (error) throw error;

      // Refresh tours list
      fetchTours();
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  };

  const updateTour = async (id: string, updates: any) => {
    try {
      const { data, error } = await supabase
        .from("tours")
        .update(updates)
        .eq("id", id)
        .select();

      if (error) throw error;

      // Refresh tours list
      fetchTours();
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  };

  const deleteTour = async (id: string) => {
    try {
      const { error } = await supabase.from("tours").delete().eq("id", id);

      if (error) throw error;

      // Refresh tours list
      fetchTours();
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  };

  return {
    tours,
    loading,
    error,
    fetchTours,
    createTour,
    updateTour,
    deleteTour,
  };
}

// Bookings data hook
export function useBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("bookings")
        .select(
          `
          *,
          tours (
            title,
            location,
            price
          )
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (bookingData: any) => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .insert([bookingData])
        .select();

      if (error) throw error;

      // Refresh bookings list
      fetchBookings();
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", id)
        .select();

      if (error) throw error;

      // Refresh bookings list
      fetchBookings();
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  };

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    createBooking,
    updateBookingStatus,
  };
}

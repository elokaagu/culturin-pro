import { supabase } from "./supabase";

// Authentication utilities
export const authUtils = {
  // Check if user is authenticated
  isAuthenticated: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return !!session;
  },

  // Get current user
  getCurrentUser: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  },

  // Sign in with email/password
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },

  // Sign up with email/password
  signUp: async (email: string, password: string, metadata?: any) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
  },

  // Sign out
  signOut: async () => {
    return await supabase.auth.signOut();
  },

  // Reset password
  resetPassword: async (email: string) => {
    return await supabase.auth.resetPasswordForEmail(email);
  },
};

// Database utilities
export const dbUtils = {
  // Generic fetch function
  fetchData: async (table: string, columns = "*", filters?: any) => {
    let query = supabase.from(table).select(columns);

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }

    return await query;
  },

  // Generic insert function
  insertData: async (table: string, data: any) => {
    return await supabase.from(table).insert([data]).select();
  },

  // Generic update function
  updateData: async (table: string, id: string, updates: any) => {
    return await supabase.from(table).update(updates).eq("id", id).select();
  },

  // Generic delete function
  deleteData: async (table: string, id: string) => {
    return await supabase.from(table).delete().eq("id", id);
  },
};

// Tour-specific utilities
export const tourUtils = {
  // Get all active tours
  getActiveTours: async () => {
    return await supabase
      .from("tours")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false });
  },

  // Get tours by operator
  getToursByOperator: async (operatorId: string) => {
    return await supabase
      .from("tours")
      .select("*")
      .eq("operator_id", operatorId)
      .order("created_at", { ascending: false });
  },

  // Get tour by ID with full details
  getTourById: async (id: string) => {
    return await supabase
      .from("tours")
      .select(
        `
        *,
        profiles (
          full_name,
          avatar_url
        )
      `
      )
      .eq("id", id)
      .single();
  },

  // Search tours
  searchTours: async (searchTerm: string) => {
    return await supabase
      .from("tours")
      .select("*")
      .or(
        `title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%`
      )
      .eq("status", "active");
  },
};

// Booking-specific utilities
export const bookingUtils = {
  // Get bookings by user
  getBookingsByUser: async (userId: string) => {
    return await supabase
      .from("bookings")
      .select(
        `
        *,
        tours (
          title,
          location,
          image_url
        )
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
  },

  // Get bookings by tour operator
  getBookingsByOperator: async (operatorId: string) => {
    return await supabase
      .from("bookings")
      .select(
        `
        *,
        tours!inner (
          title,
          location,
          operator_id
        )
      `
      )
      .eq("tours.operator_id", operatorId)
      .order("created_at", { ascending: false });
  },

  // Create a new booking
  createBooking: async (bookingData: any) => {
    return await supabase
      .from("bookings")
      .insert([
        {
          ...bookingData,
          status: "pending",
        },
      ])
      .select();
  },

  // Update booking status
  updateBookingStatus: async (bookingId: string, status: string) => {
    return await supabase
      .from("bookings")
      .update({ status })
      .eq("id", bookingId)
      .select();
  },
};

// File upload utilities
export const fileUtils = {
  // Upload file to Supabase storage
  uploadFile: async (bucket: string, path: string, file: File) => {
    return await supabase.storage.from(bucket).upload(path, file);
  },

  // Get public URL for uploaded file
  getPublicUrl: (bucket: string, path: string) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  },

  // Delete file from storage
  deleteFile: async (bucket: string, path: string) => {
    return await supabase.storage.from(bucket).remove([path]);
  },
};

// Real-time subscription utilities
export const realtimeUtils = {
  // Subscribe to table changes
  subscribeToTable: (table: string, callback: (payload: any) => void) => {
    return supabase
      .channel(`${table}_changes`)
      .on("postgres_changes", { event: "*", schema: "public", table }, callback)
      .subscribe();
  },

  // Subscribe to specific row changes
  subscribeToRow: (
    table: string,
    id: string,
    callback: (payload: any) => void
  ) => {
    return supabase
      .channel(`${table}_${id}_changes`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table, filter: `id=eq.${id}` },
        callback
      )
      .subscribe();
  },
};

// Analytics utilities
export const analyticsUtils = {
  // Get booking stats for operator
  getBookingStats: async (
    operatorId: string,
    dateRange?: { start: string; end: string }
  ) => {
    let query = supabase
      .from("bookings")
      .select(
        `
        *,
        tours!inner (
          operator_id
        )
      `
      )
      .eq("tours.operator_id", operatorId);

    if (dateRange) {
      query = query
        .gte("created_at", dateRange.start)
        .lte("created_at", dateRange.end);
    }

    return await query;
  },

  // Get revenue data
  getRevenueData: async (operatorId: string, period = "30 days") => {
    return await supabase.rpc("get_revenue_data", {
      operator_id: operatorId,
      period_days: period === "30 days" ? 30 : period === "7 days" ? 7 : 90,
    });
  },
};

// Loyalty card utilities
export const loyaltyUtils = {
  // Get loyalty card by user
  getLoyaltyCardByUser: async (userId: string) => {
    return await supabase
      .from("loyalty_cards")
      .select("*")
      .eq("user_id", userId)
      .single();
  },

  // Create a new loyalty card
  createLoyaltyCard: async (cardData: any) => {
    return await supabase
      .from("loyalty_cards")
      .insert([cardData])
      .select()
      .single();
  },

  // Update loyalty card
  updateLoyaltyCard: async (cardId: string, updates: any) => {
    return await supabase
      .from("loyalty_cards")
      .update(updates)
      .eq("id", cardId)
      .select()
      .single();
  },

  // Get loyalty transactions
  getLoyaltyTransactions: async (cardId: string) => {
    return await supabase
      .from("loyalty_transactions")
      .select(`
        *,
        bookings (
          guest_name,
          tour_id,
          total_price
        )
      `)
      .eq("card_id", cardId)
      .order("created_at", { ascending: false });
  },

  // Create loyalty transaction
  createLoyaltyTransaction: async (transactionData: any) => {
    return await supabase
      .from("loyalty_transactions")
      .insert([transactionData])
      .select()
      .single();
  },

  // Calculate rewards for a purchase
  calculateRewards: (amount: number, tier: string) => {
    const rates = {
      bronze: 0.02,
      silver: 0.03,
      gold: 0.04,
      platinum: 0.05,
    };
    return amount * (rates[tier as keyof typeof rates] || 0.02);
  },

  // Get tier benefits
  getTierBenefits: (tier: string) => {
    const benefits = {
      bronze: [
        "Priority customer support",
        "5% discount on experiences",
        "Free cancellation up to 48 hours",
      ],
      silver: [
        "All Bronze benefits",
        "Concierge booking service",
        "Exclusive member-only experiences",
        "Travel insurance included",
      ],
      gold: [
        "All Silver benefits",
        "Private guide services",
        "VIP airport transfers",
        "24/7 emergency support",
        "Custom itinerary planning",
      ],
      platinum: [
        "All Gold benefits",
        "Private jet booking service",
        "Exclusive access to cultural events",
        "Personal travel advisor",
        "Luxury accommodation upgrades",
      ],
    };
    return benefits[tier as keyof typeof benefits] || benefits.bronze;
  },

  // Get tier pricing
  getTierPricing: (tier: string) => {
    const pricing = {
      bronze: { annualFee: 99, minBalance: 1000 },
      silver: { annualFee: 299, minBalance: 5000 },
      gold: { annualFee: 599, minBalance: 10000 },
      platinum: { annualFee: 1199, minBalance: 25000 },
    };
    return pricing[tier as keyof typeof pricing] || pricing.bronze;
  },
};

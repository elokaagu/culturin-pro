"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "../components/auth/AuthProvider";

export interface UserData {
  // General Settings
  businessName: string;
  email: string;
  phone: string;
  address: string;
  timezone: string;
  bio: string;

  // Website Settings
  websiteSettings: {
    companyName: string;
    tagline: string;
    description: string;
    primaryColor: string;
    headerImage: string | null;
    theme: string;
    enableBooking: boolean;
    headerSettings?: {
      layout: string;
      height: string;
      textAlign: string;
      showNav: boolean;
      navItems: string[];
      logo: string | null;
      backgroundType: string;
    };
    footerSettings?: {
      layout: string;
      showLogo: boolean;
      logo: string | null;
      backgroundColor: string;
      textColor: string;
      showSocial: boolean;
      socialLinks: {
        facebook: string;
        twitter: string;
        instagram: string;
        youtube: string;
      };
      contactInfo: {
        phone: string;
        email: string;
        address: string;
        website: string;
      };
    };
    fontSettings?: {
      headingFont: string;
      bodyFont: string;
      headingFontWeight: number;
      bodyFontWeight: number;
      headingFontSize: number;
      bodyFontSize: number;
      lineHeight: number;
      letterSpacing: number;
    };
    animationSettings?: {
      enableAnimations: boolean;
      animationSpeed: number;
      animationType: string;
      enableHoverEffects: boolean;
      enableScrollAnimations: boolean;
    };
    bookingSettings: {
      currency: string;
      paymentMethods: string[];
      requireDeposit: boolean;
      depositAmount: number;
      cancellationPolicy: string;
      termsAndConditions: string;
    };
  };

  // Notification Settings
  notifications: {
    emailNotifications: boolean;
    bookingAlerts: boolean;
    reviewAlerts: boolean;
    marketingEmails: boolean;
    weeklyReports: boolean;
    monthlyReports: boolean;
  };

  // Billing Info
  billing: {
    planName: string;
    planPrice: string;
    nextBilling: string;
    paymentMethods: Array<{
      id: string;
      type: string;
      last4: string;
      expiry: string;
      isDefault: boolean;
    }>;
  };
}

interface UserDataContextType {
  userData: UserData;
  updateUserData: (updates: Partial<UserData>) => void;
  updateWebsiteSettings: (
    updates: Partial<UserData["websiteSettings"]>
  ) => void;
  updateNotifications: (updates: Partial<UserData["notifications"]>) => void;
  saveUserData: () => void;
  isLoading: boolean;
}

const defaultUserData: UserData = {
  businessName: "Culturin Tours",
  email: "eloka.agu@icloud.com",
  phone: "+1 (555) 123-4567",
  address: "123 Cultural District, San Francisco, CA 94102",
  timezone: "utc-8",
  bio: "Founded by Eloka Agu, Culturin Tours specializes in immersive cultural experiences that connect travelers with authentic local traditions, stories, and communities around the world.",

  websiteSettings: {
    companyName: "Culturin Tours",
    tagline: "Authentic cultural experiences curated by Eloka Agu",
    description:
      "Founded by Eloka Agu, Culturin Tours specializes in immersive cultural experiences that connect travelers with authentic local traditions, stories, and communities around the world.",
    primaryColor: "#9b87f5",
    headerImage: null,
    theme: "classic",
    enableBooking: true,
    bookingSettings: {
      currency: "USD",
      paymentMethods: ["credit_card", "paypal", "bank_transfer"],
      requireDeposit: true,
      depositAmount: 25,
      cancellationPolicy:
        "Free cancellation up to 24 hours before the experience",
      termsAndConditions:
        "By booking this experience, you agree to our terms and conditions and cancellation policy.",
    },
  },

  notifications: {
    emailNotifications: true,
    bookingAlerts: true,
    reviewAlerts: true,
    marketingEmails: false,
    weeklyReports: true,
    monthlyReports: true,
  },

  billing: {
    planName: "Growth Plan",
    planPrice: "$99",
    nextBilling: "June 15, 2025",
    paymentMethods: [
      {
        id: "card-1",
        type: "Visa",
        last4: "4242",
        expiry: "05/28",
        isDefault: true,
      },
    ],
  },
};

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
);

export const UserDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Load user data from localStorage on mount
    const loadUserData = () => {
      try {
        const storedData = localStorage.getItem("culturin_user_data");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUserData({ ...defaultUserData, ...parsedData });
        } else {
          // Initialize with user auth data if available
          if (user) {
            setUserData((prev) => ({
              ...prev,
              email: user.email,
              businessName:
                (user.user_metadata?.full_name ||
                  user.email?.split("@")[0] ||
                  "User") + "'s Tours",
            }));
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [user]);

  const updateUserData = (updates: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...updates }));
  };

  const updateWebsiteSettings = (
    updates: Partial<UserData["websiteSettings"]>
  ) => {
    setUserData((prev) => ({
      ...prev,
      websiteSettings: { ...prev.websiteSettings, ...updates },
    }));

    // Also update localStorage for website settings (for backward compatibility)
    Object.entries(updates).forEach(([key, value]) => {
      if (key === "companyName")
        localStorage.setItem("websiteCompanyName", value as string);
      if (key === "tagline")
        localStorage.setItem("websiteTagline", value as string);
      if (key === "description")
        localStorage.setItem("websiteDescription", value as string);
      if (key === "primaryColor")
        localStorage.setItem("websitePrimaryColor", value as string);
      if (key === "headerImage") {
        if (value) localStorage.setItem("websiteHeaderImage", value as string);
        else localStorage.removeItem("websiteHeaderImage");
      }
      if (key === "theme")
        localStorage.setItem("selectedWebsiteTheme", value as string);
    });
  };

  const updateNotifications = (updates: Partial<UserData["notifications"]>) => {
    setUserData((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, ...updates },
    }));
  };

  const saveUserData = () => {
    try {
      localStorage.setItem("culturin_user_data", JSON.stringify(userData));
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  // Auto-save when userData changes
  useEffect(() => {
    if (!isLoading) {
      console.log("UserDataContext: Auto-saving userData:", userData); // Debug log
      saveUserData();
    }
  }, [userData, isLoading]);

  const value: UserDataContextType = {
    userData,
    updateUserData,
    updateWebsiteSettings,
    updateNotifications,
    saveUserData,
    isLoading,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = (): UserDataContextType => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};

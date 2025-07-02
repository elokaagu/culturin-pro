import { useState, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin" | "super_admin";
  avatar?: string;
}

// Mock user database - in a real app, this would be in your backend
const USERS_DB = [
  {
    id: "1",
    email: "eloka.agu@icloud.com",
    name: "Eloka Agu",
    role: "super_admin" as const,
    password: "Honour18!!", // In production, this would be hashed
  },
  {
    id: "2",
    email: "demo@culturin.com",
    name: "Demo User",
    role: "user" as const,
    password: "demo123",
  },
];

// Authentication functions
export const login = async (
  email: string,
  password: string
): Promise<User | null> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = USERS_DB.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    const userSession = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    // Store in localStorage (in production, use secure tokens)
    localStorage.setItem("user", JSON.stringify(userSession));
    localStorage.setItem("isAuthenticated", "true");

    return userSession;
  }

  return null;
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("isAuthenticated");
  window.location.href = "/";
};

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null;

  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const userStr = localStorage.getItem("user");

  if (isAuthenticated === "true" && userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  return null;
};

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("isAuthenticated") === "true";
};

export const isSuperAdmin = (user: User | null): boolean => {
  return user?.role === "super_admin";
};

export const isAdmin = (user: User | null): boolean => {
  return user?.role === "admin" || user?.role === "super_admin";
};

// React hook for authentication
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    console.log("🔍 Auth Debug - Current user from localStorage:", currentUser);
    console.log("🔍 Auth Debug - isAuthenticated:", !!currentUser);
    console.log("🔍 Auth Debug - isSuperAdmin:", isSuperAdmin(currentUser));
    setUser(currentUser);
    setLoading(false);
  }, []);

  const loginUser = async (email: string, password: string) => {
    console.log("🔍 Auth Debug - Attempting login with:", email);
    const loggedInUser = await login(email, password);
    console.log("🔍 Auth Debug - Login result:", loggedInUser);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const logoutUser = () => {
    console.log("🔍 Auth Debug - Logging out");
    logout();
    setUser(null);
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    isSuperAdmin: isSuperAdmin(user),
    isAdmin: isAdmin(user),
    login: loginUser,
    logout: logoutUser,
  };
};

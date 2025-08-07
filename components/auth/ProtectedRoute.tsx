"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/components/auth/AuthProvider";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSuperAdmin?: boolean;
  requireStudioAccess?: boolean;
}

const ProtectedRoute = ({
  children,
  requireSuperAdmin = false,
  requireStudioAccess = false,
}: ProtectedRouteProps) => {
  const { isLoggedIn, hasStudioAccess, isAdmin, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("🛡️ ProtectedRoute - Auth state:", {
      isLoggedIn,
      hasStudioAccess,
      isAdmin,
      requireSuperAdmin,
      requireStudioAccess,
      isLoading
    });
    
    if (isLoading) return;

    if (!isLoggedIn) {
      console.log("❌ User not logged in, redirecting to sign-in");
      router.push("/sign-in");
      return;
    }

    if (requireSuperAdmin && !isAdmin) {
      console.log("❌ User not admin, redirecting to sign-in");
      router.push("/sign-in");
      return;
    }

    if (requireStudioAccess && !hasStudioAccess) {
      console.log("❌ User doesn't have studio access, redirecting to sign-in");
      router.push("/sign-in");
      return;
    }
    
    console.log("✅ User authenticated and authorized");
  }, [
    isLoggedIn,
    hasStudioAccess,
    isAdmin,
    requireSuperAdmin,
    requireStudioAccess,
    isLoading,
    router,
  ]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (
    !isLoggedIn ||
    (requireSuperAdmin && !isAdmin) ||
    (requireStudioAccess && !hasStudioAccess)
  ) {
    return null; // Will redirect via useEffect
  }

  return <>{children}</>;
};

export default ProtectedRoute;

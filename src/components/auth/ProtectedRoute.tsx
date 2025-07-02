"use client";

import React, { useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireStudioAccess?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireStudioAccess = false,
}) => {
  const { isLoggedIn, hasStudioAccess, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Don't redirect while still loading
    if (isLoading) return;

    if (!isLoggedIn) {
      router.push("/sign-in");
      return;
    }

    if (requireStudioAccess && !hasStudioAccess) {
      router.push("/");
      return;
    }
  }, [isLoggedIn, hasStudioAccess, requireStudioAccess, isLoading, router]);

  // Show loading while checking authentication or during redirects
  if (isLoading || !isLoggedIn || (requireStudioAccess && !hasStudioAccess)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireStudioAccess?: boolean;
  requireSuperAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireStudioAccess = false,
  requireSuperAdmin = false,
}) => {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Don't redirect while still loading
    if (isLoading) return;

    if (!isLoggedIn) {
      router.push("/sign-in");
      return;
    }

    // Note: Admin access checks would be handled by a separate service

    // Note: Studio access checks would be handled by a separate service
  }, [isLoggedIn, requireStudioAccess, requireSuperAdmin, isLoading, router]);

  // Show loading while checking authentication or during redirects
  if (isLoading || !isLoggedIn) {
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

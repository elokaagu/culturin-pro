"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../src/components/auth/AuthProvider";

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
    if (isLoading) return;

    if (!isLoggedIn) {
      router.push("/sign-in");
      return;
    }

    if (requireSuperAdmin && !isAdmin) {
      router.push("/sign-in");
      return;
    }

    if (requireStudioAccess && !hasStudioAccess) {
      router.push("/sign-in");
      return;
    }
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

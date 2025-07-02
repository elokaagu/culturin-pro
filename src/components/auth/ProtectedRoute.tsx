"use client";

import React, { useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "../../../lib/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireStudioAccess?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireStudioAccess = false,
}) => {
  const { isLoggedIn, hasStudioAccess } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/sign-in");
      return;
    }

    if (requireStudioAccess && !hasStudioAccess) {
      navigate("/");
      return;
    }
  }, [isLoggedIn, hasStudioAccess, requireStudioAccess, navigate]);

  // Show loading while checking authentication
  if (!isLoggedIn || (requireStudioAccess && !hasStudioAccess)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <>{children}</>;
};

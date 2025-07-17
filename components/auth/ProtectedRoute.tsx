// AUTHENTICATION DISABLED: All visitors have access to all routes for now.
"use client";

import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSuperAdmin?: boolean;
  requireStudioAccess?: boolean;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Bypass all authentication and always render children
  return <>{children}</>;
};

export default ProtectedRoute;

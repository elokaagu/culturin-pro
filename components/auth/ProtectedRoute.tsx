"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/auth";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Shield, AlertTriangle } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSuperAdmin?: boolean;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({
  children,
  requireSuperAdmin = false,
  requireAdmin = false,
}: ProtectedRouteProps) => {
  const { user, loading, isAuthenticated, isSuperAdmin, isAdmin } = useAuth();
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.push(
        "/sign-in?redirect=" + encodeURIComponent(window.location.pathname)
      );
      return;
    }

    if (requireSuperAdmin && !isSuperAdmin) {
      setShowContent(false);
      return;
    }

    if (requireAdmin && !isAdmin) {
      setShowContent(false);
      return;
    }

    setShowContent(true);
  }, [
    loading,
    isAuthenticated,
    isSuperAdmin,
    isAdmin,
    requireSuperAdmin,
    requireAdmin,
    router,
  ]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8 text-center max-w-md">
          <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-600 mb-6">
            Please sign in to access this page.
          </p>
          <Button onClick={() => router.push("/sign-in")}>Sign In</Button>
        </Card>
      </div>
    );
  }

  if ((requireSuperAdmin && !isSuperAdmin) || (requireAdmin && !isAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8 text-center max-w-md">
          <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page.
            {requireSuperAdmin && " Super admin access required."}
            {requireAdmin && !requireSuperAdmin && " Admin access required."}
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Current user: {user?.email}</p>
            <p className="text-sm text-gray-500">Role: {user?.role}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="mt-4"
          >
            Go Home
          </Button>
        </Card>
      </div>
    );
  }

  if (!showContent) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

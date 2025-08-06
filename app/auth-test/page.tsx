"use client";

import React, { useState } from "react";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, LogOut, Shield, Mail, Lock, AlertCircle } from "lucide-react";

export default function AuthTestPage() {
  const { user, login, logout, isLoggedIn, isAdmin, hasStudioAccess, isLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await login(email, password);
      if (error) {
        setError(error.message || "Login failed");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Authentication Test</h1>
          <p className="text-gray-600">Test the Supabase authentication system</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Login Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert className="mb-4 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* User Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                User Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Logged In:</span>
                  <span className={`text-sm ${isLoggedIn ? "text-green-600" : "text-red-600"}`}>
                    {isLoggedIn ? "Yes" : "No"}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Email:</span>
                  <span className="text-sm text-gray-600">{user?.email || "Not logged in"}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">User ID:</span>
                  <span className="text-sm text-gray-600">{user?.id || "N/A"}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Studio Access:</span>
                  <span className={`text-sm ${hasStudioAccess ? "text-green-600" : "text-red-600"}`}>
                    {hasStudioAccess ? "Yes" : "No"}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Admin:</span>
                  <span className={`text-sm ${isAdmin ? "text-green-600" : "text-red-600"}`}>
                    {isAdmin ? "Yes" : "No"}
                  </span>
                </div>
              </div>

              {isLoggedIn && (
                <div className="space-y-2">
                  <Button
                    onClick={() => router.push("/studio")}
                    className="w-full"
                    variant="outline"
                  >
                    Go to Studio
                  </Button>
                  <Button
                    onClick={handleLogout}
                    className="w-full"
                    variant="outline"
                    size="sm"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Test Credentials */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Test Credentials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Admin User:</h4>
                <p className="text-sm text-gray-600">Email: eloka.agu@icloud.com</p>
                <p className="text-sm text-gray-600">Password: (check your Supabase dashboard)</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Regular User:</h4>
                <p className="text-sm text-gray-600">Create a new account or use any valid email/password</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
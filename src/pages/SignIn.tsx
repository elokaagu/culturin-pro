"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  Mail,
  Lock,
  ArrowLeft,
} from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";
import TranslatableText from "../../components/TranslatableText";
import Link from "next/link";
import { MotionCard, MotionText, MotionButton } from "@/components/motion";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  const { login, isLoggedIn, isLoading, isReady, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    console.log("Auth state:", { isLoggedIn, isLoading, isReady, user: !!user });
    
    // Don't redirect while auth is still loading or not ready
    if (isLoading || !isReady) {
      console.log("Not ready to redirect - loading:", isLoading, "ready:", isReady);
      return;
    }

    if (isLoggedIn) {
      console.log("User is logged in, redirecting to dashboard...");
      // Wait a moment for user data to be fully loaded
      const timer = setTimeout(() => {
        router.push("/pro-dashboard");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, isLoading, isReady, router]);

  // Don't render anything until mounted to prevent SSR issues
  if (!mounted) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            <TranslatableText text="Loading..." />
          </p>
        </div>
      </div>
    );
  }

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            <TranslatableText text="Loading..." />
          </p>
        </div>
      </div>
    );
  }

  // If already logged in, show loading while redirecting
  if (isLoggedIn) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to Culturin Studio...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password");
      setLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const { error } = await login(email, password);

      if (error) {
        // Handle specific error cases
        if (error.message.includes("Invalid login credentials")) {
          setError("Invalid email or password. Please try again.");
        } else if (error.message.includes("Email not confirmed")) {
          setError(
            "Please check your email and click the verification link before signing in."
          );
        } else if (error.message.includes("Too many requests")) {
          setError(
            "Too many sign-in attempts. Please wait a moment and try again."
          );
        } else {
          setError(
            error.message ||
              "An error occurred during sign-in. Please try again."
          );
        }
      }
      // If successful, the useEffect will handle navigation
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-culturin-indigo/10 to-white">
      <Header type="operator" />

      <div className="flex-1 flex items-center justify-center p-4 h-full">
        <div className="w-full max-w-md">
          {/* Back to home link */}
          <MotionText delay={0.1}>
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <TranslatableText text="Back to Home" />
            </Link>
          </MotionText>

          <MotionCard className="shadow-xl border-0" hover={false}>
            <Card className="border-0 shadow-none">
              <CardHeader className="text-center pb-6">
                <MotionText delay={0.2}>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    <TranslatableText text="Welcome Back" />
                  </CardTitle>
                </MotionText>
                <MotionText delay={0.3}>
                  <CardDescription className="text-gray-600">
                    <TranslatableText text="Sign in to access Culturin Studio" />
                  </CardDescription>
                </MotionText>
              </CardHeader>

              <CardContent className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      <TranslatableText text="Email Address" />
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="pl-10"
                        disabled={loading}
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      <TranslatableText text="Password" />
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        disabled={loading}
                        autoComplete="current-password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        disabled={loading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <MotionButton
                    type="submit"
                    className="w-full bg-culturin-indigo hover:bg-culturin-indigo/90"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        <TranslatableText text="Signing In..." />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <LogIn className="h-4 w-4 mr-2" />
                        <TranslatableText text="Sign In" />
                      </div>
                    )}
                  </MotionButton>
                </form>

                <MotionText delay={0.5}>
                  <div className="text-center space-y-3">
                    <Link
                      href="/sign-up"
                      className="text-sm text-culturin-indigo hover:text-culturin-indigo/80 transition-colors"
                    >
                      <TranslatableText text="Don't have an account? Sign up" />
                    </Link>
                  </div>
                </MotionText>
              </CardContent>
            </Card>
          </MotionCard>
        </div>
      </div>

      {/* Footer pushed below viewport */}
      <div className="hidden">
        <NewFooter />
      </div>
    </div>
  );
};

export default SignIn;

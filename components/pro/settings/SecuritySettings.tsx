"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  History,
  ExternalLink,
  AlertTriangle,
  Lock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Current password is required" }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .refine(
        (val) => /[A-Z]/.test(val),
        "Password must contain at least one uppercase letter"
      )
      .refine(
        (val) => /[a-z]/.test(val),
        "Password must contain at least one lowercase letter"
      )
      .refine(
        (val) => /[0-9]/.test(val),
        "Password must contain at least one number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SecuritySettings: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onChangePassword(values: z.infer<typeof passwordSchema>) {
    setIsChangingPassword(true);

    try {
      // Simulate password validation against current password
      // In a real app, this would validate against the backend/database
      const storedUser = localStorage.getItem("culturin_user");

      if (storedUser) {
        const userData = JSON.parse(storedUser);

        // Check if current password matches (simplified validation)
        // In production, this should be done server-side with proper hashing
        const validCredentials = [
          { email: "eloka.agu@icloud.com", password: "Honour18!!" },
          { email: "demo@culturin.com", password: "demo123" },
        ];

        const userCreds = validCredentials.find(
          (cred) => cred.email === userData.email
        );

        if (!userCreds || values.currentPassword !== userCreds.password) {
          toast.error("Current password is incorrect", {
            description: "Please enter your current password correctly.",
          });
          setIsChangingPassword(false);
          return;
        }

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // In a real app, you would:
        // 1. Send the password change request to your backend
        // 2. Update the password in your database (properly hashed)
        // 3. Optionally invalidate all sessions except current

        // For demo purposes, we'll update the stored credentials
        const updatedCredentials = validCredentials.map((cred) =>
          cred.email === userData.email
            ? { ...cred, password: values.newPassword }
            : cred
        );

        // Store the updated password (in production, this would be handled server-side)
        localStorage.setItem(
          "user_credentials_demo",
          JSON.stringify(updatedCredentials)
        );

        toast.success("Password changed successfully", {
          description:
            "Your password has been updated. Please use your new password for future logins.",
        });

        passwordForm.reset();

        // Add to recent activities
        const activities = JSON.parse(
          localStorage.getItem("user_activities") || "[]"
        );
        activities.unshift({
          id: Date.now(),
          event: "Password change",
          date: new Date().toLocaleDateString(),
          device: "Current device - " + navigator.userAgent.split(")")[0] + ")",
        });
        localStorage.setItem(
          "user_activities",
          JSON.stringify(activities.slice(0, 10))
        );
      } else {
        toast.error("User not found", {
          description: "Please sign in again to change your password.",
        });
      }
    } catch (error) {
      toast.error("Failed to change password", {
        description:
          "An error occurred while changing your password. Please try again.",
      });
    } finally {
      setIsChangingPassword(false);
    }
  }

  const handleEnableTwoFactor = () => {
    toast.success("2FA setup instructions sent to your email");
    setTwoFactorEnabled(true);
    // In a real app, this would trigger the 2FA setup flow
  };

  const handleSignOutAllDevices = () => {
    // Add activity log entry
    const activities = JSON.parse(
      localStorage.getItem("user_activities") || "[]"
    );
    activities.unshift({
      id: Date.now(),
      event: "Signed out all devices",
      date: new Date().toLocaleDateString(),
      device:
        "Current device - " +
        (typeof window !== "undefined"
          ? navigator.userAgent.split(")")[0] + ")"
          : "Unknown"),
    });
    localStorage.setItem(
      "user_activities",
      JSON.stringify(activities.slice(0, 10))
    );
    setRecentActivities(activities.slice(0, 10));

    toast.success("Signed out all devices", {
      description:
        "All other sessions have been terminated. You remain logged in on this device.",
    });
  };

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      event: "Login",
      date: new Date().toLocaleDateString(),
      device:
        "Current device - " +
        (typeof window !== "undefined"
          ? navigator.userAgent.split(")")[0] + ")"
          : "Unknown"),
    },
    {
      id: 2,
      event: "Profile update",
      date: new Date(Date.now() - 86400000).toLocaleDateString(),
      device:
        "Current device - " +
        (typeof window !== "undefined"
          ? navigator.userAgent.split(")")[0] + ")"
          : "Unknown"),
    },
  ]);

  // Calculate password strength
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  // Load activities from localStorage on component mount
  useEffect(() => {
    const storedActivities = localStorage.getItem("user_activities");
    if (storedActivities) {
      try {
        const activities = JSON.parse(storedActivities);
        setRecentActivities(activities);
      } catch (error) {
        console.error("Error loading activities:", error);
      }
    }
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Security Settings</h2>
        <p className="text-gray-500">
          Protect your Culturin account and tour operator business.
        </p>
      </div>

      {/* Change Password */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center">
          <Lock className="h-5 w-5 mr-2 text-blue-600" />
          Change Password
        </h3>

        <Form {...passwordForm}>
          <form
            onSubmit={passwordForm.handleSubmit(onChangePassword)}
            className="space-y-4"
          >
            <FormField
              control={passwordForm.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Your current password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={passwordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Your new password"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setPasswordStrength(
                          calculatePasswordStrength(e.target.value)
                        );
                      }}
                    />
                  </FormControl>
                  {field.value && (
                    <div className="space-y-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-2 w-full rounded ${
                              level <= passwordStrength
                                ? passwordStrength <= 2
                                  ? "bg-red-500"
                                  : passwordStrength <= 3
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                                : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600">
                        Password strength:{" "}
                        {passwordStrength <= 2
                          ? "Weak"
                          : passwordStrength <= 3
                          ? "Medium"
                          : "Strong"}
                      </p>
                    </div>
                  )}
                  <FormDescription>
                    Password must be at least 8 characters and include
                    uppercase, lowercase, and numbers.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm your new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isChangingPassword}
              className="flex items-center gap-2"
            >
              {isChangingPassword && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {isChangingPassword ? "Changing Password..." : "Change Password"}
            </Button>
          </form>
        </Form>
      </div>

      <Separator />

      {/* Two-Factor Authentication */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center">
          <Shield className="h-5 w-5 mr-2 text-blue-600" />
          Two-Factor Authentication
        </h3>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>

            <div className="flex-1">
              <h4 className="font-medium">Protect Your Cultural Business</h4>
              <p className="text-gray-600 mt-1">
                Two-factor authentication adds an extra layer of security to
                your account, ensuring that only you can access your cultural
                tour operations.
              </p>

              <div className="mt-4">
                {twoFactorEnabled ? (
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Enabled
                    </Badge>
                    <Button variant="outline" size="sm">
                      Manage Settings
                    </Button>
                  </div>
                ) : (
                  <Button onClick={handleEnableTwoFactor}>
                    Enable Two-Factor Authentication
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Sessions & Activity */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center">
          <History className="h-5 w-5 mr-2 text-blue-600" />
          Recent Account Activity
        </h3>

        <div className="rounded-md border">
          <div className="grid grid-cols-3 p-4 font-medium border-b">
            <div>Activity</div>
            <div>Date</div>
            <div>Device</div>
          </div>

          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="grid grid-cols-3 p-4 border-b last:border-0"
            >
              <div>{activity.event}</div>
              <div>{activity.date}</div>
              <div>{activity.device}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Full Activity Log
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={handleSignOutAllDevices}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Sign Out All Devices
          </Button>
        </div>
      </div>

      <Alert className="bg-blue-50 border-blue-100">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          We recommend regularly updating your password and enabling two-factor
          authentication to keep your cultural tour operator account secure.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SecuritySettings;

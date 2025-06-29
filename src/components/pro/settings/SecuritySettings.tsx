'use client'

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Shield, History, ExternalLink, AlertTriangle, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const passwordSchema = z.object({
  currentPassword: z.string().min(1, { message: "Current password is required" }),
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters" })
    .refine(val => /[A-Z]/.test(val), "Password must contain at least one uppercase letter")
    .refine(val => /[a-z]/.test(val), "Password must contain at least one lowercase letter")
    .refine(val => /[0-9]/.test(val), "Password must contain at least one number"),
  confirmPassword: z.string()
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const SecuritySettings: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onChangePassword(values: z.infer<typeof passwordSchema>) {
    toast.success("Password changed successfully");
    passwordForm.reset();
    console.log(values);
  }

  const handleEnableTwoFactor = () => {
    toast.success("2FA setup instructions sent to your email");
    setTwoFactorEnabled(true);
    // In a real app, this would trigger the 2FA setup flow
  };

  const recentActivities = [
    { id: 1, event: "Password change", date: "May 2, 2025", device: "Mac - Chrome" },
    { id: 2, event: "Login", date: "May 1, 2025", device: "iPhone - Safari" },
    { id: 3, event: "Login", date: "April 29, 2025", device: "Mac - Chrome" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Security Settings</h2>
        <p className="text-gray-500">Protect your Culturin account and tour operator business.</p>
      </div>
      
      {/* Change Password */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center">
          <Lock className="h-5 w-5 mr-2 text-blue-600" />
          Change Password
        </h3>
        
        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(onChangePassword)} className="space-y-4">
            <FormField
              control={passwordForm.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Your current password" {...field} />
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
                    <Input type="password" placeholder="Your new password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Password must be at least 8 characters and include uppercase, lowercase, and numbers.
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
                    <Input type="password" placeholder="Confirm your new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit">Change Password</Button>
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
                Two-factor authentication adds an extra layer of security to your account, ensuring that only you can access your cultural tour operations.
              </p>
              
              <div className="mt-4">
                {twoFactorEnabled ? (
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800 border-green-200">Enabled</Badge>
                    <Button variant="outline" size="sm">Manage Settings</Button>
                  </div>
                ) : (
                  <Button onClick={handleEnableTwoFactor}>Enable Two-Factor Authentication</Button>
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
          
          {recentActivities.map(activity => (
            <div key={activity.id} className="grid grid-cols-3 p-4 border-b last:border-0">
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
          
          <Button variant="destructive" size="sm">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Sign Out All Devices
          </Button>
        </div>
      </div>
      
      <Alert className="bg-blue-50 border-blue-100">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          We recommend regularly updating your password and enabling two-factor authentication to keep your cultural tour operator account secure.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SecuritySettings;

"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useUserData } from "../../../src/contexts/UserDataContext";
import { settingsService } from "@/lib/settings-service";

const formSchema = z.object({
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  timezone: z.string({
    required_error: "Please select a timezone.",
  }),
  bio: z
    .string()
    .max(500, {
      message: "Bio must not be more than 500 characters.",
    })
    .optional(),
});

const timezones = [
  { value: "utc-8", label: "Pacific Time (UTC-8)" },
  { value: "utc-5", label: "Eastern Time (UTC-5)" },
  { value: "utc+0", label: "Greenwich Mean Time (UTC+0)" },
  { value: "utc+1", label: "Central European Time (UTC+1)" },
  { value: "utc+8", label: "China Standard Time (UTC+8)" },
  { value: "utc+9", label: "Japan Standard Time (UTC+9)" },
];

const GeneralSettings: React.FC = () => {
  const { userData, updateUserData, saveUserData } = useUserData();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: userData.businessName,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      timezone: userData.timezone,
      bio: userData.bio,
    },
  });

  // Update form when userData changes
  useEffect(() => {
    form.reset({
      businessName: userData.businessName,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      timezone: userData.timezone,
      bio: userData.bio,
    });
  }, [userData, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true);

    try {
      // Update local state immediately for better UX
      updateUserData(values);

      // Also update website settings if business name changed
      if (values.businessName !== userData.businessName) {
        updateUserData({
          websiteSettings: {
            ...userData.websiteSettings,
            companyName: values.businessName,
          },
        });
      }

      // Save to database using the settings service
      await settingsService.saveGeneralSettings(values);

      // Also save to localStorage for immediate persistence
      saveUserData();

      toast.success("Settings updated successfully", {
        description:
          "Your profile information has been saved and will be reflected across the platform.",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings", {
        description: error instanceof Error ? error.message : "Please try again. If the problem persists, contact support.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">General Settings</h2>
        <p className="text-gray-500">
          Manage your basic information and preferences. Changes here will
          automatically update your website and other platform features.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your business name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be used as your company name on your website
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Primary contact email for your business
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timezone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timezone</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a timezone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timezones.map((timezone) => (
                        <SelectItem key={timezone.value} value={timezone.value}>
                          {timezone.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Address</FormLabel>
                <FormControl>
                  <Input placeholder="Your business address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your business..."
                    className="resize-none min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This will appear on your website and public profile. Max 500
                  characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GeneralSettings;

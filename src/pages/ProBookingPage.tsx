"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "../../lib/navigation";
import ProDashboardLayout from "@/components/pro/ProDashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BookingsTab from "@/components/BookingsTab";
import BookingOverview from "@/components/BookingOverview";
import { useAuthState } from "@/src/hooks/useAuthState";

const ProBookingPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { user, userData, isReady } = useAuthState();

  // Load user-specific booking data
  useEffect(() => {
    if (isReady && user) {
      // Here you can load user-specific bookings, analytics, etc.
    }
  }, [isReady, user]);

  const handleCreateNewExperience = () => {
    // Route to the experience creation flow
    navigate("/pro-dashboard/itinerary?new=true");
  };

  return (
    <ProDashboardLayout
      title="Booking System"
      subtitle="A conversion-optimised booking experience that reflects the emotional frame of the trip"
    >
      <div className="space-y-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full max-w-lg grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-0">
            <BookingOverview />
          </TabsContent>

          <TabsContent value="bookings" className="mt-0">
            <Card>
              <CardContent className="pt-6">
                <BookingsTab />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center">
          <Button
            onClick={handleCreateNewExperience}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Create New Experience
          </Button>
        </div>
      </div>
    </ProDashboardLayout>
  );
};

export default ProBookingPage;

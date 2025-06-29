'use client'

import React, { useState } from 'react';
import { useNavigate } from '../../lib/navigation';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BookingsTab from '@/components/BookingsTab';
import BookingOverview from '@/components/BookingOverview';
import DynamicPricingSystem from '@/components/pro/booking/DynamicPricingSystem';

const ProBookingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const handleCreateNewExperience = () => {
    // Route to the experience creation flow
    navigate('/pro-dashboard/itinerary?new=true');
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
          <TabsList className="grid w-full max-w-lg grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="pricing">Dynamic Pricing</TabsTrigger>
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

          <TabsContent value="pricing" className="mt-0">
            <DynamicPricingSystem />
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-center">
          <Button onClick={handleCreateNewExperience} className="bg-blue-600 hover:bg-blue-700">
            Create New Experience
          </Button>
        </div>
      </div>
    </ProDashboardLayout>
  );
};

export default ProBookingPage;

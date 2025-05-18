
import React, { useState } from 'react';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import BookingsTab from '@/components/BookingsTab';
import BookingOverview from '@/components/BookingOverview';

const ProBookingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <ProDashboardLayout
      title="Booking System"
      subtitle="A conversion-optimised booking experience that reflects the emotional frame of the trip"
    >
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <BookingOverview />
        </TabsContent>
        
        <TabsContent value="bookings">
          <Card>
            <CardContent className="pt-6">
              <BookingsTab />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </ProDashboardLayout>
  );
};

export default ProBookingPage;

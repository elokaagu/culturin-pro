
import React from 'react';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';

const ProBookingPage = () => {
  return (
    <ProDashboardLayout
      title="Booking System"
      subtitle="Manage your bookings and reservations"
    >
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Booking Management</h2>
        <p className="text-gray-600">This feature will be available soon. Stay tuned!</p>
      </div>
    </ProDashboardLayout>
  );
};

export default ProBookingPage;


import React from 'react';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';

const ProItineraryPage = () => {
  return (
    <ProDashboardLayout
      title="Itinerary Builder"
      subtitle="Create and manage your experience itineraries"
    >
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Itinerary Builder</h2>
        <p className="text-gray-600">This feature will be available soon. Stay tuned!</p>
      </div>
    </ProDashboardLayout>
  );
};

export default ProItineraryPage;

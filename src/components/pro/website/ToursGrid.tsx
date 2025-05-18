
import React from 'react';
import { ItineraryType } from '@/data/itineraryData';

interface ToursGridProps {
  itineraries: ItineraryType[];
  onTourSelect: (tour: ItineraryType) => void;
  primaryColor: string;
}

const ToursGrid: React.FC<ToursGridProps> = ({ itineraries, onTourSelect, primaryColor }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {itineraries.map((itinerary) => (
        <div key={itinerary.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
          {itinerary.image ? (
            <img src={itinerary.image} alt={itinerary.title} className="w-full h-48 object-cover" />
          ) : (
            <div className="w-full h-48 bg-gray-200"></div>
          )}
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{itinerary.title}</h3>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600">{itinerary.days} {itinerary.days === 1 ? 'day' : 'days'}</p>
              <p className="font-semibold">From $99 per person</p>
            </div>
            <button 
              className="w-full px-4 py-2 rounded text-white text-center font-medium cursor-pointer"
              style={{ backgroundColor: primaryColor }}
              onClick={() => onTourSelect(itinerary)}
            >
              Book Now
            </button>
          </div>
        </div>
      ))}
      
      {itineraries.length === 0 && (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-500">No tours available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default ToursGrid;

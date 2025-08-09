"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ItinerariesRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the correct pro dashboard itinerary page
    router.replace("/pro-dashboard/itinerary");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to Pro Dashboard...</p>
      </div>
    </div>
  );
}

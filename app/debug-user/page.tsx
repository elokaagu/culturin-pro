"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DebugUserPage() {
  const { user, isLoggedIn } = useAuth();
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    if (user) {
      console.log("Current authenticated user:", user);
      setUserInfo({
        id: user.id,
        email: user.email,
        created_at: user.created_at,
        last_sign_in_at: user.last_sign_in_at,
      });
    }
  }, [user]);

  const checkItineraries = async () => {
    if (!user) return;
    
    console.log("Checking itineraries for user:", user.id);
    
    const { data, error } = await supabase
      .from("itineraries")
      .select("*")
      .eq("operator_id", user.id);
      
    console.log("Itineraries query result:", { data, error });
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Debug User Info</h1>
        <p>Please log in to see user information.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Debug User Info</h1>
      
      {userInfo && (
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-2">Current User:</h2>
          <pre className="text-sm">{JSON.stringify(userInfo, null, 2)}</pre>
        </div>
      )}
      
      <button
        onClick={checkItineraries}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Check Itineraries for This User
      </button>
      
      <div className="mt-4">
        <h3 className="font-semibold">Expected User ID from Database:</h3>
        <p className="text-sm text-gray-600">fa8561b1-44ca-4c05-ac6e-baee597484d6</p>
        
        <h3 className="font-semibold mt-2">Current User ID:</h3>
        <p className="text-sm text-gray-600">{user?.id || "Not logged in"}</p>
        
        <h3 className="font-semibold mt-2">Match:</h3>
        <p className={`text-sm ${user?.id === "fa8561b1-44ca-4c05-ac6e-baee597484d6" ? "text-green-600" : "text-red-600"}`}>
          {user?.id === "fa8561b1-44ca-4c05-ac6e-baee597484d6" ? "✅ IDs Match" : "❌ IDs Don't Match"}
        </p>
      </div>
    </div>
  );
}

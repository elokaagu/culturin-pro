"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/src/components/auth/AuthProvider";

export default function SessionTestPage() {
  const { user, isLoggedIn, isLoading } = useAuth();
  const [sessionInfo, setSessionInfo] = useState<any>(null);
  const [localStorageInfo, setLocalStorageInfo] = useState<any>(null);
  const [allLocalStorage, setAllLocalStorage] = useState<any>(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSessionInfo({
        hasSession: !!session,
        userEmail: session?.user?.email,
        userId: session?.user?.id,
        sessionData: session
      });
    });

    // Check all localStorage items
    if (typeof window !== "undefined") {
      const allItems: any = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          allItems[key] = localStorage.getItem(key);
        }
      }
      setAllLocalStorage(allItems);

      // Check specific Supabase auth token
      const supabaseAuthToken = localStorage.getItem("sb-leiesulmdjrfmufwjiam-auth-token");
      setLocalStorageInfo({
        hasToken: !!supabaseAuthToken,
        tokenData: supabaseAuthToken ? JSON.parse(supabaseAuthToken) : null
      });
    }
  }, []);

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: "eloka@satellitelabs.xyz",
      password: "your-password-here" // You'll need to enter the actual password
    });
    
    if (error) {
      console.error("Sign in error:", error);
    } else {
      console.log("Sign in successful");
      window.location.reload();
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Session Test Page</h1>
      
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Auth Context State</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify({
              user: user?.email,
              isLoggedIn,
              isLoading,
              userId: user?.id
            }, null, 2)}
          </pre>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Supabase Session</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(sessionInfo, null, 2)}
          </pre>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">LocalStorage Token</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(localStorageInfo, null, 2)}
          </pre>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">All LocalStorage Items</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
            {JSON.stringify(allLocalStorage, null, 2)}
          </pre>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Test Sign In</h2>
          <button 
            onClick={handleSignIn}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Sign In as eloka@satellitelabs.xyz
          </button>
          <p className="text-sm text-gray-600 mt-2">
            Note: You'll need to enter the actual password in the code
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { supabase } from "@/lib/supabase";

export default function AuthDebugPage() {
  const { user, isLoggedIn, isLoading } = useAuth();
  const [sessionInfo, setSessionInfo] = useState<any>(null);
  const [localStorageInfo, setLocalStorageInfo] = useState<any>(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSessionInfo({
        hasSession: !!session,
        userEmail: session?.user?.email,
        userId: session?.user?.id,
        sessionData: session,
      });
    });

    // Check localStorage
    if (typeof window !== "undefined") {
      const supabaseAuthToken = localStorage.getItem(
        "sb-leiesulmdjrfmufwjiam-auth-token"
      );
      setLocalStorageInfo({
        hasToken: !!supabaseAuthToken,
        tokenData: supabaseAuthToken ? JSON.parse(supabaseAuthToken) : null,
      });
    }
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Authentication Debug</h1>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Auth Context State</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(
              {
                user: user?.email,
                isLoggedIn,
                isLoading,
                userId: user?.id,
              },
              null,
              2
            )}
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
          <h2 className="text-lg font-semibold mb-4">Environment Variables</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(
              {
                supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
                hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { ItineraryType } from "@/data/itineraryData";

export default function CheckItinerariesPage() {
  const { user, isLoggedIn } = useAuth();
  const [dbItineraries, setDbItineraries] = useState<ItineraryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [localStorageData, setLocalStorageData] = useState<any>({});

  // Load itineraries directly from Supabase
  useEffect(() => {
    const loadItinerariesFromDatabase = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        console.log("Loading itineraries from database for user:", user.id);

        const { data, error: dbError } = await supabase
          .from("itineraries")
          .select("*")
          .eq("operator_id", user.id)
          .order("created_at", { ascending: false });

        if (dbError) {
          console.error("Error fetching itineraries from database:", dbError);
          setError(dbError.message);
          return;
        }

        if (data) {
          console.log(`Found ${data.length} itineraries in database`);
          
          // Convert database format to ItineraryType
          const itineraries = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            days: item.days,
            status: item.status,
            image: item.image,
            themeType: item.theme_type,
            regions: item.regions || [],
            price: item.price,
            currency: item.currency || "USD",
            groupSize: {
              min: item.group_size_min || 1,
              max: item.group_size_max || 10,
            },
            difficulty: item.difficulty || "easy",
            tags: item.tags || [],
            modules: item.modules || [],
            lastUpdated: item.last_updated || "just now",
          }));

          setDbItineraries(itineraries);
        }
      } catch (err) {
        console.error("Error loading itineraries:", err);
        setError(err instanceof Error ? err.message : "Failed to load itineraries");
      } finally {
        setIsLoading(false);
      }
    };

    loadItinerariesFromDatabase();
  }, [user?.id]);

  // Check localStorage for comparison
  useEffect(() => {
    const checkLocalStorage = () => {
      const data: any = {};
      const keys = Object.keys(localStorage);

      keys.forEach((key) => {
        if (
          key.includes("itinerary") ||
          key.includes("culturin") ||
          key.includes("website")
        ) {
          try {
            const value = localStorage.getItem(key);
            if (value) {
              data[key] = JSON.parse(value);
            }
          } catch (error) {
            data[key] = { error: "Failed to parse" };
          }
        }
      });

      setLocalStorageData(data);
    };

    checkLocalStorage();
  }, []);

  // Push local itineraries to database
  const pushLocalToDatabase = async () => {
    if (!user?.id) return;

    try {
      const localItineraries = localStorageData.culturinItineraries || [];
      const localOnlyItineraries = localItineraries.filter((it: any) => 
        it.id && it.id.startsWith('local-')
      );

      if (localOnlyItineraries.length === 0) {
        alert("No local itineraries found to push to database");
        return;
      }

      console.log(`Pushing ${localOnlyItineraries.length} local itineraries to database...`);

      for (const itinerary of localOnlyItineraries) {
        const { data, error } = await supabase
          .from("itineraries")
          .insert({
            title: itinerary.title,
            description: itinerary.description,
            days: itinerary.days,
            status: itinerary.status,
            image: itinerary.image,
            theme_type: itinerary.themeType,
            regions: itinerary.regions,
            price: itinerary.price,
            currency: itinerary.currency || "USD",
            group_size_min: itinerary.groupSize?.min || 1,
            group_size_max: itinerary.groupSize?.max || 10,
            difficulty: itinerary.difficulty || "easy",
            tags: itinerary.tags,
            operator_id: user.id,
            last_updated: "just now",
          })
          .select()
          .single();

        if (error) {
          console.error(`Error pushing itinerary ${itinerary.title}:`, error);
        } else {
          console.log(`Successfully pushed itinerary: ${data.id}`);
        }
      }

      // Reload itineraries after pushing
      window.location.reload();
    } catch (error) {
      console.error("Error pushing itineraries:", error);
      alert("Error pushing itineraries to database");
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        Itinerary Check for eloka@satellitelabs.xyz
      </h1>

      {/* User Info */}
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoggedIn ? (
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>User ID:</strong> {user?.id}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <Badge variant="default">Authenticated</Badge>
              </p>
            </div>
          ) : (
            <p>
              <Badge variant="destructive">Not Authenticated</Badge>
            </p>
          )}
        </CardContent>
      </Card>

      {/* Database Itineraries */}
      <Card>
        <CardHeader>
          <CardTitle>Supabase Database Itineraries</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading from database...</p>
          ) : error ? (
            <div className="text-red-600">
              <p><strong>Error:</strong> {error}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p>
                <strong>Count:</strong> {dbItineraries.length}
              </p>
              {dbItineraries.map((itinerary, index) => (
                <div key={itinerary.id} className="border p-3 rounded">
                  <p>
                    <strong>
                      {index + 1}. {itinerary.title}
                    </strong>
                  </p>
                  <p>ID: {itinerary.id}</p>
                  <p>Status: {itinerary.status}</p>
                  <p>Days: {itinerary.days}</p>
                  <p>Price: ${itinerary.price}</p>
                  <p>Last Updated: {itinerary.lastUpdated}</p>
                  {itinerary.description && (
                    <p className="text-sm text-gray-600 mt-2">
                      {itinerary.description}
                    </p>
                  )}
                </div>
              ))}
              {dbItineraries.length === 0 && (
                <p className="text-gray-500">
                  No itineraries found in Supabase database
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Push to Database Button */}
      {isLoggedIn && Object.keys(localStorageData).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Database Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={pushLocalToDatabase}>
              Push Local Itineraries to Database
            </Button>
            <p className="text-sm text-gray-600 mt-2">
              This will push any local itineraries to the Supabase database
            </p>
          </CardContent>
        </Card>
      )}

      {/* LocalStorage Data (for comparison) */}
      <Card>
        <CardHeader>
          <CardTitle>LocalStorage Data (for comparison)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.keys(localStorageData).length === 0 ? (
              <p className="text-gray-500">
                No relevant localStorage data found
              </p>
            ) : (
              Object.entries(localStorageData).map(([key, value]) => (
                <div key={key} className="border p-3 rounded">
                  <p>
                    <strong>Key:</strong> {key}
                  </p>
                  <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-auto">
                    {JSON.stringify(value, null, 2)}
                  </pre>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

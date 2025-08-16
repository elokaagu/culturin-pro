"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { ExperienceType } from "@/data/experienceData";

export default function CheckExperiencesPage() {
  const { user, isLoggedIn } = useAuth();
  const [dbExperiences, setDbExperiences] = useState<ExperienceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [localStorageData, setLocalStorageData] = useState<any>({});

  // Load experiences directly from Supabase
  useEffect(() => {
    const loadExperiencesFromDatabase = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        console.log("Loading experiences from database for user:", user.id);

        const { data, error: dbError } = await supabase
          .from("experiences")
          .select("*")
          .eq("operator_id", user.id)
          .order("created_at", { ascending: false });

        if (dbError) {
          console.error("Error fetching experiences from database:", dbError);
          setError(dbError.message);
          return;
        }

        if (data) {
          console.log(`Found ${data.length} experiences in database`);
          
          // Convert database format to ExperienceType
          const experiences = data.map((item: any) => ({
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

          setDbExperiences(experiences);
        }
      } catch (err) {
        console.error("Error loading experiences:", err);
        setError(err instanceof Error ? err.message : "Failed to load experiences");
      } finally {
        setIsLoading(false);
      }
    };

    loadExperiencesFromDatabase();
  }, [user?.id]);

  // Check localStorage for comparison
  useEffect(() => {
    const checkLocalStorage = () => {
      const data: any = {};
      const keys = Object.keys(localStorage);

      keys.forEach((key) => {
        if (
          key.includes("experience") ||
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

  // Push local experiences to database
  const pushLocalToDatabase = async () => {
    if (!user?.id) return;

    try {
      const localItineraries = localStorageData.culturinItineraries || [];
      const localOnlyItineraries = localItineraries.filter((it: any) => 
        it.id && it.id.startsWith('local-')
      );

      if (localOnlyItineraries.length === 0) {
        alert("No local experiences found to push to database");
        return;
      }

      console.log(`Pushing ${localOnlyItineraries.length} local experiences to database...`);

      for (const experience of localOnlyItineraries) {
        const { data, error } = await supabase
          .from("experiences")
          .insert({
            title: experience.title,
            description: experience.description,
            days: experience.days,
            status: experience.status,
            image: experience.image,
            theme_type: experience.themeType,
            regions: experience.regions,
            price: experience.price,
            currency: experience.currency || "USD",
            group_size_min: experience.groupSize?.min || 1,
            group_size_max: experience.groupSize?.max || 10,
            difficulty: experience.difficulty || "easy",
            tags: experience.tags,
            operator_id: user.id,
            last_updated: "just now",
          })
          .select()
          .single();

        if (error) {
          console.error(`Error pushing experience ${experience.title}:`, error);
        } else {
          console.log(`Successfully pushed experience: ${data.id}`);
        }
      }

      // Reload experiences after pushing
      window.location.reload();
    } catch (error) {
      console.error("Error pushing experiences:", error);
      alert("Error pushing experiences to database");
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        Experience Check for eloka@satellitelabs.xyz
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

      {/* Database Experiences */}
      <Card>
        <CardHeader>
          <CardTitle>Supabase Database Experiences</CardTitle>
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
                <strong>Count:</strong> {dbExperiences.length}
              </p>
              {dbExperiences.map((experience, index) => (
                <div key={experience.id} className="border p-3 rounded">
                  <p>
                    <strong>
                      {index + 1}. {experience.title}
                    </strong>
                  </p>
                  <p>ID: {experience.id}</p>
                  <p>Status: {experience.status}</p>
                  <p>Days: {experience.days}</p>
                  <p>Price: ${experience.price}</p>
                  <p>Last Updated: {experience.lastUpdated}</p>
                  {experience.description && (
                    <p className="text-sm text-gray-600 mt-2">
                      {experience.description}
                    </p>
                  )}
                </div>
              ))}
              {dbExperiences.length === 0 && (
                <p className="text-gray-500">
                  No experiences found in Supabase database
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
              Push Local Experiences to Database
            </Button>
            <p className="text-sm text-gray-600 mt-2">
              This will push any local experiences to the Supabase database
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

"use client";

import React from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { ArrowRight, Globe, Calendar, Palette } from "lucide-react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function StudioPage() {
  const router = useRouter();

  const handleLaunchDashboard = () => {
    router.push("/pro-dashboard");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Welcome to Culturin Studio
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Your all-in-one creative workspace for designing, managing, and
              growing your cultural tourism business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleLaunchDashboard}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-8 rounded-lg h-auto group transition-all duration-300"
              >
                Launch Dashboard
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Website Builder
                </CardTitle>
                <CardDescription>
                  Create and customize your business website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  onClick={() => router.push("/pro-dashboard/website")}
                  className="w-full"
                >
                  Build Website
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Experience Manager
                </CardTitle>
                <CardDescription>
                  Manage your tours and experiences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  onClick={() => router.push("/pro-dashboard/experience")}
                  className="w-full"
                >
                  Manage Experiences
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Marketing Tools
                </CardTitle>
                <CardDescription>
                  Create campaigns and grow your business
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  onClick={() => router.push("/pro-dashboard/marketing")}
                  className="w-full"
                >
                  Marketing Hub
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

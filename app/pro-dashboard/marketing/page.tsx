"use client";

import React from "react";
import ProDashboardLayout from "../../../components/pro/ProDashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentCreatorTab from "../../../components/pro/marketing/ContentCreatorTab";
import SocialMediaTab from "../../../components/pro/marketing/SocialMediaTab";
import SEOToolsTab from "../../../components/pro/marketing/SEOToolsTab";
import MarketingAssetsTab from "../../../components/pro/marketing/MarketingAssetsTab";
import { Edit, Share2, Search, FileImage } from "lucide-react";

export default function Marketing() {
  return (
    <ProDashboardLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Marketing Tools</h1>
            <p className="text-gray-600">
              Create and manage your marketing content
            </p>
          </div>

          <Tabs defaultValue="content-creator" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger
                value="content-creator"
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Content Creator
              </TabsTrigger>
              <TabsTrigger
                value="social-media"
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Social Media
              </TabsTrigger>
              <TabsTrigger
                value="seo-tools"
                className="flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                SEO Tools
              </TabsTrigger>
              <TabsTrigger
                value="marketing-assets"
                className="flex items-center gap-2"
              >
                <FileImage className="h-4 w-4" />
                Marketing Assets
              </TabsTrigger>
            </TabsList>

            <div className="bg-white rounded-lg border">
              <TabsContent value="content-creator" className="p-6">
                <ContentCreatorTab />
              </TabsContent>

              <TabsContent value="social-media" className="p-6">
                <SocialMediaTab />
              </TabsContent>

              <TabsContent value="seo-tools" className="p-6">
                <SEOToolsTab />
              </TabsContent>

              <TabsContent value="marketing-assets" className="p-6">
                <MarketingAssetsTab />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </ProDashboardLayout>
  );
}

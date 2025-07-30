"use client";

import React from "react";
import ProDashboardLayout from "../../../src/components/pro/ProDashboardLayout";
import WebsiteBuilder from "../../../components/pro/website/WebsiteBuilder";

// Force dynamic rendering to prevent SSR issues
export const dynamic = "force-dynamic";

export default function WebsitePage() {
  return (
    <ProDashboardLayout title="Website" subtitle="Manage your online presence">
      <WebsiteBuilder />
    </ProDashboardLayout>
  );
}

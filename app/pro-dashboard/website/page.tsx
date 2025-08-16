"use client";

import React from "react";
import ProDashboardLayout from "../../../components/pro/ProDashboardLayout";
import WebsiteBuilder from "../../../components/pro/website/WebsiteBuilder";

// Force dynamic rendering to prevent SSR issues
export const dynamic = "force-dynamic";

export default function WebsitePage() {
  return (
    <ProDashboardLayout>
      <WebsiteBuilder />
    </ProDashboardLayout>
  );
}

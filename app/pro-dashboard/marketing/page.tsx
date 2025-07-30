"use client";

import React from "react";
import ProDashboardLayout from "../../../components/pro/ProDashboardLayout";
import ContentCreator from "../../../components/pro/marketing/ContentCreator";

export default function Marketing() {
  return (
    <ProDashboardLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <ContentCreator />
        </div>
      </div>
    </ProDashboardLayout>
  );
}

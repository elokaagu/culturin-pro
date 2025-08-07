"use client";

import React from "react";
import { ProtectedRoute } from "@/src/components/auth/ProtectedRoute";
import Header from "@/components/Header";
import LoyaltyCardApplication from "@/components/pro/LoyaltyCardApplication";

export default function LoyaltyApplyPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header type="default" />
        <div className="pt-24 pb-12">
          <LoyaltyCardApplication />
        </div>
      </div>
    </ProtectedRoute>
  );
} 
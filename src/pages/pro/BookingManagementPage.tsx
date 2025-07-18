"use client";
import React from "react";
import ProDashboardLayout from "@/components/pro/ProDashboardLayout";
import BookingManagement from "@/components/pro/booking/BookingManagement";

const BookingManagementPage: React.FC = () => {
  return (
    <ProDashboardLayout>
      <BookingManagement />
    </ProDashboardLayout>
  );
};

export default BookingManagementPage;

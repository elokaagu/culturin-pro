"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "../../lib/navigation";
import ProDashboardLayout from "@/components/pro/ProDashboardLayout";
import DashboardMetricCard from "@/components/pro/DashboardMetricCard";
import BookingTrendsChart from "@/components/pro/BookingTrendsChart";
import { Calendar, Users, Star } from "lucide-react";
import CircleDollarSignIcon from "@/components/pro/CircleDollarSign";
import { useAuth } from "@/src/components/auth/AuthProvider";
import {
  MotionContainer,
  MotionCard,
  StaggerReveal,
  RevealOnScroll,
} from "@/components/motion";

const ProDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, userData, isReady } = useAuth();

  useEffect(() => {
    localStorage.setItem("lastRoute", "/pro-dashboard");
  }, []);

  // Load user-specific dashboard data
  useEffect(() => {
    if (isReady && user) {
      // Here you can load user-specific metrics, bookings, etc.
    }
  }, [isReady, user]);

  return (
    <ProDashboardLayout>
      <MotionContainer className="space-y-6">
        <RevealOnScroll>
          <div>
            <h1 className="text-2xl font-medium">Dashboard</h1>
            <p className="mt-1 text-gray-600 text-sm">
              Your home for cultural growth and insight
            </p>
          </div>
        </RevealOnScroll>

        {/* Metrics Cards with stagger animation */}
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MotionCard className="h-full">
            <div className="glass-card rounded-2xl p-6 glass-hover h-full">
              <DashboardMetricCard
                title="Revenue"
                value="$3,490"
                change="12%"
                changePositive={true}
                icon={<CircleDollarSignIcon />}
                actionText="View breakdown"
              />
            </div>
          </MotionCard>
          <MotionCard className="h-full">
            <div className="glass-card rounded-2xl p-6 glass-hover h-full">
              <DashboardMetricCard
                title="Bookings"
                value="128"
                change="8%"
                changePositive={true}
                icon={<Calendar className="h-5 w-5" />}
                actionText="View details"
              />
            </div>
          </MotionCard>
          <MotionCard className="h-full">
            <div className="glass-card rounded-2xl p-6 glass-hover h-full">
              <DashboardMetricCard
                title="Guests"
                value="456"
                change="15%"
                changePositive={true}
                icon={<Users className="h-5 w-5" />}
                actionText="See analytics"
              />
            </div>
          </MotionCard>
          <MotionCard className="h-full">
            <div className="glass-card rounded-2xl p-6 glass-hover h-full">
              <DashboardMetricCard
                title="Rating"
                value="4.8"
                change="0.3"
                changePositive={true}
                icon={<Star className="h-5 w-5" />}
                actionText="View reviews"
              />
            </div>
          </MotionCard>
        </StaggerReveal>

        {/* Charts */}
        <RevealOnScroll delay={0.3}>
          <div className="grid grid-cols-1 gap-4">
            <MotionCard>
              <BookingTrendsChart />
            </MotionCard>
          </div>
        </RevealOnScroll>
      </MotionContainer>
    </ProDashboardLayout>
  );
};

export default ProDashboardPage;

'use client'
import React, { useState, useEffect } from 'react';
import { useNavigate } from '../../lib/navigation';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';
import DashboardMetricCard from '@/components/pro/DashboardMetricCard';
import BookingTrendsChart from '@/components/pro/BookingTrendsChart';
import { Calendar, Users, Star } from "lucide-react";
import CircleDollarSignIcon from '@/components/pro/CircleDollarSign';

const ProDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    localStorage.setItem('lastRoute', '/pro-dashboard');
  }, []);
  
  return (
    <ProDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium">Dashboard</h1>
          <p className="mt-1 text-gray-600 text-sm">
            Your home for cultural growth and insight
          </p>
        </div>
        
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardMetricCard
            title="Revenue"
            value="$3,490"
            change="12%"
            changePositive={true}
            icon={<CircleDollarSignIcon />}
            actionText="View breakdown"
          />
          <DashboardMetricCard
            title="Bookings"
            value="128"
            change="8%"
            changePositive={true}
            icon={<Calendar className="h-5 w-5" />}
            actionText="View details"
          />
          <DashboardMetricCard
            title="Guests"
            value="456"
            change="15%"
            changePositive={true}
            icon={<Users className="h-5 w-5" />}
            actionText="See analytics"
          />
          <DashboardMetricCard
            title="Rating"
            value="4.8"
            change="0.3"
            changePositive={true}
            icon={<Star className="h-5 w-5" />}
            actionText="View reviews"
          />
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 gap-4">
          <BookingTrendsChart />
        </div>
      </div>
    </ProDashboardLayout>
  );
};

export default ProDashboardPage;

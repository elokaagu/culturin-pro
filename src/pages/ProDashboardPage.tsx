'use client'
import React, { useEffect, useState } from 'react';
import { useNavigate } from '../../lib/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, Users, ArrowRight, Check, Star, TrendingUp } from "lucide-react";
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';
import DashboardMetricCard from '@/components/pro/DashboardMetricCard';
import BookingTrendsChart from '@/components/pro/BookingTrendsChart';
import RecentActivityList from '@/components/pro/RecentActivityList';
import CalendarIcon from '@/components/pro/Calendar';
import FileTextIcon from '@/components/pro/FileText';
import CircleDollarSignIcon from '@/components/pro/CircleDollarSign';
import ProAccessDialog, { useProAccess } from "@/components/pro/ProAccessDialog";

const ProDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [showAccessDialog, setShowAccessDialog] = useState(false);
  const { hasAccess, grantAccess } = useProAccess();
  
  useEffect(() => {
    if (!hasAccess) {
      setShowAccessDialog(true);
    }
    localStorage.setItem('lastRoute', '/pro-dashboard');
  }, []);
  
  const handlePurchase = () => {
    grantAccess();
    setShowAccessDialog(false);
  };
  
  return (
    <>
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
              icon={<CalendarIcon />}
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
            
            {/* Smart Insights */}
            <div className="flex flex-col sm:flex-row gap-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="bg-green-100 rounded-full p-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Revenue spiked in March</p>
                  <p className="text-xs text-gray-600">Your Spring Wellness Retreat drove 40% of the monthly revenue</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="bg-blue-100 rounded-full p-1">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Conversion rate up 6% YoY</p>
                  <p className="text-xs text-gray-600">Your page improvements are working well</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="grid grid-cols-1 gap-4">
            <RecentActivityList />
          </div>
        </div>
      </ProDashboardLayout>
      
      {/* Only show dialog if user doesn't have access */}
      {!hasAccess && (
        <ProAccessDialog open={showAccessDialog} setOpen={setShowAccessDialog} />
      )}
    </>
  );
};

export default ProDashboardPage;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, Users } from "lucide-react";
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';
import DashboardMetricCard from '@/components/pro/DashboardMetricCard';
import BookingTrendsChart from '@/components/pro/BookingTrendsChart';
import RecentActivityList from '@/components/pro/RecentActivityList';
import CalendarIcon from '@/components/pro/Calendar';
import FileTextIcon from '@/components/pro/FileText';
import CircleDollarSignIcon from '@/components/pro/CircleDollarSign';

// In a real app, this would come from your authentication/user system
const useProAccess = () => {
  // For demo purposes, we'll use localStorage to simulate a user's subscription status
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  
  useEffect(() => {
    const storedAccess = localStorage.getItem('culturinProAccess');
    setHasAccess(storedAccess === 'true');
  }, []);
  
  const grantAccess = () => {
    localStorage.setItem('culturinProAccess', 'true');
    setHasAccess(true);
  };
  
  return { hasAccess, grantAccess };
};

const ProDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [showAccessDialog, setShowAccessDialog] = useState(false);
  const { hasAccess, grantAccess } = useProAccess();
  
  useEffect(() => {
    // Check access when component mounts
    if (!hasAccess) {
      setShowAccessDialog(true);
    }
    
    // Remember this route for next login
    localStorage.setItem('lastRoute', '/pro-dashboard');
  }, [hasAccess]);
  
  const handlePurchase = () => {
    // In a real app, this would redirect to Stripe or your payment processor
    grantAccess();
    setShowAccessDialog(false);
  };
  
  // If user doesn't have access, show access dialog and the dashboard in background
  // Once they get access or if they already have it, show the dashboard
  
  return (
    <>
      <ProDashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome to Culturin Pro</h1>
            <p className="mt-1 text-gray-600">
              Your professional toolkit for growing and managing your cultural experiences business.
            </p>
          </div>
          
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardMetricCard
              title="Total Bookings"
              value="128"
              change="12%"
              changePositive={true}
              icon={<CalendarIcon />}
            />
            <DashboardMetricCard
              title="Avg. Traveler Rating"
              value="4.8"
              change="0.3"
              changePositive={true}
              icon={<Users className="h-5 w-5" />}
            />
            <DashboardMetricCard
              title="Experiences Published"
              value="12"
              change="2"
              changePositive={true}
              icon={<FileTextIcon />}
            />
            <DashboardMetricCard
              title="Pending Inquiries"
              value="6"
              change="3"
              changePositive={false}
              icon={<CircleDollarSignIcon />}
            />
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 gap-6">
            <BookingTrendsChart />
          </div>
          
          {/* Recent Activity */}
          <div className="grid grid-cols-1 gap-6">
            <RecentActivityList />
          </div>
        </div>
      </ProDashboardLayout>
      
      {/* Access Dialog */}
      <Dialog open={showAccessDialog} onOpenChange={setShowAccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Crown className="h-5 w-5 text-[#FFD700]" /> Unlock Culturin Pro
            </DialogTitle>
            <DialogDescription>
              Upgrade to access professional tools for managing your cultural experiences.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex flex-col gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold flex items-center">
                  Free Plan
                  <Badge variant="outline" className="ml-2">Current</Badge>
                </h3>
                <ul className="mt-2 space-y-1">
                  <li className="text-sm text-gray-600">• Basic booking management</li>
                  <li className="text-sm text-gray-600">• Limited analytics</li>
                  <li className="text-sm text-gray-600">• Standard support</li>
                </ul>
              </div>
              
              <div className="border-2 border-[#222] rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold flex items-center text-[#222]">
                  Pro Plan
                  <Badge className="ml-2 bg-[#FFD700] text-[#222]">Recommended</Badge>
                </h3>
                <p className="text-lg font-bold mt-1">$49/month</p>
                <ul className="mt-2 space-y-1">
                  <li className="text-sm text-gray-600">• Advanced booking tools</li>
                  <li className="text-sm text-gray-600">• Full analytics suite</li>
                  <li className="text-sm text-gray-600">• Priority support</li>
                  <li className="text-sm text-gray-600">• Team collaboration</li>
                  <li className="text-sm text-gray-600">• Website builder</li>
                </ul>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => navigate('/operator')}>
              Maybe Later
            </Button>
            <Button onClick={handlePurchase} className="bg-[#1E1E1E] text-white hover:bg-[#000000]">
              Upgrade Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProDashboardPage;

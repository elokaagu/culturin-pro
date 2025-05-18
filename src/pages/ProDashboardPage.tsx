
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

// In a real app, this would come from your authentication/user system
const useProAccess = () => {
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
    if (!hasAccess) {
      setShowAccessDialog(true);
    }
    localStorage.setItem('lastRoute', '/pro-dashboard');
  }, [hasAccess]);
  
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
      
      {/* Redesigned Access Dialog */}
      <Dialog open={showAccessDialog} onOpenChange={setShowAccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Crown className="h-5 w-5 text-[#FFD700]" /> Grow Your Cultural Brand with Pro
            </DialogTitle>
            <DialogDescription className="text-base">
              Unlock tools to increase bookings, delight guests, and streamline your operations — all in one place.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex flex-col gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium flex items-center">
                  Free Plan
                  <Badge variant="outline" className="ml-2">Current</Badge>
                </h3>
                <ul className="mt-2 space-y-1">
                  <li className="text-sm text-gray-600">• Basic booking management</li>
                  <li className="text-sm text-gray-600">• Limited analytics</li>
                  <li className="text-sm text-gray-600">• Standard support</li>
                </ul>
              </div>
              
              <div className="border-2 border-[#222] rounded-lg p-4 bg-[#fff7e0] relative">
                <div className="absolute top-3 right-3">
                  <Crown className="h-5 w-5 text-[#FFD700]" />
                </div>
                <h3 className="font-medium flex items-center text-[#222]">
                  Pro Plan
                  <Badge className="ml-2 bg-[#FFD700] text-[#222]">Recommended</Badge>
                </h3>
                <p className="text-lg font-medium mt-1">$49/month</p>
                <ul className="mt-3 space-y-2">
                  <li className="text-sm text-gray-700 flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Boost bookings with conversion analytics</span>
                  </li>
                  <li className="text-sm text-gray-700 flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Automate follow-ups, reviews & loyalty rewards</span>
                  </li>
                  <li className="text-sm text-gray-700 flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Add custom upsells like meals or guides</span>
                  </li>
                  <li className="text-sm text-gray-700 flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Collaborate with your team in real time</span>
                  </li>
                  <li className="text-sm text-gray-700 flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Priority support when it matters most</span>
                  </li>
                </ul>
                <p className="text-xs text-gray-600 mt-3">Cancel anytime. No hidden fees.</p>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Trusted by 1,000+ cultural experience creators around the world.</p>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-sm">Why Go Pro?</h4>
              <p className="text-xs text-gray-600 mt-1">
                Operators who upgrade see a 32% increase in repeat bookings and save 10+ hours/month in admin.
              </p>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate('/operator')}
              className="text-gray-500 hover:text-gray-700"
            >
              Maybe Later
            </Button>
            <Button 
              onClick={handlePurchase} 
              className="bg-[#1E1E1E] text-white hover:bg-[#000000] group transition-all duration-200 px-6"
            >
              <Crown className="h-4 w-4 mr-2 text-[#FFD700]" />
              Upgrade to Pro
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProDashboardPage;

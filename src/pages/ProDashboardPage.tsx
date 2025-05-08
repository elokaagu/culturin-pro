
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CulturinPro from "@/components/CulturinPro";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Crown, ArrowLeft, Settings, LayoutDashboard, CreditCard, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  const [activeTab, setActiveTab] = useState<string>("overview");
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
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom header for Pro dashboard */}
      <div className="bg-[#1E1E1E] text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10" 
              onClick={() => navigate('/operator')}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Operator
            </Button>
            <div className="flex items-center">
              <h1 className="font-bold text-xl">Culturin Pro</h1>
              <Badge className="ml-2 bg-culturin-mustard text-culturin-indigo">Beta</Badge>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Dashboard Content */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col gap-8">
          {/* Pro Dashboard Nav */}
          <div className="bg-white p-4 shadow rounded-lg">
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex justify-start mb-0 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="features" className="flex items-center gap-2">
                  <Crown className="h-4 w-4" />
                  Features
                </TabsTrigger>
                <TabsTrigger value="billing" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Billing
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Security
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Tab Content */}
          <TabsContent value="overview" className="bg-white p-6 rounded-lg shadow mt-0">
            <h2 className="text-2xl font-bold mb-4">Welcome to Culturin Pro</h2>
            <p className="text-gray-600 mb-6">Your professional toolkit for growing and managing your cultural experiences business.</p>
            
            <CulturinPro />
          </TabsContent>
          
          <TabsContent value="features" className="bg-white p-6 rounded-lg shadow mt-0">
            <h2 className="text-2xl font-bold mb-4">Pro Features</h2>
            <p className="text-gray-600 mb-6">Explore all the features available with your Pro subscription.</p>
            
            {/* We reuse the existing CulturinPro component with the features tab pre-selected */}
            <CulturinPro />
          </TabsContent>
          
          <TabsContent value="billing" className="bg-white p-6 rounded-lg shadow mt-0">
            <h2 className="text-2xl font-bold mb-4">Billing Management</h2>
            <p className="text-gray-600 mb-6">Manage your subscription and payment methods.</p>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Your Current Plan</h3>
              <p className="text-xl font-bold flex items-center gap-2">
                <Crown className="h-5 w-5 text-culturin-mustard" /> Growth Plan
              </p>
              <p className="text-gray-600 mt-1">$49/month • Renews on June 8, 2025</p>
              
              <Button className="mt-6">Manage Subscription</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="bg-white p-6 rounded-lg shadow mt-0">
            <h2 className="text-2xl font-bold mb-4">Security Settings</h2>
            <p className="text-gray-600 mb-6">Manage security settings for your account.</p>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Two-Factor Authentication</h3>
              <p className="text-gray-600 mb-4">Add an extra layer of security to your account.</p>
              <Button>Enable 2FA</Button>
            </div>
          </TabsContent>
        </div>
      </div>
      
      {/* Access Dialog */}
      <Dialog open={showAccessDialog} onOpenChange={setShowAccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Crown className="h-5 w-5 text-culturin-mustard" /> Unlock Culturin Pro
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
              
              <div className="border-2 border-culturin-indigo rounded-lg p-4 bg-culturin-indigo/5">
                <h3 className="font-semibold flex items-center text-culturin-indigo">
                  Pro Plan
                  <Badge className="ml-2 bg-culturin-mustard text-culturin-indigo">Recommended</Badge>
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
    </div>
  );
};

export default ProDashboardPage;

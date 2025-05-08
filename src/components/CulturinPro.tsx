
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check, Info, ChevronRight, Crown, Sparkles, X, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";

const CulturinPro = () => {
  const [selectedTier, setSelectedTier] = useState<string>("growth");

  const handleUpgrade = () => {
    toast({
      title: "Upgrade initiated",
      description: "You'll be redirected to complete your subscription.",
    });
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Overview Card */}
      <Card className="bg-gradient-to-br from-culturin-indigo/10 to-white overflow-hidden border-culturin-indigo/20">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2 mb-1">
            <Crown className="h-5 w-5 text-culturin-mustard" />
            <Badge className="bg-culturin-mustard text-culturin-indigo hover:bg-culturin-mustard/90">New</Badge>
          </div>
          <CardTitle className="text-2xl md:text-3xl font-bold">
            Culturin Pro <span className="text-culturin-indigo">✨</span>
          </CardTitle>
          <CardDescription className="text-base">
            Your all-in-one toolkit to run, scale, and professionalize your cultural travel business. 
            Designed for local hosts, travel entrepreneurs, and agencies who want to grow efficiently, 
            serve globally, and preserve authenticity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature Categories */}
            <FeatureCard 
              title="Smart Booking Tools" 
              features={["Real-time availability management", "Group size controls & waitlists", "Auto reminders for guests", "Easy rescheduling/refund workflows"]}
              icon={<Calendar className="h-6 w-6" />}
            />
            
            <FeatureCard 
              title="CRM for Hosts" 
              features={["Guest profiles & repeat traveler insights", "Message templates", "Traveler satisfaction score tracking"]}
              icon={<Users className="h-6 w-6" />}
            />
            
            <FeatureCard 
              title="Business Analytics" 
              features={["Earnings reports & payout tracking", "Booking trends", "Experience performance scoring"]}
              icon={<BarChart3 className="h-6 w-6" />}
            />
            
            <FeatureCard 
              title="Marketing Tools" 
              features={["One-click social post templates", "QR code flyers for local promo", "Custom referral links & ambassador tools"]}
              icon={<Megaphone className="h-6 w-6" />}
            />
            
            <FeatureCard 
              title="Custom Website Builder" 
              features={["Hosted microsite with your brand", "Accept bookings directly", "SEO-optimized for cultural travel"]}
              icon={<Globe className="h-6 w-6" />}
              badgeText="Add-on"
            />
            
            <FeatureCard 
              title="Team & Staff Management" 
              features={["Multi-user access (e.g. guides, assistants)", "Role-based permissions", "Performance tracking"]}
              icon={<UsersRound className="h-6 w-6" />}
            />
          </div>
        </CardContent>
      </Card>

      {/* Pricing Tiers */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-xl font-semibold">Choose Your Plan</h3>
            <p className="text-gray-500 mt-1">Select the right tier for your business needs</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Monthly</span>
            <Button variant="outline" className="text-xs px-3 py-1 h-auto">Coming Soon: Annual (Save 20%)</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Starter Tier */}
          <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-md ${selectedTier === 'starter' ? 'border-culturin-indigo ring-2 ring-culturin-indigo/20' : 'border-gray-200'}`}>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-400"></div>
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <CardDescription>For solo cultural hosts just getting started</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">$19</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <PricingFeature included>Basic booking management</PricingFeature>
                <PricingFeature included>Guest profiles</PricingFeature>
                <PricingFeature included>Simple analytics</PricingFeature>
                <PricingFeature>Website builder</PricingFeature>
                <PricingFeature>Team management</PricingFeature>
                <PricingFeature>Priority support</PricingFeature>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant={selectedTier === 'starter' ? 'default' : 'outline'}
                className="w-full"
                onClick={() => setSelectedTier('starter')}
              >
                {selectedTier === 'starter' ? 'Selected' : 'Select Plan'}
              </Button>
            </CardFooter>
          </Card>

          {/* Growth Tier - Most Popular */}
          <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-md ${selectedTier === 'growth' ? 'border-culturin-indigo ring-2 ring-culturin-indigo/20' : 'border-gray-200'}`}>
            <div className="absolute top-0 left-0 right-0 h-1 bg-culturin-indigo"></div>
            <div className="absolute top-4 right-4">
              <Badge className="bg-culturin-mustard text-culturin-indigo">Most Popular</Badge>
            </div>
            <CardHeader>
              <CardTitle>Growth</CardTitle>
              <CardDescription>For growing teams with multiple experiences</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">$49</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <PricingFeature included>Advanced booking tools</PricingFeature>
                <PricingFeature included>Full CRM functionality</PricingFeature>
                <PricingFeature included>Comprehensive analytics</PricingFeature>
                <PricingFeature included>Website builder</PricingFeature>
                <PricingFeature included>Up to 3 team members</PricingFeature>
                <PricingFeature>Priority support</PricingFeature>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant={selectedTier === 'growth' ? 'default' : 'outline'}
                className="w-full"
                onClick={() => setSelectedTier('growth')}
              >
                {selectedTier === 'growth' ? 'Selected' : 'Select Plan'}
              </Button>
            </CardFooter>
          </Card>

          {/* Agency Tier */}
          <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-md ${selectedTier === 'agency' ? 'border-culturin-indigo ring-2 ring-culturin-indigo/20' : 'border-gray-200'}`}>
            <div className="absolute top-0 left-0 right-0 h-1 bg-culturin-indigo"></div>
            <CardHeader>
              <CardTitle>Agency</CardTitle>
              <CardDescription>For multi-city operators and large teams</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">Custom</span>
                <span className="text-gray-500 ml-1">pricing</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <PricingFeature included>Everything in Growth</PricingFeature>
                <PricingFeature included>Unlimited team members</PricingFeature>
                <PricingFeature included>API access</PricingFeature>
                <PricingFeature included>Data exports</PricingFeature>
                <PricingFeature included>Multi-language support</PricingFeature>
                <PricingFeature included>Priority support</PricingFeature>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant={selectedTier === 'agency' ? 'default' : 'outline'}
                className="w-full"
                onClick={() => setSelectedTier('agency')}
              >
                {selectedTier === 'agency' ? 'Selected' : 'Contact Sales'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Advanced Features Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Explore All Features</CardTitle>
          <CardDescription>Discover the full suite of professional tools available to elevate your cultural hosting business</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="dashboard">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="builder">Experience Builder</TabsTrigger>
              <TabsTrigger value="bookings">Booking Management</TabsTrigger>
              <TabsTrigger value="crm">Customer CRM</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="space-y-4">
              <h4 className="font-medium text-lg">Performance at a Glance</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <BarChart3 className="h-5 w-5 text-culturin-indigo mt-1" />
                  <div>
                    <h5 className="font-medium">Performance Metrics</h5>
                    <p className="text-sm text-gray-600">Track booking rate, customer satisfaction, and profile completion scores</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <TrendingUp className="h-5 w-5 text-culturin-indigo mt-1" />
                  <div>
                    <h5 className="font-medium">Revenue Insights</h5>
                    <p className="text-sm text-gray-600">Analyze daily, weekly, monthly earnings with customizable date ranges</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Activity className="h-5 w-5 text-culturin-indigo mt-1" />
                  <div>
                    <h5 className="font-medium">Experience Health</h5>
                    <p className="text-sm text-gray-600">Visual indicators for drafts, published listings, and underperforming tours</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <HeartPulse className="h-5 w-5 text-culturin-indigo mt-1" />
                  <div>
                    <h5 className="font-medium">Industry Benchmarks</h5>
                    <p className="text-sm text-gray-600">See how your performance compares to similar cultural experiences</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="builder" className="space-y-4">
              <h4 className="font-medium text-lg">Advanced Experience Creation</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <LayoutGrid className="h-5 w-5 text-culturin-indigo mt-1" />
                  <div>
                    <h5 className="font-medium">Drag-and-Drop Interface</h5>
                    <p className="text-sm text-gray-600">Create multi-day itineraries with simple visual tools</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Users className="h-5 w-5 text-culturin-indigo mt-1" />
                  <div>
                    <h5 className="font-medium">Capacity Controls</h5>
                    <p className="text-sm text-gray-600">Set group sizes, availability windows, and pricing tiers</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <ImagePlus className="h-5 w-5 text-culturin-indigo mt-1" />
                  <div>
                    <h5 className="font-medium">Media Management</h5>
                    <p className="text-sm text-gray-600">Add photos, videos, and testimonials with optimization tools</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Sparkles className="h-5 w-5 text-culturin-indigo mt-1" />
                  <div>
                    <h5 className="font-medium">Smart Suggestions</h5>
                    <p className="text-sm text-gray-600">Get AI recommendations for improving visibility based on similar listings</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-4">
              <h4 className="font-medium text-lg">Seamless Booking and Payments</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <CreditCard className="h-5 w-5 text-culturin-indigo mt-1" />
                  <div>
                    <h5 className="font-medium">Payment Integrations</h5>
                    <p className="text-sm text-gray-600">Connect with Stripe/PayPal for secure financial transactions</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Receipt className="h-5 w-5 text-culturin-indigo mt-1" />
                  <div>
                    <h5 className="font-medium">Financial Reports</h5>
                    <p className="text-sm text-gray-600">Payout tracking and detailed financial statements</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Calendar className="h-5 w-5 text-culturin-indigo mt-1" />
                  <div>
                    <h5 className="font-medium">Integrated Calendar</h5>
                    <p className="text-sm text-gray-600">Booking calendar syncable with Google/Apple Calendar</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MessageSquare className="h-5 w-5 text-culturin-indigo mt-1" />
                  <div>
                    <h5 className="font-medium">Group Booking Tools</h5>
                    <p className="text-sm text-gray-600">Manage group bookings with chat and payment splitting</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="crm" className="space-y-4">
              <h4 className="font-medium text-lg">Guest Relationship Management</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <UserCircle className="h-5 w-5 text-culturin-indigo mt-1" />
                  <div>
                    <h5 className="font-medium">Guest Profiles</h5>
                    <p className="text-sm text-gray-600">Track past bookings, reviews, preferences for personalization</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Tag className="h-5 w-5 text-culturin-indigo mt-1" />
                  <div>
                    <h5 className="font-medium">Auto-Tagging</h5>
                    <p className="text-sm text-gray-600">Automatically categorize guests (e.g. food lover, cultural explorer)</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MessageCircle className="h-5 w-5 text-culturin-indigo mt-1" />
                  <div>
                    <h5 className="font-medium">Direct Messaging</h5>
                    <p className="text-sm text-gray-600">Communicate with guests before and after experiences</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Star className="h-5 w-5 text-culturin-indigo mt-1" />
                  <div>
                    <h5 className="font-medium">Review Management</h5>
                    <p className="text-sm text-gray-600">Request reviews and send auto-follow-up templates</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="marketing" className="space-y-4">
              <h4 className="font-medium text-lg">Promotional Tools</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <Ticket className="h-5 w-5 text-culturin-indigo mt-1" />
                  <div>
                    <h5 className="font-medium">Promo Code Generator</h5>
                    <p className="text-sm text-gray-600">Create and track promotional codes for special offers</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Megaphone className="h-5 w-5 text-culturin-indigo mt-1" />
                  <div>
                    <h5 className="font-medium">Email & SMS Broadcasts</h5>
                    <p className="text-sm text-gray-600">Send targeted marketing messages to past and potential guests</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Search className="h-5 w-5 text-culturin-indigo mt-1" />
                  <div>
                    <h5 className="font-medium">SEO Tools</h5>
                    <p className="text-sm text-gray-600">Optimize your listings with SEO checklist and recommendations</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Share2 className="h-5 w-5 text-culturin-indigo mt-1" />
                  <div>
                    <h5 className="font-medium">Referral System</h5>
                    <p className="text-sm text-gray-600">Built-in referral program to encourage word-of-mouth growth</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="team" className="space-y-4">
              <h4 className="font-medium text-lg">Team Collaboration</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <UsersRound className="h-5 w-5 text-culturin-indigo mt-1" />
                  <div>
                    <h5 className="font-medium">Role Management</h5>
                    <p className="text-sm text-gray-600">Add team members with role-based permissions</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckSquare className="h-5 w-5 text-culturin-indigo mt-1" />
                  <div>
                    <h5 className="font-medium">Task Assignment</h5>
                    <p className="text-sm text-gray-600">Assign tasks per experience with simple tracking</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <GraduationCap className="h-5 w-5 text-culturin-indigo mt-1" />
                  <div>
                    <h5 className="font-medium">Team Training</h5>
                    <p className="text-sm text-gray-600">In-app tutorials and onboarding for new team members</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <LineChart className="h-5 w-5 text-culturin-indigo mt-1" />
                  <div>
                    <h5 className="font-medium">Performance Tracking</h5>
                    <p className="text-sm text-gray-600">Monitor individual team member performance and contribution</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Security Section */}
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-culturin-indigo" />
            Security & Trust
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <Shield className="h-10 w-10 text-culturin-indigo mb-3" />
              <h4 className="font-medium">Identity-Verified Hosts</h4>
              <p className="text-sm text-gray-600 mt-1">All hosts are thoroughly verified for authenticity and safety</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <CreditCard className="h-10 w-10 text-culturin-indigo mb-3" />
              <h4 className="font-medium">Secure Payments</h4>
              <p className="text-sm text-gray-600 mt-1">Protected transactions via Stripe with fraud prevention</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Lock className="h-10 w-10 text-culturin-indigo mb-3" />
              <h4 className="font-medium">Privacy-Focused</h4>
              <p className="text-sm text-gray-600 mt-1">Guest data handling with strict privacy controls</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Button */}
      <div className="text-center pt-4 pb-12">
        <Button 
          size="lg" 
          className="bg-culturin-indigo hover:bg-culturin-indigo/90 text-white px-8 py-6 text-lg rounded-xl"
          onClick={handleUpgrade}
        >
          Upgrade to Culturin Pro <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
        <p className="text-sm text-gray-500 mt-3">Start with a 14-day free trial. Cancel anytime.</p>
      </div>
    </div>
  );
};

// Helper Components
const FeatureCard = ({ title, features, icon, badgeText }: { title: string; features: string[]; icon: React.ReactNode; badgeText?: string }) => (
  <Card className="h-full border-gray-200 hover:shadow-md transition-shadow">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <div className="p-2 rounded-lg bg-culturin-indigo/10 text-culturin-indigo mb-2">
          {icon}
        </div>
        {badgeText && (
          <Badge variant="outline" className="bg-culturin-sand/20 text-amber-700 border-amber-200">
            {badgeText}
          </Badge>
        )}
      </div>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-1">
        {features.map((feature, index) => (
          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
            <Check className="h-4 w-4 text-culturin-indigo shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const PricingFeature = ({ children, included = false }: { children: React.ReactNode; included?: boolean }) => (
  <li className="flex items-center gap-2">
    {included ? (
      <Check className="h-4 w-4 text-green-500" />
    ) : (
      <X className="h-4 w-4 text-gray-300" />
    )}
    <span className={included ? "text-gray-700" : "text-gray-400"}>{children}</span>
  </li>
);

// Import these lucide-react icons
// Adding these imports at the top would cause the component to fail to render
import { 
  Calendar, Users, BarChart3, Megaphone, Globe, UsersRound, 
  TrendingUp, Activity, HeartPulse, LayoutGrid, ImagePlus, 
  CreditCard, Receipt, MessageSquare, UserCircle, Tag, 
  MessageCircle, Star, Ticket, Search, Share2, CheckSquare, 
  GraduationCap, LineChart, Lock, Shield
} from "lucide-react";

export default CulturinPro;

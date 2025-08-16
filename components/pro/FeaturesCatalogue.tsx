import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Calendar,
  Users,
  BarChart3,
  Megaphone,
  Globe,
  UsersRound,
  TrendingUp,
  Activity,
  ImagePlus,
  CreditCard,
  Receipt,
  MessageSquare,
  UserCircle,
  Tag,
  MessageCircle,
  Star,
  Ticket,
  Search,
  Share2,
  CheckSquare,
  Info,
  LineChart,
} from "lucide-react";

const FeaturesCatalogue = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Explore All Features</CardTitle>
        <CardDescription>
          Discover the full suite of professional tools available to elevate
          your cultural hosting business
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="dashboard">
          <TabsList className="flex space-x-6 mb-6 border-b border-gray-200 w-full overflow-x-auto">
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
              <FeatureItem
                icon={
                  <BarChart3 className="h-5 w-5 text-culturin-indigo mt-1" />
                }
                title="Performance Metrics"
                description="Track booking rate, customer satisfaction, and profile completion scores"
              />
              <FeatureItem
                icon={
                  <TrendingUp className="h-5 w-5 text-culturin-indigo mt-1" />
                }
                title="Revenue Insights"
                description="Analyze daily, weekly, monthly earnings with customizable date ranges"
              />
              <FeatureItem
                icon={
                  <Activity className="h-5 w-5 text-culturin-indigo mt-1" />
                }
                title="Experience Health"
                description="Visual indicators for drafts, published listings, and underperforming tours"
              />
              <FeatureItem
                icon={<Info className="h-5 w-5 text-culturin-indigo mt-1" />}
                title="Industry Benchmarks"
                description="See how your performance compares to similar cultural experiences"
              />
            </div>
          </TabsContent>

          <TabsContent value="builder" className="space-y-4">
            <h4 className="font-medium text-lg">
              Advanced Experience Creation
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FeatureItem
                icon={
                  <Calendar className="h-5 w-5 text-culturin-indigo mt-1" />
                }
                title="Drag-and-Drop Interface"
                description="Create multi-day experiences with simple visual tools"
              />
              <FeatureItem
                icon={<Users className="h-5 w-5 text-culturin-indigo mt-1" />}
                title="Capacity Controls"
                description="Set group sizes, availability windows, and pricing tiers"
              />
              <FeatureItem
                icon={
                  <ImagePlus className="h-5 w-5 text-culturin-indigo mt-1" />
                }
                title="Media Management"
                description="Add photos, videos, and testimonials with optimization tools"
              />
              <FeatureItem
                icon={<Star className="h-5 w-5 text-culturin-indigo mt-1" />}
                title="Smart Suggestions"
                description="Get AI recommendations for improving visibility based on similar listings"
              />
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <h4 className="font-medium text-lg">
              Seamless Booking and Payments
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FeatureItem
                icon={
                  <CreditCard className="h-5 w-5 text-culturin-indigo mt-1" />
                }
                title="Payment Integrations"
                description="Connect with secure payment for secure financial transactions"
              />
              <FeatureItem
                icon={<Receipt className="h-5 w-5 text-culturin-indigo mt-1" />}
                title="Financial Reports"
                description="Payout tracking and detailed financial statements"
              />
              <FeatureItem
                icon={
                  <Calendar className="h-5 w-5 text-culturin-indigo mt-1" />
                }
                title="Integrated Calendar"
                description="Booking calendar syncable with Google/Apple Calendar"
              />
              <FeatureItem
                icon={
                  <MessageSquare className="h-5 w-5 text-culturin-indigo mt-1" />
                }
                title="Group Booking Tools"
                description="Manage group bookings with chat and payment splitting"
              />
            </div>
          </TabsContent>

          <TabsContent value="crm" className="space-y-4">
            <h4 className="font-medium text-lg">
              Guest Relationship Management
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FeatureItem
                icon={
                  <UserCircle className="h-5 w-5 text-culturin-indigo mt-1" />
                }
                title="Guest Profiles"
                description="Track past bookings, reviews, preferences for personalization"
              />
              <FeatureItem
                icon={<Tag className="h-5 w-5 text-culturin-indigo mt-1" />}
                title="Auto-Tagging"
                description="Automatically categorize guests (e.g. food lover, cultural explorer)"
              />
              <FeatureItem
                icon={
                  <MessageCircle className="h-5 w-5 text-culturin-indigo mt-1" />
                }
                title="Direct Messaging"
                description="Communicate with guests before and after experiences"
              />
              <FeatureItem
                icon={<Star className="h-5 w-5 text-culturin-indigo mt-1" />}
                title="Review Management"
                description="Request reviews and send auto follow up templates"
              />
            </div>
          </TabsContent>

          <TabsContent value="marketing" className="space-y-4">
            <h4 className="font-medium text-lg">Promotional Tools</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FeatureItem
                icon={<Ticket className="h-5 w-5 text-culturin-indigo mt-1" />}
                title="Promo Code Generator"
                description="Create and track promotional codes for special offers"
              />
              <FeatureItem
                icon={
                  <Megaphone className="h-5 w-5 text-culturin-indigo mt-1" />
                }
                title="Email & SMS Broadcasts"
                description="Send targeted marketing messages to past and potential guests"
              />
              <FeatureItem
                icon={<Search className="h-5 w-5 text-culturin-indigo mt-1" />}
                title="SEO Tools"
                description="Optimize your listings with SEO checklist and recommendations"
              />
              <FeatureItem
                icon={<Share2 className="h-5 w-5 text-culturin-indigo mt-1" />}
                title="Referral System"
                description="Built-in referral program to encourage word of mouth growth"
              />
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <h4 className="font-medium text-lg">Team Collaboration</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FeatureItem
                icon={
                  <UsersRound className="h-5 w-5 text-culturin-indigo mt-1" />
                }
                title="Role Management"
                description="Add team members with role-based permissions"
              />
              <FeatureItem
                icon={
                  <CheckSquare className="h-5 w-5 text-culturin-indigo mt-1" />
                }
                title="Task Assignment"
                description="Assign tasks per experience with simple tracking"
              />
              <FeatureItem
                icon={
                  <CreditCard className="h-5 w-5 text-culturin-indigo mt-1" />
                }
                title="Team Training"
                description="In-app tutorials and onboarding for new team members"
              />
              <FeatureItem
                icon={
                  <LineChart className="h-5 w-5 text-culturin-indigo mt-1" />
                }
                title="Performance Tracking"
                description="Monitor individual team member performance and contribution"
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="flex gap-3">
    {icon}
    <div>
      <h5 className="font-medium">{title}</h5>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default FeaturesCatalogue;

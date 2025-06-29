
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown } from "lucide-react";
import { 
  Calendar, Users, BarChart3, Megaphone, Globe, UsersRound
} from "lucide-react";

interface FeatureCardProps {
  title: string;
  features: string[];
  icon: React.ReactNode;
  badgeText?: string;
}

const FeatureHighlights: React.FC = () => {
  return (
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
  );
};

// Helper component for feature cards
const FeatureCard = ({ title, features, icon, badgeText }: FeatureCardProps) => (
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

export default FeatureHighlights;

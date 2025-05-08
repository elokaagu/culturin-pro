
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, ShoppingBag, Star, ChartBarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change: string;
  changePositive: boolean;
  icon: React.ReactNode;
  className?: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title, value, change, changePositive, icon, className
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            
            <div className={cn(
              "flex items-center gap-1 text-xs font-medium mt-1",
              changePositive ? "text-green-600" : "text-red-600"
            )}>
              {changePositive ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              <span>{change} vs. previous period</span>
            </div>
          </div>
          <div className="rounded-full bg-gray-100 p-2">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AnalyticsOverviewCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <AnalyticsCard 
        title="Total Revenue"
        value="$12,580"
        change="12%"
        changePositive={true}
        icon={<ShoppingBag className="h-5 w-5" />}
      />
      <AnalyticsCard 
        title="Bookings"
        value="253"
        change="8%"
        changePositive={true}
        icon={<ChartBarIcon className="h-5 w-5" />}
      />
      <AnalyticsCard 
        title="Total Guests"
        value="1,024"
        change="5%"
        changePositive={true}
        icon={<Users className="h-5 w-5" />}
      />
      <AnalyticsCard 
        title="Avg. Rating"
        value="4.8"
        change="0.2"
        changePositive={true}
        icon={<Star className="h-5 w-5" />}
      />
    </div>
  );
};

export default AnalyticsOverviewCards;

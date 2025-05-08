
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardMetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changePositive?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const DashboardMetricCard: React.FC<DashboardMetricCardProps> = ({
  title,
  value,
  change,
  changePositive,
  icon,
  className
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            
            {change && (
              <p className={cn(
                "text-xs font-medium mt-1",
                changePositive ? "text-green-600" : "text-red-600"
              )}>
                {changePositive ? '+' : '-'}{change} from last month
              </p>
            )}
          </div>
          {icon && (
            <div className="rounded-full bg-gray-100 p-2">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardMetricCard;


import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface DashboardMetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changePositive?: boolean;
  icon?: React.ReactNode;
  className?: string;
  actionText?: string;
}

const DashboardMetricCard: React.FC<DashboardMetricCardProps> = ({
  title,
  value,
  change,
  changePositive,
  icon,
  className,
  actionText
}) => {
  return (
    <Card className={cn("overflow-hidden group transition-all duration-200 hover:shadow-md", className)}>
      <CardContent className="p-6 relative">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500 font-medium">{title}</p>
              {icon && (
                <div className="rounded-full bg-gray-100 p-2">
                  {icon}
                </div>
              )}
            </div>
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
          
          <DropdownMenu>
            <DropdownMenuTrigger className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100">
              <MoreHorizontal className="h-4 w-4 text-gray-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export CSV</DropdownMenuItem>
              <DropdownMenuItem>Compare to last month</DropdownMenuItem>
              <DropdownMenuItem>View detailed report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {actionText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="mt-3 text-xs font-medium text-blue-600 flex items-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                  {actionText}
                  <ChevronRight className="h-3 w-3 ml-0.5" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Click to view more details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardMetricCard;

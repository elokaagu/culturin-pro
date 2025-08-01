import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

// Sample data - in a real app, this would come from an API
const fullData = [
  { month: "Jan", revenue: 2400, bookings: 24 },
  { month: "Feb", revenue: 1398, bookings: 13 },
  { month: "Mar", revenue: 9800, bookings: 98 },
  { month: "Apr", revenue: 3908, bookings: 39 },
  { month: "May", revenue: 4800, bookings: 48 },
  { month: "Jun", revenue: 3800, bookings: 38 },
  { month: "Jul", revenue: 4300, bookings: 43 },
  { month: "Aug", revenue: 8200, bookings: 82 },
  { month: "Sep", revenue: 9100, bookings: 91 },
  { month: "Oct", revenue: 7300, bookings: 73 },
  { month: "Nov", revenue: 5600, bookings: 56 },
  { month: "Dec", revenue: 6800, bookings: 68 },
];

interface RevenueChartProps {
  timeFrame?: string;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ timeFrame = "90days" }) => {
  // Filter data based on timeFrame
  const getFilteredData = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    
    switch (timeFrame) {
      case "7days":
        // For 7 days, we'll show the last 7 data points (simulating daily data)
        return fullData.slice(-7);
      case "30days":
        // For 30 days, we'll show the last 4 months
        return fullData.slice(-4);
      case "90days":
        // For 90 days, we'll show the last 3 months
        return fullData.slice(-3);
      case "year":
        // Show all data for the year
        return fullData;
      case "month":
        // Show current month data
        return fullData.slice(currentMonth, currentMonth + 1);
      default:
        return fullData.slice(-3); // Default to 90 days
    }
  };

  const data = getFilteredData();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <div>
          <CardTitle>Revenue & Bookings</CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Track your growth metrics over time
          </p>
        </div>
        <Select defaultValue="year">
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="quarter">Quarter</SelectItem>
            <SelectItem value="year">Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer
          config={{
            revenue: {
              label: "Revenue",
              color: "#222",
            },
            bookings: {
              label: "Bookings",
              color: "#4B56D2",
            },
          }}
          className="h-[500px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 30,
                right: 40,
                left: 40,
                bottom: 30,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                dy={10}
              />
              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
                dx={-10}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                dx={10}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#222"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="bookings"
                name="Bookings"
                stroke="#4B56D2"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;

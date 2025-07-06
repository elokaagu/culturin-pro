"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { DownloadIcon, FilterIcon } from "lucide-react";

// Sample data - in a real app, this would come from an API
const data = [
  { month: "Jan", revenue: 2400, bookings: 24 },
  { month: "Feb", revenue: 1398, bookings: 13 },
  { month: "Mar", revenue: 9800, bookings: 98 },
  { month: "Apr", revenue: 3908, bookings: 39 },
  { month: "May", revenue: 4800, bookings: 48 },
  { month: "Jun", revenue: 3800, bookings: 38 },
  { month: "Jul", revenue: 4300, bookings: 43 },
];

const BookingTrendsChart: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("30days");

  return (
    <Card className="transition-all duration-200 hover:shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Revenue & Bookings</CardTitle>
            <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
              <DownloadIcon className="h-3 w-3" /> Export
            </Button>
          </div>
          <CardDescription>Track your growth metrics over time</CardDescription>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-[130px] h-8 text-xs">
              <FilterIcon className="h-3 w-3 mr-1" />
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Experiences</SelectItem>
              <SelectItem value="cooking">Cooking Classes</SelectItem>
              <SelectItem value="walking">Walking Tours</SelectItem>
              <SelectItem value="crafts">Craft Workshops</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex bg-gray-100 rounded-md p-1">
            <Button
              variant="ghost"
              size="sm"
              className={`h-6 text-xs px-2 rounded-sm ${
                selectedTimeframe === "7days" ? "bg-white shadow-sm" : ""
              }`}
              onClick={() => setSelectedTimeframe("7days")}
            >
              7 days
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-6 text-xs px-2 rounded-sm ${
                selectedTimeframe === "30days" ? "bg-white shadow-sm" : ""
              }`}
              onClick={() => setSelectedTimeframe("30days")}
            >
              30 days
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-6 text-xs px-2 rounded-sm ${
                selectedTimeframe === "90days" ? "bg-white shadow-sm" : ""
              }`}
              onClick={() => setSelectedTimeframe("90days")}
            >
              90 days
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 pb-6">
        <div className="h-[500px] w-full">
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
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#eee"
              />
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
              <Tooltip
                formatter={(value, name) => {
                  if (name === "revenue") return [`$${value}`, "Revenue"];
                  return [value, "Bookings"];
                }}
                labelFormatter={(label) => `${label} 2023`}
                contentStyle={{
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  border: "1px solid #eee",
                }}
              />
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
        </div>

        <div className="mt-6 px-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg flex gap-3">
            <div className="rounded-full bg-green-100 h-8 w-8 flex items-center justify-center shrink-0">
              <Badge className="bg-green-500 text-white">↑</Badge>
            </div>
            <div>
              <p className="font-medium text-sm">$9,800 peak in March</p>
              <p className="text-xs text-gray-600">
                Due to Spring Wellness Retreat success
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg flex gap-3">
            <div className="rounded-full bg-amber-100 h-8 w-8 flex items-center justify-center shrink-0">
              <Badge className="bg-amber-500 text-white">▲</Badge>
            </div>
            <div>
              <p className="font-medium text-sm">Average order value up 12%</p>
              <p className="text-xs text-gray-600">
                Upselling strategy is working well
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg flex gap-3">
            <div className="rounded-full bg-blue-100 h-8 w-8 flex items-center justify-center shrink-0">
              <Badge className="bg-blue-500 text-white">→</Badge>
            </div>
            <div>
              <p className="font-medium text-sm">
                Conversion rate steady at 3.2%
              </p>
              <p className="text-xs text-gray-600">
                Consider A/B testing your landing page
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingTrendsChart;

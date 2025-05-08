
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';

// Sample data - in a real app, this would come from an API
const data = [
  { name: 'Jan', bookings: 12 },
  { name: 'Feb', bookings: 19 },
  { name: 'Mar', bookings: 25 },
  { name: 'Apr', bookings: 18 },
  { name: 'May', bookings: 29 },
  { name: 'Jun', bookings: 32 },
  { name: 'Jul', bookings: 40 },
  { name: 'Aug', bookings: 35 },
  { name: 'Sep', bookings: 28 },
  { name: 'Oct', bookings: 22 },
  { name: 'Nov', bookings: 16 },
  { name: 'Dec', bookings: 20 },
];

const BookingTrendsChart: React.FC = () => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Booking Trends</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer
          config={{
            bookings: {
              color: "#222",
              label: "Bookings"
            }
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 25,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                dx={-10}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />} 
              />
              <Bar 
                dataKey="bookings" 
                name="Bookings" 
                fill="#222"
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BookingTrendsChart;

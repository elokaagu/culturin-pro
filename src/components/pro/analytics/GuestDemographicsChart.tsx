
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

// Sample data - in a real app, this would come from an API
const data = [
  { age: '18-24', count: 15 },
  { age: '25-34', count: 30 },
  { age: '35-44', count: 25 },
  { age: '45-54', count: 18 },
  { age: '55-64', count: 8 },
  { age: '65+', count: 4 },
];

const GuestDemographicsChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Guest Demographics</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer
          config={{
            count: {
              color: "#82ca9d",
              label: "Guest Count"
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
                left: 0,
                bottom: 25,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="age" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
              />
              <Bar 
                dataKey="count" 
                name="Guest Count" 
                fill="#82ca9d" 
                barSize={30}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default GuestDemographicsChart;

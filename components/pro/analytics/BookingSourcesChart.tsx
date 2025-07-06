import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

// Sample data - in a real app, this would come from an API
const data = [
  { name: "Direct Website", value: 45 },
  { name: "Culturin Platform", value: 30 },
  { name: "Partner Referrals", value: 15 },
  { name: "Social Media", value: 10 },
];

const COLORS = ["#222", "#4B56D2", "#82ca9d", "#ffc658"];

const BookingSourcesChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Sources</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer
          config={{
            sources: {
              color: "#222",
              label: "Sources",
            },
          }}
          className="h-[400px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BookingSourcesChart;

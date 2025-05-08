
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Star } from "lucide-react";

// Sample data - in a real app, this would come from an API
const chartData = [
  { month: 'Jan', rating: 4.5 },
  { month: 'Feb', rating: 4.6 },
  { month: 'Mar', rating: 4.7 },
  { month: 'Apr', rating: 4.5 },
  { month: 'May', rating: 4.8 },
  { month: 'Jun', rating: 4.9 },
  { month: 'Jul', rating: 4.7 },
  { month: 'Aug', rating: 4.8 },
  { month: 'Sep', rating: 4.8 },
  { month: 'Oct', rating: 4.7 },
  { month: 'Nov', rating: 4.6 },
  { month: 'Dec', rating: 4.9 },
];

const reviewData = [
  { 
    id: 1, 
    experience: "City Art Walk", 
    guest: "Sarah J.", 
    rating: 5, 
    comment: "This was an amazing experience! Our host was knowledgeable and engaging." 
  },
  { 
    id: 2, 
    experience: "Local Cuisine Tour", 
    guest: "Michael P.", 
    rating: 4, 
    comment: "Great food and insights. Could have used a bit more time at each stop." 
  },
  { 
    id: 3, 
    experience: "Historical Walking Tour", 
    guest: "David R.", 
    rating: 5, 
    comment: "Learned so much about the city's history. The guide was excellent!" 
  },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
        />
      ))}
    </div>
  );
};

const RatingsTrendsChart: React.FC = () => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Guest Ratings & Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Rating Trend Chart */}
          <div>
            <h3 className="font-medium mb-4">Rating Trends</h3>
            <ChartContainer
              config={{
                rating: {
                  color: "#ffc658",
                  label: "Avg Rating"
                }
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    domain={[3, 5]}
                    ticks={[3, 3.5, 4, 4.5, 5]}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="rating" 
                    stroke="#ffc658" 
                    fill="#ffc658" 
                    fillOpacity={0.3} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          
          {/* Recent Reviews Table */}
          <div>
            <h3 className="font-medium mb-4">Recent Reviews</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Experience</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviewData.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">{review.experience}</TableCell>
                    <TableCell>{review.guest}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <StarRating rating={review.rating} />
                        <p className="text-xs text-gray-500 line-clamp-1">{review.comment}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RatingsTrendsChart;

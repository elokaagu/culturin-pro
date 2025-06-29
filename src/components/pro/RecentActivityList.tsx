
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Calendar, Users, CircleDollarSign } from "lucide-react";

// Sample data - in a real app, this would come from an API
const activities = [
  { 
    id: 1, 
    type: 'booking', 
    title: 'New booking received', 
    description: 'Cultural Tour on June 24th', 
    time: '10 minutes ago' 
  },
  { 
    id: 2, 
    type: 'review', 
    title: '5-star review received', 
    description: 'From Sarah M. for City Art Walk', 
    time: '2 hours ago' 
  },
  { 
    id: 3, 
    type: 'payment', 
    title: 'Payment processed', 
    description: '$250.00 for Cooking Experience', 
    time: '5 hours ago' 
  },
  { 
    id: 4, 
    type: 'booking', 
    title: 'Booking modified', 
    description: 'Group size increased to 6', 
    time: 'Yesterday' 
  },
  { 
    id: 5, 
    type: 'inquiry', 
    title: 'New inquiry', 
    description: 'About available dates in July', 
    time: 'Yesterday' 
  },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'booking':
      return <Calendar className="h-4 w-4" />;
    case 'review':
    case 'inquiry':
      return <Users className="h-4 w-4" />;
    case 'payment':
      return <CircleDollarSign className="h-4 w-4" />;
    default:
      return <Calendar className="h-4 w-4" />;
  }
};

const getActivityBadge = (type: string) => {
  switch (type) {
    case 'booking':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Booking</Badge>;
    case 'review':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Review</Badge>;
    case 'payment':
      return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Payment</Badge>;
    case 'inquiry':
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Inquiry</Badge>;
    default:
      return <Badge>Activity</Badge>;
  }
};

const RecentActivityList: React.FC = () => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-1.5 rounded-full">
                      {getActivityIcon(activity.type)}
                    </div>
                    {getActivityBadge(activity.type)}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-gray-500 text-sm">{activity.description}</p>
                  </div>
                </TableCell>
                <TableCell className="text-gray-500">{activity.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentActivityList;

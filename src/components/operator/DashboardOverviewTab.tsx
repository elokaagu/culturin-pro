'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, MessageSquare, Crown, ArrowRight } from "lucide-react";
import Image from "@/components/ui/image";
import { mockExperiences } from "./operatorMockData";
import { useNavigate } from "../../../lib/navigation";

type Props = {
  onCreateExperience: () => void;
  onUpgradeClick: () => void;
  onManageGuests: () => void;
  onGetSupport: () => void;
};

const DashboardOverviewTab: React.FC<Props> = ({
  onCreateExperience,
  onUpgradeClick,
  onManageGuests,
  onGetSupport,
}) => {
  const navigate = useNavigate();

  const handleExperienceClick = (experienceId: string) => {
    navigate(`/experience/${experienceId}`);
  };

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">54</div>
            <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$3,390</div>
            <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Avg. Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.8</div>
            <p className="text-sm text-gray-500 mt-1">From 36 reviews</p>
          </CardContent>
        </Card>
      </div>
      {/* Popular Experiences */}
      <div className="mb-10">
        <h2 className="text-xl font-medium mb-4">Your Popular Experiences</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockExperiences.map((exp) => (
            <Card
              key={exp.id}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleExperienceClick(exp.id)}
            >
              <div className="h-40 relative">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  className="object-cover"
                  fill={true}
                />
              </div>
              <CardContent className="pt-4">
                <h3 className="font-medium mb-1">{exp.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{exp.location}</p>
                <div className="flex justify-between text-sm">
                  <span>{exp.bookings} bookings</span>
                  <span>${exp.revenue} revenue</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <h2 className="text-xl font-medium mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={onCreateExperience}
        >
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <Plus className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="font-medium mb-1">Create Experience</h3>
            <p className="text-sm text-gray-500">Add a new tour or workshop</p>
          </CardContent>
        </Card>
        <Card
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={onManageGuests}
        >
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <Users className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="font-medium mb-1">Manage Guests</h3>
            <p className="text-sm text-gray-500">
              View and edit guest information
            </p>
          </CardContent>
        </Card>
        <Card
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={onGetSupport}
        >
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <MessageSquare className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="font-medium mb-1">Support</h3>
            <p className="text-sm text-gray-500">Contact our team for help</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DashboardOverviewTab;

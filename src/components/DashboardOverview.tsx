'use client'

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Calendar, ChevronUp, ChevronDown, DollarSign, CreditCard, Clock, User, UserCheck, Star, TrendingUp, HelpCircle } from "lucide-react";
import Image from "@/components/ui/image";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { Link } from "../../lib/navigation";

// Mock data
const earningsData = [
  { month: "Jan", amount: 250 },
  { month: "Feb", amount: 320 },
  { month: "Mar", amount: 500 },
  { month: "Apr", amount: 450 },
  { month: "May", amount: 680 },
  { month: "Jun", amount: 540 },
  { month: "Jul", amount: 800 },
  { month: "Aug", amount: 950 },
];

const travelerStats = [
  { name: "New Travelers", value: 12, trend: "up", percent: "+23%" },
  { name: "Returning Travelers", value: 8, trend: "up", percent: "+8%" },
  { name: "Cancellations", value: 2, trend: "down", percent: "-15%" },
];

const DashboardOverview = () => {
  const [statsPeriod, setStatsPeriod] = useState<"week" | "month" | "year">("month");
  const [showTips, setShowTips] = useState(true);
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Earnings Chart */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Earnings Overview</CardTitle>
                  <CardDescription>Tracking your monthly hosting revenue</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setStatsPeriod("week")} 
                    className={statsPeriod === "week" ? "bg-culturin-mustard/20" : ""}>
                    Week
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setStatsPeriod("month")} 
                    className={statsPeriod === "month" ? "bg-culturin-mustard/20" : ""}>
                    Month
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setStatsPeriod("year")} 
                    className={statsPeriod === "year" ? "bg-culturin-mustard/20" : ""}>
                    Year
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Chart */}
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={earningsData}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis hide={true} />
                    <RechartsTooltip 
                      cursor={{fill: 'rgba(155, 135, 245, 0.1)'}}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-2 border rounded shadow-sm">
                              <p className="font-medium">${payload[0].value}</p>
                              <p className="text-xs text-gray-500">{payload[0].payload.month}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar 
                      dataKey="amount" 
                      fill="#6E59A5" 
                      radius={[4, 4, 0, 0]} 
                      barSize={30}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <Card className="bg-culturin-indigo/5">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Earnings</p>
                      <p className="text-2xl font-bold">$3,490</p>
                    </div>
                    <div className="p-2 rounded-full bg-culturin-indigo/10 text-culturin-indigo">
                      <DollarSign className="h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-culturin-sand/20">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. Per Booking</p>
                      <p className="text-2xl font-bold">$74</p>
                    </div>
                    <div className="p-2 rounded-full bg-culturin-sand/30 text-amber-600">
                      <CreditCard className="h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-50">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Next Payout</p>
                      <p className="text-2xl font-bold">$620</p>
                    </div>
                    <div className="p-2 rounded-full bg-green-100 text-green-600">
                      <Clock className="h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          {/* Traveler Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {travelerStats.map((stat) => (
              <Card key={stat.name} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-muted-foreground">{stat.name}</p>
                    <div className={`text-xs font-medium flex items-center ${
                      stat.trend === "up" ? "text-green-600" : "text-red-500"
                    }`}>
                      {stat.percent}
                      {stat.trend === "up" ? 
                        <ChevronUp className="h-3 w-3 ml-0.5" /> : 
                        <ChevronDown className="h-3 w-3 ml-0.5" />
                      }
                    </div>
                  </div>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  
                  <div className={`h-1 mt-3 rounded-full overflow-hidden ${
                    stat.trend === "up" ? "bg-green-100" : "bg-red-50"
                  }`}>
                    <div 
                      className={`h-full ${
                        stat.trend === "up" ? "bg-green-500" : "bg-red-500"
                      }`}
                      style={{ width: stat.trend === "up" ? "70%" : "30%" }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          {/* Profile Completion */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Completion</CardTitle>
              <CardDescription>
                Boost visibility by completing your profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">80% complete</span>
                <span className="text-xs font-medium text-culturin-indigo">4/5 tasks</span>
              </div>
              
              <Progress 
                value={80} 
                className="h-2 bg-gray-100" 
                indicatorClassName="bg-culturin-indigo" 
              />
              
              <div className="space-y-3 mt-4">
                <div className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-50">
                  <div className="p-1 rounded-full bg-green-100 text-green-600 mt-0.5">
                    <UserCheck className="h-3 w-3" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Profile photo added</p>
                    <p className="text-gray-500 text-xs">Personalized your account</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-50">
                  <div className="p-1 rounded-full bg-green-100 text-green-600 mt-0.5">
                    <UserCheck className="h-3 w-3" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Verified ID</p>
                    <p className="text-gray-500 text-xs">Built trust with travelers</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-50">
                  <div className="p-1 rounded-full bg-green-100 text-green-600 mt-0.5">
                    <UserCheck className="h-3 w-3" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Contact info verified</p>
                    <p className="text-gray-500 text-xs">Email and phone confirmed</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-50">
                  <div className="p-1 rounded-full bg-green-100 text-green-600 mt-0.5">
                    <UserCheck className="h-3 w-3" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Payment method added</p>
                    <p className="text-gray-500 text-xs">Ready to receive payouts</p>
                  </div>
                </div>
                
                <Link to="/profile" className="flex items-start gap-2 p-2 rounded-md border border-dashed border-gray-200 hover:bg-gray-50">
                  <div className="p-1 rounded-full bg-amber-100 text-amber-600 mt-0.5">
                    <User className="h-3 w-3" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Add your cultural background</p>
                    <p className="text-gray-500 text-xs">Tell travelers about your heritage</p>
                  </div>
                </Link>
              </div>
              
              <Button variant="outline" className="w-full mt-2" asChild>
                <Link to="/profile">Complete Profile</Link>
              </Button>
            </CardContent>
          </Card>
          
          {/* Tips Section */}
          {showTips && (
            <Alert className="mt-6 bg-culturin-sand/30 border-culturin-mustard/30">
              <div className="flex justify-between">
                <AlertTitle className="text-amber-800">Tips for Successful Hosts</AlertTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowTips(false)}
                  className="h-5 w-5 p-0 text-amber-800"
                >
                  ✕
                </Button>
              </div>
              <AlertDescription className="text-amber-700">
                <ul className="space-y-2 mt-2 text-sm">
                  <li className="flex gap-1">
                    <Star className="h-4 w-4 text-culturin-mustard shrink-0 mt-0.5" />
                    <span>Respond to inquiries within 6 hours</span>
                  </li>
                  <li className="flex gap-1">
                    <Star className="h-4 w-4 text-culturin-mustard shrink-0 mt-0.5" />
                    <span>Add detailed traditions to your experiences</span>
                  </li>
                  <li className="flex gap-1">
                    <Star className="h-4 w-4 text-culturin-mustard shrink-0 mt-0.5" />
                    <span>Keep your calendar availability updated</span>
                  </li>
                </ul>
              </AlertDescription>
            </Alert>
          )}
          
          {/* Trending Now */}
          <Card className="mt-6 border-culturin-indigo/20">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-culturin-indigo" />
                <CardTitle className="text-lg">Trending Now</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-culturin-indigo/10 w-10 h-10 rounded-full flex items-center justify-center text-culturin-indigo font-medium">
                  01
                </div>
                <div>
                  <p className="font-medium text-sm">Seasonal Cooking Classes</p>
                  <p className="text-xs text-gray-500">Most booked this month</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-culturin-indigo/10 w-10 h-10 rounded-full flex items-center justify-center text-culturin-indigo font-medium">
                  02
                </div>
                <div>
                  <p className="font-medium text-sm">Cultural Walking Tours</p>
                  <p className="text-xs text-gray-500">High engagement rate</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-culturin-indigo/10 w-10 h-10 rounded-full flex items-center justify-center text-culturin-indigo font-medium">
                  03
                </div>
                <div>
                  <p className="font-medium text-sm">Traditional Craft Workshops</p>
                  <p className="text-xs text-gray-500">Growing category</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Calendar Preview */}
      <Card className="border-t-4 border-t-culturin-indigo">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-xl">Upcoming Experiences</CardTitle>
            <CardDescription>Your schedule for the next 7 days</CardDescription>
          </div>
          <Button variant="outline" className="flex items-center gap-1">
            <Calendar className="h-4 w-4 mr-1" />
            Full Calendar
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Today */}
            <div>
              <h4 className="font-medium text-sm mb-2 flex items-center">
                <div className="w-2 h-2 rounded-full bg-culturin-terracotta mr-2"></div>
                Today - May 8
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="overflow-hidden">
                  <div className="flex">
                    <div className="w-20 bg-culturin-indigo text-white py-4 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold">8:30</span>
                      <span className="text-xs">PM</span>
                    </div>
                    <CardContent className="py-3 px-4 flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">Desert Stargazing</p>
                          <p className="text-xs text-gray-500 mt-1">Marrakech, Morocco</p>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center">
                                <span className="text-sm font-medium">6/8</span>
                                <HelpCircle className="h-3 w-3 text-gray-400 ml-1" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">6 travelers booked, 2 spots remaining</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <div className="h-6 w-6 rounded-full bg-gray-200"></div>
                          <div className="h-6 w-6 rounded-full bg-gray-300"></div>
                          <div className="h-6 w-6 rounded-full bg-gray-400 flex items-center justify-center text-[10px] text-white font-medium">+4</div>
                        </div>
                        <p className="text-xs text-gray-500">Including 2 returning travelers</p>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>
            </div>
            
            {/* Tomorrow */}
            <div>
              <h4 className="font-medium text-sm mb-2 flex items-center">
                <div className="w-2 h-2 rounded-full bg-culturin-mustard mr-2"></div>
                Tomorrow - May 9
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="overflow-hidden">
                  <div className="flex">
                    <div className="w-20 bg-culturin-mustard text-culturin-indigo py-4 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold">10:00</span>
                      <span className="text-xs">AM</span>
                    </div>
                    <CardContent className="py-3 px-4 flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">Pottery Workshop</p>
                          <p className="text-xs text-gray-500 mt-1">Oaxaca, Mexico</p>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">Full</div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">8/8 spots booked</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <div className="h-6 w-6 rounded-full bg-gray-200"></div>
                          <div className="h-6 w-6 rounded-full bg-gray-300"></div>
                          <div className="h-6 w-6 rounded-full bg-gray-400 flex items-center justify-center text-[10px] text-white font-medium">+6</div>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="flex">
                    <div className="w-20 bg-culturin-clay text-white py-4 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold">2:30</span>
                      <span className="text-xs">PM</span>
                    </div>
                    <CardContent className="py-3 px-4 flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">Cooking Class</p>
                          <p className="text-xs text-gray-500 mt-1">Bali, Indonesia</p>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center">
                                <span className="text-sm font-medium">4/10</span>
                                <HelpCircle className="h-3 w-3 text-gray-400 ml-1" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">4 travelers booked, 6 spots remaining</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <div className="h-6 w-6 rounded-full bg-gray-200"></div>
                          <div className="h-6 w-6 rounded-full bg-gray-300"></div>
                          <div className="h-6 w-6 rounded-full bg-gray-400"></div>
                          <div className="h-6 w-6 rounded-full bg-gray-400 flex items-center justify-center text-[10px] text-white font-medium">+1</div>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>
            </div>
            
            {/* Upcoming */}
            <div>
              <h4 className="font-medium text-sm mb-2 flex items-center">
                <div className="w-2 h-2 rounded-full bg-culturin-indigo mr-2"></div>
                May 11-15
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                  <div className="flex">
                    <div className="w-20 bg-gray-200 text-gray-700 py-4 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold">11</span>
                      <span className="text-xs">May</span>
                    </div>
                    <CardContent className="py-3 px-4 flex-1">
                      <p className="font-medium">Pottery Workshop</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">10:00 AM</span>
                        <span className="text-xs text-gray-400 mx-1">•</span>
                        <span className="text-xs text-gray-500">4/8 booked</span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
                
                <Card className="overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                  <div className="flex">
                    <div className="w-20 bg-gray-200 text-gray-700 py-4 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold">12</span>
                      <span className="text-xs">May</span>
                    </div>
                    <CardContent className="py-3 px-4 flex-1">
                      <p className="font-medium">Desert Stargazing</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">8:30 PM</span>
                        <span className="text-xs text-gray-400 mx-1">•</span>
                        <span className="text-xs text-gray-500">0/8 booked</span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;

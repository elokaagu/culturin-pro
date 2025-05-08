
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import ExperienceBuilder from "@/components/ExperienceBuilder";
import ListingsTable from "@/components/ListingsTable";
import BookingOverview from "@/components/BookingOverview";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Filter, HelpCircle, ArrowUp, ArrowDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import Image from "@/components/ui/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock data for empty state detection
const mockListings = [
  {
    id: "1",
    title: "Traditional Pottery Workshop",
    status: "live",
    bookingPercentage: 75,
    price: 45,
    location: "Oaxaca, Mexico",
    dates: "Weekly, Tue & Thu"
  },
  {
    id: "2",
    title: "Desert Stargazing Experience",
    status: "live",
    bookingPercentage: 60,
    price: 85,
    location: "Marrakech, Morocco",
    dates: "Nightly, Weather Permitting"
  },
  {
    id: "3",
    title: "Farm to Table Cooking Class",
    status: "draft",
    bookingPercentage: 0,
    price: 65,
    location: "Bali, Indonesia",
    dates: "Mon, Wed, Fri"
  }
];

const OperatorDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState<string>("none");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [experiences, setExperiences] = useState(mockListings);
  const location = useLocation();
  const [sortLabel, setSortLabel] = useState<string>("Sort By");
  
  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleCreateExperience = () => {
    setActiveTab("create");
    toast({
      title: "Create Experience",
      description: "You've switched to the experience builder.",
    });
  };
  
  const handleViewBookings = () => {
    setActiveTab("bookings");
    toast({
      title: "View Bookings",
      description: "You've switched to booking management.",
    });
  };

  // Sort and filter functions
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
    
    // Update sort label
    if (column === "none") {
      setSortLabel("Sort By");
    } else if (column === "status") {
      setSortLabel("Status");
    } else if (column === "bookingPercentage") {
      setSortLabel("Booking %");
    } else if (column === "price") {
      setSortLabel("Price");
    }
  };
  
  const handleFilter = (status: string) => {
    setFilterStatus(status);
  };

  // Simulate data for empty state testing
  const hasExperiences = experiences.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header type="operator" />
      
      {/* Hero Section with enhanced contrast */}
      <section className="bg-culturin-indigo py-12 text-white relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png"
            alt="Cultural background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-culturin-indigo/95 to-black/80 mix-blend-multiply"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-2xl backdrop-blur-sm bg-black/20 p-6 rounded-lg border border-white/10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-4 text-white text-shadow">
              Empower Your Culture
            </h1>
            <p className="text-xl text-white max-w-2xl mb-8 drop-shadow-md">
              Share your story, publish your tours, grow your travel business.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-4">
              <Button 
                className="bg-culturin-mustard text-culturin-indigo hover:bg-culturin-mustard/90 hover:scale-105 flex items-center px-6 py-6 font-semibold shadow-lg transition-all duration-200"
                onClick={handleCreateExperience}
              >
                <Plus className="w-5 h-5 mr-2" />
                Create My Experience
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/30 hover:scale-105 flex items-center px-6 py-6 shadow-sm transition-all duration-200"
                onClick={handleViewBookings}
              >
                <Calendar className="w-5 h-5 mr-2" />
                View Bookings
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Dashboard Content with improved tabs */}
      <section className="flex-1 py-8">
        <div className="container-custom">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid grid-cols-1 sm:grid-cols-3 p-1 bg-gray-100 rounded-lg">
              <TabsTrigger 
                value="overview"
                className="data-[state=active]:bg-culturin-indigo data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:font-medium rounded-md transition-all border-b-2 border-transparent data-[state=active]:border-culturin-mustard hover:bg-gray-200 hover:text-culturin-indigo"
              >
                Dashboard Overview
              </TabsTrigger>
              <TabsTrigger 
                value="create"
                className="data-[state=active]:bg-culturin-indigo data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:font-medium rounded-md transition-all border-b-2 border-transparent data-[state=active]:border-culturin-mustard hover:bg-gray-200 hover:text-culturin-indigo"
              >
                Create Experience
              </TabsTrigger>
              <TabsTrigger 
                value="bookings"
                className="data-[state=active]:bg-culturin-indigo data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:font-medium rounded-md transition-all border-b-2 border-transparent data-[state=active]:border-culturin-mustard hover:bg-gray-200 hover:text-culturin-indigo"
              >
                Booking Management
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-playfair font-semibold">My Listed Experiences</h2>
                    
                    <div className="flex items-center gap-3 text-sm">
                      <div className="relative">
                        <select 
                          className="bg-white py-2 px-3 border rounded-md pr-10 appearance-none cursor-pointer hover:bg-gray-50"
                          onChange={(e) => handleFilter(e.target.value)}
                          value={filterStatus}
                        >
                          <option value="all">Filter by Status</option>
                          <option value="live">Published Only</option>
                          <option value="draft">Drafts Only</option>
                        </select>
                        <Filter className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
                      </div>
                      
                      <div className="relative">
                        <select 
                          className="bg-white py-2 px-3 border rounded-md pr-10 appearance-none cursor-pointer hover:bg-gray-50"
                          onChange={(e) => handleSort(e.target.value)}
                          value={sortBy}
                        >
                          <option value="none">Sorted by: {sortLabel}</option>
                          <option value="status">Status</option>
                          <option value="bookingPercentage">Booking %</option>
                          <option value="price">Price</option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                          {sortDirection === "asc" ? (
                            <ArrowUp className="w-4 h-4 transition-transform duration-200" />
                          ) : (
                            <ArrowDown className="w-4 h-4 transition-transform duration-200" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {hasExperiences ? (
                    <ListingsTable />
                  ) : (
                    <div className="bg-white rounded-lg border shadow-sm p-8 text-center">
                      <div className="mb-6 flex justify-center">
                        <Image 
                          src="/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png" 
                          alt="Create your first experience"
                          className="w-48 h-48 rounded-full object-cover opacity-80"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">You haven't created any experiences yet</h3>
                      <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        Start with your first cultural experience — showcase your traditions, skills, or local knowledge in just 5 minutes.
                      </p>
                      <Button 
                        className="bg-culturin-terracotta hover:bg-culturin-clay hover:scale-105 text-white flex items-center mx-auto"
                        onClick={handleCreateExperience}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create My First Experience
                      </Button>
                    </div>
                  )}
                  
                  {hasExperiences && (
                    <div className="mt-6 flex justify-end">
                      <Button 
                        className="bg-culturin-terracotta hover:bg-culturin-clay hover:scale-105 flex items-center transition-transform duration-200"
                        onClick={handleCreateExperience}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Experience
                      </Button>
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Performance Overview</h3>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="w-5 h-5 text-gray-400 cursor-pointer hover:text-culturin-indigo transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent>
                            These metrics show how your experiences are performing
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="group relative">
                        <div className="flex justify-between text-sm mb-2">
                          <div className="flex items-center gap-1">
                            <span>Booking Rate</span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  Booking Rate is calculated based on the % of available slots that get booked. Improve by optimizing your title and description.
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <span className="font-semibold">65%</span>
                        </div>
                        <Progress value={65} className="h-2 bg-gray-200" 
                                 indicatorClassName="bg-culturin-mustard" />
                      </div>
                      
                      <div className="group relative">
                        <div className="flex justify-between text-sm mb-2">
                          <div className="flex items-center gap-1">
                            <span>Traveler Satisfaction</span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  Based on guest ratings and feedback. Improve by delivering an authentic, well-organized experience.
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <span className="font-semibold">92%</span>
                        </div>
                        <Progress value={92} className="h-2 bg-gray-200"
                                 indicatorClassName="bg-green-500" />
                      </div>
                      
                      <div className="group relative">
                        <div className="flex justify-between text-sm mb-2">
                          <div className="flex items-center gap-1">
                            <span>Profile Completion</span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  How complete your host profile is. Complete profiles attract 3x more bookings.
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <span className="font-semibold">80%</span>
                        </div>
                        <Progress value={80} className="h-2 bg-gray-200"
                                 indicatorClassName="bg-culturin-indigo" />
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-culturin-sand/30 rounded-md">
                      <h4 className="font-semibold mb-3">Tips to Improve</h4>
                      <ul className="text-sm space-y-3">
                        <li className="hover:bg-culturin-sand/40 p-2 rounded transition-colors">
                          <button onClick={() => setActiveTab("create")} className="flex items-start w-full text-left">
                            <span className="text-culturin-terracotta mr-2 text-lg leading-none">•</span>
                            <span>Add more high-quality photos to your experiences</span>
                          </button>
                        </li>
                        <li className="hover:bg-culturin-sand/40 p-2 rounded transition-colors">
                          <Link to="/profile" className="flex items-start w-full text-left">
                            <span className="text-culturin-terracotta mr-2 text-lg leading-none">•</span>
                            <span>Complete your profile with cultural storytelling</span>
                          </Link>
                        </li>
                        <li className="hover:bg-culturin-sand/40 p-2 rounded transition-colors">
                          <button onClick={() => setActiveTab("bookings")} className="flex items-start w-full text-left">
                            <span className="text-culturin-terracotta mr-2 text-lg leading-none">•</span>
                            <span>Respond to booking inquiries within 12 hours</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <Alert className="mt-6 bg-amber-50 border-amber-200">
                    <AlertTitle className="text-amber-800 font-medium">Complete your profile</AlertTitle>
                    <AlertDescription className="text-amber-700">
                      Your profile is 80% complete. Add your background story and more photos to increase visibility.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
              
              <div>
                <BookingOverview />
              </div>
            </TabsContent>
            
            <TabsContent value="create">
              <ExperienceBuilder />
            </TabsContent>
            
            <TabsContent value="bookings">
              <BookingOverview />
              
              <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-playfair font-semibold mb-6">All Bookings</h3>
                
                {/* Bookings table with improved visuals */}
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-culturin-sand/30">
                      <TableRow>
                        <TableHead>Traveler</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Guests</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[1, 2, 3].map((booking) => (
                        <TableRow key={booking} className="hover:bg-gray-50">
                          <TableCell className="font-medium">James Wilson</TableCell>
                          <TableCell className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-culturin-sand flex-shrink-0">
                              <Image 
                                src="/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png"
                                alt="Experience thumbnail" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            Desert Stargazing Experience
                          </TableCell>
                          <TableCell>May 8, 2025</TableCell>
                          <TableCell>2</TableCell>
                          <TableCell>
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Confirmed
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container-custom text-center">
          <p className="text-gray-400 text-sm">© 2025 Culturin. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
            <Link to="/" className="text-gray-300 hover:text-white">Help Center</Link>
            <Link to="/" className="text-gray-300 hover:text-white">Terms</Link>
            <Link to="/" className="text-gray-300 hover:text-white">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OperatorDashboard;

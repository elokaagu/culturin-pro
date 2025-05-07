
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import ExperienceBuilder from "@/components/ExperienceBuilder";
import ListingsTable from "@/components/ListingsTable";
import BookingOverview from "@/components/BookingOverview";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const OperatorDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const { toast } = useToast();

  const handleCreateExperience = () => {
    setActiveTab("create");
  };
  
  const handleViewBookings = () => {
    setActiveTab("bookings");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header type="operator" />
      
      {/* Hero Section */}
      <section className="bg-culturin-indigo py-12 text-white">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-4">
            Empower Your Culture
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mb-8">
            Share your story, publish your tours, grow your travel business.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-4">
            <Button 
              className="bg-culturin-mustard text-culturin-indigo hover:bg-culturin-mustard/80 flex items-center"
              onClick={handleCreateExperience}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create My Experience
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/20 flex items-center"
              onClick={handleViewBookings}
            >
              <Calendar className="w-4 h-4 mr-2" />
              View Bookings
            </Button>
          </div>
        </div>
      </section>
      
      {/* Dashboard Content */}
      <section className="flex-1 py-8">
        <div className="container-custom">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="overview">Dashboard Overview</TabsTrigger>
              <TabsTrigger value="create">Create Experience</TabsTrigger>
              <TabsTrigger value="bookings">Booking Management</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-playfair font-semibold mb-6">My Listed Experiences</h2>
                  <ListingsTable />
                  
                  <div className="mt-6 flex justify-end">
                    <Button 
                      className="bg-culturin-terracotta hover:bg-culturin-clay flex items-center"
                      onClick={handleCreateExperience}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Experience
                    </Button>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Booking Rate</span>
                          <span className="font-semibold">65%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-culturin-mustard rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Traveler Satisfaction</span>
                          <span className="font-semibold">92%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-culturin-terracotta rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Profile Completion</span>
                          <span className="font-semibold">80%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-culturin-indigo rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-culturin-sand/30 rounded-md">
                      <h4 className="font-semibold mb-2">Tips to Improve</h4>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-start">
                          <span className="text-culturin-terracotta mr-2">•</span>
                          Add more high-quality photos to your experiences
                        </li>
                        <li className="flex items-start">
                          <span className="text-culturin-terracotta mr-2">•</span>
                          Complete your profile with cultural storytelling
                        </li>
                        <li className="flex items-start">
                          <span className="text-culturin-terracotta mr-2">•</span>
                          Respond to booking inquiries within 12 hours
                        </li>
                      </ul>
                    </div>
                  </div>
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
                
                {/* Simplified bookings table for MVP */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Traveler
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Experience
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Guests
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[1, 2, 3].map((booking) => (
                        <tr key={booking} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            James Wilson
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            Desert Stargazing Experience
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            May 8, 2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            2
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Confirmed
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

'use client'

import { useParams, useNavigate } from "../../lib/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "@/components/ui/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowLeft, MapPin, Calendar, Users, DollarSign, Edit, Share, Settings } from "lucide-react";
import { mockExperiences } from "@/components/operator/operatorMockData";
import ExperienceEditModal from "@/components/ExperienceEditModal";

const ExperienceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Find the experience by ID
  const [experience, setExperience] = useState(() => 
    mockExperiences.find(exp => exp.id === id)
  );

  // Additional thumbnail images for the gallery
  const galleryImages = experience ? [
    experience.image,
    "https://images.unsplash.com/photo-1466442929976-97f336a657be",
    "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
    "https://images.unsplash.com/photo-1487252665478-49b61b47f302"
  ] : [];
  
  if (!experience) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header type="operator" />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-medium text-gray-900 mb-4">Experience Not Found</h1>
          <Button onClick={() => navigate('/operator')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const handleEditExperience = () => {
    setEditModalOpen(true);
  };

  const handleSaveExperience = (updatedExperience: any) => {
    setExperience(updatedExperience);
    toast({
      title: "Experience Updated",
      description: "Your experience has been successfully updated.",
    });
  };

  const handleShareExperience = () => {
    toast({
      title: "Share Experience",
      description: "Link copied to clipboard",
    });
  };

  const handleManageBookings = () => {
    toast({
      title: "Manage Bookings",
      description: "Opening booking management",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header type="operator" />
      
      <ExperienceEditModal 
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        experience={experience}
        onSave={handleSaveExperience}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/operator')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Experience Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image 
                src={galleryImages[selectedImageIndex]} 
                alt={experience.title} 
                className="object-cover" 
                fill={true} 
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="px-8">
              <Carousel className="w-full">
                <CarouselContent className="-ml-2">
                  {galleryImages.map((image, index) => (
                    <CarouselItem key={index} className="pl-2 basis-1/3">
                      <div 
                        className={`relative h-20 rounded-lg overflow-hidden cursor-pointer transition-all ${
                          selectedImageIndex === index 
                            ? 'ring-2 ring-black ring-offset-2' 
                            : 'hover:opacity-80'
                        }`}
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <Image 
                          src={image} 
                          alt={`${experience.title} gallery ${index + 1}`} 
                          className="object-cover" 
                          fill={true} 
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-medium text-gray-900">{experience.title}</h1>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{experience.location}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleEditExperience} className="bg-black hover:bg-gray-800 text-white">
                <Edit className="w-4 h-4 mr-2" />
                Edit Experience
              </Button>
              <Button variant="outline" onClick={handleShareExperience}>
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" onClick={handleManageBookings}>
                <Settings className="w-4 h-4 mr-2" />
                Manage
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Total Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{experience.bookings}</div>
              <p className="text-sm text-gray-500 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500 flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${experience.revenue}</div>
              <p className="text-sm text-gray-500 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Avg. Group Size
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4.2</div>
              <p className="text-sm text-gray-500 mt-1">People per booking</p>
            </CardContent>
          </Card>
        </div>

        {/* Experience Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Experience Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-gray-600 text-sm">
                    Immerse yourself in the rich cultural heritage of {experience.location}. 
                    This authentic experience offers visitors a unique opportunity to connect 
                    with local traditions and customs.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Duration</h4>
                  <p className="text-gray-600 text-sm">3 hours</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Group Size</h4>
                  <p className="text-gray-600 text-sm">2-8 people</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Price</h4>
                  <p className="text-gray-600 text-sm">$45 per person</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-sm">New booking</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    Confirmed
                  </Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-sm">Review received</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                  <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                    5 stars
                  </Badge>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <p className="font-medium text-sm">Experience updated</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    Published
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetailPage;

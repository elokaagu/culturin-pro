
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, PencilIcon } from 'lucide-react';
import { toast } from 'sonner';

const WebsiteContent: React.FC = () => {
  // Business information state
  const [businessInfo, setBusinessInfo] = useState({
    name: 'Barcelona Cultural Tours',
    tagline: 'Authentic cultural experiences in the heart of Catalonia',
    description: 'We specialize in small group cultural tours that showcase the real Barcelona beyond the tourist spots. Our expert local guides bring history and culture to life with immersive experiences.',
    email: 'info@barcelonaculturaltours.com',
    phone: '+34 932 123 456',
    address: 'Carrer de la Diputació 215, 08011 Barcelona, Spain',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com'
  });
  
  // Tours state
  const [tours, setTours] = useState([
    {
      id: 'gaudi-tour',
      name: 'Gaudí Masterpieces Tour',
      duration: '4 hours',
      price: 65,
      image: 'https://placehold.co/600x400',
      description: 'Explore Antoni Gaudí\'s most famous architectural works including Sagrada Familia and Park Güell with skip-the-line access.',
      highlights: ['Skip-the-line Sagrada Familia tickets', 'Expert architecture guide', 'Small groups of max 10 people'],
      rating: 4.9,
      reviews: 215
    },
    {
      id: 'tapas-tour',
      name: 'Evening Tapas & Wine Tour',
      duration: '3 hours',
      price: 80,
      image: 'https://placehold.co/600x400',
      description: 'Discover Barcelona\'s culinary scene with this guided walking tour of the best tapas bars in the Gothic Quarter and El Born.',
      highlights: ['Visit to 4 authentic tapas bars', 'Wine pairing with each tapa', 'Food history and cultural insights'],
      rating: 4.8,
      reviews: 182
    },
    {
      id: 'gothic-tour',
      name: 'Gothic Quarter Hidden Gems',
      duration: '2.5 hours',
      price: 45,
      image: 'https://placehold.co/600x400',
      description: 'Wander through the labyrinthine streets of Barcelona\'s Gothic Quarter discovering secret squares and hidden history.',
      highlights: ['Ancient Roman ruins', 'Medieval architecture', 'Local stories and legends'],
      rating: 4.7,
      reviews: 124
    }
  ]);
  
  // Editing state
  const [editingTour, setEditingTour] = useState<any>(null);
  const [highlightInput, setHighlightInput] = useState('');

  // Handle changes to business info
  const handleBusinessInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBusinessInfo({
      ...businessInfo,
      [e.target.name]: e.target.value
    });
  };

  // Handle saving business info
  const handleSaveBusinessInfo = () => {
    toast.success("Business information updated", {
      description: "Your changes have been saved."
    });
  };

  // Handle adding a new tour
  const handleAddTour = () => {
    const newTour = {
      id: `tour-${Date.now()}`,
      name: 'New Tour',
      duration: '3 hours',
      price: 50,
      image: 'https://placehold.co/600x400',
      description: 'Describe your new tour here...',
      highlights: ['Highlight 1', 'Highlight 2', 'Highlight 3'],
      rating: 5.0,
      reviews: 0
    };
    
    setTours([...tours, newTour]);
    setEditingTour(newTour);
    toast.success("New tour added", {
      description: "You can now edit the tour details."
    });
  };

  // Handle editing a tour
  const handleEditTour = (tour: any) => {
    setEditingTour(tour);
  };

  // Handle deleting a tour
  const handleDeleteTour = (tourId: string) => {
    setTours(tours.filter(tour => tour.id !== tourId));
    if (editingTour && editingTour.id === tourId) {
      setEditingTour(null);
    }
    toast.success("Tour deleted", {
      description: "The tour has been removed from your website."
    });
  };

  // Handle changes to the editing tour
  const handleTourChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingTour) return;
    
    setEditingTour({
      ...editingTour,
      [e.target.name]: e.target.value
    });
  };

  // Handle adding a highlight to the tour
  const handleAddHighlight = () => {
    if (!highlightInput.trim() || !editingTour) return;
    
    setEditingTour({
      ...editingTour,
      highlights: [...editingTour.highlights, highlightInput]
    });
    
    setHighlightInput('');
  };

  // Handle removing a highlight from the tour
  const handleRemoveHighlight = (index: number) => {
    if (!editingTour) return;
    
    const newHighlights = [...editingTour.highlights];
    newHighlights.splice(index, 1);
    
    setEditingTour({
      ...editingTour,
      highlights: newHighlights
    });
  };

  // Handle saving the editing tour
  const handleSaveTour = () => {
    if (!editingTour) return;
    
    setTours(tours.map(tour => 
      tour.id === editingTour.id ? editingTour : tour
    ));
    
    toast.success("Tour updated", {
      description: "Your changes have been saved."
    });
    
    setEditingTour(null);
  };

  // Handle canceling the tour edit
  const handleCancelEdit = () => {
    setEditingTour(null);
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue="business">
        <TabsList>
          <TabsTrigger value="business">Business Information</TabsTrigger>
          <TabsTrigger value="tours">Tours & Experiences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="business">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Business Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={businessInfo.name}
                    onChange={handleBusinessInfoChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    name="tagline"
                    value={businessInfo.tagline}
                    onChange={handleBusinessInfoChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={businessInfo.description}
                    onChange={handleBusinessInfoChange}
                    rows={4}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={businessInfo.email}
                      onChange={handleBusinessInfoChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={businessInfo.phone}
                      onChange={handleBusinessInfoChange}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={businessInfo.address}
                    onChange={handleBusinessInfoChange}
                    rows={2}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="facebook">Facebook URL</Label>
                    <Input
                      id="facebook"
                      name="facebook"
                      value={businessInfo.facebook}
                      onChange={handleBusinessInfoChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="instagram">Instagram URL</Label>
                    <Input
                      id="instagram"
                      name="instagram"
                      value={businessInfo.instagram}
                      onChange={handleBusinessInfoChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="twitter">Twitter URL</Label>
                    <Input
                      id="twitter"
                      name="twitter"
                      value={businessInfo.twitter}
                      onChange={handleBusinessInfoChange}
                    />
                  </div>
                </div>
                
                <div>
                  <Button onClick={handleSaveBusinessInfo}>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tours">
          <div className="mb-4">
            <Button onClick={handleAddTour}>
              <Plus className="h-4 w-4 mr-1" /> Add New Tour
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {tours.map(tour => (
              <Card key={tour.id} className="relative">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3">
                      <img
                        src={tour.image}
                        alt={tour.name}
                        className="w-full h-48 object-cover rounded-md"
                      />
                    </div>
                    
                    <div className="w-full md:w-2/3">
                      <h3 className="text-lg font-medium mb-1">{tour.name}</h3>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <span className="mr-4">{tour.duration}</span>
                        <span>€{tour.price}</span>
                      </div>
                      
                      <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                        {tour.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tour.highlights.slice(0, 3).map((highlight, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                        {tour.highlights.length > 3 && (
                          <span className="text-gray-500 text-xs px-2 py-1">
                            +{tour.highlights.length - 3} more
                          </span>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditTour(tour)}
                        >
                          <PencilIcon className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteTour(tour.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {editingTour && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
              <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <CardContent className="pt-6 space-y-4">
                  <h2 className="text-xl font-semibold">Edit Tour</h2>
                  
                  <div>
                    <Label htmlFor="tour-name">Tour Name</Label>
                    <Input
                      id="tour-name"
                      name="name"
                      value={editingTour.name}
                      onChange={handleTourChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tour-duration">Duration</Label>
                      <Input
                        id="tour-duration"
                        name="duration"
                        value={editingTour.duration}
                        onChange={handleTourChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="tour-price">Price (€)</Label>
                      <Input
                        id="tour-price"
                        name="price"
                        type="number"
                        value={editingTour.price}
                        onChange={handleTourChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="tour-image">Image URL</Label>
                    <Input
                      id="tour-image"
                      name="image"
                      value={editingTour.image}
                      onChange={handleTourChange}
                    />
                    
                    {editingTour.image && (
                      <img
                        src={editingTour.image}
                        alt="Tour preview"
                        className="mt-2 h-40 object-cover rounded-md"
                      />
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="tour-description">Description</Label>
                    <Textarea
                      id="tour-description"
                      name="description"
                      value={editingTour.description}
                      onChange={handleTourChange}
                      rows={4}
                    />
                  </div>
                  
                  <div>
                    <Label>Highlights</Label>
                    <div className="space-y-2">
                      {editingTour.highlights.map((highlight: string, idx: number) => (
                        <div key={idx} className="flex items-center">
                          <Input value={highlight} readOnly />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveHighlight(idx)}
                            className="ml-2"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                      
                      <div className="flex gap-2 mt-2">
                        <Input
                          placeholder="Add a highlight"
                          value={highlightInput}
                          onChange={(e) => setHighlightInput(e.target.value)}
                        />
                        <Button onClick={handleAddHighlight}>Add</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveTour}>Save Tour</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebsiteContent;

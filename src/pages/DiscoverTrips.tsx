'use client'

import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Globe, Map, Users, Check, CreditCard } from "lucide-react";
import Image from "@/components/ui/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface Trip {
  id: number;
  title: string;
  image: string;
  destination: string;
  duration: string;
  price: string;
  category: string;
  description?: string;
  highlights?: string[];
  includes?: string[];
  availableDates?: string[];
}

const DiscoverTrips = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingSheetOpen, setIsBookingSheetOpen] = useState(false);
  const [isPaymentPopoverOpen, setIsPaymentPopoverOpen] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    participants: 1,
    date: "",
    specialRequests: ""
  });
  
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvc: ""
  });

  const trips: Trip[] = [
    {
      id: 1,
      title: "Culinary Journey Through Marrakech",
      image: "/lovable-uploads/8ee97e98-fd03-4f2b-8d3e-dcb87af6a6ba.png",
      destination: "Marrakech, Morocco",
      duration: "7 days",
      price: "$1,500",
      category: "food",
      description: "Explore the rich flavors and culinary traditions of Morocco alongside local chefs and food experts. Visit bustling markets, participate in cooking classes, and enjoy authentic meals in traditional settings.",
      highlights: [
        "Hands-on cooking classes with local chefs",
        "Guided food market tours",
        "Traditional dinner in the Medina",
        "Spice workshop with master blender"
      ],
      includes: [
        "6 nights accommodation",
        "Daily breakfast, 5 lunches, 4 dinners",
        "All cooking classes and tastings",
        "Market tours with local guides" 
      ],
      availableDates: ["June 15-21, 2025", "July 12-18, 2025", "September 8-14, 2025"]
    },
    {
      id: 2,
      title: "Traditional Crafts in Kyoto",
      image: "/lovable-uploads/31055680-5e98-433a-a30a-747997259663.png",
      destination: "Kyoto, Japan",
      duration: "10 days",
      price: "$2,200",
      category: "craft",
      description: "Immerse yourself in Kyoto's centuries-old craft traditions. Learn directly from master artisans and create your own pieces in traditional workshops while experiencing the rich cultural heritage of ancient Japan.",
      highlights: [
        "Pottery workshop with 3rd generation master",
        "Traditional textile dyeing experience",
        "Paper making and calligraphy classes",
        "Private tea ceremony in historic temple"
      ],
      includes: [
        "9 nights in traditional ryokan accommodation",
        "Daily breakfast, 6 lunches",
        "All workshop materials and tools",
        "Temple and cultural site entry fees"
      ],
      availableDates: ["May 10-19, 2025", "October 5-14, 2025", "November 12-21, 2025"]
    },
    {
      id: 3,
      title: "Oaxacan Pottery and Textiles",
      image: "/lovable-uploads/38b3d0e5-8ce3-41eb-bc8f-7dd21ee77dc2.png",
      destination: "Oaxaca, Mexico",
      duration: "6 days",
      price: "$1,200",
      category: "craft",
      description: "Discover the world-renowned crafts of Oaxaca with visits to indigenous communities preserving ancient techniques. Learn the art of black clay pottery and the secrets of natural textile dyeing from local artisans.",
      highlights: [
        "Black clay pottery workshop in Oaxaca",
        "Natural dyeing class with cochineal and indigo",
        "Textile weaving experience with Zapotec artists",
        "Home visit with master wood carver"
      ],
      includes: [
        "5 nights boutique accommodation",
        "Daily breakfast, 4 lunches with local families",
        "Transportation to rural communities",
        "All workshop materials"
      ],
      availableDates: ["June 1-6, 2025", "July 10-15, 2025", "August 18-23, 2025"]
    },
    {
      id: 4,
      title: "Balinese Spiritual Retreat",
      image: "/lovable-uploads/61e2237f-86de-4ec9-8712-8902092d8c9b.png",
      destination: "Ubud, Bali",
      duration: "12 days",
      price: "$1,800",
      category: "wellness",
      description: "Connect with Bali's spiritual traditions through ceremonies, meditation, and healing practices. Experience sacred water temples, traditional blessing rituals, and daily yoga in lush tropical settings.",
      highlights: [
        "Water purification ceremony at Tirta Empul",
        "Meditation with local spiritual healers",
        "Sacred arts and offering making workshops",
        "Traditional Balinese blessing ceremony"
      ],
      includes: [
        "11 nights eco-luxury accommodation",
        "Daily breakfast and wellness meals",
        "Daily yoga and meditation sessions",
        "All ceremony offerings and materials"
      ],
      availableDates: ["April 5-16, 2025", "June 2-13, 2025", "September 20-October 1, 2025"]
    },
    {
      id: 5,
      title: "Portuguese Wine Experience",
      image: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png",
      destination: "Douro Valley, Portugal",
      duration: "5 days",
      price: "$1,300",
      category: "food",
      description: "Journey through Portugal's stunning Douro Valley, exploring family-owned vineyards and learning the art of wine production. Enjoy exquisite food pairings and hands-on experiences with local winemakers.",
      highlights: [
        "Vineyard tours with family winemakers",
        "Traditional grape harvesting (seasonal)",
        "Wine blending workshop",
        "Port wine cellar private tour"
      ],
      includes: [
        "4 nights historic quinta accommodation",
        "Daily breakfast, 3 lunches, 2 dinners",
        "All wine tastings and winery visits",
        "River cruise along the Douro"
      ],
      availableDates: ["May 20-24, 2025", "September 15-19, 2025", "October 10-14, 2025"]
    },
    {
      id: 6,
      title: "Photography Safari in Kruger",
      image: "/lovable-uploads/88dfd739-180c-4ca4-8bfd-08396d3464c9.png",
      destination: "Kruger National Park, South Africa",
      duration: "8 days",
      price: "$2,500",
      category: "photography",
      description: "Capture Africa's magnificent wildlife alongside professional photographers. Learn specialized techniques for wildlife photography while enjoying daily game drives and exclusive access to prime viewing areas.",
      highlights: [
        "Daily game drives in prime wildlife areas",
        "Photography workshops with pro wildlife photographers",
        "Night photography sessions",
        "Editing and critique sessions"
      ],
      includes: [
        "7 nights luxury safari lodge accommodation",
        "All meals and refreshments",
        "Private guide and photography instructor",
        "All park and conservation fees"
      ],
      availableDates: ["July 1-8, 2025", "August 5-12, 2025", "November 3-10, 2025"]
    }
  ];

  const filteredTrips = selectedFilter === 'all' 
    ? trips 
    : trips.filter(trip => trip.category === selectedFilter);

  const handleViewDetails = (trip: Trip) => {
    setSelectedTrip(trip);
    setIsModalOpen(true);
    // Reset payment state when opening a new trip
    setPaymentComplete(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookNow = () => {
    setIsBookingSheetOpen(true);
  };

  const handleProceedToPayment = () => {
    setIsPaymentPopoverOpen(true);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate payment form
    if (!paymentForm.cardNumber || !paymentForm.cardHolder || !paymentForm.expiry || !paymentForm.cvc) {
      toast({
        title: "Missing Payment Information",
        description: "Please fill in all payment fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate payment processing
    setPaymentProcessing(true);
    
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentComplete(true);
      setIsPaymentPopoverOpen(false);
      
      toast({
        title: "Payment Successful!",
        description: `Your booking for ${selectedTrip?.title} has been confirmed.`,
      });
      
      // Reset forms
      setPaymentForm({
        cardNumber: "",
        cardHolder: "",
        expiry: "",
        cvc: ""
      });
    }, 2000);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!bookingForm.name || !bookingForm.email || !bookingForm.date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would normally send this data to your backend
    console.log("Booking submitted:", bookingForm);
    
    // Instead of closing, now proceed to payment
    handleProceedToPayment();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="traveler" />
      <main className="flex-grow">
        {/* Adjusted banner positioning to overlap with the header */}
        <div className="relative w-full h-80 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <Image src="/lovable-uploads/61e2237f-86de-4ec9-8712-8902092d8c9b.png" alt="Cultural Experiences" className="w-full h-full object-cover" fill />
          <div className="absolute inset-0 flex flex-col justify-center z-20 container mx-auto px-6">
            {/* Added a mt-16 to push the content down a bit so it's not hidden by the header */}
            <div className="mt-16">
              <h1 className="font-playfair text-4xl md:text-5xl text-white mb-4">Discover Group Trips</h1>
              <p className="text-lg text-white/90 max-w-3xl">
                Join curated cultural experiences with like-minded travelers. Each trip is designed to connect you deeply with local traditions and communities.
              </p>
            </div>
          </div>
        </div>
        
        <section className="container mx-auto px-6 mb-16 mt-12">
          {/* Filters - Updated with dark backgrounds and better contrast */}
          <div className="flex flex-wrap gap-3 mb-10">
            <Button 
              variant={selectedFilter === 'all' ? "default" : "outline"} 
              onClick={() => setSelectedFilter('all')}
              className={selectedFilter === 'all' ? "bg-[#1E1E1E] text-white" : "bg-gray-100 text-[#2B2B2B] hover:bg-gray-200"}
            >
              All Experiences
            </Button>
            <Button 
              variant={selectedFilter === 'food' ? "default" : "outline"} 
              onClick={() => setSelectedFilter('food')}
              className={selectedFilter === 'food' ? "bg-[#1E1E1E] text-white" : "bg-gray-100 text-[#2B2B2B] hover:bg-gray-200"}
            >
              Food & Cuisine
            </Button>
            <Button 
              variant={selectedFilter === 'craft' ? "default" : "outline"} 
              onClick={() => setSelectedFilter('craft')}
              className={selectedFilter === 'craft' ? "bg-[#1E1E1E] text-white" : "bg-gray-100 text-[#2B2B2B] hover:bg-gray-200"}
            >
              Arts & Crafts
            </Button>
            <Button 
              variant={selectedFilter === 'photography' ? "default" : "outline"} 
              onClick={() => setSelectedFilter('photography')}
              className={selectedFilter === 'photography' ? "bg-[#1E1E1E] text-white" : "bg-gray-100 text-[#2B2B2B] hover:bg-gray-200"}
            >
              Photography
            </Button>
            <Button 
              variant={selectedFilter === 'wellness' ? "default" : "outline"} 
              onClick={() => setSelectedFilter('wellness')}
              className={selectedFilter === 'wellness' ? "bg-[#1E1E1E] text-white" : "bg-gray-100 text-[#2B2B2B] hover:bg-gray-200"}
            >
              Wellness
            </Button>
          </div>
          
          {/* Trip listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTrips.map((trip) => (
              <Card key={trip.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-56 overflow-hidden">
                  <Image 
                    src={trip.image} 
                    alt={trip.title} 
                    aspectRatio="video"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-culturin-indigo mb-2">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm font-medium">{trip.destination}</span>
                  </div>
                  <h3 className="text-xl font-medium mb-3">{trip.title}</h3>
                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-[#4A4A4A] text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{trip.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>Small group (6-12)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <span className="text-[#4A4A4A] text-sm">from</span>
                      <p className="text-lg font-medium">{trip.price}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="border-culturin-indigo text-culturin-indigo hover:bg-culturin-indigo hover:text-white"
                      onClick={() => handleViewDetails(trip)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Trip Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedTrip && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-playfair">{selectedTrip.title}</DialogTitle>
                <DialogDescription className="text-culturin-indigo font-medium">
                  {selectedTrip.destination} · {selectedTrip.duration}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4">
                <div className="h-72 overflow-hidden rounded-md mb-6">
                  <Image 
                    src={selectedTrip.image} 
                    alt={selectedTrip.title}
                    aspectRatio="wide"
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-medium mb-3">Experience</h3>
                    <p className="text-[#4A4A4A] mb-6">{selectedTrip.description}</p>
                    
                    <h3 className="text-xl font-medium mb-3">Highlights</h3>
                    <ul className="list-disc list-inside space-y-2 mb-6">
                      {selectedTrip.highlights?.map((highlight, index) => (
                        <li key={index} className="text-[#4A4A4A]">{highlight}</li>
                      ))}
                    </ul>
                    
                    <h3 className="text-xl font-medium mb-3">What's Included</h3>
                    <ul className="list-disc list-inside space-y-2">
                      {selectedTrip.includes?.map((item, index) => (
                        <li key={index} className="text-[#4A4A4A]">{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-medium mb-2">Price</h3>
                    <p className="text-2xl font-bold mb-4">{selectedTrip.price}</p>
                    <p className="text-sm text-[#4A4A4A] mb-6">per person</p>
                    
                    {paymentComplete ? (
                      <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4 text-center">
                        <Check className="w-6 h-6 text-green-500 mx-auto mb-2" />
                        <h4 className="font-medium text-green-700">Booking Confirmed!</h4>
                        <p className="text-sm text-green-600 mt-1">
                          A confirmation email has been sent with your trip details.
                        </p>
                      </div>
                    ) : (
                      <Button 
                        className="w-full mb-3 bg-culturin-indigo hover:bg-culturin-indigo/90"
                        onClick={handleBookNow}
                      >
                        Book This Trip
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      className="w-full mb-6"
                      onClick={() => window.location.href = "mailto:hello@culturin.com?subject=Question about " + selectedTrip.title}
                    >
                      Ask a Question
                    </Button>
                    
                    {selectedTrip.availableDates && selectedTrip.availableDates.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2 text-sm">Available Dates:</h4>
                        <ul className="space-y-2 text-sm text-[#4A4A4A]">
                          {selectedTrip.availableDates.map((date, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{date}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Booking Sheet */}
      <Sheet open={isBookingSheetOpen} onOpenChange={setIsBookingSheetOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-2xl font-playfair">Book Your Trip</SheetTitle>
            <SheetDescription>
              {selectedTrip?.title} - {selectedTrip?.destination}
            </SheetDescription>
          </SheetHeader>
          
          <form onSubmit={handleSubmitBooking} className="mt-6 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name*</label>
              <Input 
                id="name" 
                name="name"
                value={bookingForm.name}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address*</label>
              <Input 
                id="email" 
                name="email"
                type="email"
                value={bookingForm.email}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
              <Input 
                id="phone" 
                name="phone"
                value={bookingForm.phone}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            
            <div>
              <label htmlFor="participants" className="block text-sm font-medium mb-1">Number of Participants*</label>
              <Input 
                id="participants" 
                name="participants"
                type="number"
                min="1" 
                max="12"
                value={bookingForm.participants}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-1">Preferred Date*</label>
              <select
                id="date"
                name="date"
                value={bookingForm.date}
                onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                required
                className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="">Select a date</option>
                {selectedTrip?.availableDates?.map((date, index) => (
                  <option key={index} value={date}>{date}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="specialRequests" className="block text-sm font-medium mb-1">Special Requests</label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={bookingForm.specialRequests}
                onChange={handleInputChange}
                rows={3}
                className="w-full border border-input bg-background rounded-md px-3 py-2 resize-none"
              ></textarea>
            </div>
            
            <div className="pt-4">
              <Popover open={isPaymentPopoverOpen} onOpenChange={setIsPaymentPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button type="submit" className="w-full bg-culturin-indigo hover:bg-culturin-indigo/90">
                    Continue to Payment
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-5">
                  <form onSubmit={handleProcessPayment} className="space-y-4">
                    <h3 className="font-medium text-lg mb-2 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Payment Details
                    </h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentForm.cardNumber}
                        onChange={handlePaymentInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardHolder">Card Holder Name</Label>
                      <Input
                        id="cardHolder"
                        name="cardHolder"
                        placeholder="John Smith"
                        value={paymentForm.cardHolder}
                        onChange={handlePaymentInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          name="expiry"
                          placeholder="MM/YY"
                          value={paymentForm.expiry}
                          onChange={handlePaymentInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          id="cvc"
                          name="cvc"
                          placeholder="123"
                          value={paymentForm.cvc}
                          onChange={handlePaymentInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        type="submit" 
                        className="w-full bg-culturin-indigo hover:bg-culturin-indigo/90"
                        disabled={paymentProcessing}
                      >
                        {paymentProcessing ? "Processing..." : `Pay ${selectedTrip?.price}`}
                      </Button>
                    </div>
                    
                    <p className="text-xs text-center text-gray-500 mt-2">
                      Secure payment processing. Your card details are encrypted.
                    </p>
                  </form>
                </PopoverContent>
              </Popover>
            </div>
            
            <p className="text-sm text-[#4A4A4A] text-center">
              By submitting this form, you agree to our terms and conditions.
            </p>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DiscoverTrips;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Clock, Users, UtensilsCrossed, Camera, Star } from 'lucide-react';

const TourOperatorWebsite: React.FC = () => {
  const { operatorId } = useParams<{ operatorId: string }>();
  const [loading, setLoading] = useState(true);
  const [operatorData, setOperatorData] = useState<any>(null);
  
  useEffect(() => {
    // Simulate loading operator data
    setTimeout(() => {
      setOperatorData({
        id: operatorId || 'demo',
        name: 'Barcelona Cultural Tours',
        tagline: 'Authentic cultural experiences in the heart of Catalonia',
        description: 'We specialize in small group cultural tours that showcase the real Barcelona beyond the tourist spots. Our expert local guides bring history and culture to life with immersive experiences.',
        logo: 'https://placehold.co/200x80',
        coverImage: 'https://placehold.co/1200x400',
        theme: 'classic',
        contact: {
          email: 'info@barcelonaculturaltours.com',
          phone: '+34 932 123 456',
          address: 'Carrer de la Diputació 215, 08011 Barcelona, Spain'
        },
        socialMedia: {
          facebook: 'https://facebook.com',
          instagram: 'https://instagram.com',
          twitter: 'https://twitter.com'
        },
        tours: [
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
        ]
      });
      setLoading(false);
    }, 1000);
  }, [operatorId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Loading tour operator website...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="h-80 bg-cover bg-center relative" 
        style={{ backgroundImage: `url(${operatorData.coverImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10 text-white">
          <img src={operatorData.logo} alt={operatorData.name} className="h-16 mb-4 bg-white p-2 rounded" />
          <h1 className="text-4xl font-bold mb-2">{operatorData.name}</h1>
          <p className="text-xl max-w-2xl">{operatorData.tagline}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6">About Us</h2>
            <p className="text-lg text-gray-700 mb-6">{operatorData.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-primary mr-2" />
                  <h3 className="font-medium">Local Expert Guides</h3>
                </div>
                <p className="text-gray-600">Our guides are born and raised in Barcelona with deep knowledge of local history and culture.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-primary mr-2" />
                  <h3 className="font-medium">Small Group Sizes</h3>
                </div>
                <p className="text-gray-600">We limit our groups to 10 people to ensure a personalized experience for every guest.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <Star className="h-6 w-6 text-primary mr-2" />
                  <h3 className="font-medium">Authentic Experiences</h3>
                </div>
                <p className="text-gray-600">Go beyond the tourist trail and experience the real Barcelona like a local.</p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6">Our Tours</h2>
            <div className="space-y-8">
              {operatorData.tours.map((tour: any) => (
                <Card key={tour.id} className="overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="h-64 md:h-full bg-cover bg-center" style={{ backgroundImage: `url(${tour.image})` }}></div>
                    <div className="col-span-2 p-6">
                      <h3 className="text-xl font-semibold mb-2">{tour.name}</h3>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-4 flex-wrap gap-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{tour.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>Max 10 people</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-500" />
                          <span>{tour.rating} ({tour.reviews} reviews)</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{tour.description}</p>
                      
                      <ul className="mb-6 space-y-1">
                        {tour.highlights.map((highlight: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xl font-bold">€{tour.price} <span className="text-sm font-normal">per person</span></div>
                        <Button>Book Now</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Get In Touch</h3>
                  <div className="space-y-3">
                    <p className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-gray-600" />
                      <span>{operatorData.contact.address}</span>
                    </p>
                    <p className="flex items-center">
                      <svg className="h-5 w-5 mr-2 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{operatorData.contact.email}</span>
                    </p>
                    <p className="flex items-center">
                      <svg className="h-5 w-5 mr-2 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{operatorData.contact.phone}</span>
                    </p>
                  </div>
                  
                  <div className="flex space-x-4 mt-6">
                    <a href={operatorData.socialMedia.facebook} className="text-gray-600 hover:text-blue-600">
                      <svg className="h-6 w-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </a>
                    <a href={operatorData.socialMedia.instagram} className="text-gray-600 hover:text-pink-600">
                      <svg className="h-6 w-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a href={operatorData.socialMedia.twitter} className="text-gray-600 hover:text-blue-400">
                      <svg className="h-6 w-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Send a Message</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input type="text" id="name" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea id="message" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
                    </div>
                    <Button className="w-full">Send Message</Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between mb-6">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-semibold mb-4">{operatorData.name}</h3>
                <p className="max-w-xs">{operatorData.tagline}</p>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-gray-300">Home</a></li>
                  <li><a href="#" className="hover:text-gray-300">Tours</a></li>
                  <li><a href="#" className="hover:text-gray-300">About</a></li>
                  <li><a href="#" className="hover:text-gray-300">Contact</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-6 mt-6 text-sm text-gray-400">
              <p>© {new Date().getFullYear()} {operatorData.name}. All rights reserved.</p>
              <p className="mt-1">Powered by <a href="/culturin-pro" className="text-primary hover:text-primary-focus">Culturin Pro</a></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TourOperatorWebsite;

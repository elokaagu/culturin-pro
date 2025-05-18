
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ItineraryType } from '@/data/itineraryData';

const TourOperatorWebsitePage: React.FC = () => {
  const { slug } = useParams();
  const [websiteData, setWebsiteData] = useState<{
    companyName: string;
    tagline: string;
    description: string;
    primaryColor: string;
    headerImage: string | null;
    theme: string;
  }>({
    companyName: 'Tour Company',
    tagline: 'Explore with us',
    description: 'Join our amazing tours',
    primaryColor: '#9b87f5',
    headerImage: null,
    theme: 'classic',
  });
  
  const [itineraries, setItineraries] = useState<ItineraryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch website data from localStorage
    const fetchWebsiteData = () => {
      try {
        const publishedData = localStorage.getItem('publishedWebsiteContent');
        const publishedTheme = localStorage.getItem('publishedWebsiteTheme');
        const publishedItineraries = localStorage.getItem('publishedItineraries');
        
        if (publishedData) {
          const parsedData = JSON.parse(publishedData);
          setWebsiteData({
            ...parsedData,
            theme: publishedTheme || 'classic',
          });
        }
        
        if (publishedItineraries) {
          setItineraries(JSON.parse(publishedItineraries));
        }
      } catch (error) {
        console.error('Error loading website data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWebsiteData();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header 
        className="relative"
        style={{
          backgroundColor: websiteData.headerImage ? undefined : websiteData.primaryColor,
        }}
      >
        {websiteData.headerImage && (
          <div className="absolute inset-0">
            <img 
              src={websiteData.headerImage} 
              alt="Header" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
        )}
        
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">{websiteData.companyName}</h1>
            <p className="text-xl max-w-2xl mx-auto">{websiteData.tagline}</p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="font-bold text-lg">{websiteData.companyName}</div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-primary">Home</a>
              <a href="#tours" className="hover:text-primary">Tours</a>
              <a href="#about" className="hover:text-primary">About</a>
              <a href="#contact" className="hover:text-primary">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Itinerary Section */}
      <section id="tours" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Our Experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {itineraries.map((itinerary) => (
              <div key={itinerary.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                {itinerary.image ? (
                  <img src={itinerary.image} alt={itinerary.title} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-gray-200"></div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{itinerary.title}</h3>
                  <p className="text-gray-600 mb-4">{itinerary.days} {itinerary.days === 1 ? 'day' : 'days'}</p>
                  <div 
                    className="px-4 py-2 rounded text-white text-center font-medium cursor-pointer"
                    style={{ backgroundColor: websiteData.primaryColor }}
                  >
                    Learn More
                  </div>
                </div>
              </div>
            ))}
            
            {itineraries.length === 0 && (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">No tours available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">About Us</h2>
            <p className="text-lg text-gray-600 text-center">{websiteData.description}</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Explore?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Book your next adventure with us and create memories that will last a lifetime.
          </p>
          <button 
            className="px-8 py-3 rounded-md text-white font-medium"
            style={{ backgroundColor: websiteData.primaryColor }}
          >
            Book Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-4">{websiteData.companyName}</h3>
              <p className="text-gray-300">{websiteData.tagline}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#tours" className="hover:text-white">Tours</a></li>
                <li><a href="#about" className="hover:text-white">About</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-300">email@example.com</p>
              <p className="text-gray-300">+1 123 456 7890</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-300">
            <p>© {new Date().getFullYear()} {websiteData.companyName}. All rights reserved.</p>
            <p className="text-sm mt-2">Created with Culturin Pro</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TourOperatorWebsitePage;

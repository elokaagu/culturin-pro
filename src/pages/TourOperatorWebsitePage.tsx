
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ItineraryType } from '@/data/itineraryData';
import BookingWidget from '@/components/pro/website/BookingWidget';
import AboutSection from '@/components/pro/website/AboutSection';
import ContactSection from '@/components/pro/website/ContactSection';
import ToursGrid from '@/components/pro/website/ToursGrid';

const TourOperatorWebsitePage: React.FC = () => {
  const { slug, '*': subpath } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
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
  const [currentView, setCurrentView] = useState('home');
  const [selectedTour, setSelectedTour] = useState<ItineraryType | null>(null);

  // Extract view from path
  useEffect(() => {
    if (location.pathname.includes('/booking')) {
      setCurrentView('booking');
      
      // Extract tour id if present
      const tourId = location.pathname.split('/').pop();
      if (tourId && tourId !== 'booking') {
        const tour = itineraries.find(it => it.id === tourId);
        if (tour) {
          setSelectedTour(tour);
        }
      }
    } else if (location.pathname.includes('/about')) {
      setCurrentView('about');
    } else if (location.pathname.includes('/contact')) {
      setCurrentView('contact');
    } else if (location.pathname.includes('/tours')) {
      setCurrentView('tours');
    } else {
      setCurrentView('home');
    }
  }, [location.pathname, itineraries]);

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

  const handleNavigation = (path: string) => {
    navigate(`/tour/${slug}/${path}`);
  };

  const handleTourSelect = (tour: ItineraryType) => {
    setSelectedTour(tour);
    navigate(`/tour/${slug}/booking/${tour.id}`);
  };

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
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="font-bold text-lg cursor-pointer" onClick={() => handleNavigation('')}>
              {websiteData.companyName}
            </div>
            <div className="flex space-x-6">
              <button 
                onClick={() => handleNavigation('')}
                className={`hover:text-primary ${currentView === 'home' ? 'font-medium text-primary' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('tours')}
                className={`hover:text-primary ${currentView === 'tours' ? 'font-medium text-primary' : ''}`}
              >
                Tours
              </button>
              <button 
                onClick={() => handleNavigation('about')}
                className={`hover:text-primary ${currentView === 'about' ? 'font-medium text-primary' : ''}`}
              >
                About
              </button>
              <button 
                onClick={() => handleNavigation('contact')}
                className={`hover:text-primary ${currentView === 'contact' ? 'font-medium text-primary' : ''}`}
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area - Conditional Rendering based on Route */}
      <main className="py-12">
        {currentView === 'booking' ? (
          <div className="container mx-auto px-4">
            <BookingWidget 
              tour={selectedTour || itineraries[0]} 
              primaryColor={websiteData.primaryColor}
              companyName={websiteData.companyName}
            />
          </div>
        ) : currentView === 'about' ? (
          <AboutSection description={websiteData.description} />
        ) : currentView === 'contact' ? (
          <ContactSection primaryColor={websiteData.primaryColor} companyName={websiteData.companyName} />
        ) : currentView === 'tours' ? (
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">All Our Experiences</h2>
            <ToursGrid 
              itineraries={itineraries} 
              onTourSelect={handleTourSelect} 
              primaryColor={websiteData.primaryColor} 
            />
          </div>
        ) : (
          /* Home View */
          <>
            {/* Featured Tours Section */}
            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10">Our Experiences</h2>
                <ToursGrid 
                  itineraries={itineraries.slice(0, 3)} 
                  onTourSelect={handleTourSelect} 
                  primaryColor={websiteData.primaryColor} 
                />
                
                {itineraries.length > 3 && (
                  <div className="text-center mt-8">
                    <button 
                      className="px-6 py-2 rounded-md text-white font-medium"
                      style={{ backgroundColor: websiteData.primaryColor }}
                      onClick={() => handleNavigation('tours')}
                    >
                      View All Tours
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* About Section */}
            <AboutSection description={websiteData.description} showReadMore onReadMore={() => handleNavigation('about')} />

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
                  onClick={() => handleNavigation('booking')}
                >
                  Book Now
                </button>
              </div>
            </section>
          </>
        )}
      </main>

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
                <li><button className="hover:text-white" onClick={() => handleNavigation('')}>Home</button></li>
                <li><button className="hover:text-white" onClick={() => handleNavigation('tours')}>Tours</button></li>
                <li><button className="hover:text-white" onClick={() => handleNavigation('about')}>About</button></li>
                <li><button className="hover:text-white" onClick={() => handleNavigation('contact')}>Contact</button></li>
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

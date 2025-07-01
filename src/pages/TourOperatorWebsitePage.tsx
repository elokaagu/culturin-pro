'use client'
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from '../../lib/navigation';
import { ItineraryType } from '@/data/itineraryData';
import BookingWidget from '@/components/pro/website/BookingWidget';
import AboutSection from '@/components/pro/website/AboutSection';
import ContactSection from '@/components/pro/website/ContactSection';
import ToursGrid from '@/components/pro/website/ToursGrid';
import { cn } from '@/lib/utils';
import Image from "@/components/ui/image";

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

  // Generate footer colors based on primary color
  const getFooterColors = () => {
    const primaryColor = websiteData.primaryColor || '#9b87f5';
    
    // Create darker shade for footer background
    const darkenColor = (color: string, amount: number) => {
      color = color.replace('#', '');
      let r = parseInt(color.substring(0, 2), 16);
      let g = parseInt(color.substring(2, 4), 16);
      let b = parseInt(color.substring(4, 6), 16);
      
      r = Math.max(0, Math.floor(r * amount));
      g = Math.max(0, Math.floor(g * amount));
      b = Math.max(0, Math.floor(b * amount));
      
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    };
    
    // Create a lighter shade for hover effects
    const lightenColor = (color: string, amount: number) => {
      color = color.replace('#', '');
      let r = parseInt(color.substring(0, 2), 16);
      let g = parseInt(color.substring(2, 4), 16);
      let b = parseInt(color.substring(4, 6), 16);
      
      r = Math.min(255, Math.floor(r + (255 - r) * amount));
      g = Math.min(255, Math.floor(g + (255 - g) * amount));
      b = Math.min(255, Math.floor(b + (255 - b) * amount));
      
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    };
    
    return {
      background: darkenColor(primaryColor, 0.3),
      text: '#ffffff',
      linkHover: lightenColor(primaryColor, 0.7),
      border: darkenColor(primaryColor, 0.2),
      accent: lightenColor(primaryColor, 0.2)
    };
  };
  
  const footerColors = getFooterColors();

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

      {/* Improved Dynamic Footer */}
      <footer style={{ backgroundColor: footerColors.background, color: footerColors.text }}>
        <div className="container mx-auto px-4">
          {/* Upper Footer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-12">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">{websiteData.companyName}</h3>
              <p className="text-opacity-80 mb-4" style={{ color: footerColors.text }}>
                {websiteData.tagline}
              </p>
              <p className="text-sm text-opacity-70" style={{ color: footerColors.text }}>
                {websiteData.description.length > 100 
                  ? `${websiteData.description.substring(0, 100)}...` 
                  : websiteData.description}
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => handleNavigation('')} 
                    className="transition-colors duration-200"
                    style={{ color: footerColors.text }}
                    onMouseOver={(e) => e.currentTarget.style.color = footerColors.linkHover}
                    onMouseOut={(e) => e.currentTarget.style.color = footerColors.text}
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('tours')} 
                    className="transition-colors duration-200"
                    style={{ color: footerColors.text }}
                    onMouseOver={(e) => e.currentTarget.style.color = footerColors.linkHover}
                    onMouseOut={(e) => e.currentTarget.style.color = footerColors.text}
                  >
                    Tours
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('about')} 
                    className="transition-colors duration-200"
                    style={{ color: footerColors.text }}
                    onMouseOver={(e) => e.currentTarget.style.color = footerColors.linkHover}
                    onMouseOut={(e) => e.currentTarget.style.color = footerColors.text}
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('contact')} 
                    className="transition-colors duration-200"
                    style={{ color: footerColors.text }}
                    onMouseOver={(e) => e.currentTarget.style.color = footerColors.linkHover}
                    onMouseOut={(e) => e.currentTarget.style.color = footerColors.text}
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-opacity-80 mb-2" style={{ color: footerColors.text }}>
                email@example.com
              </p>
              <p className="text-opacity-80 mb-2" style={{ color: footerColors.text }}>
                +1 123 456 7890
              </p>
              <button 
                onClick={() => handleNavigation('booking')}
                className="mt-4 px-4 py-2 rounded-md transition-colors duration-200"
                style={{ 
                  backgroundColor: footerColors.accent, 
                  color: footerColors.background
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = footerColors.linkHover}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = footerColors.accent}
              >
                Book Now
              </button>
            </div>
          </div>
          
          {/* Footer Divider */}
          <div style={{ borderColor: footerColors.border }} className="border-t opacity-20 my-4"></div>
          
          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center py-6">
            <p className="text-sm opacity-80">
              © {new Date().getFullYear()} {websiteData.companyName}. All rights reserved.
            </p>
            <p className="text-xs opacity-70 mt-2 md:mt-0">
              Created with Culturin Pro
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TourOperatorWebsitePage;

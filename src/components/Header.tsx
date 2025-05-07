
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, User, Globe } from 'lucide-react';

interface HeaderProps {
  type: 'traveler' | 'operator';
}

export const Header = ({ type }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <Globe className={`w-8 h-8 mr-2 transition-colors ${
                isScrolled ? 'text-culturin-indigo' : 'text-white group-hover:text-culturin-mustard'
              }`} />
              <span className={`font-playfair font-bold text-2xl transition-colors ${
                isScrolled ? 'text-culturin-indigo' : 'text-white group-hover:text-culturin-mustard'
              }`}>Culturin</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav>
              <ul className="flex space-x-8">
                {type === 'traveler' ? (
                  <>
                    <li>
                      <Link 
                        to="/" 
                        className={`font-medium transition-colors ${
                          isScrolled 
                            ? 'text-gray-800 hover:text-culturin-terracotta' 
                            : 'text-white hover:text-culturin-mustard'
                        }`}
                      >
                        Discover
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/" 
                        className={`font-medium transition-colors ${
                          isScrolled 
                            ? 'text-gray-800 hover:text-culturin-terracotta' 
                            : 'text-white hover:text-culturin-mustard'
                        }`}
                      >
                        How It Works
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/operator" 
                        className={`font-medium transition-colors ${
                          isScrolled 
                            ? 'text-gray-800 hover:text-culturin-terracotta' 
                            : 'text-white hover:text-culturin-mustard'
                        }`}
                      >
                        For Operators
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link 
                        to="/operator" 
                        className={`font-medium transition-colors ${
                          isScrolled 
                            ? 'text-gray-800 hover:text-culturin-terracotta' 
                            : 'text-white hover:text-culturin-mustard'
                        }`}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/operator" 
                        className={`font-medium transition-colors ${
                          isScrolled 
                            ? 'text-gray-800 hover:text-culturin-terracotta' 
                            : 'text-white hover:text-culturin-mustard'
                        }`}
                      >
                        My Experiences
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/operator" 
                        className={`font-medium transition-colors ${
                          isScrolled 
                            ? 'text-gray-800 hover:text-culturin-terracotta' 
                            : 'text-white hover:text-culturin-mustard'
                        }`}
                      >
                        Bookings
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
            
            <Button 
              variant={isScrolled ? "outline" : "default"} 
              size="sm" 
              className={`flex items-center ${
                isScrolled 
                  ? 'border-culturin-indigo text-culturin-indigo' 
                  : 'bg-white/20 backdrop-blur-md border-white/20 text-white hover:bg-white/30'
              }`}
            >
              <User className="w-4 h-4 mr-2" />
              <span>{type === 'traveler' ? 'Sign In' : 'My Account'}</span>
            </Button>
          </div>
          
          <button 
            className={`md:hidden p-2 ${
              isScrolled ? 'text-culturin-indigo' : 'text-white'
            }`} 
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50 p-6 animate-fade-in">
          <nav className="py-4">
            <ul className="space-y-4">
              {type === 'traveler' ? (
                <>
                  <li><Link to="/" className="block py-3 px-4 hover:bg-culturin-sand rounded-md font-medium">Discover</Link></li>
                  <li><Link to="/" className="block py-3 px-4 hover:bg-culturin-sand rounded-md font-medium">How It Works</Link></li>
                  <li><Link to="/operator" className="block py-3 px-4 hover:bg-culturin-sand rounded-md font-medium">For Operators</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/operator" className="block py-3 px-4 hover:bg-culturin-sand rounded-md font-medium">Dashboard</Link></li>
                  <li><Link to="/operator" className="block py-3 px-4 hover:bg-culturin-sand rounded-md font-medium">My Experiences</Link></li>
                  <li><Link to="/operator" className="block py-3 px-4 hover:bg-culturin-sand rounded-md font-medium">Bookings</Link></li>
                </>
              )}
              <li>
                <Button variant="default" size="sm" className="w-full bg-culturin-indigo">
                  <User className="w-4 h-4 mr-2" />
                  <span>{type === 'traveler' ? 'Sign In' : 'My Account'}</span>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

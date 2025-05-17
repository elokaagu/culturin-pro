
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, User, Crown } from 'lucide-react';

interface HeaderProps {
  type: 'traveler' | 'operator';
}

export const Header = ({ type }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    // Scroll to top when location changes
    window.scrollTo(0, 0);
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-soft py-3' : 'bg-black/40 backdrop-blur-sm py-6'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <Crown className={`w-8 h-8 mr-2 transition-colors ${
                isScrolled ? 'text-culturin-indigo' : 'text-white group-hover:text-culturin-mustard'
              }`} />
              <span className={`font-sans font-bold text-2xl transition-colors ${
                isScrolled ? 'text-culturin-indigo' : 'text-white group-hover:text-culturin-mustard'
              }`}>Culturin OS</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav>
              <ul className="flex space-x-8">
                <li>
                  <Link 
                    to="/culturin-pro" 
                    className={`font-medium transition-colors ${
                      isScrolled 
                        ? 'text-culturin-charcoal hover:text-culturin-indigo' 
                        : 'text-white hover:text-culturin-mustard'
                    }`}
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/for-operators" 
                    className={`font-medium transition-colors ${
                      isScrolled 
                        ? 'text-culturin-charcoal hover:text-culturin-indigo' 
                        : 'text-white hover:text-culturin-mustard'
                    }`}
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/operator" 
                    className={`font-medium transition-colors ${
                      isScrolled 
                        ? 'text-culturin-charcoal hover:text-culturin-clay' 
                        : 'text-white hover:text-culturin-mustard'
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </nav>
            
            <Button 
              variant={isScrolled ? "outline" : "default"} 
              size="sm" 
              className={`flex items-center ${
                isScrolled 
                  ? 'border-culturin-indigo text-culturin-indigo hover:bg-culturin-indigo hover:text-white' 
                  : 'bg-white/30 backdrop-blur-md border-white/20 text-white hover:bg-white/40'
              }`}
              onClick={() => navigate('/sign-in')}
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
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu with improved contrast */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-card z-50 p-6 animate-fade-in">
          <nav className="py-4">
            <ul className="space-y-4">
              <li><Link to="/culturin-pro" className="block py-3 px-4 hover:bg-gray-100 rounded-md font-medium text-[#2B2B2B]">Features</Link></li>
              <li><Link to="/for-operators" className="block py-3 px-4 hover:bg-gray-100 rounded-md font-medium text-[#2B2B2B]">Pricing</Link></li>
              <li><Link to="/operator" className="block py-3 px-4 hover:bg-gray-100 rounded-md font-medium text-[#2B2B2B]">Dashboard</Link></li>
              <li>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="w-full bg-culturin-indigo hover:bg-culturin-indigo/80 transition-all duration-300"
                  onClick={() => {
                    navigate('/sign-in');
                    setIsMenuOpen(false);
                  }}
                >
                  <User className="w-4 h-4 mr-2" />
                  <span>Sign In</span>
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

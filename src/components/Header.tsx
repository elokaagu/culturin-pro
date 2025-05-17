
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
      isScrolled ? 'bg-black py-3 shadow-md' : 'bg-black/80 backdrop-blur-md py-4'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <Crown className="w-8 h-8 mr-2 text-white group-hover:text-gray-300 transition-colors" />
              <span className="font-sans font-bold text-2xl text-white group-hover:text-gray-300 transition-colors">
                Culturin OS
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav>
              <ul className="flex space-x-8">
                <li>
                  <Link 
                    to="/culturin-pro" 
                    className="font-medium text-white hover:text-gray-300 transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/for-operators" 
                    className="font-medium text-white hover:text-gray-300 transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/operator" 
                    className="font-medium text-white hover:text-gray-300 transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </nav>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center bg-transparent border-white/20 text-white hover:bg-white/10"
              onClick={() => navigate('/sign-in')}
            >
              <User className="w-4 h-4 mr-2" />
              <span>{type === 'traveler' ? 'Sign In' : 'My Account'}</span>
            </Button>
          </div>
          
          <button 
            className="md:hidden p-2 text-white" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu with improved design */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg z-50 animate-fade-in">
          <nav className="py-6 px-6">
            <ul className="space-y-4">
              <li><Link to="/culturin-pro" className="block py-3 px-4 hover:bg-white/10 rounded-md font-medium text-white">Features</Link></li>
              <li><Link to="/for-operators" className="block py-3 px-4 hover:bg-white/10 rounded-md font-medium text-white">Pricing</Link></li>
              <li><Link to="/operator" className="block py-3 px-4 hover:bg-white/10 rounded-md font-medium text-white">Dashboard</Link></li>
              <li>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full bg-transparent border-white/20 text-white hover:bg-white/10 mt-2"
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

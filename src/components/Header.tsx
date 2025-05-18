
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

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
    
    window.scrollTo(0, 0);
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      location.pathname === '/' ? (isScrolled ? 'bg-white shadow-sm' : 'bg-transparent') : 'bg-white'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mr-2">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="font-inter font-bold text-xl">
                Culturin
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav>
              <ul className="flex space-x-10">
                <li>
                  <Link 
                    to="/culturin-pro" 
                    className="font-medium text-gray-800 hover:text-gray-600 transition-colors"
                  >
                    Product
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/for-operators" 
                    className="font-medium text-gray-800 hover:text-gray-600 transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/operator" 
                    className="font-medium text-gray-800 hover:text-gray-600 transition-colors"
                  >
                    How it works
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/discover-trips" 
                    className="font-medium text-gray-800 hover:text-gray-600 transition-colors"
                  >
                    Company
                  </Link>
                </li>
              </ul>
            </nav>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost"
                className="font-medium text-gray-800 hover:text-gray-600"
                onClick={() => navigate('/sign-in')}
              >
                Login
              </Button>
              
              <Button 
                className="bg-blue-600 hover:bg-blue-700 font-medium"
                onClick={() => navigate('/sign-in')}
              >
                Get a free demo
              </Button>
            </div>
          </div>
          
          <button 
            className="md:hidden p-2 text-gray-800" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50 animate-fade-in">
          <nav className="py-4 px-6">
            <ul className="space-y-2">
              <li><Link to="/culturin-pro" className="block py-2 font-medium text-gray-800">Product</Link></li>
              <li><Link to="/for-operators" className="block py-2 font-medium text-gray-800">Pricing</Link></li>
              <li><Link to="/operator" className="block py-2 font-medium text-gray-800">How it works</Link></li>
              <li><Link to="/discover-trips" className="block py-2 font-medium text-gray-800">Company</Link></li>
              <li className="pt-2 border-t border-gray-100 mt-2">
                <Button 
                  className="w-full text-sm mt-2"
                  variant="outline"
                  onClick={() => {
                    navigate('/sign-in');
                    setIsMenuOpen(false);
                  }}
                >
                  Login
                </Button>
              </li>
              <li>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-sm mt-2"
                  onClick={() => {
                    navigate('/sign-in');
                    setIsMenuOpen(false);
                  }}
                >
                  Get a free demo
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

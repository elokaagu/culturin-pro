
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, ChartBar, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center font-medium text-gray-800 hover:text-gray-600 transition-colors focus:outline-none">
                      Product <ChevronDown className="ml-1 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64 bg-white shadow-lg rounded-md p-2">
                      <DropdownMenuItem asChild>
                        <Link to="/culturin-pro" className="flex items-start p-3 rounded-md hover:bg-gray-100">
                          <div className="flex flex-col">
                            <span className="font-medium">Analytics Dashboard</span>
                            <span className="text-xs text-gray-500">Track performance with real-time data</span>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/culturin-pro" className="flex items-start p-3 rounded-md hover:bg-gray-100">
                          <div className="flex flex-col">
                            <span className="font-medium">Booking Management</span>
                            <span className="text-xs text-gray-500">Streamline guest reservations</span>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/culturin-pro" className="flex items-start p-3 rounded-md hover:bg-gray-100">
                          <div className="flex flex-col">
                            <span className="font-medium">Guest CRM</span>
                            <span className="text-xs text-gray-500">Manage customer relationships</span>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/culturin-pro" className="flex items-start p-3 rounded-md hover:bg-gray-100">
                          <div className="flex flex-col">
                            <span className="font-medium">Marketing Tools</span>
                            <span className="text-xs text-gray-500">Promote your experiences</span>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/culturin-pro" className="flex py-2 px-3 bg-gray-50 rounded-md mt-1 text-blue-600 font-medium">
                          View all features →
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
                    to="/pro-analytics" 
                    className="font-medium text-gray-800 hover:text-gray-600 transition-colors flex items-center"
                  >
                    <ChartBar size={16} className="mr-1" />
                    Analytics
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
              <li className="py-2">
                <button className="flex items-center justify-between w-full font-medium text-gray-800" 
                  onClick={() => navigate('/culturin-pro')}>
                  <span>Product</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-100">
                  <Link to="/culturin-pro" className="block py-1 text-sm">Analytics Dashboard</Link>
                  <Link to="/culturin-pro" className="block py-1 text-sm">Booking Management</Link>
                  <Link to="/culturin-pro" className="block py-1 text-sm">Guest CRM</Link>
                  <Link to="/culturin-pro" className="block py-1 text-sm">Marketing Tools</Link>
                </div>
              </li>
              <li><Link to="/for-operators" className="block py-2 font-medium text-gray-800">Pricing</Link></li>
              <li><Link to="/operator" className="block py-2 font-medium text-gray-800">How it works</Link></li>
              <li>
                <Link 
                  to="/pro-analytics" 
                  className="block py-2 font-medium text-gray-800 flex items-center"
                >
                  <ChartBar size={16} className="mr-1" />
                  Analytics
                </Link>
              </li>
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


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, User, Globe } from 'lucide-react';

interface HeaderProps {
  type: 'traveler' | 'operator';
}

export const Header = ({ type }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="relative z-20">
      <div className="container-custom py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Globe className="w-8 h-8 text-culturin-indigo mr-2" />
              <span className="font-playfair font-bold text-2xl">Culturin</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav>
              <ul className="flex space-x-6">
                {type === 'traveler' ? (
                  <>
                    <li><Link to="/" className="font-medium hover:text-culturin-terracotta transition-colors">Discover</Link></li>
                    <li><Link to="/" className="font-medium hover:text-culturin-terracotta transition-colors">How It Works</Link></li>
                    <li><Link to="/operator" className="font-medium hover:text-culturin-terracotta transition-colors">For Operators</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/operator" className="font-medium hover:text-culturin-terracotta transition-colors">Dashboard</Link></li>
                    <li><Link to="/operator" className="font-medium hover:text-culturin-terracotta transition-colors">My Experiences</Link></li>
                    <li><Link to="/operator" className="font-medium hover:text-culturin-terracotta transition-colors">Bookings</Link></li>
                  </>
                )}
              </ul>
            </nav>
            
            <Button variant="outline" size="sm" className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span>{type === 'traveler' ? 'Sign In' : 'My Account'}</span>
            </Button>
          </div>
          
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50 p-4">
          <nav className="py-4">
            <ul className="space-y-4">
              {type === 'traveler' ? (
                <>
                  <li><Link to="/" className="block py-2 px-4 hover:bg-culturin-sand rounded-md">Discover</Link></li>
                  <li><Link to="/" className="block py-2 px-4 hover:bg-culturin-sand rounded-md">How It Works</Link></li>
                  <li><Link to="/operator" className="block py-2 px-4 hover:bg-culturin-sand rounded-md">For Operators</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/operator" className="block py-2 px-4 hover:bg-culturin-sand rounded-md">Dashboard</Link></li>
                  <li><Link to="/operator" className="block py-2 px-4 hover:bg-culturin-sand rounded-md">My Experiences</Link></li>
                  <li><Link to="/operator" className="block py-2 px-4 hover:bg-culturin-sand rounded-md">Bookings</Link></li>
                </>
              )}
              <li>
                <Button variant="outline" size="sm" className="w-full">
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

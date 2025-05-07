
import { Link } from "react-router-dom";
import { Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <span className="font-bold text-3xl">Culturin</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Connecting cultural travelers with authentic local experiences, fostering meaningful connections around the world.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-xl mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-culturin-mustard transition-colors">About</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-culturin-mustard transition-colors">Contact</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-culturin-mustard transition-colors">FAQs</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-culturin-mustard transition-colors">Privacy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-xl mb-6">Connect</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-300 hover:text-culturin-mustard transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-culturin-mustard transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
            <p className="text-gray-300">hello@culturin.com</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>© 2025 Culturin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

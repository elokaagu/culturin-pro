
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-culturin-charcoal text-white py-16 lg:py-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center mb-8">
              <Globe className="w-8 h-8 text-culturin-mustard mr-3" />
              <span className="font-serif font-medium text-3xl">Culturin</span>
            </div>
            <p className="text-gray-300 mb-8 leading-relaxed max-w-md">
              Connecting cultural travelers with authentic local experiences, fostering meaningful connections around the world.
            </p>
          </div>
          
          <div>
            <h3 className="font-serif font-medium text-xl mb-8">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-300 hover:text-culturin-mustard transition-colors inline-block border-b border-transparent hover:border-culturin-mustard">About</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-culturin-mustard transition-colors inline-block border-b border-transparent hover:border-culturin-mustard">Contact</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-culturin-mustard transition-colors inline-block border-b border-transparent hover:border-culturin-mustard">FAQs</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-culturin-mustard transition-colors inline-block border-b border-transparent hover:border-culturin-mustard">Privacy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif font-medium text-xl mb-8">Connect</h3>
            <div className="flex space-x-6 mb-8">
              <a href="#" className="text-gray-300 hover:text-culturin-mustard transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-culturin-mustard transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
            <p className="text-gray-300 font-medium">hello@culturin.com</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400 text-sm">
          <p>© 2025 Culturin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

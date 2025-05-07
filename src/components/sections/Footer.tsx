
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1C1C1C] text-[#F3F3F3] py-16 lg:py-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Column 1: Mission */}
          <div className="animate-fade-in" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center mb-6">
              <span className="font-playfair font-medium text-3xl">Culturin</span>
            </div>
            <p className="text-[#F3F3F3]/80 mb-6 leading-relaxed">
              🌍 <em>A world of stories, shared one experience at a time.</em>
            </p>
            <p className="text-[#F3F3F3]/80 leading-relaxed">
              Culturin connects travelers and hosts through meaningful cultural exchange.
            </p>
          </div>
          
          {/* Column 2: Links */}
          <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
            <h3 className="font-medium text-xl mb-6">Links</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="hover:text-white hover:underline transition-colors">About</Link></li>
              <li><Link to="/" className="hover:text-white hover:underline transition-colors">Contact</Link></li>
              <li><Link to="/" className="hover:text-white hover:underline transition-colors">FAQs</Link></li>
              <li><Link to="/" className="hover:text-white hover:underline transition-colors">Privacy</Link></li>
              <li><Link to="/for-operators" className="italic hover:text-white hover:underline transition-colors">Become a Host</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Connect */}
          <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
            <h3 className="font-medium text-xl mb-6">Connect</h3>
            <div className="flex space-x-5 mb-6">
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:hello@culturin.com" className="hover:text-white transition-colors" aria-label="Email">
                <Mail className="w-6 h-6" />
              </a>
            </div>
            <p className="mb-4">hello@culturin.com</p>
            <a href="#" className="inline-flex items-center hover:text-white transition-colors group">
              Let's build together 
              <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-[#3A3A3A] mb-8"></div>
        
        {/* Bottom Line */}
        <div className="text-center text-[#F3F3F3]/60 text-sm animate-fade-in" style={{animationDelay: '0.4s'}}>
          <p>© 2025 Culturin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

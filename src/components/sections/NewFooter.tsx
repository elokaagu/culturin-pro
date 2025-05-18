
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const NewFooter = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  
  const { ref: footerRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  useEffect(() => {
    if (inView) {
      setAnimateItems(true);
    }
  }, [inView]);
  
  return (
    <>
      {/* Bonus CTAs above footer */}
      <section className="bg-[#FAF8F6] py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/contact" className="bg-black text-white p-6 rounded-xl flex items-center justify-between group">
              <span className="text-lg font-medium">Get a free demo</span>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ExternalLink className="h-4 w-4 text-white" />
              </div>
            </Link>
            
            <Link to="#how-it-works" className="bg-[#E5DDCF] text-black p-6 rounded-xl flex items-center justify-between group">
              <span className="text-lg font-medium">See how it works</span>
              <div className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ExternalLink className="h-4 w-4 text-black" />
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Main footer */}
      <footer ref={footerRef} className="bg-[#FAF8F6] py-16 text-[#1A1A1A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">
            {/* PRODUCTS */}
            <div 
              className={`transition-all duration-700 ease-out ${
                animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{transitionDelay: '100ms'}}
            >
              <h3 className="text-sm font-semibold uppercase mb-5">Products</h3>
              <ul className="space-y-3">
                <li><Link to="/tour-builder" className="hover:opacity-70 transition-opacity">Tour Builder</Link></li>
                <li><Link to="/direct-booking" className="hover:opacity-70 transition-opacity">Direct Booking Engine</Link></li>
                <li><Link to="/guest-crm" className="hover:opacity-70 transition-opacity">Guest CRM</Link></li>
                <li><Link to="/storytelling" className="hover:opacity-70 transition-opacity">Storytelling Toolkit</Link></li>
                <li><Link to="/loyalty" className="hover:opacity-70 transition-opacity">Loyalty & Referrals</Link></li>
                <li><Link to="/analytics" className="hover:opacity-70 transition-opacity">Analytics Dashboard</Link></li>
                <li><Link to="/whats-new" className="hover:opacity-70 transition-opacity flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#1A1A1A]/10 flex items-center justify-center text-xs">→</span> 
                  See What's New
                </Link></li>
              </ul>
            </div>
            
            {/* RESOURCES */}
            <div 
              className={`transition-all duration-700 ease-out ${
                animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{transitionDelay: '200ms'}}
            >
              <h3 className="text-sm font-semibold uppercase mb-5">Resources</h3>
              <ul className="space-y-3">
                <li><Link to="/case-studies" className="hover:opacity-70 transition-opacity">Case Studies</Link></li>
                <li><Link to="/compare" className="hover:opacity-70 transition-opacity">Compare Culturin</Link></li>
                <li><Link to="/marketing-playbook" className="hover:opacity-70 transition-opacity">Tour Marketing Playbook</Link></li>
                <li><Link to="/seo-guide" className="hover:opacity-70 transition-opacity">SEO for Tour Operators</Link></li>
                <li><Link to="/ai-content" className="hover:opacity-70 transition-opacity">AI Content Generator</Link></li>
                <li><Link to="/templates" className="hover:opacity-70 transition-opacity">Travel Operator Templates</Link></li>
                <li><Link to="/funnel-guide" className="hover:opacity-70 transition-opacity">Booking Funnel Guide</Link></li>
              </ul>
            </div>
            
            {/* COMPARE */}
            <div 
              className={`transition-all duration-700 ease-out ${
                animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{transitionDelay: '300ms'}}
            >
              <h3 className="text-sm font-semibold uppercase mb-5">Compare</h3>
              <ul className="space-y-3">
                <li><Link to="/compare/fareharbor" className="hover:opacity-70 transition-opacity">FareHarbor</Link></li>
                <li><Link to="/compare/peek-pro" className="hover:opacity-70 transition-opacity">Peek Pro</Link></li>
                <li><Link to="/compare/trekksoft" className="hover:opacity-70 transition-opacity">TrekkSoft</Link></li>
                <li><Link to="/compare/viator" className="hover:opacity-70 transition-opacity">Viator</Link></li>
                <li><Link to="/compare/wetravel" className="hover:opacity-70 transition-opacity">WeTravel</Link></li>
                <li><Link to="/compare/checkfront" className="hover:opacity-70 transition-opacity">Checkfront</Link></li>
              </ul>
            </div>
            
            {/* COMPANY */}
            <div 
              className={`transition-all duration-700 ease-out ${
                animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{transitionDelay: '400ms'}}
            >
              <h3 className="text-sm font-semibold uppercase mb-5">Company</h3>
              <ul className="space-y-3">
                <li><Link to="/about" className="hover:opacity-70 transition-opacity">About</Link></li>
                <li><Link to="/careers" className="hover:opacity-70 transition-opacity">Careers</Link></li>
                <li><Link to="/press" className="hover:opacity-70 transition-opacity">Press</Link></li>
              </ul>
            </div>
            
            {/* SUPPORT */}
            <div 
              className={`transition-all duration-700 ease-out ${
                animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{transitionDelay: '500ms'}}
            >
              <h3 className="text-sm font-semibold uppercase mb-5">Support</h3>
              <ul className="space-y-3">
                <li><a href="mailto:support@culturin.com" className="hover:opacity-70 transition-opacity">support@culturin.com</a></li>
              </ul>
            </div>
          </div>
          
          {/* Divider */}
          <Separator className="mb-6 bg-[#1A1A1A]/10" />
          
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div 
              className={`text-sm text-[#1A1A1A]/70 transition-all duration-700 ease-out ${
                animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{transitionDelay: '600ms'}}
            >
              © 2025 Culturin. All rights reserved.
            </div>
            
            <div 
              className={`flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#1A1A1A]/70 transition-all duration-700 ease-out ${
                animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{transitionDelay: '700ms'}}
            >
              <Link to="/cookie-settings" className="hover:opacity-100 transition-opacity">Cookie Settings</Link>
              <Link to="/privacy" className="hover:opacity-100 transition-opacity">Privacy</Link>
              <Link to="/terms" className="hover:opacity-100 transition-opacity">Terms</Link>
              <Link to="/accessibility" className="hover:opacity-100 transition-opacity">Accessibility</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default NewFooter;

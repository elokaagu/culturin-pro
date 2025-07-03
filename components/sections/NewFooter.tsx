"use client";

import { Link } from "../../lib/navigation";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import LanguageSelector from "../LanguageSelector";

const NewFooter = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);

  const { ref: footerRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setAnimateItems(true);
    }
  }, [inView]);

  return (
    <>
      {/* Main footer */}
      <footer ref={footerRef} className="bg-[#FAF8F6] py-16 text-[#1A1A1A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">
            {/* PRODUCTS */}
            <div
              className={`transition-all duration-700 ease-out ${
                animateItems
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <h3 className="text-sm font-semibold uppercase mb-5">Products</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/product/booking-management"
                    className="hover:opacity-70 transition-opacity"
                  >
                    Direct Booking Engine
                  </Link>
                </li>
                <li>
                  <Link
                    to="/product/crm"
                    className="hover:opacity-70 transition-opacity"
                  >
                    Guest CRM
                  </Link>
                </li>
                <li>
                  <Link
                    to="/product/marketing"
                    className="hover:opacity-70 transition-opacity"
                  >
                    Marketing Tools
                  </Link>
                </li>
                <li>
                  <Link
                    to="/product/analytics"
                    className="hover:opacity-70 transition-opacity"
                  >
                    Analytics Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/whats-new"
                    className="hover:opacity-70 transition-opacity flex items-center gap-1.5"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#1A1A1A]/10 flex items-center justify-center text-xs">
                      →
                    </span>
                    See What's New
                  </Link>
                </li>
              </ul>
            </div>

            {/* RESOURCES */}
            <div
              className={`transition-all duration-700 ease-out ${
                animateItems
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <h3 className="text-sm font-semibold uppercase mb-5">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/blog"
                    className="hover:opacity-70 transition-opacity"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/how-it-works"
                    className="hover:opacity-70 transition-opacity"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="hover:opacity-70 transition-opacity"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/case-studies"
                    className="hover:opacity-70 transition-opacity"
                  >
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/help-center"
                    className="hover:opacity-70 transition-opacity"
                  >
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>

            {/* COMPANY */}
            <div
              className={`transition-all duration-700 ease-out ${
                animateItems
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <h3 className="text-sm font-semibold uppercase mb-5">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/our-story"
                    className="hover:opacity-70 transition-opacity"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="hover:opacity-70 transition-opacity"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/press"
                    className="hover:opacity-70 transition-opacity"
                  >
                    Press
                  </Link>
                </li>
                <li>
                  <Link
                    to="/culturin-pledge"
                    className="hover:opacity-70 transition-opacity flex items-center gap-1.5"
                  >
                    <span className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-xs">
                      ♥
                    </span>
                    Culturin Pledge
                  </Link>
                </li>
              </ul>
            </div>

            {/* SUPPORT */}
            <div
              className={`transition-all duration-700 ease-out ${
                animateItems
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <h3 className="text-sm font-semibold uppercase mb-5">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/contact"
                    className="hover:opacity-70 transition-opacity"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faqs"
                    className="hover:opacity-70 transition-opacity"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:support@culturin.com"
                    className="hover:opacity-70 transition-opacity"
                  >
                    support@culturin.com
                  </a>
                </li>
              </ul>
            </div>

            {/* CONNECT */}
            <div
              className={`transition-all duration-700 ease-out ${
                animateItems
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <h3 className="text-sm font-semibold uppercase mb-5">Connect</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-[#1A1A1A]/70 mb-3">
                    Choose your language
                  </p>
                  <LanguageSelector variant="footer" />
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <Separator className="mb-6 bg-[#1A1A1A]/10" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div
              className={`text-sm text-[#1A1A1A]/70 transition-all duration-700 ease-out ${
                animateItems
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              © 2025 Culturin. All rights reserved.
            </div>

            <div
              className={`flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#1A1A1A]/70 transition-all duration-700 ease-out ${
                animateItems
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "700ms" }}
            >
              <Link
                to="/cookie-settings"
                className="hover:opacity-70 transition-opacity"
              >
                Cookie Settings
              </Link>
              <Link
                to="/privacy"
                className="hover:opacity-70 transition-opacity"
              >
                Privacy
              </Link>
              <Link to="/terms" className="hover:opacity-70 transition-opacity">
                Terms
              </Link>
              <Link
                to="/accessibility"
                className="hover:opacity-70 transition-opacity"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default NewFooter;

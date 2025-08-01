"use client";

import { Link } from "../../lib/navigation";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import LanguageSelector from "../LanguageSelector";
import TranslatableText from "../TranslatableText";

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
              <h3 className="text-sm font-semibold uppercase mb-5">
                <TranslatableText text="Products" />
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/product/booking-management"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <TranslatableText text="Direct Booking Engine" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/product/crm"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <TranslatableText text="Guest CRM" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/product/marketing"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <TranslatableText text="Marketing Tools" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/product/analytics"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <TranslatableText text="Analytics Dashboard" />
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
                    <TranslatableText text="See What's New" />
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
                <TranslatableText text="Resources" />
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/blog"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <TranslatableText text="Blog" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/how-it-works"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <TranslatableText text="How it works" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <TranslatableText text="Pricing" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/case-studies"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <TranslatableText text="Case Studies" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/help-center"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <TranslatableText text="Help Center" />
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
              <h3 className="text-sm font-semibold uppercase mb-5">
                <TranslatableText text="Company" />
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/our-story"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <TranslatableText text="About" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <TranslatableText text="Careers" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/press"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <TranslatableText text="Press" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/culturin-pledge"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <TranslatableText text="Giving Pledge" />
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
              <h3 className="text-sm font-semibold uppercase mb-5">
                <TranslatableText text="Support" />
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/contact"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <TranslatableText text="Contact Us" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faqs"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <TranslatableText text="FAQs" />
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
              <h3 className="text-sm font-semibold uppercase mb-5">
                <TranslatableText text="Connect" />
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-[#1A1A1A]/70 mb-3">
                    <TranslatableText text="Choose your language" />
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

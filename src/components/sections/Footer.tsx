'use client'
import { Link } from "../../../lib/navigation";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const Footer = () => {
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
    <footer
      ref={footerRef}
      className="bg-[#1C1C1C] text-[#F3F3F3] py-16 lg:py-24"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Column 1: Mission */}
          <div
            className={`transition-all duration-700 ease-out ${
              animateItems
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="flex items-center mb-6">
              <Link
                to="/"
                className="font-playfair font-medium text-3xl hover:text-white transition-colors"
              >
                Culturin
              </Link>
            </div>
            <p className="text-[#F3F3F3]/80 mb-6 leading-relaxed">
              🌍 <em>A world of stories, shared one experience at a time.</em>
            </p>
            <p className="text-[#F3F3F3]/80 leading-relaxed">
              Culturin connects travelers and hosts through meaningful cultural
              exchange.
            </p>
          </div>

          {/* Column 2: Links */}
          <div
            className={`transition-all duration-700 ease-out ${
              animateItems
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <h3 className="font-medium text-xl mb-6">Links</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/our-story"
                  className="relative hover:text-white transition-colors after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="relative hover:text-white transition-colors after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/faqs"
                  className="relative hover:text-white transition-colors after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="relative hover:text-white transition-colors after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  to="/case-studies"
                  className="relative hover:text-white transition-colors after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  to="/help-center"
                  className="relative hover:text-white transition-colors after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/for-operators"
                  className="italic relative hover:text-white transition-colors after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  Become a Host
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div
            className={`transition-all duration-700 ease-out ${
              animateItems
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <h3 className="font-medium text-xl mb-6">Connect</h3>
            <div className="flex space-x-5 mb-6">
              <a
                href="https://instagram.com/culturin"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors transform hover:scale-105 transition-transform duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/company/culturin"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors transform hover:scale-105 transition-transform duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:hello@culturin.com"
                className="hover:text-white transition-colors transform hover:scale-105 transition-transform duration-300"
                aria-label="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
            <p className="mb-4">
              <a
                href="mailto:hello@culturin.com"
                className="relative hover:text-white transition-colors after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300"
              >
                hello@culturin.com
              </a>
            </p>
            <Link
              to="/for-operators"
              className="inline-flex items-center hover:text-white transition-colors group"
            >
              Let's build together
              <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#3A3A3A] mb-8"></div>

        {/* Bottom Line */}
        <div
          className={`text-center text-[#F3F3F3]/60 text-sm transition-all duration-700 ease-out ${
            animateItems
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <p>© 2025 Culturin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

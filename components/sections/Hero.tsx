import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Link } from "../../lib/navigation";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "@/components/ui/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TranslatableText from "../TranslatableText";

const Hero = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<number | null>(null);
  const [tourName, setTourName] = useState<string>("");

  useEffect(() => {
    // Trigger animations on component mount (page load)
    setAnimateItems(true);
  }, []);

  const operatorImages = [
    {
      url: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=1000&auto=format&fit=crop",
      alt: "Tour guide leading a cultural food tour",
      name: "Maya",
      location: "Bangkok Food Tours",
      quote: "Culturin helped me grow direct bookings by 34% in just 2 months.",
    },
    {
      url: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=1000&auto=format&fit=crop",
      alt: "Happy museum guide with visitors",
      name: "Carlos",
      location: "Mexico City Heritage Walks",
      quote:
        "I finally cut out the middlemen and increased profit margins by 28%.",
    },
    {
      url: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=1000&auto=format&fit=crop",
      alt: "Tour operator showing historical site",
      name: "Ayo",
      location: "Nigeria Roots Tours",
      quote: "My direct bookings are up 3x since I started using Culturin!",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen relative bg-white">
      {/* Simple clear background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 z-0"></div>

      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 pt-36 pb-40 max-w-7xl mx-auto relative z-10">
        {/* Rating badge */}
        <div className="mb-10">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm bg-blue-50 text-blue-800 font-medium">
            #1 Top-Rated Cultural Experience Platform{" "}
            <span className="font-semibold text-blue-600 ml-1">4.8 ★</span>{" "}
            across 279 reviews
          </span>
        </div>

        {/* Headline - Added more spacing */}
        <h1
          className={`font-inter text-4xl md:text-5xl lg:text-6xl text-black mb-10 font-bold tracking-tight leading-tight max-w-4xl mx-auto transition-all duration-700 ease-out ${
            animateItems
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <TranslatableText text="Own your bookings. Tell richer stories. Grow your cultural tour brand." />
        </h1>

        {/* Subheadline - Added more spacing */}
        <p
          className={`text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-16 transition-all duration-700 ease-out ${
            animateItems
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <TranslatableText text="Get more direct bookings, build guest loyalty, and craft unforgettable cultural journeys — without using five different tools." />
        </p>

        {/* Main content with iPhone mockup and searchbox side by side */}
        <div
          className={`w-full max-w-6xl mt-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 transition-all duration-700 ease-out ${
            animateItems
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          {/* Left side: iPhone mockup */}
          <div className="w-full lg:w-1/2 flex justify-center relative">
            <div className="relative w-[280px] md:w-[320px]">
              {/* iPhone frame */}
              <div className="relative rounded-[40px] overflow-hidden border-8 border-gray-800 w-full aspect-[9/19] bg-white shadow-xl">
                {/* App screen content */}
                <div className="absolute inset-0 overflow-hidden">
                  {/* Phone status bar */}
                  <div className="h-6 bg-gray-800 w-full"></div>

                  {/* App header */}
                  <div className="bg-white p-3 border-b">
                    <div className="h-6 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-xs text-white font-bold">
                            C
                          </span>
                        </div>
                        <span className="ml-2 text-sm font-semibold text-gray-800">
                          Culturin
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-100"></div>
                        <div className="w-5 h-5 rounded-full bg-blue-100"></div>
                      </div>
                    </div>
                  </div>

                  {/* App content - cultural experience example */}
                  <div className="p-3 h-full overflow-y-auto">
                    {/* Featured Experience */}
                    <div className="rounded-lg overflow-hidden mb-3 relative">
                      <Image
                        src="https://images.unsplash.com/photo-1466442929976-97f336a657be"
                        alt="Oaxaca Food Tour experience"
                        className="w-full h-40 object-cover"
                        fill
                      />
                      <div className="absolute top-4 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
                        Featured Tour
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <span className="text-white text-xs font-medium">
                          3-day experience
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-left text-lg font-bold">
                        Oaxaca Food Tour Adventure
                      </h3>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className="w-4 h-4 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-xs text-gray-600">
                          4.9 (126 reviews)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-blue-600 font-bold">
                        $59 per person
                      </div>
                      <button
                        className={`h-8 px-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs rounded ${
                          isHovering ? "animate-pulse" : ""
                        }`}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        Book Now
                      </button>
                    </div>

                    <div className="text-left mb-4">
                      <h4 className="font-medium text-sm">Tour Highlights:</h4>
                      <ul className="text-xs text-gray-700 mt-1 space-y-1">
                        <li>• Local market exploration with chef</li>
                        <li>• Authentic cooking class experience</li>
                        <li>• Cultural immersion & traditions</li>
                        <li>• Mezcal tasting included</li>
                      </ul>
                    </div>

                    <div className="rounded-lg overflow-hidden mb-3 relative">
                      <Image
                        src="https://images.unsplash.com/photo-1469041797191-50ace28483c3"
                        alt="Cultural tour experience"
                        className="w-full h-32 object-cover"
                        fill
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                        <span className="text-white font-medium">
                          More Tours
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* iPhone notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-5 w-36 bg-gray-800 rounded-b-xl"></div>
              </div>

              {/* Reflection effect */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[40px]"></div>
            </div>
          </div>

          {/* Right side: Improved search box area with card styling */}
          <div className="w-full lg:w-1/2">
            <div className="rounded-xl p-10 bg-white shadow-sm border border-gray-100">
              <div className="text-left mb-6 flex items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 mr-3">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="text-lg font-medium">
                  Find out why bookings drop off — and what to fix.
                </h3>
              </div>

              <div className="space-y-2 mb-4">
                <label
                  htmlFor="tourName"
                  className="text-sm text-gray-600 text-left block"
                >
                  Experience Name
                </label>
                <Input
                  id="tourName"
                  value={tourName}
                  onChange={(e) => setTourName(e.target.value)}
                  placeholder="e.g. Marrakech Walking Tour"
                  className="h-14 border-gray-200 text-base mb-3"
                />
                <Button
                  className="h-14 w-full px-6 flex items-center justify-center gap-2 text-base whitespace-nowrap transition-all duration-200 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white group disabled:opacity-50"
                  disabled={!tourName.trim()}
                  asChild={tourName.trim().length > 0}
                >
                  {tourName.trim().length > 0 ? (
                    <Link
                      to={`/analytics-scan?tour=${encodeURIComponent(
                        tourName.trim()
                      )}`}
                    >
                      <span className="font-bold">Scan My Tour</span>
                      <span className="font-normal">for Growth Leaks</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <div>
                      <span className="font-bold">Scan My Tour</span>
                      <span className="font-normal">for Growth Leaks</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </div>

              {/* Trust builder below CTA - enhanced with text description */}
              <div className="mt-8 pt-5 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-3">
                  Used by over 400 cultural tour operators — like Roots & Rhythm
                  (Accra) and Oaxaca Food Trails
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {operatorImages.map((op, i) => (
                      <div
                        key={i}
                        className="relative group"
                        onMouseEnter={() => setShowTooltip(i)}
                        onMouseLeave={() => setShowTooltip(null)}
                      >
                        <Avatar className="w-10 h-10 border-2 border-white hover:scale-105 transition-transform">
                          <AvatarImage
                            src={op.url}
                            alt={`${op.name} from ${op.location}`}
                          />
                          <AvatarFallback>{op.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 bg-gray-800 text-white text-xs rounded py-2 px-3 opacity-0 transition-opacity duration-200 pointer-events-none ${
                            showTooltip === i ? "opacity-100" : ""
                          }`}
                        >
                          <strong>{op.name}</strong>, {op.location}
                          <div className="text-xs mt-1 italic opacity-90">
                            "{op.quote}"
                          </div>
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="group relative">
                    <span className="text-sm text-blue-600 font-medium cursor-pointer hover:underline">
                      + 397 more
                    </span>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 bg-white border border-gray-200 shadow-lg rounded-lg py-3 px-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="text-xs font-medium mb-1">
                        More success stories:
                      </div>
                      <div className="text-xs text-gray-600 max-h-32 overflow-y-auto">
                        <p className="mb-2">
                          • Bali Heritage Tours (+78% direct bookings)
                        </p>
                        <p className="mb-2">
                          • Cape Town Cultural Walks (+54% revenue)
                        </p>
                        <p>• Kyoto Tea Ceremony Masters (+95% visitors)</p>
                      </div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-gray-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* App benefits/features */}
            <div className="mt-12 space-y-6 text-left">
              <h3 className="text-2xl font-bold text-gray-900">
                <TranslatableText text="Stop losing customers to competitors" />
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 shrink-0 mt-1">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">
                      <TranslatableText text="Diagnose broken funnels" />
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <TranslatableText text="See exactly where potential guests drop off in your booking flow" />
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 shrink-0 mt-1">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">
                      Optimize your presence
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Outrank competitors with data-backed insights on what's
                      working
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 shrink-0 mt-1">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">
                      <TranslatableText text="Drive direct bookings" />
                    </h4>
                    <p className="text-gray-600 text-sm">
                      <TranslatableText text="Cut out the middlemen and increase your profit margins by 25%+" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;

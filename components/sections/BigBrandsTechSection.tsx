import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Link } from "../../lib/navigation";
import Image from "@/components/ui/image";
import TranslatableText from "../TranslatableText";

const BigBrandsTechSection = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setAnimateItems(true);
    }
  }, [inView]);

  return (
    <section ref={ref} className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <div
            className={`transition-all duration-700 ease-out ${
              animateItems
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Added micro-tag above headline */}
            <div className="inline-block px-3 py-1 mb-4 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              <TranslatableText text="NEW IN CULTURIN PRO" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <TranslatableText text="Enterprise-grade tools, built for cultural tour operators" />
            </h2>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              <TranslatableText text="Culturin Pro gives you everything you need to grow bookings, delight guests, and run your business like a pro." />
            </p>

            <div className="space-y-4 mb-8">
              {/* Enhanced feature list with stronger framing */}
              <div className="flex items-start gap-2">
                <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">
                  <TranslatableText text="Your own branded guest app – Give travelers a premium booking experience on mobile" />
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">
                  <TranslatableText text="Revenue-boosting booking engine – Optimized to convert and upsell on autopilot" />
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">
                  <TranslatableText text="AI insights that unlock your audience – Know what works before your competitors do" />
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">
                  <TranslatableText text="Automated marketing tools – Emails, follow-ups, and retargeting that run while you sleep" />
                </p>
              </div>
            </div>

            {/* Updated CTA button with Link to demo page */}
            <Link to="/demo">
              <Button className="bg-black hover:bg-gray-800 text-white px-6 py-6 rounded-lg text-lg flex items-center gap-2">
                <TranslatableText text="Power up your business" />
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Phone mockup */}
          <div
            className={`relative transition-all duration-700 delay-300 ease-out ${
              animateItems
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative mx-auto" style={{ maxWidth: "350px" }}>
              {/* Phone frame */}
              <div className="relative z-10 border-8 border-black rounded-[36px] overflow-hidden shadow-xl">
                <div className="aspect-[9/18.5] relative">
                  {/* Phone UI showing the app */}
                  <div className="absolute inset-0 bg-white">
                    {/* Phone status bar */}
                    <div className="bg-black text-white text-xs p-1 flex justify-between items-center">
                      <span>9:41</span>
                      <div className="flex space-x-1">
                        <span>📶</span>
                        <span>🔋</span>
                      </div>
                    </div>

                    {/* App UI */}
                    <div className="h-full">
                      <div className="bg-gray-900 text-white p-4">
                        <h3 className="text-xl font-bold">Venice Food Tour</h3>
                        <p className="text-sm text-gray-300">
                          Pickup at 11:35am
                        </p>
                      </div>

                      {/* App content - using a cultural tour image instead of food */}
                      <div className="relative h-[65%]">
                        <Image
                          src="https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=1000&auto=format&fit=crop"
                          alt="Cultural tour guide showing experience"
                          className="w-full h-full object-cover"
                          fill
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="flex items-center">
                                <span className="text-amber-400">★</span>
                                <span className="text-white ml-1">4.9</span>
                                <span className="text-gray-300 text-sm ml-1">
                                  (152)
                                </span>
                              </div>
                            </div>
                            {/* Updated button to be on-brand with blue */}
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Bottom navigation */}
                      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-3 flex justify-around">
                        <div className="flex flex-col items-center">
                          <div className="w-6 h-6 bg-gray-800 rounded-full mb-1"></div>
                          <span className="text-xs">Home</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-6 h-6 bg-gray-300 rounded-full mb-1"></div>
                          <span className="text-xs">Tours</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-6 h-6 bg-gray-300 rounded-full mb-1"></div>
                          <span className="text-xs">Bookings</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-6 h-6 bg-gray-300 rounded-full mb-1"></div>
                          <span className="text-xs">Profile</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-5 bg-black rounded-b-lg"></div>
              </div>
              {/* Glow effect */}
              <div className="absolute -bottom-4 -left-4 -right-4 h-36 bg-gradient-to-t from-blue-500/20 to-transparent rounded-full blur-2xl z-0"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BigBrandsTechSection;

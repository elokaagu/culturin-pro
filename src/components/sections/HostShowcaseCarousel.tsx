'use client'

import { useState, useEffect, useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "@/components/ui/image";

// Updated carousel items with travel and culture themed images
const carouselItems = [
  {
    id: 1,
    title: "Artisan Workshops",
    description: "Pass on creative traditions",
    image: "https://images.unsplash.com/photo-1488921618671-463b781ac428?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Community Ceremonies",
    description: "Celebrate rituals that connect people",
    image: "https://images.unsplash.com/photo-1566159199022-cb2a0fb958e5?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Local Traditions",
    description: "Turn everyday knowledge into powerful journeys",
    image: "https://images.unsplash.com/photo-1528702748617-c64d49f918af?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Food Experiences",
    description: "Share culinary practices and stories",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Craft Sessions",
    description: "Teach traditional skills with modern relevance",
    image: "https://images.unsplash.com/photo-1543874869-82e11eb66a7c?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Rural Journeys",
    description: "Connect travelers to countryside ways of life",
    image: "https://images.unsplash.com/photo-1581878070537-c36ddf7e7a53?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "Cultural Stories",
    description: "Share oral traditions with new audiences",
    image: "https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?q=80&w=2000&auto=format&fit=crop"
  }
];

const HostShowcaseCarousel = () => {
  const [animateItems, setAnimateItems] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const carouselRef = useRef(null);
  const scrollInterval = useRef<number | null>(null);
  
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  useEffect(() => {
    if (inView) {
      setAnimateItems(true);
    }
  }, [inView]);
  
  // Auto-scroll functionality with hover pause
  useEffect(() => {
    const scrollCarousel = () => {
      if (carouselRef.current) {
        const carousel = carouselRef.current as any;
        if (carousel.api && !isHovering) {
          carousel.api.scrollNext();
        }
      }
    };

    if (!isHovering) {
      scrollInterval.current = window.setInterval(scrollCarousel, 4000) as unknown as number;
    }

    return () => {
      if (scrollInterval.current !== null) {
        clearInterval(scrollInterval.current);
      }
    };
  }, [isHovering]);

  return (
    <section 
      ref={sectionRef} 
      className="py-20 bg-white"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-semibold text-[#111111] mb-6 transition-all duration-700 ${
            animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Experience Hosts Growing With Culturin
          </h2>
          <p className={`text-base text-[#4A4A4A] transition-all duration-700 ${
            animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
            style={{transitionDelay: '100ms'}}
          >
            Join our community of cultural storytellers and grow your audience of authentic travelers.
          </p>
        </div>
        
        <div className={`transition-all duration-700 ${
          animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
          style={{transitionDelay: '200ms'}}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
              containScroll: "trimSnaps",
              startIndex: 0
            }}
            className="w-full"
            ref={carouselRef}
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {carouselItems.map((item, index) => (
                <CarouselItem 
                  key={item.id} 
                  className={`pl-4 md:pl-6 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 transition-opacity duration-500`}
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                    opacity: animateItems ? 1 : 0,
                    transform: animateItems ? 'translateY(0)' : 'translateY(20px)'
                  }}
                >
                  <div className="relative overflow-hidden rounded-[24px] h-[350px] group transition-all duration-300 hover:scale-[1.03] shadow-md hover:shadow-lg">
                    <div className="absolute inset-0 overflow-hidden">
                      <Image 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                        fill={true}
                      />
                      {/* Enhanced gradient overlay for better text contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/70 transition-all duration-500"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 p-6 text-white transition-all duration-500 group-hover:translate-y-[-4px]">
                      <h3 className="font-bold text-lg text-white">{item.title}</h3>
                      <p className="text-sm text-white">{item.description}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="relative static -left-0 rounded-full bg-black/30 hover:bg-black/60 border-0 h-10 w-10 transition-all duration-300">
                <ChevronLeft className="h-6 w-6 text-white" />
              </CarouselPrevious>
              <CarouselNext className="relative static -right-0 rounded-full bg-black/30 hover:bg-black/60 border-0 h-10 w-10 transition-all duration-300">
                <ChevronRight className="h-6 w-6 text-white" />
              </CarouselNext>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default HostShowcaseCarousel;

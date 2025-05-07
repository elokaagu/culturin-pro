
import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "@/components/ui/image";

// Sample data for the carousel items
const carouselItems = [
  {
    id: 1,
    title: "Artisan Workshops",
    description: "Pass on creative traditions",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Community Ceremonies",
    description: "Celebrate rituals that connect people",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Local Traditions",
    description: "Turn everyday knowledge into powerful journeys",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Food Experiences",
    description: "Share culinary practices and stories",
    image: "https://images.unsplash.com/photo-1605538058334-52290f6d4b3f?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Craft Sessions",
    description: "Teach traditional skills with modern relevance",
    image: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Rural Journeys",
    description: "Connect travelers to countryside ways of life",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "Cultural Stories",
    description: "Share oral traditions with new audiences",
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?q=80&w=2000&auto=format&fit=crop"
  }
];

const HostShowcaseCarousel = () => {
  const [animateItems, setAnimateItems] = useState(false);
  
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  useEffect(() => {
    if (inView) {
      setAnimateItems(true);
    }
  }, [inView]);
  
  return (
    <section ref={sectionRef} className="py-20 bg-white">
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
              align: "center",
              loop: true,
              skipSnaps: false,
              containScroll: "trimSnaps"
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {carouselItems.map((item, index) => (
                <CarouselItem 
                  key={item.id} 
                  className={`pl-4 md:pl-6 basis-full sm:basis-1/1 md:basis-1/2 lg:basis-1/3 transition-opacity duration-500`}
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
                      />
                      {/* Stronger gradient overlay for better text contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent/20 group-hover:from-black/70 transition-all duration-500"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 p-6 text-white transition-all duration-500 group-hover:translate-y-[-4px]">
                      <h3 className="font-bold text-lg text-white group-hover:text-shadow">{item.title}</h3>
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


import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative h-screen-90 min-h-[650px]">
      <div className="absolute inset-0 bg-black">
        <img 
          src="https://images.unsplash.com/photo-1504150558240-0b4fd8946624?q=80&w=2070" 
          alt="Solo traveler walking through a colorful open-air market" 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20" />
      </div>
      
      <div className="relative container mx-auto h-full flex flex-col items-center justify-center pb-16 px-6">
        <div className="animate-fade-in text-center max-w-[720px]" style={{animationDelay: '0.2s'}}>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-[#F3F3F3] mb-8 tracking-tight leading-tight drop-shadow-sm">
            Travel With Culture, <br /><span className="text-[#F3F3F3]">Not Just Itineraries.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#E0E0E0] mb-12 leading-relaxed font-light max-w-2xl mx-auto drop-shadow-sm">
            Join meaningful group trips or publish your own cultural experience — with trust, flexibility, and human connection.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button 
              className="bg-[#2B2B2B] text-white hover:bg-[#1E1E1E] text-lg py-7 px-8 rounded-xl border-none"
            >
              Explore Group Trips
            </Button>
            <Button 
              variant="outline" 
              className="bg-[#EDEDED] text-[#2B2B2B] hover:bg-[#D4D4D4] border-none text-lg py-7 px-8 rounded-xl"
            >
              Create an Experience
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

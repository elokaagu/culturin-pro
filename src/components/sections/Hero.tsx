
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative h-[90vh] min-h-[650px]">
      <div className="absolute inset-0 bg-black">
        <img 
          src="https://images.unsplash.com/photo-1504150558240-0b4fd8946624?q=80&w=2070" 
          alt="Solo traveler walking through a colorful open-air market" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
      </div>
      
      <div className="relative container-custom h-full flex flex-col justify-center pb-16 max-w-4xl">
        <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
          <h1 className="heading-xl text-white mb-6">
            Travel With Culture, <br /><span className="text-culturin-mustard">Not Just Itineraries.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-2xl">
            Join meaningful group trips or publish your own cultural experience — with trust, flexibility, and human connection.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="btn-primary text-base py-6 px-8">
              Explore Group Trips
            </Button>
            <Button variant="outline" className="btn-outline text-base py-6 px-8">
              Create an Experience
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";
import { UserPlus } from "lucide-react";

const JoinCommunity = () => {
  const [userType, setUserType] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter submission
    console.log({ name, email, userType });
    setName("");
    setEmail("");
    setUserType("");
  };
  
  // Set animation when section comes into view
  if (inView && !animateItems) {
    setAnimateItems(true);
  }
  
  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 bg-[#F5F4F2] overflow-hidden"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            className={`transition-all duration-700 ${
              animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{transitionDelay: '0.2s'}}
          >
            <div className="max-w-xl mx-auto lg:mx-0">
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-tight text-culturin-charcoal">
                This is just the beginning.
                <br />
                Join the journey.
              </h2>
              <p className="text-lg md:text-xl mb-8 leading-relaxed text-[#4A4A4A]">
                Get early access to cultural experiences, stories, and discoveries.
              </p>
              
              <Card className="border border-[#DADADA] shadow-[0_4px_16px_rgba(0,0,0,0.03)] bg-white">
                <CardContent className="p-6 md:p-8">
                  <form onSubmit={handleNewsletterSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#2B2B2B] font-medium">
                        First Name
                      </Label>
                      <Input 
                        id="name"
                        placeholder="Your first name" 
                        className="bg-white border-[#DADADA] text-[#2B2B2B] placeholder:text-[#888888] rounded-xl h-14 px-5"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#2B2B2B] font-medium">
                        Email Address
                      </Label>
                      <Input 
                        id="email"
                        placeholder="Your email" 
                        type="email"
                        className="bg-white border-[#DADADA] text-[#2B2B2B] placeholder:text-[#888888] rounded-xl h-14 px-5"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="userType" className="text-[#2B2B2B] font-medium">
                        I am a...
                      </Label>
                      <Select value={userType} onValueChange={setUserType}>
                        <SelectTrigger id="userType" className="bg-white border-[#DADADA] text-[#2B2B2B] h-14 rounded-xl px-5">
                          <SelectValue placeholder="Select an option" className="placeholder:text-[#888888]" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-[#DADADA]">
                          <SelectItem value="traveler" className="text-[#2B2B2B]">Traveler</SelectItem>
                          <SelectItem value="host" className="text-[#2B2B2B]">Cultural Host</SelectItem>
                          <SelectItem value="explorer" className="text-[#2B2B2B]">Curious Explorer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-[#2B2B2B] text-white hover:bg-[#1A1A1A] hover:scale-[1.02] transition-all duration-300 py-6 font-bold rounded-xl text-base"
                    >
                      Join Now
                    </Button>
                    
                    <p className="text-xs text-center text-[#888888]">
                      1,200+ cultural explorers and hosts have already joined.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div 
            className={`relative transition-all duration-700 hidden lg:block ${
              animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{transitionDelay: '0.4s'}}
          >
            <div className="flex justify-center items-center h-full">
              <div className="relative">
                <div className="rounded-full bg-white p-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                  <UserPlus size={120} className="text-[#2B2B2B]" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-full px-6 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                  <p className="text-sm font-medium text-[#2B2B2B]">Join the community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;

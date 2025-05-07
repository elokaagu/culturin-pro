
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const JoinCommunity = () => {
  const [userType, setUserType] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter submission
    console.log({ name, email, userType });
    setName("");
    setEmail("");
    setUserType("");
  };
  
  return (
    <section className="py-20 bg-culturin-indigo text-white">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="heading-lg mb-6 text-white animate-fade-in" style={{animationDelay: '0.2s'}}>
            This is just the beginning. Join us.
          </h2>
          <form onSubmit={handleNewsletterSubmit} className="space-y-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input 
                  placeholder="First Name" 
                  className="bg-white/20 border-white/20 text-white placeholder:text-white/60"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Input 
                  placeholder="Email" 
                  type="email"
                  className="bg-white/20 border-white/20 text-white placeholder:text-white/60"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Select value={userType} onValueChange={setUserType}>
                <SelectTrigger className="bg-white/20 border-white/20 text-white">
                  <SelectValue placeholder="I am a..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="traveler">Solo Traveler</SelectItem>
                  <SelectItem value="operator">Operator</SelectItem>
                  <SelectItem value="partner">Partner</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button type="submit" className="w-full bg-white text-culturin-indigo hover:bg-white/90 py-6 font-medium">
                Join Now
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;

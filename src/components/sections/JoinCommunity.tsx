
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

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
    <section className="py-24 lg:py-30 bg-culturin-indigo text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-lg mb-10 text-white animate-fade-in" style={{animationDelay: '0.2s'}}>
            This is just the beginning. Join us.
          </h2>
          
          <Card className="border-0 shadow-none bg-transparent animate-fade-in" style={{animationDelay: '0.4s'}}>
            <CardContent className="p-0">
              <form onSubmit={handleNewsletterSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input 
                      placeholder="First Name" 
                      className="bg-white/20 border-white/20 text-white placeholder:text-white/60 rounded-xl h-14"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Input 
                      placeholder="Email" 
                      type="email"
                      className="bg-white/20 border-white/20 text-white placeholder:text-white/60 rounded-xl h-14"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Select value={userType} onValueChange={setUserType}>
                    <SelectTrigger className="bg-white/20 border-white/20 text-white h-14 rounded-xl">
                      <SelectValue placeholder="I am a..." />
                    </SelectTrigger>
                    <SelectContent className="bg-culturin-indigo border-white/20">
                      <SelectItem value="traveler" className="text-white">Solo Traveler</SelectItem>
                      <SelectItem value="operator" className="text-white">Operator</SelectItem>
                      <SelectItem value="partner" className="text-white">Partner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Button type="submit" className="w-full bg-white text-culturin-indigo hover:bg-white/90 py-7 font-medium text-lg rounded-xl">
                    Join Now
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;

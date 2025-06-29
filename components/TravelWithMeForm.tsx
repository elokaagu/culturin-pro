import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Check } from "lucide-react";
import { useNavigate } from "../lib/navigation";

const travelPurposes = [
  "Learn something new",
  "Meet like-minded people",
  "Explore culture deeply",
  "Reset and reconnect"
];

const TravelWithMeForm = () => {
  const [destination, setDestination] = useState<string>("");
  const [travelMonth, setTravelMonth] = useState<Date | undefined>(undefined);
  const [travelPurpose, setTravelPurpose] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Travel preferences submitted!",
        description: `We'll find journeys for ${destination} that match your interests.`,
      });
      setSubmitted(true);
      setIsSubmitting(false);
      
      // Navigate to discover-trips page after short delay
      setTimeout(() => {
        navigate("/discover-trips");
      }, 1500);
    }, 800);
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div 
          className="space-y-2 transition-all duration-500 ease-out"
          style={{transitionDelay: '100ms'}}
        >
          <Label htmlFor="destination">Destination(s)</Label>
          <Input 
            id="destination" 
            placeholder="Where would you like to go?" 
            value={destination} 
            onChange={(e) => setDestination(e.target.value)}
            className="border-[#DADADA] bg-white text-[#2B2B2B] placeholder:text-[#888888] px-5 py-4 h-auto focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] transition-all duration-300 ease-out"
          />
        </div>
        
        <div 
          className="space-y-2 transition-all duration-500 ease-out"
          style={{transitionDelay: '200ms'}}
        >
          <Label htmlFor="travel-month">Travel Month</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                id="travel-month"
                className={cn(
                  "w-full justify-start text-left font-normal border-[#DADADA] bg-white text-[#2B2B2B] px-5 py-4 h-auto focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] transition-all duration-300 ease-out",
                  !travelMonth && "text-[#888888]"
                )}
              >
                {travelMonth ? (
                  format(travelMonth, "MMMM yyyy")
                ) : (
                  <span>When would you like to travel?</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-70" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={travelMonth}
                onSelect={setTravelMonth}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div 
          className="space-y-2 transition-all duration-500 ease-out"
          style={{transitionDelay: '300ms'}}
        >
          <Label htmlFor="travel-purpose">I travel to...</Label>
          <Select value={travelPurpose} onValueChange={setTravelPurpose}>
            <SelectTrigger 
              id="travel-purpose" 
              className="border-[#DADADA] bg-white text-[#2B2B2B] px-5 py-4 h-auto focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B] transition-all duration-300 ease-out"
            >
              <SelectValue placeholder="Why do you travel?" />
            </SelectTrigger>
            <SelectContent>
              {travelPurposes.map(purpose => (
                <SelectItem key={purpose} value={purpose}>{purpose}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          type="submit" 
          className={`w-full text-white rounded-xl py-4 h-auto transition-all duration-500 ease-out hover:scale-[1.02] font-bold text-base active:scale-[0.98] ${
            submitted 
              ? "bg-green-600 hover:bg-green-700" 
              : "bg-[#2B2B2B] hover:bg-[#1A1A1A]"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <span className="animate-pulse">Processing...</span>
            </span>
          ) : submitted ? (
            <span className="flex items-center justify-center">
              <Check className="mr-2 h-5 w-5" /> Thanks for joining!
            </span>
          ) : (
            "Continue"
          )}
        </Button>
        
        <p className="text-sm text-center text-muted-foreground pt-2 transition-all duration-500 ease-out" style={{transitionDelay: '400ms'}}>
          You're just a few steps away from something unforgettable.
        </p>
      </form>
      
      <div className="mt-8 border-t border-[#DADADA] pt-6">
        <blockquote className="text-sm italic text-muted-foreground transition-all duration-500 ease-out" style={{transitionDelay: '500ms'}}>
          "I joined a Culturin trip to Peru and left with new friends for life."
          <footer className="mt-1 font-medium text-foreground">— Zara, 27</footer>
        </blockquote>
      </div>
    </div>
  );
};

export default TravelWithMeForm;

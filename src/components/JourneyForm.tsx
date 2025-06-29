'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";

const destinations = ["Marrakech, Morocco", "Kyoto, Japan", "Oaxaca, Mexico", "Bali, Indonesia", "Lisbon, Portugal", "Cape Town, South Africa"];
const interestOptions = ["Food & Cooking", "Art & Crafts", "Nature & Outdoors", "Photography", "Spirituality", "Music & Dance", "History & Heritage"];

const JourneyForm = () => {
  const [destination, setDestination] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [budget, setBudget] = useState<number[]>([1500]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      if (selectedInterests.length < 3) {
        setSelectedInterests([...selectedInterests, interest]);
      } else {
        toast({
          title: "Maximum 3 interests",
          description: "Please remove an interest before adding another",
          variant: "destructive"
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Journey preferences submitted!",
      description: "We'll match you with like-minded travelers soon.",
    });
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-culturin-indigo text-white rounded-t-lg">
        <CardTitle className="text-xl">Create My Journey</CardTitle>
        <CardDescription className="text-white/80">Tell us where you want to go, we'll find you companions</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="destination">Where do you want to go?</Label>
            <Select value={destination} onValueChange={setDestination}>
              <SelectTrigger id="destination">
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                {destinations.map(dest => (
                  <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                ))}
                <SelectItem value="other">Other (specify)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input id="start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Budget per person (USD)</Label>
            <div className="pt-4 px-2">
              <Slider 
                defaultValue={[1500]} 
                max={5000} 
                min={500} 
                step={100} 
                onValueChange={setBudget}
              />
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>$500</span>
              <span className="font-semibold">${budget[0]}</span>
              <span>$5000+</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Select up to 3 interests</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {interestOptions.map(interest => (
                <Button
                  key={interest}
                  type="button"
                  variant={selectedInterests.includes(interest) ? "default" : "outline"}
                  className={`text-xs py-1 h-auto ${selectedInterests.includes(interest) ? 'bg-culturin-mustard text-black' : ''}`}
                  onClick={() => handleInterestToggle(interest)}
                >
                  {interest}
                </Button>
              ))}
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-culturin-terracotta hover:bg-culturin-clay">
            Submit & Match Me With Others
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default JourneyForm;

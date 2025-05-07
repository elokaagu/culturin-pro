
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";

const TravelWithMeForm = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    destination: "",
    travelMonth: "",
    interests: [] as string[],
    budget: 1500,
    flexibleDates: false,
    name: "",
    email: "",
    aboutYou: ""
  });
  
  const interestOptions = [
    "Food", "History", "Nature", "Art", 
    "Spirituality", "Wellness", "Nightlife"
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => {
      if (prev.interests.includes(interest)) {
        return {
          ...prev,
          interests: prev.interests.filter(i => i !== interest)
        };
      } else {
        return {
          ...prev,
          interests: [...prev.interests, interest]
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "Form submitted!",
      description: "We'll match you with trips soon.",
    });
  };

  return (
    <Card className="shadow-card border-0">
      <CardHeader className="bg-culturin-indigo text-white rounded-t-xl">
        <CardTitle className="text-xl">Find Your Perfect Group Trip</CardTitle>
        <CardDescription className="text-white/80">Step {step} of 4</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-4">Where Do You Want to Go?</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="destination">Destination(s)</Label>
                  <Input
                    id="destination"
                    placeholder="e.g., Japan, Morocco, Peru"
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="travelMonth">Travel Month</Label>
                  <Input
                    id="travelMonth"
                    type="month"
                    value={formData.travelMonth}
                    onChange={(e) => setFormData({...formData, travelMonth: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-4">What's Your Vibe?</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interestOptions.map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`interest-${interest}`} 
                      checked={formData.interests.includes(interest)}
                      onCheckedChange={() => handleInterestToggle(interest)}
                      className="border-culturin-indigo"
                    />
                    <Label 
                      htmlFor={`interest-${interest}`}
                      className="text-sm cursor-pointer"
                    >
                      {interest}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium mb-4">Budget + Flexibility</h3>
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Trip Budget (USD)</Label>
                  <span className="font-medium">${formData.budget}</span>
                </div>
                <Slider 
                  value={[formData.budget]} 
                  min={500} 
                  max={3000} 
                  step={100} 
                  onValueChange={(value) => setFormData({...formData, budget: value[0]})}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>$500</span>
                  <span>$3000+</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="flexibleDates" 
                  checked={formData.flexibleDates}
                  onCheckedChange={(checked) => 
                    setFormData({...formData, flexibleDates: checked as boolean})
                  }
                  className="border-culturin-indigo"
                />
                <Label htmlFor="flexibleDates">I have flexible travel dates</Label>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-4">Tell Us About You</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="aboutYou">What makes a meaningful trip for you? (Optional)</Label>
                  <Input
                    id="aboutYou"
                    placeholder="Tell us a bit about what you're looking for"
                    value={formData.aboutYou}
                    onChange={(e) => setFormData({...formData, aboutYou: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between p-6 pt-0">
        {step > 1 && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleBack}
          >
            Back
          </Button>
        )}
        <div className={step === 1 ? 'w-full' : ''}>
          {step < 4 ? (
            <Button 
              type="button" 
              className="bg-culturin-indigo hover:bg-culturin-indigo/90 w-full"
              onClick={handleNext}
            >
              Continue
            </Button>
          ) : (
            <Button 
              type="button" 
              className="bg-culturin-clay hover:bg-culturin-clay/90 w-full"
              onClick={handleSubmit}
            >
              Match Me With Trips
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default TravelWithMeForm;

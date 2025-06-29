'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Upload } from "lucide-react";

const categories = [
  { id: "food", label: "Food & Cuisine" },
  { id: "art", label: "Art & Crafts" },
  { id: "nature", label: "Nature & Outdoors" },
  { id: "spiritual", label: "Spirituality" },
  { id: "music", label: "Music & Dance" },
  { id: "history", label: "History & Heritage" },
];

const ExperienceBuilder = () => {
  const [currentStep, setCurrentStep] = useState<string>("basic");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(
      selectedCategories.includes(categoryId)
        ? selectedCategories.filter(id => id !== categoryId)
        : [...selectedCategories, categoryId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Experience saved!",
      description: "Your cultural experience has been saved as a draft."
    });
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-culturin-indigo text-white rounded-t-lg">
        <CardTitle className="text-xl">Experience Builder</CardTitle>
        <CardDescription className="text-white/80">Create unique cultural experiences for travelers</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="basic" value={currentStep} onValueChange={setCurrentStep}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="details">Details & Pricing</TabsTrigger>
            <TabsTrigger value="media">Media & Publish</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Experience Title</Label>
                <Input 
                  id="title" 
                  placeholder="E.g., Traditional Cooking Class in Marrakech" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-sm text-gray-500">(Tell your story)</span>
                </Label>
                <Textarea 
                  id="description" 
                  placeholder="Share what makes your experience special and what travelers will learn or experience..."
                  className="min-h-[150px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Categories (Select up to 3)</Label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={category.id}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => handleCategoryChange(category.id)}
                        disabled={selectedCategories.length >= 3 && !selectedCategories.includes(category.id)}
                      />
                      <label htmlFor={category.id} className="text-sm cursor-pointer">
                        {category.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button 
                  type="button" 
                  onClick={() => setCurrentStep("details")}
                  className="bg-culturin-mustard text-culturin-indigo hover:bg-culturin-mustard/80"
                >
                  Next: Details & Pricing
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price per Person (USD)</Label>
                  <Input 
                    id="price" 
                    type="number"
                    placeholder="E.g., 65"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="group-size">Maximum Group Size</Label>
                  <Input 
                    id="group-size" 
                    type="number" 
                    placeholder="E.g., 10"
                    value={groupSize}
                    onChange={(e) => setGroupSize(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (hours)</Label>
                <Input id="duration" type="number" placeholder="E.g., 3" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="E.g., Central Marrakech, Morocco" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="included">What's Included</Label>
                <Textarea 
                  id="included" 
                  placeholder="List all materials, food, transportation, etc. that are included in the price..."
                />
              </div>
              
              <div className="flex justify-between pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setCurrentStep("basic")}
                >
                  Back
                </Button>
                <Button 
                  type="button" 
                  onClick={() => setCurrentStep("media")}
                  className="bg-culturin-mustard text-culturin-indigo hover:bg-culturin-mustard/80"
                >
                  Next: Add Media
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="media" className="space-y-4">
              <div className="space-y-2">
                <Label>Upload Photos</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center">
                    <Upload className="w-10 h-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">Drag photos here or click to upload</p>
                    <p className="text-xs text-gray-400">Recommended: 5+ high quality images showing your experience</p>
                    <Button 
                      type="button"
                      variant="outline"
                      className="mt-4"
                    >
                      Select Files
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="video-url">Video URL (Optional)</Label>
                <Input id="video-url" placeholder="YouTube or Vimeo link" />
                <p className="text-xs text-gray-500 mt-1">A short video can increase bookings by 35%</p>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setCurrentStep("details")}
                >
                  Back
                </Button>
                <div className="space-x-2">
                  <Button 
                    type="submit"
                    variant="outline"
                  >
                    Save as Draft
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-culturin-terracotta hover:bg-culturin-clay"
                  >
                    Publish Experience
                  </Button>
                </div>
              </div>
            </TabsContent>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExperienceBuilder;

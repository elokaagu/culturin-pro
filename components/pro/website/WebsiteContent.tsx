
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';
import Image from '@/components/ui/image';

const WebsiteContent: React.FC = () => {
  const [companyName, setCompanyName] = useState(() => 
    localStorage.getItem('websiteCompanyName') || 'Barcelona Cultural Tours'
  );
  const [tagline, setTagline] = useState(() => 
    localStorage.getItem('websiteTagline') || 'Authentic cultural experiences in the heart of Catalonia'
  );
  const [description, setDescription] = useState(() => 
    localStorage.getItem('websiteDescription') || 'We specialize in small group cultural tours that showcase the real Barcelona beyond the tourist spots.'
  );
  const [primaryColor, setPrimaryColor] = useState(() => 
    localStorage.getItem('websitePrimaryColor') || '#9b87f5'
  );
  const [headerImage, setHeaderImage] = useState<string | null>(
    localStorage.getItem('websiteHeaderImage')
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageDataUrl = e.target?.result as string;
      setHeaderImage(imageDataUrl);
      // Store in localStorage immediately for instant preview
      localStorage.setItem('websiteHeaderImage', imageDataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setHeaderImage(null);
    localStorage.removeItem('websiteHeaderImage');
    toast.success("Header image removed");
  };

  const handleSave = () => {
    localStorage.setItem('websiteCompanyName', companyName);
    localStorage.setItem('websiteTagline', tagline);
    localStorage.setItem('websiteDescription', description);
    localStorage.setItem('websitePrimaryColor', primaryColor);
    
    if (headerImage) {
      localStorage.setItem('websiteHeaderImage', headerImage);
    } else {
      localStorage.removeItem('websiteHeaderImage');
    }
    
    toast.success("Content changes saved", {
      description: "Your changes will be applied when you publish your website"
    });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-lg font-medium">Website Content</h2>
        <p className="text-gray-600 text-sm">Customize the content of your tour operator website</p>
      </div>
      
      <div className="space-y-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="companyName">Company Name</Label>
          <Input 
            id="companyName" 
            value={companyName} 
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Your company name"
          />
        </div>
        
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="tagline">Tagline</Label>
          <Input 
            id="tagline" 
            value={tagline} 
            onChange={(e) => setTagline(e.target.value)}
            placeholder="A short, catchy tagline"
          />
        </div>
        
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your tour company"
            rows={4}
          />
        </div>
        
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="primaryColor">Primary Brand Color</Label>
          <div className="flex items-center gap-3">
            <Input 
              id="primaryColor" 
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-16 h-10 p-1"
            />
            <Input 
              type="text" 
              value={primaryColor} 
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-32"
            />
          </div>
        </div>
        
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="headerImage">Header Background Image</Label>
          <div className="flex flex-col gap-4">
            {headerImage ? (
              <div className="relative rounded-lg overflow-hidden w-full h-40">
                <img
                  src={headerImage}
                  alt="Website header preview"
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={handleRemoveImage}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <label htmlFor="headerImage" className="cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500">
                  <Upload className="h-8 w-8 mb-2" />
                  <p className="text-sm mb-2">Drag and drop an image, or click to browse</p>
                  <p className="text-xs text-gray-400">Recommended size: 1200x400px, Max 5MB</p>
                </div>
              </label>
            )}
            <Input
              id="headerImage"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className={headerImage ? "hidden" : ""}
            />
          </div>
        </div>
        
        <Button onClick={handleSave}>Save Content</Button>
      </div>
    </div>
  );
};

export default WebsiteContent;

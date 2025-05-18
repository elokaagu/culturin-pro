
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

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

  const handleSave = () => {
    localStorage.setItem('websiteCompanyName', companyName);
    localStorage.setItem('websiteTagline', tagline);
    localStorage.setItem('websiteDescription', description);
    localStorage.setItem('websitePrimaryColor', primaryColor);
    
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
        
        <Button onClick={handleSave}>Save Content</Button>
      </div>
    </div>
  );
};

export default WebsiteContent;

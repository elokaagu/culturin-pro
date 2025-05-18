
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Code } from 'lucide-react';

const WebsiteSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    domain: 'barcelona-tours.culturin.com',
    customDomain: '',
    seo: {
      title: 'Barcelona Cultural Tours - Authentic Local Experiences',
      description: 'Discover authentic cultural experiences in Barcelona with our expert local guides. Small group tours showcasing the real Barcelona beyond the tourist spots.',
      keywords: 'barcelona tours, cultural tours barcelona, local guides barcelona, small group tours, authentic barcelona experience'
    },
    features: {
      bookingEnabled: true,
      reviewsEnabled: true,
      blogEnabled: false,
      galleryEnabled: true
    },
    analytics: {
      googleAnalyticsId: '',
      facebookPixelId: ''
    }
  });

  const handleSeoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({
      ...settings,
      seo: {
        ...settings.seo,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleAnalyticsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      analytics: {
        ...settings.analytics,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleFeatureToggle = (feature: string, enabled: boolean) => {
    setSettings({
      ...settings,
      features: {
        ...settings.features,
        [feature]: enabled
      }
    });
  };

  const handleSaveSettings = () => {
    toast.success("Website settings saved", {
      description: "Your changes have been applied."
    });
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Domain Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="subdomain">Culturin Subdomain</Label>
                      <div className="flex items-center mt-1.5">
                        <Input 
                          id="domain"
                          value={settings.domain.split('.')[0]}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^a-z0-9-]/g, '');
                            setSettings({
                              ...settings,
                              domain: `${value}.culturin.com`
                            });
                          }}
                          className="rounded-r-none"
                          maxLength={30}
                        />
                        <div className="bg-gray-100 px-3 py-2 border border-l-0 border-gray-200 rounded-r-md text-gray-500">
                          .culturin.com
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1.5">
                        Your website will be available at https://{settings.domain}
                      </p>
                    </div>
                    
                    <div className="border-t pt-4">
                      <Label htmlFor="customDomain">Custom Domain</Label>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex-grow">
                          <Input 
                            id="customDomain"
                            placeholder="example.com"
                            value={settings.customDomain}
                            onChange={(e) => {
                              setSettings({
                                ...settings,
                                customDomain: e.target.value
                              });
                            }}
                          />
                        </div>
                        <Button 
                          variant="outline"
                          disabled={!settings.customDomain}
                        >
                          Verify
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1.5 flex items-center">
                        <Globe className="h-3.5 w-3.5 mr-1 text-gray-400" />
                        Custom domains require DNS configuration
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSaveSettings}>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="seo">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Search Engine Optimization</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Website Title</Label>
                      <Input 
                        id="title"
                        name="title"
                        value={settings.seo.title}
                        onChange={handleSeoChange}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Appears in search results and browser tabs (50-60 characters recommended)
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Meta Description</Label>
                      <Input 
                        id="description"
                        name="description"
                        value={settings.seo.description}
                        onChange={handleSeoChange}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Summary that appears in search results (150-160 characters recommended)
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="keywords">Keywords</Label>
                      <Input 
                        id="keywords"
                        name="keywords"
                        value={settings.seo.keywords}
                        onChange={handleSeoChange}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Comma separated keywords related to your business
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSaveSettings}>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="features">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <h3 className="text-lg font-medium mb-4">Website Features</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="booking-enabled" className="cursor-pointer">Online Booking</Label>
                      <p className="text-sm text-gray-500">Allow visitors to book tours directly on your website</p>
                    </div>
                    <Switch 
                      id="booking-enabled"
                      checked={settings.features.bookingEnabled}
                      onCheckedChange={(checked) => handleFeatureToggle('bookingEnabled', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="reviews-enabled" className="cursor-pointer">Customer Reviews</Label>
                      <p className="text-sm text-gray-500">Display customer testimonials and ratings</p>
                    </div>
                    <Switch 
                      id="reviews-enabled"
                      checked={settings.features.reviewsEnabled}
                      onCheckedChange={(checked) => handleFeatureToggle('reviewsEnabled', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="blog-enabled" className="cursor-pointer">Travel Blog</Label>
                      <p className="text-sm text-gray-500">Publish articles about local attractions and travel tips</p>
                    </div>
                    <Switch 
                      id="blog-enabled"
                      checked={settings.features.blogEnabled}
                      onCheckedChange={(checked) => handleFeatureToggle('blogEnabled', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="gallery-enabled" className="cursor-pointer">Photo Gallery</Label>
                      <p className="text-sm text-gray-500">Showcase high-quality images from your tours</p>
                    </div>
                    <Switch 
                      id="gallery-enabled"
                      checked={settings.features.galleryEnabled}
                      onCheckedChange={(checked) => handleFeatureToggle('galleryEnabled', checked)}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSaveSettings}>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <h3 className="text-lg font-medium mb-4">Analytics & Tracking</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="googleAnalyticsId">Google Analytics Tracking ID</Label>
                    <Input 
                      id="googleAnalyticsId"
                      name="googleAnalyticsId"
                      value={settings.analytics.googleAnalyticsId}
                      onChange={handleAnalyticsChange}
                      placeholder="G-XXXXXXXXXX or UA-XXXXXXXXXX"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter your Google Analytics tracking ID to monitor website traffic
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="facebookPixelId">Facebook Pixel ID</Label>
                    <Input 
                      id="facebookPixelId"
                      name="facebookPixelId"
                      value={settings.analytics.facebookPixelId}
                      onChange={handleAnalyticsChange}
                      placeholder="XXXXXXXXXXXXXXXXXX"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Use Facebook Pixel to measure ad performance and optimize campaigns
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-gray-50 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="h-4 w-4 text-gray-600" />
                    <h4 className="font-medium">Custom Code</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Need to add other tracking scripts or custom HTML? Contact support to enable advanced customization options.
                  </p>
                  <Button variant="outline" size="sm">Contact Support</Button>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSaveSettings}>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebsiteSettings;

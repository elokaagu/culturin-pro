
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Laptop, Smartphone, Tablet, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ItineraryType } from '@/data/itineraryData';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Image from "@/components/ui/image";

interface WebsitePreviewProps {
  itineraries?: ItineraryType[];
}

const WebsitePreview: React.FC<WebsitePreviewProps> = ({ itineraries = [] }) => {
  const [viewMode, setViewMode] = useState('desktop');
  const [primaryColor, setPrimaryColor] = useState('#9b87f5');
  const [headerImage, setHeaderImage] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('Barcelona Cultural Tours');
  const [tagline, setTagline] = useState('Authentic cultural experiences');
  const [refreshKey, setRefreshKey] = useState(0);
  
  useEffect(() => {
    // Load website settings from localStorage
    const loadSettings = () => {
      setPrimaryColor(localStorage.getItem('websitePrimaryColor') || '#9b87f5');
      setHeaderImage(localStorage.getItem('websiteHeaderImage'));
      setCompanyName(localStorage.getItem('websiteCompanyName') || 'Barcelona Cultural Tours');
      setTagline(localStorage.getItem('websiteTagline') || 'Authentic cultural experiences');
    };

    loadSettings();
    
    // Set up event listener for storage changes
    const handleStorageChange = () => {
      loadSettings();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refreshKey]);

  const handleRefresh = () => {
    // Force refresh by changing key
    setPrimaryColor(localStorage.getItem('websitePrimaryColor') || '#9b87f5');
    setHeaderImage(localStorage.getItem('websiteHeaderImage'));
    setCompanyName(localStorage.getItem('websiteCompanyName') || 'Barcelona Cultural Tours');
    setTagline(localStorage.getItem('websiteTagline') || 'Authentic cultural experiences');
    setRefreshKey(prev => prev + 1);
    toast.success("Preview refreshed", {
      description: "The latest changes have been applied to the preview"
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Website Preview</h2>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          <Select defaultValue={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desktop">
                <div className="flex items-center gap-2">
                  <Laptop className="h-4 w-4" />
                  <span>Desktop</span>
                </div>
              </SelectItem>
              <SelectItem value="tablet">
                <div className="flex items-center gap-2">
                  <Tablet className="h-4 w-4" />
                  <span>Tablet</span>
                </div>
              </SelectItem>
              <SelectItem value="mobile">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  <span>Mobile</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card className="border border-gray-200 overflow-hidden bg-gray-50">
        <CardContent className="p-4 flex justify-center">
          <div 
            className={cn(
              "rounded-md shadow-lg bg-white overflow-hidden transition-all",
              viewMode === 'desktop' && "w-full",
              viewMode === 'tablet' && "w-[768px]",
              viewMode === 'mobile' && "w-[375px]"
            )}
            key={refreshKey}
          >
            <AspectRatio ratio={16/9} className="overflow-visible">
              <div className="p-0 bg-white h-full overflow-auto">
                {/* Header/Hero section preview */}
                <div 
                  className="w-full h-32 relative"
                  style={{
                    backgroundColor: headerImage ? undefined : primaryColor,
                  }}
                >
                  {headerImage && (
                    <div className="absolute inset-0">
                      <img src={headerImage} alt="Header" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    </div>
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <div className="text-white text-center">
                      <h1 className="text-xl font-bold">{companyName}</h1>
                      <p className="text-sm mt-1">{tagline}</p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="p-4">
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="h-6 w-16 rounded bg-gray-200"></div>
                    <div className="h-6 w-16 rounded bg-gray-200"></div>
                    <div className="h-6 w-16 rounded bg-gray-200"></div>
                    <div className="h-6 w-16 rounded bg-gray-200"></div>
                  </div>
                  
                  {/* Tours grid */}
                  <div className={cn(
                    "grid gap-4 mb-4",
                    viewMode === 'mobile' ? "grid-cols-1" : "grid-cols-3"
                  )}>
                    {itineraries.slice(0, 3).map((item, index) => (
                      <div key={item.id || index} className="h-32 rounded bg-gray-200 relative overflow-hidden cursor-pointer hover:opacity-90">
                        {item.image && <img src={item.image} alt={item.title} className="w-full h-full object-cover"/>}
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
                          {item.title}
                        </div>
                      </div>
                    ))}
                    {itineraries.length === 0 && (
                      <>
                        <div className="h-32 rounded bg-gray-200"></div>
                        <div className="h-32 rounded bg-gray-200"></div>
                        <div className="h-32 rounded bg-gray-200"></div>
                      </>
                    )}
                  </div>
                  
                  {/* Interactive CTAs */}
                  <div className="space-y-3">
                    <div 
                      className="h-12 w-full rounded text-center flex items-center justify-center font-medium text-white cursor-pointer hover:opacity-90"
                      style={{backgroundColor: primaryColor}}
                    >
                      Book Now
                    </div>
                    
                    <div className="border-t pt-3">
                      <h3 className="font-medium mb-2">About Us</h3>
                      <div className="h-16 bg-gray-100 rounded p-2 mb-2 text-xs overflow-hidden">
                        {localStorage.getItem('websiteDescription') || 'We specialize in small group cultural tours that showcase the real Barcelona beyond the tourist spots.'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AspectRatio>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsitePreview;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Laptop, Smartphone, Tablet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ItineraryType } from '@/data/itineraryData';

interface WebsitePreviewProps {
  itineraries?: ItineraryType[];
}

const WebsitePreview: React.FC<WebsitePreviewProps> = ({ itineraries = [] }) => {
  const [viewMode, setViewMode] = React.useState('desktop');
  const primaryColor = localStorage.getItem('websitePrimaryColor') || '#9b87f5';
  const headerImage = localStorage.getItem('websiteHeaderImage') || null;
  const companyName = localStorage.getItem('websiteCompanyName') || 'Barcelona Cultural Tours';
  const tagline = localStorage.getItem('websiteTagline') || 'Authentic cultural experiences';
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Website Preview</h2>
        
        <div className="flex items-center gap-2">
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
          >
            <AspectRatio ratio={16/9}>
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
                  <div className="flex gap-4 mb-4">
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
                      <div key={item.id || index} className="h-32 rounded bg-gray-200 relative overflow-hidden">
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
                  
                  {/* Call to action */}
                  <div 
                    className="h-12 w-full rounded text-center flex items-center justify-center font-medium text-white"
                    style={{backgroundColor: primaryColor}}
                  >
                    Book Now
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


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Laptop, Smartphone, Tablet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const WebsitePreview: React.FC = () => {
  const [viewMode, setViewMode] = React.useState('desktop');
  
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
              <div className="p-4 bg-white h-full">
                <div className="bg-gray-100 w-full p-4 mb-4 rounded">
                  <div className="h-8 w-40 rounded bg-gray-200"></div>
                </div>
                <div className="flex gap-4 mb-4">
                  <div className="h-6 w-16 rounded bg-gray-200"></div>
                  <div className="h-6 w-16 rounded bg-gray-200"></div>
                  <div className="h-6 w-16 rounded bg-gray-200"></div>
                  <div className="h-6 w-16 rounded bg-gray-200"></div>
                </div>
                <div className="h-64 w-full rounded bg-gray-200 mb-4"></div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="h-32 rounded bg-gray-200"></div>
                  <div className="h-32 rounded bg-gray-200"></div>
                  <div className="h-32 rounded bg-gray-200"></div>
                </div>
                <div className="h-24 w-full rounded bg-gray-200"></div>
              </div>
            </AspectRatio>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsitePreview;

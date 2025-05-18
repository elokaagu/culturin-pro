
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WebsitePreview from './WebsitePreview';
import WebsiteThemes from './WebsiteThemes';
import WebsiteContent from './WebsiteContent';
import WebsiteSettings from './WebsiteSettings';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Globe, ExternalLink, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WebsiteBuilder: React.FC = () => {
  const [publishLoading, setPublishLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");
  const [publishedUrl, setPublishedUrl] = useState("tour/demo");
  const navigate = useNavigate();
  
  const handlePublish = () => {
    setPublishLoading(true);
    
    // Simulate publishing process
    setTimeout(() => {
      setPublishLoading(false);
      setPublishedUrl(`tour/demo?v=${Date.now()}`);
      toast.success("Website published successfully!", {
        description: "Your changes are now live."
      });
    }, 1500);
  };

  const handlePreviewSite = () => {
    window.open(`/${publishedUrl}`, '_blank');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-medium">Your Website</h2>
          <p className="text-sm text-gray-500">
            Customize your tour operator website and publish it for your customers.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handlePreviewSite}
            className="flex items-center"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Preview Live Site
          </Button>
          <Button 
            onClick={handlePublish} 
            disabled={publishLoading}
            className="flex items-center"
          >
            {publishLoading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                Publishing...
              </>
            ) : (
              <>
                <Globe className="mr-2 h-4 w-4" />
                Publish Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {publishedUrl && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md flex items-center justify-between">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-1">
              <Check className="h-4 w-4 text-green-600" />
            </div>
            <span className="ml-2 text-sm text-green-800">
              Your site is published at:{' '}
              <a 
                href={`/${publishedUrl}`}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline"
              >
                {window.location.origin}/{publishedUrl}
              </a>
            </span>
          </div>
        </div>
      )}
      
      <Tabs defaultValue="preview" onValueChange={(value) => setActiveTab(value)}>
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="themes">Themes</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview">
          <WebsitePreview />
        </TabsContent>
        
        <TabsContent value="themes">
          <WebsiteThemes />
        </TabsContent>
        
        <TabsContent value="content">
          <WebsiteContent />
        </TabsContent>
        
        <TabsContent value="settings">
          <WebsiteSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebsiteBuilder;

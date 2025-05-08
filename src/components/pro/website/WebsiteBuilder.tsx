
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WebsitePreview from './WebsitePreview';
import WebsiteThemes from './WebsiteThemes';
import WebsiteContent from './WebsiteContent';
import WebsiteSettings from './WebsiteSettings';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Globe } from 'lucide-react';

const WebsiteBuilder: React.FC = () => {
  const [publishLoading, setPublishLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");
  
  const handlePublish = () => {
    setPublishLoading(true);
    
    // Simulate publishing process
    setTimeout(() => {
      setPublishLoading(false);
      toast.success("Website published successfully!", {
        description: "Your changes are now live."
      });
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="preview" onValueChange={(value) => setActiveTab(value)}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="themes">Themes</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <Button 
            onClick={handlePublish} 
            disabled={publishLoading}
            className="flex items-center"
          >
            <Globe className="mr-2 h-4 w-4" />
            {publishLoading ? "Publishing..." : "Publish Website"}
          </Button>
        </div>
        
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

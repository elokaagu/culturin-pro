
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Globe, Copy, ArrowUpRight, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import { toast } from 'sonner';

const WebsiteSettings: React.FC = () => {
  const [copied, setCopied] = React.useState(false);
  const [customDomainEnabled, setCustomDomainEnabled] = React.useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText('cultural-explorations.culturin.web');
    setCopied(true);
    toast.success("URL copied to clipboard");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-5">
          <h3 className="text-lg font-medium mb-4">Website URL</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Current URL</label>
              <div className="flex">
                <div className="flex-1 flex items-center border rounded-l-md bg-gray-50 px-3 py-2">
                  <Globe className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-gray-600">cultural-explorations.culturin.web</span>
                </div>
                <Button 
                  variant="outline" 
                  className="rounded-l-none"
                  onClick={copyToClipboard}
                >
                  {copied ? <CheckCircle className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>
            
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <label htmlFor="custom-domain" className="text-sm font-medium mr-2">
                    Use custom domain
                  </label>
                  <Badge variant="secondary" className="bg-[#FFEDD1] text-[#996B00]">
                    Add-on
                  </Badge>
                </div>
                <Switch 
                  id="custom-domain" 
                  disabled={!customDomainEnabled}
                  onCheckedChange={() => toast.info("Feature requires upgrade")}
                />
              </div>
              
              <div className="flex">
                <Input 
                  placeholder="yourdomain.com" 
                  disabled={!customDomainEnabled}
                  className="rounded-r-none" 
                />
                <Button 
                  variant="outline" 
                  className="rounded-l-none"
                  disabled={!customDomainEnabled}
                >
                  Connect
                </Button>
              </div>
              
              {!customDomainEnabled && (
                <Alert className="mt-3 bg-gray-50 border-gray-200">
                  <Lock className="h-4 w-4 text-gray-500" />
                  <AlertDescription className="text-gray-600">
                    Custom domains require a Pro Plus plan.
                    <Button variant="link" className="h-auto p-0 ml-1">
                      Upgrade now
                    </Button>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-5">
          <h3 className="text-lg font-medium mb-4">SEO Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Page Title</label>
              <Input defaultValue="Cultural Explorations - Authentic Cultural Experiences" />
              <p className="text-xs text-gray-500 mt-1">This appears in browser tabs and search results</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Meta Description</label>
              <Input defaultValue="Discover authentic cultural experiences led by local experts. Book unique activities that connect you with local traditions and customs." />
              <p className="text-xs text-gray-500 mt-1">Brief summary that appears in search results (max 155 characters)</p>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <label className="text-sm font-medium">Include in search engines</label>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-5">
          <h3 className="text-lg font-medium mb-4">Social Media</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Social Media Image</label>
              <div className="h-32 border border-dashed rounded-md bg-gray-50 flex items-center justify-center">
                <Button variant="ghost">
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">This image will be used when sharing your website on social media (recommended: 1200×630px)</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </div>
  );
};

export default WebsiteSettings;

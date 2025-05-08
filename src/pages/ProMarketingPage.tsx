
import React, { useState } from 'react';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Link as LinkIcon, 
  Mail, 
  Instagram, 
  Facebook, 
  Upload, 
  Download, 
  TrendingUp,
  QrCode
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ProMarketingPage: React.FC = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("email");
  const [socialLinks, setSocialLinks] = useState({
    website: "https://yourexperience.com",
    instagram: "culturalhost",
    facebook: "cultural.experience"
  });
  
  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copied to clipboard",
      description: "You can now paste this link anywhere.",
      duration: 3000,
    });
  };
  
  const handleLinkGeneration = () => {
    toast({
      title: "Custom link generated",
      description: "Your special offer link is ready to share.",
      duration: 3000,
    });
  };
  
  const handleDownloadQR = () => {
    toast({
      title: "QR code downloaded",
      description: "You can now print and share your QR code.",
      duration: 3000,
    });
  };
  
  const handleEmailCampaignSave = () => {
    toast({
      title: "Email campaign saved",
      description: "Your draft has been saved successfully.",
      duration: 3000,
    });
  };
  
  const handleSocialPostSchedule = () => {
    toast({
      title: "Post scheduled",
      description: "Your social media post will be published at the scheduled time.",
      duration: 3000,
    });
  };

  return (
    <ProDashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Marketing Tools</h1>
          <p className="mt-1 text-gray-600">
            Promote your experiences and attract more guests
          </p>
        </div>
        
        {/* Marketing Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Link Clicks</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">487</p>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">+12.4%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Social Shares</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">156</p>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">+23.7%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Email Opens</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">67.2%</p>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">+5.1%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Marketing Tools Tabs */}
        <Tabs defaultValue="email" className="w-full" onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="email">Email Campaigns</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="links">Tracking Links</TabsTrigger>
            <TabsTrigger value="qr">QR Codes</TabsTrigger>
          </TabsList>
          
          {/* Email Campaigns Tab */}
          <TabsContent value="email" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Campaign Builder</CardTitle>
                <CardDescription>
                  Create and send targeted emails to your guests
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input id="campaign-name" placeholder="Summer Special Offer" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email-subject">Email Subject</Label>
                  <Input id="email-subject" placeholder="Discover our new summer experiences!" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email-content">Email Content</Label>
                  <Textarea 
                    id="email-content" 
                    placeholder="Write your email content here..." 
                    className="min-h-[200px]"
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Label>Select Audience</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button variant="outline" size="sm">All Guests</Button>
                    <Button variant="outline" size="sm">Past Guests</Button>
                    <Button variant="outline" size="sm">Newsletter Subscribers</Button>
                    <Button variant="outline" size="sm">Custom Group</Button>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={handleEmailCampaignSave}>Save Draft</Button>
                  <Button>Schedule Send</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Campaigns</CardTitle>
                <CardDescription>
                  View performance of your recent email campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <div>
                      <h4 className="font-medium">Spring Newsletter</h4>
                      <p className="text-sm text-gray-500">Sent: April 15, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">Opens: <span className="font-medium">72%</span></p>
                      <p className="text-sm">Clicks: <span className="font-medium">24%</span></p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-4 border-b">
                    <div>
                      <h4 className="font-medium">New Experience Launch</h4>
                      <p className="text-sm text-gray-500">Sent: March 22, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">Opens: <span className="font-medium">68%</span></p>
                      <p className="text-sm">Clicks: <span className="font-medium">31%</span></p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Holiday Special</h4>
                      <p className="text-sm text-gray-500">Sent: February 10, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">Opens: <span className="font-medium">75%</span></p>
                      <p className="text-sm">Clicks: <span className="font-medium">29%</span></p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Social Media Tab */}
          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Management</CardTitle>
                <CardDescription>
                  Create and schedule posts across your social platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Choose Platform</Label>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Facebook className="h-4 w-4" />
                      Facebook
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="post-content">Post Content</Label>
                  <Textarea 
                    id="post-content" 
                    placeholder="Write your post content here..." 
                    className="min-h-[150px]"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Add Media
                  </Button>
                  <p className="text-sm text-gray-500">
                    Add photos or videos to your post
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="post-date">Schedule Date</Label>
                  <Input id="post-date" type="date" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="post-time">Schedule Time</Label>
                  <Input id="post-time" type="time" />
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline">Save Draft</Button>
                  <Button onClick={handleSocialPostSchedule}>Schedule Post</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>
                  Manage your connected social media accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center gap-3">
                      <Instagram className="h-5 w-5" />
                      <div>
                        <h4 className="font-medium">Instagram</h4>
                        <p className="text-sm text-gray-500">@{socialLinks.instagram}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Reconnect</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Facebook className="h-5 w-5" />
                      <div>
                        <h4 className="font-medium">Facebook</h4>
                        <p className="text-sm text-gray-500">@{socialLinks.facebook}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Reconnect</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tracking Links Tab */}
          <TabsContent value="links" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Tracking Links</CardTitle>
                <CardDescription>
                  Create custom links to track the performance of your marketing efforts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="link-name">Link Name</Label>
                  <Input id="link-name" placeholder="Summer Promotion 2025" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="destination-url">Destination URL</Label>
                  <Input id="destination-url" placeholder="https://culturin.com/your-experience" />
                </div>
                
                <div className="space-y-2">
                  <Label>Campaign Source</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button variant="outline" size="sm">Email</Button>
                    <Button variant="outline" size="sm">Social Media</Button>
                    <Button variant="outline" size="sm">Partner</Button>
                    <Button variant="outline" size="sm">Print</Button>
                    <Button variant="outline" size="sm">Custom</Button>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button onClick={handleLinkGeneration}>Generate Link</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Your Tracking Links</CardTitle>
                <CardDescription>
                  View and manage your active tracking links
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <div className="flex-1 mr-4">
                      <h4 className="font-medium">Summer Promo</h4>
                      <p className="text-xs text-gray-500 truncate">https://clt.in/summer2025</p>
                    </div>
                    <div className="text-right mr-4">
                      <p className="text-sm">Clicks: <span className="font-medium">243</span></p>
                      <p className="text-sm">Conversions: <span className="font-medium">18</span></p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleCopyLink("https://clt.in/summer2025")}
                    >
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center pb-4 border-b">
                    <div className="flex-1 mr-4">
                      <h4 className="font-medium">Instagram Bio</h4>
                      <p className="text-xs text-gray-500 truncate">https://clt.in/insta-bio</p>
                    </div>
                    <div className="text-right mr-4">
                      <p className="text-sm">Clicks: <span className="font-medium">189</span></p>
                      <p className="text-sm">Conversions: <span className="font-medium">14</span></p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleCopyLink("https://clt.in/insta-bio")}
                    >
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex-1 mr-4">
                      <h4 className="font-medium">Newsletter</h4>
                      <p className="text-xs text-gray-500 truncate">https://clt.in/news-may</p>
                    </div>
                    <div className="text-right mr-4">
                      <p className="text-sm">Clicks: <span className="font-medium">112</span></p>
                      <p className="text-sm">Conversions: <span className="font-medium">9</span></p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleCopyLink("https://clt.in/news-may")}
                    >
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* QR Codes Tab */}
          <TabsContent value="qr" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>QR Code Generator</CardTitle>
                <CardDescription>
                  Create custom QR codes for your experiences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="qr-name">QR Code Name</Label>
                  <Input id="qr-name" placeholder="Brochure QR" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="qr-destination">Destination URL</Label>
                  <Input id="qr-destination" placeholder="https://culturin.com/your-experience" />
                </div>
                
                <div className="space-y-2">
                  <Label>QR Code Style</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <Button variant="outline" className="h-20">Basic</Button>
                    <Button variant="outline" className="h-20">Rounded</Button>
                    <Button variant="outline" className="h-20">Branded</Button>
                  </div>
                </div>
                
                <div className="flex justify-center py-6">
                  <div className="border p-4 rounded-md">
                    <QrCode className="h-32 w-32 mx-auto" />
                    <p className="text-center text-sm mt-2">Preview</p>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" className="flex items-center gap-2" onClick={handleDownloadQR}>
                    <Download className="h-4 w-4" />
                    Download QR
                  </Button>
                  <Button>Generate New</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Your QR Codes</CardTitle>
                <CardDescription>
                  View and manage your created QR codes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 text-center">
                    <QrCode className="h-24 w-24 mx-auto mb-2" />
                    <h4 className="font-medium">Print Brochure</h4>
                    <p className="text-xs text-gray-500 mb-2">Created: May 1, 2025</p>
                    <p className="text-sm">Scans: <span className="font-medium">86</span></p>
                    <Button variant="ghost" size="sm" className="mt-2">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 text-center">
                    <QrCode className="h-24 w-24 mx-auto mb-2" />
                    <h4 className="font-medium">Business Card</h4>
                    <p className="text-xs text-gray-500 mb-2">Created: April 15, 2025</p>
                    <p className="text-sm">Scans: <span className="font-medium">42</span></p>
                    <Button variant="ghost" size="sm" className="mt-2">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 text-center">
                    <QrCode className="h-24 w-24 mx-auto mb-2" />
                    <h4 className="font-medium">Event Flyer</h4>
                    <p className="text-xs text-gray-500 mb-2">Created: March 22, 2025</p>
                    <p className="text-sm">Scans: <span className="font-medium">104</span></p>
                    <Button variant="ghost" size="sm" className="mt-2">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProDashboardLayout>
  );
};

export default ProMarketingPage;

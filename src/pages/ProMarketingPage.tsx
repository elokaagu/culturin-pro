'use client'

import React, { useState } from 'react';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { 
  FileText, 
  Instagram, 
  Search, 
  Image, 
  Calendar, 
  LayoutGrid, 
  PencilIcon, 
  Megaphone,
  Globe,
  Mail,
  MessageSquare
} from 'lucide-react';
import MoreTrafficSection from '@/components/sections/MoreTrafficSection';

const ProMarketingPage = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [contentType, setContentType] = useState('description');
  const [toneValue, setToneValue] = useState<number>(50);
  const { toast } = useToast();

  const handleGenerateContent = (type: string) => {
    toast({
      title: "Generating content",
      description: `Your ${type} content is being generated. This may take a moment.`
    });
    
    // In a real implementation, this would call an AI service
    setTimeout(() => {
      toast({
        title: "Content generated",
        description: "Your marketing content has been successfully created."
      });
    }, 2000);
  };

  const handleSaveTemplate = () => {
    toast({
      title: "Template saved",
      description: "Your marketing template has been saved successfully."
    });
  };

  const handleSchedulePost = () => {
    toast({
      title: "Post scheduled",
      description: "Your social media post has been scheduled for publishing."
    });
  };

  return (
    <ProDashboardLayout
      title="Marketing Tools"
      subtitle="Create and manage your marketing content"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 md:grid-cols-4 w-full max-w-3xl">
          <TabsTrigger value="content" className="flex items-center gap-1">
            <FileText className="h-4 w-4" /> Content Creator
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-1">
            <Instagram className="h-4 w-4" /> Social Media
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-1">
            <Search className="h-4 w-4" /> SEO Tools
          </TabsTrigger>
          <TabsTrigger value="assets" className="flex items-center gap-1">
            <Image className="h-4 w-4" /> Marketing Assets
          </TabsTrigger>
        </TabsList>
        
        {/* Content Creator Tab */}
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Content Creator</CardTitle>
              <CardDescription>
                Create compelling descriptions, blog posts, and marketing copy for your cultural experiences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue={contentType} onValueChange={setContentType} className="w-full">
                <TabsList className="grid grid-cols-3 gap-2 mb-6">
                  <TabsTrigger value="description" className="flex items-center gap-1">
                    <FileText className="h-4 w-4" /> Description
                  </TabsTrigger>
                  <TabsTrigger value="blog" className="flex items-center gap-1">
                    <PencilIcon className="h-4 w-4" /> Blog Post
                  </TabsTrigger>
                  <TabsTrigger value="email" className="flex items-center gap-1">
                    <Mail className="h-4 w-4" /> Email
                  </TabsTrigger>
                </TabsList>
                
                {contentType === 'description' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Experience Title</label>
                      <Input placeholder="Traditional Cooking Class in Barcelona" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Key Cultural Elements</label>
                      <Textarea placeholder="Traditional recipes, local ingredients, family cooking traditions..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <Input placeholder="Barcelona, Spain" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Duration</label>
                        <Input placeholder="3 hours" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Writing Style</label>
                      <Select defaultValue="engaging">
                        <SelectTrigger>
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="informative">Informative & Educational</SelectItem>
                          <SelectItem value="engaging">Engaging & Exciting</SelectItem>
                          <SelectItem value="authentic">Authentic & Personal</SelectItem>
                          <SelectItem value="luxurious">Luxurious & Exclusive</SelectItem>
                          <SelectItem value="adventurous">Adventurous & Daring</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                
                {contentType === 'blog' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Blog Title</label>
                      <Input placeholder="Top 5 Hidden Cultural Gems in Kyoto" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Key Points to Cover</label>
                      <Textarea placeholder="Traditional tea houses, less-visited temples, local markets..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Target Audience</label>
                        <Select defaultValue="travelers">
                          <SelectTrigger>
                            <SelectValue placeholder="Select audience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="travelers">Cultural Travelers</SelectItem>
                            <SelectItem value="foodies">Food Enthusiasts</SelectItem>
                            <SelectItem value="history">History Buffs</SelectItem>
                            <SelectItem value="adventure">Adventure Seekers</SelectItem>
                            <SelectItem value="luxury">Luxury Travelers</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Blog Length</label>
                        <Select defaultValue="medium">
                          <SelectTrigger>
                            <SelectValue placeholder="Select length" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="short">Short (500 words)</SelectItem>
                            <SelectItem value="medium">Medium (1000 words)</SelectItem>
                            <SelectItem value="long">Long (1500+ words)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
                
                {contentType === 'email' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Campaign Type</label>
                      <Select defaultValue="promo">
                        <SelectTrigger>
                          <SelectValue placeholder="Select campaign type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="welcome">Welcome Email</SelectItem>
                          <SelectItem value="promo">Promotional Offer</SelectItem>
                          <SelectItem value="newsletter">Newsletter</SelectItem>
                          <SelectItem value="follow-up">Follow-up Email</SelectItem>
                          <SelectItem value="event">Event Announcement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Experience to Promote</label>
                      <Input placeholder="Cultural Walking Tour" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Key Selling Points</label>
                      <Textarea placeholder="Exclusive access, limited spots, special price..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Call to Action</label>
                      <Input placeholder="Book Now and Save 15%" />
                    </div>
                  </div>
                )}
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save as Template</Button>
              <Button onClick={() => handleGenerateContent(contentType)}>Generate Content</Button>
            </CardFooter>
          </Card>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-medium text-lg mb-3">Sample Generated Content</h3>
            <p className="text-gray-700 mb-4">
              <em>
                "Immerse yourself in Barcelona's rich culinary heritage with our intimate Traditional Cooking Class. Over three engaging hours, you'll work alongside local chefs who share family recipes passed down through generations. Discover the stories behind each dish as you prepare authentic Catalan cuisine using market-fresh ingredients. This hands-on experience goes beyond cooking—it's a cultural journey through taste, tradition, and community that will transform how you understand Spanish gastronomy. Perfect for food enthusiasts seeking authentic connections with Barcelona's culinary soul."
              </em>
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleSaveTemplate}>
                Save to Templates
              </Button>
              <Button size="sm" onClick={() => {
                toast({
                  title: "Content copied",
                  description: "The content has been copied to your clipboard."
                });
              }}>
                Copy to Clipboard
              </Button>
            </div>
          </div>
        </TabsContent>
        
        {/* Social Media Tab */}
        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Manager</CardTitle>
              <CardDescription>
                Plan, create and schedule social media content for your experiences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="create" className="w-full">
                <TabsList className="grid grid-cols-3 gap-2 mb-6">
                  <TabsTrigger value="create">Create</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                
                <TabsContent value="create" className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Platform</label>
                    <Select defaultValue="instagram">
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="twitter">Twitter/X</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Content Type</label>
                    <Select defaultValue="post">
                      <SelectTrigger>
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="post">Post</SelectItem>
                        <SelectItem value="story">Story</SelectItem>
                        <SelectItem value="reel">Reel</SelectItem>
                        <SelectItem value="carousel">Carousel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Caption</label>
                    <Textarea placeholder="Write your caption here or use our AI-powered caption generator..." />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tone Adjustment</label>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">Informative</span>
                      <Slider
                        defaultValue={[50]}
                        max={100}
                        step={1}
                        className="flex-1"
                        onValueChange={(value) => setToneValue(value[0])}
                      />
                      <span className="text-sm text-gray-500">Exciting</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Media Upload</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                      <Image className="mx-auto h-8 w-8 text-gray-400" />
                      <div className="mt-1 text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => handleGenerateContent('caption')}>
                      Generate Caption
                    </Button>
                    <Button onClick={handleSchedulePost}>Schedule Post</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="schedule" className="space-y-4">
                  <div className="bg-white border rounded-lg p-4">
                    <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium mb-2">
                      <div>Sun</div>
                      <div>Mon</div>
                      <div>Tue</div>
                      <div>Wed</div>
                      <div>Thu</div>
                      <div>Fri</div>
                      <div>Sat</div>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array(35).fill(0).map((_, i) => (
                        <div 
                          key={i} 
                          className={`aspect-square border rounded-md p-1 text-xs
                            ${i % 8 === 0 ? 'bg-blue-100 relative' : ''}
                            ${i % 11 === 0 ? 'bg-green-100 relative' : ''}
                            ${i % 17 === 0 ? 'bg-purple-100 relative' : ''}
                          `}
                        >
                          {28 + i <= 31 ? 28 + i : i - 3}
                          {i % 8 === 0 && <span className="absolute bottom-1 right-1 w-1 h-1 bg-blue-500 rounded-full"></span>}
                          {i % 11 === 0 && <span className="absolute bottom-1 right-1 w-1 h-1 bg-green-500 rounded-full"></span>}
                          {i % 17 === 0 && <span className="absolute bottom-1 right-1 w-1 h-1 bg-purple-500 rounded-full"></span>}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <h4 className="font-medium mt-4">Upcoming Posts</h4>
                  <div className="space-y-2">
                    {[
                      { date: "May 21, 2025", time: "10:00 AM", platform: "Instagram", type: "Post", title: "Spring Cultural Festival" },
                      { date: "May 23, 2025", time: "3:00 PM", platform: "Facebook", type: "Event", title: "Traditional Cooking Workshop" },
                      { date: "May 28, 2025", time: "12:30 PM", platform: "Twitter", type: "Promotion", title: "Early Summer Discount" }
                    ].map((post, index) => (
                      <div key={index} className="flex justify-between items-center border rounded-md p-3">
                        <div>
                          <p className="font-medium">{post.title}</p>
                          <p className="text-sm text-gray-500">{post.date} at {post.time} • {post.platform} {post.type}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">Edit</Button>
                          <Button size="sm" variant="ghost">Delete</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="analytics" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">1,243</div>
                        <p className="text-sm text-gray-500">Total Engagements</p>
                        <div className="text-xs text-green-500 mt-1">↑ 12% from last month</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">5.2%</div>
                        <p className="text-sm text-gray-500">Engagement Rate</p>
                        <div className="text-xs text-green-500 mt-1">↑ 0.8% from last month</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">186</div>
                        <p className="text-sm text-gray-500">Profile Visits</p>
                        <div className="text-xs text-red-500 mt-1">↓ 3% from last month</div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-4">Best Performing Content</h4>
                    <div className="space-y-4">
                      {[
                        { title: "Traditional Dance Workshop", engagement: "324", platform: "Instagram", date: "Apr 15" },
                        { title: "Market Tour Photos", engagement: "286", platform: "Facebook", date: "Apr 22" },
                        { title: "Customer Testimonial", engagement: "257", platform: "Instagram", date: "May 3" }
                      ].map((post, index) => (
                        <div key={index} className="flex items-center gap-3 border-b pb-2 last:border-0">
                          <div className="bg-gray-100 w-12 h-12 rounded-md flex items-center justify-center">
                            <Image className="h-6 w-6 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{post.title}</div>
                            <div className="text-xs text-gray-500">{post.platform} • {post.date}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">{post.engagement}</div>
                            <div className="text-xs text-gray-500">Engagements</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* SEO Tools Tab */}
        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Optimization Tools</CardTitle>
              <CardDescription>
                Improve your search visibility and attract more organic traffic
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="analyzer" className="w-full">
                <TabsList className="grid grid-cols-3 gap-2 mb-6">
                  <TabsTrigger value="analyzer">SEO Analyzer</TabsTrigger>
                  <TabsTrigger value="keywords">Keyword Research</TabsTrigger>
                  <TabsTrigger value="listings">Local Listings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="analyzer" className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Experience URL or Page Content</label>
                    <Textarea placeholder="Enter your experience page URL or paste content to analyze..." />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Target Location</label>
                      <Input placeholder="Paris, Rome, Tokyo..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Experience Category</label>
                      <Select defaultValue="cultural">
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cultural">Cultural Tour</SelectItem>
                          <SelectItem value="food">Food & Drink</SelectItem>
                          <SelectItem value="workshop">Workshop & Classes</SelectItem>
                          <SelectItem value="adventure">Adventure</SelectItem>
                          <SelectItem value="history">History & Heritage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Target Keywords</label>
                    <Textarea placeholder="Enter target keywords separated by commas..." />
                  </div>
                  
                  <Button onClick={() => handleGenerateContent('seo-analysis')} className="w-full">
                    Run SEO Analysis
                  </Button>
                  
                  <div className="mt-6 bg-white border rounded-lg p-6 space-y-4">
                    <h4 className="font-medium">Sample SEO Report</h4>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold">SEO Score: 68/100</div>
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-yellow-400 rounded-full" style={{ width: "68%" }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Title Optimization</p>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div className="h-2 bg-green-500 rounded-full" style={{ width: "80%" }}></div>
                          </div>
                          <span className="text-xs">80%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Content Length</p>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div className="h-2 bg-yellow-400 rounded-full" style={{ width: "60%" }}></div>
                          </div>
                          <span className="text-xs">60%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Local SEO</p>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div className="h-2 bg-red-500 rounded-full" style={{ width: "40%" }}></div>
                          </div>
                          <span className="text-xs">40%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Mobile Optimization</p>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div className="h-2 bg-green-500 rounded-full" style={{ width: "90%" }}></div>
                          </div>
                          <span className="text-xs">90%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      <h5 className="font-medium">Recommendations</h5>
                      <ul className="list-disc pl-5 text-sm space-y-1 text-gray-600">
                        <li>Add more local landmarks and attractions to improve local SEO</li>
                        <li>Expand your content to at least 800 words for better ranking</li>
                        <li>Include "cultural tour in Paris" in your H1 tag</li>
                        <li>Add more user reviews to improve credibility signals</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="keywords" className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Experience Type</label>
                    <Input placeholder="e.g., Cooking Class, Cultural Tour, Art Workshop..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input placeholder="e.g., Paris, Tokyo, Barcelona..." />
                  </div>
                  <Button className="w-full" onClick={() => handleGenerateContent('keyword-research')}>
                    Find Keywords
                  </Button>
                  
                  <div className="mt-4 border rounded-md">
                    <div className="grid grid-cols-3 font-medium text-sm border-b">
                      <div className="p-3">Keyword</div>
                      <div className="p-3">Search Volume</div>
                      <div className="p-3">Competition</div>
                    </div>
                    {[
                      { keyword: "cooking class paris", volume: "5,400", competition: "High" },
                      { keyword: "french cooking workshop", volume: "2,800", competition: "Medium" },
                      { keyword: "learn to cook in paris", volume: "1,900", competition: "Low" },
                      { keyword: "paris culinary experience", volume: "1,600", competition: "Medium" },
                      { keyword: "french pastry class", volume: "3,200", competition: "High" }
                    ].map((item, index) => (
                      <div key={index} className="grid grid-cols-3 text-sm border-b last:border-0">
                        <div className="p-3">{item.keyword}</div>
                        <div className="p-3">{item.volume}</div>
                        <div className="p-3">
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                            ${item.competition === 'High' ? 'bg-red-100 text-red-800' : 
                              item.competition === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-green-100 text-green-800'}`}
                          >
                            {item.competition}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="listings" className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Business Name</label>
                    <Input placeholder="Your business name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Address</label>
                      <Input placeholder="Business address" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <Input placeholder="Business phone" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Website</label>
                    <Input placeholder="Business website" />
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-3">Local Business Directories</h4>
                    <div className="space-y-3">
                      {[
                        { name: "Google Business Profile", status: "Connected", icon: "Globe" },
                        { name: "TripAdvisor", status: "Connected", icon: "Globe" },
                        { name: "Yelp", status: "Not Connected", icon: "Globe" },
                        { name: "Facebook Places", status: "Connected", icon: "Globe" }
                      ].map((listing, index) => (
                        <div key={index} className="flex items-center justify-between border rounded-md p-3">
                          <div className="flex items-center gap-3">
                            <Globe className="h-5 w-5 text-gray-400" />
                            <span>{listing.name}</span>
                          </div>
                          <div className="flex items-center">
                            <span className={`inline-block w-2 h-2 rounded-full mr-2
                              ${listing.status === 'Connected' ? 'bg-green-500' : 'bg-gray-300'}`}
                            ></span>
                            <span className="text-sm">{listing.status}</span>
                            <Button variant="ghost" size="sm" className="ml-2">
                              {listing.status === 'Connected' ? 'Manage' : 'Connect'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Marketing Assets Tab */}
        <TabsContent value="assets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Materials Creator</CardTitle>
              <CardDescription>
                Design and generate professional marketing materials for your cultural experiences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="cards" className="w-full">
                <TabsList className="grid grid-cols-4 gap-2 mb-6">
                  <TabsTrigger value="cards">Info Cards</TabsTrigger>
                  <TabsTrigger value="flyers">Flyers</TabsTrigger>
                  <TabsTrigger value="social">Social Graphics</TabsTrigger>
                  <TabsTrigger value="qr">QR Codes</TabsTrigger>
                </TabsList>
                
                <TabsContent value="cards" className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Template Style</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="border rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50">
                        <LayoutGrid className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <p className="text-sm">Minimal</p>
                      </div>
                      <div className="border rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50">
                        <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <p className="text-sm">Classic</p>
                      </div>
                      <div className="border rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50">
                        <Image className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <p className="text-sm">Photo-based</p>
                      </div>
                      <div className="border rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50">
                        <LayoutGrid className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <p className="text-sm">Modern</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Experience Title</label>
                    <Input placeholder="Traditional Cooking Workshop" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <Input placeholder="Amsterdam, Netherlands" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Duration</label>
                      <Input placeholder="2 hours" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Key Details</label>
                    <Textarea placeholder="What to bring, meeting point, inclusions..." />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Price</label>
                      <Input placeholder="$49 per person" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Color Theme</label>
                      <Select defaultValue="blue">
                        <SelectTrigger>
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blue">Blue Ocean</SelectItem>
                          <SelectItem value="green">Green Nature</SelectItem>
                          <SelectItem value="purple">Purple Elegance</SelectItem>
                          <SelectItem value="orange">Warm Sunset</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Upload Logo</label>
                    <Input type="file" />
                  </div>
                  
                  <Button onClick={() => handleGenerateContent('info-card')} className="w-full">
                    Generate Info Card
                  </Button>
                  
                  <div className="mt-6 flex justify-center">
                    <div className="bg-gradient-to-b from-blue-50 to-blue-100 border rounded-lg p-6 max-w-md text-center">
                      <h4 className="text-xl font-bold text-blue-800 mb-2">Traditional Cooking Workshop</h4>
                      <p className="text-sm mb-3">Learn authentic recipes from local chefs</p>
                      <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
                        <p className="text-left text-sm">
                          <strong>Location:</strong> Amsterdam, Netherlands<br />
                          <strong>Duration:</strong> 2 hours<br />
                          <strong>Price:</strong> $49 per person<br />
                          <strong>Includes:</strong> All ingredients, recipe book, cooking tools
                        </p>
                      </div>
                      <Button size="sm" className="bg-blue-600">Book Now</Button>
                      <p className="mt-3 text-xs text-gray-600">Operated by Culturin Experiences</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="flyers" className="space-y-4">
                  <div className="flex justify-center text-gray-500">
                    <div className="text-center p-8">
                      <Image className="mx-auto h-16 w-16" />
                      <h3 className="mt-2 text-lg font-medium">Flyer Designer</h3>
                      <p className="mt-1">Create beautiful flyers for your cultural experiences</p>
                      <Button variant="outline" className="mt-3">Coming Soon</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="social" className="space-y-4">
                  <div className="flex justify-center text-gray-500">
                    <div className="text-center p-8">
                      <Instagram className="mx-auto h-16 w-16" />
                      <h3 className="mt-2 text-lg font-medium">Social Media Graphics</h3>
                      <p className="mt-1">Design eye-catching graphics for social media</p>
                      <Button variant="outline" className="mt-3">Coming Soon</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="qr" className="space-y-4">
                  <div className="flex justify-center text-gray-500">
                    <div className="text-center p-8">
                      <Search className="mx-auto h-16 w-16" />
                      <h3 className="mt-2 text-lg font-medium">QR Code Generator</h3>
                      <p className="mt-1">Create QR codes for your experiences and marketing materials</p>
                      <Button variant="outline" className="mt-3">Coming Soon</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-6">Marketing Impact</h2>
        <MoreTrafficSection />
      </div>
    </ProDashboardLayout>
  );
};

export default ProMarketingPage;

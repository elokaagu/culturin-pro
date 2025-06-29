'use client'

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Add this import
import { Link } from "../../../lib/navigation";
import { 
  Globe, 
  Megaphone, 
  Search, 
  Zap,
  FileText,
  Instagram,
  Star,
  Calendar,
  PencilIcon,
  Image,
  LayoutGrid
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import NewFooter from "@/components/sections/NewFooter";

const ProductMarketingPage = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("description");
  const [toneValue, setToneValue] = useState<number>(50);
  
  useEffect(() => {
    setAnimateItems(true);
  }, []);

  const handleGenerateContent = (type: string) => {
    console.log(`Generating content for: ${type}`);
    // In a real implementation, this would call an AI service
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Market your cultural experiences effectively
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Reach more travelers and fill your tours with our specialized marketing tools built for cultural experience creators.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-8 rounded-xl h-auto"
                    asChild
                  >
                    <Link to="/demo">Request a demo</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-white border border-gray-300 text-gray-800 text-lg py-6 px-8 rounded-xl h-auto"
                    asChild
                  >
                    <Link to="/culturin-pro">Learn more</Link>
                  </Button>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-gray-100 rounded-xl p-8 aspect-video flex items-center justify-center">
                  <Megaphone className="w-32 h-32 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* AI Content Toolkit Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Marketing Toolkit</h2>
              <p className="text-lg text-gray-600">
                Create professional marketing content in minutes with our AI tools designed specifically for cultural experience operators.
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  <TabsTrigger value="description" className="flex items-center gap-1">
                    <FileText className="h-4 w-4" /> Description
                  </TabsTrigger>
                  <TabsTrigger value="blog" className="flex items-center gap-1">
                    <FileText className="h-4 w-4" /> Blog
                  </TabsTrigger>
                  <TabsTrigger value="social" className="flex items-center gap-1">
                    <Instagram className="h-4 w-4" /> Social
                  </TabsTrigger>
                  <TabsTrigger value="visual" className="flex items-center gap-1">
                    <Image className="h-4 w-4" /> Visual
                  </TabsTrigger>
                  <TabsTrigger value="seo" className="flex items-center gap-1">
                    <Search className="h-4 w-4" /> SEO
                  </TabsTrigger>
                  <TabsTrigger value="calendar" className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> Calendar
                  </TabsTrigger>
                </TabsList>
                
                {/* Tour Description Writer */}
                <TabsContent value="description" className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>AI-Powered Tour Description Writer</CardTitle>
                      <CardDescription>
                        Create compelling tour descriptions that highlight the unique cultural aspects of your experiences.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
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
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">See Example</Button>
                      <Button onClick={() => handleGenerateContent('description')}>Generate Description</Button>
                    </CardFooter>
                  </Card>
                  <div className="mt-6 bg-gray-50 border rounded-lg p-6">
                    <h4 className="font-medium mb-3">Sample Output</h4>
                    <p className="text-gray-700">
                      <em>
                        "Immerse yourself in Barcelona's rich culinary heritage with our intimate Traditional Cooking Class. Over three engaging hours, you'll work alongside local chefs who share family recipes passed down through generations. Discover the stories behind each dish as you prepare authentic Catalan cuisine using market-fresh ingredients. This hands-on experience goes beyond cooking—it's a cultural journey through taste, tradition, and community that will transform how you understand Spanish gastronomy. Perfect for food enthusiasts seeking authentic connections with Barcelona's culinary soul."
                      </em>
                    </p>
                  </div>
                </TabsContent>
                
                {/* Blog Generator */}
                <TabsContent value="blog" className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Cultural Blog Generator</CardTitle>
                      <CardDescription>
                        Create engaging blog content about cultural destinations and events to attract more visitors.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Blog Topic</label>
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
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Include Call to Action</label>
                        <div className="flex items-center gap-2">
                          <Input placeholder="Book our Kyoto Cultural Tour" />
                          <Button variant="outline" className="whitespace-nowrap">Add Link</Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">See Example</Button>
                      <Button onClick={() => handleGenerateContent('blog')}>Generate Blog Post</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                {/* Social Media Captions */}
                <TabsContent value="social" className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Social Media Caption Assistant</CardTitle>
                      <CardDescription>
                        Create engaging captions for Instagram and other social platforms with travel tone tuning.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Experience to Promote</label>
                        <Input placeholder="Night Market Food Tour in Taipei" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Key Highlights</label>
                        <Textarea placeholder="Street food, local vendors, night atmosphere..." />
                      </div>
                      <div className="space-y-4">
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
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Platform</label>
                          <Select defaultValue="instagram">
                            <SelectTrigger>
                              <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="instagram">Instagram</SelectItem>
                              <SelectItem value="facebook">Facebook</SelectItem>
                              <SelectItem value="twitter">Twitter</SelectItem>
                              <SelectItem value="tiktok">TikTok</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Include Hashtags</label>
                          <Select defaultValue="5">
                            <SelectTrigger>
                              <SelectValue placeholder="Number of hashtags" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3">3 hashtags</SelectItem>
                              <SelectItem value="5">5 hashtags</SelectItem>
                              <SelectItem value="10">10 hashtags</SelectItem>
                              <SelectItem value="15">15 hashtags</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">See Examples</Button>
                      <Button onClick={() => handleGenerateContent('social')}>Generate Captions</Button>
                    </CardFooter>
                  </Card>
                  <div className="mt-6 bg-gray-50 border rounded-lg p-6">
                    <h4 className="font-medium mb-3">Sample Output</h4>
                    <p className="text-gray-700">
                      <em>
                        "Night markets aren't just places to eat—they're where Taipei's soul comes alive after dark! 🌙 Last night we dove into a sea of flavors at our Night Market Food Tour, where every bite tells a story of tradition and innovation. From sizzling oyster omelettes to cloud-like bubble tea, these flavors will haunt your dreams (in the best way possible!)
                        <br /><br />
                        #TaipeiNightMarket #StreetFoodAdventures #TasteOfTaiwan #FoodieTravel #ExperienceTaiwan"
                      </em>
                    </p>
                  </div>
                </TabsContent>
                
                {/* Visual Card Builder */}
                <TabsContent value="visual" className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Visual Card Builder</CardTitle>
                      <CardDescription>
                        Create professional-looking itineraries, flyers, and QR handouts for your experiences.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Template Type</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="border rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50">
                            <LayoutGrid className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                            <p className="text-sm">Itinerary</p>
                          </div>
                          <div className="border rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50">
                            <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                            <p className="text-sm">Flyer</p>
                          </div>
                          <div className="border rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50">
                            <Image className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                            <p className="text-sm">Social Post</p>
                          </div>
                          <div className="border rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50">
                            <Search className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                            <p className="text-sm">QR Handout</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Experience Title</label>
                        <Input placeholder="Ancient Temples of Bali Tour" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Color Theme</label>
                          <Select defaultValue="tropical">
                            <SelectTrigger>
                              <SelectValue placeholder="Select theme" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tropical">Tropical Paradise</SelectItem>
                              <SelectItem value="elegant">Elegant Heritage</SelectItem>
                              <SelectItem value="adventure">Adventure Seeker</SelectItem>
                              <SelectItem value="modern">Modern Explorer</SelectItem>
                              <SelectItem value="custom">Custom Colors</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Upload Logo/Image</label>
                          <div className="flex items-center gap-2">
                            <Input type="file" className="text-sm" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Content Details</label>
                        <Textarea placeholder="Add key details about your experience, pricing, what to bring..." />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Browse Templates</Button>
                      <Button onClick={() => handleGenerateContent('visual')}>Create Visual</Button>
                    </CardFooter>
                  </Card>
                  <div className="mt-6 flex justify-center">
                    <div className="bg-gradient-to-b from-blue-50 to-blue-100 border rounded-lg p-6 max-w-md text-center">
                      <h4 className="text-xl font-bold text-blue-800 mb-2">Ancient Temples of Bali Tour</h4>
                      <p className="text-sm mb-3">A spiritual journey through Bali's most sacred sites</p>
                      <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
                        <p className="text-left text-sm">
                          <strong>Duration:</strong> Full day (8 hours)<br />
                          <strong>Includes:</strong> Transport, guide, lunch, offerings<br />
                          <strong>Highlights:</strong> Uluwatu Temple, Tanah Lot, Water Blessing Ceremony
                        </p>
                      </div>
                      <Button size="sm" className="bg-blue-600">Book Now</Button>
                      <p className="mt-3 text-xs text-gray-600">Operated by Culturin Experiences</p>
                    </div>
                  </div>
                </TabsContent>
                
                {/* SEO Grader */}
                <TabsContent value="seo" className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>SEO Performance Grader</CardTitle>
                      <CardDescription>
                        Analyze and improve your SEO to rank higher for "things to do in [city]" searches.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Experience URL or Description</label>
                        <Input placeholder="https://yourwebsite.com/experience or paste your description" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Target City</label>
                          <Input placeholder="Paris, Rome, Tokyo..." />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Experience Type</label>
                          <Select defaultValue="food">
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="food">Food & Drink</SelectItem>
                              <SelectItem value="history">Historical & Heritage</SelectItem>
                              <SelectItem value="nature">Nature & Outdoor</SelectItem>
                              <SelectItem value="art">Art & Museums</SelectItem>
                              <SelectItem value="adventure">Adventure & Activities</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Target Keywords</label>
                        <Textarea placeholder="cooking class, local cuisine, cultural experience..." />
                      </div>
                      <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                        <label className="text-sm font-medium">SEO Analysis Preview</label>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div className="h-2 bg-yellow-400 rounded-full" style={{ width: "65%" }}></div>
                          </div>
                          <span className="text-sm font-medium">65/100</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          Your content needs improvement to rank for "things to do in Paris". 
                          Run a full analysis to get detailed recommendations.
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">See Examples</Button>
                      <Button onClick={() => handleGenerateContent('seo')}>Run Full Analysis</Button>
                    </CardFooter>
                  </Card>
                  <div className="mt-6 bg-white border rounded-lg p-6 space-y-4">
                    <h4 className="font-medium">Sample SEO Report</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Keyword Optimization</p>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <div className="h-2 bg-green-500 rounded-full" style={{ width: "80%" }}></div>
                          </div>
                          <span className="text-xs">80%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Content Length</p>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <div className="h-2 bg-yellow-400 rounded-full" style={{ width: "60%" }}></div>
                          </div>
                          <span className="text-xs">60%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Local Relevance</p>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <div className="h-2 bg-red-500 rounded-full" style={{ width: "40%" }}></div>
                          </div>
                          <span className="text-xs">40%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Image Optimization</p>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <div className="h-2 bg-yellow-400 rounded-full" style={{ width: "65%" }}></div>
                          </div>
                          <span className="text-xs">65%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Content Calendar */}
                <TabsContent value="calendar" className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Content Calendar & Seasonal Promos</CardTitle>
                      <CardDescription>
                        Plan your marketing calendar with suggested seasonal promotions and cultural events.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Location Focus</label>
                          <Input placeholder="Paris, France" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Experience Type</label>
                          <Select defaultValue="culinary">
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="culinary">Culinary</SelectItem>
                              <SelectItem value="historical">Historical</SelectItem>
                              <SelectItem value="artistic">Artistic</SelectItem>
                              <SelectItem value="nature">Nature & Outdoor</SelectItem>
                              <SelectItem value="spiritual">Spiritual</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Planning Period</label>
                        <Select defaultValue="quarter">
                          <SelectTrigger>
                            <SelectValue placeholder="Select period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="month">Next Month</SelectItem>
                            <SelectItem value="quarter">Next Quarter</SelectItem>
                            <SelectItem value="6months">Next 6 Months</SelectItem>
                            <SelectItem value="year">Full Year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Include Local Cultural Events</label>
                        <Select defaultValue="yes">
                          <SelectTrigger>
                            <SelectValue placeholder="Include events?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes, Include Events</SelectItem>
                            <SelectItem value="no">No, Focus on Promotions</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">See Example</Button>
                      <Button onClick={() => handleGenerateContent('calendar')}>Generate Calendar</Button>
                    </CardFooter>
                  </Card>
                  <div className="mt-6 bg-white border rounded-lg p-6">
                    <h4 className="font-medium mb-4">Suggested Content Calendar - Paris Culinary Experiences</h4>
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4 py-1">
                        <p className="font-medium">June: Summer Food Festivals</p>
                        <p className="text-sm text-gray-600">Highlight seasonal ingredients, outdoor dining experiences, and tie-ins to Fête de la Musique (June 21)</p>
                        <div className="flex gap-2 mt-2">
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Email Campaign</Badge>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Instagram Story</Badge>
                        </div>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-4 py-1">
                        <p className="font-medium">July: Bastille Day Special</p>
                        <p className="text-sm text-gray-600">French culinary heritage focus, special Bastille Day menus, and patriotic-themed food tours</p>
                        <div className="flex gap-2 mt-2">
                          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Limited Offer</Badge>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Social Media</Badge>
                        </div>
                      </div>
                      <div className="border-l-4 border-amber-500 pl-4 py-1">
                        <p className="font-medium">August: Summer Vineyard Tours</p>
                        <p className="text-sm text-gray-600">Day trips to nearby wine regions, focus on harvest preparations, wine pairing experiences</p>
                        <div className="flex gap-2 mt-2">
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Blog Post</Badge>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Partnership</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="bg-gray-50 py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Promote your experiences</h2>
              <p className="text-lg text-gray-600">
                Our marketing tools help you showcase your cultural experiences to the right audience at the right time.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: <Search className="h-10 w-10 text-blue-600" />,
                  title: "SEO Optimization",
                  description: "Get found online with our SEO tools designed specifically for tourism and cultural experiences."
                },
                {
                  icon: <Globe className="h-10 w-10 text-blue-600" />,
                  title: "Social Media Integration",
                  description: "Easily share your experiences across social platforms and track engagement."
                },
                {
                  icon: <Zap className="h-10 w-10 text-blue-600" />,
                  title: "Promotional Campaigns",
                  description: "Create and manage special offers, seasonal promotions, and discount codes."
                },
                {
                  icon: <FileText className="h-10 w-10 text-blue-600" />,
                  title: "Content Creation",
                  description: "AI-powered tools to create compelling descriptions, blogs, and marketing materials."
                },
                {
                  icon: <Image className="h-10 w-10 text-blue-600" />,
                  title: "Visual Materials",
                  description: "Design professional flyers, itineraries, and visual assets for your experiences."
                },
                {
                  icon: <Calendar className="h-10 w-10 text-blue-600" />,
                  title: "Seasonal Planning",
                  description: "Stay ahead with content calendars featuring cultural events and promotion suggestions."
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className={`bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-500 ${
                    animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{transitionDelay: `${index * 100}ms`}}
                >
                  <div className="mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white py-5 px-8 rounded-xl text-lg h-auto"
                asChild
              >
                <Link to="/culturin-pro">Start a free trial</Link>
              </Button>
              <p className="mt-3 text-gray-500">No credit card required</p>
            </div>
          </div>
        </section>
        
        {/* Testimonial Section */}
        <section className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-blue-50 rounded-xl p-8 md:p-10">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-lg md:text-xl text-gray-700 mb-6 italic">
                    "Before Culturin's Marketing Toolkit, I was spending thousands on a marketing agency. Now I create professional content in minutes that actually converts better because it's authentic to my experience."
                  </p>
                  <div>
                    <p className="font-medium">Maria Gonzalez</p>
                    <p className="text-sm text-gray-600">Barcelona Food Tours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <NewFooter />
    </div>
  );
};

export default ProductMarketingPage;

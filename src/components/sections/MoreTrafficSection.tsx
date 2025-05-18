
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ArrowRight, Search, Calendar, Mail, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const MoreTrafficSection = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  useEffect(() => {
    if (inView) {
      setAnimateItems(true);
    }
  }, [inView]);

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className={`text-center mb-12 transition-all duration-700 ease-out ${
          animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6">
            Grow your bookings, deepen guest loyalty,<br />and build a cultural brand that scales
          </h2>
        </div>
        
        <Tabs defaultValue="googleTraffic" className="w-full">
          <TabsList className="flex space-x-6 md:space-x-8 mb-8 border-b border-gray-200 w-full overflow-x-auto pb-0">
            <TabsTrigger value="googleTraffic">
              <span className="text-gray-400 mr-2">1</span> Show Up Higher on Google
            </TabsTrigger>
            <TabsTrigger value="onlineSales">
              <span className="text-gray-400 mr-2">2</span> Turn Visitors Into Bookers
            </TabsTrigger>
            <TabsTrigger value="repeatOrders">
              <span className="text-gray-400 mr-2">3</span> Get Guests to Come Back
            </TabsTrigger>
            <TabsTrigger value="appDownloads">
              <span className="text-gray-400 mr-2">4</span> Build Your Digital Footprint
            </TabsTrigger>
          </TabsList>
          
          <div className={`transition-all duration-700 ease-out ${
            animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <TabsContent value="googleTraffic" className="mt-4">
              <Card className="p-8 bg-[#f5f7ff] border-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="text-2xl font-medium mb-2 text-gray-500">Be the first result.</h3>
                    <h2 className="text-3xl font-medium mb-6">When travelers search for food tours in Oaxaca — you should be the one they find.</h2>
                    
                    <ul className="space-y-3 text-gray-700 mb-8">
                      <li className="flex items-start">
                        <span className="bg-blue-100 text-blue-800 p-1 rounded-full mr-2">✓</span>
                        <span><strong>SEO-ready pages, no tech needed</strong></span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-100 text-blue-800 p-1 rounded-full mr-2">✓</span>
                        <span><strong>Built to rank on Google</strong></span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-100 text-blue-800 p-1 rounded-full mr-2">✓</span>
                        <span><strong>Get 245% more clicks to your listings</strong></span>
                      </li>
                    </ul>
                    
                    <Button className="flex items-center gap-2 bg-blue-100 text-blue-800 hover:bg-blue-200">
                      <Search className="h-4 w-4" />
                      Preview SEO listing
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1469041797191-50ace28483c3" 
                      alt="Local guide showing cultural experience to tourists" 
                      className="rounded-lg shadow-lg object-cover h-full"
                    />
                    
                    {/* Before/After Overlay */}
                    <div className="absolute bottom-4 right-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="font-bold text-red-500">Before Culturin</span>
                        <span className="font-bold text-green-600">After Culturin</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1 mb-3 relative">
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-blue-500"></div>
                        <div className="w-1/2 h-full bg-blue-500"></div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">0 clicks/month</span>
                        <span className="text-blue-600 font-semibold">+245% more clicks</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="onlineSales" className="mt-4">
              <Card className="p-8 bg-[#f5f7ff] border-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="text-2xl font-medium mb-2 text-gray-500">Turn browsers into bookings.</h3>
                    <h2 className="text-3xl font-medium mb-6">Culturin's booking system is made for cultural tours — easy, local, and reliable.</h2>
                    
                    <ul className="space-y-3 text-gray-700 mb-8">
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
                        <span><strong>Group-friendly scheduling</strong></span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
                        <span><strong>Local payment methods</strong></span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
                        <span><strong>Smart abandoned cart recovery</strong></span>
                      </li>
                    </ul>
                    
                    <Button className="flex items-center gap-2 bg-green-100 text-green-800 hover:bg-green-200">
                      <Calendar className="h-4 w-4" />
                      See booking flows
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6" 
                      alt="Guide helping tourists book a cultural experience" 
                      className="rounded-lg shadow-lg object-cover h-full"
                    />
                    
                    {/* Conversion Rate Comparison */}
                    <div className="absolute bottom-4 right-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md">
                      <p className="text-sm font-medium text-center mb-2">Conversion Rate Improvement</p>
                      <div className="flex items-end justify-between h-16">
                        <div className="w-[45%] bg-gray-200 h-6 relative">
                          <div className="absolute -top-5 left-0 text-xs">Before</div>
                          <div className="absolute -bottom-5 w-full text-center text-xs">2.1%</div>
                        </div>
                        <div className="w-[45%] bg-green-500 h-14 relative">
                          <div className="absolute -top-5 left-0 text-xs">After</div>
                          <div className="absolute -bottom-5 w-full text-center text-xs font-bold">8.7%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="repeatOrders" className="mt-4">
              <Card className="p-8 bg-[#f5f7ff] border-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="text-2xl font-medium mb-2 text-gray-500">Turn one-time guests into lifelong fans.</h3>
                    <h2 className="text-3xl font-medium mb-6">Stay connected after the tour with tools that build trust and repeat bookings.</h2>
                    
                    <ul className="space-y-3 text-gray-700 mb-8">
                      <li className="flex items-start">
                        <span className="bg-amber-100 text-amber-800 p-1 rounded-full mr-2">✓</span>
                        <span><strong>Culturally attuned follow-ups</strong></span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-amber-100 text-amber-800 p-1 rounded-full mr-2">✓</span>
                        <span><strong>Personalised local offers</strong></span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-amber-100 text-amber-800 p-1 rounded-full mr-2">✓</span>
                        <span><strong>Story-driven review requests</strong></span>
                      </li>
                    </ul>
                    
                    <Button className="flex items-center gap-2 bg-amber-100 text-amber-800 hover:bg-amber-200">
                      <Mail className="h-4 w-4" />
                      Explore retention tools
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1576267423445-b2e0074d68a4" 
                      alt="Cultural tour guide connecting with returning customers" 
                      className="rounded-lg shadow-lg object-cover h-full"
                    />
                    
                    {/* Repeat Customer Graph */}
                    <div className="absolute bottom-4 right-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md">
                      <p className="text-sm font-medium mb-2">Guest Return Rate</p>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 h-4 rounded-full">
                          <div className="bg-amber-500 h-4 rounded-full" style={{width: "68%"}}></div>
                        </div>
                        <span className="text-amber-800 font-bold">+68%</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Operators using Culturin see 3.4× more repeat bookings</p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="appDownloads" className="mt-4">
              <Card className="p-8 bg-[#f5f7ff] border-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="text-2xl font-medium mb-2 text-gray-500">Give your guests an app they'll actually love.</h3>
                    <h2 className="text-3xl font-medium mb-6">Culturin turns your stories into a rich digital experience — at their fingertips.</h2>
                    
                    <ul className="space-y-3 text-gray-700 mb-8">
                      <li className="flex items-start">
                        <span className="bg-purple-100 text-purple-800 p-1 rounded-full mr-2">✓</span>
                        <span><strong>Custom-branded tour app</strong></span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-purple-100 text-purple-800 p-1 rounded-full mr-2">✓</span>
                        <span><strong>Cultural maps + guides</strong></span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-purple-100 text-purple-800 p-1 rounded-full mr-2">✓</span>
                        <span><strong>Smart, respectful notifications</strong></span>
                      </li>
                    </ul>
                    
                    <Button className="flex items-center gap-2 bg-purple-100 text-purple-800 hover:bg-purple-200">
                      <Smartphone className="h-4 w-4" />
                      See sample app
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1621274282562-fe5d57b0e525" 
                      alt="Tourists using a cultural tour mobile app" 
                      className="rounded-lg shadow-lg object-cover h-full"
                    />
                    
                    {/* App Usage Stats */}
                    <div className="absolute bottom-4 right-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Digital Engagement</span>
                        <span className="text-xs text-purple-600">Culturin vs Industry Avg</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-xs">
                          <span>App Open Rate</span>
                          <span className="font-bold text-purple-600">87% (+31%)</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Content Engagement</span>
                          <span className="font-bold text-purple-600">14.2 min avg (+62%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default MoreTrafficSection;

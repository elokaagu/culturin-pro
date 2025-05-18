import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

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
            With Culturin, you get more traffic,<br />more sales, more repeat customers
          </h2>
        </div>
        
        <Tabs defaultValue="googleTraffic" className="w-full">
          <TabsList className="flex space-x-6 md:space-x-8 mb-8 border-b border-gray-200 w-full overflow-x-auto pb-0">
            <TabsTrigger value="googleTraffic">
              <span className="text-gray-400 mr-2">1</span> More Google Traffic
            </TabsTrigger>
            <TabsTrigger value="onlineSales">
              <span className="text-gray-400 mr-2">2</span> More Online Sales
            </TabsTrigger>
            <TabsTrigger value="repeatOrders">
              <span className="text-gray-400 mr-2">3</span> More Repeat Orders
            </TabsTrigger>
            <TabsTrigger value="appDownloads">
              <span className="text-gray-400 mr-2">4</span> More App Downloads
            </TabsTrigger>
          </TabsList>
          
          <div className={`transition-all duration-700 ease-out ${
            animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <TabsContent value="googleTraffic" className="mt-4">
              <Card className="p-8 bg-[#f5f7ff] border-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="text-2xl font-medium mb-2 text-gray-500">Attract more visitors</h3>
                    <h2 className="text-3xl font-medium mb-6">Culturin optimizes your tour listings for search engines</h2>
                    <p className="text-lg text-gray-700 mb-4">
                      Our specialized SEO tools help your cultural experiences rank higher on Google, bringing more organic traffic directly to your booking page.
                    </p>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="bg-blue-100 text-blue-800 p-1 rounded-full mr-2">✓</span>
                        Automatically optimized page structure
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-100 text-blue-800 p-1 rounded-full mr-2">✓</span>
                        Local SEO features built-in
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-100 text-blue-800 p-1 rounded-full mr-2">✓</span>
                        Schema markup for better search visibility
                      </li>
                    </ul>
                  </div>
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop" 
                      alt="SEO Analytics Dashboard" 
                      className="rounded-lg shadow-lg object-cover h-full"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="onlineSales" className="mt-4">
              <Card className="p-8 bg-[#f5f7ff] border-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="text-2xl font-medium mb-2 text-gray-500">Boost revenue</h3>
                    <h2 className="text-3xl font-medium mb-6">Convert more visitors into paying customers</h2>
                    <p className="text-lg text-gray-700 mb-4">
                      Our conversion-optimized booking system makes it easy for visitors to book your cultural experiences directly.
                    </p>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
                        Mobile-optimized checkout
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
                        Multiple payment methods
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
                        Abandoned cart recovery
                      </li>
                    </ul>
                  </div>
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=1000&auto=format&fit=crop" 
                      alt="Online booking system" 
                      className="rounded-lg shadow-lg object-cover h-full"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="repeatOrders" className="mt-4">
              <Card className="p-8 bg-[#f5f7ff] border-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="text-2xl font-medium mb-2 text-gray-500">Create more regulars</h3>
                    <h2 className="text-3xl font-medium mb-6">Culturin uses smart follow-ups that grow your repeat orders</h2>
                    <p className="text-lg text-gray-700 mb-4">
                      Our automated marketing tools help you stay connected with guests and bring them back for more experiences.
                    </p>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="bg-amber-100 text-amber-800 p-1 rounded-full mr-2">✓</span>
                        Personalized follow-up emails
                      </li>
                      <li className="flex items-start">
                        <span className="bg-amber-100 text-amber-800 p-1 rounded-full mr-2">✓</span>
                        Special offers for past guests
                      </li>
                      <li className="flex items-start">
                        <span className="bg-amber-100 text-amber-800 p-1 rounded-full mr-2">✓</span>
                        Automated review requests
                      </li>
                    </ul>
                  </div>
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=1000&auto=format&fit=crop" 
                      alt="Customer journey automation" 
                      className="rounded-lg shadow-lg object-cover h-full"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="appDownloads" className="mt-4">
              <Card className="p-8 bg-[#f5f7ff] border-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="text-2xl font-medium mb-2 text-gray-500">Extend your reach</h3>
                    <h2 className="text-3xl font-medium mb-6">Give guests a branded mobile experience</h2>
                    <p className="text-lg text-gray-700 mb-4">
                      With Culturin, you get a custom-branded mobile app that makes it easy for travelers to book and enjoy your experiences.
                    </p>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="bg-purple-100 text-purple-800 p-1 rounded-full mr-2">✓</span>
                        Custom-branded mobile app
                      </li>
                      <li className="flex items-start">
                        <span className="bg-purple-100 text-purple-800 p-1 rounded-full mr-2">✓</span>
                        Push notifications for promotions
                      </li>
                      <li className="flex items-start">
                        <span className="bg-purple-100 text-purple-800 p-1 rounded-full mr-2">✓</span>
                        Digital guidebooks and maps
                      </li>
                    </ul>
                  </div>
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1621274282562-fe5d57b0e525?q=80&w=1000&auto=format&fit=crop" 
                      alt="Mobile app mockup" 
                      className="rounded-lg shadow-lg object-cover h-full"
                    />
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

"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GoogleTrafficTab from "@/components/sections/tabs/GoogleTrafficTab";
import OnlineSalesTab from "@/components/sections/tabs/OnlineSalesTab";
import RepeatOrdersTab from "@/components/sections/tabs/RepeatOrdersTab";
import AppDownloadsTab from "@/components/sections/tabs/AppDownloadsTab";

const MoreTrafficSection = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setAnimateItems(true);
    }
  }, [inView]);

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            animateItems
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6">
            Amplify your cultural impact, connect with authentic travelers,
            <br />
            and build a sustainable tourism brand
          </h2>
        </div>

        <Tabs defaultValue="googleTraffic" className="w-full">
          <TabsList className="flex space-x-6 md:space-x-8 mb-8 border-b border-gray-200 w-full overflow-x-auto pb-0">
            <TabsTrigger value="googleTraffic">
              <span className="text-gray-400 mr-2">1</span> Connect with
              Cultural Seekers
            </TabsTrigger>
            <TabsTrigger value="onlineSales">
              <span className="text-gray-400 mr-2">2</span> Create Meaningful
              Connections
            </TabsTrigger>
            <TabsTrigger value="repeatOrders">
              <span className="text-gray-400 mr-2">3</span> Build Lasting
              Relationships
            </TabsTrigger>
            <TabsTrigger value="appDownloads">
              <span className="text-gray-400 mr-2">4</span> Share Your Cultural
              Story
            </TabsTrigger>
          </TabsList>

          <div
            className={`transition-all duration-700 ease-out ${
              animateItems
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <TabsContent value="googleTraffic" className="mt-4">
              <GoogleTrafficTab />
            </TabsContent>

            <TabsContent value="onlineSales" className="mt-4">
              <OnlineSalesTab />
            </TabsContent>

            <TabsContent value="repeatOrders" className="mt-4">
              <RepeatOrdersTab />
            </TabsContent>

            <TabsContent value="appDownloads" className="mt-4">
              <AppDownloadsTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default MoreTrafficSection;

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ChartBar,
  Calendar,
  CreditCard,
  FileText,
  Users,
  Package,
  PackageCheck,
} from "lucide-react";
import { toast } from "sonner";

const BookingOverview = () => {
  const handleEmbedCode = () => {
    toast.info("Booking widget embed code copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              Total Bookings
            </CardTitle>
            <CardDescription>All channels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">245</div>
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <span>+18% from last month</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Revenue</CardTitle>
            <CardDescription>Direct bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">£12,485</div>
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <span>+23% from last month</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              Conversion Rate
            </CardTitle>
            <CardDescription>Checkout completion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">68.2%</div>
            <p className="text-sm text-amber-600 mt-1 flex items-center">
              <span>-3.1% from last month</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Direct Booking & Checkout Layer</CardTitle>
          <CardDescription>
            A conversion-optimised booking experience that reflects the
            emotional frame of the trip
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="features">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Core Features</TabsTrigger>
              <TabsTrigger value="customize">Customize</TabsTrigger>
              <TabsTrigger value="embed">Embed</TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-md">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">White-labelled Checkout</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Fully customizable checkout embedded in operator site or
                        Culturin-hosted microsite
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-md">
                      <PackageCheck className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Upsell Engine</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Journey-aligned add-ons (e.g. "Add a tea ceremony with a
                        local elder")
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-md">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Adaptive Checkout UX</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Tailored for trip type (honeymoon, heritage, solo)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-md">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Flexible Payment Options</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Split payments, deposits, and group booking tools
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-md">
                      <ChartBar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        Stablecoin Payment Integration
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Optional integration for diaspora travelers or emerging
                        markets
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-md">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        Post-checkout Journey Recap
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        AI-generated printable memory pack for customers
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-medium mb-2">Differentiator</h3>
                <p className="text-gray-700">
                  Booking becomes a narrative moment, not just a transaction.
                  Supports emotional resonance and lifetime value.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="customize" className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Appearance Settings</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="justify-start">
                        Colors & Branding
                      </Button>
                      <Button variant="outline" className="justify-start">
                        Layout Options
                      </Button>
                      <Button variant="outline" className="justify-start">
                        Custom Fields
                      </Button>
                      <Button variant="outline" className="justify-start">
                        Form Templates
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Booking Flow Settings</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="justify-start">
                        Payment Options
                      </Button>
                      <Button variant="outline" className="justify-start">
                        Upsell Configuration
                      </Button>
                      <Button variant="outline" className="justify-start">
                        Confirmation Emails
                      </Button>
                      <Button variant="outline" className="justify-start">
                        Memory Pack Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="embed" className="pt-4">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h3 className="font-medium mb-2">
                    Embed your booking widget
                  </h3>
                  <div className="bg-black text-green-400 p-3 rounded font-mono text-sm overflow-x-auto">
                    &lt;script src="https://bookings.culturin.app/widget.js"
                    data-operator-id="op_12345"&gt;&lt;/script&gt;
                  </div>
                  <Button onClick={handleEmbedCode} className="mt-4">
                    Copy Code
                  </Button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="font-medium mb-2">Hosted Booking Page</h3>
                  <p className="text-sm mb-3">
                    Your booking page is also available as a hosted microsite
                    at:
                  </p>
                  <div className="bg-white p-2 rounded border">
                    https://book.culturin.app/your-company-name
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
        <h3 className="font-medium flex items-center gap-2">
          <Package className="h-5 w-5 text-amber-600" />
          Insight
        </h3>
        <p className="text-gray-700 mt-2">
          Try offering a morning version of your "City Heritage Walk" tour. Data
          shows 42% of visitors search for morning activities but only find your
          afternoon slots.
        </p>
        <Button
          variant="outline"
          className="mt-3 border-amber-200 bg-amber-100/50 hover:bg-amber-100"
        >
          Create Morning Variant
        </Button>
      </div>
    </div>
  );
};

export default BookingOverview;

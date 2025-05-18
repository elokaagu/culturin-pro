
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";

const PricingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />
      
      <main className="flex-1 pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Heading Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">One simple price.</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Month-to-month. No long-term contracts. No cancellation fees. 
              Just pay a flat rate to get everything on the Culturin platform.
            </p>
          </div>
          
          {/* Pricing Card */}
          <div className="max-w-3xl mx-auto mb-20">
            <div className="bg-blue-600 text-white rounded-xl p-10 md:p-12 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-5xl md:text-6xl font-bold mb-2">$199</h2>
                  <p className="text-blue-100">billed monthly</p>
                </div>
                <div className="mt-6 md:mt-0">
                  <Button 
                    className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 h-auto text-lg"
                    onClick={() => window.location.href = '/sign-in'}
                  >
                    Get a free demo →
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* What's Included */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl uppercase font-bold tracking-wider mb-12 text-center">What's Included</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-7 w-7 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-medium mb-2">Tour Builder</h3>
                  <p className="text-gray-600">Create beautiful, conversion-optimized tour pages to showcase your experiences.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CheckCircle className="h-7 w-7 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-medium mb-2">Direct Booking Engine</h3>
                  <p className="text-gray-600">Own your customer relationships with a powerful booking system built for tour operators.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CheckCircle className="h-7 w-7 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-medium mb-2">Guest CRM</h3>
                  <p className="text-gray-600">Manage your customer relationships and build loyalty with every booking.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CheckCircle className="h-7 w-7 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-medium mb-2">Marketing Suite</h3>
                  <p className="text-gray-600">Email marketing, social media tools, and SEO optimizations to attract more guests.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CheckCircle className="h-7 w-7 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-medium mb-2">Analytics Dashboard</h3>
                  <p className="text-gray-600">Track performance with real-time data and actionable insights.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CheckCircle className="h-7 w-7 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-medium mb-2">Storytelling Toolkit</h3>
                  <p className="text-gray-600">Create compelling narratives around your cultural experiences.</p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-16">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 h-auto text-lg"
                onClick={() => window.location.href = '/sign-in'}
              >
                Get started with a free demo
              </Button>
              <p className="mt-4 text-gray-500">No credit card required</p>
            </div>
          </div>
        </div>
      </main>
      
      <NewFooter />
    </div>
  );
};

export default PricingPage;

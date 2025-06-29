'use client'

import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, BarChart3, TrendingUp, LineChart } from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";

const AnalyticsScanPage = () => {
  const [tourName, setTourName] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  
  const handleScan = () => {
    if (!tourName) return;
    
    setIsScanning(true);
    
    // Simulate scan process
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Analyze Your Tour Performance</h1>
            <p className="text-lg text-gray-600">
              Diagnose booking drop-offs and discover optimization opportunities for your cultural experiences.
            </p>
          </div>
          
          {!scanComplete ? (
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Enter your experience details</h2>
                <p className="text-gray-600">We'll analyze your booking flow and identify areas for improvement.</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="tourName" className="block text-sm font-medium text-gray-700 mb-1">
                    Experience Name
                  </label>
                  <Input 
                    id="tourName"
                    value={tourName}
                    onChange={(e) => setTourName(e.target.value)}
                    placeholder="e.g. Marrakech Walking Tour" 
                    className="h-12"
                  />
                </div>
                
                <div>
                  <label htmlFor="tourUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    Experience URL (optional)
                  </label>
                  <Input 
                    id="tourUrl"
                    placeholder="e.g. https://yourtourwebsite.com/tours/marrakech-tour" 
                    className="h-12"
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleScan}
                    disabled={!tourName || isScanning}
                  >
                    {isScanning ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Start Analysis
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
              <div className="mb-8 flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold">Analysis Complete: {tourName}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium mb-1">Booking Conversion</h3>
                  <p className="text-2xl font-bold text-blue-600">3.2%</p>
                  <p className="text-sm text-gray-500">Industry avg: 5.7%</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium mb-1">Drop-off Points</h3>
                  <p className="text-2xl font-bold text-blue-600">3</p>
                  <p className="text-sm text-gray-500">Critical areas</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <LineChart className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium mb-1">Potential Growth</h3>
                  <p className="text-2xl font-bold text-blue-600">+46%</p>
                  <p className="text-sm text-gray-500">With optimizations</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-3">Key Improvement Areas:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="bg-red-100 text-red-600 p-1 rounded mt-0.5">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-medium">Booking form abandonment (64%)</p>
                      <p className="text-sm text-gray-600">Users leave during the payment step</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-yellow-100 text-yellow-600 p-1 rounded mt-0.5">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-medium">Slow page load time (6.2s)</p>
                      <p className="text-sm text-gray-600">Industry benchmark is 2.5s</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-yellow-100 text-yellow-600 p-1 rounded mt-0.5">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-medium">Missing social proof</p>
                      <p className="text-sm text-gray-600">No reviews or testimonials displayed</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 h-auto rounded-xl">
                  Get detailed report & fixes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <NewFooter />
    </div>
  );
};

export default AnalyticsScanPage;

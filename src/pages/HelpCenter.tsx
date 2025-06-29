'use client'

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { useInView } from 'react-intersection-observer';
import { HelpCircle, Search, BookOpen, Phone, Mail } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from '../components/Header';
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from '../../lib/navigation';
import NewFooter from "@/components/sections/NewFooter";

const faqCategories = [
  { id: 'getting-started', name: 'Getting Started' },
  { id: 'account', name: 'Account & Billing' },
  { id: 'features', name: 'Features & Tools' },
  { id: 'troubleshooting', name: 'Troubleshooting' },
];

const faqItems = [
  {
    category: 'getting-started',
    question: 'How do I create a Culturin account?',
    answer: 'To create a Culturin account, click "Sign Up" on the top right of our homepage. Fill in your details, verify your email address, and follow our guided setup process to get started.'
  },
  {
    category: 'getting-started',
    question: 'What type of experiences can I list on Culturin?',
    answer: 'Culturin accepts authentic cultural experiences like food tours, cooking classes, artisan workshops, cultural performances, historical walks, and traditional craft demonstrations that showcase local heritage.'
  },
  {
    category: 'account',
    question: 'How do I change my account details?',
    answer: 'Log in to your Culturin account, navigate to "Settings" from the dashboard, and select "Account Information". Here you can update your profile information, change your password, and manage notification preferences.'
  },
  {
    category: 'account',
    question: 'How does Culturin pricing work?',
    answer: 'Culturin offers tiered pricing plans designed for different business needs. We offer a free plan for beginners, and premium plans with additional features for growing businesses. Visit our Pricing page for detailed information.'
  },
  {
    category: 'features',
    question: 'How do I use the itinerary builder?',
    answer: 'Access the itinerary builder from your dashboard by clicking "Create New Experience". You can add locations, activities, timing, and custom details. Drag and drop elements to reorder, and use our templates for quick setup.'
  },
  {
    category: 'features',
    question: 'Can I integrate Culturin with my existing website?',
    answer: 'Yes, Culturin offers website integration options. Use our API or embedded booking widgets to integrate your Culturin experiences directly on your website while maintaining your brand identity.'
  },
  {
    category: 'troubleshooting',
    question: 'Why is my calendar not syncing properly?',
    answer: 'Calendar syncing issues may occur due to connection problems or incorrect settings. Try refreshing your connection in Settings > Integrations, ensure your external calendar permissions are correctly set, or contact our support team for assistance.'
  },
  {
    category: 'troubleshooting',
    question: 'How do I resolve payment processing issues?',
    answer: 'For payment processing issues, first check that your payment method information is current. Verify your bank hasn\'t blocked the transaction, clear your browser cache, or try a different payment method. For persistent issues, contact our support team.'
  },
];

const HelpCenter = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('getting-started');
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const filteredFAQs = searchQuery 
    ? faqItems.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    : faqItems.filter(item => item.category === activeCategory);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative bg-blue-600 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
              alt="Help Center"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-blue-600/70"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">Help Center</h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Find answers to your questions and get the support you need
              </p>
              
              <div className="mt-8 relative max-w-xl mx-auto">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search for answers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-6 bg-white/95 text-gray-900 rounded-lg focus:ring-2 focus:ring-white/50 text-lg"
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                    <Search className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQs Section */}
        <section ref={ref} className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            {/* Category Tabs */}
            {!searchQuery && (
              <div className="mb-12 overflow-x-auto whitespace-nowrap">
                <div className="flex space-x-2 md:space-x-6 justify-center">
                  {faqCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-5 py-3 rounded-lg transition-all text-sm md:text-base font-medium ${
                        activeCategory === category.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Search Results Label */}
            {searchQuery && (
              <div className="mb-8 text-center">
                <h2 className="text-xl font-semibold">
                  Search results for "{searchQuery}"
                </h2>
                <p className="text-gray-600 mt-2">
                  {filteredFAQs.length} results found
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSearchQuery('')}
                >
                  Clear search
                </Button>
              </div>
            )}
            
            {/* FAQ List */}
            <div className={`transition-opacity duration-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
              <div className="max-w-3xl mx-auto">
                {filteredFAQs.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFAQs.map((faq, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`item-${index}`}
                        className="border-b border-gray-200"
                      >
                        <AccordionTrigger className="text-lg md:text-xl text-left hover:no-underline hover:text-blue-600 py-6">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 text-base pb-6">
                          <p className="leading-relaxed">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-center py-16">
                    <HelpCircle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-2xl font-medium mb-2">No results found</h3>
                    <p className="text-gray-600">Try adjusting your search terms or browse by category</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Support Options Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Additional Support Options</h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="bg-white border-none shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-6">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Documentation</h3>
                  <p className="text-gray-600 mb-6">Explore our detailed guides, tutorials and API documentation</p>
                  <Button 
                    variant="outline" 
                    onClick={() => window.open('/blog', '_blank')} 
                    className="mt-auto border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    View Guides
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-none shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-6">
                    <Phone className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Call Support</h3>
                  <p className="text-gray-600 mb-6">Speak directly with our customer support team</p>
                  <Button 
                    variant="outline" 
                    className="mt-auto border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    +1 (800) 555-1234
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-none shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-6">
                    <Mail className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Email Us</h3>
                  <p className="text-gray-600 mb-6">Send us a message and we'll respond within 24 hours</p>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/contact')} 
                    className="mt-auto border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    Contact Us
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <NewFooter />
    </div>
  );
};

export default HelpCenter;


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
import Footer from '../components/sections/Footer';
import { useNavigate } from 'react-router-dom';

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
    <>
      <Header type="traveler" />
      
      <main className="pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="relative bg-culturin-accent text-white py-12 md:py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
              alt="Help Center"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="container-custom relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Help Center</h1>
              <p className="text-lg md:text-xl opacity-90">Find answers to your questions and get the support you need</p>
              
              <div className="mt-8 relative max-w-xl mx-auto">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search for answers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/90 text-gray-900 rounded-lg focus:ring-2 focus:ring-white"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Search className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQs Section */}
        <section ref={ref} className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="container-custom">
            {/* Category Tabs */}
            {!searchQuery && (
              <div className="mb-10 border-b overflow-x-auto whitespace-nowrap pb-2">
                <div className="flex space-x-2 md:space-x-6 justify-start md:justify-center">
                  {faqCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        activeCategory === category.id
                          ? 'bg-culturin-indigo text-white'
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
              <div className="mb-6">
                <h2 className="text-xl font-semibold">
                  Search results for "{searchQuery}"
                </h2>
                <p className="text-gray-600">
                  {filteredFAQs.length} results found
                </p>
                <Button 
                  variant="outline" 
                  className="mt-2"
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
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-xl text-left hover:no-underline hover:text-culturin-indigo py-5">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 text-base pb-5">
                          <p>{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-center py-8">
                    <HelpCircle className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No results found</h3>
                    <p className="text-gray-600">Try adjusting your search terms or browse by category</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Support Options Section */}
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Additional Support Options</h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-soft flex flex-col items-center text-center">
                <div className="bg-culturin-indigo/10 p-4 rounded-full mb-4">
                  <BookOpen className="w-8 h-8 text-culturin-indigo" />
                </div>
                <h3 className="font-bold text-lg mb-2">Documentation</h3>
                <p className="text-gray-600 mb-4">Explore our detailed guides, tutorials and API documentation</p>
                <Button variant="outline" onClick={() => window.open('/blog', '_blank')} className="mt-auto">
                  View Guides
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-soft flex flex-col items-center text-center">
                <div className="bg-culturin-indigo/10 p-4 rounded-full mb-4">
                  <Phone className="w-8 h-8 text-culturin-indigo" />
                </div>
                <h3 className="font-bold text-lg mb-2">Call Support</h3>
                <p className="text-gray-600 mb-4">Speak directly with our customer support team</p>
                <Button variant="outline" className="mt-auto">
                  +1 (800) 555-1234
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-soft flex flex-col items-center text-center">
                <div className="bg-culturin-indigo/10 p-4 rounded-full mb-4">
                  <Mail className="w-8 h-8 text-culturin-indigo" />
                </div>
                <h3 className="font-bold text-lg mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">Send us a message and we'll respond within 24 hours</p>
                <Button variant="outline" onClick={() => navigate('/contact')} className="mt-auto">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default HelpCenter;

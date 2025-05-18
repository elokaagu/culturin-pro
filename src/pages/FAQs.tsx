
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { useInView } from 'react-intersection-observer';
import { HelpCircle, Shield, Contact, Mail, Users } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/sections/Footer';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const faqCategories = [
  { id: 'general', name: 'General' },
  { id: 'booking', name: 'Booking' },
  { id: 'experience', name: 'Experiences' },
  { id: 'payments', name: 'Payments' },
  { id: 'hosts', name: 'For Hosts' },
];

const faqItems = [
  {
    category: 'general',
    question: 'What is Culturin?',
    answer: 'Culturin is a platform connecting travelers with local hosts for authentic cultural experiences. Our mission is to promote meaningful travel through personalized cultural exchange and learning opportunities.'
  },
  {
    category: 'general',
    question: 'How does Culturin work?',
    answer: 'Culturin connects travelers with verified local hosts who offer authentic cultural experiences. Browse experiences, book your preferred date and time, and enjoy a genuine cultural exchange with locals who are passionate about sharing their traditions, knowledge, and skills.'
  },
  {
    category: 'general',
    question: 'Where is Culturin available?',
    answer: 'We currently operate in select cities across Europe, North America, and Asia. We\'re expanding rapidly to bring authentic cultural experiences to more destinations worldwide.'
  },
  {
    category: 'booking',
    question: 'How do I book an experience?',
    answer: 'To book an experience, browse our collection, select one that interests you, choose your preferred date and group size, and complete your booking with payment. You\'ll receive a confirmation email with all the details.'
  },
  {
    category: 'booking',
    question: 'Can I cancel or reschedule my booking?',
    answer: 'Yes, you can cancel or reschedule your booking according to our cancellation policy. Full refunds are available for cancellations made 7+ days before the experience, and partial refunds for cancellations 3-7 days prior. No refunds are available for cancellations less than 3 days before.'
  },
  {
    category: 'booking',
    question: 'Can I book for a group?',
    answer: 'Absolutely! Most experiences can accommodate groups, with the maximum size specified in each listing. For larger groups, contact the host directly to arrange a private experience.'
  },
  {
    category: 'experience',
    question: 'What should I expect during an experience?',
    answer: 'Each experience is unique, but all offer an authentic glimpse into local culture. Expect to learn, participate, and connect with your host and possibly other participants. Details about what\'s included, duration, and what to bring are listed on each experience page.'
  },
  {
    category: 'experience',
    question: 'Are experiences suitable for children?',
    answer: 'Many experiences are family-friendly, indicated by a "Family Friendly" tag. The experience page will specify minimum age requirements if applicable. If you have specific questions, you can message the host before booking.'
  },
  {
    category: 'payments',
    question: 'What payment methods are accepted?',
    answer: 'We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely through our payment partner.'
  },
  {
    category: 'payments',
    question: 'Are there any hidden fees?',
    answer: 'No, the price displayed includes all fees and taxes. There are no additional charges unless you opt for extras offered by the host.'
  },
  {
    category: 'hosts',
    question: 'How can I become a host?',
    answer: 'To become a host, visit our "For Operators" page, fill out an application, and our team will review it. We look for hosts who are passionate about sharing authentic cultural experiences and have unique knowledge or skills.'
  },
  {
    category: 'hosts',
    question: 'How much does it cost to be a host?',
    answer: 'There\'s no upfront cost to become a host. Culturin takes a percentage of each booking made through our platform. Details are provided during the application process.'
  },
];

const FAQs = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('general');
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const filteredFAQs = faqItems.filter(item => item.category === activeCategory);
  
  return (
    <>
      <Header type="traveler" />
      
      <main className="pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="relative bg-culturin-accent text-white py-12 md:py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop"
              alt="Frequently Asked Questions"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="container-custom relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-lg md:text-xl opacity-90">Find answers to common questions about Culturin, experiences, and more.</p>
            </div>
          </div>
        </section>
        
        {/* FAQs Section */}
        <section ref={ref} className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="container-custom">
            {/* Category Tabs */}
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
            
            {/* FAQ List */}
            <div className={`transition-opacity duration-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
              <div className="max-w-3xl mx-auto">
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
              </div>
            </div>
            
            {/* Still Have Questions */}
            <div className="mt-16 bg-gray-50 rounded-xl p-8 md:p-10 max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <HelpCircle className="w-16 h-16 text-culturin-indigo" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
                  <p className="text-gray-600 mb-6">
                    Our team is just a message away. Reach out to us for personalized assistance with any questions or concerns.
                  </p>
                  <Button 
                    onClick={() => navigate('/contact')}
                    className="bg-culturin-indigo hover:bg-culturin-indigo/80"
                  >
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Quick Links Section */}
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Quick Links</h2>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-soft flex flex-col items-center text-center">
                <div className="bg-culturin-indigo/10 p-4 rounded-full mb-4">
                  <Users className="w-8 h-8 text-culturin-indigo" />
                </div>
                <h3 className="font-bold text-lg mb-2">Community</h3>
                <p className="text-gray-600 mb-4">Connect with like-minded travelers and explore our global community.</p>
                <Button variant="outline" onClick={() => navigate('/for-operators')} className="mt-auto">
                  Join Us
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-soft flex flex-col items-center text-center">
                <div className="bg-culturin-indigo/10 p-4 rounded-full mb-4">
                  <Shield className="w-8 h-8 text-culturin-indigo" />
                </div>
                <h3 className="font-bold text-lg mb-2">Privacy Policy</h3>
                <p className="text-gray-600 mb-4">Learn about how we protect your data and privacy rights.</p>
                <Button variant="outline" onClick={() => navigate('/privacy')} className="mt-auto">
                  Learn More
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-soft flex flex-col items-center text-center">
                <div className="bg-culturin-indigo/10 p-4 rounded-full mb-4">
                  <Contact className="w-8 h-8 text-culturin-indigo" />
                </div>
                <h3 className="font-bold text-lg mb-2">Contact</h3>
                <p className="text-gray-600 mb-4">Get in touch with our friendly support team for personalized help.</p>
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

export default FAQs;

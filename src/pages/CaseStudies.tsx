'use client'

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Header from '@/components/Header';
import NewFooter from '@/components/sections/NewFooter';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BadgeCheck, ChevronRight, Images, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from "@/components/ui/image";
import { Input } from '@/components/ui/input';

interface CaseStudy {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  tags: string[];
  excerpt: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial: {
    quote: string;
    author: string;
    position: string;
  };
  image: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'barcelona-tapas-tours',
    title: 'Doubling Bookings for Barcelona Tapas Tours',
    company: 'Barcelona Tapas Tours',
    location: 'Barcelona, Spain',
    category: 'food-tours',
    tags: ['Food Tours', 'Booking System', 'Marketing'],
    excerpt: 'How a small food tour business increased direct bookings by 100% and saved 15 hours per week on administrative tasks.',
    challenge: 'Barcelona Tapas Tours was struggling with manual booking processes, limited visibility online, and difficulty showcasing the authentic cultural value of their experiences. They were spending too much time on administration and not enough on delivering amazing experiences.',
    solution: 'Implementing Culturin\'s booking platform with integrated payment processing, multilingual support, and mobile-optimized booking flow. They also leveraged our storytelling tools to create compelling cultural narratives around each tour stop.',
    results: [
      'Increased direct bookings by 100% in the first six months',
      'Reduced administrative work by 15 hours per week',
      'Improved customer satisfaction ratings from 4.3 to 4.9 stars',
      'Expanded their tour offerings from 3 to 8 different experiences'
    ],
    testimonial: {
      quote: "Since using Culturin, our bookings have increased by 65% and the itinerary builder saved me countless hours of work.",
      author: "Maria Sanchez",
      position: "Owner, Barcelona Tapas Tours"
    },
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 'tokyo-cultural-walks',
    title: 'Optimizing Pricing Strategy for Tokyo Cultural Walks',
    company: 'Tokyo Cultural Walks',
    location: 'Tokyo, Japan',
    category: 'walking-tours',
    tags: ['Walking Tours', 'Data Analytics', 'Pricing Strategy'],
    excerpt: 'How data-driven insights helped this walking tour company optimize their pricing and increase annual revenue by 40%.',
    challenge: 'Tokyo Cultural Walks was unsure how to price their specialized cultural experiences. Their pricing was inconsistent, leaving money on the table for premium experiences while overpricing others, resulting in lower booking rates.',
    solution: 'Culturin\'s analytics dashboard helped them analyze market rates, booking patterns, and customer demographics. With our A/B testing tools for pricing, they found the optimal price points for different tour types and seasons.',
    results: [
      'Increased average booking value by 35%',
      'Boosted overall booking conversion rate by 28%',
      'Identified optimal seasonal pricing strategy',
      'Introduced premium tour offerings with 60% higher margins'
    ],
    testimonial: {
      quote: "The analytics dashboard helped us identify our most profitable experiences and optimize our pricing strategy.",
      author: "Kenji Yamamoto",
      position: "Founder, Tokyo Cultural Walks"
    },
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 'lagos-food-journeys',
    title: 'Authentic Storytelling for Lagos Food Journeys',
    company: 'Lagos Food Journeys',
    location: 'Lagos, Nigeria',
    category: 'culinary-experiences',
    tags: ['Food Experiences', 'Storytelling', 'Cultural Heritage'],
    excerpt: 'How an emerging culinary tour company used storytelling tools to create immersive experiences that resonated with international travelers.',
    challenge: 'Lagos Food Journeys offered amazing authentic cuisine experiences but struggled to communicate the rich cultural context behind their food tours. Their website and listings failed to capture the essence of Nigerian culinary traditions.',
    solution: 'Using Culturin\'s storytelling tools, they created rich multimedia presentations for each food stop, complete with historical context, cultural significance, and personal stories from local chefs and food producers.',
    results: [
      'Increased international bookings by 120%',
      'Grew social media following by 300% in one year',
      'Featured in three international travel publications',
      'Successfully launched a premium "Chef\'s Table" experience at 3x their standard tour price'
    ],
    testimonial: {
      quote: "The storytelling tools helped us communicate our cultural heritage in ways that truly resonated with travelers.",
      author: "Aisha Okafor",
      position: "Founder, Lagos Food Journeys"
    },
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1000&auto=format&fit=crop"
  }
];

const categories = [
  {id: 'all', name: 'All Categories'},
  {id: 'food-tours', name: 'Food Tours'},
  {id: 'walking-tours', name: 'Walking Tours'}, 
  {id: 'culinary-experiences', name: 'Culinary'}
];

const CaseStudies = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const filteredCaseStudies = searchQuery 
    ? caseStudies.filter(study => 
        study.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        study.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    : selectedCategory === 'all' 
      ? caseStudies 
      : caseStudies.filter(study => study.category === selectedCategory);
  
  const handleCaseStudyClick = (study: CaseStudy) => {
    setSelectedCaseStudy(study);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header type="traveler" />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative bg-blue-600 text-white py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
              alt="Case Studies"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-blue-600/70"></div>
          </div>
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">Case Studies</h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Discover how tour operators and cultural experience hosts around the world are growing their businesses with Culturin.
              </p>
              
              <div className="mt-8 relative max-w-xl mx-auto">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search for case studies..."
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
        
        {/* Case Studies Content */}
        <section ref={ref} className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            {selectedCaseStudy ? (
              // Detailed Case Study View
              <div className="animate-fade-in">
                <Button 
                  variant="ghost" 
                  className="mb-6 text-blue-600"
                  onClick={() => setSelectedCaseStudy(null)}
                >
                  ← Back to all case studies
                </Button>
                
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2">{selectedCaseStudy.title}</h2>
                  <p className="text-lg text-gray-600">{selectedCaseStudy.company} • {selectedCaseStudy.location}</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                  <div className="lg:col-span-2">
                    <div className="aspect-video rounded-xl overflow-hidden mb-8">
                      <Image
                        src={selectedCaseStudy.image}
                        alt={selectedCaseStudy.company}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="prose max-w-none">
                      <h3 className="text-xl font-semibold mb-4">The Challenge</h3>
                      <p className="mb-6">{selectedCaseStudy.challenge}</p>
                      
                      <h3 className="text-xl font-semibold mb-4">Our Solution</h3>
                      <p className="mb-6">{selectedCaseStudy.solution}</p>
                      
                      <h3 className="text-xl font-semibold mb-4">Results</h3>
                      <ul className="space-y-2 mb-6">
                        {selectedCaseStudy.results.map((result, index) => (
                          <li key={index} className="flex items-start">
                            <BadgeCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-1">
                    <Card className="bg-gray-50 border-0 shadow-soft">
                      <CardContent className="p-6">
                        <div className="mb-8">
                          <p className="text-lg italic mb-4">"{selectedCaseStudy.testimonial.quote}"</p>
                          <p className="font-medium">{selectedCaseStudy.testimonial.author}</p>
                          <p className="text-sm text-gray-600">{selectedCaseStudy.testimonial.position}</p>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-medium">Category</h4>
                          <p className="capitalize text-gray-700">
                            {selectedCaseStudy.category.replace('-', ' ')}
                          </p>
                          
                          <h4 className="font-medium">Tags</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedCaseStudy.tags.map(tag => (
                              <span 
                                key={tag} 
                                className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-8">
                          <Button 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => window.location.href = "/demo"}
                          >
                            Get similar results
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-6">More Case Studies</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {caseStudies
                      .filter(study => study.id !== selectedCaseStudy.id)
                      .slice(0, 3)
                      .map(study => (
                        <Card 
                          key={study.id}
                          className="overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer border border-gray-100"
                          onClick={() => handleCaseStudyClick(study)}
                        >
                          <div className="aspect-video">
                            <Image
                              src={study.image}
                              alt={study.company}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="p-5">
                            <h3 className="font-semibold text-lg mb-1 line-clamp-2">{study.title}</h3>
                            <p className="text-sm text-gray-600 mb-3">{study.company}</p>
                            <p className="text-gray-700 line-clamp-2">{study.excerpt}</p>
                          </CardContent>
                        </Card>
                      ))
                    }
                  </div>
                </div>
              </div>
            ) : (
              // Case Studies List View
              <div>
                {/* Search Results Label */}
                {searchQuery && (
                  <div className="mb-8 text-center">
                    <h2 className="text-xl font-semibold">
                      Search results for "{searchQuery}"
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {filteredCaseStudies.length} results found
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
                
                {!searchQuery && (
                  <div className="max-w-xl mx-auto text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Success Stories from Real Customers</h2>
                    <p className="text-gray-600">
                      See how businesses like yours achieved remarkable results with Culturin's platform
                    </p>
                  </div>
                )}
                
                {!searchQuery && (
                  <div className="mb-12 overflow-x-auto whitespace-nowrap">
                    <div className="flex space-x-2 md:space-x-6 justify-center">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`px-5 py-3 rounded-lg transition-all text-sm md:text-base font-medium ${
                            selectedCategory === category.id
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCaseStudies.map((study) => (
                    <Card 
                      key={study.id}
                      className={`overflow-hidden h-full hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 ${
                        inView ? 'animate-fade-in' : 'opacity-0'
                      }`}
                      onClick={() => handleCaseStudyClick(study)}
                    >
                      <div className="aspect-video">
                        <Image
                          src={study.image}
                          alt={study.company}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                          <p className="text-gray-600">{study.company} • {study.location}</p>
                        </div>
                        <p className="text-gray-700 mb-6">{study.excerpt}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex flex-wrap gap-2">
                            {study.tags.slice(0, 2).map((tag) => (
                              <span 
                                key={tag}
                                className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <span className="text-blue-600 flex items-center text-sm font-medium">
                            Read more <ChevronRight className="h-4 w-4 ml-1" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {filteredCaseStudies.length === 0 && (
                  <div className="text-center py-12">
                    <Images className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No case studies found</h3>
                    <p className="text-gray-600 mb-6">We don't have any case studies in this category yet.</p>
                    <Button 
                      variant="outline"
                      onClick={() => setSelectedCategory('all')}
                    >
                      View all case studies
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-[#F8F7FF] py-16">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to achieve similar results?</h2>
              <p className="text-gray-600 mb-8">
                Join thousands of cultural experience providers who have transformed their businesses with our platform.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => window.location.href = "/demo"}
                >
                  Get a Free Demo
                </Button>
                <Button 
                  variant="outline"
                  className="border-blue-600 text-blue-600"
                  onClick={() => window.location.href = "/contact"}
                >
                  Talk to Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <NewFooter />
    </div>
  );
};

export default CaseStudies;

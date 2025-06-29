'use client'

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { Users, Calendar, Briefcase } from "lucide-react";

const OurStoryPage = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  
  useEffect(() => {
    setAnimateItems(true);
  }, []);

  const milestones = [
    {
      year: "2022",
      title: "Culturin Was Born",
      description: "Founded with the mission of making cultural tourism more accessible and authentic for travelers and operators alike."
    },
    {
      year: "2023",
      title: "First 100 Partners",
      description: "We celebrated onboarding our first 100 cultural tour operators across 15 countries."
    },
    {
      year: "2024",
      title: "Culturin Pro Launch",
      description: "We launched our professional tools for tour operators, helping them create and manage their experiences."
    },
    {
      year: "2025",
      title: "Global Expansion",
      description: "Expanding our presence to over 50 countries with 1,000+ operators using our platform."
    }
  ];

  const values = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Cultural Connection",
      description: "We believe that authentic cultural connections transform both travelers and communities."
    },
    {
      icon: <Briefcase className="h-8 w-8 text-blue-600" />,
      title: "Operator Empowerment",
      description: "We're committed to giving cultural experience creators the tools they need to thrive."
    },
    {
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
      title: "Responsible Tourism",
      description: "We promote tourism that respects and preserves cultural heritage and local communities."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Our Story
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10">
                Founded by passionate travelers and cultural enthusiasts, Culturin was born from a simple idea: make cultural experiences more accessible, authentic, and rewarding for everyone involved.
              </p>
            </div>
            <div className="mt-16 aspect-video max-w-5xl overflow-hidden rounded-xl">
              <img 
                src="https://images.unsplash.com/photo-1469041797191-50ace28483c3?q=80&w=2000&auto=format&fit=crop" 
                alt="Culturin team" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                "To transform cultural tourism by connecting travelers with authentic cultural experiences and empowering local experience creators with the tools to share their heritage."
              </p>
            </div>
          </div>
        </section>
        
        {/* Milestones Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-16 text-center">Our Journey</h2>
            
            <div className="max-w-4xl mx-auto">
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className={`flex flex-col md:flex-row items-start md:items-center mb-16 last:mb-0 transition-all duration-500 ${
                    animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{transitionDelay: `${index * 100}ms`}}
                >
                  <div className="md:w-1/4 mb-4 md:mb-0">
                    <span className="text-4xl font-bold text-blue-600">{milestone.year}</span>
                  </div>
                  <div className="md:w-3/4 md:pl-8">
                    <h3 className="text-2xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                    {index < milestones.length - 1 && (
                      <div className="hidden md:block h-16 border-l border-gray-300 mt-8 ml-4"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-16 text-center">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className={`bg-white p-8 rounded-xl shadow-sm text-center transition-all duration-500 ${
                    animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{transitionDelay: `${200 + index * 100}ms`}}
                >
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Meet Our Leadership</h2>
            <p className="text-lg text-gray-600 mb-16 text-center max-w-3xl mx-auto">
              Our diverse team brings together expertise in travel, technology, and cultural heritage preservation.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Sarah Chen",
                  role: "Co-Founder & CEO",
                  bio: "Former travel guide with a passion for connecting people across cultures.",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop"
                },
                {
                  name: "Miguel Rodriguez",
                  role: "Co-Founder & CTO",
                  bio: "Tech entrepreneur focused on creating tools that empower small businesses.",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop"
                },
                {
                  name: "Aisha Kumar",
                  role: "Chief Experience Officer",
                  bio: "Cultural anthropologist and experience design expert with 15+ years in tourism.",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&auto=format&fit=crop"
                }
              ].map((person, index) => (
                <div 
                  key={index}
                  className={`transition-all duration-500 ${
                    animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{transitionDelay: `${400 + index * 100}ms`}}
                >
                  <div className="aspect-square bg-gray-100 rounded-xl mb-4 overflow-hidden">
                    <img 
                      src={person.image} 
                      alt={person.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{person.name}</h3>
                  <p className="text-blue-600 mb-2">{person.role}</p>
                  <p className="text-gray-600">{person.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OurStoryPage;

'use client'

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, ChevronRight } from "lucide-react";
import { Link } from "../../lib/navigation";
import Image from "@/components/ui/image";

const CareersPage = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  
  useEffect(() => {
    setAnimateItems(true);
  }, []);
  
  const openings = [
    {
      id: "senior-fullstack-dev",
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time"
    },
    {
      id: "content-marketing",
      title: "Content Marketing Specialist",
      department: "Marketing",
      location: "New York",
      type: "Full-time"
    },
    {
      id: "ux-ui-designer",
      title: "UX/UI Designer",
      department: "Product",
      location: "Remote",
      type: "Full-time"
    },
    {
      id: "customer-success",
      title: "Customer Success Manager",
      department: "Operations",
      location: "London",
      type: "Full-time"
    },
    {
      id: "growth-marketing",
      title: "Growth Marketing Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time"
    }
  ];

  const perks = [
    "Remote-first work environment",
    "Flexible working hours",
    "Annual workations to experience cultural activities",
    "Competitive salary & equity",
    "Health, dental and vision benefits",
    "Learning & development budget",
    "Home office stipend",
    "Generous time off policy",
    "Parental leave",
    "Mental health resources"
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
                Join Our Team
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10">
                Help us transform cultural tourism. We're looking for passionate people to join our mission of connecting travelers with authentic experiences.
              </p>
              <Link to="/careers/open-positions">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white py-6 px-8 rounded-xl h-auto text-lg"
                >
                  View open positions
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Culture Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Culture</h2>
                <p className="text-lg text-gray-600 mb-6">
                  At Culturin, we're building a team as diverse and vibrant as the cultural experiences we help showcase. We believe in:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <p><span className="font-semibold">Impact-driven work</span> - Everything we do is focused on making meaningful differences for cultural experience creators and travelers.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <p><span className="font-semibold">Continuous learning</span> - We're curious by nature and always looking to grow, both professionally and personally.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <p><span className="font-semibold">Inclusivity</span> - We celebrate diversity of thought, background, and experience in our team and the communities we serve.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <p><span className="font-semibold">Balance</span> - We work hard and respect the importance of disconnecting and experiencing life beyond work.</p>
                  </li>
                </ul>
              </div>
              <div className="aspect-square rounded-xl overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2000&auto=format&fit=crop" alt="Culturin team culture" className="w-full h-full object-cover" fill />
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Perks & Benefits</h2>
            <p className="text-lg text-gray-600 mb-16 text-center max-w-3xl mx-auto">
              We believe in taking care of our team so they can focus on making an impact.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
              {perks.map((perk, index) => (
                <div 
                  key={index}
                  className={`bg-gray-50 p-4 rounded-xl text-center transition-all duration-500 ${
                    animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{transitionDelay: `${index * 50}ms`}}
                >
                  <p className="font-medium">{perk}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Open Positions Section */}
        <section id="openings" className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Open Positions</h2>
            <p className="text-lg text-gray-600 mb-16 text-center max-w-3xl mx-auto">
              Join our team and help shape the future of cultural experiences.
            </p>
            
            <div className="max-w-4xl mx-auto space-y-4">
              {openings.map((job, index) => (
                <Card 
                  key={index}
                  className={`p-6 transition-all duration-500 ${
                    animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{transitionDelay: `${200 + index * 100}ms`}}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
                        <span>{job.department}</span>
                        <Separator orientation="vertical" className="h-4 hidden md:block" />
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{job.location}</span>
                        </div>
                        <Separator orientation="vertical" className="h-4 hidden md:block" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                    <Link to={`/careers/apply/${job.id}`}>
                      <Button 
                        className="mt-4 md:mt-0 bg-white hover:bg-gray-50 text-blue-600 border border-blue-600"
                      >
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-gray-600 mb-4">Don't see the right fit? We're always looking for talented people.</p>
              <a href="mailto:support@culturin.com">
                <Button>
                  Send us your resume
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CareersPage;

'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useInView } from "react-intersection-observer";
import { ChevronRight, ChevronLeft, TrendingUp, Star, Calendar, Users } from "lucide-react";
import Image from "@/components/ui/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const benefits = [
  {
    id: 1,
    title: "80% Average Booking Growth",
    description: "Operators using Pro see increased bookings within 3 months",
    icon: <TrendingUp className="h-6 w-6 text-green-500" />,
    color: "bg-green-50 border-green-200"
  },
  {
    id: 2,
    title: "4.9/5 Operator Satisfaction",
    description: "Join our community of happy cultural hosts & travel entrepreneurs",
    icon: <Star className="h-6 w-6 text-amber-500" />,
    color: "bg-amber-50 border-amber-200"
  },
  {
    id: 3,
    title: "Save 10+ Hours Weekly",
    description: "Automated tools free up time to focus on your experiences",
    icon: <Calendar className="h-6 w-6 text-blue-500" />,
    color: "bg-blue-50 border-blue-200"
  },
  {
    id: 4,
    title: "1,000+ Pro Users",
    description: "Join a growing community of cultural experience operators",
    icon: <Users className="h-6 w-6 text-purple-500" />,
    color: "bg-purple-50 border-purple-200"
  }
];

const testimonials = [
  {
    id: 1,
    quote: "Culturin Pro transformed how I run my cooking classes. The booking system alone saved me hours each week.",
    author: "Maria L.",
    location: "Barcelona, Spain",
    image: "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png"
  },
  {
    id: 2,
    quote: "As a small team running cultural tours, the analytics tools helped us understand exactly where to focus our efforts.",
    author: "Ahmed K.",
    location: "Marrakech, Morocco",
    image: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png"
  },
  {
    id: 3,
    quote: "The website builder made it easy to create a professional online presence that truly represents our cultural experiences.",
    author: "Priya S.",
    location: "Jaipur, India",
    image: "/lovable-uploads/31055680-5e98-433a-a30a-747997259663.png"
  }
];

const ProBenefitsCarousel = () => {
  const [isHovering, setIsHovering] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <div ref={ref} className="py-12">
      {/* Key Benefits */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-6 text-center">Why Cultural Operators Choose Pro</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit) => (
            <Card 
              key={benefit.id} 
              className={`border ${benefit.color} transform transition-all duration-300 hover:scale-[1.02] hover:shadow-md`}
            >
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="mr-4">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{benefit.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{benefit.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div 
        className="mb-8"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <h3 className="text-xl font-semibold mb-6 text-center">What Our Pro Members Say</h3>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
          ref={carouselRef}
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 h-full flex flex-col">
                  <div className="relative h-48">
                    <Image 
                      src={testimonial.image}
                      alt={`${testimonial.author} from ${testimonial.location}`}
                      className="w-full h-full object-cover"
                      fill={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <Badge className="mb-2 bg-culturin-indigo text-white border-none">Pro Member</Badge>
                        <p className="font-medium">{testimonial.author}</p>
                        <p className="text-sm opacity-90">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-6 gap-2">
            <CarouselPrevious className="relative static -left-0 rounded-full h-10 w-10 border-gray-300 bg-white hover:bg-gray-100">
              <ChevronLeft className="h-5 w-5" />
            </CarouselPrevious>
            <CarouselNext className="relative static -right-0 rounded-full h-10 w-10 border-gray-300 bg-white hover:bg-gray-100">
              <ChevronRight className="h-5 w-5" />
            </CarouselNext>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default ProBenefitsCarousel;


import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MessageSquare, Mail, User, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import Header from '../components/Header';
import Footer from '../components/sections/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

const Contact = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Form submitted:", data);
    toast.success("Message sent successfully! We'll get back to you soon.");
    
    reset();
    setIsSubmitting(false);
  };

  return (
    <>
      <Header type="traveler" />
      
      <main className="pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="relative bg-culturin-accent text-white py-12 md:py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="/public/lovable-uploads/8ee97e98-fd03-4f2b-8d3e-dcb87af6a6ba.png"
              alt="Contact us"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="container-custom relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Contact Us</h1>
              <p className="text-lg md:text-xl opacity-90">Have questions or feedback? Reach out to our team and we'll get back to you as soon as possible.</p>
            </div>
          </div>
        </section>
        
        {/* Contact Form Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">Get In Touch</h2>
                  <p className="text-gray-600 mb-8">
                    We're here to help with any questions about our experiences, becoming a host, 
                    or how Culturin works. Our team will get back to you within 24 hours.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-3 rounded-lg mr-4">
                      <Mail className="w-6 h-6 text-culturin-indigo" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Email</h3>
                      <p className="text-gray-600"><a href="mailto:hello@culturin.com" className="hover:underline">hello@culturin.com</a></p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-3 rounded-lg mr-4">
                      <MessageSquare className="w-6 h-6 text-culturin-indigo" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Social Media</h3>
                      <p className="text-gray-600">
                        <a href="https://instagram.com/culturin" target="_blank" rel="noopener noreferrer" className="hover:underline mr-2">Instagram</a> | 
                        <a href="https://linkedin.com/company/culturin" target="_blank" rel="noopener noreferrer" className="hover:underline ml-2">LinkedIn</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-3 rounded-lg mr-4">
                      <Info className="w-6 h-6 text-culturin-indigo" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Support</h3>
                      <p className="text-gray-600">See our <a href="/faqs" className="text-culturin-indigo hover:underline">FAQs</a> for quick answers to common questions.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="bg-white rounded-lg shadow-soft p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <div className="mt-1 relative">
                      <Input 
                        id="name"
                        placeholder="Enter your full name"
                        {...register("name")}
                        className={`pl-10 ${errors.name ? "border-red-500" : ""}`}
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="mt-1 relative">
                      <Input 
                        id="email"
                        type="email"
                        placeholder="Your email address"
                        {...register("email")}
                        className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <div className="mt-1">
                      <Input 
                        id="subject"
                        placeholder="What is your message about?"
                        {...register("subject")}
                        className={errors.subject ? "border-red-500" : ""}
                      />
                    </div>
                    {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <div className="mt-1">
                      <Textarea 
                        id="message"
                        placeholder="Your message..."
                        rows={5}
                        {...register("message")}
                        className={errors.message ? "border-red-500" : ""}
                      />
                    </div>
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                  </div>
                  
                  <div>
                    <Button 
                      type="submit" 
                      className="w-full bg-culturin-indigo hover:bg-culturin-indigo/80"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Contact;

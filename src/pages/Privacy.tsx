'use client'

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Shield, ShieldCheck } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/sections/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from '../../lib/navigation';

const Privacy = () => {
  const navigate = useNavigate();
  
  const { ref: contentRef, inView: contentInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const lastUpdated = "May 1, 2025";
  
  return (
    <>
      <Header type="traveler" />
      
      <main className="pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="relative bg-culturin-accent text-white py-12 md:py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="/public/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png"
              alt="Privacy Policy"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="container-custom relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-lg md:text-xl opacity-90">How we protect your information and respect your privacy.</p>
              <p className="mt-4 text-base opacity-75">Last updated: {lastUpdated}</p>
            </div>
          </div>
        </section>
        
        {/* Content Section */}
        <section ref={contentRef} className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="container-custom max-w-4xl">
            <div className={`transition-all duration-700 ${contentInView ? 'opacity-100' : 'opacity-0'}`}>
              <div className="bg-white p-6 md:p-10 rounded-lg shadow-soft mb-10">
                <div className="flex items-center mb-6">
                  <ShieldCheck className="text-culturin-indigo w-8 h-8 mr-3" />
                  <h2 className="text-2xl font-bold">Our Commitment to Your Privacy</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  At Culturin, we value your privacy and are committed to protecting your personal data. 
                  This Privacy Policy explains how we collect, use, and safeguard your information when 
                  you use our platform to discover and book cultural experiences or offer your services as a host.
                </p>
                <p className="text-gray-600">
                  We designed Culturin with your privacy in mind and ensure that all data processing complies with 
                  applicable data protection regulations, including GDPR and CCPA where applicable.
                </p>
              </div>
              
              <div className="space-y-12 text-gray-700">
                <section>
                  <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                  <div className="space-y-4">
                    <div className="pl-5 border-l-2 border-culturin-indigo">
                      <h3 className="font-semibold text-xl">Personal Information</h3>
                      <p className="mt-2">
                        When you create an account, we collect your name, email address, phone number, 
                        and payment information. For hosts, we may collect additional verification information.
                      </p>
                    </div>
                    
                    <div className="pl-5 border-l-2 border-culturin-indigo">
                      <h3 className="font-semibold text-xl">Usage Information</h3>
                      <p className="mt-2">
                        We collect information about how you interact with our platform, including browsing history,
                        searches, bookings, and communications with hosts or travelers.
                      </p>
                    </div>
                    
                    <div className="pl-5 border-l-2 border-culturin-indigo">
                      <h3 className="font-semibold text-xl">Device Information</h3>
                      <p className="mt-2">
                        We may collect information about your device, including IP address, browser type,
                        operating system, and mobile device identifiers.
                      </p>
                    </div>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>To facilitate bookings and payments between travelers and hosts</li>
                    <li>To provide customer support and respond to inquiries</li>
                    <li>To personalize your experience and recommend relevant experiences</li>
                    <li>To ensure the security and proper functioning of our platform</li>
                    <li>To communicate important updates and marketing information (with your consent)</li>
                    <li>To comply with legal obligations and resolve disputes</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">3. How We Share Your Information</h2>
                  <p className="mb-4">
                    We share your information in the following circumstances:
                  </p>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold text-lg">Between Travelers and Hosts</h3>
                      <p className="mt-1 text-sm">
                        We share necessary contact and booking information between travelers and hosts to facilitate experiences.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold text-lg">Service Providers</h3>
                      <p className="mt-1 text-sm">
                        We work with trusted third parties to provide services such as payment processing, 
                        customer support, and data analysis.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold text-lg">Legal Requirements</h3>
                      <p className="mt-1 text-sm">
                        We may disclose information if required by law, regulation, legal process, or 
                        governmental request.
                      </p>
                    </div>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">4. Your Rights and Choices</h2>
                  <p className="mb-4">
                    Depending on your location, you may have the following rights regarding your personal data:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 p-4 rounded-md">
                      <h3 className="font-semibold">Access and Portability</h3>
                      <p className="mt-1 text-sm">
                        Request a copy of your personal data in a structured format.
                      </p>
                    </div>
                    
                    <div className="border border-gray-200 p-4 rounded-md">
                      <h3 className="font-semibold">Correction</h3>
                      <p className="mt-1 text-sm">
                        Update or correct inaccurate information.
                      </p>
                    </div>
                    
                    <div className="border border-gray-200 p-4 rounded-md">
                      <h3 className="font-semibold">Deletion</h3>
                      <p className="mt-1 text-sm">
                        Request deletion of your personal data in certain circumstances.
                      </p>
                    </div>
                    
                    <div className="border border-gray-200 p-4 rounded-md">
                      <h3 className="font-semibold">Restriction and Objection</h3>
                      <p className="mt-1 text-sm">
                        Limit or object to how we process your data.
                      </p>
                    </div>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">5. Security</h2>
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal data 
                    against unauthorized access, alteration, disclosure, or destruction. While we strive to 
                    protect your personal information, no method of transmission over the Internet or electronic 
                    storage is 100% secure.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">6. International Data Transfers</h2>
                  <p>
                    Your information may be transferred to and processed in countries outside of your country of 
                    residence, where data protection laws may differ. We ensure appropriate safeguards are in place 
                    to protect your information in accordance with this Privacy Policy.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">7. Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices or for 
                    other operational, legal, or regulatory reasons. We will notify you of any material changes by 
                    posting the updated policy on our website or by other means.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
                  <p className="mb-6">
                    If you have any questions about this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="font-semibold mb-1">Email:</p>
                    <p className="mb-3"><a href="mailto:privacy@culturin.com" className="text-culturin-indigo hover:underline">privacy@culturin.com</a></p>
                    
                    <p className="font-semibold mb-1">Address:</p>
                    <p className="mb-3">Culturin Privacy Team<br />123 Cultural Street<br />San Francisco, CA 94103<br />United States</p>
                    
                    <Button 
                      onClick={() => navigate('/contact')}
                      className="mt-2 bg-culturin-indigo hover:bg-culturin-indigo/80"
                    >
                      Contact Us
                    </Button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Privacy;

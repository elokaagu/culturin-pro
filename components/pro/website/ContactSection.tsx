
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface ContactSectionProps {
  primaryColor: string;
  companyName: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ primaryColor, companyName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent!', {
        description: 'We will get back to you as soon as possible.'
      });
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            Have questions about {companyName}? We'd love to hear from you!
          </p>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows={4}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={submitting}
                className="w-full"
                style={{ backgroundColor: primaryColor }}
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
            
            <div className="mt-10 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Other Ways to Reach Us</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">info@example.com</p>
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">+1 (123) 456-7890</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

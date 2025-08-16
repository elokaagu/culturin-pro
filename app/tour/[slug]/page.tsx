"use client";

import React, { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { userWebsiteService, UserWebsiteData } from "@/components/pro/website/UserWebsiteService";
import { Experience } from "@/lib/experience-service";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface PublishedWebsiteProps {
  params: {
    slug: string;
  };
}

const PublishedWebsite: React.FC<PublishedWebsiteProps> = ({ params }) => {
  const [websiteData, setWebsiteData] = useState<UserWebsiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWebsiteData = async () => {
      try {
        setLoading(true);
        
        // Extract user ID from the slug (format: tour/company-name-userid)
        const slugParts = params.slug.split('-');
        if (slugParts.length < 2) {
          setError("Invalid website URL");
          return;
        }

        // The user ID is the last part after the company name
        const userId = slugParts[slugParts.length - 1];
        
        // Load the user's website data
        const data = await userWebsiteService.getUserWebsiteData(userId);
        
        if (data && data.settings) {
          setWebsiteData(data);
        } else {
          setError("Website not found");
        }
      } catch (error) {
        console.error("Error loading website:", error);
        setError("Failed to load website");
      } finally {
        setLoading(false);
      }
    };

    loadWebsiteData();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your website...</p>
        </div>
      </div>
    );
  }

  if (error || !websiteData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Website Not Found</h1>
          <p className="text-gray-600 mb-4">{error || "This website could not be loaded."}</p>
          <p className="text-sm text-gray-500">Please check the URL or contact the website owner.</p>
        </div>
      </div>
    );
  }

  const settings = websiteData.settings;
  const experiences = websiteData.experiences || [];
  const companyName = settings.company_name || "Your Tour Company";
  const tagline = settings.tagline || "Discover Amazing Cultural Experiences";
  const description = settings.description || "We specialize in creating authentic cultural experiences that connect you with local traditions and communities.";
  const primaryColor = settings.branding?.primary_color || "#3B82F6";
  const theme = settings.branding?.theme || "classic";
  const logoUrl = settings.branding?.logo_url || "";
  const headerImage = settings.branding?.header_image || "";

  // Get theme styles based on selected theme
  const getThemeStyles = () => {
    switch (theme) {
      case "adventure":
        return {
          heroClass: "bg-gradient-to-br from-green-400 to-blue-500",
          headingClass: "text-white font-bold",
          textClass: "text-white",
          cardClass: "bg-white border border-gray-200 rounded-lg shadow-lg",
          buttonClass: "bg-white text-green-600 hover:bg-gray-100",
          navClass: "bg-white",
          sectionClass: "bg-gray-50",
        };
      case "cultural":
        return {
          heroClass: "bg-gradient-to-br from-amber-400 to-orange-500",
          headingClass: "text-white font-bold",
          textClass: "text-white",
          cardClass: "bg-white border border-gray-200 rounded-lg shadow-lg",
          buttonClass: "bg-white text-amber-600 hover:bg-gray-100",
          navClass: "bg-white",
          sectionClass: "bg-amber-50",
        };
      case "luxury":
        return {
          heroClass: "bg-gradient-to-br from-purple-400 to-pink-500",
          headingClass: "text-white font-bold",
          textClass: "text-white",
          cardClass: "bg-white border border-gray-200 rounded-lg shadow-lg",
          buttonClass: "bg-white text-purple-600 hover:bg-gray-100",
          navClass: "bg-white",
          sectionClass: "bg-purple-50",
        };
      case "family":
        return {
          heroClass: "bg-gradient-to-br from-blue-400 to-cyan-500",
          headingClass: "text-white font-bold",
          textClass: "text-white",
          cardClass: "bg-white border border-gray-200 rounded-lg shadow-lg",
          buttonClass: "bg-white text-blue-600 hover:bg-gray-100",
          navClass: "bg-white",
          sectionClass: "bg-blue-50",
        };
      case "eco":
        return {
          heroClass: "bg-gradient-to-br from-emerald-400 to-teal-500",
          headingClass: "text-white font-bold",
          textClass: "text-white",
          cardClass: "bg-white border border-gray-200 rounded-lg shadow-lg",
          buttonClass: "bg-white text-emerald-600 hover:bg-gray-100",
          navClass: "bg-white",
          sectionClass: "bg-emerald-50",
        };
      case "urban":
        return {
          heroClass: "bg-gradient-to-br from-gray-400 to-slate-500",
          headingClass: "text-white font-bold",
          textClass: "text-white",
          cardClass: "bg-white border border-gray-200 rounded-lg shadow-lg",
          buttonClass: "bg-white text-gray-600 hover:bg-gray-100",
          navClass: "bg-white",
          sectionClass: "bg-gray-50",
        };
      default: // classic
        return {
          heroClass: "bg-gradient-to-r from-blue-50 to-purple-50",
          headingClass: "text-gray-900 font-bold",
          textClass: "text-gray-700",
          cardClass: "bg-white border border-gray-200 rounded-lg shadow-sm",
          buttonClass: "bg-blue-600 text-white hover:bg-blue-700",
          navClass: "bg-white",
          sectionClass: "bg-white",
        };
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Hero Section */}
      <div
        className={cn("relative py-16 px-6 text-center", themeStyles.heroClass)}
        style={headerImage ? { backgroundImage: `url(${headerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      >
        {headerImage && (
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        )}
        <div className="relative z-10">
          {logoUrl && (
            <div className="mb-6">
              <img src={logoUrl} alt={companyName} className="h-20 mx-auto" />
            </div>
          )}
          <h1 className={cn("text-4xl md:text-6xl font-bold mb-4", themeStyles.headingClass)}>
            {companyName}
          </h1>
          <p className={cn("text-lg md:text-xl mb-8 max-w-2xl mx-auto", themeStyles.textClass)}>
            {tagline}
          </p>
          <button
            className={cn("px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200", themeStyles.buttonClass)}
            onClick={() => document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Our Tours
          </button>
        </div>
      </div>

      {/* Tours Section */}
      <div id="tours" className={cn("py-16 px-6", themeStyles.navClass)}>
        <div className="max-w-6xl mx-auto">
          <h2 className={cn("text-3xl md:text-4xl font-bold text-center mb-12", themeStyles.headingClass)}>
            Our Tours
          </h2>
          
          {experiences.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {experiences.map((experience, index) => (
                <div
                  key={experience.id || index}
                  className={cn("overflow-hidden rounded-lg transition-all duration-300 hover:shadow-xl", themeStyles.cardClass)}
                >
                  {experience.image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={experience.image}
                        alt={experience.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      {experience.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {experience.description}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-500">
                        {experience.days} day{experience.days !== 1 ? "s" : ""}
                      </span>
                      {experience.price && (
                        <span className="text-lg font-bold" style={{ color: primaryColor }}>
                          ${experience.price}
                        </span>
                      )}
                    </div>
                    <button
                      className="w-full py-2 px-4 text-white font-medium rounded-lg transition-colors"
                      style={{ backgroundColor: primaryColor }}
                      onClick={() => {
                        // Handle booking - could open a modal or navigate to booking page
                        alert(`Booking ${experience.title} - This would open the booking flow`);
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">
                No tours available at the moment
              </p>
              <p className="text-gray-500">
                Check back soon for exciting new experiences!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* About Section */}
      <div className={cn("py-16 px-6", themeStyles.sectionClass)}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={cn("text-3xl md:text-4xl font-bold mb-8", themeStyles.headingClass)}>
            About {companyName}
          </h2>
          <p className={cn("text-lg leading-relaxed max-w-3xl mx-auto", themeStyles.textClass)}>
            {description}
          </p>
          
          {websiteData.stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
                  {websiteData.stats.total_tours}
                </div>
                <div className="text-gray-600">Tours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
                  {websiteData.stats.total_bookings}
                </div>
                <div className="text-gray-600">Bookings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
                  {websiteData.stats.rating.toFixed(1)}
                </div>
                <div className="text-gray-600">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
                  {websiteData.stats.reviews_count}
                </div>
                <div className="text-gray-600">Reviews</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">
            Get in Touch
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {settings.contact_info?.phone && (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p className="text-gray-600">{settings.contact_info.phone}</p>
              </div>
            )}
            
            {settings.contact_info?.email && (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-gray-600">{settings.contact_info.email}</p>
              </div>
            )}
            
            {settings.contact_info?.address && (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Address</h3>
                <p className="text-gray-600">{settings.contact_info.address}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{companyName}</h3>
              <p className="text-gray-400 text-sm">
                {tagline}
              </p>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#tours" className="hover:text-white transition-colors">Our Tours</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {settings.contact_info?.email && (
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {settings.contact_info.email}
                  </li>
                )}
                {settings.contact_info?.phone && (
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {settings.contact_info.phone}
                  </li>
                )}
                {settings.contact_info?.address && (
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {settings.contact_info.address}
                  </li>
                )}
              </ul>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {settings.social_media?.facebook && (
                  <a href={settings.social_media.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
                {settings.social_media?.twitter && (
                  <a href={settings.social_media.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {settings.social_media?.instagram && (
                  <a href={settings.social_media.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
                {settings.social_media?.youtube && (
                  <a href={settings.social_media.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Youtube className="h-5 w-5" />
                  </a>
                )}
                {settings.social_media?.linkedin && (
                  <a href={settings.social_media.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {companyName}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublishedWebsite;

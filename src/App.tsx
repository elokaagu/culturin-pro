
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Demo from './pages/Demo';
import SignIn from './pages/SignIn';
import Pricing from './pages/Pricing';
import HowItWorks from './pages/HowItWorks';
import AboutUs from './pages/AboutUs';
import Careers from './pages/Careers';
import Press from './pages/Press';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import HelpCenter from './pages/HelpCenter';
import CaseStudies from './pages/CaseStudies';
import Owner from './pages/Owner';
import Traveler from './pages/Traveler';
import OperatorDashboard from './pages/OperatorDashboard';
import ProductAnalyticsPage from './pages/product/ProductAnalyticsPage';
import ProductBookingPage from './pages/product/ProductBookingPage';
import ProductCRMPage from './pages/product/ProductCRMPage';
import ProductMarketingPage from './pages/product/ProductMarketingPage';
import CulturinPro from './pages/CulturinPro';
import Contact from './pages/Contact';
import ProductBookingManagementPage from './pages/product/ProductBookingManagementPage';
import WhatsNewPage from './pages/WhatsNewPage';
import AnnouncementDetailPage from './pages/AnnouncementDetailPage';
import ProDashboardPage from './pages/ProDashboardPage';
import ProAnalytics from './pages/ProAnalytics';
import ProBookingPage from './pages/ProBookingPage';
import ProCRMPage from './pages/ProCRMPage';
import ProMarketingPage from './pages/ProMarketingPage';
import ProItineraryPage from './pages/ProItineraryPage';
import ProWebsitePage from './pages/ProWebsitePage';
import ProSettingsPage from './pages/ProSettingsPage';
import TourOperatorWebsitePage from './pages/TourOperatorWebsitePage';
import ForOperators from './pages/ForOperators';
import { Toaster } from "@/components/ui/toaster";
import OpenPositionsPage from './pages/careers/OpenPositionsPage';
import ApplicationPage from './pages/careers/ApplicationPage';
import PressArticlePage from './pages/PressArticlePage';
import OurStoryPage from './pages/OurStoryPage';
import PressPage from './pages/PressPage';
import FAQs from './pages/FAQs';
import AnalyticsScanPage from './pages/AnalyticsScanPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/our-story" element={<OurStoryPage />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/open-positions" element={<OpenPositionsPage />} />
        <Route path="/careers/apply/:jobId" element={<ApplicationPage />} />
        <Route path="/press" element={<PressPage />} />
        <Route path="/press/:articleId" element={<PressArticlePage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/owner" element={<Owner />} />
        <Route path="/traveler" element={<Traveler />} />
        <Route path="/operator" element={<OperatorDashboard />} />
        <Route path="/for-operators" element={<ForOperators />} />
        <Route path="/product/analytics" element={<ProductAnalyticsPage />} />
        <Route path="/product/booking" element={<ProductBookingPage />} />
        <Route path="/product/booking/:id" element={<ProductBookingPage />} />
        <Route path="/product/booking-management" element={<ProductBookingManagementPage />} />
        <Route path="/product/crm" element={<ProductCRMPage />} />
        <Route path="/product/marketing" element={<ProductMarketingPage />} />
        <Route path="/culturin-pro" element={<CulturinPro />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/whats-new" element={<WhatsNewPage />} />
        <Route path="/whats-new/:id" element={<AnnouncementDetailPage />} />
        <Route path="/pro-dashboard" element={<ProDashboardPage />} />
        <Route path="/pro-dashboard/analytics" element={<ProAnalytics />} />
        <Route path="/pro-dashboard/booking" element={<ProBookingPage />} />
        <Route path="/pro-dashboard/crm" element={<ProCRMPage />} />
        <Route path="/pro-dashboard/marketing" element={<ProMarketingPage />} />
        <Route path="/pro-dashboard/itinerary" element={<ProItineraryPage />} />
        <Route path="/pro-dashboard/website" element={<ProWebsitePage />} />
        <Route path="/pro-dashboard/settings" element={<ProSettingsPage />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/analytics-scan" element={<AnalyticsScanPage />} />
        
        {/* Dynamic routes for tour operator websites */}
        <Route path="/tour/:slug" element={<TourOperatorWebsitePage />} />
        <Route path="/tour/:slug/*" element={<TourOperatorWebsitePage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;

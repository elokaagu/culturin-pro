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
import { Toaster } from "@/components/ui/toaster"

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
        <Route path="/careers" element={<Careers />} />
        <Route path="/press" element={<Press />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/owner" element={<Owner />} />
        <Route path="/traveler" element={<Traveler />} />
        <Route path="/operator" element={<OperatorDashboard />} />
        <Route path="/product/analytics" element={<ProductAnalyticsPage />} />
        <Route path="/product/booking" element={<ProductBookingPage />} />
        <Route path="/product/booking/:id" element={<ProductBookingPage />} />
        <Route path="/product/booking-management" element={<ProductBookingManagementPage />} /> {/* New route added */}
        <Route path="/product/crm" element={<ProductCRMPage />} />
        <Route path="/product/marketing" element={<ProductMarketingPage />} />
        <Route path="/culturin-pro" element={<CulturinPro />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;

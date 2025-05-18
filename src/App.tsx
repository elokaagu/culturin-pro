import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import NewFooter from "./components/sections/NewFooter";
import OperatorDashboard from "./pages/OperatorDashboard";
import ForOperators from "./pages/ForOperators";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import CulturinProPage from "./pages/CulturinProPage";
import ProDashboardPage from "./pages/ProDashboardPage";
import ProBookingPage from "./pages/ProBookingPage";
import ProCRMPage from "./pages/ProCRMPage";
import ProAnalyticsPage from "./pages/ProAnalyticsPage";
import ProAnalytics from "./pages/ProAnalytics";
import ProMarketingPage from "./pages/ProMarketingPage";
import ProSettingsPage from "./pages/ProSettingsPage";
import ProItineraryPage from "./pages/ProItineraryPage";
import Index from "./pages/Index";
import PricingPage from "./pages/PricingPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import BlogPage from "./pages/BlogPage";
import OurStoryPage from "./pages/OurStoryPage";
import CareersPage from "./pages/CareersPage";
import PressPage from "./pages/PressPage";
import DemoPage from "./pages/DemoPage";
import ProductAnalyticsPage from "./pages/product/ProductAnalyticsPage";
import ProductBookingPage from "./pages/product/ProductBookingPage";
import ProductCRMPage from "./pages/product/ProductCRMPage";
import ProductMarketingPage from "./pages/product/ProductMarketingPage";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import HelpCenter from "./pages/HelpCenter";
import CaseStudies from "./pages/CaseStudies";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Remember user's last route for automatic redirects
const RouteChecker = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Skip storing routes for sign-in page
    if (location.pathname !== '/sign-in') {
      localStorage.setItem('lastRoute', location.pathname);
    }
  }, [location]);
  
  return null;
};

// Redirect component to check if user should go to their last route
const EntryPoint = () => {
  const lastRoute = localStorage.getItem('lastRoute');
  const hasProAccess = localStorage.getItem('culturinProAccess') === 'true';
  
  // If last route was pro dashboard and user has access, redirect there
  if (lastRoute?.startsWith('/pro-dashboard') && hasProAccess) {
    return <Navigate to={lastRoute} replace />;
  }
  
  // Otherwise go to homepage
  return <Navigate to="/" replace />;
};

// Page wrapper component to control footer display
const PageWithFooter = ({ Component }) => {
  const location = useLocation();
  
  // ForOperators, CulturinProPage, and ProDashboardPage already include their own Footer or don't need one
  const hideFooter = location.pathname === '/for-operators' || 
                    location.pathname === '/culturin-pro' || 
                    location.pathname.startsWith('/pro-dashboard') ||
                    location.pathname === '/pricing';
  
  return (
    <>
      <Component />
      {!hideFooter && <NewFooter />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteChecker />
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/operator" element={<PageWithFooter Component={OperatorDashboard} />} />
              <Route path="/for-operators" element={<ForOperators />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/culturin-pro" element={<CulturinProPage />} />
              <Route path="/demo" element={<DemoPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/about-us" element={<OurStoryPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/press" element={<PressPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              
              {/* Product Pages */}
              <Route path="/product/analytics" element={<ProductAnalyticsPage />} />
              <Route path="/product/booking" element={<ProductBookingPage />} />
              <Route path="/product/crm" element={<ProductCRMPage />} />
              <Route path="/product/marketing" element={<ProductMarketingPage />} />
              
              {/* Pro Dashboard Routes */}
              <Route path="/pro-dashboard" element={<ProDashboardPage />} />
              <Route path="/pro-dashboard/itinerary" element={<ProItineraryPage />} />
              <Route path="/pro-dashboard/booking" element={<ProBookingPage />} />
              <Route path="/pro-dashboard/crm" element={<ProCRMPage />} />
              <Route path="/pro-dashboard/analytics" element={<ProAnalyticsPage />} />
              <Route path="/pro-analytics" element={<ProAnalytics />} />
              <Route path="/pro-dashboard/marketing" element={<ProMarketingPage />} />
              <Route path="/pro-dashboard/settings" element={<ProSettingsPage />} />
              <Route path="*" element={<PageWithFooter Component={NotFound} />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Footer from "./components/sections/Footer";
import OperatorDashboard from "./pages/OperatorDashboard";
import ForOperators from "./pages/ForOperators";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import CulturinProPage from "./pages/CulturinProPage";
import ProDashboardPage from "./pages/ProDashboardPage";
import ProBookingPage from "./pages/ProBookingPage";
import ProCRMPage from "./pages/ProCRMPage";
import ProAnalyticsPage from "./pages/ProAnalyticsPage";
import ProMarketingPage from "./pages/ProMarketingPage";
import ProSettingsPage from "./pages/ProSettingsPage";
import ProItineraryPage from "./pages/ProItineraryPage";
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
  
  // Otherwise go to operators page
  return <Navigate to="/for-operators" replace />;
};

// Page wrapper component to control footer display
const PageWithFooter = ({ Component }) => {
  const location = useLocation();
  
  // ForOperators, CulturinProPage, and ProDashboardPage already include their own Footer or don't need one
  const hideFooter = location.pathname === '/for-operators' || 
                    location.pathname === '/culturin-pro' || 
                    location.pathname.startsWith('/pro-dashboard');
  
  return (
    <>
      <Component />
      {!hideFooter && <Footer />}
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
              <Route path="/" element={<EntryPoint />} />
              <Route path="/operator" element={<PageWithFooter Component={OperatorDashboard} />} />
              <Route path="/for-operators" element={<ForOperators />} />
              <Route path="/sign-in" element={<PageWithFooter Component={SignIn} />} />
              <Route path="/culturin-pro" element={<PageWithFooter Component={CulturinProPage} />} />
              <Route path="/pro-dashboard" element={<ProDashboardPage />} />
              <Route path="/pro-dashboard/itinerary" element={<ProItineraryPage />} />
              <Route path="/pro-dashboard/booking" element={<ProBookingPage />} />
              <Route path="/pro-dashboard/crm" element={<ProCRMPage />} />
              <Route path="/pro-dashboard/analytics" element={<ProAnalyticsPage />} />
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

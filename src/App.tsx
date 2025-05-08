
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/sections/Footer";
import Index from "./pages/Index";
import OperatorDashboard from "./pages/OperatorDashboard";
import ForOperators from "./pages/ForOperators";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import DiscoverTrips from "./pages/DiscoverTrips";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import Privacy from "./pages/Privacy";
import CulturinProPage from "./pages/CulturinProPage";

const queryClient = new QueryClient();

// Page wrapper component to control footer display
const PageWithFooter = ({ Component }) => {
  const location = useLocation();
  
  // ForOperators and CulturinProPage already include their own Footer or don't need one
  const hideFooter = location.pathname === '/for-operators' || location.pathname === '/culturin-pro';
  
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
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<PageWithFooter Component={Index} />} />
              <Route path="/operator" element={<PageWithFooter Component={OperatorDashboard} />} />
              <Route path="/for-operators" element={<ForOperators />} />
              <Route path="/sign-in" element={<PageWithFooter Component={SignIn} />} />
              <Route path="/about-us" element={<PageWithFooter Component={AboutUs} />} />
              <Route path="/discover-trips" element={<PageWithFooter Component={DiscoverTrips} />} />
              <Route path="/contact" element={<PageWithFooter Component={Contact} />} />
              <Route path="/faqs" element={<PageWithFooter Component={FAQs} />} />
              <Route path="/privacy" element={<PageWithFooter Component={Privacy} />} />
              <Route path="/culturin-pro" element={<PageWithFooter Component={CulturinProPage} />} />
              <Route path="*" element={<PageWithFooter Component={NotFound} />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

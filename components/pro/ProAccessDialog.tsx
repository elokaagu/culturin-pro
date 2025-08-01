import React, { useState, useEffect } from "react";
import { useNavigate } from "../../lib/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  Users,
  TrendingUp,
  Star,
  Clock,
  Zap,
  MessageSquare,
  Shield,
  Trophy,
  X,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

// Helper: manages Culturin Pro access in localStorage
export const useProAccess = () => {
  const [hasAccess, setHasAccess] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem("culturinProAccess");
    setHasAccess(stored === "true");
  }, []);

  const grantAccess = () => {
    localStorage.setItem("culturinProAccess", "true");
    setHasAccess(true);
  };

  return { hasAccess, grantAccess };
};

interface ProAccessDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ProAccessDialog: React.FC<ProAccessDialogProps> = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const { hasAccess, grantAccess } = useProAccess();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    "pricing" | "payment" | "success"
  >("pricing");

  const handleMaybeLater = () => {
    setOpen(false);
    navigate("/operator");
  };

  const handlePurchase = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing (Stripe integration disabled)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      toast.success("Payment processed successfully!", {
        description: "Welcome to Culturin Pro! Your 14-day free trial has started.",
      });
      
      // Grant access and navigate
      grantAccess();
      setCurrentStep('success');
      
      // Navigate to pro dashboard after a brief delay
      setTimeout(() => {
        setOpen(false);
        navigate("/pro-dashboard");
      }, 1500);
      
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("Payment failed", {
        description: "Please try again or contact support if the issue persists.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Stripe integration disabled for now
  // const handleStripeCheckout = async () => {
  //   setIsProcessing(true);
  //   
  //   try {
  //     // Create Stripe checkout session
  //     const response = await fetch('/api/create-checkout-session', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         priceId: 'price_culturin_pro_monthly', // Your Stripe price ID
  //         successUrl: `${window.location.origin}/pro-dashboard?success=true`,
  //         cancelUrl: `${window.location.origin}/operator?canceled=true`,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to create checkout session');
  //     }

  //     const { sessionId } = await response.json();
  //     
  //     // Redirect to Stripe checkout
  //     const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  //     if (stripe) {
  //       const { error } = await stripe.redirectToCheckout({ sessionId });
  //       if (error) {
  //         throw error;
  //       }
  //     }
  //     
  //   } catch (error) {
  //     console.error('Stripe checkout error:', error);
  //     toast.error("Failed to start checkout", {
  //       description: "Please try again or contact support.",
  //     });
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  // Load Stripe dynamically (disabled)
  // const loadStripe = async (publishableKey: string) => {
  //   const { loadStripe } = await import('@stripe/stripe-js');
  //   return loadStripe(publishableKey);
  // };

  const renderPricingStep = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[500px]">
      {/* Header Section */}
      <div className="lg:col-span-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <div className="flex justify-between items-start">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-3">
              Save 10+ Hours a Week & Grow Bookings by 32%
            </h2>
            <p className="text-lg text-blue-100">
              Join 1,000+ operators who've switched to Culturin Pro
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(false)}
            className="text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Plan Comparison Section */}
      <div className="lg:col-span-2 p-8 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free Plan */}
          <div className="border-2 border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Free Plan</h3>
              <Badge variant="outline" className="text-gray-600">
                Current
              </Badge>
            </div>
            <ul className="space-y-3">
              <li className="text-sm text-gray-600 flex items-start gap-3">
                <Check className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                <span>Basic booking management</span>
              </li>
              <li className="text-sm text-gray-600 flex items-start gap-3">
                <Check className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                <span>Limited analytics</span>
              </li>
              <li className="text-sm text-gray-600 flex items-start gap-3">
                <Check className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                <span>Standard support</span>
              </li>
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="border-2 border-blue-500 rounded-xl p-6 bg-gradient-to-br from-blue-50 to-blue-100 relative">
            <div className="absolute -top-3 right-4">
              <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs px-3 py-1 shadow-lg">
                <Trophy className="h-3 w-3 mr-1" />
                Recommended
              </Badge>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                Pro Plan
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-blue-900">$99</span>
                <span className="text-lg text-blue-700">/month</span>
                <Badge className="bg-green-100 text-green-800 text-xs ml-2">
                  14-day Free Trial!
                </Badge>
              </div>
              <p className="text-sm text-blue-600 mt-1">
                Less than $3/day to run your business on autopilot
              </p>
            </div>

            <ul className="space-y-3">
              <li className="text-sm text-gray-700 flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                <span>
                  <strong>Boost bookings</strong> with conversion insights
                </span>
              </li>
              <li className="text-sm text-gray-700 flex items-start gap-3">
                <Zap className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                <span>
                  <strong>Automate reviews & follow-ups</strong> — save 10+
                  hours/week
                </span>
              </li>
              <li className="text-sm text-gray-700 flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                <span>
                  <strong>Collaborate with your team</strong> in real time
                </span>
              </li>
              <li className="text-sm text-gray-700 flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                <span>
                  <strong>Priority support</strong> when it matters most
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Join 1,000+ cultural creators already on Pro</span>
            <span>Secure payment via Stripe</span>
          </div>
        </div>
      </div>

      {/* Testimonial & CTA Section */}
      <div className="lg:col-span-1 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 flex flex-col justify-between">
        {/* Testimonial */}
        <div className="mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-4">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm">Maria Lopez</p>
                <p className="text-xs text-blue-200">
                  Founder, Oaxaca Food Tours
                </p>
              </div>
            </div>
            <p className="text-sm text-white/90 leading-relaxed">
              "Since upgrading to Pro, bookings are up 32% and we save 10+
              hours/week on admin tasks!"
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-xs text-white/80">
              <strong>Early adopters</strong> lock in $99/month for life
            </p>
            <p className="text-xs text-white/70 mt-1">
              Cancel anytime • 14-day free trial • No hidden fees
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handlePurchase}
            disabled={isProcessing}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white w-full justify-center py-4 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Upgrade to Pro – Start Free Trial
                <ArrowRight className="h-5 w-5 ml-2" />
              </>
            )}
          </Button>

          <button
            onClick={handleMaybeLater}
            disabled={isProcessing}
            className="text-white/70 hover:text-white text-sm w-full text-center py-2 transition-colors disabled:opacity-50"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center p-8">
      <div className="mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to Culturin Pro!
        </h3>
        <p className="text-gray-600">
          Your 14-day free trial has started. You now have access to all Pro
          features.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">What's Next?</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Explore your new Pro dashboard</li>
            <li>• Set up advanced analytics</li>
            <li>• Configure automated workflows</li>
            <li>• Invite your team members</li>
          </ul>
        </div>

        <Button
          onClick={() => {
            setOpen(false);
            navigate("/pro-dashboard");
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Go to Pro Dashboard
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-5xl rounded-xl shadow-2xl p-0 overflow-hidden border-0">
        {currentStep === "pricing" ? renderPricingStep() : renderSuccessStep()}
      </DialogContent>
    </Dialog>
  );
};

export default ProAccessDialog;

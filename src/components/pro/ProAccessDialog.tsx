'use client'
import React, { useState, useEffect } from "react";
import { useNavigate } from "../../../lib/navigation";
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
import { ArrowRight, Check, Users, TrendingUp, Star } from "lucide-react";

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

  const handleMaybeLater = () => {
    setOpen(false);
    navigate("/operator");
  };

  const handlePurchase = () => {
    grantAccess();
    setOpen(false);
    navigate("/pro-dashboard");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-4xl rounded-xl shadow-lg p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-5 min-h-[420px]">
          {/* Left side - Pricing comparison */}
          <div className="md:col-span-3 p-8 bg-white">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-semibold">
                Unlock the full potential of Culturin Pro
              </DialogTitle>
              <DialogDescription className="text-base mt-2">
                Take your cultural experiences to the next level with our
                professional toolkit.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Free Plan */}
              <div className="border rounded-xl p-4">
                <h3 className="font-medium flex items-center">
                  Free Plan
                  <Badge variant="outline" className="ml-2">
                    Current
                  </Badge>
                </h3>
                <ul className="mt-3 space-y-2">
                  <li className="text-sm text-gray-600 flex items-start gap-2">
                    <Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                    <span>Basic booking management</span>
                  </li>
                  <li className="text-sm text-gray-600 flex items-start gap-2">
                    <Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                    <span>Limited analytics</span>
                  </li>
                  <li className="text-sm text-gray-600 flex items-start gap-2">
                    <Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                    <span>Standard support</span>
                  </li>
                </ul>
              </div>
              {/* Pro Plan */}
              <div className="border-2 border-blue-500 rounded-xl p-4 bg-blue-50 relative">
                <div className="absolute top-3 right-3">
                  <Badge className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5">
                    <span className="mr-1">🏆</span> Recommended
                  </Badge>
                </div>
                <h3 className="font-medium text-blue-900">Pro Plan</h3>
                <p className="text-xl font-bold mt-1 text-blue-900">
                  $49<span className="text-sm font-normal">/month</span>
                </p>
                <ul className="mt-3 space-y-2">
                  <li className="text-sm text-gray-700 flex items-start gap-2">
                    <Check className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                    <span>Boost bookings with conversion analytics</span>
                  </li>
                  <li className="text-sm text-gray-700 flex items-start gap-2">
                    <Check className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                    <span>Automate follow-ups and reviews</span>
                  </li>
                  <li className="text-sm text-gray-700 flex items-start gap-2">
                    <Check className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                    <span>Add custom upsells to increase revenue</span>
                  </li>
                  <li className="text-sm text-gray-700 flex items-start gap-2">
                    <Check className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                    <span>Collaborate with team members in real time</span>
                  </li>
                  <li className="text-sm text-gray-700 flex items-start gap-2">
                    <Check className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                    <span>Priority support when it matters most</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Right side - Testimonial and CTA */}
          <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <p className="text-lg font-semibold">
                  Join 1,000+ cultural experience creators
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
                <p className="italic text-white/90 text-sm">
                  "Since upgrading to Pro, we've seen a 32% increase in repeat
                  bookings and save over 10 hours a week on admin tasks."
                </p>
                <p className="mt-2 text-white/80 text-xs">
                  — Maria Lopez, Oaxaca Food Tours
                </p>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                <p className="text-sm text-white/90">
                  Cancel anytime. 14-day free trial. No hidden fees.
                </p>
              </div>
            </div>
            <DialogFooter className="flex flex-col gap-3 mt-6">
              <Button
                variant="ghost"
                onClick={handleMaybeLater}
                className="text-white hover:bg-white/20 w-full justify-center border border-white/30 py-3 text-sm"
              >
                Maybe Later
              </Button>
              <Button
                onClick={handlePurchase}
                className="bg-white text-blue-700 hover:bg-blue-50 w-full justify-center py-3 text-sm"
              >
                Upgrade to Pro
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProAccessDialog;

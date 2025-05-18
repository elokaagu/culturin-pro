
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Download, ExternalLink, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const BillingSettings: React.FC = () => {
  const currentPlan = {
    name: "Growth Plan",
    price: "£99",
    period: "monthly",
    nextBilling: "June 15, 2025",
    features: [
      "Advanced Booking Tools",
      "Full CRM functionality",
      "Comprehensive Analytics",
      "Website Builder",
      "Team Management (up to 3 members)",
      "Onboarding Concierge"
    ]
  };
  
  const paymentMethods = [
    {
      id: "card-1",
      type: "Visa",
      last4: "4242",
      expiry: "05/28",
      isDefault: true
    }
  ];
  
  const billingHistory = [
    {
      id: "inv-001",
      date: "May 15, 2025",
      amount: "£99.00",
      status: "Paid"
    },
    {
      id: "inv-002",
      date: "April 15, 2025",
      amount: "£99.00",
      status: "Paid"
    },
    {
      id: "inv-003",
      date: "March 15, 2025",
      amount: "£99.00",
      status: "Paid"
    }
  ];
  
  const handleUpgradePlan = () => {
    toast.info("Redirecting to plan selection...");
  };
  
  const handleCancelSubscription = () => {
    toast.info("Please contact support to cancel your subscription");
  };
  
  const handleAddPaymentMethod = () => {
    toast.info("Payment method form would open here");
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Billing & Subscription</h2>
        <p className="text-gray-500">Manage your subscription plan and payment methods.</p>
      </div>
      
      {/* Current Plan */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Your subscription details</CardDescription>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {currentPlan.name}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex justify-between items-baseline">
              <div className="text-2xl font-semibold">
                {currentPlan.price}<span className="text-sm text-gray-500">/{currentPlan.period}</span>
              </div>
              <div className="text-sm text-gray-500">
                Next billing on <span className="font-medium">{currentPlan.nextBilling}</span>
              </div>
            </div>
            
            <Separator className="my-2" />
            
            <div>
              <h4 className="font-medium mb-2">Plan Features</h4>
              <ul className="grid gap-1">
                {currentPlan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg mt-2">
              <h4 className="font-medium mb-1">Key Policies</h4>
              <ul className="grid gap-1">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  No commission on bookings
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Cancel anytime, no hidden fees
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleCancelSubscription}>
            Cancel Subscription
          </Button>
          <Button onClick={handleUpgradePlan}>
            Upgrade Plan
          </Button>
        </CardFooter>
      </Card>
      
      {/* Payment Methods */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Payment Methods</h3>
          <Button variant="outline" size="sm" onClick={handleAddPaymentMethod}>
            <CreditCard className="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
        </div>
        
        <div className="space-y-4">
          {paymentMethods.map(method => (
            <Card key={method.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-6 w-6" />
                    <div>
                      <p className="font-medium">{method.type} •••• {method.last4}</p>
                      <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {method.isDefault && (
                      <Badge variant="secondary">Default</Badge>
                    )}
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Billing History */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Billing History</h3>
        
        <div className="rounded-md border">
          <div className="grid grid-cols-4 p-4 font-medium border-b">
            <div>Invoice</div>
            <div>Date</div>
            <div>Amount</div>
            <div className="text-right">Actions</div>
          </div>
          
          {billingHistory.map(invoice => (
            <div key={invoice.id} className="grid grid-cols-4 p-4 border-b last:border-0">
              <div>{invoice.id}</div>
              <div>{invoice.date}</div>
              <div>{invoice.amount}</div>
              <div className="text-right">
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  <span className="sr-only sm:not-sr-only sm:inline">Download</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end">
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            View All Invoices
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;

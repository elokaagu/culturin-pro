"use client";

import React, { useState } from "react";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { useUserData } from "@/src/contexts/UserDataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreditCard,
  Crown,
  Star,
  Zap,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Shield,
  Users,
  Gift,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

const LoyaltyCardApplication: React.FC = () => {
  const { user } = useAuth();
  const { userData, updateUserData, isLoading: isUserDataLoading } = useUserData();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTier, setSelectedTier] = useState("bronze");

  const [formData, setFormData] = useState({
    firstName: userData?.businessName?.split(" ")[0] || "",
    lastName: userData?.businessName?.split(" ").slice(1).join(" ") || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    address: userData?.address || "",
    dateOfBirth: "",
    nationality: "",
    sourceOfFunds: "",
    annualIncome: "",
  });

  // Show loading state while userData is being initialized
  if (isUserDataLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading application form...</p>
        </div>
      </div>
    );
  }

  const tiers = [
    {
      id: "bronze",
      name: "Bronze",
      icon: <CreditCard className="h-5 w-5 text-orange-500" />,
      annualFee: 99,
      minBalance: 1000,
      rewardsRate: 2,
      benefits: [
        "Priority customer support",
        "5% discount on experiences",
        "Free cancellation up to 48 hours",
      ],
    },
    {
      id: "silver",
      name: "Silver",
      icon: <Zap className="h-5 w-5 text-gray-400" />,
      annualFee: 299,
      minBalance: 5000,
      rewardsRate: 3,
      benefits: [
        "All Bronze benefits",
        "Concierge booking service",
        "Exclusive member-only experiences",
        "Travel insurance included",
      ],
    },
    {
      id: "gold",
      name: "Gold",
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      annualFee: 599,
      minBalance: 10000,
      rewardsRate: 4,
      benefits: [
        "All Silver benefits",
        "Private guide services",
        "VIP airport transfers",
        "24/7 emergency support",
        "Custom itinerary planning",
      ],
    },
    {
      id: "platinum",
      name: "Platinum",
      icon: <Crown className="h-5 w-5 text-purple-500" />,
      annualFee: 1199,
      minBalance: 25000,
      rewardsRate: 5,
      benefits: [
        "All Gold benefits",
        "Private jet booking service",
        "Exclusive access to cultural events",
        "Personal travel advisor",
        "Luxury accommodation upgrades",
      ],
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please sign in to apply for a loyalty card.");
      return;
    }

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email", "dateOfBirth", "nationality"];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(", ")}`);
      return;
    }

    setIsLoading(true);

    try {
      // Create loyalty card
      const response = await fetch("/api/loyalty/create-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          tier: selectedTier,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create loyalty card");
      }

      // Update user data with new loyalty card
      const selectedTierData = tiers.find(t => t.id === selectedTier);
      const loyaltyCardData = {
        cardId: data.card.card_id,
        tier: selectedTier as any,
        balance: 0,
        rewardsBalance: 0,
        walletAddress: "",
        status: "pending" as any,
        memberSince: new Date(),
        kycStatus: "pending" as any,
        amlCheck: "pending" as any,
        annualFee: selectedTierData?.annualFee || 99,
        rewardsRate: (selectedTierData?.rewardsRate || 2) / 100,
        benefits: selectedTierData?.benefits || [],
      };

      updateUserData({ loyaltyCard: loyaltyCardData });

      toast.success("Your loyalty card application has been submitted successfully. We'll review your application and contact you within 2-3 business days.");

      // Redirect to loyalty dashboard
      window.location.href = "/pro-dashboard/loyalty";
    } catch (error) {
      console.error("Error creating loyalty card:", error);
      toast.error("Failed to submit your application. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const selectedTierData = tiers.find(t => t.id === selectedTier);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Apply for Loyalty Card</h1>
        <p className="text-gray-600">
          Join our exclusive stablecoin loyalty program for high-flying travelers
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tier Selection */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Tier</CardTitle>
              <CardDescription>
                Select the tier that best fits your travel lifestyle
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {tiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`w-full p-4 border rounded-lg text-left transition-all ${
                    selectedTier === tier.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {tier.icon}
                    <span className="font-medium">{tier.name}</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Annual Fee: ${tier.annualFee}</p>
                    <p>Min Balance: ${tier.minBalance.toLocaleString()}</p>
                    <p>Rewards Rate: {tier.rewardsRate}%</p>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Selected Tier Details */}
          {selectedTierData && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {selectedTierData.icon}
                  {selectedTierData.name} Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedTierData.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Application Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Please provide your details for KYC verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your full address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="nationality">Nationality *</Label>
                  <Input
                    id="nationality"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    placeholder="Enter your nationality"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sourceOfFunds">Source of Funds</Label>
                  <Select
                    value={formData.sourceOfFunds}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, sourceOfFunds: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select source of funds" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employment">Employment Income</SelectItem>
                      <SelectItem value="business">Business Income</SelectItem>
                      <SelectItem value="investment">Investment Income</SelectItem>
                      <SelectItem value="inheritance">Inheritance</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="annualIncome">Annual Income</Label>
                  <Select
                    value={formData.annualIncome}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, annualIncome: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select income range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-50k">Under $50,000</SelectItem>
                      <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                      <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                      <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                      <SelectItem value="over-500k">Over $500,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-800 mb-2">
                  <Shield className="h-4 w-4" />
                  <span className="font-medium">KYC/AML Compliance</span>
                </div>
                <p className="text-sm text-blue-700">
                  Your application will be subject to Know Your Customer (KYC) and Anti-Money Laundering (AML) verification. 
                  This process typically takes 1-2 business days.
                </p>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <AlertCircle className="mr-2 h-4 w-4 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Submit Application
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyCardApplication; 
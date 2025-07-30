import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  User,
  Settings,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  CreditCard as PhysicalCardIcon,
  Shield,
  DollarSign,
} from "lucide-react";
import { toast } from "sonner";

interface IssueNewCardProps {
  onBack: () => void;
  onComplete: () => void;
}

interface Cardholder {
  id: string;
  name: string;
  email: string;
  role: string;
}

const IssueNewCard: React.FC<IssueNewCardProps> = ({ onBack, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [cardType, setCardType] = useState<"virtual" | "physical">("virtual");
  const [selectedCardholder, setSelectedCardholder] = useState<string>("");
  const [spendingLimit, setSpendingLimit] = useState("");
  const [dailyLimit, setDailyLimit] = useState("");
  const [weeklyLimit, setWeeklyLimit] = useState("");
  const [monthlyLimit, setMonthlyLimit] = useState("");
  const [blockedCategories, setBlockedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - replace with real data from API
  const cardholders: Cardholder[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@company.com",
      role: "Tour Guide",
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike@company.com",
      role: "Operations Manager",
    },
    {
      id: "3",
      name: "Emma Davis",
      email: "emma@company.com",
      role: "Tour Guide",
    },
    {
      id: "4",
      name: "Alex Rodriguez",
      email: "alex@company.com",
      role: "Customer Service",
    },
  ];

  const merchantCategories = [
    {
      id: "restaurants",
      name: "Restaurants & Dining",
      description: "Food and beverage establishments",
    },
    {
      id: "entertainment",
      name: "Entertainment",
      description: "Movies, shows, and recreational activities",
    },
    {
      id: "gambling",
      name: "Gambling",
      description: "Casinos and betting establishments",
    },
    {
      id: "jewelry",
      name: "Jewelry Stores",
      description: "Luxury jewelry and watches",
    },
    {
      id: "electronics",
      name: "Electronics Stores",
      description: "Consumer electronics and gadgets",
    },
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleIssueCard = async () => {
    if (!selectedCardholder || !spendingLimit) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      // API call to issue card
      console.log("Issuing card with data:", {
        cardType,
        cardholderId: selectedCardholder,
        spendingLimit: parseFloat(spendingLimit),
        dailyLimit: dailyLimit ? parseFloat(dailyLimit) : undefined,
        weeklyLimit: weeklyLimit ? parseFloat(weeklyLimit) : undefined,
        monthlyLimit: monthlyLimit ? parseFloat(monthlyLimit) : undefined,
        blockedCategories,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Card issued successfully!");
      onComplete();
    } catch (error) {
      toast.error("Failed to issue card. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    setBlockedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Choose Card Type</h3>
        <p className="text-gray-600 mb-6">
          Select whether you want to issue a virtual or physical card
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          className={`cursor-pointer transition-all ${
            cardType === "virtual"
              ? "ring-2 ring-culturin-indigo bg-blue-50"
              : ""
          }`}
          onClick={() => setCardType("virtual")}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="h-8 w-8 text-blue-500" />
              <div>
                <h4 className="font-semibold">Virtual Card</h4>
                <p className="text-sm text-gray-600">Instant digital card</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Available immediately
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Add to Apple Pay/Google Pay
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Use for online purchases
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all ${
            cardType === "physical"
              ? "ring-2 ring-culturin-indigo bg-green-50"
              : ""
          }`}
          onClick={() => setCardType("physical")}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <PhysicalCardIcon className="h-8 w-8 text-green-500" />
              <div>
                <h4 className="font-semibold">Physical Card</h4>
                <p className="text-sm text-gray-600">
                  Plastic card shipped to you
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Shipped in 5-7 business days
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Use at physical locations
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                ATM withdrawals available
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Assign Cardholder</h3>
        <p className="text-gray-600 mb-6">Select who will be using this card</p>
      </div>

      <div className="space-y-4">
        {cardholders.map((cardholder) => (
          <Card
            key={cardholder.id}
            className={`cursor-pointer transition-all ${
              selectedCardholder === cardholder.id
                ? "ring-2 ring-culturin-indigo bg-blue-50"
                : ""
            }`}
            onClick={() => setSelectedCardholder(cardholder.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{cardholder.name}</h4>
                    <p className="text-sm text-gray-600">{cardholder.email}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {cardholder.role}
                    </Badge>
                  </div>
                </div>
                {selectedCardholder === cardholder.id && (
                  <CheckCircle className="h-5 w-5 text-culturin-indigo" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Set Spending Controls</h3>
        <p className="text-gray-600 mb-6">
          Configure spending limits and restrictions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="spendingLimit">Monthly Spending Limit *</Label>
            <div className="relative mt-1">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="spendingLimit"
                type="number"
                value={spendingLimit}
                onChange={(e) => setSpendingLimit(e.target.value)}
                placeholder="0.00"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="dailyLimit">Daily Limit (Optional)</Label>
            <div className="relative mt-1">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="dailyLimit"
                type="number"
                value={dailyLimit}
                onChange={(e) => setDailyLimit(e.target.value)}
                placeholder="0.00"
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="weeklyLimit">Weekly Limit (Optional)</Label>
            <div className="relative mt-1">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="weeklyLimit"
                type="number"
                value={weeklyLimit}
                onChange={(e) => setWeeklyLimit(e.target.value)}
                placeholder="0.00"
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Blocked Merchant Categories
            </Label>
            <p className="text-sm text-gray-600 mt-1 mb-3">
              Select categories where this card cannot be used
            </p>
          </div>

          <div className="space-y-2">
            {merchantCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={blockedCategories.includes(category.id)}
                  onCheckedChange={() => handleCategoryToggle(category.id)}
                />
                <Label htmlFor={category.id} className="text-sm cursor-pointer">
                  <div className="font-medium">{category.name}</div>
                  <div className="text-gray-600">{category.description}</div>
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => {
    const selectedCardholderData = cardholders.find(
      (c) => c.id === selectedCardholder
    );

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Review & Confirm</h3>
          <p className="text-gray-600 mb-6">
            Review the card details before issuing
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Card Type:</span>
                <div className="flex items-center gap-2">
                  {cardType === "virtual" ? (
                    <CreditCard className="h-4 w-4 text-blue-500" />
                  ) : (
                    <PhysicalCardIcon className="h-4 w-4 text-green-500" />
                  )}
                  <span className="capitalize font-medium">{cardType}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Cardholder:</span>
                <span className="font-medium">
                  {selectedCardholderData?.name}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Role:</span>
                <Badge variant="outline">{selectedCardholderData?.role}</Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Monthly Limit:</span>
                <span className="font-medium">${spendingLimit || "0.00"}</span>
              </div>

              {(dailyLimit || weeklyLimit) && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Additional Limits:</span>
                  <div className="text-sm">
                    {dailyLimit && <div>Daily: ${dailyLimit}</div>}
                    {weeklyLimit && <div>Weekly: ${weeklyLimit}</div>}
                  </div>
                </div>
              )}

              {blockedCategories.length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Blocked Categories:</span>
                  <div className="text-sm text-right">
                    {blockedCategories.map((id) => {
                      const category = merchantCategories.find(
                        (c) => c.id === id
                      );
                      return <div key={id}>{category?.name}</div>;
                    })}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Security Notice</h4>
              <p className="text-sm text-blue-700 mt-1">
                This card will be issued with the specified limits and
                restrictions. You can modify these settings at any time from the
                Manage Cards section.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const steps = [
    { number: 1, title: "Card Type", icon: CreditCard },
    { number: 2, title: "Assign", icon: User },
    { number: 3, title: "Controls", icon: Settings },
    { number: 4, title: "Confirm", icon: CheckCircle },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Issue New Card</h1>
          <p className="text-gray-600">Create a new card for your staff</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= step.number
                  ? "bg-culturin-indigo text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {currentStep > step.number ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <step.icon className="h-4 w-4" />
              )}
            </div>
            <span
              className={`ml-2 text-sm font-medium ${
                currentStep >= step.number
                  ? "text-culturin-indigo"
                  : "text-gray-500"
              }`}
            >
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-0.5 mx-4 ${
                  currentStep > step.number
                    ? "bg-culturin-indigo"
                    : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {currentStep === 1 ? "Back" : "Previous"}
        </Button>

        {currentStep < 4 ? (
          <Button
            onClick={handleNext}
            disabled={
              (currentStep === 1 && !cardType) ||
              (currentStep === 2 && !selectedCardholder) ||
              (currentStep === 3 && !spendingLimit)
            }
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleIssueCard}
            disabled={isLoading}
            className="bg-culturin-indigo hover:bg-culturin-indigo/90"
          >
            {isLoading ? "Issuing Card..." : "Issue Card"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default IssueNewCard;

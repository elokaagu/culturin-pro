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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  CreditCard,
  DollarSign,
  Shield,
  Upload,
  Save,
  Building,
  User,
  Globe,
} from "lucide-react";
import { toast } from "sonner";

const CardsSettings: React.FC = () => {
  const [defaultMonthlyLimit, setDefaultMonthlyLimit] = useState("1000");
  const [defaultDailyLimit, setDefaultDailyLimit] = useState("200");
  const [defaultWeeklyLimit, setDefaultWeeklyLimit] = useState("500");
  const [fundingSource, setFundingSource] = useState("culturin-wallet");
  const [autoFreezeOnLimit, setAutoFreezeOnLimit] = useState(true);
  const [requireApproval, setRequireApproval] = useState(false);
  const [defaultBlockedCategories, setDefaultBlockedCategories] = useState<
    string[]
  >(["gambling", "jewelry"]);
  const [isLoading, setIsLoading] = useState(false);

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
    {
      id: "travel",
      name: "Travel Services",
      description: "Airlines, hotels, and travel agencies",
    },
    {
      id: "gas",
      name: "Gas Stations",
      description: "Fuel and convenience stores",
    },
    {
      id: "grocery",
      name: "Grocery Stores",
      description: "Supermarkets and food stores",
    },
  ];

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // API call to save settings
      console.log("Saving card settings:", {
        defaultMonthlyLimit: parseFloat(defaultMonthlyLimit),
        defaultDailyLimit: parseFloat(defaultDailyLimit),
        defaultWeeklyLimit: parseFloat(defaultWeeklyLimit),
        fundingSource,
        autoFreezeOnLimit,
        requireApproval,
        defaultBlockedCategories,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save settings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    setDefaultBlockedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cards Settings</h1>
          <p className="text-gray-600">
            Configure default settings for new cards
          </p>
        </div>
        <Button
          onClick={handleSaveSettings}
          disabled={isLoading}
          className="bg-culturin-indigo hover:bg-culturin-indigo/90"
        >
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? "Saving..." : "Save Settings"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Default Limits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Default Spending Limits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="defaultMonthlyLimit">Default Monthly Limit</Label>
              <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="defaultMonthlyLimit"
                  type="number"
                  value={defaultMonthlyLimit}
                  onChange={(e) => setDefaultMonthlyLimit(e.target.value)}
                  placeholder="0.00"
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="defaultDailyLimit">Default Daily Limit</Label>
              <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="defaultDailyLimit"
                  type="number"
                  value={defaultDailyLimit}
                  onChange={(e) => setDefaultDailyLimit(e.target.value)}
                  placeholder="0.00"
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="defaultWeeklyLimit">Default Weekly Limit</Label>
              <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="defaultWeeklyLimit"
                  type="number"
                  value={defaultWeeklyLimit}
                  onChange={(e) => setDefaultWeeklyLimit(e.target.value)}
                  placeholder="0.00"
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Funding Source */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Funding Source
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="fundingSource">Default Funding Source</Label>
              <Select value={fundingSource} onValueChange={setFundingSource}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select funding source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="culturin-wallet">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Culturin Wallet
                    </div>
                  </SelectItem>
                  <SelectItem value="bank-account">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Linked Bank Account
                    </div>
                  </SelectItem>
                  <SelectItem value="manual">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Manual Top-up
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">
                    Security Features
                  </h4>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-700">
                        Auto-freeze on limit reached
                      </span>
                      <Switch
                        checked={autoFreezeOnLimit}
                        onCheckedChange={setAutoFreezeOnLimit}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-700">
                        Require approval for large transactions
                      </span>
                      <Switch
                        checked={requireApproval}
                        onCheckedChange={setRequireApproval}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Default Blocked Categories */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Default Blocked Merchant Categories
            </CardTitle>
            <p className="text-sm text-gray-600">
              These categories will be blocked by default for all new cards
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {merchantCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center space-x-3 p-3 border rounded-lg"
                >
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    checked={defaultBlockedCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                    className="h-4 w-4 text-culturin-indigo focus:ring-culturin-indigo border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor={`category-${category.id}`}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {category.name}
                    </Label>
                    <p className="text-xs text-gray-600">
                      {category.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Branding Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Branding Settings
            </CardTitle>
            <p className="text-sm text-gray-600">
              Customize the appearance of your cards (coming soon)
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Company Logo</h4>
                  <p className="text-sm text-gray-600">
                    Upload your logo to appear on physical cards
                  </p>
                </div>
                <Button variant="outline" disabled>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Logo
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Card Color Scheme</h4>
                  <p className="text-sm text-gray-600">
                    Choose colors for your branded cards
                  </p>
                </div>
                <Badge variant="outline">Coming Soon</Badge>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Custom Card Design</h4>
                  <p className="text-sm text-gray-600">
                    Design your own card layout
                  </p>
                </div>
                <Badge variant="outline">Coming Soon</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance & Security */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Compliance & Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">
                      PCI Compliance
                    </h4>
                    <p className="text-sm text-green-700 mt-1">
                      All card data is handled securely through our
                      PCI-compliant partners. No sensitive card information is
                      stored on our servers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">
                      KYC/KYB Requirements
                    </h4>
                    <p className="text-sm text-blue-700 mt-1">
                      All operators must complete Know Your Customer (KYC) and
                      Know Your Business (KYB) verification before issuing
                      cards. This is required for regulatory compliance.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="text-sm text-gray-600">
                <h4 className="font-medium mb-2">Security Features:</h4>
                <ul className="space-y-1">
                  <li>• Real-time transaction monitoring</li>
                  <li>• Instant card freeze/unfreeze capabilities</li>
                  <li>• Merchant category blocking</li>
                  <li>• Spending limit controls</li>
                  <li>• Fraud detection and alerts</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CardsSettings;

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Save,
  DollarSign,
  Shield,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { settingsService } from "@/lib/settings-service";

const CardsSettings: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [defaultMonthlyLimit, setDefaultMonthlyLimit] = useState("1000.00");
  const [defaultDailyLimit, setDefaultDailyLimit] = useState("200.00");
  const [defaultWeeklyLimit, setDefaultWeeklyLimit] = useState("500.00");
  const [fundingSource, setFundingSource] = useState("culturin-wallet");
  const [autoFreezeOnLimit, setAutoFreezeOnLimit] = useState(true);
  const [requireApproval, setRequireApproval] = useState(false);
  const [defaultBlockedCategories, setDefaultBlockedCategories] = useState([
    "gambling",
    "jewelry",
  ]);

  // Load saved settings on component mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem("cards_settings");
        if (savedSettings) {
          const { settings } = JSON.parse(savedSettings);
          if (settings) {
            setDefaultMonthlyLimit(
              settings.defaultMonthlyLimit?.toString() || "1000.00"
            );
            setDefaultDailyLimit(
              settings.defaultDailyLimit?.toString() || "200.00"
            );
            setDefaultWeeklyLimit(
              settings.defaultWeeklyLimit?.toString() || "500.00"
            );
            setFundingSource(settings.fundingSource || "culturin-wallet");
            setAutoFreezeOnLimit(settings.autoFreezeOnLimit ?? true);
            setRequireApproval(settings.requireApproval ?? false);
            setDefaultBlockedCategories(
              settings.defaultBlockedCategories || ["gambling", "jewelry"]
            );
          }
        }
      } catch (error) {
        console.error("Error loading cards settings:", error);
      }
    };

    loadSettings();
  }, []);

  const merchantCategories = [
    {
      id: "gambling",
      name: "Gambling & Casinos",
      description: "Online gambling, casinos, and betting sites",
    },
    {
      id: "jewelry",
      name: "Jewelry & Luxury",
      description: "High-value jewelry and luxury items",
    },
    {
      id: "electronics",
      name: "Electronics",
      description: "Computers, phones, and electronic devices",
    },
    {
      id: "travel",
      name: "Travel & Entertainment",
      description: "Hotels, flights, and entertainment",
    },
    {
      id: "restaurants",
      name: "Restaurants & Food",
      description: "Dining out and food delivery",
    },
    {
      id: "gasoline",
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
      const settings = {
        defaultMonthlyLimit: parseFloat(defaultMonthlyLimit),
        defaultDailyLimit: parseFloat(defaultDailyLimit),
        defaultWeeklyLimit: parseFloat(defaultWeeklyLimit),
        fundingSource,
        autoFreezeOnLimit,
        requireApproval,
        defaultBlockedCategories,
      };

      // Save to localStorage as fallback
      localStorage.setItem("cardsSettings", JSON.stringify(settings));

      toast.success("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving cards settings:", error);
      toast.error("Failed to save settings", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
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

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoFreeze">Auto-freeze on Limit</Label>
                <p className="text-sm text-gray-500">
                  Automatically freeze cards when they reach their limit
                </p>
              </div>
              <Switch
                id="autoFreeze"
                checked={autoFreezeOnLimit}
                onCheckedChange={setAutoFreezeOnLimit}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="requireApproval">Require Approval</Label>
                <p className="text-sm text-gray-500">
                  Require manual approval for large transactions
                </p>
              </div>
              <Switch
                id="requireApproval"
                checked={requireApproval}
                onCheckedChange={setRequireApproval}
              />
            </div>

            <div>
              <Label htmlFor="fundingSource">Default Funding Source</Label>
              <select
                id="fundingSource"
                value={fundingSource}
                onChange={(e) => setFundingSource(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md"
              >
                <option value="culturin-wallet">Culturin Wallet</option>
                <option value="bank-account">Bank Account</option>
                <option value="manual">Manual Funding</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blocked Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Blocked Merchant Categories
          </CardTitle>
          <p className="text-sm text-gray-500">
            Select categories that should be blocked by default on new cards
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {merchantCategories.map((category) => (
              <div
                key={category.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  defaultBlockedCategories.includes(category.id)
                    ? "border-red-200 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleCategoryToggle(category.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{category.name}</h4>
                      {defaultBlockedCategories.includes(category.id) ? (
                        <XCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {category.description}
                    </p>
                  </div>
                  <Badge
                    variant={
                      defaultBlockedCategories.includes(category.id)
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {defaultBlockedCategories.includes(category.id)
                      ? "Blocked"
                      : "Allowed"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardsSettings;

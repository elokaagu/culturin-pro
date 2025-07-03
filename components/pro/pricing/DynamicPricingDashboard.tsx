"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { usePricing } from "../../../src/contexts/PricingContext";
import { toast } from "sonner";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Settings,
  Zap,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Target,
  Activity,
} from "lucide-react";

const DynamicPricingDashboard: React.FC = () => {
  const {
    marketData,
    recommendations,
    settings,
    isAnalyzing,
    updateSettings,
    analyzeMarket,
    applyRecommendation,
    getPriceHistory,
    getMarketTrends,
  } = usePricing();

  const [selectedExperience, setSelectedExperience] = useState<string>("");

  const handleApplyRecommendation = (experienceId: string) => {
    applyRecommendation(experienceId);
    toast.success("Price recommendation applied successfully");
  };

  const handleAnalyzeMarket = async () => {
    await analyzeMarket();
    toast.success("Market analysis completed");
  };

  const getFactorColor = (impact: number) => {
    if (impact > 0.2) return "text-green-600 bg-green-50";
    if (impact < -0.2) return "text-red-600 bg-red-50";
    return "text-gray-600 bg-gray-50";
  };

  const getFactorIcon = (impact: number) => {
    if (impact > 0.2) return <TrendingUp className="h-4 w-4" />;
    if (impact < -0.2) return <TrendingDown className="h-4 w-4" />;
    return <Activity className="h-4 w-4" />;
  };

  const marketTrends = getMarketTrends();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Dynamic Pricing</h2>
          <p className="text-gray-500">
            AI-powered pricing optimization based on market conditions
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleAnalyzeMarket}
            disabled={isAnalyzing}
            className="flex items-center gap-2"
          >
            {isAnalyzing ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <BarChart3 className="h-4 w-4" />
            )}
            {isAnalyzing ? "Analyzing..." : "Analyze Market"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="market">Market Data</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Dynamic Pricing</p>
                    <p className="text-lg font-semibold">
                      {settings.enabled ? "Active" : "Inactive"}
                    </p>
                  </div>
                  <div
                    className={`p-2 rounded-full ${
                      settings.enabled ? "bg-green-100" : "bg-gray-100"
                    }`}
                  >
                    {settings.enabled ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Recommendations</p>
                    <p className="text-lg font-semibold">
                      {recommendations.length}
                    </p>
                  </div>
                  <div className="p-2 rounded-full bg-blue-100">
                    <Target className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Avg. Confidence</p>
                    <p className="text-lg font-semibold">
                      {recommendations.length > 0
                        ? Math.round(
                            (recommendations.reduce(
                              (sum, r) => sum + r.confidence,
                              0
                            ) /
                              recommendations.length) *
                              100
                          )
                        : 0}
                      %
                    </p>
                  </div>
                  <div className="p-2 rounded-full bg-purple-100">
                    <Zap className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Market Score</p>
                    <p className="text-lg font-semibold">
                      {Math.round(
                        ((marketData.demand +
                          marketData.seasonality +
                          (1 - marketData.competition)) /
                          3) *
                          100
                      )}
                    </p>
                  </div>
                  <div className="p-2 rounded-full bg-orange-100">
                    <Activity className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Market Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Market Trends
              </CardTitle>
              <CardDescription>
                Current market conditions affecting pricing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketTrends.map((trend, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          trend.trend === "increasing"
                            ? "bg-green-100"
                            : trend.trend === "decreasing"
                            ? "bg-red-100"
                            : "bg-gray-100"
                        }`}
                      >
                        {trend.trend === "increasing" ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : trend.trend === "decreasing" ? (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        ) : (
                          <Activity className="h-4 w-4 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{trend.factor}</p>
                        <p className="text-sm text-gray-500">
                          {trend.description}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        trend.impact === "high" ? "default" : "secondary"
                      }
                    >
                      {trend.impact} impact
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Price Recommendations
              </CardTitle>
              <CardDescription>
                AI-generated pricing suggestions based on current market
                conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <div key={rec.experienceId} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">
                          Experience {rec.experienceId}
                        </h4>
                        <p className="text-sm text-gray-500">{rec.reasoning}</p>
                      </div>
                      <Badge
                        variant={
                          rec.priceChangePercent > 0 ? "default" : "secondary"
                        }
                      >
                        {rec.priceChangePercent > 0 ? "+" : ""}
                        {rec.priceChangePercent.toFixed(1)}%
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <p className="text-sm text-gray-500">Current Price</p>
                        <p className="text-lg font-semibold">
                          ${rec.currentPrice}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded">
                        <p className="text-sm text-gray-500">
                          Recommended Price
                        </p>
                        <p className="text-lg font-semibold text-blue-600">
                          ${rec.recommendedPrice}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded">
                        <p className="text-sm text-gray-500">Confidence</p>
                        <p className="text-lg font-semibold text-green-600">
                          {Math.round(rec.confidence * 100)}%
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">
                        Pricing Factors
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {rec.factors.map((factor, index) => (
                          <div
                            key={index}
                            className={`flex items-center justify-between p-2 rounded ${getFactorColor(
                              factor.impact
                            )}`}
                          >
                            <div className="flex items-center gap-2">
                              {getFactorIcon(factor.impact)}
                              <span className="text-sm">{factor.name}</span>
                            </div>
                            <span className="text-xs font-medium">
                              {factor.impact > 0 ? "+" : ""}
                              {(factor.impact * 100).toFixed(1)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {Math.abs(rec.priceChangePercent) > 1 && (
                      <Button
                        onClick={() =>
                          handleApplyRecommendation(rec.experienceId)
                        }
                        className="w-full"
                        disabled={Math.abs(rec.priceChangePercent) < 1}
                      >
                        Apply Recommendation
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Factors</CardTitle>
                <CardDescription>
                  Current market conditions analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Seasonality</Label>
                    <span className="text-sm font-medium">
                      {Math.round(marketData.seasonality * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={marketData.seasonality * 100}
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Demand</Label>
                    <span className="text-sm font-medium">
                      {Math.round(marketData.demand * 100)}%
                    </span>
                  </div>
                  <Progress value={marketData.demand * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Competition</Label>
                    <span className="text-sm font-medium">
                      {Math.round(marketData.competition * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={marketData.competition * 100}
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Local Events</Label>
                    <span className="text-sm font-medium">
                      {Math.round(marketData.localEvents * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={marketData.localEvents * 100}
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Weather</Label>
                    <span className="text-sm font-medium">
                      {Math.round(marketData.weather * 100)}%
                    </span>
                  </div>
                  <Progress value={marketData.weather * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Economic Index</Label>
                    <span className="text-sm font-medium">
                      {Math.round(marketData.economicIndex * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={marketData.economicIndex * 100}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Price History</CardTitle>
                <CardDescription>
                  Historical pricing and performance data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Select
                    value={selectedExperience}
                    onValueChange={setSelectedExperience}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience to view history" />
                    </SelectTrigger>
                    <SelectContent>
                      {recommendations.map((rec) => (
                        <SelectItem
                          key={rec.experienceId}
                          value={rec.experienceId}
                        >
                          Experience {rec.experienceId}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedExperience && (
                    <div className="space-y-2">
                      {getPriceHistory(selectedExperience)
                        .slice(-7)
                        .map((point, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-2 bg-gray-50 rounded"
                          >
                            <span className="text-sm">{point.date}</span>
                            <div className="flex gap-4 text-sm">
                              <span>${point.price}</span>
                              <span className="text-gray-500">
                                {point.bookings} bookings
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Dynamic Pricing Settings
              </CardTitle>
              <CardDescription>
                Configure how dynamic pricing works for your experiences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label
                    htmlFor="enable-pricing"
                    className="text-base font-medium"
                  >
                    Enable Dynamic Pricing
                  </Label>
                  <p className="text-sm text-gray-500">
                    Allow AI to analyze market conditions and suggest price
                    adjustments
                  </p>
                </div>
                <Switch
                  id="enable-pricing"
                  checked={settings.enabled}
                  onCheckedChange={(enabled) => updateSettings({ enabled })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label
                    htmlFor="auto-adjust"
                    className="text-base font-medium"
                  >
                    Auto-Apply Recommendations
                  </Label>
                  <p className="text-sm text-gray-500">
                    Automatically apply price recommendations with high
                    confidence
                  </p>
                </div>
                <Switch
                  id="auto-adjust"
                  checked={settings.autoAdjust}
                  onCheckedChange={(autoAdjust) =>
                    updateSettings({ autoAdjust })
                  }
                  disabled={!settings.enabled}
                />
              </div>

              <div className="space-y-3">
                <Label>Maximum Price Increase: {settings.maxIncrease}%</Label>
                <Slider
                  value={[settings.maxIncrease]}
                  onValueChange={([maxIncrease]) =>
                    updateSettings({ maxIncrease })
                  }
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                  disabled={!settings.enabled}
                />
              </div>

              <div className="space-y-3">
                <Label>Maximum Price Decrease: {settings.maxDecrease}%</Label>
                <Slider
                  value={[settings.maxDecrease]}
                  onValueChange={([maxDecrease]) =>
                    updateSettings({ maxDecrease })
                  }
                  max={50}
                  min={0}
                  step={5}
                  className="w-full"
                  disabled={!settings.enabled}
                />
              </div>

              <div className="space-y-3">
                <Label>Update Frequency</Label>
                <Select
                  value={settings.updateFrequency}
                  onValueChange={(updateFrequency: any) =>
                    updateSettings({ updateFrequency })
                  }
                  disabled={!settings.enabled}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DynamicPricingDashboard;

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  TrendingUp,
  Users,
  Calculator,
  PieChart,
  BarChart3,
  Target,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { ItineraryType, ItineraryModule } from "@/data/itineraryData";

interface PricingCalculatorProps {
  itinerary: ItineraryType & {
    groupSize?: { min: number; max: number };
    price?: number;
    currency?: string;
  };
  modules: ItineraryModule[];
  onPriceUpdate: (price: number) => void;
}

interface CostBreakdown {
  accommodation: number;
  meals: number;
  activities: number;
  transportation: number;
  guides: number;
  other: number;
}

interface PricingStrategy {
  basePrice: number;
  markup: number;
  seasonalMultiplier: number;
  groupSizeDiscount: number;
  profitMargin: number;
}

const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  itinerary,
  modules,
  onPriceUpdate,
}) => {
  const [strategy, setStrategy] = useState<PricingStrategy>({
    basePrice: 0,
    markup: 30,
    seasonalMultiplier: 1.0,
    groupSizeDiscount: 0,
    profitMargin: 25,
  });

  const [costs, setCosts] = useState<CostBreakdown>({
    accommodation: 0,
    meals: 0,
    activities: 0,
    transportation: 0,
    guides: 0,
    other: 0,
  });

  const [groupSize, setGroupSize] = useState(itinerary.groupSize?.min || 4);
  const [season, setSeason] = useState<"low" | "high" | "peak">("high");

  // Calculate cost breakdown from modules
  useEffect(() => {
    const breakdown: CostBreakdown = {
      accommodation: 0,
      meals: 0,
      activities: 0,
      transportation: 0,
      guides: 0,
      other: 0,
    };

    modules.forEach((module) => {
      const price = module.price || 0;
      switch (module.type) {
        case "Accommodation":
          breakdown.accommodation += price;
          break;
        case "Meal":
          breakdown.meals += price;
          break;
        case "Transportation":
          breakdown.transportation += price;
          break;
        case "Activity":
        case "Attraction":
        case "Experience":
          breakdown.activities += price;
          break;
        default:
          breakdown.other += price;
      }
    });

    // Add estimated guide costs (10% of activities)
    breakdown.guides = breakdown.activities * 0.1;

    setCosts(breakdown);

    const totalCosts = Object.values(breakdown).reduce(
      (sum, cost) => sum + cost,
      0
    );
    setStrategy((prev) => ({ ...prev, basePrice: totalCosts }));
  }, [modules]);

  // Calculate seasonal multipliers
  const getSeasonalMultiplier = () => {
    switch (season) {
      case "low":
        return 0.8;
      case "high":
        return 1.0;
      case "peak":
        return 1.3;
      default:
        return 1.0;
    }
  };

  // Calculate group size discount
  const getGroupDiscount = () => {
    if (groupSize >= 8) return 0.15;
    if (groupSize >= 6) return 0.1;
    if (groupSize >= 4) return 0.05;
    return 0;
  };

  // Calculate final price
  const calculateFinalPrice = () => {
    const totalCosts = Object.values(costs).reduce(
      (sum, cost) => sum + cost,
      0
    );
    const markupAmount = totalCosts * (strategy.markup / 100);
    const baseWithMarkup = totalCosts + markupAmount;
    const seasonalPrice = baseWithMarkup * getSeasonalMultiplier();
    const discount = seasonalPrice * getGroupDiscount();
    return Math.round(seasonalPrice - discount);
  };

  // Calculate profit margin
  const calculateProfitMargin = () => {
    const finalPrice = calculateFinalPrice();
    const totalCosts = Object.values(costs).reduce(
      (sum, cost) => sum + cost,
      0
    );
    return ((finalPrice - totalCosts) / finalPrice) * 100;
  };

  const finalPrice = calculateFinalPrice();
  const profitMargin = calculateProfitMargin();
  const totalCosts = Object.values(costs).reduce((sum, cost) => sum + cost, 0);

  const handlePriceUpdate = () => {
    onPriceUpdate(finalPrice);
  };

  const getProfitabilityStatus = () => {
    if (profitMargin >= 25)
      return {
        status: "excellent",
        color: "text-green-600",
        icon: CheckCircle,
      };
    if (profitMargin >= 15)
      return { status: "good", color: "text-blue-600", icon: Target };
    if (profitMargin >= 5)
      return {
        status: "acceptable",
        color: "text-yellow-600",
        icon: AlertTriangle,
      };
    return { status: "poor", color: "text-red-600", icon: AlertTriangle };
  };

  const profitStatus = getProfitabilityStatus();
  const StatusIcon = profitStatus.icon;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Pricing Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="breakdown" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
              <TabsTrigger value="strategy">Pricing Strategy</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="breakdown" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Accommodation</span>
                    <span className="font-medium">${costs.accommodation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Meals</span>
                    <span className="font-medium">${costs.meals}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Activities</span>
                    <span className="font-medium">${costs.activities}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Transportation
                    </span>
                    <span className="font-medium">${costs.transportation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Guide Services
                    </span>
                    <span className="font-medium">
                      ${Math.round(costs.guides)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Other</span>
                    <span className="font-medium">${costs.other}</span>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Costs</span>
                <span>${Math.round(totalCosts)}</span>
              </div>
            </TabsContent>

            <TabsContent value="strategy" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="markup">Markup Percentage</Label>
                  <Input
                    id="markup"
                    type="number"
                    value={strategy.markup}
                    onChange={(e) =>
                      setStrategy((prev) => ({
                        ...prev,
                        markup: parseFloat(e.target.value) || 0,
                      }))
                    }
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <Label htmlFor="season">Season</Label>
                  <select
                    id="season"
                    value={season}
                    onChange={(e) =>
                      setSeason(e.target.value as "low" | "high" | "peak")
                    }
                    className="w-full border rounded-md p-2"
                  >
                    <option value="low">Low Season (-20%)</option>
                    <option value="high">High Season (Base)</option>
                    <option value="peak">Peak Season (+30%)</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="groupSize">Group Size</Label>
                  <Input
                    id="groupSize"
                    type="number"
                    value={groupSize}
                    onChange={(e) =>
                      setGroupSize(parseInt(e.target.value) || 1)
                    }
                    min="1"
                    max="20"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Discount: {(getGroupDiscount() * 100).toFixed(0)}%
                  </p>
                </div>
                <div>
                  <Label>Seasonal Multiplier</Label>
                  <div className="p-2 bg-gray-50 rounded text-sm">
                    {(getSeasonalMultiplier() * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Profitability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-2">
                      <StatusIcon className={`h-5 w-5 ${profitStatus.color}`} />
                      <span
                        className={`font-medium ${profitStatus.color} capitalize`}
                      >
                        {profitStatus.status}
                      </span>
                    </div>
                    <div className="text-2xl font-bold">
                      {profitMargin.toFixed(1)}%
                    </div>
                    <p className="text-sm text-gray-600">Profit Margin</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Revenue per Person
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      ${Math.round(finalPrice / groupSize)}
                    </div>
                    <p className="text-sm text-gray-600">
                      Total: ${finalPrice} for {groupSize} people
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Pricing Recommendations</h4>
                <div className="space-y-2 text-sm">
                  {profitMargin < 15 && (
                    <div className="flex items-center gap-2 text-amber-600">
                      <AlertTriangle className="h-4 w-4" />
                      Consider increasing markup to improve profitability
                    </div>
                  )}
                  {groupSize < 4 && (
                    <div className="flex items-center gap-2 text-blue-600">
                      <Users className="h-4 w-4" />
                      Larger groups provide better economies of scale
                    </div>
                  )}
                  {season === "peak" && (
                    <div className="flex items-center gap-2 text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      Peak season pricing maximizes revenue potential
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-4" />

          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-bold">${finalPrice}</div>
              <p className="text-sm text-gray-600">
                Final Price ({itinerary.currency || "USD"})
              </p>
            </div>
            <Button
              onClick={handlePriceUpdate}
              className="flex items-center gap-2"
            >
              <DollarSign className="h-4 w-4" />
              Update Itinerary Price
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingCalculator;

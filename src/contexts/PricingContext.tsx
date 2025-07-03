"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface PricingFactor {
  name: string;
  impact: number; // -1 to 1 (negative = decrease price, positive = increase price)
  weight: number; // 0 to 1 (importance of this factor)
  description: string;
}

export interface MarketData {
  seasonality: number;
  demand: number;
  competition: number;
  localEvents: number;
  weather: number;
  economicIndex: number;
}

export interface PriceRecommendation {
  experienceId: string;
  currentPrice: number;
  recommendedPrice: number;
  priceChange: number;
  priceChangePercent: number;
  confidence: number;
  factors: PricingFactor[];
  reasoning: string;
}

export interface DynamicPricingSettings {
  enabled: boolean;
  autoAdjust: boolean;
  maxIncrease: number; // Maximum price increase percentage
  maxDecrease: number; // Maximum price decrease percentage
  updateFrequency: "hourly" | "daily" | "weekly";
  considerFactors: string[];
}

export interface PricingContextType {
  marketData: MarketData;
  recommendations: PriceRecommendation[];
  settings: DynamicPricingSettings;
  isAnalyzing: boolean;
  updateSettings: (settings: Partial<DynamicPricingSettings>) => void;
  analyzeMarket: () => Promise<void>;
  applyRecommendation: (experienceId: string) => void;
  getPriceHistory: (experienceId: string) => PriceHistoryPoint[];
  getMarketTrends: () => MarketTrend[];
}

export interface PriceHistoryPoint {
  date: string;
  price: number;
  bookings: number;
  revenue: number;
}

export interface MarketTrend {
  factor: string;
  trend: "increasing" | "decreasing" | "stable";
  impact: "high" | "medium" | "low";
  description: string;
}

// Mock market data - in production, this would come from real APIs
const generateMockMarketData = (): MarketData => {
  const now = new Date();
  const month = now.getMonth();
  const dayOfWeek = now.getDay();

  // Simulate seasonal patterns
  const seasonality =
    month >= 5 && month <= 8 ? 0.8 : month >= 11 || month <= 1 ? 0.6 : 0.4;

  // Simulate demand patterns (higher on weekends)
  const demand = dayOfWeek >= 5 ? 0.7 : 0.4;

  // Random market factors
  const competition = 0.3 + Math.random() * 0.4;
  const localEvents = Math.random() > 0.7 ? 0.8 : 0.2;
  const weather = 0.5 + Math.random() * 0.3;
  const economicIndex = 0.6 + Math.random() * 0.2;

  return {
    seasonality,
    demand,
    competition,
    localEvents,
    weather,
    economicIndex,
  };
};

const generateMockRecommendations = (
  marketData: MarketData
): PriceRecommendation[] => {
  const experiences = [
    { id: "exp-1", name: "Barcelona Gothic Quarter Tour", currentPrice: 85 },
    { id: "exp-2", name: "Tapas & Culture Walking Tour", currentPrice: 120 },
    { id: "exp-3", name: "Sagrada Familia Art Experience", currentPrice: 95 },
    { id: "exp-4", name: "Flamenco & History Evening", currentPrice: 110 },
  ];

  return experiences.map((exp) => {
    const factors: PricingFactor[] = [
      {
        name: "Seasonal Demand",
        impact: (marketData.seasonality - 0.5) * 2,
        weight: 0.3,
        description:
          marketData.seasonality > 0.6
            ? "High tourist season"
            : "Low tourist season",
      },
      {
        name: "Weekend Premium",
        impact: (marketData.demand - 0.5) * 2,
        weight: 0.2,
        description:
          marketData.demand > 0.6
            ? "Weekend demand spike"
            : "Weekday lower demand",
      },
      {
        name: "Competition",
        impact: -(marketData.competition - 0.5) * 2,
        weight: 0.25,
        description:
          marketData.competition > 0.6
            ? "High competition pressure"
            : "Low competition advantage",
      },
      {
        name: "Local Events",
        impact: (marketData.localEvents - 0.5) * 2,
        weight: 0.15,
        description:
          marketData.localEvents > 0.6
            ? "Major local events boost demand"
            : "No significant events",
      },
      {
        name: "Weather Conditions",
        impact: (marketData.weather - 0.5) * 2,
        weight: 0.1,
        description:
          marketData.weather > 0.6
            ? "Favorable weather conditions"
            : "Weather may affect bookings",
      },
    ];

    // Calculate weighted price adjustment
    const totalImpact = factors.reduce(
      (sum, factor) => sum + factor.impact * factor.weight,
      0
    );
    const priceChange = exp.currentPrice * totalImpact * 0.3; // Max 30% change
    const recommendedPrice = Math.round(exp.currentPrice + priceChange);
    const priceChangePercent = (priceChange / exp.currentPrice) * 100;

    // Calculate confidence based on factor alignment
    const confidence = Math.min(0.95, 0.5 + Math.abs(totalImpact) * 0.5);

    const reasoning =
      totalImpact > 0.1
        ? `Market conditions favor price increase due to ${factors
            .filter((f) => f.impact > 0.2)
            .map((f) => f.name.toLowerCase())
            .join(", ")}`
        : totalImpact < -0.1
        ? `Market conditions suggest price decrease due to ${factors
            .filter((f) => f.impact < -0.2)
            .map((f) => f.name.toLowerCase())
            .join(", ")}`
        : "Market conditions are stable, maintain current pricing";

    return {
      experienceId: exp.id,
      currentPrice: exp.currentPrice,
      recommendedPrice,
      priceChange,
      priceChangePercent,
      confidence,
      factors,
      reasoning,
    };
  });
};

const generateMockPriceHistory = (): PriceHistoryPoint[] => {
  const history: PriceHistoryPoint[] = [];
  const basePrice = 85;

  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const seasonalVariation =
      Math.sin((date.getMonth() / 12) * Math.PI * 2) * 0.2;
    const randomVariation = (Math.random() - 0.5) * 0.1;
    const priceMultiplier = 1 + seasonalVariation + randomVariation;

    const price = Math.round(basePrice * priceMultiplier);
    const bookings = Math.round(
      15 + Math.random() * 10 + seasonalVariation * 20
    );
    const revenue = price * bookings;

    history.push({
      date: date.toISOString().split("T")[0],
      price,
      bookings,
      revenue,
    });
  }

  return history;
};

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export const usePricing = (): PricingContextType => {
  const context = useContext(PricingContext);
  if (context === undefined) {
    // During SSG/SSR, return default values
    if (typeof window === "undefined") {
      return {
        marketData: generateMockMarketData(),
        recommendations: [],
        settings: {
          enabled: true,
          autoAdjust: false,
          maxIncrease: 50,
          maxDecrease: 30,
          updateFrequency: "daily",
          considerFactors: ["seasonality", "demand", "competition"],
        },
        isAnalyzing: false,
        updateSettings: () => {},
        analyzeMarket: async () => {},
        applyRecommendation: () => {},
        getPriceHistory: () => [],
        getMarketTrends: () => [],
      };
    }
    throw new Error("usePricing must be used within a PricingProvider");
  }
  return context;
};

export const PricingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [marketData, setMarketData] = useState<MarketData>(
    generateMockMarketData()
  );
  const [recommendations, setRecommendations] = useState<PriceRecommendation[]>(
    []
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [settings, setSettings] = useState<DynamicPricingSettings>({
    enabled: true,
    autoAdjust: false,
    maxIncrease: 50,
    maxDecrease: 30,
    updateFrequency: "daily",
    considerFactors: ["seasonality", "demand", "competition", "localEvents"],
  });

  useEffect(() => {
    // Load saved settings
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("culturin_pricing_settings");
      if (savedSettings) {
        try {
          setSettings(JSON.parse(savedSettings));
        } catch (error) {
          console.error("Error loading pricing settings:", error);
        }
      }
    }

    // Initial market analysis
    analyzeMarket();
  }, []);

  useEffect(() => {
    // Auto-update market data based on frequency
    if (settings.enabled) {
      const intervals = {
        hourly: 60 * 60 * 1000,
        daily: 24 * 60 * 60 * 1000,
        weekly: 7 * 24 * 60 * 60 * 1000,
      };

      const interval = setInterval(() => {
        analyzeMarket();
      }, intervals[settings.updateFrequency]);

      return () => clearInterval(interval);
    }
  }, [settings.enabled, settings.updateFrequency]);

  const updateSettings = (newSettings: Partial<DynamicPricingSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "culturin_pricing_settings",
        JSON.stringify(updatedSettings)
      );
    }
  };

  const analyzeMarket = async (): Promise<void> => {
    setIsAnalyzing(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newMarketData = generateMockMarketData();
      setMarketData(newMarketData);

      const newRecommendations = generateMockRecommendations(newMarketData);
      setRecommendations(newRecommendations);
    } catch (error) {
      console.error("Market analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const applyRecommendation = (experienceId: string) => {
    const recommendation = recommendations.find(
      (r) => r.experienceId === experienceId
    );
    if (recommendation) {
      // In a real app, this would update the experience price in the database
      console.log(
        `Applied price recommendation for ${experienceId}: ${recommendation.currentPrice} → ${recommendation.recommendedPrice}`
      );

      // Update the recommendation to show it's been applied
      setRecommendations((prev) =>
        prev.map((r) =>
          r.experienceId === experienceId
            ? {
                ...r,
                currentPrice: r.recommendedPrice,
                priceChange: 0,
                priceChangePercent: 0,
              }
            : r
        )
      );
    }
  };

  const getPriceHistory = (experienceId: string): PriceHistoryPoint[] => {
    // In production, this would fetch real data for the specific experience
    return generateMockPriceHistory();
  };

  const getMarketTrends = (): MarketTrend[] => {
    return [
      {
        factor: "Seasonal Demand",
        trend: marketData.seasonality > 0.6 ? "increasing" : "decreasing",
        impact: "high",
        description: "Tourist season affecting overall demand patterns",
      },
      {
        factor: "Competition",
        trend: marketData.competition > 0.5 ? "increasing" : "stable",
        impact: "medium",
        description: "Competitive landscape and pricing pressure",
      },
      {
        factor: "Local Events",
        trend: marketData.localEvents > 0.6 ? "increasing" : "stable",
        impact: marketData.localEvents > 0.6 ? "high" : "low",
        description: "Major events and festivals affecting local tourism",
      },
    ];
  };

  const value: PricingContextType = {
    marketData,
    recommendations,
    settings,
    isAnalyzing,
    updateSettings,
    analyzeMarket,
    applyRecommendation,
    getPriceHistory,
    getMarketTrends,
  };

  return (
    <PricingContext.Provider value={value}>{children}</PricingContext.Provider>
  );
};

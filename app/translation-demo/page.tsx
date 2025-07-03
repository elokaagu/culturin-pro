import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TranslatableText from "../../components/TranslatableText";
import LanguageSelector from "../../components/LanguageSelector";

export const metadata = {
  title: "Translation Demo | Culturin Studio",
  description: "Experience auto-translation and dynamic pricing features",
};

export default function TranslationDemo() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              <TranslatableText text="Welcome to Culturin" />
            </h1>
            <p className="text-gray-600">
              <TranslatableText text="Experience auto-translation and dynamic pricing" />
            </p>
          </div>
          <LanguageSelector />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <TranslatableText text="Authentic cultural experiences" />
              </CardTitle>
              <CardDescription>
                <TranslatableText text="Discover unique tours and activities" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    <TranslatableText text="Price" />
                  </span>
                  <span className="text-lg font-bold text-blue-600">$85</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    <TranslatableText text="Duration" />
                  </span>
                  <span>3 hours</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  <TranslatableText text="Book Now" />
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <TranslatableText text="Dynamic Pricing" />
              </CardTitle>
              <CardDescription>
                <TranslatableText text="AI-powered pricing optimization" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    <TranslatableText text="Current Price" />
                  </span>
                  <span className="font-bold">$85</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    <TranslatableText text="Recommended Price" />
                  </span>
                  <span className="font-bold text-green-600">$92</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    <TranslatableText text="Price Change" />
                  </span>
                  <span className="text-sm text-green-600">+8.2%</span>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-800">
                    <TranslatableText text="High demand detected - price increase recommended" />
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>
              <TranslatableText text="Global Reach Features" />
            </CardTitle>
            <CardDescription>
              <TranslatableText text="Expand your business worldwide with our translation and pricing tools" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl mb-2">🌍</div>
                <h3 className="font-semibold mb-1">
                  <TranslatableText text="15 Languages" />
                </h3>
                <p className="text-sm text-gray-600">
                  <TranslatableText text="Auto-translate your content" />
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl mb-2">💰</div>
                <h3 className="font-semibold mb-1">
                  <TranslatableText text="Smart Pricing" />
                </h3>
                <p className="text-sm text-gray-600">
                  <TranslatableText text="AI-powered price optimization" />
                </p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="font-semibold mb-1">
                  <TranslatableText text="Market Analysis" />
                </h3>
                <p className="text-sm text-gray-600">
                  <TranslatableText text="Real-time market insights" />
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TranslatableText from "../../components/TranslatableText";
import LanguageSelector from "../../components/LanguageSelector";

export const metadata = {
  title: "Language Test | Culturin Studio",
  description: "Test all available languages and translations",
};

const testTexts = [
  "Welcome to Culturin",
  "Own your bookings. Tell richer stories. Grow your cultural tour brand.",
  "Authentic cultural experiences",
  "Book Now",
  "Price",
  "Duration",
  "15 Languages",
  "Auto-translate your content",
  "Smart Pricing",
  "AI-powered price optimization",
  "Market Analysis",
  "Real-time market insights",
  "Global Reach Features",
  "Expand your business worldwide with our translation and pricing tools",
  "Experience auto-translation and dynamic pricing",
  "Discover unique tours and activities",
];

const availableLanguages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "en-GB", name: "British English", flag: "🇬🇧" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "ar", name: "العربية", flag: "🇸🇦", rtl: true },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "th", name: "ไทย", flag: "🇹🇭" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
];

export default function LanguageTestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              <TranslatableText text="Language Test Page" />
            </h1>
            <p className="text-gray-600">
              Test all {availableLanguages.length} available languages and their
              translations
            </p>
          </div>
          <LanguageSelector />
        </div>

        {/* Language Overview Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🌍 <TranslatableText text="16 Languages" />
            </CardTitle>
            <CardDescription>
              All supported languages in the Culturin platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {availableLanguages.map((language) => (
                <div
                  key={language.code}
                  className={`p-3 rounded-lg border text-center ${
                    language.rtl
                      ? "bg-orange-50 border-orange-200"
                      : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <div className="text-2xl mb-1">{language.flag}</div>
                  <div className="font-medium text-sm">{language.name}</div>
                  <div className="text-xs text-gray-500 uppercase">
                    {language.code}
                  </div>
                  {language.rtl && (
                    <Badge variant="secondary" className="mt-1 text-xs">
                      RTL
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Translation Test Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hero Text */}
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  <TranslatableText text="Welcome to Culturin" />
                </h3>
                <p className="text-gray-600 text-sm">
                  <TranslatableText text="Own your bookings. Tell richer stories. Grow your cultural tour brand." />
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Product Features */}
          <Card>
            <CardHeader>
              <CardTitle>Product Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium">
                    <TranslatableText text="Smart Pricing" />
                  </h4>
                  <p className="text-sm text-gray-600">
                    <TranslatableText text="AI-powered price optimization" />
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium">
                    <TranslatableText text="Market Analysis" />
                  </h4>
                  <p className="text-sm text-gray-600">
                    <TranslatableText text="Real-time market insights" />
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sample Booking Card */}
          <Card>
            <CardHeader>
              <CardTitle>Sample Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="font-semibold">
                  <TranslatableText text="Authentic cultural experiences" />
                </h3>
                <p className="text-sm text-gray-600">
                  <TranslatableText text="Discover unique tours and activities" />
                </p>
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

          {/* Global Features */}
          <Card>
            <CardHeader>
              <CardTitle>
                <TranslatableText text="Global Reach Features" />
              </CardTitle>
              <CardDescription>
                <TranslatableText text="Expand your business worldwide with our translation and pricing tools" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                  <span className="text-lg">🌍</span>
                  <div>
                    <div className="font-medium">
                      <TranslatableText text="16 Languages" />
                    </div>
                    <div className="text-sm text-gray-600">
                      <TranslatableText text="Auto-translate your content" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                  <span className="text-lg">💰</span>
                  <div>
                    <div className="font-medium">
                      <TranslatableText text="Smart Pricing" />
                    </div>
                    <div className="text-sm text-gray-600">
                      <TranslatableText text="AI-powered price optimization" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>🧪 Testing Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>
                <strong>1.</strong> Use the language selector above to switch
                between languages
              </p>
              <p>
                <strong>2.</strong> Each language should display properly
                translated text
              </p>
              <p>
                <strong>3.</strong> Arabic should display right-to-left (RTL)
                text direction
              </p>
              <p>
                <strong>4.</strong> URL should change to include language code
                (e.g., /es/language-test)
              </p>
              <p>
                <strong>5.</strong> Page should reload and maintain the selected
                language
              </p>
              <p>
                <strong>6.</strong> All {availableLanguages.length} languages
                should be available in the dropdown
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

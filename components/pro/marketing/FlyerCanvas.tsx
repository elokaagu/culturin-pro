"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Copy,
  Download,
  Share2,
  Star,
  MapPin,
  Clock,
  Users,
  Phone,
  Mail,
  Globe
} from "lucide-react";
import { toast } from "sonner";

interface FlyerCanvasProps {
  flyerDesign: any;
  colorTheme?: string;
  templateStyle?: string;
  onCopy?: () => void;
  onSave?: () => void;
  onShare?: () => void;
}

const FlyerCanvas: React.FC<FlyerCanvasProps> = ({
  flyerDesign,
  colorTheme = 'blue-ocean',
  templateStyle = 'modern',
  onCopy,
  onSave,
  onShare
}) => {
  const getThemeColors = () => {
    switch (colorTheme) {
      case 'sunset-orange':
        return {
          primary: 'from-orange-500 to-red-500',
          secondary: 'bg-orange-100',
          accent: 'text-orange-600',
          text: 'text-orange-900'
        };
      case 'forest-green':
        return {
          primary: 'from-green-500 to-emerald-600',
          secondary: 'bg-green-100',
          accent: 'text-green-600',
          text: 'text-green-900'
        };
      case 'royal-purple':
        return {
          primary: 'from-purple-500 to-indigo-600',
          secondary: 'bg-purple-100',
          accent: 'text-purple-600',
          text: 'text-purple-900'
        };
      default: // blue-ocean
        return {
          primary: 'from-blue-500 to-cyan-600',
          secondary: 'bg-blue-100',
          accent: 'text-blue-600',
          text: 'text-blue-900'
        };
    }
  };

  const colors = getThemeColors();

  const handleCopy = () => {
    const text = typeof flyerDesign === 'string' ? flyerDesign : JSON.stringify(flyerDesign, null, 2);
    navigator.clipboard.writeText(text);
    toast.success("Flyer content copied to clipboard!");
    onCopy?.();
  };

  const handleDownload = () => {
    const text = typeof flyerDesign === 'string' ? flyerDesign : JSON.stringify(flyerDesign, null, 2);
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `flyer-design-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Flyer design downloaded!");
  };

  if (typeof flyerDesign === 'string') {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <div className="p-6">
          <pre className="whitespace-pre-wrap text-sm">{flyerDesign}</pre>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden shadow-lg">
      {/* Flyer Design */}
      <div className="relative">
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${colors.primary} text-white p-8 text-center`}>
          <h1 className="text-3xl font-bold mb-2">
            {flyerDesign.headline || 'Cultural Experience'}
          </h1>
          {flyerDesign.subheading && (
            <p className="text-lg opacity-90">
              {flyerDesign.subheading}
            </p>
          )}
        </div>

        {/* Main Content */}
        <div className="p-8 bg-white">
          {/* Description */}
          {flyerDesign.description && (
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed text-center">
                {flyerDesign.description}
              </p>
            </div>
          )}

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Benefits */}
            {flyerDesign.benefits && flyerDesign.benefits.length > 0 && (
              <div className={`${colors.secondary} rounded-lg p-4`}>
                <h3 className={`font-semibold ${colors.text} mb-3 flex items-center gap-2`}>
                  <Star className="h-5 w-5" />
                  Why Choose Us
                </h3>
                <ul className="space-y-2">
                  {flyerDesign.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${colors.accent.replace('text', 'bg')} mt-2 flex-shrink-0`}></div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What's Included */}
            {flyerDesign.included && flyerDesign.included.length > 0 && (
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  What's Included
                </h3>
                <ul className="space-y-2">
                  {flyerDesign.included.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Call to Action */}
          {flyerDesign.callToAction && (
            <div className="text-center mb-6">
              <div className={`bg-gradient-to-r ${colors.primary} text-white rounded-lg p-4 inline-block`}>
                <p className="text-lg font-semibold">
                  {flyerDesign.callToAction}
                </p>
              </div>
            </div>
          )}

          {/* Social Proof */}
          {flyerDesign.socialProof && (
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600 italic">
                "{flyerDesign.socialProof}"
              </p>
            </div>
          )}

          {/* Contact Info */}
          {flyerDesign.contactInfo && (
            <div className={`${colors.secondary} rounded-lg p-4 text-center`}>
              <h3 className={`font-semibold ${colors.text} mb-2`}>
                Get in Touch
              </h3>
              <div className="flex justify-center items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>hello@culturin.com</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <span>culturin.com</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                {flyerDesign.contactInfo}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className={colors.accent}>
                {templateStyle} • {colorTheme}
              </Badge>
            </div>
            <div className="text-xs text-gray-500">
              Generated by Rigo AI • {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="border-t bg-gray-50 p-4">
        <div className="flex items-center justify-center gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
          >
            <Copy className="h-3 w-3 mr-1" />
            Copy Content
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDownload}
          >
            <Download className="h-3 w-3 mr-1" />
            Download
          </Button>
          {onShare && (
            <Button
              size="sm"
              variant="outline"
              onClick={onShare}
            >
              <Share2 className="h-3 w-3 mr-1" />
              Share Design
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default FlyerCanvas;

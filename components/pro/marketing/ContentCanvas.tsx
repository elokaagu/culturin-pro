"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Instagram, 
  Facebook, 
  Mail, 
  Globe, 
  Target,
  TrendingUp,
  Copy,
  Download,
  Share2
} from "lucide-react";
import { toast } from "sonner";

interface ContentCanvasProps {
  content: string;
  contentType: string;
  platform?: string;
  onCopy?: () => void;
  onSave?: () => void;
  onShare?: () => void;
}

const ContentCanvas: React.FC<ContentCanvasProps> = ({
  content,
  contentType,
  platform,
  onCopy,
  onSave,
  onShare
}) => {
  const getPlatformIcon = () => {
    switch (platform?.toLowerCase()) {
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'tiktok':
        return <TrendingUp className="h-5 w-5" />;
      case 'google ads':
        return <Target className="h-5 w-5" />;
      case 'email':
        return <Mail className="h-5 w-5" />;
      default:
        return <Globe className="h-5 w-5" />;
    }
  };

  const getPlatformColors = () => {
    switch (platform?.toLowerCase()) {
      case 'instagram':
        return {
          bg: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500',
          text: 'text-white',
          accent: 'bg-white/20'
        };
      case 'facebook':
        return {
          bg: 'bg-gradient-to-br from-blue-600 to-blue-700',
          text: 'text-white',
          accent: 'bg-white/20'
        };
      case 'tiktok':
        return {
          bg: 'bg-gradient-to-br from-black via-gray-900 to-gray-800',
          text: 'text-white',
          accent: 'bg-white/20'
        };
      case 'google ads':
        return {
          bg: 'bg-gradient-to-br from-blue-500 to-green-500',
          text: 'text-white',
          accent: 'bg-white/20'
        };
      case 'email':
        return {
          bg: 'bg-gradient-to-br from-indigo-600 to-purple-600',
          text: 'text-white',
          accent: 'bg-white/20'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-gray-600 to-gray-700',
          text: 'text-white',
          accent: 'bg-white/20'
        };
    }
  };

  const formatContent = () => {
    if (contentType === 'instagram-caption') {
      return formatInstagramCaption(content);
    } else if (contentType === 'tiktok-hook') {
      return formatTikTokHook(content);
    } else if (contentType === 'google-ad-copy') {
      return formatGoogleAd(content);
    } else if (contentType === 'blog post') {
      return formatBlogPost(content);
    } else if (contentType === 'email-campaign') {
      return formatEmail(content);
    }
    return formatGeneral(content);
  };

  const formatInstagramCaption = (text: string) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-3">
        {lines.map((line, index) => {
          if (line.startsWith('#')) {
            return (
              <div key={index} className="flex flex-wrap gap-1">
                {line.split(' ').map((hashtag, i) => (
                  <Badge key={i} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                    {hashtag}
                  </Badge>
                ))}
              </div>
            );
          }
          return (
            <p key={index} className="text-sm leading-relaxed">
              {line}
            </p>
          );
        })}
      </div>
    );
  };

  const formatTikTokHook = (text: string) => {
    return (
      <div className="text-center">
        <div className="bg-black/80 rounded-lg p-6 text-white">
          <p className="text-lg font-bold leading-tight">
            {text}
          </p>
          <div className="mt-4 flex justify-center space-x-4 text-xs opacity-75">
            <span>👀 Hook</span>
            <span>⚡ 3-second rule</span>
            <span>🔥 Viral potential</span>
          </div>
        </div>
      </div>
    );
  };

  const formatGoogleAd = (text: string) => {
    let adData;
    try {
      adData = JSON.parse(text);
    } catch {
      return <p className="text-sm">{text}</p>;
    }

    return (
      <div className="bg-white border rounded-lg p-4 max-w-md">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-xs text-green-600 font-medium">Ad</span>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-blue-600 text-lg font-medium hover:underline cursor-pointer">
              {adData.headline1}
            </h3>
            <h4 className="text-blue-600 text-base hover:underline cursor-pointer">
              {adData.headline2}
            </h4>
            <h5 className="text-blue-600 text-sm hover:underline cursor-pointer">
              {adData.headline3}
            </h5>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-gray-700">{adData.description1}</p>
            <p className="text-sm text-gray-700">{adData.description2}</p>
          </div>
          
          <div className="text-xs text-gray-500">
            example.com
          </div>
        </div>
      </div>
    );
  };

  const formatBlogPost = (text: string) => {
    const sections = text.split('\n\n');
    
    return (
      <div className="bg-white border rounded-lg p-6 max-w-2xl">
        <div className="prose prose-sm max-w-none">
          {sections.map((section, index) => {
            if (section.toLowerCase().includes('title:')) {
              return (
                <h1 key={index} className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">
                  {section.replace(/title:\s*/i, '')}
                </h1>
              );
            } else if (section.toLowerCase().includes('introduction:')) {
              return (
                <div key={index} className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Introduction</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {section.replace(/introduction:\s*/i, '')}
                  </p>
                </div>
              );
            } else if (section.toLowerCase().includes('history:')) {
              return (
                <div key={index} className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">History</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {section.replace(/history:\s*/i, '')}
                  </p>
                </div>
              );
            } else if (section.toLowerCase().includes('conclusion:')) {
              return (
                <div key={index} className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Conclusion</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {section.replace(/conclusion:\s*/i, '')}
                  </p>
                </div>
              );
            }
            return (
              <p key={index} className="text-gray-700 leading-relaxed mb-4">
                {section}
              </p>
            );
          })}
        </div>
      </div>
    );
  };

  const formatEmail = (text: string) => {
    const lines = text.split('\n');
    let subject = '';
    let body = [];
    let inBody = false;

    for (const line of lines) {
      if (line.toLowerCase().includes('subject:')) {
        subject = line.replace(/subject:\s*/i, '');
      } else if (line.trim() !== '' || inBody) {
        inBody = true;
        body.push(line);
      }
    }

    return (
      <div className="bg-white border rounded-lg max-w-md">
        {/* Email Header */}
        <div className="bg-gray-50 px-4 py-3 border-b">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <span>From: marketing@yourcompany.com</span>
          </div>
          <div className="font-semibold text-gray-900">
            {subject || 'Your Cultural Experience Awaits'}
          </div>
        </div>
        
        {/* Email Body */}
        <div className="p-4 space-y-3">
          {body.map((line, index) => (
            <p key={index} className="text-sm text-gray-700 leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      </div>
    );
  };

  const formatGeneral = (text: string) => {
    return (
      <div className="bg-white border rounded-lg p-4">
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {text}
        </p>
      </div>
    );
  };

  const colors = getPlatformColors();

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast.success("Content copied to clipboard!");
    onCopy?.();
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${platform || 'content'}-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Content downloaded!");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden">
      {/* Header */}
      <div className={`${colors.bg} ${colors.text} p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getPlatformIcon()}
            <div>
              <h3 className="font-semibold">
                {platform || 'Content'} {contentType?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h3>
              <p className="text-sm opacity-75">
                Generated by Rigo AI
              </p>
            </div>
          </div>
          <Badge variant="secondary" className={colors.accent}>
            Ready to use
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {formatContent()}
      </div>

      {/* Actions */}
      <div className="border-t bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Generated • {new Date().toLocaleDateString()}
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
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
                Share
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ContentCanvas;

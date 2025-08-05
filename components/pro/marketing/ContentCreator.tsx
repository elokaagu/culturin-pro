"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  FileText,
  Copy,
  Save,
  Send,
  Bot,
  User,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { settingsService } from "@/lib/settings-service";

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  options?: string[];
  selectedOption?: string;
}

interface ConversationState {
  step: 'welcome' | 'content-type' | 'experience-details' | 'target-audience' | 'tone' | 'generating' | 'result';
  experienceTitle?: string;
  location?: string;
  keyCulturalElements?: string;
  targetAudience?: string;
  tone?: string;
  contentType?: string;
}

interface GeneratedContent {
  id: string;
  type: string;
  title: string;
  content: string;
  wordCount: number;
  tone: string;
  createdAt: string;
  platform?: string;
}

const ContentCreator: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationState, setConversationState] = useState<ConversationState>({
    step: 'welcome'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize chat on component mount
  useEffect(() => {
    if (messages.length === 0) {
      addBotMessage("Hey there! 👋 I'm your AI marketing assistant. What kind of content would you like to create today?", [
        "Instagram Caption",
        "TikTok Hook", 
        "Google Ad Copy",
        "Facebook Ad",
        "Blog Post",
        "Email Newsletter",
        "WhatsApp Script",
        "Event Flyer"
      ]);
    }
  }, []);

  const addBotMessage = (content: string, options?: string[]) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'bot',
      content,
      timestamp: new Date(),
      options
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleOptionSelect = (option: string) => {
    addUserMessage(option);
    
    if (conversationState.step === 'welcome') {
      setConversationState(prev => ({ ...prev, step: 'content-type', contentType: option }));
      addBotMessage(`Great choice! I'll help you create ${option}. Let's start with the basics. What's the name of your experience or tour?`);
    } else if (conversationState.step === 'content-type') {
      setConversationState(prev => ({ ...prev, step: 'experience-details', experienceTitle: option }));
      addBotMessage("Perfect! Where is this experience located? (e.g., Barcelona, Spain)");
    } else if (conversationState.step === 'experience-details') {
      setConversationState(prev => ({ ...prev, step: 'target-audience', location: option }));
      addBotMessage("Who is your target audience?", [
        "Cultural Travelers",
        "Food Enthusiasts", 
        "Art Lovers",
        "Luxury Travelers",
        "Adventure Seekers"
      ]);
    } else if (conversationState.step === 'target-audience') {
      setConversationState(prev => ({ ...prev, step: 'tone', targetAudience: option }));
      addBotMessage("What tone should we use?", [
        "Friendly & Approachable",
        "Luxury & Premium",
        "Adventurous & Exciting", 
        "Educational & Informative"
      ]);
    } else if (conversationState.step === 'tone') {
      setConversationState(prev => ({ ...prev, step: 'generating', tone: option }));
      addBotMessage("Perfect! Now let me create some amazing content for you...");
      handleGenerateContent();
    }
  };

  const handleUserInput = (input: string) => {
    if (!input.trim()) return;
    
    addUserMessage(input);
    setInputValue('');
    
    if (conversationState.step === 'content-type') {
      setConversationState(prev => ({ ...prev, step: 'experience-details', experienceTitle: input }));
      addBotMessage("Perfect! Where is this experience located? (e.g., Barcelona, Spain)");
    } else if (conversationState.step === 'experience-details') {
      setConversationState(prev => ({ ...prev, step: 'target-audience', location: input }));
      addBotMessage("Who is your target audience?", [
        "Cultural Travelers",
        "Food Enthusiasts", 
        "Art Lovers",
        "Luxury Travelers",
        "Adventure Seekers"
      ]);
    } else if (conversationState.step === 'target-audience') {
      setConversationState(prev => ({ ...prev, step: 'tone', targetAudience: input }));
      addBotMessage("What tone should we use?", [
        "Friendly & Approachable",
        "Luxury & Premium",
        "Adventurous & Exciting", 
        "Educational & Informative"
      ]);
    } else if (conversationState.step === 'tone') {
      setConversationState(prev => ({ ...prev, step: 'generating', tone: input }));
      addBotMessage("Perfect! Now let me create some amazing content for you...");
      handleGenerateContent();
    }
  };

  const handleGenerateContent = async () => {
    if (!conversationState.contentType || !conversationState.experienceTitle || !conversationState.location) {
      addBotMessage("I need a bit more information to create your content. Let's start over!");
      setConversationState({ step: 'welcome' });
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentType: conversationState.contentType?.toLowerCase().replace(' ', '-'),
          experienceTitle: conversationState.experienceTitle,
          location: conversationState.location,
          keyCulturalElements: conversationState.keyCulturalElements || "",
          targetAudience: conversationState.targetAudience?.toLowerCase().replace(' ', '-') || "cultural-travelers",
          tone: conversationState.tone?.toLowerCase().replace(' & ', '-').replace(' ', '-') || "friendly",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate content");
      }

      const data = await response.json();
      
      let content = "";
      let wordCount = 0;
      
      if (conversationState.contentType?.toLowerCase().includes("google") && typeof data.content === "object") {
        content = `Headline 1: ${data.content.headline1 || ""}
Headline 2: ${data.content.headline2 || ""}
Headline 3: ${data.content.headline3 || ""}
Description 1: ${data.content.description1 || ""}
Description 2: ${data.content.description2 || ""}`;
        wordCount = content.split(" ").length;
      } else {
        content = data.content;
        wordCount = content.split(" ").length;
      }

      const generatedContent: GeneratedContent = {
        id: Date.now().toString(),
        type: conversationState.contentType || "",
        title: `Generated ${conversationState.contentType}`,
        content: content,
        wordCount: wordCount,
        tone: conversationState.tone || "friendly",
        createdAt: new Date().toISOString(),
        platform: getPlatformName(conversationState.contentType || ""),
      };

      setGeneratedContent(generatedContent);
      setConversationState(prev => ({ ...prev, step: 'result' }));
      
      addBotMessage("🎉 Here's your content! What would you like to do with it?", [
        "Copy to Clipboard",
        "Save to Library",
        "Create Another",
        "Generate Images"
      ]);
      
    } catch (error) {
      console.error("Error generating content:", error);
      addBotMessage("Sorry, I encountered an error while generating your content. Let's try again!");
      setConversationState({ step: 'welcome' });
    } finally {
      setIsGenerating(false);
    }
  };

  const getPlatformName = (type: string) => {
    if (type?.toLowerCase().includes("instagram")) return "Instagram";
    if (type?.toLowerCase().includes("tiktok")) return "TikTok";
    if (type?.toLowerCase().includes("google")) return "Google Ads";
    if (type?.toLowerCase().includes("facebook")) return "Facebook";
    if (type?.toLowerCase().includes("blog")) return "Blog";
    if (type?.toLowerCase().includes("email")) return "Email";
    if (type?.toLowerCase().includes("whatsapp")) return "WhatsApp";
    if (type?.toLowerCase().includes("event")) return "Event";
    return "General";
  };

  const handleCopyContent = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent.content);
    addBotMessage("✅ Content copied to clipboard!");
  };

  const handleSaveContent = async () => {
    if (!generatedContent) return;
    
    try {
      await settingsService.saveMarketingContent(generatedContent);
      addBotMessage("✅ Content saved to library!");
    } catch (error) {
      console.error('Error saving marketing content:', error);
      addBotMessage("❌ Failed to save content. Please try again.");
    }
  };

  const handleCreateAnother = () => {
    setGeneratedContent(null);
    setConversationState({ step: 'welcome' });
    setMessages([]);
    addBotMessage("Hey there! 👋 I'm your AI marketing assistant. What kind of content would you like to create today?", [
      "Instagram Caption",
      "TikTok Hook", 
      "Google Ad Copy",
      "Facebook Ad",
      "Blog Post",
      "Email Newsletter",
      "WhatsApp Script",
      "Event Flyer"
    ]);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pl-8">
        <h2 className="text-lg font-medium">Marketing HQ</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleCreateAnother}>
            <Sparkles className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col bg-white rounded-lg border border-gray-200 mx-8 mb-8">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={`rounded-lg px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-50 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    
                    {/* Options */}
                    {message.options && (
                      <div className="mt-3 space-y-2">
                        {message.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleOptionSelect(option)}
                            className="block w-full text-left px-3 py-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-sm"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Generated Content Display */}
          {generatedContent && (
            <div className="flex justify-start">
              <div className="max-w-[80%]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-green-900">{generatedContent.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {generatedContent.wordCount} words
                      </Badge>
                    </div>
                    <div className="bg-white p-3 rounded border mb-3">
                      <pre className="whitespace-pre-wrap text-sm text-gray-900">
                        {generatedContent.content}
                      </pre>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={handleCopyContent}>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleSaveContent}>
                        <Save className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleUserInput(inputValue);
                }
              }}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isGenerating}
            />
            <Button 
              onClick={() => handleUserInput(inputValue)}
              disabled={!inputValue.trim() || isGenerating}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCreator;

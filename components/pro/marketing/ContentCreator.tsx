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
  Loader2,
  Upload,
  Paperclip,
  Image,
  File,
  X,
  Eye,
} from "lucide-react";
import { settingsService } from "@/lib/settings-service";

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  options?: string[];
  selectedOption?: string;
  isGenerating?: boolean;
  attachments?: UploadedFile[];
}

interface UploadedFile {
  id: string;
  name: string;
  type: 'image' | 'document' | 'url';
  url?: string;
  file?: File;
  preview?: string;
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
  const [attachments, setAttachments] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize chat on component mount
  useEffect(() => {
    if (messages.length === 0) {
      addBotMessage("Ahoy! I'm Rigo, your AI marketing assistant inspired by the great explorer Amerigo Vespucci! 🌍 Ready to discover amazing content together? What kind of marketing content would you like to create today?", [
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

  const addBotMessage = (content: string, options?: string[], isGenerating: boolean = false, attachments?: UploadedFile[]) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'bot',
      content,
      timestamp: new Date(),
      options,
      isGenerating,
      attachments
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (content: string, userAttachments?: UploadedFile[]) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
      attachments: userAttachments
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleFileUpload = async (files: FileList) => {
    setIsUploading(true);
    const newAttachments: UploadedFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileId = Date.now() + i;
      
      // Create preview for images
      let preview: string | undefined;
      if (file.type.startsWith('image/')) {
        preview = URL.createObjectURL(file);
      }

      const attachment: UploadedFile = {
        id: fileId.toString(),
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'document',
        file,
        preview
      };

      newAttachments.push(attachment);
    }

    setAttachments(prev => [...prev, ...newAttachments]);
    setIsUploading(false);
    setShowUploadMenu(false);
    
    // Add message with attachments
    addUserMessage(`I've uploaded ${newAttachments.length} reference file${newAttachments.length > 1 ? 's' : ''} for you to analyze.`, newAttachments);
    
    // Get AI response about the uploaded files
    const fileNames = newAttachments.map(f => f.name).join(', ');
    const aiResponse = await callOpenAI(`I've uploaded these reference files: ${fileNames}. Can you analyze them and help me create content based on what you see?`, messages);
    addBotMessage(aiResponse);
  };

  const handleUrlUpload = async (url: string) => {
    if (!url.trim()) return;
    
    setIsUploading(true);
    const urlId = Date.now().toString();
    
    const attachment: UploadedFile = {
      id: urlId,
      name: url,
      type: 'url',
      url: url
    };

    setAttachments(prev => [...prev, attachment]);
    setIsUploading(false);
    setShowUploadMenu(false);
    
    // Add message with URL
    addUserMessage(`I've shared this reference URL: ${url}`, [attachment]);
    
    // Get AI response about the URL
    const aiResponse = await callOpenAI(`I've shared this reference URL: ${url}. Can you analyze it and help me create content based on what you find?`, messages);
    addBotMessage(aiResponse);
  };

  const removeAttachment = (attachmentId: string) => {
    setAttachments(prev => prev.filter(att => att.id !== attachmentId));
  };

  const callOpenAI = async (userInput: string, conversationHistory: ChatMessage[]) => {
    try {
      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInput,
          conversationHistory: conversationHistory.map(msg => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.content,
            attachments: msg.attachments
          })),
          isConversation: true,
          attachments: attachments
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from Rigo");
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error calling OpenAI:", error);
      return "I apologize, but I'm having trouble connecting right now. Let's try again!";
    }
  };

  const handleOptionSelect = async (option: string) => {
    addUserMessage(option);
    
    // Add a temporary "thinking" message
    const thinkingMessageId = Date.now().toString();
    setMessages(prev => [...prev, {
      id: thinkingMessageId,
      type: 'bot',
      content: "Let me think about that...",
      timestamp: new Date(),
      isGenerating: true
    }]);

    // Get AI response
    const aiResponse = await callOpenAI(option, messages);
    
    // Remove thinking message and add real response
    setMessages(prev => prev.filter(msg => msg.id !== thinkingMessageId));
    addBotMessage(aiResponse);
  };

  const handleUserInput = async (input: string) => {
    if (!input.trim()) return;
    
    addUserMessage(input);
    setInputValue('');
    
    // Add a temporary "thinking" message
    const thinkingMessageId = Date.now().toString();
    setMessages(prev => [...prev, {
      id: thinkingMessageId,
      type: 'bot',
      content: "Let me think about that...",
      timestamp: new Date(),
      isGenerating: true
    }]);

    // Get AI response
    const aiResponse = await callOpenAI(input, messages);
    
    // Remove thinking message and add real response
    setMessages(prev => prev.filter(msg => msg.id !== thinkingMessageId));
    addBotMessage(aiResponse);
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
    setAttachments([]);
    addBotMessage("Ahoy! I'm Rigo, your AI marketing assistant inspired by the great explorer Amerigo Vespucci! 🌍 Ready to discover amazing content together? What kind of marketing content would you like to create today?", [
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
        <h2 className="text-lg font-medium">Rigo - AI Marketing Assistant</h2>
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
                    <div className="flex items-center gap-2 mb-2">
                      {message.isGenerating && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}
                      <p className="text-sm">{message.content}</p>
                    </div>
                    
                    {/* Attachments */}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.attachments.map((attachment) => (
                          <div key={attachment.id} className="flex items-center gap-2 p-2 bg-white/50 rounded border">
                            {attachment.type === 'image' && attachment.preview ? (
                              <div className="relative">
                                <img 
                                  src={attachment.preview} 
                                  alt={attachment.name}
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <button
                                  onClick={() => removeAttachment(attachment.id)}
                                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ) : (
                              <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                                {attachment.type === 'image' ? <Image className="h-6 w-6 text-gray-500" /> : <File className="h-6 w-6 text-gray-500" />}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium truncate">{attachment.name}</p>
                              <p className="text-xs text-gray-500">{attachment.type}</p>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                if (attachment.preview) {
                                  window.open(attachment.preview, '_blank');
                                }
                              }}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    
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

        {/* Upload Menu */}
        {showUploadMenu && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Files
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.txt"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full"
                  disabled={isUploading}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isUploading ? "Uploading..." : "Choose Files"}
                </Button>
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">🔗</span>
                </div>
                <input
                  ref={urlInputRef}
                  type="url"
                  placeholder="Paste a URL reference..."
                  className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const url = (e.target as HTMLInputElement).value;
                      handleUrlUpload(url);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <Button
                    onClick={() => {
                      const url = urlInputRef.current?.value;
                      if (url) {
                        handleUrlUpload(url);
                        urlInputRef.current!.value = '';
                      }
                    }}
                    size="sm"
                    disabled={isUploading}
                  >
                    Add
                  </Button>
                </div>
              </div>
              
              <Button
                onClick={() => setShowUploadMenu(false)}
                variant="ghost"
                size="sm"
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUploadMenu(!showUploadMenu)}
              className="flex-shrink-0"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
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
          
          {/* Current Attachments */}
          {attachments.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {attachments.map((attachment) => (
                <div key={attachment.id} className="flex items-center gap-2 p-2 bg-gray-100 rounded border">
                  {attachment.type === 'image' && attachment.preview ? (
                    <img 
                      src={attachment.preview} 
                      alt={attachment.name}
                      className="w-6 h-6 object-cover rounded"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                      {attachment.type === 'image' ? <Image className="h-4 w-4 text-gray-500" /> : <File className="h-4 w-4 text-gray-500" />}
                    </div>
                  )}
                  <span className="text-xs font-medium truncate max-w-20">{attachment.name}</span>
                  <button
                    onClick={() => removeAttachment(attachment.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentCreator;

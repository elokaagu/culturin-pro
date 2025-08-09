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
  MessageSquare,
  Download,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Search,
  Pencil,
  BookOpen,
  Mic,
  Link,
  Calendar,
  MapPin,
  Users,
  Target,
  MessageCircle,
  Instagram,
  Facebook,
  Mail,
  Globe,
  FileImage,
  TrendingUp,
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
  generatedImage?: string;
  imagePrompt?: string;
  audioUrl?: string;
  generatedContent?: any;
  flyerDesign?: any;
  contentType?: string;
  platform?: string;
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

interface RecentProject {
  id: string;
  title: string;
  type: string;
  timestamp: string;
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
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);

  // Mock recent projects
  const [recentProjects] = useState<RecentProject[]>([
    {
      id: "1",
      title: "Barcelona Tapas Experience Marketing Campaign",
      type: "Instagram Caption",
      timestamp: "1 hour ago",
      platform: "Instagram"
    },
    {
      id: "2", 
      title: "Traditional Moroccan Cooking Class Promotion",
      type: "Facebook Ad",
      timestamp: "3 hours ago",
      platform: "Facebook"
    },
    {
      id: "3",
      title: "Kyoto Tea Ceremony Cultural Experience",
      type: "Google Ad Copy",
      timestamp: "6 hours ago",
      platform: "Google Ads"
    },
    {
      id: "4",
      title: "Venice Gondola Ride Social Media Content",
      type: "TikTok Hook",
      timestamp: "2 days ago",
      platform: "TikTok"
    },
    {
      id: "5",
      title: "Istanbul Bazaar Cultural Tour Email Newsletter",
      type: "Email Newsletter",
      timestamp: "3 weeks ago",
      platform: "Email"
    }
  ]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize chat on component mount
  useEffect(() => {
    if (messages.length === 0 && showChat) {
      addBotMessage("Ahoy! I'm Rigo, your AI marketing assistant. Ready to discover amazing content together? What kind of marketing content would you like to create today?", [
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
  }, [showChat]);

  const addBotMessage = (content: string, options?: string[], isGenerating: boolean = false, attachments?: UploadedFile[], generatedImage?: string, imagePrompt?: string, generatedData?: any) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'bot',
      content,
      timestamp: new Date(),
      options,
      isGenerating,
      attachments,
      generatedImage,
      imagePrompt,
      generatedContent: generatedData?.generatedContent,
      flyerDesign: generatedData?.flyerDesign,
      contentType: generatedData?.contentType,
      platform: generatedData?.platform
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

  const generateSpeech = async (text: string): Promise<string | null> => {
    try {
      const response = await fetch("/api/generate-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          voice: "rigo", // We'll use a specific voice for Rigo
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate speech");
      }

      const data = await response.json();
      return data.audioUrl;
    } catch (error) {
      console.error("Error generating speech:", error);
      return null;
    }
  };

  const playAudio = async (audioUrl: string) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const audio = new Audio(audioUrl);
    audio.onended = () => {
      setIsPlaying(false);
      setCurrentAudio(null);
    };
    audio.onerror = () => {
      setIsPlaying(false);
      setCurrentAudio(null);
      toast.error("Failed to play audio");
    };

    setCurrentAudio(audio);
    setIsPlaying(true);
    audio.play();
  };

  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setIsPlaying(false);
      setCurrentAudio(null);
    }
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
      return data;
    } catch (error) {
      console.error("Error calling OpenAI:", error);
      return "I apologize, but I'm having trouble connecting right now. Let's try again!";
    }
  };

  const handleOptionSelect = async (option: string) => {
    // Handle action buttons for generated content
    if (option === "Copy Content") {
      return handleCopyGeneratedContent();
    }
    if (option === "Save to Library") {
      return handleSaveGeneratedContent();
    }
    if (option === "Generate Images") {
      return handleGenerateImagesForContent();
    }
    if (option === "Create Another") {
      return handleCreateAnother();
    }

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
    
    if (aiResponse.generatedImage) {
      addBotMessage(aiResponse.response, undefined, false, undefined, aiResponse.generatedImage, aiResponse.imagePrompt);
    } else if (aiResponse.generatedContent || aiResponse.flyerDesign) {
      // Handle generated content or flyer
      const responseText = aiResponse.response || "Here's your generated content:";
      addBotMessage(responseText, [
        "Copy Content",
        "Save to Library", 
        "Generate Images",
        "Create Another"
      ], false, undefined, undefined, undefined, aiResponse);
    } else {
      const responseText = aiResponse.response || aiResponse;
      addBotMessage(responseText);
      
      // Generate speech if voice is enabled
      if (isVoiceEnabled && responseText) {
        const audioUrl = await generateSpeech(responseText);
        if (audioUrl) {
          // Update the last message with audio
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage && lastMessage.type === 'bot') {
              lastMessage.audioUrl = audioUrl;
            }
            return newMessages;
          });
          
          // Auto-play the audio
          playAudio(audioUrl);
        }
      }
    }
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
    
    if (aiResponse.generatedImage) {
      addBotMessage(aiResponse.response, undefined, false, undefined, aiResponse.generatedImage, aiResponse.imagePrompt);
    } else if (aiResponse.generatedContent || aiResponse.flyerDesign) {
      // Handle generated content or flyer
      const responseText = aiResponse.response || "Here's your generated content:";
      addBotMessage(responseText, [
        "Copy Content",
        "Save to Library", 
        "Generate Images",
        "Create Another"
      ], false, undefined, undefined, undefined, aiResponse);
    } else {
      const responseText = aiResponse.response || aiResponse;
      addBotMessage(responseText);
      
      // Generate speech if voice is enabled
      if (isVoiceEnabled && responseText) {
        const audioUrl = await generateSpeech(responseText);
        if (audioUrl) {
          // Update the last message with audio
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage && lastMessage.type === 'bot') {
              lastMessage.audioUrl = audioUrl;
            }
            return newMessages;
          });
          
          // Auto-play the audio
          playAudio(audioUrl);
        }
      }
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
      
      addBotMessage("Here's your content! What would you like to do with it?", [
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
    addBotMessage("Content copied to clipboard!");
  };

  const handleSaveContent = async () => {
    if (!generatedContent) return;
    
    try {
      // Save to localStorage as fallback
      localStorage.setItem("marketingContent", JSON.stringify(generatedContent));
      
      toast.success("Content saved to library!");
    } catch (error) {
      console.error('Error saving marketing content:', error);
      addBotMessage("Failed to save content. Please try again.");
    }
  };

  const handleCopyGeneratedContent = () => {
    // Find the last message with generated content
    const lastMessageWithContent = messages.reverse().find(msg => 
      msg.generatedContent || msg.flyerDesign
    );
    
    if (lastMessageWithContent) {
      let contentToCopy = '';
      if (lastMessageWithContent.generatedContent) {
        contentToCopy = lastMessageWithContent.generatedContent;
      } else if (lastMessageWithContent.flyerDesign) {
        contentToCopy = JSON.stringify(lastMessageWithContent.flyerDesign, null, 2);
      }
      
      navigator.clipboard.writeText(contentToCopy);
      addBotMessage("Content copied to clipboard!");
      toast.success("Content copied to clipboard!");
    } else {
      addBotMessage("No content found to copy.");
    }
  };

  const handleSaveGeneratedContent = () => {
    // Find the last message with generated content
    const lastMessageWithContent = messages.reverse().find(msg => 
      msg.generatedContent || msg.flyerDesign
    );
    
    if (lastMessageWithContent) {
      const contentToSave = {
        id: Date.now().toString(),
        type: lastMessageWithContent.contentType || 'content',
        platform: lastMessageWithContent.platform || 'general',
        content: lastMessageWithContent.generatedContent || lastMessageWithContent.flyerDesign,
        createdAt: new Date().toISOString()
      };
      
      // Save to localStorage
      try {
        const existingContent = JSON.parse(localStorage.getItem('rigoGeneratedContent') || '[]');
        existingContent.push(contentToSave);
        localStorage.setItem('rigoGeneratedContent', JSON.stringify(existingContent));
        
        addBotMessage("Content saved to your library!");
        toast.success("Content saved to library!");
      } catch (error) {
        addBotMessage("Failed to save content. Please try again.");
        toast.error("Failed to save content");
      }
    } else {
      addBotMessage("No content found to save.");
    }
  };

  const handleGenerateImagesForContent = async () => {
    // Find the last message with generated content
    const lastMessageWithContent = messages.reverse().find(msg => 
      msg.generatedContent || msg.flyerDesign
    );
    
    if (lastMessageWithContent) {
      addBotMessage("Let me generate some images for your content...", undefined, true);
      
      try {
        const imagePrompt = `Create a professional marketing image for: ${
          lastMessageWithContent.generatedContent || 
          JSON.stringify(lastMessageWithContent.flyerDesign)
        }`;
        
        const response = await fetch("/api/generate-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: imagePrompt,
            assetType: "social-media"
          }),
        });
        
        const data = await response.json();
        
        if (data.images && data.images.length > 0) {
          addBotMessage("Here are some images for your content:", [
            "Copy Content",
            "Save to Library",
            "Create Another"
          ], false, undefined, data.images[0], imagePrompt);
        } else {
          addBotMessage("Sorry, I couldn't generate images right now. Please try again later.");
        }
      } catch (error) {
        console.error("Error generating images:", error);
        addBotMessage("Sorry, I encountered an error generating images. Please try again.");
      }
    } else {
      addBotMessage("Please generate some content first, then I can create images for it.");
    }
  };

  const handleCreateAnother = () => {
    setGeneratedContent(null);
    setConversationState({ step: 'welcome' });
    setMessages([]);
    setAttachments([]);
    stopAudio();
    setShowChat(false);
  };

  const handleStartChat = () => {
    setShowChat(true);
  };

  const getPlatformIcon = (platform?: string) => {
    switch (platform?.toLowerCase()) {
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      case 'tiktok':
        return <TrendingUp className="h-4 w-4" />;
      case 'google ads':
        return <Target className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  const filteredProjects = recentProjects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showChat) {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pl-8">
          <h2 className="text-lg font-medium">Rigo - AI Marketing Assistant</h2>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
              className={isVoiceEnabled ? "text-blue-600" : "text-gray-400"}
            >
              {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCreateAnother}>
              <Sparkles className="h-4 w-4 mr-2" />
              Back to Studio
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
                      {message.type === 'user' ? <User className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
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
                        {message.type === 'bot' && message.audioUrl && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => isPlaying ? stopAudio() : playAudio(message.audioUrl!)}
                            className="ml-2"
                          >
                            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                          </Button>
                        )}
                      </div>
                      
                      {/* Generated Image */}
                      {message.generatedImage && (
                        <div className="mt-3">
                          <div className="bg-white p-3 rounded border">
                            <img 
                              src={message.generatedImage} 
                              alt="Generated marketing image"
                              className="w-full h-auto rounded-lg"
                            />
                            {message.imagePrompt && (
                              <p className="text-xs text-gray-500 mt-2">
                                Generated based on: {message.imagePrompt}
                              </p>
                            )}
                            <div className="flex gap-2 mt-3">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  const link = document.createElement('a');
                                  link.href = message.generatedImage!;
                                  link.download = 'marketing-image.png';
                                  link.click();
                                }}
                              >
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  navigator.clipboard.writeText(message.generatedImage!);
                                  toast.success("Image URL copied to clipboard!");
                                }}
                              >
                                <Copy className="h-3 w-3 mr-1" />
                                Copy URL
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Generated Content */}
                      {(message.generatedContent || message.flyerDesign) && (
                        <div className="mt-3">
                          <div className="bg-white p-4 rounded border">
                            <div className="flex items-center gap-2 mb-3">
                              <Sparkles className="h-4 w-4 text-blue-500" />
                              <span className="text-sm font-medium">
                                Generated {message.platform || 'Content'}
                              </span>
                            </div>
                            
                            {message.generatedContent && (
                              <div className="bg-gray-50 p-3 rounded text-sm whitespace-pre-wrap">
                                {message.generatedContent}
                              </div>
                            )}
                            
                            {message.flyerDesign && (
                              <div className="space-y-3">
                                {typeof message.flyerDesign === 'object' ? (
                                  <div className="space-y-2">
                                    {message.flyerDesign.headline && (
                                      <div>
                                        <span className="text-xs font-medium text-gray-500">Headline:</span>
                                        <p className="text-sm font-bold">{message.flyerDesign.headline}</p>
                                      </div>
                                    )}
                                    {message.flyerDesign.subheading && (
                                      <div>
                                        <span className="text-xs font-medium text-gray-500">Subheading:</span>
                                        <p className="text-sm">{message.flyerDesign.subheading}</p>
                                      </div>
                                    )}
                                    {message.flyerDesign.description && (
                                      <div>
                                        <span className="text-xs font-medium text-gray-500">Description:</span>
                                        <p className="text-sm">{message.flyerDesign.description}</p>
                                      </div>
                                    )}
                                    {message.flyerDesign.benefits && (
                                      <div>
                                        <span className="text-xs font-medium text-gray-500">Benefits:</span>
                                        <ul className="text-sm list-disc list-inside space-y-1">
                                          {message.flyerDesign.benefits.map((benefit: string, idx: number) => (
                                            <li key={idx}>{benefit}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    {message.flyerDesign.callToAction && (
                                      <div>
                                        <span className="text-xs font-medium text-gray-500">Call to Action:</span>
                                        <p className="text-sm font-medium text-blue-600">{message.flyerDesign.callToAction}</p>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div className="bg-gray-50 p-3 rounded text-sm whitespace-pre-wrap">
                                    {JSON.stringify(message.flyerDesign, null, 2)}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
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
  }

  return (
    <div className="h-full flex flex-col p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Studio</h1>
        <p className="text-gray-600">Create amazing marketing content with Rigo, your AI assistant</p>
      </div>

      {/* New Project Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Button
          onClick={handleStartChat}
          className="h-32 flex flex-col items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
        >
          <Pencil className="h-8 w-8 text-gray-600" />
          <span className="font-medium text-gray-900">Start from scratch</span>
        </Button>
        
        <Button
          onClick={handleStartChat}
          className="h-32 flex flex-col items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
        >
          <BookOpen className="h-8 w-8 text-gray-600" />
          <span className="font-medium text-gray-900">Create a blog post</span>
        </Button>
        
        <Button
          onClick={handleStartChat}
          className="h-32 flex flex-col items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
        >
          <Mic className="h-8 w-8 text-gray-600" />
          <span className="font-medium text-gray-900">Create social content</span>
        </Button>
        
        <Button
          onClick={handleStartChat}
          className="h-32 flex flex-col items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
        >
          <Link className="h-8 w-8 text-gray-600" />
          <span className="font-medium text-gray-900">Import from URL</span>
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects..."
          className="pl-10"
        />
      </div>

      {/* Recent Projects */}
      <div className="relative">
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={handleStartChat}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  {getPlatformIcon(project.platform)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{project.title}</h3>
                  <p className="text-sm text-gray-500">{project.timestamp}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Fade overlay at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default ContentCreator;

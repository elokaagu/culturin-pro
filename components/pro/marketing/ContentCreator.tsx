"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Settings,
} from "lucide-react";
import { settingsService } from "@/lib/settings-service";
import ContentCanvas from "./ContentCanvas";
import FlyerCanvas from "./FlyerCanvas";
import { toast } from "sonner";
import { useMarketingProjects } from "@/hooks/useMarketingProjects";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { StudioSettings } from "./StudioSettings";
import { LoadingStateManager } from "@/components/ui/LoadingStateManager";

interface ChatMessage {
  id: string;
  type: "user" | "bot";
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
  type: "image" | "document" | "url";
  url?: string;
  file?: File;
  preview?: string;
}

interface ConversationState {
  step:
    | "welcome"
    | "content-type"
    | "experience-details"
    | "target-audience"
    | "tone"
    | "generating"
    | "result";
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
  const { user } = useAuth();
  
  // Debug auth state
  useEffect(() => {
    console.log("ContentCreator - Auth state:", {
      user: user ? user.email : null,
      userExists: !!user,
      timestamp: new Date().toISOString()
    });
  }, [user]);
  
  const {
    projects: recentProjects,
    filteredProjects,
    loading: projectsLoading,
    error: projectsError,
    searchQuery,
    setSearchQuery,
    createProject,
    deleteProject,
    searchProjects,
    getProjectConversations,
    addConversationMessage,
    refreshProjects,
  } = useMarketingProjects();

  // Add loading state for project creation
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationState, setConversationState] = useState<ConversationState>(
    {
      step: "welcome",
    }
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] =
    useState<GeneratedContent | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [attachments, setAttachments] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [showChat, setShowChat] = useState(false);
  const [currentProject, setCurrentProject] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [isDeletingProject, setIsDeletingProject] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize chat on component mount
  useEffect(() => {
    if (messages.length === 0 && showChat) {
      addBotMessage(
        "Hi! I'm Rigo, your AI marketing assistant. I'm here to help you create amazing marketing content for your cultural tourism business. What would you like to work on today?",
        undefined
      );
    }
  }, [showChat]);

  // Check ElevenLabs setting on mount
  useEffect(() => {
    const checkVoiceSettings = async () => {
      try {
        const settings = await settingsService.getSettings();
        if (settings?.elevenLabsEnabled) {
          setIsVoiceEnabled(true);
        }
      } catch (error) {
        console.error("Error checking voice settings:", error);
      }
    };

    checkVoiceSettings();
  }, []);

  const addBotMessage = async (
    content: string,
    options?: string[],
    isGenerating: boolean = false,
    attachments?: UploadedFile[],
    generatedImage?: string,
    imagePrompt?: string,
    generatedData?: any
  ) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "bot",
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
      platform: generatedData?.platform,
    };
    setMessages((prev) => [...prev, newMessage]);

    // Save bot message to database if we have a current project
    if (currentProject && user) {
      try {
        await addConversationMessage({
          project_id: currentProject,
          message_type: "bot",
          content,
          metadata: {
            options,
            isGenerating,
            attachments,
            generatedImage,
            imagePrompt,
            generatedContent: generatedData?.generatedContent,
            flyerDesign: generatedData?.flyerDesign,
            contentType: generatedData?.contentType,
            platform: generatedData?.platform,
          },
        });
      } catch (error) {
        console.error("Error saving bot message to database:", error);
      }
    }
  };

  const addUserMessage = async (
    content: string,
    userAttachments?: UploadedFile[]
  ) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
      attachments: userAttachments,
    };
    setMessages((prev) => [...prev, newMessage]);

    // Save message to database if we have a current project
    if (currentProject && user) {
      try {
        await addConversationMessage({
          project_id: currentProject,
          message_type: "user",
          content,
          metadata: userAttachments
            ? { attachments: userAttachments }
            : undefined,
        });
      } catch (error) {
        console.error("Error saving user message to database:", error);
      }
    }
  };

  // Function to format AI responses with proper paragraphs and tool recommendations
  const formatAIResponse = (content: string): { formattedContent: string; toolRecommendations: string[] } => {
    // Split content by double line breaks to identify paragraphs
    const paragraphs = content.split(/\n\s*\n/);
    
    // Check if there are tool recommendations (after the --- separator)
    const hasToolRecommendations = content.includes('---') && content.includes('Recommended Marketing Tools:');
    
    let formattedContent = content;
    let toolRecommendations: string[] = [];
    
    if (hasToolRecommendations) {
      const parts = content.split('---');
      formattedContent = parts[0].trim();
      
      // Extract tool recommendations
      const toolsSection = parts[1];
      if (toolsSection) {
        const toolLines = toolsSection
          .split('\n')
          .filter(line => line.trim().startsWith('📱') || line.trim().startsWith('📊') || 
                         line.trim().startsWith('🎨') || line.trim().startsWith('🎵') ||
                         line.trim().startsWith('📘') || line.trim().startsWith('🔍') ||
                         line.trim().startsWith('📧') || line.trim().startsWith('✍️') ||
                         line.trim().startsWith('📝') || line.trim().startsWith('🔍') ||
                         line.trim().startsWith('📚') || line.trim().startsWith('📸') ||
                         line.trim().startsWith('📱') || line.trim().startsWith('🎬') ||
                         line.trim().startsWith('🎯') || line.trim().startsWith('📈') ||
                         line.trim().startsWith('🖼️') || line.trim().startsWith('📐') ||
                         line.trim().startsWith('🎭'))
          .map(line => line.trim());
        
        toolRecommendations = toolLines;
      }
    }
    
    return { formattedContent, toolRecommendations };
  };

  const generateSpeech = async (text: string): Promise<string | null> => {
    try {
      // Check if ElevenLabs is enabled in settings
      const settings = await settingsService.getSettings();
      if (!settings?.elevenLabsEnabled) {
        toast.info(
          "Text-to-speech is disabled. Enable it in Studio Settings to generate voiceovers."
        );
        return null;
      }

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
      toast.error("Failed to generate speech");
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
    const maxFileSize = 10 * 1024 * 1024; // 10MB limit
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file size
        if (file.size > maxFileSize) {
          toast.error(`File ${file.name} is too large. Maximum size is 10MB.`);
          continue;
        }

        // Validate file type
        if (!allowedTypes.includes(file.type)) {
          toast.error(`File type ${file.type} is not supported.`);
          continue;
        }

        const fileId = Date.now() + i;

        // Create preview for images
        let preview: string | undefined;
        if (file.type.startsWith("image/")) {
          preview = URL.createObjectURL(file);
        }

        const attachment: UploadedFile = {
          id: fileId.toString(),
          name: file.name,
          type: file.type.startsWith("image/") ? "image" : "document",
          file,
          preview,
        };

        newAttachments.push(attachment);
      }

      if (newAttachments.length > 0) {
        setAttachments((prev) => [...prev, ...newAttachments]);
        setShowUploadMenu(false);

        // Add message with attachments
        addUserMessage(
          `I've uploaded ${newAttachments.length} reference file${
            newAttachments.length > 1 ? "s" : ""
          } for you to analyze.`,
          newAttachments
        );

        // Get AI response about the uploaded files
        const fileNames = newAttachments.map((f) => f.name).join(", ");
        const aiResponse = await callOpenAI(
          `I've uploaded these reference files: ${fileNames}. Can you analyze them and help me create content based on what you see?`,
          messages
        );
        addBotMessage(aiResponse);

        toast.success(`Successfully uploaded ${newAttachments.length} file${newAttachments.length > 1 ? 's' : ''}`);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Failed to upload files. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlUpload = async (url: string) => {
    if (!url.trim()) return;

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      toast.error("Please enter a valid URL");
      return;
    }

    setIsUploading(true);
    const urlId = Date.now().toString();

    try {
      const attachment: UploadedFile = {
        id: urlId,
        name: url,
        type: "url",
        url: url,
      };

      setAttachments((prev) => [...prev, attachment]);
      setShowUploadMenu(false);

      // Add message with URL
      addUserMessage(`I've shared this reference URL: ${url}`, [attachment]);

      // Get AI response about the URL
      const aiResponse = await callOpenAI(
        `I've shared this reference URL: ${url}. Can you analyze it and help me create content based on what you find?`,
        messages
      );
      addBotMessage(aiResponse);

      toast.success("URL added successfully");
    } catch (error) {
      console.error("Error adding URL:", error);
      toast.error("Failed to add URL. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeAttachment = (attachmentId: string) => {
    setAttachments((prev) => prev.filter((att) => att.id !== attachmentId));
  };

  const handleDeleteProject = (projectId: string) => {
    setProjectToDelete(projectId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteProject = async () => {
    if (!projectToDelete) return;

    setIsDeletingProject(true);
    try {
      const success = await deleteProject(projectToDelete);
      if (success) {
        toast.success("Project deleted successfully");
        setShowDeleteConfirm(false);
        setProjectToDelete(null);
      } else {
        toast.error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    } finally {
      setIsDeletingProject(false);
    }
  };

  const callOpenAI = async (
    userInput: string,
    conversationHistory: ChatMessage[]
  ) => {
    try {
      console.log("Calling OpenAI API with:", {
        userInput,
        conversationHistoryLength: conversationHistory?.length || 0,
        attachments: attachments?.length || 0
      });

      const requestBody = {
        userInput,
        conversationHistory: conversationHistory.map((msg) => ({
          role: msg.type === "user" ? "user" : "assistant",
          content: msg.content,
          attachments: msg.attachments,
        })),
        isConversation: true,
        attachments: attachments,
      };

      console.log("Request body:", requestBody);

      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("API Response status:", response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error response:", errorText);
        throw new Error(`Failed to get response from Rigo: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API Response data:", data);
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
    setMessages((prev) => [
      ...prev,
      {
        id: thinkingMessageId,
        type: "bot",
        content: "Let me think about that...",
        timestamp: new Date(),
        isGenerating: true,
      },
    ]);

    // Get AI response
    const aiResponse = await callOpenAI(option, messages);

    // Remove thinking message and add real response
    setMessages((prev) => prev.filter((msg) => msg.id !== thinkingMessageId));

    if (aiResponse.generatedImage && !aiResponse.flyerDesign) {
      // Pure image generation (not flyer with image)
      addBotMessage(
        aiResponse.response,
        undefined,
        false,
        undefined,
        aiResponse.generatedImage,
        aiResponse.imagePrompt
      );
    } else if (aiResponse.generatedContent || aiResponse.flyerDesign) {
      // Handle generated content or flyer (with or without image)
      const responseText =
        aiResponse.response || "Here's your generated content:";
      addBotMessage(
        responseText,
        [
          "Copy Content",
          "Save to Library",
          "Generate Images",
          "Create Another",
        ],
        false,
        undefined,
        undefined,
        undefined,
        aiResponse
      );
    } else {
      const responseText = aiResponse.response || aiResponse;
      addBotMessage(responseText);

      // Generate speech if voice is enabled
      if (isVoiceEnabled && responseText) {
        const audioUrl = await generateSpeech(responseText);
        if (audioUrl) {
          // Update the last message with audio
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage && lastMessage.type === "bot") {
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

    // Check if we have a current project, if not, create one first
    if (!currentProject) {
      console.log("No current project, creating one first...");
      const projectData = {
        title: `Chat about: ${input.substring(0, 50)}...`,
        type: "scratch" as const,
        platform: "general" as any,
      };
      
      try {
        const newProject = await createProject(projectData);
        if (newProject) {
          setCurrentProject(newProject.id);
          console.log("Project created successfully:", newProject.id);
        } else {
          toast.error("Failed to create project. Please try again.");
          return;
        }
      } catch (error) {
        console.error("Error creating project:", error);
        toast.error("Failed to create project. Please try again.");
        return;
      }
    }

    addUserMessage(input);
    setInputValue("");

    // Add a temporary "thinking" message
    const thinkingMessageId = Date.now().toString();
    setMessages((prev) => [
      ...prev,
      {
        id: thinkingMessageId,
        type: "bot",
        content: "Let me think about that...",
        timestamp: new Date(),
        isGenerating: true,
      },
    ]);

    // Get AI response - use current messages array
    const currentMessages = messages || [];
    const aiResponse = await callOpenAI(input, currentMessages);

    // Remove thinking message and add real response
    setMessages((prev) => prev.filter((msg) => msg.id !== thinkingMessageId));

    if (aiResponse.generatedImage && !aiResponse.flyerDesign) {
      // Pure image generation (not flyer with image)
      addBotMessage(
        aiResponse.response,
        undefined,
        false,
        undefined,
        aiResponse.generatedImage,
        aiResponse.imagePrompt
      );
    } else if (aiResponse.generatedContent || aiResponse.flyerDesign) {
      // Handle generated content or flyer (with or without image)
      const responseText =
        aiResponse.response || "Here's your generated content:";
      addBotMessage(
        responseText,
        [
          "Copy Content",
          "Save to Library",
          "Generate Images",
          "Create Another",
        ],
        false,
        undefined,
        undefined,
        undefined,
        aiResponse
      );
    } else {
      const responseText = aiResponse.response || aiResponse;
      addBotMessage(responseText);

      // Generate speech if voice is enabled
      if (isVoiceEnabled && responseText) {
        const audioUrl = await generateSpeech(responseText);
        if (audioUrl) {
          // Update the last message with audio
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage && lastMessage.type === "bot") {
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
    if (
      !conversationState.contentType ||
      !conversationState.experienceTitle ||
      !conversationState.location
    ) {
      addBotMessage(
        "I need a bit more information to create your content. Let's start over!"
      );
      setConversationState({ step: "welcome" });
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
          contentType: conversationState.contentType
            ?.toLowerCase()
            .replace(" ", "-"),
          experienceTitle: conversationState.experienceTitle,
          location: conversationState.location,
          keyCulturalElements: conversationState.keyCulturalElements || "",
          targetAudience:
            conversationState.targetAudience?.toLowerCase().replace(" ", "-") ||
            "cultural-travelers",
          tone:
            conversationState.tone
              ?.toLowerCase()
              .replace(" & ", "-")
              .replace(" ", "-") || "friendly",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate content");
      }

      const data = await response.json();

      let content = "";
      let wordCount = 0;

      if (
        conversationState.contentType?.toLowerCase().includes("google") &&
        typeof data.content === "object"
      ) {
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
      setConversationState((prev) => ({ ...prev, step: "result" }));

      addBotMessage("Here's your content! What would you like to do with it?", [
        "Copy to Clipboard",
        "Save to Library",
        "Create Another",
        "Generate Images",
      ]);
    } catch (error) {
      console.error("Error generating content:", error);
      addBotMessage(
        "Sorry, I encountered an error while generating your content. Let's try again!"
      );
      setConversationState({ step: "welcome" });
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
      localStorage.setItem(
        "marketingContent",
        JSON.stringify(generatedContent)
      );

      toast.success("Content saved to library!");
    } catch (error) {
      console.error("Error saving marketing content:", error);
      addBotMessage("Failed to save content. Please try again.");
    }
  };

  const handleCopyGeneratedContent = () => {
    // Find the last message with generated content
    const lastMessageWithContent = messages
      .reverse()
      .find((msg) => msg.generatedContent || msg.flyerDesign);

    if (lastMessageWithContent) {
      let contentToCopy = "";
      if (lastMessageWithContent.generatedContent) {
        contentToCopy = lastMessageWithContent.generatedContent;
      } else if (lastMessageWithContent.flyerDesign) {
        contentToCopy = JSON.stringify(
          lastMessageWithContent.flyerDesign,
          null,
          2
        );
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
    const lastMessageWithContent = messages
      .reverse()
      .find((msg) => msg.generatedContent || msg.flyerDesign);

    if (lastMessageWithContent) {
      const contentToSave = {
        id: Date.now().toString(),
        type: lastMessageWithContent.contentType || "content",
        platform: lastMessageWithContent.platform || "general",
        content:
          lastMessageWithContent.generatedContent ||
          lastMessageWithContent.flyerDesign,
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage
      try {
        const existingContent = JSON.parse(
          localStorage.getItem("rigoGeneratedContent") || "[]"
        );
        existingContent.push(contentToSave);
        localStorage.setItem(
          "rigoGeneratedContent",
          JSON.stringify(existingContent)
        );

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
    const lastMessageWithContent = messages
      .reverse()
      .find((msg) => msg.generatedContent || msg.flyerDesign);

    if (lastMessageWithContent) {
      addBotMessage(
        "Let me generate some images for your content...",
        undefined,
        true
      );

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
            assetType: "social-media",
          }),
        });

        const data = await response.json();

        if (data.images && data.images.length > 0) {
          addBotMessage(
            "Here are some images for your content:",
            ["Copy Content", "Save to Library", "Create Another"],
            false,
            undefined,
            data.images[0],
            imagePrompt
          );
        } else {
          addBotMessage(
            "Sorry, I couldn't generate images right now. Please try again later."
          );
        }
      } catch (error) {
        console.error("Error generating images:", error);
        addBotMessage(
          "Sorry, I encountered an error generating images. Please try again."
        );
      }
    } else {
      addBotMessage(
        "Please generate some content first, then I can create images for it."
      );
    }
  };

  const handleCreateAnother = () => {
    setGeneratedContent(null);
    setConversationState({ step: "welcome" });
    setMessages([]);
    setAttachments([]);
    stopAudio();
    setShowChat(false);
    setCurrentProject(null);
  };

  const handleStartChat = async (
    projectType?: string,
    projectTitle?: string
  ) => {
    try {
      setIsCreatingProject(true);

      // Check if user is authenticated
      if (!user) {
        toast.error("Please sign in to create projects");
        setIsCreatingProject(false);
        return;
      }

      let projectId = currentProject;

      // If no current project, create a new one
      if (!projectId) {
        const projectData = {
          title: projectTitle || `New ${projectType || "Marketing"} Project`,
          type: (projectType as any) || "scratch",
          platform: (projectType === "blog"
            ? "general"
            : projectType === "email"
            ? "email"
            : projectType === "social"
            ? "instagram"
            : projectType === "url_import"
            ? "general"
            : undefined) as any,
        };

        console.log("Creating project with data:", projectData);
        const newProject = await createProject(projectData);

        if (newProject) {
          projectId = newProject.id;
          setCurrentProject(projectId);
          console.log("Project created successfully:", newProject);
        } else {
          toast.error("Failed to create project. Please try again.");
          setIsCreatingProject(false);
          return;
        }
      }

      if (projectId) {
        // Load existing conversations for this project
        const conversations = await getProjectConversations(projectId);
        const chatMessages: ChatMessage[] = conversations.map((conv) => ({
          id: conv.id,
          type: conv.message_type as "user" | "bot",
          content: conv.content,
          timestamp: new Date(conv.timestamp),
          metadata: conv.metadata,
        }));

        setMessages(chatMessages);
        setShowChat(true);
        setGeneratedContent(null);
        setConversationState({ step: "welcome" });

        // Add welcome message if no existing conversations
        if (chatMessages.length === 0) {
          await addBotMessage(
            "Hi! I'm Rigo, your AI marketing assistant. I'm here to help you create amazing marketing content for your cultural tourism business. What would you like to work on today?",
            undefined
          );
        }

        toast.success("Project started successfully!");
      }
    } catch (error) {
      console.error("Error starting chat:", error);
      toast.error(
        "Failed to start chat. Please check your connection and try again."
      );
    } finally {
      setIsCreatingProject(false);
    }
  };

  const getPlatformIcon = (platform?: string) => {
    switch (platform?.toLowerCase()) {
      case "instagram":
        return <Instagram className="h-4 w-4" />;
      case "facebook":
        return <Facebook className="h-4 w-4" />;
      case "tiktok":
        return <TrendingUp className="h-4 w-4" />;
      case "google ads":
        return <Target className="h-4 w-4" />;
      case "email":
        return <Mail className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

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
              onClick={async () => {
                const settings = await settingsService.getSettings();
                if (settings?.elevenLabsEnabled) {
                  setIsVoiceEnabled(!isVoiceEnabled);
                } else {
                  toast.info(
                    "Enable ElevenLabs in Studio Settings to use text-to-speech"
                  );
                }
              }}
              className={isVoiceEnabled ? "text-blue-600" : "text-gray-400"}
              disabled={!isVoiceEnabled}
            >
              {isVoiceEnabled ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
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
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] ${
                    message.type === "user" ? "order-2" : "order-1"
                  }`}
                >
                  <div
                    className={`flex items-start gap-3 ${
                      message.type === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {message.type === "user" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <MessageSquare className="h-4 w-4" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg px-4 py-3 ${
                        message.type === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {message.isGenerating && (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        )}
                        <div className="text-sm space-y-2">
                          {/* Format AI response with proper paragraphs */}
                          {message.type === "bot" ? (
                            <>
                              {(() => {
                                const { formattedContent, toolRecommendations } = formatAIResponse(message.content);
                                return (
                                  <>
                                    {/* Display formatted content with paragraphs */}
                                    <div className="whitespace-pre-wrap">
                                      {formattedContent.split('\n').map((paragraph, index) => (
                                        paragraph.trim() ? (
                                          <p key={index} className="mb-3 last:mb-0">
                                            {paragraph}
                                          </p>
                                        ) : null
                                      ))}
                                    </div>
                                    
                                                                            {/* Display tool recommendations if available */}
                                        {toolRecommendations.length > 0 && (
                                          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                            <h4 className="text-sm font-medium text-blue-800 mb-2">
                                              Recommended Marketing Tools
                                            </h4>
                                        <div className="space-y-2">
                                          {toolRecommendations.map((tool, index) => (
                                            <div key={index} className="text-xs text-blue-700">
                                              {tool}
                                            </div>
                                          ))}
                                        </div>
                                        <p className="text-xs text-blue-600 mt-2 italic">
                                          These tools can help you implement the strategies we discussed.
                                        </p>
                                      </div>
                                    )}
                                  </>
                                );
                              })()}
                            </>
                          ) : (
                            <p>{message.content}</p>
                          )}
                        </div>
                        {message.type === "bot" && message.audioUrl && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              isPlaying
                                ? stopAudio()
                                : playAudio(message.audioUrl!)
                            }
                            className="ml-2"
                          >
                            {isPlaying ? (
                              <Pause className="h-3 w-3" />
                            ) : (
                              <Play className="h-3 w-3" />
                            )}
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
                                  const link = document.createElement("a");
                                  link.href = message.generatedImage!;
                                  link.download = "marketing-image.png";
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
                                  navigator.clipboard.writeText(
                                    message.generatedImage!
                                  );
                                  toast.success(
                                    "Image URL copied to clipboard!"
                                  );
                                }}
                              >
                                <Copy className="h-3 w-3 mr-1" />
                                Copy URL
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Generated Content Canvas */}
                      {message.generatedContent && (
                        <div className="mt-3">
                          <ContentCanvas
                            content={message.generatedContent}
                            contentType={message.contentType || "content"}
                            platform={message.platform}
                            onCopy={() => {
                              navigator.clipboard.writeText(
                                message.generatedContent
                              );
                              toast.success("Content copied to clipboard!");
                            }}
                            onSave={() => {
                              const contentToSave = {
                                id: Date.now().toString(),
                                type: message.contentType || "content",
                                platform: message.platform || "general",
                                content: message.generatedContent,
                                createdAt: new Date().toISOString(),
                              };

                              try {
                                const existingContent = JSON.parse(
                                  localStorage.getItem(
                                    "rigoGeneratedContent"
                                  ) || "[]"
                                );
                                existingContent.push(contentToSave);
                                localStorage.setItem(
                                  "rigoGeneratedContent",
                                  JSON.stringify(existingContent)
                                );
                                toast.success("Content saved to library!");
                              } catch (error) {
                                toast.error("Failed to save content");
                              }
                            }}
                          />
                        </div>
                      )}

                      {/* Generated Flyer Canvas */}
                      {message.flyerDesign && (
                        <div className="mt-3">
                          {/* Show generated image first if available */}
                          {message.generatedImage && (
                            <div className="mb-4">
                              <div className="bg-white p-3 rounded border">
                                <div className="flex items-center gap-2 mb-3">
                                  <span className="text-sm font-medium text-gray-700">
                                    🎨 AI-Generated Flyer Design
                                  </span>
                                </div>
                                <img
                                  src={message.generatedImage}
                                  alt="Generated flyer design"
                                  className="w-full h-auto rounded-lg border"
                                />
                                {message.imagePrompt && (
                                  <p className="text-xs text-gray-500 mt-2">
                                    Design prompt: {message.imagePrompt}
                                  </p>
                                )}
                                <div className="flex gap-2 mt-3">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      const link = document.createElement("a");
                                      link.href = message.generatedImage!;
                                      link.download = "flyer-design.png";
                                      link.click();
                                      toast.success("Flyer image downloaded!");
                                    }}
                                  >
                                    📥 Download Image
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      navigator.clipboard.writeText(
                                        message.generatedImage!
                                      );
                                      toast.success(
                                        "Image URL copied to clipboard!"
                                      );
                                    }}
                                  >
                                    📋 Copy URL
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Show structured flyer content */}
                          <FlyerCanvas
                            flyerDesign={message.flyerDesign}
                            colorTheme="blue-ocean"
                            templateStyle="modern"
                            onCopy={() => {
                              const text =
                                typeof message.flyerDesign === "string"
                                  ? message.flyerDesign
                                  : JSON.stringify(
                                      message.flyerDesign,
                                      null,
                                      2
                                    );
                              navigator.clipboard.writeText(text);
                              toast.success(
                                "Flyer content copied to clipboard!"
                              );
                            }}
                            onSave={() => {
                              const contentToSave = {
                                id: Date.now().toString(),
                                type: "flyer",
                                platform: "print/digital",
                                content: message.flyerDesign,
                                generatedImage: message.generatedImage,
                                createdAt: new Date().toISOString(),
                              };

                              try {
                                const existingContent = JSON.parse(
                                  localStorage.getItem(
                                    "rigoGeneratedContent"
                                  ) || "[]"
                                );
                                existingContent.push(contentToSave);
                                localStorage.setItem(
                                  "rigoGeneratedContent",
                                  JSON.stringify(existingContent)
                                );
                                toast.success("Flyer saved to library!");
                              } catch (error) {
                                toast.error("Failed to save flyer");
                              }
                            }}
                          />
                        </div>
                      )}

                      {/* Attachments */}
                      {message.attachments &&
                        message.attachments.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {message.attachments.map((attachment) => (
                              <div
                                key={attachment.id}
                                className="flex items-center gap-2 p-2 bg-white/50 rounded border"
                              >
                                {attachment.type === "image" &&
                                attachment.preview ? (
                                  <div className="relative">
                                    <img
                                      src={attachment.preview}
                                      alt={attachment.name}
                                      className="w-12 h-12 object-cover rounded"
                                    />
                                    <button
                                      onClick={() =>
                                        removeAttachment(attachment.id)
                                      }
                                      className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                                    {attachment.type === "image" ? (
                                      <Image className="h-6 w-6 text-gray-500" />
                                    ) : (
                                      <File className="h-6 w-6 text-gray-500" />
                                    )}
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium truncate">
                                    {attachment.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {attachment.type}
                                  </p>
                                </div>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    if (attachment.preview) {
                                      window.open(attachment.preview, "_blank");
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
                        <h4 className="font-medium text-green-900">
                          {generatedContent.title}
                        </h4>
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
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCopyContent}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleSaveContent}
                        >
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
              <div className="space-y-4">
                {/* File Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Files
                  </label>
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.add('border-blue-400', 'bg-blue-50');
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
                      const files = e.dataTransfer.files;
                      if (files.length > 0) {
                        handleFileUpload(files);
                      }
                    }}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx,.txt"
                      onChange={(e) =>
                        e.target.files && handleFileUpload(e.target.files)
                      }
                      className="hidden"
                    />
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop files here, or click to browse
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      Supports: Images (JPG, PNG, GIF, WebP), PDFs, Word docs, Text files
                      <br />
                      Max size: 10MB per file
                    </p>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      disabled={isUploading}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {isUploading ? "Uploading..." : "Choose Files"}
                    </Button>
                  </div>
                </div>

                {/* URL Input Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Reference URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Link className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      ref={urlInputRef}
                      type="url"
                      placeholder="Paste a URL reference (e.g., competitor website, inspiration source)..."
                      className="block w-full pl-10 pr-20 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          const url = (e.target as HTMLInputElement).value;
                          handleUrlUpload(url);
                          (e.target as HTMLInputElement).value = "";
                        }
                      }}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <Button
                        onClick={() => {
                          const url = urlInputRef.current?.value;
                          if (url) {
                            handleUrlUpload(url);
                            urlInputRef.current!.value = "";
                          }
                        }}
                        size="sm"
                        disabled={isUploading}
                        className="h-8"
                      >
                        Add URL
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Current Attachments Preview */}
                {attachments.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Attachments ({attachments.length})
                    </label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-md"
                        >
                          {attachment.type === "image" && attachment.preview ? (
                            <img
                              src={attachment.preview}
                              alt={attachment.name}
                              className="w-6 h-6 object-cover rounded"
                            />
                          ) : attachment.type === "url" ? (
                            <Link className="w-6 h-6 text-blue-500" />
                          ) : (
                            <File className="w-6 h-6 text-gray-500" />
                          )}
                          <span className="text-xs font-medium truncate flex-1">
                            {attachment.name}
                          </span>
                          <button
                            onClick={() => removeAttachment(attachment.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="Remove attachment"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  onClick={() => setShowUploadMenu(false)}
                  variant="ghost"
                  size="sm"
                  className="w-full"
                >
                  Done
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
                  if (e.key === "Enter") {
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
                  <div
                    key={attachment.id}
                    className="flex items-center gap-2 p-2 bg-gray-100 rounded border"
                  >
                    {attachment.type === "image" && attachment.preview ? (
                      <img
                        src={attachment.preview}
                        alt={attachment.name}
                        className="w-6 h-6 object-cover rounded"
                      />
                    ) : (
                      <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                        {attachment.type === "image" ? (
                          <Image className="h-4 w-4 text-gray-500" />
                        ) : (
                          <File className="h-4 w-4 text-gray-500" />
                        )}
                      </div>
                    )}
                    <span className="text-xs font-medium truncate max-w-20">
                      {attachment.name}
                    </span>
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
    <div className="h-full flex flex-col">
      {/* Top Bar with Settings */}
      <div className="flex justify-between items-center p-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-foreground">Studio</h1>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>

        <div className="flex items-center gap-3">
          {/* Authentication Status */}
          {!user ? (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 border border-yellow-200 rounded-full">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-yellow-700">
                Sign in required (User: {user ? user.email : 'null'})
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 border border-green-200 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-700">
                Ready ({user.email})
              </span>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(true)}
            className="h-8 w-8 p-0"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content - Centered Minimalist Interface */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl space-y-8">
          {/* Welcome Message */}
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-medium text-foreground">
              What can I help with?
            </h2>
            <p className="text-muted-foreground text-sm">
              Create marketing content, generate ideas, or start a new project
            </p>
          </div>

          {/* Main Input Field */}
          <div className="relative">
            <div className="relative">
              {/* Plus Icon */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-muted-foreground">
                    +
                  </span>
                </div>
              </div>

              {/* Main Input */}
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && inputValue.trim()) {
                    handleUserInput(inputValue);
                  }
                }}
                placeholder="Ask anything..."
                className="h-14 pl-14 pr-20 text-base bg-card border-2 border-border hover:border-primary focus:border-primary transition-colors"
              />

              {/* Right Side Icons */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-muted"
                >
                  <Mic className="h-4 w-4 text-muted-foreground" />
                </Button>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-3 bg-muted-foreground rounded-full"></div>
                  <div className="w-1 h-5 bg-muted-foreground rounded-full"></div>
                  <div className="w-1 h-2 bg-muted-foreground rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStartChat("scratch", "Start from scratch")}
              disabled={isCreatingProject}
              className="h-10 text-xs"
            >
              {isCreatingProject ? "Creating..." : "New Project"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowUploadMenu(true)}
              className="h-10 text-xs"
            >
              Upload Files
            </Button>
          </div>

          {/* Recent Projects Section */}
          {filteredProjects.length > 0 && (
            <div className="space-y-3">
              <div className="text-center">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Recent Projects
                </h3>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {filteredProjects.slice(0, 3).map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => handleStartChat(project.type, project.title)}
                  >
                    <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                      {getPlatformIcon(project.platform)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {project.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {new Date(project.last_accessed).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProject(project.id);
                      }}
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600"
                      title="Delete project"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>

              {filteredProjects.length > 3 && (
                <div className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAllProjects(true)}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    View all {filteredProjects.length} projects
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Loading State Manager - Only show when there's an actual error */}
          {projectsError && (
            <LoadingStateManager
              loading={false}
              error={projectsError}
              onRetry={refreshProjects}
              timeout={8000}
              errorMessage="Failed to load projects"
            >
              <div className="text-center text-sm text-muted-foreground">
                Projects loaded successfully
              </div>
            </LoadingStateManager>
          )}
        </div>
      </div>

      {/* Settings Modal */}
      <StudioSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />

      {/* Delete Project Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Delete Project
                  </h3>
                  <p className="text-sm text-gray-500">
                    This action cannot be undone
                  </p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete this project? All associated conversations and data will be permanently removed.
              </p>
              
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setProjectToDelete(null);
                  }}
                  disabled={isDeletingProject}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={confirmDeleteProject}
                  disabled={isDeletingProject}
                >
                  {isDeletingProject ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete Project"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentCreator;

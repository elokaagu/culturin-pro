
import React, { useState } from 'react';
import { X, Send, Copy, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';

interface AIContentAssistantProps {
  onClose: () => void;
}

const AIContentAssistant: React.FC<AIContentAssistantProps> = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: 'Welcome to the AI Content Assistant! I can help you write engaging descriptions, suggest cultural context, or translate content. How can I assist you with your itinerary today?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm({
    defaultValues: {
      message: ''
    }
  });
  
  const onSubmit = (data: { message: string }) => {
    if (data.message.trim() === '') return;
    
    const newMessages = [
      ...messages,
      { role: 'user', content: data.message }
    ];
    
    setMessages(newMessages);
    form.reset();
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Here's a culturally rich description for your activity: 'Participants will engage in a traditional tea ceremony, a ritualized practice dating back to the 9th century. Under the guidance of a tea master, guests will learn about the spiritual principles of harmony (和), respect (敬), purity (清), and tranquility (寂) that form the foundation of this meditative art.'",
        "I've researched the local cultural context: The Fushimi Inari Shrine is dedicated to Inari, the Shinto deity of rice, agriculture, and prosperity. The thousands of vermilion torii gates were donated by businesses and individuals seeking good fortune, with each gate inscribed with the donor's name and the date of donation.",
        "For your spiritual journey theme, consider highlighting the concept of 'Shinrin-yoku' (forest bathing) during the Arashiyama bamboo grove visit. This Japanese practice emphasizes the healing powers of immersing oneself in nature, aligning perfectly with the transformative aspects of your itinerary."
      ];
      
      setMessages([
        ...newMessages,
        { role: 'system', content: responses[Math.floor(Math.random() * responses.length)] }
      ]);
      
      setIsLoading(false);
    }, 1500);
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The content has been copied to your clipboard."
    });
  };
  
  return (
    <div className="flex flex-col h-full border-l">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <h3 className="font-medium">AI Content Assistant</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg max-w-[90%] ${
                message.role === 'system' 
                  ? 'bg-white border ml-auto' 
                  : 'bg-black text-white mr-auto'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              {message.role === 'system' && message.content !== messages[0].content && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 mt-1" 
                  onClick={() => copyToClipboard(message.content)}
                >
                  <Copy className="h-3 w-3 mr-1" /> Copy
                </Button>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="bg-white border p-3 rounded-lg ml-auto max-w-[90%]">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200" />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 border-t">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <input
                      placeholder="Ask for cultural context, descriptions, or translations..."
                      className="w-full border rounded-md px-3 py-2"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" size="sm" disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Form>
        
        <div className="mt-2 flex gap-1 flex-wrap">
          <SuggestionChip text="Write cultural description" />
          <SuggestionChip text="Add historical context" />
          <SuggestionChip text="Translate to Japanese" />
        </div>
      </div>
    </div>
  );
};

interface SuggestionChipProps {
  text: string;
}

const SuggestionChip: React.FC<SuggestionChipProps> = ({ text }) => {
  return (
    <button className="text-xs px-2 py-1 bg-gray-100 rounded-full hover:bg-gray-200">
      {text}
    </button>
  );
};

export default AIContentAssistant;

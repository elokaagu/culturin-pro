'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  X,
  Send,
  Sparkles,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';

interface AIContentAssistantProps {
  onClose: () => void;
}

const AIContentAssistant: React.FC<AIContentAssistantProps> = ({ onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);
  const [copied, setCopied] = useState<Record<number, boolean>>({});
  
  const promptSuggestions = [
    "Write a poetic description of a traditional pottery workshop in Oaxaca",
    "Create a backstory about the history of Kyoto's bamboo forest",
    "Draft a cultural context introduction for a Moroccan cooking class",
    "Write a paragraph explaining the significance of a traditional tea ceremony"
  ];
  
  const handleSubmit = (e: React.FormEvent, prompt: string = inputValue) => {
    e.preventDefault();
    if (!prompt) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      let response = '';
      
      if (prompt.includes('pottery') || prompt.includes('Oaxaca')) {
        response = "In the sun-drenched valleys of Oaxaca, where time seems to move at its own gentle pace, skilled artisans continue a tradition that spans generations. The pottery workshop, filled with earthy aromas of clay and mineral pigments, offers visitors more than just a demonstration—it's an intimate journey into the heart of Mexican craftsmanship. As hands work the clay, stories unfold of ancient techniques passed down through families, each piece carrying not just artistic merit but cultural memory. The distinctive black pottery, known as 'barro negro,' achieves its glossy sheen through a technique dating back to pre-Columbian times, connecting the present moment to an unbroken artistic lineage.";
      } else if (prompt.includes('Kyoto') || prompt.includes('bamboo')) {
        response = "Long before Kyoto became the cultural heart of Japan, the Arashiyama Bamboo Forest stood as a sentinel of tranquility. Dating back to the Heian period (794-1185), these soaring bamboo groves initially surrounded noble estates and temples, serving as natural barriers against evil spirits. The distinctive rustling sound—named 'yakatabue' (palace flute)—was so cherished that Japan's Ministry of Environment designated it as one of the country's '100 Soundscapes to be Preserved.' Walking these paths, you tread the same ground as samurai and imperial courts, experiencing a living connection to Japan's spiritual and aesthetic traditions that have remained largely unchanged for over a millennium.";
      } else if (prompt.includes('Morocco') || prompt.includes('cooking')) {
        response = "Moroccan cuisine stands as a living historical document, chronicling centuries of cultural exchange across Berber, Arabic, Andalusian, and Mediterranean traditions. The cooking class you'll experience today is more than a culinary lesson—it's an immersion into Morocco's social fabric. Each spice in the renowned mixtures like ras el hanout carries symbolic significance: cinnamon for success, turmeric for protection, ginger for strength. The tagine, both a cooking vessel and the dish it creates, represents Morocco's communal dining philosophy where meals strengthen family and community bonds. As you learn these recipes, you're not simply preparing food but participating in traditions that have united generations across this North African landscape.";
      } else {
        response = "The traditional ceremony you're about to experience represents centuries of cultural refinement and spiritual practice. Local artisans have preserved these techniques through generations, developing unique approaches that reflect both practicality and profound symbolic meaning. As you participate, notice the deliberate movements and careful attention to detail—each element carries significance beyond its immediate function. This living tradition connects contemporary practitioners to ancestral knowledge, offering insight into values that have sustained this community through historical changes and challenges. Your presence today makes you part of this continuing cultural narrative.";
      }
      
      setGeneratedContent(prev => [...prev, response]);
      setIsGenerating(false);
      setInputValue('');
    }, 1500);
  };
  
  const handleCopy = (index: number) => {
    navigator.clipboard.writeText(generatedContent[index]);
    setCopied({...copied, [index]: true});
    
    setTimeout(() => {
      setCopied({...copied, [index]: false});
    }, 2000);
  };
  
  const handleRegenerateContent = (index: number) => {
    const content = generatedContent[index];
    setIsGenerating(true);
    
    setTimeout(() => {
      let newContent = content;
      // Simple variation of the existing content
      const sentences = content.split('. ');
      if (sentences.length > 2) {
        // Reorder some sentences to create variation
        const mid = Math.floor(sentences.length / 2);
        const temp = sentences[1];
        sentences[1] = sentences[mid];
        sentences[mid] = temp;
        
        newContent = sentences.join('. ');
      }
      
      const updatedContent = [...generatedContent];
      updatedContent[index] = newContent;
      setGeneratedContent(updatedContent);
      setIsGenerating(false);
    }, 1500);
  };
  
  return (
    <div className="flex flex-col h-full border-l">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center">
          <Sparkles className="h-4 w-4 mr-2 text-indigo-500" />
          <h3 className="font-medium">AI Content Assistant</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        {generatedContent.length === 0 ? (
          <div className="text-center py-8">
            <div className="bg-indigo-100 p-3 rounded-full inline-flex mb-3">
              <Sparkles className="h-5 w-5 text-indigo-500" />
            </div>
            <h4 className="font-medium mb-2">Cultural Content Generator</h4>
            <p className="text-sm text-gray-500 mb-4">
              Create authentic descriptions, cultural contexts, and storytelling elements.
            </p>
            
            <div className="space-y-2 mt-6">
              <p className="text-sm font-medium text-gray-700">Try these prompts:</p>
              {promptSuggestions.map((suggestion, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-md p-2 text-sm cursor-pointer hover:bg-gray-50"
                  onClick={(e) => handleSubmit(e as any, suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {generatedContent.map((content, index) => (
              <div key={index} className="bg-gray-50 rounded-md p-4">
                <div className="text-sm mb-3">{content}</div>
                
                <div className="flex justify-end gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => handleRegenerateContent(index)}
                    disabled={isGenerating}
                  >
                    <RefreshCw className={`h-4 w-4 mr-1 ${isGenerating ? 'animate-spin' : ''}`} />
                    Regenerate
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleCopy(index)}
                    disabled={copied[index]}
                  >
                    {copied[index] ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
      
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a prompt for content generation..."
            className="flex-1 border rounded-md p-2 text-sm"
            disabled={isGenerating}
          />
          <Button type="submit" disabled={!inputValue || isGenerating}>
            {isGenerating ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-1">
          Ask for cultural descriptions, historical context, or storytelling elements.
        </p>
      </div>
    </div>
  );
};

export default AIContentAssistant;

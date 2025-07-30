import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Edit, 
  Save, 
  X, 
  Image as ImageIcon, 
  Type, 
  Palette,
  Link as LinkIcon
} from "lucide-react";
import { toast } from "sonner";

interface EditableElement {
  id: string;
  type: 'text' | 'heading' | 'image' | 'link';
  content: string;
  style?: React.CSSProperties;
  className?: string;
}

interface InlineEditorProps {
  element: EditableElement;
  onSave: (id: string, content: string) => void;
  onCancel: () => void;
  position: { x: number; y: number };
}

const InlineEditor: React.FC<InlineEditorProps> = ({
  element,
  onSave,
  onCancel,
  position
}) => {
  const [content, setContent] = useState(element.content);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing) {
      if (element.type === 'text' && textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.select();
      } else if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [isEditing, element.type]);

  const handleSave = () => {
    if (content.trim() !== element.content) {
      onSave(element.id, content);
      toast.success("Content updated successfully!");
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setContent(element.content);
    setIsEditing(false);
    onCancel();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const renderEditor = () => {
    switch (element.type) {
      case 'heading':
        return (
          <Input
            ref={inputRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            className="text-lg font-semibold"
            placeholder="Enter heading..."
          />
        );
      case 'text':
        return (
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter text..."
            className="min-h-[60px]"
          />
        );
      case 'link':
        return (
          <Input
            ref={inputRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter URL..."
            className="text-blue-600 underline"
          />
        );
      default:
        return (
          <Input
            ref={inputRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter content..."
          />
        );
    }
  };

  const getIcon = () => {
    switch (element.type) {
      case 'heading':
        return <Type className="h-4 w-4" />;
      case 'image':
        return <ImageIcon className="h-4 w-4" />;
      case 'link':
        return <LinkIcon className="h-4 w-4" />;
      default:
        return <Edit className="h-4 w-4" />;
    }
  };

  return (
    <div
      className="fixed z-50"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <Card className="w-80 shadow-lg border-2 border-culturin-indigo">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            {getIcon()}
            <span className="text-sm font-medium capitalize">
              Edit {element.type}
            </span>
          </div>
          
          <div className="space-y-3">
            {renderEditor()}
            
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleSave}
                className="flex-1"
              >
                <Save className="h-3 w-3 mr-1" />
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InlineEditor; 
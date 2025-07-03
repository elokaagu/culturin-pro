"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "../src/contexts/TranslationContext";
import { Globe, Check, Loader2 } from "lucide-react";

interface LanguageSelectorProps {
  variant?: "header" | "footer";
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = "header",
}) => {
  const { currentLanguage, availableLanguages, setLanguage, isTranslating } =
    useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (language: any) => {
    setLanguage(language);
    setIsOpen(false);
  };

  const isFooter = variant === "footer";

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={isFooter ? "secondary" : "outline"}
          size="sm"
          className={`flex items-center gap-2 min-w-[120px] ${
            isFooter
              ? "bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30"
              : ""
          }`}
          disabled={isTranslating}
        >
          {isTranslating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Globe className="h-4 w-4" />
          )}
          <span className="text-lg">{currentLanguage.flag}</span>
          <span className="hidden sm:inline">{currentLanguage.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="p-2">
          <div className="text-xs font-medium text-gray-500 mb-2 px-2">
            Select Language
          </div>
          <div className="space-y-1">
            {availableLanguages.map((language) => (
              <DropdownMenuItem
                key={language.code}
                onClick={() => handleLanguageChange(language)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{language.flag}</span>
                  <span>{language.name}</span>
                  {language.rtl && (
                    <Badge variant="secondary" className="text-xs">
                      RTL
                    </Badge>
                  )}
                </div>
                {currentLanguage.code === language.code && (
                  <Check className="h-4 w-4 text-blue-600" />
                )}
              </DropdownMenuItem>
            ))}
          </div>
        </div>
        <div className="border-t p-2">
          <div className="text-xs text-gray-500 px-2">
            Auto-translation powered by AI
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;

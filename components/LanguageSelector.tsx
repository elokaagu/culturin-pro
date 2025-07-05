"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const { currentLanguage, availableLanguages, setLanguage, isTranslating } =
    useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);

  const handleLanguageChange = async (language: any) => {
    setIsChangingLanguage(true);
    setLanguage(language);
    setIsOpen(false);

    // Get current path without locale
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}(?:\/|$)/, "/");

    // Create new URL with selected language
    const newPath =
      language.code === "en"
        ? pathWithoutLocale === "/"
          ? "/"
          : pathWithoutLocale
        : `/${language.code}${
            pathWithoutLocale === "/" ? "" : pathWithoutLocale
          }`;

    // Add current search params if any
    const searchParams = window.location.search;
    const newUrl = `${newPath}${searchParams}`;

    // Navigate to new URL with page reload for proper middleware handling
    window.location.href = newUrl;
  };

  const isFooter = variant === "footer";

  return (
    <div className="relative">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={isFooter ? "secondary" : "outline"}
            size="sm"
            className={`flex items-center gap-2 min-w-[120px] ${
              isFooter
                ? "bg-gray-800 hover:bg-gray-700 text-white border-gray-600 hover:border-gray-500"
                : "bg-gray-800 hover:bg-gray-700 text-white border-gray-600 hover:border-gray-500"
            }`}
            disabled={isTranslating || isChangingLanguage}
          >
            {isTranslating || isChangingLanguage ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Globe className="h-4 w-4" />
            )}
            <span className="mr-1">{currentLanguage.flag}</span>
            <span className="hidden sm:inline">{currentLanguage.name}</span>
            <span className="sm:hidden">
              {currentLanguage.code.toUpperCase()}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {availableLanguages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span>{language.flag}</span>
                <span>{language.name}</span>
              </div>
              {currentLanguage.code === language.code && (
                <Check className="h-4 w-4 text-green-600" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {isFooter && (
        <Badge variant="secondary" className="mt-2 text-xs">
          {availableLanguages.length} languages
        </Badge>
      )}
    </div>
  );
};

export default LanguageSelector;

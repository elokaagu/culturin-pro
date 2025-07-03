"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "../src/contexts/TranslationContext";
import { Skeleton } from "@/components/ui/skeleton";

interface TranslatableTextProps {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}

const TranslatableText: React.FC<TranslatableTextProps> = ({
  text,
  as: Component = "span",
  className,
  children,
  fallback,
}) => {
  const { currentLanguage, translate, translateSync, isTranslating } =
    useTranslation();
  const [translatedText, setTranslatedText] = useState<string>(text);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentLanguage.code === "en") {
      setTranslatedText(text);
      return;
    }

    // Try sync translation first (from cache)
    const syncTranslation = translateSync(text);
    if (syncTranslation !== text) {
      setTranslatedText(syncTranslation);
      return;
    }

    // If no cached translation, fetch async
    const fetchTranslation = async () => {
      setIsLoading(true);
      try {
        const translation = await translate(text);
        setTranslatedText(translation);
      } catch (error) {
        console.error("Translation error:", error);
        setTranslatedText(text); // Fallback to original
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranslation();
  }, [text, currentLanguage.code, translate, translateSync]);

  if (isLoading && fallback) {
    return <>{fallback}</>;
  }

  if (isLoading) {
    return <Skeleton className={`h-4 w-full ${className}`} />;
  }

  return (
    <Component className={className}>
      {translatedText}
      {children}
    </Component>
  );
};

export default TranslatableText;

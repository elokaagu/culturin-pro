"use client";

import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ThemeAwareImageProps {
  src: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
}

export function ThemeAwareImage({ src, alt, className = "", width, height }: ThemeAwareImageProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything on the server or before hydration
  if (!mounted) {
    return (
      <div 
        style={{ width, height }} 
        className={`${className} bg-transparent`}
      />
    );
  }

  // Apply filter to make logo white in dark mode
  const themeAwareClassName = theme === 'dark' 
    ? `${className} brightness-0 invert` 
    : className;

  return (
    <Image
      src={src}
      alt={alt}
      className={themeAwareClassName}
      width={width}
      height={height}
    />
  );
}

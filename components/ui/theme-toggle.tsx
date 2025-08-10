"use client";

import React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  variant?: "default" | "icon" | "minimal";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ThemeToggle({
  variant = "default",
  size = "md",
  className,
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const buttonSizes = {
    sm: "h-8 w-8",
    md: "h-9 w-9",
    lg: "h-10 w-10",
  };

  if (variant === "minimal") {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className={cn(
          "theme-transition hover:bg-secondary/80",
          buttonSizes[size],
          className
        )}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      >
        {theme === "light" ? (
          <Moon className={cn(iconSizes[size], "text-muted-foreground")} />
        ) : (
          <Sun className={cn(iconSizes[size], "text-yellow-500")} />
        )}
      </Button>
    );
  }

  if (variant === "icon") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "theme-transition glass-transition glass-card hover:glass-hover",
              buttonSizes[size],
              className
            )}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Sun className={cn(iconSizes[size], "text-yellow-500")} />
            ) : (
              <Moon className={cn(iconSizes[size], "text-blue-400")} />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="glass-card glass-transition border-border/50"
        >
          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className="theme-transition hover:bg-secondary/80 cursor-pointer"
          >
            <Sun className="mr-2 h-4 w-4 text-yellow-500" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className="theme-transition hover:bg-secondary/80 cursor-pointer"
          >
            <Moon className="mr-2 h-4 w-4 text-blue-400" />
            <span>Dark</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Default variant with text
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "theme-transition glass-transition glass-card hover:glass-hover",
            "flex items-center gap-2",
            className
          )}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <>
              <Sun className={cn(iconSizes[size], "text-yellow-500")} />
              <span className="hidden sm:inline">Light</span>
            </>
          ) : (
            <>
              <Moon className={cn(iconSizes[size], "text-blue-400")} />
              <span className="hidden sm:inline">Dark</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="glass-card glass-transition border-border/50"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="theme-transition hover:bg-secondary/80 cursor-pointer"
        >
          <Sun className="mr-2 h-4 w-4 text-yellow-500" />
          <span>Light Mode</span>
          {theme === "light" && (
            <div className="ml-auto h-2 w-2 rounded-full bg-primary" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="theme-transition hover:bg-secondary/80 cursor-pointer"
        >
          <Moon className="mr-2 h-4 w-4 text-blue-400" />
          <span>Dark Mode</span>
          {theme === "dark" && (
            <div className="ml-auto h-2 w-2 rounded-full bg-primary" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Quick toggle component for mobile or compact spaces
export function QuickThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={cn(
        "theme-transition hover:bg-secondary/80 h-8 w-8",
        className
      )}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 text-muted-foreground hover:text-blue-400 transition-colors" />
      ) : (
        <Sun className="h-4 w-4 text-muted-foreground hover:text-yellow-500 transition-colors" />
      )}
    </Button>
  );
}

import { useState, useEffect } from "react";

export function useThemeAwareLogo() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") return;

    // Function to update theme state
    const updateTheme = () => {
      const theme = localStorage.getItem("culturin-theme");
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const currentTheme = theme || (systemDark ? "dark" : "light");
      setIsDark(currentTheme === "dark");
    };

    // Initial check
    updateTheme();

    // Listen for theme changes via storage events
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "culturin-theme") {
        updateTheme();
      }
    };

    // Listen for class changes on document.documentElement
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const classList = (mutation.target as Element).classList;
          setIsDark(classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("storage", handleStorageChange);

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return isDark;
}

import React from "react";
import "./globals.css";
import { Toaster } from "../components/ui/toaster";
import { AuthProvider } from "../src/components/auth/AuthProvider";
import { UserDataProvider } from "../src/contexts/UserDataContext";
import { TranslationProvider } from "../src/contexts/TranslationContext";
import { ThemeProvider } from "../contexts/ThemeContext";

import PageTransition from "../components/PageTransition";

export const metadata = {
  title: "Culturin Studio",
  description:
    "Professional tour operator platform for creating and managing cultural experiences",
};

// Helper function to detect language from pathname
function detectLanguageFromPath(pathname?: string): string {
  if (!pathname) return "en";
  const langMatch = pathname.match(/^\/([a-z]{2})(?:\/|$)/);
  return langMatch ? langMatch[1] : "en";
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: { locale?: string };
}) {
  // Get the current language from params or detect from URL
  const currentLang = params?.locale || "en";

  return (
    <html lang={currentLang} dir={currentLang === "ar" ? "rtl" : "ltr"}>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <UserDataProvider>
              <TranslationProvider>
                <PageTransition>{children}</PageTransition>
              </TranslationProvider>
            </UserDataProvider>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

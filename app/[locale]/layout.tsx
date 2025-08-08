import React from "react";
import "../globals.css";
import { Toaster } from "../../components/ui/toaster";
import { UserDataProvider } from "../../src/contexts/UserDataContext";
import { TranslationProvider } from "../../src/contexts/TranslationContext";

import PageTransition from "../../components/PageTransition";

export const metadata = {
  title: "Culturin Studio",
  description:
    "Professional tour operator platform for creating and managing cultural experiences",
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  return (
    <UserDataProvider>
      <TranslationProvider>
        <PageTransition>{children}</PageTransition>
      </TranslationProvider>
      <Toaster />
    </UserDataProvider>
  );
}

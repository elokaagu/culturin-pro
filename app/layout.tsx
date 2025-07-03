import React from "react";
import "./globals.css";
import { Toaster } from "../components/ui/toaster";
import { AuthProvider } from "../src/components/auth/AuthProvider";
import PageTransition from "../components/PageTransition";

export const metadata = {
  title: "Culturin Studio - Journey Together",
  description:
    "Professional tour operator platform for creating and managing cultural experiences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <PageTransition>{children}</PageTransition>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}

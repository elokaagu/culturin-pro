import React from "react";
import "./globals.css";
import { Toaster } from "../components/ui/toaster";
import { AuthProvider } from "../src/components/auth/AuthProvider";

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
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}

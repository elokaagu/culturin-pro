import React from "react";
import "./globals.css";
import { Toaster } from "../components/ui/toaster";

export const metadata = {
  title: "Culturin Pro - Journey Together",
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
        {children}
        <Toaster />
      </body>
    </html>
  );
}

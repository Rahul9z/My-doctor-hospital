import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Doctor Hospital | Elevating Healthcare Beyond Limits",
  description: "Advanced Healthcare. Human Compassion. AI-Powered Care. Experience the future of medical services with My Doctor Hospital.",
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingEmergency } from "@/components/ui/FloatingEmergency";
import { AiReceptionist } from "@/components/ui/AiReceptionist";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <Navbar />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
        <FloatingEmergency />
        <AiReceptionist />
      </body>
    </html>
  );
}

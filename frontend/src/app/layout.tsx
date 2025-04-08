import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Платформа Мост",
  description: "Единая платформа поддержки для участников СВО, их семей и жителей приграничных регионов.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FFFBF5] flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-grow container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}

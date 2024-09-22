import type { Metadata } from "next";
import Head from "next/head";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pro carpet and upholstery cleaning",
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex flex-col flex-grow pt-[68px] max-w-7xl w-full mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

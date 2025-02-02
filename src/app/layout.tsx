import type { Metadata } from "next";
import Head from "next/head";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Метаданные для SEO
export const metadata: Metadata = {
  title:
    "Professional Upholstery & Carpet Cleaning Services in Santa Rosa | Pro CUC",
  description:
    "Professional upholstery and carpet cleaning services in Santa Rosa and surrounding areas. We remove stains, odors, and allergens using eco-friendly methods. Free consultation available.",
  keywords:
    "upholstery cleaning, carpet cleaning, stain removal, odor removal, Santa Rosa, Petaluma, Rohnert Park, eco-friendly cleaning",
  authors: [
    {
      name: "Pro Carpet & Upholstery Cleaning Company",
      url: "https://cuc-nine.vercel.app",
    },
  ],
  openGraph: {
    title:
      "Professional Upholstery & Carpet Cleaning Services in Santa Rosa | Pro CUC",
    description:
      "Professional upholstery and carpet cleaning services in Santa Rosa and surrounding areas. We remove stains, odors, and allergens using eco-friendly methods.",
    images: [
      {
        url: "/logo.svg",
        width: 800,
        height: 600,
        alt: "CUC Logo",
      },
    ],
    url: "https://cuc-nine.vercel.app",
    type: "website",
  },

  alternates: {
    canonical: "https://cuc-nine.vercel.app",
  },
  icons: {
    icon: "/favicon/favicon.ico",
  },
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

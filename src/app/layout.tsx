import type { Metadata } from "next";
import { Geist, Geist_Mono, Anton, Tauri } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const tauri = Tauri({
  variable: "--font-tauri",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReelioPort — Join the Waitlist",
  description:
    "ReelioPort is the professional video portfolio platform built for creatives. Join the waitlist for early access and an exclusive Pro discount.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${tauri.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

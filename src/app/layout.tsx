import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({
  variable: "--font-inter",
  weight: ['200', '400', '600', '700'],
  subsets: ['latin-ext'],
})

export const metadata: Metadata = {
  title: "Culinara",
  description: "Your ultimate Recipe App. Find and share your recipes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(`${geistSans.variable} ${geistMono.variable} antialiased bg-background font-inter`, inter.className)}
      >
        {children}
      </body>
    </html>
  );
}

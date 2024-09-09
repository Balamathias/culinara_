import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'
import Provider from "@/components/provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { CulinaraRouter } from "./api/uploadthing/core";


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

const reditSans = localFont({
  src: "./fonts/static/RedditSansCondensed-Regular.ttf",
  variable: "--font-redit",
  weight: "100 300 400 500 600 900",
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
        className={cn(`${geistSans.variable} ${geistMono.variable} w-full antialiased bg-background font-redit`, inter.className, reditSans.className)}
      >
        <Provider>
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(CulinaraRouter)}
          />
          {children}
        </Provider>
      </body>
    </html>
  );
}

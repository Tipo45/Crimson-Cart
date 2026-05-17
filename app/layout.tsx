import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { cn } from "@/lib/utils";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Crimson Cart",
    template: "%s | Crimson Cart"
  },
  description: "Crimson Cart is an e-commerce platform that offers a wide range of products at unbeatable prices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
      >

        <body className="min-h-full flex flex-col">
          <ConvexClientProvider>
            <Toaster />
            {children}
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

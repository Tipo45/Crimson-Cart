import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import ServiceWorker from "@/components/ServiceWorker";
import InstallPWA from "@/components/InstallPWA";
import BottomNav from "@/components/BottomNav";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Crimson cart',
  },
  icons: {
  icon: [
    { url: "/android-chrome-192x192.png", sizes: "192x192" },
    { url: "/android-chrome-512x512.png", sizes: "512x512" },
  ],
  apple: "/apple-touch-icon.png",
},
};

export const viewport: Viewport = {
  themeColor: '#A31621',
}

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
            <ServiceWorker />
            <InstallPWA />
            <Toaster position="top-center" />
            <div className="flex pwa:hidden">
              <Navbar />
            </div>
            {children}
            <div className="hidden pwa:flex">
              <BottomNav />
            </div>
            <div className="block pwa:hidden">
              <Footer />
            </div>
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

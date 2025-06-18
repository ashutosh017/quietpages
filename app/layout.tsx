import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/footer";
import Header from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title: "QuietPages: Write, share, blogs.",
  description:
    "A platform for writing and sharing blogs with your friends and family.",
  keywords: [
    "blog",
    "blogs",
    "blog writing platform",
    "blog writing",
    "blog creating platform",
    "blog creating",
    "share blog",
    "blog sharing",
    "blog sharing platform",
  ],
  authors: [{ name: "Ashutosh" }],
  alternates: {
    canonical: "https://quietpages.vercel.app/",
  },

  openGraph: {
    title: "QuietPages: Write, share, blogs.",
  description:
    "A platform for writing and sharing blogs with your friends and family.",
    "url":"https://quietpages.ashutosh007.xyz",
    "siteName":"QuietPages. Write, Share, Blogs.",
    images: [
      {
        url: "https://quietpages.ashutosh007.xyz/opengraph-image.png", 
        width: 1200,
        height: 630,
        alt: "QuietPages",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuietPages",
    description:
      "A platform for writing and sharing blogs with your friends and family.",
    images: ["https://quietpages.ashutosh007.xyz/opengraph-image.png"], 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-zinc-100 via-white to-zinc-200 dark:from-zinc-900 dark:via-black dark:to-zinc-800`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />

            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

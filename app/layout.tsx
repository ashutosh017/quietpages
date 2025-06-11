import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons:{
    icon:"/favicon.ico"
  },
  title: "QuietPages: Write, share, blogs.",
  description: "Blog writing, sharing, platform",
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
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <header className="fixed top-4 left-1/2 -translate-x-1/2 flex items-center justify-between px-6 py-3 h-16 w-fit rounded-4xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg z-50 gap-4">
              <div className="flex items-center gap-2">
                <Button
                  asChild
                  variant="link"
                  className="px-1 underline-offset-8"
                >
                  <Link href="/">Home</Link>
                </Button>
                <Button
                  asChild
                  variant="link"
                  className="px-1 underline-offset-8"
                >
                  <Link href="/blogs">Blogs</Link>
                </Button>
                {/* <Button
                  asChild
                  variant="link"
                  className="px-1 underline-offset-8"
                >
                  <Link href="/create-blog">Create Blog</Link>
                </Button> */}
              </div>
              <div className="flex gap-4 items-center">
            
                <SignedOut>
                  <Button variant="outline" asChild>
                    <SignInButton />
                  </Button>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
                    <ModeToggle />
              </div>
            </header>

            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

"use client";

import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BlogForm } from "./blog-form";
import { handleCreateBlog } from "@/actions";
import {
  Github,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import AuthRequiredPopUp from "./auth-required-popup";
import Link from "next/link";

export default function Header() {
  const { isSignedIn } = useAuth();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [showBlogForm, setShowBlogForm] = useState(false);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSigninRequired, setShowSigninRequired] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("toggle menu called");
  };
  useEffect(() => {
    router.prefetch("/blogs");
    router.prefetch("/my-blogs");
  }, [router]);

  const themeToggle = () => setTheme(theme === "light" ? "dark" : "light");
  return (
    <div>
      <header
        className={cn(
          "hidden z-10 dark:bg-black/10  fixed top-0 left-0 w-screen py-4 px-4 lg:flex gap-28 justify-center items-center backdrop-blur-md shadow-none dark:shadow-white/10"
        )}
      >
        <Link href={"/"} className="w-44 ">
          <h1 className="font-bold">QuietPages</h1>
        </Link>
        <nav className=" top-4 left-1/2  flex items-center justify-between px-6 py-2  w-fit rounded-4xl  dark:bg-black/30 border shadow-lg    dark:shadow-white/10  gap-2">
          <Button
            variant="ghost"
            className={`nav-btn-style ${
              pathname === "/"
                ? "text-black dark:text-white"
                : "text-black/60 dark:text-white/60"
            }`}
            onClick={() => {
              router.push("/", { scroll: false });
            }}
          >
            Home
          </Button>
          <Button
            variant="ghost"
            className={`nav-btn-style  ${
              pathname === "/blogs"
                ? "text-black dark:text-white"
                : "text-black/60 dark:text-white/60"
            }`}
            onClick={() => {
              router.push("/blogs", { scroll: false });
            }}
          >
            Blogs
          </Button>
          <Button
            onClick={() => {
              router.push("/my-blogs", { scroll: false });
            }}
            variant="ghost"
            className={`nav-btn-style  ${
              pathname === "/my-blogs"
                ? "text-black dark:text-white"
                : "text-black/60 dark:text-white/60"
            }`}
          >
            My Blogs
          </Button>
          <Button
            onClick={() => {
              isSignedIn ? setShowBlogForm(true) : setShowSigninRequired(true);
            }}
            variant="ghost"
            className={`nav-btn-style  ${
              pathname === "/create-blog"
                ? "text-black dark:text-white"
                : "text-black/60 dark:text-white/60"
            }`}
          >
            Create Blog
          </Button>
        </nav>
        <div className="flex  gap-4 items-center  min-w-60  ">
          <Link
            href="https://github.com/ashutosh017/quietpages"
            target="_blank"
            rel="noopener noreferrer"
            className="primary-btn-style"
          >
            Give it a star
            <Github className="w-5 h-5" />
          </Link>

          <Button
            className="nav-btn-icon-style"
            onClick={themeToggle}
            size={"icon"}
            variant={"ghost"}
            asChild
          >
            {theme === "light" ? (
              <Moon className="w-6 h-6" />
            ) : (
              <Sun className="w-6 h-6" />
            )}
          </Button>
          <SignedOut>
            <Button variant="outline" asChild>
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>

      {/*mobile navbar */}
      <header
        className={cn(
          "flex flex-col z-10  lg:hidden bg-white/90  dark:bg-background/40  fixed top-0 left-0 w-screen py-4 px-4    backdrop-blur-md shadow-none dark:shadow-white/10"
        )}
      >
        <div className="flex w-full justify-between">
          <Link href={"/"} className="w-44 ">
            <h1 className="font-bold">QuietPages</h1>
          </Link>
          <div className="flex gap-4 justify-end">
              <Button
            className="nav-btn-icon-style"
            onClick={themeToggle}
            size={"icon"}
            variant={"ghost"}
            asChild
          >
            {theme === "light" ? (
              <Moon className="w-6 h-6" />
            ) : (
              <Sun className="w-6 h-6" />
            )}
          </Button>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <Button
              onClick={toggleMenu}
              variant={"ghost"}
              asChild
              size={"icon"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <nav className=" top-4 h-screen left-1/2 mt-4 flex flex-col items-center   py-2  w-full  gap-2">
            <Button
              variant="ghost"
              className={`nav-btn-style ${
                pathname === "/"
                  ? "text-black dark:text-white"
                  : "text-black/60 dark:text-white/60"
              }`}
              onClick={() => {
                router.push("/", { scroll: false });
                setIsMenuOpen(false);
              }}
            >
              Home
            </Button>
            <Button
              variant="ghost"
              className={`nav-btn-style  ${
                pathname === "/blogs"
                  ? "text-black dark:text-white"
                  : "text-black/60 dark:text-white/60"
              }`}
              onClick={() => {
                router.push("/blogs", { scroll: false });
                setIsMenuOpen(false);
              }}
            >
              Blogs
            </Button>
            <Button
              onClick={() => {
                router.push("/my-blogs", { scroll: false });
                setIsMenuOpen(false);
              }}
              variant="ghost"
              className={`nav-btn-style  ${
                pathname === "/my-blogs"
                  ? "text-black dark:text-white"
                  : "text-black/60 dark:text-white/60"
              }`}
            >
              My Blogs
            </Button>
            <Button
              onClick={() => {
                isSignedIn
                  ? setShowBlogForm(true)
                  : setShowSigninRequired(true);
                setIsMenuOpen(false);
              }}
              variant="ghost"
              className={`nav-btn-style  ${
                pathname === "/create-blog"
                  ? "text-black dark:text-white"
                  : "text-black/60 dark:text-white/60"
              }`}
            >
              Create Blog
            </Button>

            <div className="flex flex-col items-center mt-4 gap-4 w-full px-1">
              {/* <div className="flex gap-4">
               
              </div> */}
              <Link
                href="https://github.com/ashutosh017/quietpages"
                target="_blank"
                rel="noopener noreferrer"
                className={cn("flex items-center justify-center gap-2 px-4 py-2 rounded-lg border  transition-colors text-sm font-medium","mob-nav-btn-style")}
              >
                Give it a star
                <Github className="w-5 h-5" />
              </Link>
              <SignedOut>
                <Button
                  onClick={toggleMenu}
                  className="mob-nav-btn-style"
                  variant="outline"
                  asChild
                >
                  <SignInButton />
                </Button>
              </SignedOut>
              <SignedIn>
                <Button
                  onClick={toggleMenu}
                  className="mob-nav-btn-style"
                  variant="outline"
                  asChild
                >
                  <SignOutButton />
                </Button>
              </SignedIn>
            </div>
          </nav>
        )}
      </header>
      <BlogForm
        onClose={() => setShowBlogForm(false)}
        isOpen={showBlogForm}
        onSave={handleCreateBlog}
        mode={{
          type: "create",
          blogId: null,
        }}
      />
      <AuthRequiredPopUp
        isOpen={showSigninRequired}
        onClose={() => setShowSigninRequired(false)}
      />
    </div>
  );
}

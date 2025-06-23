"use client";
import { FaGithub, FaMoneyBill } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BlogForm } from "./blog-form";
import { handleCreateBlog } from "@/lib/actions";
import {
  DollarSign,
  Home,
  Layers,
  Layers2,
  LogIn,
  LogOut,
  Menu,
  Moon,
  SquarePen,
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

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
          " z-10 bg-transparent  fixed top-0 left-0 w-screen py-4 px-4    lg:px-10 xl:px-30  backdrop-blur-md shadow-none dark:shadow-white/10"
        )}
      >
        <div className="flex   justify-between lg:justify-around items-center ">
          <Link href={"/"} className="w-fit lg:w-44 ">
            <h1 className="font-semibold text-xl lg:text-2xl lg:font-bold">
              QuietPages
            </h1>
          </Link>
          <nav className="hidden top-4 left-1/2  lg:flex items-center justify-between px-6 py-2  w-fit rounded-4xl  dark:bg-background/90 border dark:border-neutral-400 bg-neutral-50 border-neutral-600 shadow-lg    dark:shadow-white/10  gap-1">
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
            {/* <Button
              variant="ghost"
              className={`nav-btn-style ${
                pathname === "/about"
                  ? "text-black dark:text-white"
                  : "text-black/60 dark:text-white/60"
              }`}
              onClick={() => {
                router.push("/about", { scroll: false });
              }}
            >
              About
            </Button> */}
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
               router.push("/pricing")
              }}
              variant="ghost"
              className={`nav-btn-style  ${
                pathname === "/pricing"
                  ? "text-black dark:text-white"
                  : "text-black/60 dark:text-white/60"
              }`}
            >
              Pricing
            </Button>
              <Button
              onClick={() => {
                isSignedIn
                  ? setShowBlogForm(true)
                  : setShowSigninRequired(true);
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
          <div className="flex   gap-4 items-center justify-end  max-w-72    ">
            <Link
              href="https://github.com/ashutosh017/quietpages"
              target="_blank"
              rel="noopener noreferrer"
              className="primary-btn-style hidden lg:flex items-center justify-center gap-2"
            >
              Give it a star
              {/* <Github className="w-5 h-5" /> */}
              <FaGithub className="w-5 h-5" />
            </Link>

            <SignedOut>
              <Button variant="outline" asChild>
                <SignInButton />
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <Button
              className="nav-btn-icon-style "
              onClick={themeToggle}
              size={"icon"}
              variant={"ghost"}
              asChild
            >
              {mounted && theme === "dark" ? (
                <Moon className="w-6 h-6" />
              ) : (
                <Sun className="w-6 h-6" />
              )}
            </Button>
            {isMenuOpen ? (
              <X onClick={toggleMenu} className="lg:hidden" />
            ) : (
              <Menu onClick={toggleMenu} className="lg:hidden" />
            )}
          </div>
        </div>
        {isMenuOpen && (
          <nav className="flex top-4 h-screen mt-4 lg:hidden flex-col items-center   py-2  w-full  gap-2">
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
              <div className="flex justify-end gap-2">
                Home
                <Home />
              </div>
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
              <div className="flex justify-end gap-2">
                Blogs
                <Layers />
              </div>
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
              <div className="flex justify-end gap-2">
                My Blogs
                <Layers2 />
              </div>
            </Button>
            <Button
              onClick={() => {
                router.push("/pricing", { scroll: false });
                setIsMenuOpen(false);
              }}
              variant="ghost"
              className={`nav-btn-style  ${
                pathname === "/pricing"
                  ? "text-black dark:text-white"
                  : "text-black/60 dark:text-white/60"
              }`}
            >
              <div className="flex justify-end gap-2">
                Pricing
                <DollarSign />
              </div>
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
              <div className="flex justify-end gap-2">
                Create Blog
                <SquarePen />
              </div>
            </Button>

            <div className="flex flex-col items-center mt-4 gap-4 w-full ">
              <Link
                href="https://github.com/ashutosh017/quietpages"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full "
              >
                <Button
                  className="mob-nav-btn-style "
                  variant={"outline"}
                  asChild
                >
                  <div className="flex items-center justify-center gap-2">
                    Give it a star
                    <FaGithub size={50} />
                  </div>
                </Button>
              </Link>
              <SignedOut>
                <Button
                  onClick={toggleMenu}
                  className="mob-nav-btn-style"
                  variant="outline"
                  asChild
                >
                  <SignInButton>
                    <div className="flex items-center justify-center">
                      Sign in <LogIn />
                    </div>
                  </SignInButton>
                </Button>
              </SignedOut>

              <SignedIn>
                <Button
                  onClick={toggleMenu}
                  className="mob-nav-btn-style"
                  variant="outline"
                  asChild
                >
                  <SignOutButton>
                    <div className="flex items-center justify-center">
                      Sign out <LogOut />
                    </div>
                  </SignOutButton>
                </Button>
              </SignedIn>
            </div>
            <div>
              <div className="mt-4 mb-2 py-2 font-bold text-center text-lg ">
                My Socials
              </div>
              <div className="flex gap-8">
                <Link
                  href="https://x.com/ashutosh__018"
                  target="_blank"
                  referrerPolicy="no-referrer"
                >
                  <FaSquareXTwitter size={30} />
                </Link>
                <Link
                  href={"https://www.linkedin.com/in/ashutosh017/"}
                  target="_blank"
                  referrerPolicy="no-referrer"
                >
                  <FaLinkedin size={30} />
                </Link>
                <Link
                  href={"https://github.com/ashutosh017"}
                  target="_blank"
                  referrerPolicy="no-referrer"
                >
                  <FaGithub size={30} />
                </Link>
                <Link
                  href={"https://www.youtube.com/@ashutosh__018"}
                  target="_blank"
                  referrerPolicy="no-referrer"
                >
                  <FaYoutube size={30} />
                </Link>
              </div>
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

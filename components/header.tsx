"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BlogForm } from "./blog-form";
import { handleCreateBlog } from "@/actions";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Header() {
  const {theme, setTheme} =useTheme()
  const pathname = usePathname();
  const [showBlogForm, setShowBlogForm] = useState(false);
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [headerStyle, setHeaderStyle] = useState("hidden")
  useEffect(()=>{
    router.prefetch("/blogs")
    router.prefetch("/my-blogs")

  },[router])
  useEffect(()=>{
    window.onscroll = ()=>{
        setScrollY(window.scrollY)
        if(window.scrollY>0)setHeaderStyle("flex");
        else setHeaderStyle("hidden")
    }

  },[scrollY])
  
  const themeToggle = ()=>setTheme(theme==='light'?'dark':'light')
  return (
    <header
      className={`hidden z-10 dark:bg-black/10  fixed top-0 left-0 w-screen py-4 px-4 justify-evenly items-center backdrop-blur-md shadow-none dark:shadow-white/10 ${
        pathname==="/" ?`lg:${headerStyle}`:'lg:flex'
      }`}
    >
      <h1>QuietPages</h1>
      <nav className=" top-4 left-1/2  flex items-center justify-between px-6 py-2  w-fit rounded-4xl  dark:bg-black/30 border shadow-lg    dark:shadow-white/10  gap-2">
        <Button
            variant="ghost"
            className={`nav-btn-style ${
              pathname === "/" ?"text-black dark:text-white":"text-black/60 dark:text-white/60"
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
              pathname === "/blogs" ?"text-black dark:text-white":"text-black/60 dark:text-white/60"
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
              pathname === "/my-blogs" ?"text-black dark:text-white":"text-black/60 dark:text-white/60"
            }`}
          >
            My Blogs
          </Button>
          <Button
            onClick={() => {
              setShowBlogForm(true);
            }}
            variant="ghost"
            className={`nav-btn-style  ${
              pathname === "/create-blog" ?"text-black dark:text-white":"text-black/60 dark:text-white/60"
            }`}
          >
            Create Blog
          </Button>
      </nav>
      <div className="flex gap-4 items-center  w-32 ">
        <Button className="hover:bg-transparent dark:hover:text-white hover:text-black text-black/80 dark:text-white/70" onClick={themeToggle} size={"icon"} variant={"ghost"} asChild>
        {theme==='light'?<Moon className="w-6 h-6"/>:<Sun className="w-6 h-6"/>}

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
      <BlogForm
        onClose={() => setShowBlogForm(false)}
        isOpen={showBlogForm}
        onSave={handleCreateBlog}
        mode={{
          type: "create",
          blogId: null,
        }}
      />
    </header>
  );
}

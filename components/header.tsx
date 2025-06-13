"use client";

import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BlogForm } from "./blog-form";
import { handleCreateBlog } from "@/actions";
import { Menu, Monitor, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export default function Header() {
  const {theme, setTheme} =useTheme()
  const pathname = usePathname();
  const [showBlogForm, setShowBlogForm] = useState(false);
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [headerStyle, setHeaderStyle] = useState("hidden")
    const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = ()=>setIsMenuOpen(!isMenuOpen)
  useEffect(()=>{
    router.prefetch("/blogs")
    router.prefetch("/my-blogs")

  },[router])
  useEffect(()=>{
    console.log("useeffect ran")
    window.onscroll = ()=>{
      console.log(window.scrollY)
        setScrollY(window.scrollY)
        if(window.scrollY>0)setHeaderStyle("flex");
        else setHeaderStyle("hidden")
    }

  },[scrollY])
  
  const themeToggle = ()=>setTheme(theme==='light'?'dark':'light')
  return (
    <div>

    <header
      className={cn(`hidden z-10 dark:bg-black/10  fixed top-0 left-0 w-screen py-4 px-4 justify-evenly items-center backdrop-blur-md shadow-none dark:shadow-white/10 ${
        pathname==="/" ?`lg:${headerStyle}`:'lg:flex'
      }`)}
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
      
    </header>

{/*mobile navbar */}
  <header
      className={` flex-col z-10  lg:hidden  dark:bg-black/40  fixed top-0 left-0 w-screen py-4 px-4    backdrop-blur-lg shadow-none dark:shadow-white/10 ${
        pathname === "/" ? `${headerStyle}` : "flex"
      }`}
    >
      <div className="flex w-full justify-between">
        <h1>QuietPages</h1>
        <div className="flex gap-4 justify-end">

        <SignedIn>
            <UserButton />
          </SignedIn>
        <Button onClick={toggleMenu} variant={"ghost"} asChild size={"icon"} >{isMenuOpen?<X className="h-6 w-6"/>:<Menu className="w-6 h-6"/>}</Button>
        </div>
      </div>
      {
        isMenuOpen &&
        <nav className=" top-4 h-screen left-1/2 mt-4 flex flex-col items-center   py-2  w-full  gap-2">
          <Button
            variant="ghost"
            className={`nav-btn-style ${
              pathname === "/" ?"text-black dark:text-white":"text-black/60 dark:text-white/60"
            }`}
            onClick={() => {
              router.push("/", { scroll: false });
              setIsMenuOpen(false)
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
              setIsMenuOpen(false)
            }}
          >
            Blogs
          </Button>
          <Button
            onClick={() => {
              router.push("/my-blogs", { scroll: false });
              setIsMenuOpen(false)
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
              setIsMenuOpen(false)
            }}
            variant="ghost"
            className={`nav-btn-style  ${
              pathname === "/create-blog" ?"text-black dark:text-white":"text-black/60 dark:text-white/60"
            }`}
          >
            Create Blog
          </Button>

        <div className="flex flex-col items-center mt-4 gap-4 w-full px-1">
            <div className="flex gap-4">
                <Button onClick={()=>{
                    setTheme('light')
                }} variant={"ghost"} className={`hover:bg-transparent dark:hover:text-white hover:text-black ${theme==='light'?'text-black dark:text-white':'text-black/50 dark:text-white/60'}`} size={"icon"} asChild ><Sun className="w-6 h-6 "/></Button>
                <Button onClick={()=>{
                    setTheme("dark")
                }} variant={"ghost"} className={`hover:bg-transparent dark:hover:text-white hover:text-black ${theme==='dark'?'text-black dark:text-white':'text-black/50 dark:text-white/60'}`} size={"icon"} asChild ><Moon className="w-6 h-6 "/></Button>
                <Button onClick={()=>{
                    setTheme("system")
                }} variant={"ghost"} className={`hover:bg-transparent dark:hover:text-white hover:text-black ${theme==='system'?'text-black dark:text-white':'text-black/50 dark:text-white/60'}`} size={"icon"} asChild ><Monitor className="w-6 h-6 "/></Button>
            </div>
          <SignedOut>
            <Button className="w-full" variant="outline" asChild>
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
          <Button className="w-full bg-black/70 hover:bg-black hover:text-white text-white dark:bg-white/90 hover:dark:bg-white dark:text-black" variant="outline" asChild>
              <SignOutButton/>
            </Button>
            
          </SignedIn>
          
        </div>
        </nav>

      }
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
      
    </div>
  );
}

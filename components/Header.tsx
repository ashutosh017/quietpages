"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BlogForm } from "./blog-form";
import { handleCreateBlog } from "@/actions";

export default function Header() {
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
  
  return (
    <header
      className={`hidden  dark:bg-black/10  fixed top-0 left-0 w-screen py-4 px-4 justify-evenly items-center backdrop-blur-md shadow-none dark:shadow-white/10 ${
        pathname==="/" ?`lg:${headerStyle}`:'lg:flex'
      }`}
    >
      <h1>QuietPages</h1>
      <nav className=" top-4 left-1/2  flex items-center justify-between px-6 py-2  w-fit rounded-4xl  dark:bg-black/30 border shadow-lg    dark:shadow-white/10  gap-2">
        <Button
          variant="ghost"
          className={`nav-btn-style ${
            pathname === "/" && "bg-accent dark:bg-accent/50"
          }`}
          onClick={() => {
            router.push("/",{scroll:false});
          }}
        >
          Home
        </Button>
        <Button
          variant="ghost"
          className={`nav-btn-style  ${
            pathname === "/blogs" && "bg-accent dark:bg-accent/50"
          }`}
          onClick={() => {
            router.push("/blogs",{scroll:false});
          }}
        >
          Blogs
        </Button>
        <Button
          onClick={() => {
            router.push("/my-blogs",{scroll:false});
          }}
          variant="ghost"
          className={`nav-btn-style  ${
            pathname === "/my-blogs" && "bg-accent dark:bg-accent/50"
          }`}
        >
          My Blogs
        </Button>
        <Button
          onClick={() => {
            // router.push("/create-blog")
            setShowBlogForm(true);
          }}
          variant="ghost"
          className={`nav-btn-style  ${
            pathname === "/create-blog" && "bg-accent dark:bg-accent/50"
          }`}
        >
          Create Blog
        </Button>
      </nav>
      <div className="flex gap-4 items-center  w-32 ">
        <ModeToggle />
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

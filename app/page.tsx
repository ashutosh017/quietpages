"use client";

import { handleCreateBlog } from "@/actions";
import { BlogForm } from "@/components/blog-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const theme1 =
    "bg-white/90 text-black dark:bg-black/80 dark:text-white  hover:bg-white/90 hover:text-black hover:dark:bg-black/80 hover:dark:text-white";
  const theme2 =
    "bg-black/80 text-white dark:bg-white/90 dark:text-black hover:bg-black/80 hover:text-white hover:dark:bg-white/90 hover:dark:text-black";
  const themes = [theme1, theme2];
  const [theme, setTheme] = useState(true);
  const toggleTheme = () => {
    console.log("toglle");
    setTheme(!Number(theme));
  };
  const router = useRouter();
  const [showBlogForm, setShowBlogForm] = useState(false);
  const { isSignedIn } = useAuth();
  return (
    <div className="text-black/80 dark:text-white/90 h-screen flex flex-col items-center justify-center  text-center">
      <h1 className="text-5xl lg:text-9xl font-extrabold    lg:px-32">
        Welcome, to
        <p className="">QuietPages</p>
      </h1>
      <div className="flex text-muted-foreground tracking-widest py-4 text-lg font-medium space-x-2 items-center lg:space-x-8 ">
        Write, Share, Blogs.
      </div>
      <div className="flex flex-col lg:flex-row gap-5">
        <Button
          onMouseOver={toggleTheme}
          // onMouseLeave={toggleTheme}
          onClick={() => {
            isSignedIn ? setShowBlogForm(true) : router.push("/sign-in");
          }}
          className={cn(themes[Number(theme)], "home-btn-style")}
          variant={"outline"}
        >
          Write your first blog
        </Button>

        <Button
          onMouseOver={toggleTheme}
          // onMouseLeave={toggleTheme}
          onClick={() => {
            router.push("/blogs");
          }}
          className={cn(themes[Number(!theme)], "home-btn-style")}
          variant={"outline"}
        >
          Explore blogs
        </Button>
      </div>
      <BlogForm
        onClose={() => setShowBlogForm(false)}
        onSave={handleCreateBlog}
        isOpen={showBlogForm}
        mode={{
          type: "create",
          blogId: null,
        }}
      />
    </div>
  );
}

"use client";

import { handleCreateBlog } from "@/lib/actions";
import AuthRequiredPopUp from "@/components/auth-required-popup";
import { BlogForm } from "@/components/blog-form";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AIFeaturesShowcase from "@/components/ai-features-showcase";
import { AIFeaturesDemo } from "@/components/ai-features-demo";

export default function Home() {
  const router = useRouter();
  const [showBlogForm, setShowBlogForm] = useState(false);
  const { isSignedIn } = useAuth();
  const [showSigninPopup, setshowSigninPopup] = useState(false);

  return (
    <div>
      <div className=" text-black/80 dark:text-white/90 min-h-screen flex flex-col items-center justify-center text-center ">
        <h1 className="text-5xl lg:text-8xl font-extrabold lg:px-32 drop-shadow-[0_3px_3px_rgba(0,0,0,0.4)] dark:drop-shadow-[0_3px_3px_rgba(255,255,255,0.25)]">
          Welcome to QuietPages
        </h1>

        <div className="flex text-muted-foreground py-4 lg:py-8 text-lg lg:text-lg text-center px-14">
          {/* Write, Share, Blogs. */}
          An AI Powered Platform for Writing, Sharing, Blogs with your friends
          and family.
        </div>
        <div className="flex flex-col lg:flex-row gap-5 ">
          <Button
            onClick={() => {
              isSignedIn ? setShowBlogForm(true) : setshowSigninPopup(true);
            }}
            className={cn(
              "bg-neutral-800 text-neutral-50",
              "hover:bg-neutral-700 hover:text-neutral-50",
              "dark:bg-neutral-200 dark:text-neutral-900",
              "dark:hover:bg-neutral-50 ",
              "home-btn-style"
            )}
            variant={"outline"}
          >
            Write your first blog
          </Button>

          <Button
            onClick={() => router.push("/blogs")}
            className={cn(
              "home-btn-style",
              "dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
            variant={"outline"}
          >
            Explore blogs
          </Button>
        </div>
      </div>
      <AIFeaturesDemo />
      {/* <AIFeaturesShowcase /> */}
      <BlogForm
        onClose={() => setShowBlogForm(false)}
        onSave={handleCreateBlog}
        isOpen={showBlogForm}
        mode={{
          type: "create",
          blogId: null,
        }}
      />
      <AuthRequiredPopUp
        isOpen={showSigninPopup}
        onClose={() => setshowSigninPopup(false)}
      />
    </div>
  );
}

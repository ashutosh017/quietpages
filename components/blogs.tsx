'use client'

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, ImageIcon, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { BlogForm } from "@/components/blog-form";
import { handleCreateBlog } from "@/actions";
import AuthRequiredPopUp from "@/components/auth-required-popup";
import { useState } from "react";
import { Blog } from "@/lib/generated/prisma";
import { EmptyState } from "./empty-state";

function truncateContent(content: string, wordLimit = 20): string {
  const words = content.split(" ");
  if (words.length <= wordLimit) return content;
  return words.slice(0, wordLimit).join(" ") + "...";
}

export default  function BlogsPage({blogs}:{blogs:Blog[]}) {
  const { isSignedIn } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAuthRequiredPopup, setShowAuthRequiredPopup] = useState(false);

if(blogs.length===0){
    return   <div className="min-h-screen flex items-center justify-center border border-border/40 rounded-lg mb-8">
          <EmptyState
            title="No blog posts yet"
            description="Create your first blog post to get started. Your blog posts will appear here."
            actionLabel="Create Your First Blog"
            onAction={() => {
                 isSignedIn
              ? setShowCreateForm(true)
              : setShowAuthRequiredPopup(true);
            }}
          />
           <BlogForm
          isOpen={showCreateForm}
          onClose={() => setShowCreateForm(false)}
          onSave={handleCreateBlog}
          mode={{
            type:"create",
            blogId:null
          }}
        />

        </div>
}

  return (
    <div className="container min-h-screen mx-auto px-4 py-16 lg:py-24 max-w-4xl">
      <div className="mb-6">
        <Button
          className=""
          onClick={() => {
            isSignedIn
              ? setShowCreateForm(true)
              : setShowAuthRequiredPopup(true);
          }}
          asChild
          variant={"outline"}
        >
         <div className="">
             <Plus /> Create One
         </div>
        </Button>
      </div>

      <div className="flex space-y-4 flex-col">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.id}`}>
            <Card className="group border border-border/40 hover:border-border hover:shadow-sm transition-all duration-200 cursor-pointer bg-card/50 hover:bg-card">
              <CardHeader className="">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl font-medium leading-relaxed group-hover:text-primary transition-colors flex-1 pr-4">
                    {blog.title}
                  </CardTitle>
                  {blog.images && blog.images.length > 0 && (
                    <div className="flex items-center gap-1 text-muted-foreground shrink-0">
                      <ImageIcon className="w-4 h-4" />
                      <span className="text-sm">{blog.images.length}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground leading-relaxed mb-4 text-[15px]">
                  {truncateContent(blog.content)}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span className="font-medium">{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {new Date(blog.dateCreated).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more →
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        <BlogForm
          isOpen={showCreateForm}
          onClose={() => setShowCreateForm(false)}
          onSave={handleCreateBlog}
          mode={{
            type:"create",
            blogId:null
          }}
        />

        <AuthRequiredPopUp
          isOpen={showAuthRequiredPopup}
          onClose={() => setShowAuthRequiredPopup(false)}
        />
      </div>
    </div>
  );
}

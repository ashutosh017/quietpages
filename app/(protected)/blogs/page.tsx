"use client";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, ImageIcon, User } from "lucide-react"
import { Blog } from "@/types";


function truncateContent(content: string, wordLimit = 20): string {
  const words = content.split(" ")
  if (words.length <= wordLimit) return content
  return words.slice(0, wordLimit).join(" ") + "..."
}

export default function ReadingPage() {

  const { getToken } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        const res = await axios.get("/api/v1/blogs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(res.data.blogs);
      } catch (error) {
        console.log("error: ", error);
      }
    })();
  }, []);

 return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* <div className="mb-12">
        <h1 className="text-3xl font-light mb-2">Blog</h1>
        <p className="text-muted-foreground">Thoughts and insights</p>
      </div> */}

     <div className="space-y-6">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.id}`}>
            <Card className="group border border-border/40 hover:border-border hover:shadow-sm transition-all duration-200 cursor-pointer bg-card/50 hover:bg-card">
              <CardHeader className="pb-4">
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
      </div>
    </div>
  )
}

"use client";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, User } from "lucide-react"
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

      <div className="space-y-8">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.id}`}>
            <Card className="border-0 shadow-none hover:bg-muted/30 transition-colors cursor-pointer">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-medium leading-relaxed hover:text-primary transition-colors">
                  {blog.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground leading-relaxed mb-4">{truncateContent(blog.content)}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {blog.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" />
                    {new Date(blog.dateCreated.toString()).toLocaleDateString()}
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

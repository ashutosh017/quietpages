'use client'
import Link from "next/link"
import { notFound, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CalendarDays, User } from "lucide-react"
import { useEffect, useState } from "react"
import { Blog } from "@/types"
import axios from "axios"

// Sample blog data - same as in the main page




interface BlogPageProps {
  params:Promise<{id:string}>
}
export default  function BlogPage({params}:BlogPageProps) {
const [blog, setBlog] = useState<Blog | null>(null) 
 const searchParams = useSearchParams()
 console.log("sp: ",searchParams)
useEffect(()=>{
    (async()=>{
        const {id }= await params;
    console.log("id: ",id)

        try {
        const res = await axios.get(`/api/v1/blogs/${id}`)
            
        setBlog(res.data)
        } catch (error) {
            notFound()
        }
        
    })()
},[])


  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-8 -ml-3">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        <h1 className="text-2xl font-medium mb-6 leading-relaxed">{blog?.title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {blog?.author}
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays className="w-3 h-3" />
            {new Date(blog?.dateCreated!).toLocaleDateString()}
          </div>
        </div>
      </div>

      <article className="prose prose-neutral max-w-none">
        <p className="text-foreground leading-relaxed text-base">{blog?.content}</p>
      </article>

      <div className="mt-12 pt-8 border-t border-border/40">
        <Link href="/reading">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all posts
          </Button>
        </Link>
      </div>
    </div>
  )
}

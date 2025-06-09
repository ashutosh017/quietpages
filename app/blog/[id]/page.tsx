import { notFound } from "next/navigation";
import BlogContent from './BlogContent'
import { prisma } from "@/db/src";
interface BlogPageProps {
  params: Promise<{ id: string }>;
}
export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = await params;
  const blog = await prisma.blog.findFirst({
    where:{id}
  })

  if (!blog) return notFound();

  return  <BlogContent blog={{ ...blog, dateCreated: blog.dateCreated.toISOString() }}/>
  
}
import { notFound } from "next/navigation";
import BlogContent from '../../../components/BlogContent'
import { prisma } from "@/lib/prisma";
interface BlogPageProps {
  params: Promise<{ id: string }>;
}
export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = await params;
  const blog = await prisma.blog.findFirst({
    where:{id}
  })
  console.log(blog?.content)
  if (!blog) return notFound();

  return  <BlogContent blog={{ ...blog, dateCreated: blog.dateCreated.toISOString() }}/>
  
}
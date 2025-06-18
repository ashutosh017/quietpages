import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BlogContent from "../../../components/blog-content";
interface BlogPageProps {
  params: Promise<{ id: string }>;
}
export default async function Blog({ params }: BlogPageProps) {
  const { id } = await params;
  const blog = await prisma.blog.findFirst({
    where: { id },
  });
  console.log(blog?.content);
  if (!blog) return notFound();

  return (
    <BlogContent
      blog={{ ...blog, dateCreated: blog.dateCreated.toISOString() }}
    />
  );
}

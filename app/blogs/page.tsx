
import BlogsPage from "@/components/Blogs";
import { prisma } from "@/db/src";
import { notFound } from "next/navigation";



export default async function ReadingPage() {


  const blogs = await prisma.blog.findMany();
  if (!blogs) notFound();

  return (
    <BlogsPage blogs={blogs}/>
  );
}

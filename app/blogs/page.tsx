
import BlogsPage from "@/components/Blogs";
import { prisma } from "@/lib/prisma";


export default async function ReadingPage() {


  const blogs = await prisma.blog.findMany();

  return (
    <BlogsPage blogs={blogs}/>
  );
}

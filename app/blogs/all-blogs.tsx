
import BlogsPage from "@/components/blogs";
import { prisma } from "@/lib/prisma";


export default async function AllBlogs() {

  const blogs = await prisma.blog.findMany();

  return (
    <BlogsPage blogs={blogs}/>
  );
}

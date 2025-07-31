import BlogsPage from "@/components/blogs-page";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export default async function AllBlogs() {

  const blogs = await prisma.blog.findMany();

  return (
    <>
      <BlogsPage blogs={blogs} />
    </>
  );
}

import BlogsPage from "@/components/blogs-page";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export default async function AllBlogs() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });

  const blogs = await prisma.blog.findMany();

  return (
    <>
      <BlogsPage blogs={blogs} />
    </>
  );
}

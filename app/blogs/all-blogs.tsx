import BlogsPage from "@/components/blogs-page";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export default async function AllBlogs() {

  const blogs = await prisma.blog.findMany({
    orderBy:{
      dateCreated:"desc"
    }
  });

  return (
    <>
      <BlogsPage blogs={blogs} />
    </>
  );
}

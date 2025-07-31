import BlogsPage from "@/components/blogs-page";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const revalidate = 60;

export default async function MyBlogs(){

  const user = await currentUser()

  const blogs = await prisma.blog.findMany({
    where:{
      userId:user?.id
    },
    orderBy:{
      dateCreated:"desc"
    }
  })
  console.log("my blogs: ",blogs)

  return <BlogsPage blogs={blogs}/>

}
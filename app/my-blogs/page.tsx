import BlogsPage from "@/components/Blogs";
import SignInRequiredPage from "@/components/signin-required-page";
import SignInRequired from "@/components/signin-required-page";
import { prisma } from "@/lib/prisma";
import { useAuth, useUser } from "@clerk/nextjs"
import { currentUser, getAuth } from "@clerk/nextjs/server";

export default async function page(){
  const user = await currentUser()

  const blogs = await prisma.blog.findMany({
    where:{
      userId:user?.id
    }
  })
  console.log("my blogs: ",blogs)

  return <BlogsPage blogs={blogs}/>

}
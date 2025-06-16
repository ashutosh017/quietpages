
import BlogsPage from "@/components/blogs-page";
import MyBlogs from "@/app/my-blogs/my-blogs";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import Loading from "./loading";


export default async function page() {



  return (
    <Suspense fallback={<Loading/>}><MyBlogs/></Suspense>
  );
}


import AllBlogs from "@/app/blogs/all-blogs";
import { Suspense } from "react";
import Loading from "./loading";


export default async function ReadingPage() {

  return (
    <Suspense fallback={<Loading/>}><AllBlogs/></Suspense>
  );
}

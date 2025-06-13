import { Suspense } from "react";
import Loading from "./loading";
import Blog from "./blog";

interface BlogPageProps {
  params: Promise<{ id: string }>;
}
export default function page({ params }: BlogPageProps){
  return <Suspense fallback={<Loading/>}><Blog params={params}/></Suspense>
}
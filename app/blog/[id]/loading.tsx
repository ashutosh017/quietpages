import { BlogCardSkeleton, BlogPageSkeleton } from "@/components/skeletons";

export default function Loading(){
    return <div className="h-screen  mx-auto max-w-4xl px-4 py-24 ">
        <BlogPageSkeleton/>
    </div>
}
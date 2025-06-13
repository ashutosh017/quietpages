import { BlogListSkeleton } from "@/components/skeletons";

export default function Loading(){
    return <div className="container py-24 max-w-4xl px-4 mx-auto">
        <BlogListSkeleton/>
    </div>
}
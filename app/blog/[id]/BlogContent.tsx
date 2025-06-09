"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, User, ZoomIn } from "lucide-react";
import {  useState } from "react";
import { Blog } from "@/types";
import Image from "next/image";
import { ImageLightbox } from "@/components/image-ligtbox";



export default function BlogPage({blog}:{blog:Blog}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
//   const [blog, setBlog] = useState<Blog | null>(null);
//   const searchParams = useSearchParams();
//   console.log("sp: ", searchParams);
//   useEffect(() => {
//     (async () => {
//       const { id } = await params;
//       try {
//         const res = await axios.get(`/api/v1/blogs/${id}`);
//         if (!res.data) {
//           throw new Error();
//         }
//         setBlog(res.data);
//       } catch (error) {
//         console.log("error");
//         notFound();
//       }
//     })();
//   }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="mb-8">
        <Link href="/blogs">
          <Button variant="ghost" size="sm" className="mb-8 -ml-3">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        <h1 className="text-2xl font-medium mb-6 leading-relaxed">
          {blog?.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {blog?.author}
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5" />
            {new Date(blog?.dateCreated!).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      </div>

      <article className="prose prose-neutral max-w-none">
        <p className="text-foreground leading-relaxed text-base">
          {blog?.content}
        </p>
      </article>
      {blog && blog.images && blog.images.length > 0 && (
        <div className="mt-12 pt-8 border-t border-border/40">
          <h3 className="text-lg font-medium mb-6 text-muted-foreground">
            Images
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {blog.images.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border border-border/40 bg-muted/30 cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10 flex items-center justify-center">
                  <div className="bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="h-5 w-5 text-white" />
                  </div>
                </div>
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Image ${index + 1} from ${blog.title}`}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-border/40">
        <Link href="/blogs">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all posts
          </Button>
        </Link>
      </div>
      {lightboxOpen && blog && blog.images && (
        <ImageLightbox
          images={blog.images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}

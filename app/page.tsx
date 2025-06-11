import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center  text-center">
      <h1 className=" text-5xl lg:text-9xl font-bold   lg:px-32">
        Welcome, to
        <p className="">QuietPages</p>
      </h1>
      <div className="flex text-muted-foreground tracking-widest py-4 text-lg font-medium space-x-2 items-center lg:space-x-8 ">
        Write, Share, Blogs.
       
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center  text-center">
      <h1 className=" text-5xl lg:text-9xl font-bold  lg:px-32">
        Welcome, to
        <p className="">QuietPages</p>
      </h1>
      <div className="flex  space-x-2 items-center lg:space-x-8 ">
        <Button variant={"secondary"} asChild className="mt-8 font-bold lg:text-2xl lg:p-6 ">
          <Link href="/blogs">Start Reading</Link>
        </Button>
        <Button variant={"secondary"} asChild className="mt-8 font-bold lg:text-2xl lg:p-6">
          <Link href="/writing">Start Writing</Link>
        </Button>
      </div>
    </div>
  );
}

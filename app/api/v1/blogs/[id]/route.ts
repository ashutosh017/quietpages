import { prisma } from "@/db/src";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    id: string;
  };
}
export async function GET(req: NextRequest, { params }: Params) {
  const {id }= await params;
  console.log("id: ",id)
  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id,
      },
    });
    return NextResponse.json(blog, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json("blog does not exist with this id", {
      status: 200,
    });
  }
}

import { prisma } from "@/db/src";
import { verifyClerkToken } from "@/lib/clerkAuth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const headersList = await headers();
  const authHeader = headersList.get("Authorization");
  if (!authHeader) {
    NextResponse.json({
      msg:"no req header"
    },{
      status:400
    })
    return;
  }
  await verifyClerkToken(authHeader);
  // const blogs = await prisma.blog.findMany();
  const blogs = {
    name:"hi"
  }
  if (!blogs) {
    return NextResponse.json(
      {
        msg: "could not fetch blogs",
      },
      {
        status: 401,
      }
    );
  }
  return NextResponse.json(
    {
      blogs,
    },
    {
      status: 200,
    }
  );
}
type CreateBlogBodyType = {
  title: string;
  content: string;
  images: string[];
  userId: string;
};
export async function POST(req: NextRequest) {
  let { title, content, images, userId }: CreateBlogBodyType = await req.json();
  if (images === null) {
    images = [];
  }
  if (!userId) {
    return;
  }
  await prisma.blog.create({
    data: {
      title,
      content,
      images,
      userId,
    },
  });
  return NextResponse.json(
    {
      msg: "blog created successfully",
    },
    {
      status: 200,
    }
  );
}

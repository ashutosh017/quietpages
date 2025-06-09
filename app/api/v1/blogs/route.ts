import { verifyClerkToken } from "@/lib/clerkAuth";
import { headers } from "next/headers";
import { NextRequest, NextResponse} from "next/server";
import { prisma } from "../../../../db/src/index";
import { clerkClient } from "@clerk/nextjs/server";
import { CreateBlogBodyType } from "@/types";


export async function GET(req: NextRequest) {
  const headersList = await headers();
  const authHeader = headersList.get("Authorization");
  if (!authHeader) {
    return NextResponse.json(
      {
        msg: "no req header",
      },
      {
        status: 400,
      }
    );
  }
  await verifyClerkToken(authHeader);
  try {
    const blogs = await prisma.blog.findMany();

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
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        msg: "Some error occured",
        error,
      },
      {
        status: 403,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  let { title, content, images, userId }: CreateBlogBodyType = await req.json();
  //TODO: strict type checking here
  if (images === null) {
    images = [];
  }
  if (!userId) {
    return;
  }
  const user =await (await clerkClient()).users.getUser(userId);
  if (!user) {
    NextResponse.json("Invalid user id", {
      status: 400,
    });
  }
  const userName = user.fullName
  await prisma.blog.create({
    data: {
      title,
      content,
      images,
      userId,
      author:userName ?? "Anonymous"
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

// lib/clerkAuth.ts
import { verifyToken } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function verifyClerkToken(authorizationHeader?: string) {
  if (!authorizationHeader?.startsWith("Bearer ")) {
    throw new Error("Unauthorized: Missing Bearer token");
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const verify = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
      authorizedParties: ["http://localhost:3000"],
    });
    console.log("token verified: ",verify)
    return NextResponse.json(verify,{
        status:200
    })
  } catch {
    throw new Error("Unauthorized: Invalid token");
  }
}

import { razorpay } from "@/lib/razorpay";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const body = await req.json();
  const { amount } = body;
  try {
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    };
    const order = razorpay.orders.create(options);
    return NextResponse.json({ order, msg: "ok" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

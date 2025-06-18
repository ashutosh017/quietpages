import { razorpay_key_id } from "@/config";
import { razorpay } from "@/lib/razorpay";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  console.log("hit")
  const body = await req.json();
  console.log(body)
  const { amount } = body;

  
  try {
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    };
    const order = await razorpay.orders.create(options);
    const res = await razorpay.orders.fetch(order.id)
    console.log("res: ",res)
    return NextResponse.json({ order, msg: "ok" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

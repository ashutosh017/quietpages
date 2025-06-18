import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { razorpay_key_secret } from "@/config";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
    if(!razorpay_key_secret){
        console.log("no key secret")
        throw new Error("razorpay secret not found")
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", razorpay_key_secret)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {

      return NextResponse.json(
        {
          msg: "Ok",
        },
        {
          status: 200,
        }
      );
    }
    else {
        console.log("rzp sign not eql exp sign")
        throw new Error("rzp sign!= exp sign")
    }
  } catch (err) {
    return NextResponse.json(
      {
        err,
      },
      {
        status: 500,
      }
    );
  }
}

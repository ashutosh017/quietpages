"use client";

import { handleCreateBlog } from "@/actions";
import AuthRequiredPopUp from "@/components/auth-required-popup";
import { BlogForm } from "@/components/blog-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { razorpay_key_id } from "@/config";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { ArrowRight, Badge, Check, Crown, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRazorpay } from "react-razorpay";

const features = {
  free: [
    "Create unlimited blog posts",
    "Basic text editor",
    "Image uploads (up to 5 per post)",
    "Share on social media",
    "Search functionality",
    "Basic themes",
  ],
  premium: [
    "Everything in Free",
    "AI-powered writing assistant",
    "Advanced text editor with formatting",
    "Unlimited image uploads",
    "Custom domain support",
    "Analytics dashboard",
    "Priority support",
    "Advanced themes & customization",
    "SEO optimization tools",
    "Export to PDF/Word",
  ],
};

export default function Home() {
  const router = useRouter();
  const [showBlogForm, setShowBlogForm] = useState(false);
  const { isSignedIn } = useAuth();
   const { Razorpay } = useRazorpay();
   const [showSigninPopup, setshowSigninPopup] = useState(false)
   
  
  
    const handlePayment = async () => {
      try {
        const response = await axios.post("/api/v1/razorpay/create-order", {
          amount: 500,
        });
  
        console.log("response.data: ", response.data);
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const order = response.data.order;
        const options = {
          key: razorpay_key_id!,
          amount: order.amount,
          currency: order.currency,
          name: "QuietPages",
          description: "Payment for your order",
          order_id: order.id,
          handler: async (response: any) => {
            try {
              const verifyResponse = await axios.post(
                "/api/v1/razorpay/verify-payment",
  
                {
                  razorpay_order_id: order.id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }
              );
  
              if (verifyResponse.status !== 200) {
                throw new Error("Payment verification failed");
              }
  
              const verificationResult = verifyResponse.data;
              console.log("Payment verified:", verificationResult);
            } catch (err) {
              console.error("Payment verification error:", err);
           
            }
          },
          prefill: {
            name: "John Doe",
            email: "john@example.com",
            contact: "9999999999",
          },
          notes: JSON.stringify({
            address: "Razorpay Corporate Office",
          }),
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: () => {
              console.log("Payment modal dismissed");
            },
          },
        };
  
        if (!Razorpay) {
          throw new Error("Razorpay SDK not loaded");
        }
  
        const rzpay = new Razorpay(options);
        rzpay.open();
      } catch (err) {
        console.error("Error creating order:", err);
      }
    };
  return (
    <div>
      <div className=" text-black/80 dark:text-white/90 min-h-screen flex flex-col items-center justify-center text-center ">
        <h1 className="text-5xl lg:text-8xl font-extrabold lg:px-32 drop-shadow-[0_3px_3px_rgba(0,0,0,0.4)] dark:drop-shadow-[0_3px_3px_rgba(255,255,255,0.25)]">
          Welcome to QuietPages
        </h1>

        <div className="flex text-muted-foreground py-4 lg:py-8 text-lg lg:text-lg text-center ">
          {/* Write, Share, Blogs. */}
          An AI Powered Platform for Writing, Sharing, Blogs with your friends and family.
        </div>
        <div className="flex flex-col lg:flex-row gap-5 ">
          <Button
            onClick={() => {
              isSignedIn ? setShowBlogForm(true) : setshowSigninPopup(true);
            }}
            className={cn(
              "bg-neutral-800 text-neutral-50",
              "hover:bg-neutral-700 hover:text-neutral-50",
              "dark:bg-neutral-200 dark:text-neutral-900",
              "dark:hover:bg-neutral-50 ",
              "home-btn-style"
            )}
            variant={"outline"}
          >
            Write your first blog
          </Button>

          <Button
            onClick={() => router.push("/blogs")}
            className={cn("home-btn-style", "dark:bg-neutral-900 dark:hover:bg-neutral-800")}
            variant={"outline"}
          >
            Explore blogs
          </Button>
        </div>
      </div>
      <div>
        <section className="container mx-auto px-4 ">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your Writing Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start free and upgrade when you're ready for advanced features
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="relative bg-background/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Free</CardTitle>
                  <span className="rounded-full bg-neutral-200 text-black dark:bg-neutral-700 px-2 dark:text-white">
                    current
                  </span>
                </div>
                <CardDescription>Perfect for getting started</CardDescription>
                <div className="pt-4">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {features.free.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/blogs" className="block">
                  <Button className="w-full" variant="outline">
                    Get Started Free
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="relative  shadow-lg bg-background/50">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="rounded-full flex gap-1 items-center justify-center bg-neutral-800 text-white dark:bg-neutral-100 dark:text-black px-2">
                  <Crown className="w-3 h-3" />
                  <p className="font-extrabold text-xs">Most Popular</p>
                </span>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Premium</CardTitle>
                  <span className="rounded-full flex gap-1 items-center justify-center bg-neutral-800 text-white dark:bg-neutral-200 dark:text-black px-2 font-bold text-sm">
                    <Zap className="w-4 h-3 " />
                    <p className="">
                      AI Powered</p>
                  </span>
                </div>
                <CardDescription>
                  For serious writers and creators
                </CardDescription>
                <div className="pt-4">
                  <span className="text-3xl font-bold">$9</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {features.premium.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full gap-2" onClick={handlePayment}>
                  <Crown className="w-4 h-4" />
                  Upgrade to Premium
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  7-day free trial • Cancel anytime
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20 bg-transparent">
          <div className="bg-transparent rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Writing?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of writers who trust QuietPages for their blogging
              needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blogs">
                <Button size="lg" className="gap-2">
                  Start Writing Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                View Pricing Details
              </Button>
            </div>
          </div>
        </section>
      </div>
      <BlogForm
        onClose={() => setShowBlogForm(false)}
        onSave={handleCreateBlog}
        isOpen={showBlogForm}
        mode={{
          type: "create",
          blogId: null,
        }}
      />
        <AuthRequiredPopUp
              isOpen={showSigninPopup}
              onClose={() => setshowSigninPopup(false)}
            />
    </div>
  );
}

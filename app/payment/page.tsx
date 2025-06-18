"use client";

import { razorpay_key_id } from "@/config";
import axios from "axios";
import { useRazorpay } from "react-razorpay";
// import Razorpay from "razorpay";

export default function PaymentPage() {
  //   const { Razorpay } = useRazorpay();
  const { error, isLoading, Razorpay } = useRazorpay();

  const handlePayment = async () => {
    try {
      // Make the API call to backend
      const response = await axios.post("/api/v1/razorpay/create-order", {
        amount: 500,
      });

      console.log("response.data: ", response.data);
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const order = response.data.order;
      console.log("Order created:", order);

      // Razorpay options
      console.log("razorpay key: ", razorpay_key_id);
      console.log(response.data)
      

      const options = {
        key: razorpay_key_id!,
        amount: order.amount,
        currency: order.currency,
        name: "Your Company Name",
        description: "Payment for your order",
        order_id: order.id,
        handler: async (response: any) => {
          try {
            const verifyResponse = await axios.post(
              "/api/v1/razorpay/verify-payment",

              {
                razorpay_order_id: order.id,
                razorpay_payment_id: response.data.razorpay_payment_id,
                razorpay_signature: response.data.razorpay_signature,
              }
            );

            if (verifyResponse.status!==200) {
              throw new Error("Payment verification failed");
            }

            const verificationResult =  verifyResponse.data;
            console.log("Payment verified:", verificationResult);
            alert("Payment successful!");
          } catch (err) {
            console.error("Payment verification error:", err);
            alert(
              "Payment verification failed: " +
                (err instanceof Error ? err.message : err)
            );
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
    <div className="p-8 mt-16 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Payment Gateway</h1>
      <button
        onClick={handlePayment}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Pay ₹50
      </button>
    </div>
  );
}

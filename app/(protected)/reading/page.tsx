"use client";

import { useAuth } from "@clerk/nextjs";
import { auth, clerkClient, currentUser, Token } from "@clerk/nextjs/server";
import axios from "axios";
export default function ReadingPage() {
  const fun = async () => {
    // console.log("token: ", token);
  };
  (async () => {
    // await fun();
    const { getToken } = useAuth();
    const token = await getToken();
    if (!token) return;
    await axios.get("/api/v1/blogs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  })();
  // Fetch data from an external API
  //   const response = await fetch("https://api.example.com/data", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  return <div>Reading page</div>;
}

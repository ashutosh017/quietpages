"use server";

import axios from "axios";
import {
  cloudinaryApiKey,
  cloudinaryApiSecret,
  cloudinaryCloudName,
} from "./config";
import { Blog, Mode } from "./types";
import crypto from "crypto";
import { prisma } from "./db/src";
import { clerkClient } from "@clerk/nextjs/server";

export const handleCreateBlog = async (
  blog: Omit<Blog, "id" | "dateCreated">,
  mode: Mode
) => {
  try {
    console.log(blog)
    const res = await prisma.blog.create({
      data: {
        ...blog
      },
    });
    return {
      msg: "blog created successfully",
      res,
    };
  } catch (error) {
    console.log(error)
    return {
      msg: "error occured while creating blog",
      error,
    };
  }
};

export const handleUpdateBlog = async (
  blog: Omit<Blog, "id" | "dateCreated">,
  mode: Mode
) => {
  try {
    if (!mode.blogId) {
      return {
        msg: "blog id not found",
      };
    }
    const res = await prisma.blog.update({
      where: {
        id: mode.blogId,
      },
      data: blog,
    });
    return {
      msg: "blog updated successfully",
      res,
    };
  } catch (error) {
    return {
      msg: "error updating blog",
      error,
    };
  }
};
export const deleteImageFromCloudinary = async (
  assetId: string,
  publicId: string
) => {
  console.log("delete image called");
  if (!cloudinaryApiKey || !cloudinaryApiKey || !cloudinaryCloudName) {
    console.log("not found ");
    return;
  }
  const timestamp = Math.floor(Date.now() / 1000);

  const signature = crypto
    .createHash("sha1")
    .update(
      `public_id=${publicId}&timestamp=${timestamp}${cloudinaryApiSecret}`
    )
    .digest("hex");

  console.log(assetId);
  const payload = {
    signature,
    public_id: publicId,
    asset_id: assetId,
    api_key: cloudinaryApiKey,
    timestamp,
  };

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/destroy`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);

    return response.data; // { result: "ok" } or { result: "not found" }
  } catch (error: any) {
    console.error("Cloudinary deletion failed", error.response?.data || error);
    throw new Error("Failed to delete asset from Cloudinary");
  }
};

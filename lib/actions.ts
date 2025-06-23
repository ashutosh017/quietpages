"use server";

import axios from "axios";
import {
  cloudinaryApiKey,
  cloudinaryApiSecret,
  cloudinaryCloudName,
} from "../config";
import { Blog, Mode } from "../types";
import crypto from "crypto";
import { prisma } from "./prisma";
import { ai } from "./gemini";
const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
export const handleCreateBlog = async (
  blog: Omit<Blog, "id" | "dateCreated">,
  mode: Mode
) => {
  try {
    console.log(blog);
    const res = await prisma.blog.create({
      data: {
        ...blog,
      },
    });
    return {
      msg: "blog created successfully",
      res,
    };
  } catch (error) {
    console.log(error);
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

export const handleDeleteBlog = async (id: string) => {
  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id,
      },
    });
    if (!blog) {
      return {
        msg: "blog not found",
      };
    }
    const imageUrls = blog.images;
    const publicIds = imageUrls.map((url) => {
      const parts = url.split("/");
      const uploadIndex = parts.indexOf("upload");
      const publicIdParts = parts.slice(uploadIndex + 1);

      if (publicIdParts[0].match(/^v\d+$/)) {
        publicIdParts.shift();
      }

      return publicIdParts.join("/").replace(/\.[^/.]+$/, "");
    });

    if (publicIds.length > 0) {
      Promise.all(
        publicIds.map((publicId) => {
          return deleteImageFromCloudinary(publicId);
        })
      ).catch((err) => {
        console.error("Error deleting images:", err);
      });
    }
    const res = await prisma.blog.delete({
      where: {
        id,
      },
    });
    return {
      msg: "blog deleted successfully",
      res,
    };
  } catch (error) {
    return {
      msg: "error deleting blog",
      error,
    };
  }
};

export const deleteImageFromCloudinary = async (
  publicId: string,
  assetId?: string
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
    // asset_id: assetId,
    api_key: cloudinaryApiKey,
    timestamp,
  };

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/destroy`,
      payload
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
    );
    console.log(response.data);

    return response.data; // { result: "ok" } or { result: "not found" }
  } catch (error: any) {
    console.error("Cloudinary deletion failed", error.response?.data || error);
  }
};
export const generateBlogTitle = async (query: string) => {
  const resp = await model.generateContent(
    "hey I will give you blog title you have to give me a better title or if the title I give you is incomplete then you have to give me complete version of it, and only response back with the title and do not give me any other text. query title: " +
      query
  );
  return resp.response.text();
};

export const guessTheNextWord = async (query: string) => {
  const resp = await model.generateContent(
    "hey I will give you paragraph and you have to predict the next word or next few words for it. If the last word of the paragraph is incomplete then you have to return the remaining part of the word along with few more words if you want also if you are starting your response with a new word add a space before it. And do not add any other text in the response. query paragraph: " +
      query
  );
  return resp.response.text();
};

// export const generateBlogTitle = async (query: string) => {
//   const prompt = `Rewrite or complete this blog title. Respond with the improved title only. Input: ${query}`;
//   const stream = await model.generateContentStream([{ text: prompt }]);

//   let full = "";
//   for await (const chunk of stream.stream) {
//     full += chunk.text();
//   }
//   return full.trim();
// };

// export const guessTheNextWord = async (query: string) => {
//   const prompt = `Predict the next word(s) of this paragraph. Reply with only the continuation. Input: ${query}`;
//   const stream = await model.generateContentStream([{ text: prompt }]);

//   let full = "";
//   for await (const chunk of stream.stream) {
//     full += chunk.text();
//   }
//   return full.trim();
// };

"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CalendarDays,
  User,
  ZoomIn,
  Edit,
  Trash2,
  MoreHorizontal,
  Share2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Blog } from "@/types";
import Image from "next/image";
import { ImageLightbox } from "@/components/image-ligtbox";
import { DeleteConfirmation } from "./delete-confirmation";
import { BlogForm } from "./blog-form";
import { useAuth, useUser } from "@clerk/nextjs";
import { handleDeleteBlog, handleUpdateBlog } from "@/lib/actions";

import Linkify from "linkify-react";
import { ShareBlog } from "./share-blog";

const linkifyOptions = {
  target: "_blank",
  rel: "noopener noreferrer",
  className: "text-blue-600 dark:text-blue-300 underline",
};

export default function BlogContent({ blog }: { blog: Blog }) {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  const [showShareDialog, setShowShareDialog] = useState(false);
  console.log("user.id: ", user?.id);
  console.log("userId: ", blog.userId);

  return (
    <div className="container min-h-screen  mx-auto px-4 py-24 max-w-2xl">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => {
              window.history.back();
            }}
            variant="ghost"
            size="sm"
            className="-ml-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowShareDialog(true)}
              className="gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            {isSignedIn && user?.id === blog.userId && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setShowEditForm(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setShowDeleteDialog(true)}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        <h1 className="text-2xl font-medium mb-6 leading-relaxed">
          {blog?.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {blog?.author}
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5" />
            {new Date(blog?.dateCreated!).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      </div>

      <article className="prose prose-neutral max-w-none">
        <p className="text-foreground leading-relaxed text-base whitespace-pre-line">
          {/* {blog?.content} */}
          <Linkify options={linkifyOptions}>{blog?.content}</Linkify>
        </p>
      </article>
      {blog && blog.images && blog.images.length > 0 && (
        <div className="mt-12 pt-8 border-t border-border/40">
          <h3 className="text-lg font-medium mb-6 text-muted-foreground">
            Images
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {blog.images.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border border-border/40 bg-muted/30 cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10 flex items-center justify-center">
                  <div className="bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="h-5 w-5 text-white" />
                  </div>
                </div>
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Image ${index + 1} from ${blog.title}`}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-border/40">
        <Button onClick={() => window.history.back()} variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all posts
        </Button>
      </div>
      {lightboxOpen && blog && blog.images && (
        <ImageLightbox
          images={blog.images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
      <BlogForm
        blog={blog}
        isOpen={showEditForm}
        onClose={() => setShowEditForm(false)}
        onSave={handleUpdateBlog}
        mode={{
          type: "edit",
          blogId: blog.id,
        }}
      />

      <DeleteConfirmation
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={() => {
          handleDeleteBlog(blog.id);
          setShowDeleteDialog(false);
        }}
        title={blog.title}
      />
      <ShareBlog
        isOpen={showShareDialog}
        onClose={() => setShowShareDialog(false)}
        title={blog.title}
        id={blog.id}
      />
    </div>
  );
}

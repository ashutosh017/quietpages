"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { X, Upload, Plus } from "lucide-react";
import Image from "next/image";
import { Blog, BlogFormProps, SelectedImage } from "@/types";
import axios from "axios";
import { deleteImageFromCloudinary } from "@/actions";
import { useUser } from "@clerk/nextjs";

const cloudinaryPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;


export function BlogForm({
  blog,
  isOpen,
  onClose,
  onSave,
  mode,
}: BlogFormProps) {
  const [formData, setFormData] = useState({
    title: blog?.title || "",
    content: blog?.content || "",
  });
  const {user} = useUser()

  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>(
    blog?.images?.map((url, index) => ({
      assetId:'',
      publicId:'',
      url:''
    })) || []
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const images =
      selectedImages.length > 0 ? selectedImages.map((img) => img.url) : [];

    onSave({
      userId: user?.id!,
      title: formData.title,
      content: formData.content,
      author: user?.fullName ?? "anonymous", 
      images,
    },mode);

    setFormData({ title: "", content: "" });
    setSelectedImages([]);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!cloudinaryPreset || !cloudinaryCloudName) {
      return;
    }
    const files = Array.from(e.target.files || []);

    files.forEach(async (file) => {
      const imageFormData = new FormData();
      imageFormData.append("file", file);

      imageFormData.append("upload_preset", cloudinaryPreset);
      imageFormData.append("cloud_name", cloudinaryCloudName);

      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        imageFormData
      );
      const imageUrl = cloudinaryRes.data.secure_url;
      const assetId = cloudinaryRes.data.asset_id;
      const publicId= cloudinaryRes.data.public_id;
      const newImage: SelectedImage = {
        assetId: assetId,
        publicId:publicId,
        url: imageUrl,
        file,
      };

      setSelectedImages((prev) => [...prev, newImage]);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (assetId: string) => {
    const publicId = selectedImages.find((img) => img.assetId === assetId)?.publicId;
    if (!publicId) return;

     deleteImageFromCloudinary(publicId,assetId);

    setSelectedImages((prev) => prev.filter((img) => img.assetId !== assetId));
  };

  const handleAddMoreImages = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog  open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-3xl max-h-[90vh] bg-white dark:bg-black/70 backdrop-blur-xl overflow-y-auto  ">
        <DialogHeader>
          <DialogTitle>
            {mode.type === "create" ? "Create New Blog" : "Edit Blog"}
          </DialogTitle>
        </DialogHeader>


        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter blog title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleChange("content", e.target.value)}
              placeholder="Write your blog content here..."
              className="min-h-[200px]"
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Images</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddMoreImages}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Images
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageSelect}
              className="hidden"
            />

            {selectedImages.length === 0 ? (
              <div
                onClick={handleAddMoreImages}
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
              >
                <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-2">
                  Click to select images
                </p>
                <p className="text-sm text-muted-foreground">
                  You can select multiple images at once
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {selectedImages.map((image) => (
                    <div key={image.assetId} className="relative group">
                      <div className="relative overflow-hidden rounded-lg border border-border bg-muted">
                        <Image
                          src={image.url || "/placeholder.svg"}
                          alt="Selected image"
                          width={300}
                          height={200}
                          className="w-full h-32 object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(image.assetId)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      {image.file && (
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                          {image.file.name}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddMoreImages}
                  className="w-full gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add More Images
                </Button>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {mode.type === "create" ? "Create Blog" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

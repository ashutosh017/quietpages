"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
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
import { BlogFormProps, SelectedImage } from "@/types";
import axios from "axios";
import {
  deleteImageFromCloudinary,
  generateBlogTitle,
  guessTheNextWord,
} from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { useDebounce } from "@/hooks/UseDebounce";
import { cloudinaryCloudName, cloudinaryPreset } from "@/config";

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
  const [nextSuggestedContentWord, setNextSuggestedContentWord] = useState("");
  const [aiIsThinkingTitle, setAiIsThinkingTitle] = useState(false);
  const [aiIsThinkingContent, setAiIsThinkingContent] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [inFocus, setInFocus] = useState("");
  const debouncedValue = useDebounce(formData.title, 1000);
  const debouncedContentValue = useDebounce(formData.content, 1000);
  const isPending = useRef(false);
  const isPendingForContent = useRef(false);
  const nextToExecuteRef = useRef("");
  const nextToExecuteRefForContent = useRef("");
  const lastResolvedValue = useRef("");
  const lastResolvedValueForContent = useRef("");
  const lastExecutedValue = useRef("");
  const lastExecutedValueForContent = useRef("");
  useEffect(() => {
    if (!debouncedContentValue) return;
    nextToExecuteRefForContent.current = debouncedContentValue;
    if (
      isPendingForContent.current ||
      lastExecutedValueForContent.current === nextToExecuteRefForContent.current
    )
      return;
    (async () => {
      try {
        setAiIsThinkingContent(true);
        isPendingForContent.current = true;
        lastExecutedValueForContent.current =
          nextToExecuteRefForContent.current;
        const res = await guessTheNextWord(debouncedContentValue);
        setAiIsThinkingContent(false);
        lastResolvedValueForContent.current = res;
        if (debouncedContentValue === lastExecutedValueForContent.current)
          setNextSuggestedContentWord(res);
      } catch (error) {
        console.log(error);
      } finally {
        isPendingForContent.current = false;
      }
    })();
  }, [debouncedContentValue]);
  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSuggestion("");
      return;
    }
    nextToExecuteRef.current = debouncedValue;
    if (
      isPending.current ||
      lastExecutedValue.current === nextToExecuteRef.current
    )
      return;
    (async () => {
      try {
        setAiIsThinkingTitle(true);
        isPending.current = true;
        lastExecutedValue.current = nextToExecuteRef.current;
        const result = await generateBlogTitle(nextToExecuteRef.current);
        lastResolvedValue.current = result;
        if (debouncedValue === lastExecutedValue.current)
          setSuggestion(result || "");
      } catch (err) {
        console.log(err);
      } finally {
        isPending.current = false;
        setAiIsThinkingTitle(false);
      }
    })();
  }, [debouncedValue, lastResolvedValue.current]);

  const { user } = useUser();
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Tab" && (suggestion || nextSuggestedContentWord)) {
      e.preventDefault();
      if (suggestion && inFocus === "input") {
        setFormData((prev) => ({
          ...prev,
          title: suggestion,
        }));
        setSuggestion("");
      }
      if (nextSuggestedContentWord && inFocus === "textarea") {
        setFormData((prev) => ({
          ...prev,
          content: formData.content + nextSuggestedContentWord,
        }));
        setNextSuggestedContentWord("");
      }
    }
  };

  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>(
    blog?.images?.map((url, index) => ({
      assetId: "",
      publicId: "",
      url: "",
    })) || []
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const images =
      selectedImages.length > 0 ? selectedImages.map((img) => img.url) : [];

    onSave(
      {
        userId: user?.id!,
        title: formData.title,
        content: formData.content,
        author: user?.fullName ?? "anonymous",
        images,
      },
      mode
    );

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

      imageFormData.append("upload_preset", cloudinaryPreset!);
      imageFormData.append("cloud_name", cloudinaryCloudName!);

      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        imageFormData
      );
      const imageUrl = cloudinaryRes.data.secure_url;
      const assetId = cloudinaryRes.data.asset_id;
      const publicId = cloudinaryRes.data.public_id;
      const newImage: SelectedImage = {
        assetId: assetId,
        publicId: publicId,
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
    const publicId = selectedImages.find(
      (img) => img.assetId === assetId
    )?.publicId;
    if (!publicId) return;

    deleteImageFromCloudinary(publicId, assetId);

    setSelectedImages((prev) => prev.filter((img) => img.assetId !== assetId));
  };

  const handleAddMoreImages = () => {
    fileInputRef.current?.click();
  };
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-3xl max-h-[90vh] bg-white dark:bg-black/70 backdrop-blur-xl overflow-y-auto  ">
        <DialogHeader>
          <DialogTitle>
            {mode.type === "create" ? "Create New Blog" : "Edit Blog"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="title">Title</Label>
              {aiIsThinkingTitle && (
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-muted-foreground">
                  <span>AI is thinking</span>
                  <div className="flex gap-1 text-primary text-xs font-bold items-center">
                    <span className="animate-[glow-dot_1.4s_infinite_0s]">
                      •
                    </span>
                    <span className="animate-[glow-dot_1.4s_infinite_0.2s]">
                      •
                    </span>
                    <span className="animate-[glow-dot_1.4s_infinite_0.4s]">
                      •
                    </span>
                  </div>
                </div>
              )}
              {!aiIsThinkingTitle && suggestion && (
                <div>
                <p className="hidden lg:block text-gray-400 italic text-sm">
                  Press &apos;Tab&apos; to accept the suggestion.
                </p>
                <p className=" lg:hidden text-gray-400 italic text-sm">
                     Tap suggestion to accept.
                </p>
                </div>
              )}
            </div>

            <Input
              id="title"
              value={formData.title}
              onFocus={() => setInFocus("input")}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter blog title"
              required
              onKeyDown={handleKeyDown}
              autoComplete="off"
              className="px-3 py-2 "
            />
            <div
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  title: suggestion,
                }));
                setSuggestion("");
              }}
              className="relative inset-0 text-muted-foreground  w-full h-full px-3 py-2 font-medium "
            >
              {suggestion && (
                <span className="text-gray-400   lg:text-sm">{suggestion}</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="content">Content</Label>
              {aiIsThinkingContent && (
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-muted-foreground">
                  <span>AI is thinking</span>
                  <div className="flex gap-1 text-primary text-xs font-bold items-center">
                    <span className="animate-[glow-dot_1.4s_infinite_0s]">
                      •
                    </span>
                    <span className="animate-[glow-dot_1.4s_infinite_0.2s]">
                      •
                    </span>
                    <span className="animate-[glow-dot_1.4s_infinite_0.4s]">
                      •
                    </span>
                  </div>
                </div>
              )}
              {!aiIsThinkingContent && nextSuggestedContentWord && (
                <div>
                  <p className="hidden lg:block text-gray-400 italic text-sm">
                    Press &apos;Tab&apos; to accept the suggestion.
                  </p>
                  <div className="flex gap-1 lg:hidden ">
                    <p className="text-sm text-gray-400 italic">AI Suggestion: </p>
                    <button
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          content: formData.content + nextSuggestedContentWord,
                        }));
                        setNextSuggestedContentWord("");
                      }}
                      className="text-sm px-2 py-0 "
                    >
                      Accept
                    </button>
                    <button
                    onClick={() => {
                        setNextSuggestedContentWord("");
                      }}
                      className="text-sm px-2 py-0 "
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <Textarea
                onFocus={() => setInFocus("textarea")}
                id="content"
                value={formData.content}
                onChange={(e) => handleChange("content", e.target.value)}
                placeholder="Write your blog content here..."
                className="w-full min-h-[200px] px-3 py-2 text-base leading-[1.5] box-border bg-transparent relative z-10"
                onKeyDown={handleKeyDown}
                required
              />

              <div
                ref={containerRef}
                className="absolute inset-0 w-full min-h-[200px]  md:text-sm leading-[1.5] box-border pointer-events-none z-0 whitespace-pre-wrap break-words text-gray-400"
                aria-hidden="true"
              >
                <div className="px-3 py-2">
                  <span className="invisible">{formData.content + " "}</span>
                  <span className="">{nextSuggestedContentWord}</span>
                </div>
              </div>
            </div>
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

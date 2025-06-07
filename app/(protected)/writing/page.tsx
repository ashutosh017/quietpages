"use client";

import { Button } from "@/components/ui/button";
import { useId, useState } from "react";

export default function Page() {
  const titleId = useId();
  const contentId = useId();
  const mediaUploadId = useId();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("Blog Title");
    const content = formData.get("Blog Content");
    const media = formData.getAll("Media Upload");
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Media:", media);
    
  };
  const [fileCount, setFileCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFileCount(files.length);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border p-4 h-screen lg:p-32 w-screen  justify-center "
      >
        <label htmlFor={titleId} className="LabelStyle">
          Blog Title
        </label>
        <input
          name="Blog Title"
          type="text"
          id={titleId}
          className="border text-lg px-4 py-2 font-semibold"
        />
        <label htmlFor={contentId} className="LabelStyle">
          Blog Content
        </label>
        <textarea
          id={contentId}
          name="Blog Content"
          className="border h-40 text-lg font-semibold px-4 py-2"
        />
      <div className="flex items-center">  <Button
          asChild
          variant="link"
          className="hover:no-underline text-blue-400 font-bold text-lg "
        >
          <label htmlFor={mediaUploadId} className="cursor-pointer">
            + Add Media
            <input
              name="Media Upload"
              id={mediaUploadId}
              type="file"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="sr-only"
            />
          </label>
        </Button>
        {fileCount > 0 && (
        <p className="text-sm text-gray-500">{fileCount} file{fileCount > 1 ? 's' : ''} selected</p>
      )}
      </div>
        <Button
          variant="secondary"
          className=" text-lg font-semibold"
          type="submit"
        >
          Publish
        </Button>
      </form>
    </div>
  );
}

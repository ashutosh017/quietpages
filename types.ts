export type CreateBlogBodyType = {
  title: string;
  content: string;
  images: string[];
  userId: string;
};

export interface Blog {
  id:string;
  title: string;
  content: string;
  images: string[];
  userId: string;
  author:string;
  dateCreated:string
}

export interface Mode{
    type: "create" | "edit",
    blogId: string | null
  }
export interface BlogFormProps {
  blog?: Blog;
  isOpen: boolean;
  onClose: () => void;
  onSave: (blog: Omit<Blog, "id" | "dateCreated">,mode:Mode) => void;
  mode: Mode
}

export interface SelectedImage {
  assetId:string,
  publicId:string,
  url: string;
  file?: File;
}
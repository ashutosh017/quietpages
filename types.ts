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
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  CalendarDays,
  ImageIcon,
  Plus,
  Search,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { BlogForm } from "@/components/blog-form";
import { handleCreateBlog } from "@/actions";
import AuthRequiredPopUp from "@/components/auth-required-popup";
import { useMemo, useState } from "react";
import { Blog } from "@/lib/generated/prisma";
import { EmptyState } from "./empty-state";
import { Input } from "./ui/input";
import { SearchInput } from "./search";
import { SearchEmptyState } from "./search-empty-state";

function truncateContent(content: string, wordLimit = 20): string {
  const words = content.split(" ");
  if (words.length <= wordLimit) return content;
  return words.slice(0, wordLimit).join(" ") + "...";
}

export default function BlogsPage({ blogs }: { blogs: Blog[] }) {
  const { isSignedIn } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAuthRequiredPopup, setShowAuthRequiredPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (blogs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center border border-border/40 rounded-lg mb-8">
        <EmptyState
          title="No blog posts yet"
          description="Create your first blog post to get started. Your blog posts will appear here."
          actionLabel="Create Your First Blog"
          onAction={() => {
            isSignedIn
              ? setShowCreateForm(true)
              : setShowAuthRequiredPopup(true);
          }}
        />
        <BlogForm
          isOpen={showCreateForm}
          onClose={() => setShowCreateForm(false)}
          onSave={handleCreateBlog}
          mode={{
            type: "create",
            blogId: null,
          }}
        />
      </div>
    );
  }
  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) return blogs;

    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [blogs, searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
  };
  const isSearching = searchQuery.trim().length > 0;
  const hasSearchResults = filteredBlogs.length > 0;
  const showEmptyState = !loading && blogs.length === 0 && !isSearching;
  const showSearchEmptyState = !loading && isSearching && !hasSearchResults;
  const showResults =
    !loading && (hasSearchResults || (!isSearching && blogs.length > 0));

  return (
    <div className="container min-h-screen mx-auto px-4 py-18 lg:py-24 max-w-3xl">
      <div className="mb-6 flex w-full items-center justify-between mx-auto">
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
        <Button
          className=""
          onClick={() => {
            isSignedIn
              ? setShowCreateForm(true)
              : setShowAuthRequiredPopup(true);
          }}
          asChild
          variant={"outline"}
        >
          <div className="primary-btn-style py-8 flex items-center gap-2 ">
            <Plus /> Create One
          </div>
        </Button>
      </div>
      <div className="flex w-full items-center gap-4 mb-4">
        {!loading && blogs.length > 0 && (
          <div className="mb-8 w-full">
            <SearchInput onSearch={handleSearch} className="w-full" />
            {isSearching && (
              <div className="mt-3 text-sm text-muted-foreground">
                {filteredBlogs.length} result
                {filteredBlogs.length !== 1 ? "s" : ""} for "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </div>
      {showEmptyState ? (
        <div className="border border-border/40 rounded-lg mb-8">
          <EmptyState
            title="No blog posts yet"
            description="Create your first blog post to get started. Your blog posts will appear here."
            actionLabel="Create Your First Blog"
            onAction={() => setShowCreateForm(true)}
          />
        </div>
      ) : showSearchEmptyState ? (
        <SearchEmptyState query={searchQuery} onClearSearch={clearSearch} />
      ) : showResults ? (
        <div className="space-y-6">
          {filteredBlogs.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.id}`}>
              <Card className="group border border-border/40 hover:border-border hover:shadow-sm transition-all duration-200 cursor-pointer bg-card/50 hover:bg-card mb-4">
                <CardHeader className="">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl font-medium leading-relaxed group-hover:text-primary transition-colors flex-1 pr-4">
                      {blog.title}
                    </CardTitle>
                    {blog.images && blog.images.length > 0 && (
                      <div className="flex items-center gap-1 text-muted-foreground shrink-0">
                        <ImageIcon className="w-4 h-4" />
                        <span className="text-sm">{blog.images.length}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground leading-relaxed mb-4 text-[15px]">
                    {truncateContent(blog.content)}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        <span className="font-medium">{blog.author}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {new Date(blog.dateCreated).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Read more →
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : null}
      {/* <div className="flex space-y-4 flex-col">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.id}`}>
            <Card className="group border border-border/40 hover:border-border hover:shadow-sm transition-all duration-200 cursor-pointer bg-card/50 hover:bg-card">
              <CardHeader className="">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl font-medium leading-relaxed group-hover:text-primary transition-colors flex-1 pr-4">
                    {blog.title}
                  </CardTitle>
                  {blog.images && blog.images.length > 0 && (
                    <div className="flex items-center gap-1 text-muted-foreground shrink-0">
                      <ImageIcon className="w-4 h-4" />
                      <span className="text-sm">{blog.images.length}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground leading-relaxed mb-4 text-[15px]">
                  {truncateContent(blog.content)}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span className="font-medium">{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {new Date(blog.dateCreated).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more →
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        <BlogForm
          isOpen={showCreateForm}
          onClose={() => setShowCreateForm(false)}
          onSave={handleCreateBlog}
          mode={{
            type: "create",
            blogId: null,
          }}
        />

        <AuthRequiredPopUp
          isOpen={showAuthRequiredPopup}
          onClose={() => setShowAuthRequiredPopup(false)}
        />
      </div>*/}
    </div>
  );
}

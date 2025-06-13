import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"

export function BlogCardSkeleton() {
  return (
    <Card className="border border-border/40 bg-card/50">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-5 w-12" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-24" />
          </div>
          <Skeleton className="h-5 w-20" />
        </div>
      </CardContent>
    </Card>
  )
}

export function BlogListSkeleton() {
  return (
    <div className="space-y-6">
        <Button asChild variant={"ghost"}><Skeleton className="text-transparent"><Plus/> Create One</Skeleton></Button>
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
    </div>
  )
}

export function BlogPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8">
        <Skeleton className="h-9 w-20 mb-8" />
        <Skeleton className="h-8 w-3/4 mb-6" />
        <div className="flex items-center gap-4 mb-8">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>

      <div className="space-y-4 mb-12">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
      </div>

      <div className="mt-12 pt-8 border-t border-border/40">
        <Skeleton className="h-6 w-48 mb-6" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-lg" />
            ))}
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-border/40">
        <Skeleton className="h-9 w-32" />
      </div>
    </div>
  )
}

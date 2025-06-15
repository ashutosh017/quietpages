"use client"

import { Button } from "@/components/ui/button"
import { SearchX } from "lucide-react"

interface SearchEmptyStateProps {
  query: string
  onClearSearch: () => void
}

export function SearchEmptyState({ query, onClearSearch }: SearchEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-border/40 rounded-lg">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
        <SearchX className="w-8 h-8 text-muted-foreground" />
      </div>

      <h3 className="text-xl font-medium mb-3">No results found</h3>
      <p className="text-muted-foreground max-w-md mb-8">
        No blog posts match your search for <span className="font-medium">"{query}"</span>. Try different keywords or
        browse all posts.
      </p>

      <Button onClick={onClearSearch} variant="outline">
        Clear Search
      </Button>
    </div>
  )
}

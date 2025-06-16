"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

interface SearchProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
  query:string
  setQuery:(query:string)=>void
}

export function SearchInput({ onSearch, query,setQuery,placeholder = "Search blogs...", className }: SearchProps) {
  // const [query, setQuery] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query, onSearch])

  const clearSearch = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 pr-10"
      />
      {query && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearSearch}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
}

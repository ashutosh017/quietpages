"use client"
import { Button } from "@/components/ui/button"
import { FileText, Plus } from "lucide-react"

interface EmptyStateProps {
  title: string
  description: string
  actionLabel: string
  onAction: () => void
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
        <FileText className="w-8 h-8 text-muted-foreground" />
      </div>

      <h3 className="text-xl font-medium mb-3">{title}</h3>
      <p className="text-muted-foreground max-w-md mb-8">{description}</p>

      <Button onClick={onAction} className="gap-2">
        <Plus className="w-4 h-4" />
        {actionLabel}
      </Button>
    </div>
  )
}

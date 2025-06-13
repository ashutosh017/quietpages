import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background z-20 ">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 fill-red-500 text-red-500 animate-pulse" />
            <span>by Ashutosh</span>
          </div>

          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} QuietPages. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

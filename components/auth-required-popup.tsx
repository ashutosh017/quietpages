import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
interface AuthRequiredPopUpProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function AuthRequiredPopUp({
  isOpen,
  onClose,
}: AuthRequiredPopUpProps) {
  const router = useRouter();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        aria-description="blog-form"
        aria-describedby="blog-form"
        className="sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="text-red-600">Sign In Required</DialogTitle>
          <DialogDescription>
            You need to be signed in to create a blog.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onClose();
              router.push("/sign-in");
            }}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Go to Sign In
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

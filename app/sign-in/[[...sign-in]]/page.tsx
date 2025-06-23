"use client";
import { Button } from "@/components/ui/button";
import { SignIn } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "next-themes";

export default function Page() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex items-center py-24 flex-col min-h-screen w-screen">
      <div className="flex items-start justify-between mb-8 max-w-4xl  w-full mx-auto px-8  ">
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
      </div>
      <SignIn
        appearance={{ baseTheme: resolvedTheme === "dark" ? dark : undefined }}
      />
    </div>
  );
}

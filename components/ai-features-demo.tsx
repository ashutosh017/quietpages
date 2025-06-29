"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Brain, BrainIcon } from "lucide-react";

interface AnimationStep {
  step: number;
  title: string;
  content: string;
  showTitleThinking: boolean;
  showContentThinking: boolean;
  titleSuggestion: string;
  contentSuggestion: string;
  showTitleAccept: boolean;
  showContentAccept: boolean;
}

const initialState: AnimationStep = {
  step: 0,
  title: "",
  content: "",
  showTitleThinking: false,
  showContentThinking: false,
  titleSuggestion: "",
  contentSuggestion: "",
  showTitleAccept: false,
  showContentAccept: false,
};

export function AIFeaturesDemo() {
  const [state, setState] = useState<AnimationStep>(initialState);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const runAnimation = async () => {
      // Reset state
      setState(initialState);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Step 1: User types title
      setState((prev) => ({ ...prev, step: 1 }));
      const titleText = "what are transformers?";
      for (let i = 0; i <= titleText.length; i++) {
        setState((prev) => ({ ...prev, title: titleText.slice(0, i) }));
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Step 2: Show "AI is thinking" for title
      setState((prev) => ({ ...prev, step: 2, showTitleThinking: true }));
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Step 3: Show title suggestion
      setState((prev) => ({
        ...prev,
        step: 3,
        titleSuggestion: "What are transformers in machine learning?",
        showTitleAccept: true,
        showTitleThinking: false,
      }));
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Step 4: Accept title suggestion
      setState((prev) => ({
        ...prev,
        step: 4,
        title: "What are transformers in machine learning?",
        titleSuggestion: "",
        showTitleAccept: false,
      }));
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Step 5: User types content
      setState((prev) => ({ ...prev, step: 5 }));
      const contentText = "Transformers are";
      for (let i = 0; i <= contentText.length; i++) {
        setState((prev) => ({ ...prev, content: contentText.slice(0, i) }));
        await new Promise((resolve) => setTimeout(resolve, 120));
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      // Step 6: Show "AI is thinking" for content
      setState((prev) => ({ ...prev, step: 6, showContentThinking: true }));
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Step 7: Show content suggestion
      setState((prev) => ({
        ...prev,
        step: 7,
        contentSuggestion: "a type of neural network",
        showContentAccept: true,
        showContentThinking: false,
      }));
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Step 8: Accept content suggestion
      setState((prev) => ({
        ...prev,
        step: 8,
        content: "Transformers are a type of neural network",
        contentSuggestion: "",
        showContentAccept: false,
      }));
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Restart animation
      if (isPlaying) {
        runAnimation();
      }
    };

    runAnimation();
  }, [isPlaying]);

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="  gap-12 lg:px-36 px-4 py-4  flex lg:justify-between flex-col lg:flex-row">
      {/* Left side - Features description */}
      <div className="">
        <div>
          <div className="flex gap-2 bg-neutral-200  dark:bg-neutral-900 text-sm mb-2 px-2 py-1 rounded-full  items-center w-fit ">
            <BrainIcon className="w-4 h-4" />
            AI-Powered Writing
          </div>
          <h3 className="text-2xl font-bold mb-4">Smart Writing Assistant</h3>
          <p className="text-muted-foreground mb-6">
            Our AI helps you write better content with intelligent suggestions
            and real-time assistance.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Smart Title Suggestions</h4>
              <p className="text-sm text-muted-foreground">
                Get AI-powered title suggestions that are more engaging and
                SEO-friendly. Just start typing and watch the magic happen.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Inline Content Assistance</h4>
              <p className="text-sm text-muted-foreground">
                Get real-time writing suggestions as you type. Our AI predicts
                the next words and phrases to help you write faster and better.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Animated demo */}
      <div className="relative  h-fit">
        <div className="bg-white dark:bg-black/40 max-w-lg lg:w-lg backdrop-blur-xl border dark:border-neutral-300 rounded-lg p-6 shadow-lg">
          <div className="space-y-6">
            {/* Title section */}
            <div className="space-y-2 relative">
              <Label htmlFor="demo-title">Title</Label>
              {state.showTitleThinking && (
                <div className="absolute -top-1 right-0">
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-muted-foreground">
                    <span>AI is thinking</span>
                    <div className="flex gap-1 text-primary text-xs font-bold items-center">
                      <span className="animate-[glow-dot_1.4s_infinite_0s]">
                        •
                      </span>
                      <span className="animate-[glow-dot_1.4s_infinite_0.2s]">
                        •
                      </span>
                      <span className="animate-[glow-dot_1.4s_infinite_0.4s]">
                        •
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {state.showTitleAccept && (
                <div className="absolute -top-1 right-0">
                  <div>
                    <p className="hidden lg:block text-gray-400 italic text-sm">
                      Press &apos;Tab&apos; to accept the suggestion.
                    </p>
                    <p className=" lg:hidden text-gray-400 italic text-sm">
                      Tap suggestion to accept.
                    </p>
                  </div>
                </div>
              )}
              <Input
                id="demo-title"
                value={state.title}
                placeholder="Enter blog title"
                className="transition-all duration-300"
                readOnly
              />
              {state.titleSuggestion && (
                <div className=" animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-2 text-sm ml-2 mt-2">
                    <span>{state.titleSuggestion}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Content section */}
            <div className="space-y-2 relative">
              <Label htmlFor="demo-content">Content</Label>
              {state.showContentThinking && (
                <div className="absolute -top-1 right-0">
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-muted-foreground">
                    <span>AI is thinking</span>
                    <div className="flex gap-1 text-primary text-xs font-bold items-center">
                      <span className="animate-[glow-dot_1.4s_infinite_0s]">
                        •
                      </span>
                      <span className="animate-[glow-dot_1.4s_infinite_0.2s]">
                        •
                      </span>
                      <span className="animate-[glow-dot_1.4s_infinite_0.4s]">
                        •
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {state.showContentAccept && (
                <div className="absolute -top-1 right-0">
                  <div>
                    <p className="hidden lg:block text-gray-400 italic text-sm">
                      Press &apos;Tab&apos; to accept the suggestion.
                    </p>
                    <p className=" lg:hidden text-gray-400 italic text-sm">
                      Tap suggestion to accept.
                    </p>
                  </div>
                </div>
              )}
              <div className="relative">
                <Textarea
                  id="demo-content"
                  value={state.content}
                  placeholder="Write your blog content here..."
                  className="min-h-[120px] transition-all duration-300"
                  readOnly
                />
                {state.contentSuggestion && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="pt-2 lg:pt-1 px-3 lg:px-0">
                      <span className="invisible">{state.content}</span>
                      <span className="bg-transparent dark:text-gray-400 text-gray-700 pl-2 lg:pl-1 lg:text-sm rounded animate-in fade-in duration-300">
                        {state.contentSuggestion}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-pulse" />
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary/30 rounded-full animate-pulse delay-1000" />
      </div>
    </div>
  );
}

import { Lightbulb, PenTool, Sparkles, Wand2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import Image from "next/image";

const AIFeaturesShowcase = () => {
  const [currentDemo, setCurrentDemo] = useState<"titles" | "writing">(
    "titles"
  );
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);
  const [writingText, setWritingText] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const features = [
    {
      id: "titles",
      icon: Lightbulb,
      title: "Smart Title Suggestions",
      description:
        "AI-powered algorithms analyze your content and suggest compelling, SEO-optimized titles that capture readers' attention and improve engagement.",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      id: "writing",
      icon: PenTool,
      title: "Inline Writing Assistant",
      description:
        "Get real-time suggestions while you write. Our AI helps improve clarity, tone, and style, making your content more engaging and professional.",
      gradient: "from-blue-400 to-purple-500",
    },
  ];

  // Mock title suggestions
  const mockTitleSuggestions = [
    "10 Revolutionary AI Tools That Will Transform Your Workflow",
    "The Future of Content Creation: How AI is Changing Everything",
    "Unlock Your Creative Potential with These AI Writing Tools",
  ];

  // Mock writing suggestions
  const mockWritingSuggestions = [
    "Consider using 'revolutionary' instead of 'good'",
    "Add a transition sentence here",
    "This sentence could be more concise",
  ];

  useEffect(() => {
    if (currentDemo === "titles") {
      // Simulate AI generating title suggestions
      const timer = setTimeout(() => {
        setTitleSuggestions(mockTitleSuggestions);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentDemo]);

  const handleWritingDemo = (text: string) => {
    setWritingText(text);
    if (text.length > 20) {
      setSuggestions(mockWritingSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <section className="min-h-screen bg-transparent flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Features Section */}
          <div>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <span className="text-lg font-semibold">
                  AI-Powered Features
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Write Smarter, Not Harder
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Experience the power of AI with our two core features designed
                to enhance your writing process.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature) => (
                <Card
                  key={feature.id}
                  className={`group cursor-pointer transition-all duration-300 border-2 dark:bg-neutral-800 ${
                    currentDemo === feature.id
                      ? "border-blue-500 shadow-lg bg-neutral-50/50 dark:bg-neutral-900/20 dark:border-neutral-400"
                      : "border-transparent hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-md dark:hover:bg-neutral-700/50"
                  }`}
                  onClick={() =>
                    setCurrentDemo(feature.id as "titles" | "writing")
                  }
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center flex-shrink-0`}
                      >
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Demo Section */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-8 border dark:border-neutral-700">
            <Image alt="demo" src="/demo-dark.png" width={700} height={700} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIFeaturesShowcase;

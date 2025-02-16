import { Button } from "@/components/ui/button";
import SignupForm from "./SignupForm";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Trigger the fade-in effect after the component mounts
      setVisible(true);
      containerRef.current.style.opacity = "0";
      containerRef.current.style.transform = "translateY(-20px)"; // start from above
      setTimeout(() => {
        containerRef.current.style.opacity = "1";
        containerRef.current.style.transform = "translateY(0)";
        containerRef.current.style.transition = "opacity 0.5s ease-in-out, transform 0.5s ease-in-out";
      }, 100); // slight delay before the animation starts
    }
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="hero-gradient absolute inset-0 opacity-10" />
      <div
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20"
        ref={containerRef}
      >
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Turn Any Idea Into An Online Business
            <span className="block text-primary text-glow">Powered by AI</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-10">
            From ideation to launch, FlowForge helps entrepreneurs build successful online businesses with AI-driven guidance, no-code tools, and smart collaboration features.
          </p>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}

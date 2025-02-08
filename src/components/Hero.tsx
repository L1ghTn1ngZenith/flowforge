
import { Button } from "@/components/ui/button";
import SignupForm from "./SignupForm";

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="hero-gradient absolute inset-0 opacity-10" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-normal">
            Turn Any Idea into an Online Business
            <span className="block text-primary">Powered by AI</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-10">
            From ideation to launch, Serene helps entrepreneurs build successful online businesses with AI-driven guidance, no-code tools, and smart collaboration features.
          </p>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}

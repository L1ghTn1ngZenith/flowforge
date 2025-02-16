import { Lightbulb, Blocks, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "AI-Driven Ideation",
    description: "Validate your ideas and generate detailed roadmaps with our advanced AI technology.",
    icon: Lightbulb
  },
  {
    title: "No-Code Builder",
    description: "Create professional websites, apps, and stores with intuitive drag-and-drop tools.",
    icon: Blocks
  },
  {
    title: "Smart Collaboration",
    description: "Manage your team and get AI coaching to keep your project on track.",
    icon: Users
  }
];

export default function Features() {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Initial setup for animation
      containerRef.current.style.opacity = "0";
      containerRef.current.style.transform = "translateY(-20px)"; // start from above

      setTimeout(() => {
        setVisible(true);
        containerRef.current.style.opacity = "1";
        containerRef.current.style.transform = "translateY(0)";
        containerRef.current.style.transition = "opacity 0.5s ease-in-out, transform 0.5s ease-in-out"; // apply a smooth transition
      }, 100); // slight delay before the animation starts
    }
  }, []);

  return (
    <div className="py-20 bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={containerRef} className={`text-center mb-16 transition-opacity duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground">
            Built for entrepreneurs who want to move fast and build something great.
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-opacity duration-500`}>
          {features.map((feature, index) => (
            <div key={index} className={`feature-card transition-opacity duration-500 ${visible ? 'opacity-100 translate-y-4' : 'opacity-0 translate-y-0'}`}>
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

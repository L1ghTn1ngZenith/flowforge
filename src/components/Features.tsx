import { Lightbulb, PuzzlePiece, Users } from "lucide-react";

const features = [
  {
    title: "AI-Driven Ideation",
    description: "Validate your ideas and generate detailed roadmaps with our advanced AI technology.",
    icon: Lightbulb
  },
  {
    title: "No-Code Builder",
    description: "Create professional websites, apps, and stores with intuitive drag-and-drop tools.",
    icon: PuzzlePiece
  },
  {
    title: "Smart Collaboration",
    description: "Manage your team and get AI coaching to keep your project on track.",
    icon: Users
  }
];

export default function Features() {
  return (
    <div className="py-20 bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground">
            Built for entrepreneurs who want to move fast and build something great.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
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
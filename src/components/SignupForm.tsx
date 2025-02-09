
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Your Zapier webhook URL should be stored securely - we'll hardcode it for now
  const ZAPIER_WEBHOOK_URL = "YOUR_ZAPIER_WEBHOOK_URL"; // You'll need to replace this

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log("Sending to Google Sheets:", { name, email });
      
      const response = await fetch(ZAPIER_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Required for Zapier webhooks
        body: JSON.stringify({
          name,
          email,
          timestamp: new Date().toISOString(),
        }),
      });

      toast({
        title: "Thanks for signing up!",
        description: "We'll keep you updated on our launch.",
      });
      
      setName("");
      setEmail("");
      
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <div>
        <Input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
        />
      </div>
      <div>
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing up..." : "Join the Waitlist"}
      </Button>
    </form>
  );
}

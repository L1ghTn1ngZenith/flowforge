
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzjijOe98uhqiu8_puregxLov6KNusfYEhqHApYIgfVv_L4BjHOqs_YuRTm4mXI-FVJQA/exec";

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidEmail(email)) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address.",
      });
      return;
    }

    setLoading(true);
    
    try {
      console.log("Signup attempt:", { name, email });

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({ name, email }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to submit form");

      toast({
        title: "Thanks for signing up!",
        description: "We'll keep you updated on our launch.",
      });

      setName("");
      setEmail("");

      console.log("Signup successful:", { name, email });
      
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

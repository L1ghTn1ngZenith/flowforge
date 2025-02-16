import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useRef } from "react";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const formRef = useRef(null);

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyUD_TgE2Si4wGmKvmMHrWXJoaReI6tyVoV5vCUhTNSaN0xZP9wizT4bv6qTFx1q25tqQ/exec";

  // Function to check if the email is valid
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
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
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

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

  useEffect(() => {
    if (formRef.current) {
      formRef.current.style.opacity = "0";
      formRef.current.style.transition = "opacity 0.5s ease-in-out, transform 0.5s ease-in-out";
      formRef.current.style.transform = "translateY(-20px)";
      setTimeout(() => {
        formRef.current.style.opacity = "1";
        formRef.current.style.transform = "translateY(0px)";
      }, 100);
    }
  }, []);

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
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

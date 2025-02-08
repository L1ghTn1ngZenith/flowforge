
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(
  'https://xfbqegqjdsgsfwlttkch.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmYnFlZ3FqZHNnc2Z3bHR0a2NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAwOTgxMzQsImV4cCI6MjAyNTY3NDEzNH0.3FmxzP9uUgM43pPGy8y0sLNhH2Ffbv_RekuxQN1uoew'
);

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Attempting to insert:', { email, name });
      
      // Insert the waitlist entry into Supabase
      const { error } = await supabase
        .from('waitlist')
        .insert([
          { 
            email,
            name: name || null // If name is empty string, store as null
          }
        ]);
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Success! Entry added to waitlist');
      
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

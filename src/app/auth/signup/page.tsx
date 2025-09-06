"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!supabase) {
      setError("Supabase client not initialized. Please refresh the page.");
      setLoading(false);
      return;
    }

    try {
      console.log('Attempting to sign up with:', { email, password: '***' });
      console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);

      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });

      console.log('Signup response:', { data, error });

      if (error) {
        console.error('Signup error:', error);
        setError(error.message);
      } else {
        console.log('Signup successful:', data);
        setSuccess("Check your email for verification link!");
        // Don't redirect immediately, let user see the success message
      }
    } catch (err) {
      console.error('Error signing up:', err);
      setError("Failed to sign up. Please check your internet connection and try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <form onSubmit={handleSignup} className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-2 text-center">Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="p-2 border rounded"
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <a href="/auth/login" className="text-blue-600 hover:underline text-center text-sm">Already have an account? Login</a>
      </form>
    </div>
  );
}

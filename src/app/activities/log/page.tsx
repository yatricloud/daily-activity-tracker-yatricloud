"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";

const categories = ["Study", "Work", "Health", "Personal", "Other"];

export default function LogActivityPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    router.replace("/auth/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { error } = await supabase.from("activities").insert({
        user_id: user.id,
        name,
        category,
        duration: Number(duration),
        date,
      });
      if (error) setError(error.message);
      else router.push("/");
    } catch (err) {
      console.error('Error saving activity:', err);
      setError("Failed to save activity");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-2 text-center">Log Activity</h2>
        <input
          type="text"
          placeholder="Activity Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={e => setDuration(e.target.value)}
          className="p-2 border rounded"
          min={1}
          required
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="p-2 border rounded"
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition" disabled={loading}>
          {loading ? "Saving..." : "Save Activity"}
        </button>
      </form>
    </div>
  );
}

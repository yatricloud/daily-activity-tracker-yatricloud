"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement);

interface Activity {
  id: string;
  name: string;
  category: string;
  duration: number;
  date: string;
}

export default function AnalysisPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      router.replace("/");
      return;
    }
    fetchActivities();
    // eslint-disable-next-line
  }, [user]);

  const fetchActivities = async () => {
    setLoading(true);
    setError("");

    if (!supabase) {
      setError("Supabase client not initialized. Please refresh the page.");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .eq("user_id", user?.id);
      if (error) setError(error.message);
      else setActivities(data || []);
    } catch (err) {
      console.error('Error fetching activities:', err);
      setError("Failed to fetch activities");
    }
    setLoading(false);
  };

  // Pie chart: total time per category
  const categoryTotals = activities.reduce((acc, a) => {
    acc[a.category] = (acc[a.category] || 0) + a.duration;
    return acc;
  }, {} as Record<string, number>);

  // Bar chart: weekly trend (last 7 days)
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    return d.toISOString().slice(0, 10);
  });
  const dailyTotals = last7Days.map(date =>
    activities.filter(a => a.date === date).reduce((sum, a) => sum + a.duration, 0)
  );

  // Most frequent activity
  const freqMap = activities.reduce((acc, a) => {
    acc[a.name] = (acc[a.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const mostFrequent = Object.entries(freqMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Analysis</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : activities.length === 0 ? (
        <div>No activities to analyze yet.</div>
      ) : (
        <div className="w-full max-w-2xl flex flex-col gap-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Total Time per Category</h3>
            <Pie
              data={{
                labels: Object.keys(categoryTotals),
                datasets: [
                  {
                    data: Object.values(categoryTotals),
                    backgroundColor: [
                      "#60a5fa",
                      "#fbbf24",
                      "#34d399",
                      "#a78bfa",
                      "#f87171",
                    ],
                  },
                ],
              }}
            />
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Weekly Activity Trend (minutes)</h3>
            <Bar
              data={{
                labels: last7Days,
                datasets: [
                  {
                    label: "Minutes",
                    data: dailyTotals,
                    backgroundColor: "#60a5fa",
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Most Frequent Activity</h3>
            <div className="text-lg">{mostFrequent}</div>
          </div>
        </div>
      )}
    </div>
  );
}

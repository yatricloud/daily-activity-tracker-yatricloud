"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";

interface Activity {
  id: string;
  name: string;
  category: string;
  duration: number;
  date: string;
  created_at: string;
}

export default function ActivitiesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Activity>>({});

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login");
      return;
    }
    fetchActivities();
    // eslint-disable-next-line
  }, [user]);

  const fetchActivities = async () => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .eq("user_id", user?.id)
      .order("date", { ascending: false });
    if (error) setError(error.message);
    else setActivities(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this activity?")) return;
    const { error } = await supabase.from("activities").delete().eq("id", id);
    if (error) setError(error.message);
    else {
      fetchActivities();
      router.push("/");
    }
  };

  const handleEdit = (activity: Activity) => {
    setEditId(activity.id);
    setEditData({ ...activity });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    if (!editId) return;
    const { error } = await supabase
      .from("activities")
      .update({
        name: editData.name,
        category: editData.category,
        duration: Number(editData.duration),
        date: editData.date,
      })
      .eq("id", editId);
    if (error) setError(error.message);
    else {
      setEditId(null);
      fetchActivities();
      router.push("/");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Your Activities</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : activities.length === 0 ? (
        <div>No activities logged yet.</div>
      ) : (
        <div className="overflow-x-auto w-full max-w-2xl">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
            <thead>
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Category</th>
                <th className="p-2">Duration</th>
                <th className="p-2">Date</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((a) => (
                <tr key={a.id} className="border-t">
                  {editId === a.id ? (
                    <>
                      <td className="p-2"><input name="name" value={editData.name as string} onChange={handleEditChange} className="p-1 border rounded w-full" /></td>
                      <td className="p-2">
                        <select name="category" value={editData.category as string} onChange={handleEditChange} className="p-1 border rounded w-full">
                          {["Study", "Work", "Health", "Personal", "Other"].map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-2"><input name="duration" type="number" value={editData.duration as number} onChange={handleEditChange} className="p-1 border rounded w-full" /></td>
                      <td className="p-2"><input name="date" type="date" value={editData.date as string} onChange={handleEditChange} className="p-1 border rounded w-full" /></td>
                      <td className="p-2 flex gap-2">
                        <button onClick={handleEditSave} className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-xs">Save</button>
                        <button onClick={() => setEditId(null)} className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500 text-xs">Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-2">{a.name}</td>
                      <td className="p-2">{a.category}</td>
                      <td className="p-2">{a.duration} min</td>
                      <td className="p-2">{a.date}</td>
                      <td className="p-2 flex gap-2">
                        <button onClick={() => handleEdit(a)} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-xs">Edit</button>
                        <button onClick={() => handleDelete(a.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs">Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

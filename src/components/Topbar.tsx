"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Topbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="w-full flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <Link href="/" className="font-bold text-lg text-blue-700 dark:text-blue-300">Activity Tracker</Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-gray-700 dark:text-gray-200 text-sm">{user.email}</span>
            <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm">Logout</button>
          </>
        ) : (
          <Link href="/auth/login" className="text-blue-600 hover:underline text-sm">Login</Link>
        )}
      </div>
    </nav>
  );
}

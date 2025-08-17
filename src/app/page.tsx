import Link from "next/link";
import CurrentYearFooter from "@/components/CurrentYearFooter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Daily Activity Tracker</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Log, view, and analyze your daily activities.</p>
      </header>
      <nav className="flex flex-col gap-4 w-full max-w-xs mb-8">
        <Link href="/auth/login" className="w-full py-2 px-4 rounded bg-blue-600 text-white text-center font-semibold hover:bg-blue-700 transition">Login / Sign Up</Link>
        <Link href="/activities/log" className="w-full py-2 px-4 rounded bg-green-600 text-white text-center font-semibold hover:bg-green-700 transition">Log Activity</Link>
        <Link href="/activities" className="w-full py-2 px-4 rounded bg-yellow-500 text-white text-center font-semibold hover:bg-yellow-600 transition">View Activities</Link>
        <Link href="/analysis" className="w-full py-2 px-4 rounded bg-purple-600 text-white text-center font-semibold hover:bg-purple-700 transition">Analysis</Link>
      </nav>
      <CurrentYearFooter />
    </div>
  );
}

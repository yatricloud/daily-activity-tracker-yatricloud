"use client";
export default function CurrentYearFooter() {
  return (
    <footer className="mt-auto text-gray-400 text-xs">&copy; {new Date().getFullYear()} Daily Activity Tracker</footer>
  );
}

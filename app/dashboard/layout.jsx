"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import DashboardSidebar from "./components/DashboardSidebar";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { user, rehydrated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!rehydrated) return;
    if (!user) router.push("/login");
  }, [rehydrated, user, router]);

  if (!rehydrated) {
    return (
      <div className="min-h-screen pt-10 bg-[#0b0b0b] text-white flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#c8aa78] border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-[#0b0b0b] text-white">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12 grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 lg:grid-cols-[280px_1fr]">
        <DashboardSidebar />
        <main className="min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}

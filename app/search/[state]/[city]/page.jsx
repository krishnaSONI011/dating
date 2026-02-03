"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function SearchRedirectPage() {
  const router = useRouter();
  const params = useParams();
  const state = params?.state ?? "all";
  const city = params?.city ?? "all";

  useEffect(() => {
    router.replace(`/${state}/${city}`);
  }, [router, state, city]);

  return (
    <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#c8aa78] border-t-transparent" />
    </div>
  );
}

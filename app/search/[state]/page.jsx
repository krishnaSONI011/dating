"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function SearchStatePage() {
  const router = useRouter();
  const params = useParams();
  const state = params?.state;

  useEffect(() => {
    if (state) {
      router.replace(`/${state}/all`);
    } else {
      router.replace("/all/all");
    }
  }, [router, state]);

  return (
    <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#c8aa78] border-t-transparent" />
    </div>
  );
}

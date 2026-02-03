"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUserShield, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const linkClass = "block py-1";
const activeClass = "text-[#c8aa78]";
const inactiveClass = "text-gray-400 hover:text-white transition";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user, rehydrated } = useSelector((state) => state.auth);

  const isVerified = user?.is_verified == "1";
  const isApproved = user?.is_approved == "1";
  const isRejected = user?.is_approved == "2";
  const pendingReview = isVerified && !isApproved && !isRejected;

  if (!rehydrated || !user) {
    return null;
  }

  return (
    <aside className="rounded-xl border border-[#2a1f14] bg-[#111] p-6 h-fit">
      <h3 className="mb-6 font-serif text-2xl text-[#c8aa78]">
        My Account
      </h3>

      <ul className="space-y-4 text-sm">
        <li>
          <Link
            href="/dashboard/general-info"
            className={`${linkClass} ${pathname === "/dashboard/general-info" ? activeClass : inactiveClass}`}
          >
            General Info
          </Link>
        </li>
        {isApproved && (
          <li>
            <Link
              href="/dashboard/my-ads"
              className={`${linkClass} ${pathname === "/dashboard/my-ads" ? activeClass : inactiveClass}`}
            >
              My Ads
            </Link>
          </li>
        )}
        <li>
          <span className={`${linkClass} ${inactiveClass} cursor-pointer`}>
            Security
          </span>
        </li>
        <li>
          <span className={`${linkClass} ${inactiveClass} cursor-pointer`}>
            Notifications
          </span>
        </li>
        <li className="flex items-center gap-2 text-gray-400 pt-2">
          {!isVerified && (
            <Link
              href="/dashboard/verification"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition cursor-pointer rounded px-2 py-1 -mx-2 -my-1 hover:bg-white/5"
            >
              <FaUserShield className="text-red-400 shrink-0" /> Verification Pending
            </Link>
          )}
          {isRejected && (
            <Link
              href="/dashboard/verification"
              className="flex items-center gap-2 text-red-400 hover:text-red-300 transition cursor-pointer rounded px-2 py-1 -mx-2 -my-1 hover:bg-white/5"
            >
              <FaTimesCircle className="shrink-0" /> Rejected
            </Link>
          )}
          {pendingReview && (
            <>
              <FaClock className="text-amber-400 shrink-0" /> Profile under review
            </>
          )}
          {isApproved && (
            <>
              <FaCheckCircle className="text-green-500 shrink-0" /> Verified
            </>
          )}
        </li>
      </ul>

      {isApproved && (
        <Link href="/dashboard/post-ad" className="block mt-8">
          <button className="w-full rounded-md bg-[#c8aa78] py-3 text-sm font-semibold tracking-widest text-black hover:bg-[#d6bc8c] transition">
            POST YOUR AD
          </button>
        </Link>
      )}
    </aside>
  );
}

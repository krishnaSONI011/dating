'use client';

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { logout, AUTH_STORAGE_KEY } from "../../../store/slices/authSlice";

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, rehydrated } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isLoggedIn = !!user;
  const isVerified = user?.is_approved == "1";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    setDropdownOpen(false);
    router.push("/");
  };

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="bg-gradient-to-b from-black/80 to-black/40">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 flex items-center justify-between gap-2">

          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-xl sm:text-2xl md:text-3xl tracking-widest text-white truncate min-w-0"
          >
            Affair Escorts
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
            {rehydrated && isLoggedIn ? (
              <>
                <Link
                  href="/dashboard/post-ad"
                  className="border border-[#c8aa78] px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-white hover:bg-[#c8aa78] hover:text-black transition whitespace-nowrap"
                >
                  <span className="hidden sm:inline">Post Your ad</span>
                  <span className="sm:hidden">Post Ad</span>
                </Link>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((o) => !o)}
                    className="flex items-center gap-1.5 sm:gap-2 border border-[#c8aa78] px-3 sm:px-4 py-1.5 sm:py-2 text-xs tracking-[0.2em] bg-[#c8aa78] text-white hover:bg-[#d6bc8c] hover:text-black transition"
                  >
                    <FaUserCircle className="text-base sm:text-lg" />
                    <span className="hidden sm:inline">Account</span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg border border-[#2a1f14] bg-[#111] py-2 shadow-xl">
                      <Link
                        href="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-[#c8aa78]"
                      >
                        Dashboard
                      </Link>
                      {isVerified && (
                        <Link
                          href="/dashboard/my-ads"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-[#c8aa78]"
                        >
                          My Ads
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-red-400"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard/post-ad"
                  className="border border-[#c8aa78] px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-white hover:bg-[#c8aa78] hover:text-black transition whitespace-nowrap"
                >
                  <span className="hidden sm:inline">Post Your ad</span>
                  <span className="sm:hidden">Post Ad</span>
                </Link>
                <Link
                  href="/login"
                  className="border border-[#c8aa78] px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] bg-[#c8aa78] text-white hover:bg-[#d6bc8c] hover:text-black transition whitespace-nowrap"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

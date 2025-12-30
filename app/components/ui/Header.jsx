'use client';

import Link from "next/link";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="bg-gradient-to-b from-black/80 to-black/40">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-3xl tracking-widest text-white"
          >
           Escort Service
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex gap-8 text-sm tracking-wide text-white/90">
            <Link href="#" className="hover:text-white">Models</Link>
            <Link href="#" className="hover:text-white">Services</Link>
            <Link href="#" className="hover:text-white">About</Link>
            <Link href="#" className="hover:text-white">Testimonials</Link>
            <Link href="#" className="hover:text-white">FAQs</Link>
            <Link href="#" className="hover:text-white">Blog</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c8aa78] text-black"
            >
              <FaTelegramPlane />
            </a>

            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c8aa78] text-black"
            >
              <FaWhatsapp />
            </a>

            <Link
              href="#"
              className="border border-[#c8aa78] px-5 py-2 text-xs tracking-[0.3em] text-white hover:bg-[#c8aa78] hover:text-black transition"
            >
              BOOK NOW
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

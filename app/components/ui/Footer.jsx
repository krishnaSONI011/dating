import Link from "next/link";
import { FaWhatsapp, FaTelegramPlane, FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0b0b0b] text-gray-300 pt-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Top Text */}
        <div className="mb-16 text-center">
          <h3 className="font-serif text-4xl text-[#d6c29f] mb-4">
            Indulge in Unforgettable Companionship
          </h3>
          <p className="mx-auto max-w-2xl text-gray-400 leading-relaxed">
            Crafted for those who appreciate elegance, intimacy, and discreet
            luxury. Every moment is designed to feel personal, warm, and
            irresistibly memorable.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-12 md:grid-cols-4">

          {/* Brand */}
          <div>
            <h4 className="font-serif text-2xl text-white mb-4">Escorts</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              A premium destination for refined companionship, where desire
              meets sophistication and every connection feels exclusive.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="mb-4 text-sm uppercase tracking-widest text-[#c2a97e]">
              Explore
            </h5>
            <ul className="space-y-3 text-sm">
              <li><Link href="#">Our Models</Link></li>
              <li><Link href="#">Services</Link></li>
              <li><Link href="#">Cities</Link></li>
              <li><Link href="#">Book a Date</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h5 className="mb-4 text-sm uppercase tracking-widest text-[#c2a97e]">
              Popular Cities
            </h5>
            <ul className="space-y-3 text-sm">
              <li>Escort in Mumbai</li>
              <li>Escort in Delhi</li>
              <li>Escort in Bangalore</li>
              <li>Escort in Indore</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="mb-4 text-sm uppercase tracking-widest text-[#c2a97e]">
              Connect Privately
            </h5>

            <div className="flex gap-4 mb-6">
              <a className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c2a97e] text-black">
                <FaWhatsapp />
              </a>
              <a className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c2a97e] text-black">
                <FaTelegramPlane />
              </a>
            </div>

            <p className="text-sm text-gray-400">
              Available 24/7 for discreet and respectful conversations.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="py-10 h-px " />

        {/* Bottom */}
        {/* <div className="flex flex-col md:flex-row items-center justify-between pb-8 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} SCENT. All Rights Reserved.</p>
          <p className="flex items-center gap-2">
            Made with <FaHeart className="text-[#c2a97e]" /> for refined desires
          </p>
        </div> */}

      </div>
    </footer>
  );
}

import Image from "next/image";
import { FaStar } from "react-icons/fa";

export default function ModelCard() {
  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-md border border-[#c8aa78] bg-[#2b2b2b]">

      {/* Premium Ribbon */}
      <div className="absolute right-0 top-0 z-20">
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-1 text-xs font-semibold text-white rotate-45 translate-x-6 translate-y-3">
          PREMIUM
        </div>
      </div>

      {/* Image */}
      <div className="relative h-[420px] w-full">
        <Image
          src="/es.jpg"
          alt="Shaifali"
          fill
          className="object-cover"
        />

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3 rounded-md bg-[#c8aa78] px-4 py-1 text-sm font-semibold text-white">
          ₹12,000
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 left-3 flex gap-1 text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} size={14} />
          ))}
        </div>
      </div>

      {/* Name Bar */}
      <div className="bg-[#c8aa78] py-3 text-center">
        <h3 className="text-lg font-semibold text-white">
          Shaifali <span className="text-sm font-normal">(India)</span>
        </h3>
      </div>

      {/* Description */}
      <div className="p-4 text-sm text-gray-200 leading-relaxed">
        Shaifali premium Indian escort in Delhi NCR. At PinkPages, we proudly
        present Shaifali, tailored to cater to your discerning tastes and
        desires. Indian companionship at its finest...
      </div>
    </div>
  );
}

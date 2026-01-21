import Image from "next/image";

const cities = [
  { name: "Mumbai", image: "/es4.jpg" },
  { name: "Delhi", image: "/es4.jpg" },
  { name: "Bangalore", image: "/es4.jpg" },
  { name: "Hyderabad", image: "/es4.jpg" },
  { name: "Ahmedabad", image: "/es4.jpg" },
  { name: "Chennai", image: "/es4.jpg" },
  { name: "Kolkata", image: "/es4.jpg" },
  { name: "Surat", image: "/es4.jpg" },
  { name: "Pune", image: "/es2.jpg" },
];

export default function EscortsByCity() {
  return (
    <section className="bg-[#0f0f0f] py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <h2 className="mb-14 text-center font-serif text-4xl md:text-5xl text-[#d6c29f]">
          Explore Companionship by City
        </h2>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city, index) => (
            <div
              key={index}
              className="group relative h-[260px] overflow-hidden rounded-xl"
            >
              {/* Image */}
              <Image
                src={city.image}
                alt={city.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-6 left-6 z-10">
                <p className="text-sm tracking-widest text-[#c2a97e] uppercase">
                  Affair Escort in
                </p>
                <h3 className="mt-1 text-3xl font-semibold text-white tracking-wide">
                  {city.name}
                </h3>
              </div>

              {/* Border Glow */}
              <div className="absolute inset-0 rounded-xl border border-[#3a2c1a] opacity-0 group-hover:opacity-100 transition"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

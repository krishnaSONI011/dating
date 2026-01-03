'use client';

export default function HeroVideo() {
  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/sexy-dancer.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="max-w-4xl w-full text-center text-white">

          <p className="mb-4 tracking-[0.3em] text-sm uppercase">
            Welcome To
          </p>

          <h1 className="font-serif text-5xl md:text-7xl tracking-widest">
            Escorts Service
          </h1>

          <p className="mt-4 text-lg tracking-wide uppercase">
            Companionship Services
          </p>

          {/* SEARCH BAR */}
          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-3 rounded-xl bg-black/70 p-4 backdrop-blur-md border border-[#3a2c1a]">

            {/* What you need */}
            <input
              type="text"
              placeholder="What you need"
              className="w-full md:w-64 rounded-md bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-gray-400 outline-none border border-[#2a1f14] focus:border-[#c8aa78]"
            />

            {/* Where you need */}
            <input
              type="text"
              placeholder="Where you need"
              className="w-full md:w-64 rounded-md bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-gray-400 outline-none border border-[#2a1f14] focus:border-[#c8aa78]"
            />

            {/* Search button */}
            <button
              className="w-full md:w-auto rounded-md bg-[#c8aa78] px-8 py-3 text-sm font-semibold tracking-widest text-black hover:bg-[#d6bc8c] transition"
            >
              SEARCH
            </button>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex justify-center gap-6">
            <button className="bg-[#9b8a6a] px-8 py-3 text-xs tracking-[0.3em] text-white hover:bg-[#b3a27f] transition">
              OUR MODELS
            </button>

            <button className="border border-[#9b8a6a] px-8 py-3 text-xs tracking-[0.3em] text-white hover:bg-[#9b8a6a] hover:text-black transition">
              SERVICES
            </button>
          </div>

        </div>
      </div>

    </section>
  );
}

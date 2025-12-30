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
        <source src="/sexy-dancer.webm" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
        <div className="max-w-3xl text-white">
          
          <p className="mb-4 tracking-[0.3em] text-sm uppercase">
            Welcome To
          </p>

          <h1 className="font-serif text-6xl md:text-8xl tracking-widest">
          Escorts Service
          </h1>

          <p className="mt-4 text-lg tracking-wide uppercase">
            Companionship Services
          </p>

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

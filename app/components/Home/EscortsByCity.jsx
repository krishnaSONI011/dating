"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import api from "../../../lib/api";
import { toSlug } from "../../data/locations";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://irisinformatics.net/dating";

function isApiSuccess(res) {
  const s = res?.data?.status;
  return s === "1" || s === 1 || s === "0" || s === 0;
}

export default function EscortsByCity() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopCities = async () => {
      try {
        const res = await api.post("/Wb/top_cities");
        if (isApiSuccess(res)) {
          const raw = res.data?.data;
          const list = Array.isArray(raw) ? raw : raw != null ? [raw] : [];
          setCities(list);
        } else {
          setCities([]);
        }
      } catch {
        setCities([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTopCities();
  }, []);

  return (
    <section className="bg-[#0f0f0f] py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6">

        <h2 className="mb-8 sm:mb-12 md:mb-14 text-center font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#d6c29f] px-2">
          Explore Companionship by City
        </h2>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#c8aa78] border-t-transparent" />
          </div>
        ) : cities.length === 0 ? (
          <p className="text-center text-gray-500 py-16">No cities to show.</p>
        ) : (
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => {
              const cityName = (city.name || city.city_name || city.city || "").toString().trim();
              const stateName = (city.state_name || city.state || "").toString().trim();
              const stateSlug = stateName ? toSlug(stateName) : "all";
              const citySlug = cityName ? toSlug(cityName) : String(city.id || "");
              const href = stateSlug && citySlug ? `/${stateSlug}/${citySlug}` : "/all/all";

              const rawImg = (city.img || city.image || "").toString().trim();
              const imageSrc = rawImg
                ? rawImg.startsWith("http")
                  ? rawImg
                  : `${baseUrl}/uploads/cities/${rawImg}`
                : "/es4.jpg";

              return (
                <Link
                  key={city.id || cityName || citySlug}
                  href={href}
                  className="group relative block h-[200px] sm:h-[240px] md:h-[260px] overflow-hidden rounded-lg sm:rounded-xl"
                >
                  <Image
                    src={imageSrc}
                    alt={cityName || "City"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized={imageSrc.startsWith("http")}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 z-10">
                    <p className="text-sm tracking-widest text-[#c2a97e] uppercase">
                      Explore in
                    </p>
                    <h3 className="mt-1 text-2xl sm:text-3xl font-semibold text-white tracking-wide">
                      {cityName || "City"}
                    </h3>
                    {stateName ? (
                      <p className="mt-0.5 text-xs sm:text-sm text-gray-300">
                        {stateName}
                      </p>
                    ) : null}
                  </div>
                  <div className="absolute inset-0 rounded-xl border border-[#3a2c1a] opacity-0 group-hover:opacity-100 transition" />
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}

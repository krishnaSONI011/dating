"use client";

import Image from "next/image";
import { FaPinterest, FaSlidersH } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { useState } from "react";
import { allLocations } from "../data/locations";

export default function SearchPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const states = Object.keys(allLocations);
  const cities = selectedState ? allLocations[selectedState] || [] : [];

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity(""); // Reset city when state changes
  };

  return (
    <div className=" pt-10 min-h-screen bg-[#0b0b0b] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 space-y-8">

        {/* ================= SEARCH BAR ================= */}
        <div className="rounded-xl border border-[#3a2c1a] bg-[#111] p-5">
          <div className="flex flex-wrap items-center gap-4">

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by location or keyword..."
              className="flex-1 min-w-[220px] rounded-md bg-brown-900 border border-[#3a2c1a] px-4 py-3 text-sm outline-none focus:border-gold-500"
            />

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-4 border border-[#c8aa78] px-5 py-2 text-xs tracking-[0.3em] bg-[#c8aa78] text-white hover:bg-[#c8aa78] hover:text-black transition"
            >
              <FaSlidersH />
              Filters
            </button>

            {/* Search Button */}
            <button className="rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-black hover:bg-gold-600 transition">
              Search
            </button>
          </div>

          {/* ================= FILTER PANEL ================= */}
          {showFilters && (
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm text-gray-400">State / Union Territory</label>
                <select 
                  value={selectedState}
                  onChange={handleStateChange}
                  className="w-full rounded-md bg-brown-900 border border-brown-700 px-4 py-3 text-sm outline-none focus:border-gold-500"
                >
                  <option value="">Select State / Union Territory</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">City</label>
                <select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  disabled={!selectedState}
                  className="w-full rounded-md bg-brown-900 border border-brown-700 px-4 py-3 text-sm outline-none focus:border-gold-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <button className="mt-auto h-[46px] rounded-md bg-gold-500 text-sm font-semibold text-black hover:bg-gold-600 transition">
                Apply Filters
              </button>
            </div>
          )}
        </div>

        {/* ================= RESULTS ================= */}
        <section className="space-y-6">
          {[1, 2, 3].map((item) => (
            <EscortCard key={item} />
          ))}
        </section>
      </div>
    </div>
  );
}

/* ================= FILTER SELECT ================= */
function FilterSelect({ label, options }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-gray-400">{label}</label>
      <select className="w-full rounded-md bg-brown-900 border border-brown-700 px-4 py-3 text-sm outline-none focus:border-gold-500">
        <option value="">---</option>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

/* ================= ESCORT CARD ================= */
function EscortCard() {
  return (
    <div className="relative flex flex-col md:flex-row overflow-hidden rounded-2xl border border-[#3a2c1a] bg-[#111]">

      {/* Badge */}
      <span className="absolute right-0 top-0 z-10 bg-purple-600 px-3 py-1 text-xs font-semibold uppercase">
        PRO
      </span>

      {/* Image */}
      <div className="relative h-72 w-full md:w-72">
        <Image src="/es.jpg" alt="Escort" fill className="object-cover" />
        <div className="absolute bottom-0 left-0 w-full bg-gold-500 py-2 text-center text-sm font-semibold text-black">
          SUPER TURBO
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h3 className="mb-2 text-2xl font-semibold text-gold-500">
            Premium Escort Available
          </h3>

          <p className="mb-4 text-sm text-gray-400 leading-relaxed">
            High-quality companionship with elegance, discretion, and premium experience.
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <IoLocationSharp size={16} />
            Gandhinagar (District) | Gandhinagar
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Tag>Female</Tag>
          <Tag>22 y</Tag>
          <Tag>Indian</Tag>
        </div>

        <div className="mt-6 flex gap-4">
          <button className="rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-black hover:bg-green-600">
            WhatsApp
          </button>
          <button className="rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold hover:bg-purple-700">
            Call
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= TAG ================= */
function Tag({ children }) {
  return (
    <span className="rounded-full border border-brown-700 px-4 py-1 text-xs text-gray-300">
      {children}
    </span>
  );
}

"use client";

import { useState } from "react";

export default function PostAd() {
  const servicesList = [
    "Anal",
    "GFE",
    "Erotic Massage",
    "Oral",
    "BDSM",
    "Duo",
    "Fetish",
    "French Kiss",
    "Handjob",
  ];

  const timeSlots = [
    "6 AM – 12 PM",
    "12 PM – 6 PM",
    "6 PM – 12 AM",
    "12 AM – 6 AM",
  ];

  const [services, setServices] = useState([]);
  const [timing, setTiming] = useState([]);
  const [images, setImages] = useState([]);

  const toggleItem = (value, list, setList) => {
    setList(
      list.includes(value)
        ? list.filter((i) => i !== value)
        : [...list, value]
    );
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files].slice(0, 15));
  };

  return (
    <div className="min-h-screen  bg-[#0b0b0b] text-white py-22">
      <div className="mx-auto max-w-5xl px-6 space-y-10">

        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-serif text-[#c8aa78]">Post Your Ad</h1>
          <p className="text-gray-400">
            Create your escort profile and start receiving genuine inquiries.
          </p>
        </div>

        {/* BASIC INFO */}
        <Section title="Basic Information">
          <Grid>
            <Input placeholder="Display Name" />
            <Select options={["Female", "Male", "Transgender"]} label="Gender" />
            <Input placeholder="Email Address" />
            <Input placeholder="Phone / WhatsApp Number" />
          </Grid>
        </Section>

        {/* LOCATION */}
        <Section title="Location Details">
          <Grid>
            <Input placeholder="City" />
            <Input placeholder="Area / Locality" />
          </Grid>
        </Section>

        {/* BODY DETAILS */}
        {/* <Section title="Physical Details">
          <Grid>
            <Select label="Body Type" options={["Slim", "Curvy", "Athletic"]} />
            <Select label="Hair Color" options={["Black", "Brown", "Blonde"]} />
            <Select label="Breast Size" options={["Small", "Medium", "Large"]} />
            <Select label="Breast Type" options={["Natural", "Enhanced"]} />
          </Grid>
        </Section> */}

        {/* SERVICES MULTI SELECT */}
        <Section title="Services Offered">
          <div className="flex flex-wrap gap-3">
            {servicesList.map((item) => (
              <Pill
                key={item}
                active={services.includes(item)}
                onClick={() => toggleItem(item, services, setServices)}
              >
                {item}
              </Pill>
            ))}
          </div>
        </Section>

        {/* AD TIMING */}
        <Section title="Ad Show Time">
          <div className="flex flex-wrap gap-3">
            {timeSlots.map((slot) => (
              <Pill
                key={slot}
                active={timing.includes(slot)}
                onClick={() => toggleItem(slot, timing, setTiming)}
              >
                {slot}
              </Pill>
            ))}
          </div>
        </Section>

        {/* IMAGE UPLOAD */}
        <Section title="Upload Photos">
          <p className="mb-4 text-sm text-gray-400">
            Upload at least 2 images (up to 15)
          </p>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-6 w-full rounded-md border border-dashed border-[#2a1f14] bg-[#1a1a1a] p-4"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative h-40 overflow-hidden rounded-lg border border-[#2a1f14]"
              >
                <img
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </Section>

        {/* DESCRIPTION */}
        <Section title="Profile Description">
          <textarea
            rows={5}
            placeholder="Describe yourself, your personality and services..."
            className="w-full rounded-md bg-[#1a1a1a] border border-[#2a1f14] px-4 py-3 text-sm outline-none focus:border-[#c8aa78]"
          />
        </Section>

        {/* SUBMIT */}
        <div className="flex justify-end">
          <button className="rounded-md bg-[#c8aa78] px-12 py-4 text-sm font-semibold tracking-widest text-black hover:bg-[#d6bc8c] transition">
            SUBMIT AD
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Section({ title, children }) {
  return (
    <section className="rounded-xl border border-[#2a1f14] bg-[#111] p-8 space-y-6">
      <h2 className="text-xl font-semibold text-[#c8aa78]">{title}</h2>
      {children}
    </section>
  );
}

function Grid({ children }) {
  return <div className="grid gap-6 md:grid-cols-2">{children}</div>;
}

function Input({ placeholder }) {
  return (
    <input
      placeholder={placeholder}
      className="w-full rounded-md bg-[#1a1a1a] border border-[#2a1f14] px-4 py-3 text-sm outline-none focus:border-[#c8aa78]"
    />
  );
}

function Select({ label, options }) {
  return (
    <select className="w-full rounded-md bg-[#1a1a1a] border border-[#2a1f14] px-4 py-3 text-sm outline-none focus:border-[#c8aa78]">
      <option value="">{label}</option>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

function Pill({ children, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-5 py-2 text-sm border transition
        ${
          active
            ? "bg-[#c8aa78] text-black border-[#c8aa78]"
            : "border-[#2a1f14] text-gray-300 hover:border-[#c8aa78]"
        }`}
    >
      {children}
    </button>
  );
}

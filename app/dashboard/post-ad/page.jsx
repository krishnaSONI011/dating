"use client"

export default function PostAd() {
    return (
      <div className=" pt-10 min-h-screen bg-[#0b0b0b] text-white">
        <div className="mx-auto max-w-5xl px-6 py-12">
  
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-serif text-4xl text-[#c8aa78] mb-2">
              Post Your Ad
            </h1>
            <p className="text-gray-400">
              Create your profile and start receiving genuine inquiries.
            </p>
          </div>
  
          {/* Form */}
          <form className="space-y-10">
  
            {/* BASIC INFO */}
            <section className="rounded-xl border border-[#2a1f14] bg-[#111] p-8">
              <h2 className="mb-6 text-xl font-semibold text-[#c8aa78]">
                Basic Information
              </h2>
  
              <div className="grid gap-6 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Display Name"
                  className="input"
                />
  
                <select className="input">
                  <option value="">Select Gender</option>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Transgender</option>
                </select>
  
                <input
                  type="email"
                  placeholder="Email Address"
                  className="input"
                />
  
                <input
                  type="text"
                  placeholder="Phone / WhatsApp Number"
                  className="input"
                />
              </div>
            </section>
  
            {/* LOCATION */}
            <section className="rounded-xl border border-[#2a1f14] bg-[#111] p-8">
              <h2 className="mb-6 text-xl font-semibold text-[#c8aa78]">
                Location Details
              </h2>
  
              <div className="grid gap-6 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="City"
                  className="input"
                />
                <input
                  type="text"
                  placeholder="Area / Locality"
                  className="input"
                />
              </div>
            </section>
  
            {/* PHOTOS */}
            <section className="rounded-xl border border-[#2a1f14] bg-[#111] p-8">
              <h2 className="mb-2 text-xl font-semibold text-[#c8aa78]">
                Upload Photos
              </h2>
              <p className="mb-6 text-sm text-gray-400">
                Upload at least 3 clear photos. Faces are optional.
              </p>
  
              <div className="grid gap-6 md:grid-cols-3">
                <input type="file" className="file-input" />
                <input type="file" className="file-input" />
                <input type="file" className="file-input" />
              </div>
            </section>
  
            {/* DESCRIPTION */}
            <section className="rounded-xl border border-[#2a1f14] bg-[#111] p-8">
              <h2 className="mb-6 text-xl font-semibold text-[#c8aa78]">
                Profile Description
              </h2>
  
              <textarea
                rows="5"
                placeholder="Describe yourself, your personality, and what makes your service unique..."
                className="w-full rounded-md bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none border border-[#2a1f14] focus:border-[#c8aa78]"
              ></textarea>
            </section>
  
            {/* SERVICES & PREFERENCES */}
            <section className="rounded-xl border border-[#2a1f14] bg-[#111] p-8">
              <h2 className="mb-6 text-xl font-semibold text-[#c8aa78]">
                Availability & Preferences
              </h2>
  
              <div className="grid gap-6 md:grid-cols-2">
                <select className="input">
                  <option value="">Availability</option>
                  <option>Day</option>
                  <option>Night</option>
                  <option>24/7</option>
                </select>
  
                <select className="input">
                  <option value="">Service Type</option>
                  <option>In-call</option>
                  <option>Out-call</option>
                  <option>Both</option>
                </select>
              </div>
            </section>
  
            {/* SUBMIT */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-[#c8aa78] px-10 py-4 text-sm font-semibold tracking-widest text-black hover:bg-[#d6bc8c] transition"
              >
                SUBMIT AD
              </button>
            </div>
  
          </form>
        </div>
  
        {/* Reusable Tailwind styles */}
        <style jsx>{`
          .input {
            width: 100%;
            border-radius: 0.375rem;
            background-color: #1a1a1a;
            padding: 0.75rem 1rem;
            font-size: 0.875rem;
            color: white;
            border: 1px solid #2a1f14;
            outline: none;
          }
          .input:focus {
            border-color: #c8aa78;
          }
          .file-input {
            background-color: #1a1a1a;
            border: 1px dashed #2a1f14;
            color: #999;
            padding: 1rem;
            border-radius: 0.5rem;
          }
        `}</style>
      </div>
    );
  }
  
import Link from "next/link";
import { FaEnvelope, FaTrash, FaWhatsapp } from "react-icons/fa";

export default function GeneralInfo() {
  return (
    <div className="min-h-screen pt-10 bg-[#0b0b0b] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-10 lg:grid-cols-[280px_1fr]">

        {/* SIDEBAR */}
        <aside className="rounded-xl border border-[#2a1f14] bg-[#111] p-6">
          <h3 className="mb-6 font-serif text-2xl text-[#c8aa78]">
            My Profile
          </h3>

          <ul className="space-y-4 text-sm">
            <li className="text-[#c8aa78] font-medium">General Info</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">
              Security
            </li>
            <li className="text-gray-400 hover:text-white cursor-pointer">
              Notifications
            </li>
            <li className="text-red-400">
              User Verification Pending
            </li>
          </ul>

          <Link href={"/dashboard/post-ad"}>  <button className="mt-8 w-full rounded-md bg-[#c8aa78] py-3 text-sm font-semibold tracking-widest text-black hover:bg-[#d6bc8c] transition">
            POST YOUR AD
          </button></Link>
        </aside>

        {/* MAIN CONTENT */}
        <main className="space-y-12">

          {/* PAGE INTRO */}
          <div>
            <h2 className="mb-2 font-serif text-3xl text-[#c8aa78]">
              General Information
            </h2>
            <p className="text-sm text-gray-400">
              Manage the personal details you provided during registration.
            </p>
          </div>

          {/* EMAIL UPDATE CARD */}
          <div className="rounded-xl border border-[#2a1f14] bg-[#111] p-8">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <FaEnvelope className="text-[#c8aa78]" />
              Email Address
            </h3>

            <p className="mb-4 text-sm text-gray-400">
              Your current email is{" "}
              <span className="text-[#c8aa78]">
                soni01krishna@gmail.com
              </span>
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter new email address"
                className="flex-1 rounded-md bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none border border-[#2a1f14] focus:border-[#c8aa78]"
              />

              <button className="rounded-md bg-[#5b45d9] px-6 py-3 text-sm font-semibold text-white hover:bg-[#6b55f0] transition">
                Update Email
              </button>
            </div>
          </div>

          {/* DANGER ZONE */}
          <div className="rounded-xl border border-red-900/40 bg-[#111] p-8">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-red-400">
              <FaTrash />
              Danger Zone
            </h3>

            <p className="mb-6 text-sm text-gray-400">
              Deleting your account is permanent and cannot be undone. Please
              proceed with caution.
            </p>

            <button className="rounded-md bg-red-600 px-8 py-3 text-sm font-semibold text-white hover:bg-red-700 transition">
              Delete Account
            </button>
          </div>

          {/* SUPPORT */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-xl border border-[#2a1f14] bg-[#111] p-6">
            <p className="text-sm text-gray-400">
              Need help updating your information?
            </p>

            <button className="flex items-center gap-3 rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-black hover:bg-green-600 transition">
              <FaWhatsapp />
              PRO Support
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}

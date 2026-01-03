'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUserShield, FaCheckCircle, FaWhatsapp } from "react-icons/fa";

export default function Dashboard() {
    const router = useRouter()
    function handelPush(e){
        e.preventDefault()
        router.push("/dashboard/post-ad")

    }
  return (
    <div className="min-h-screen pt-10 bg-[#0b0b0b] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-10 lg:grid-cols-[280px_1fr]">

        {/* SIDEBAR */}
        <aside className="rounded-xl border border-[#2a1f14] bg-[#111] p-6">
          <h3 className="mb-6 font-serif text-2xl text-[#c8aa78]">
            My Account
          </h3>

          <ul className="space-y-4 text-sm">
           <li className="text-[#c8aa78]"><Link href={"/dashboard/general-info"}>General Info</Link> </li>
            <li className="text-gray-400 hover:text-white cursor-pointer">
              Security
            </li>
            <li className="text-gray-400 hover:text-white cursor-pointer">
              Notifications
            </li>
            <li className="flex items-center gap-2 text-red-400">
              <FaUserShield /> Verification Pending
            </li>
          </ul>

         <Link href={"/dashboard/post-ad"}> <button className="mt-8 w-full rounded-md bg-[#c8aa78] py-3 text-sm font-semibold tracking-widest text-black hover:bg-[#d6bc8c] transition" >
            POST YOUR AD
          </button></Link>
        </aside>

        {/* MAIN CONTENT */}
        <main className="space-y-10">

          {/* VERIFICATION CARD */}
          <div className="rounded-xl border border-[#2a1f14] bg-[#111] p-8 grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-3 font-serif text-3xl text-[#c8aa78]">
                Verify Your Identity
              </h2>

              <p className="mb-6 text-gray-400 leading-relaxed">
                To keep our platform safe and exclusive, we need to confirm
                that you are of legal age. Verification is quick, private,
                and secure.
              </p>

              <ul className="mb-6 space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#c8aa78]" />
                  Valid government ID (Passport / ID Card)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#c8aa78]" />
                  Camera access for a short selfie video
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#c8aa78]" />
                  Takes only a few minutes
                </li>
              </ul>

              <button className="rounded-md bg-[#5b45d9] px-8 py-3 text-sm font-semibold text-white hover:bg-[#6b55f0] transition">
                Start Verification
              </button>
            </div>

            {/* VISUAL / INFO BLOCK */}
            <div className="relative hidden lg:flex items-center justify-center">
              <div className="h-64 w-64 rounded-xl bg-gradient-to-br from-[#c8aa78] via-[#3a2c1a] to-black opacity-30 blur-2xl"></div>
              <div className="absolute text-center">
                <FaUserShield className="mx-auto mb-4 text-5xl text-[#c8aa78]" />
                <p className="text-sm text-gray-400">
                  Your privacy is our priority.
                </p>
              </div>
            </div>
          </div>

          {/* SUPPORT CTA */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-xl border border-[#2a1f14] bg-[#111] p-6">
            <p className="text-sm text-gray-400">
              Need help with verification or account setup?
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

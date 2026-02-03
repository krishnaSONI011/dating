'use client'

import Link from "next/link";
import { FaUserShield, FaCheckCircle, FaWhatsapp, FaClock, FaTimesCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  const isVerified = user?.is_verified == "1";
  const isApproved = user?.is_approved == "1";
  const isRejected = user?.is_approved == "2";
  const rejectionReason = (user?.rejection_reason ?? user?.reason ?? "").toString().trim();
  const pendingReview = isVerified && !isApproved && !isRejected;

  return (
    <div className="space-y-10">
          {/* REJECTED – is_approved=2, show reason */}
          {isRejected && (
            <div className="rounded-xl border-2 border-red-800/50 bg-[#111] p-8">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-red-500/20 p-4 shrink-0">
                  <FaTimesCircle className="text-2xl text-red-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="mb-2 font-serif text-2xl text-red-400">
                    Profile not approved
                  </h2>
                  <p className="mb-4 text-gray-400 leading-relaxed">
                    Your profile was not approved. You can fix the issues and submit again for verification.
                  </p>
                  {rejectionReason ? (
                    <div className="mb-6 rounded-lg border border-red-800/50 bg-red-950/30 p-4">
                      <p className="text-sm font-medium text-red-300 mb-1">Reason for rejection:</p>
                      <p className="text-sm text-gray-300">{rejectionReason}</p>
                    </div>
                  ) : null}
                  <Link href="/dashboard/verification">
                    <button className="rounded-md bg-[#c8aa78] px-6 py-2.5 text-sm font-semibold text-black hover:bg-[#d6bc8c] transition">
                      Submit verification again
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* PENDING REVIEW – is_verified=1, is_approved=0 */}
          {pendingReview && (
            <div className="rounded-xl border border-[#2a1f14] bg-[#111] p-8">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-amber-500/20 p-4">
                  <FaClock className="text-2xl text-amber-400" />
                </div>
                <div>
                  <h2 className="mb-2 font-serif text-2xl text-[#c8aa78]">
                    We are reviewing your profile
                  </h2>
                  <p className="mb-4 text-gray-400 leading-relaxed">
                    Your verification has been submitted. We are reviewing your profile and will get back to you soon.
                    Once it&apos;s done, you&apos;ll receive an email. You can also try logging in again after some time to check your status.
                  </p>
                  <p className="text-sm text-gray-500">
                    You&apos;ll be able to post ads once your profile is approved.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* VERIFICATION CARD – show when not yet verified */}
          {!isVerified && (
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
                <Link href={"/dashboard/verification"}>
                  <button className="rounded-md bg-[#5b45d9] px-8 py-3 text-sm font-semibold text-white hover:bg-[#6b55f0] transition">
                    Start Verification
                  </button>
                </Link>
              </div>

              <div className="relative hidden lg:flex items-center justify-center">
                <div className="h-64 w-64 rounded-xl bg-gradient-to-br from-[#c8aa78] via-[#3a2c1a] to-black opacity-30 blur-2xl"></div>
                <div className="absolute text-center">
                  <FaUserShield className="mx-auto mb-4 text-5xl text-[#c8aa78]" />
                  <p className="text-sm text-gray-400">Your privacy is our priority.</p>
                </div>
              </div>
            </div>
          )}

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

    </div>
  );
}

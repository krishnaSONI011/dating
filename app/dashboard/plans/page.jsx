"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { FaTimes, FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";

const MAIL_US_EMAIL = "help@affairescort.com";

export default function Plans() {
  const searchParams = useSearchParams();
  const adId = searchParams.get("ad_id");
  const { user } = useSelector((state) => state.auth);
  const [showMailPopup, setShowMailPopup] = useState(false);
  const [copied, setCopied] = useState(false);

  const userEmail = user?.email ?? "your registered email";
  const adIdLine = adId ? ` Ad ID: ${adId}.` : "";
  const copyMessage = `Hi, I would like to boost my profile and choose a plan.${adIdLine} My registered email is: ${userEmail}. Please contact me.`;

  return (
    <div className="max-w-6xl">

        {/* Header */}
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold tracking-widest text-[#c8aa78] mb-2 uppercase">
            Boost my profile
          </p>
          <h1 className="text-4xl font-serif text-[#c8aa78] mb-3">
            Choose Your Plan
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Upgrade your visibility and get more genuine inquiries with our premium plans.
          </p>
        </div>

        {/* Plans */}
        <div className="grid gap-8 md:grid-cols-3">

          {/* FREE PLAN */}
          <PlanCard
            title="Free Plan"
            price="Free"
            description="Perfect to get started"
            features={[
              "Post one ad",
              "Standard visibility",
              "No priority listing",
            ]}
            buttonText="Post Ad"
            highlighted={false}
            onChoosePlan={() => setShowMailPopup(true)}
          />

          {/* SILVER PLAN */}
          <PlanCard
            title="Silver Plan"
            price="$2 / month"
            description="More exposure, more clients"
            features={[
              "Post your ad",
              "Location changes on every refresh",
              "Better visibility than free plan",
            ]}
            buttonText="Upgrade to Silver"
            highlighted={false}
            onChoosePlan={() => setShowMailPopup(true)}
          />

          {/* GOLD PLAN */}
          <PlanCard
            title="Gold Plan"
            price="$5 / month"
            description="Maximum visibility & premium exposure"
            features={[
              "Post your ad",
              "Always in top 10 listings",
              "Priority placement on every refresh",
              "Maximum customer reach",
            ]}
            buttonText="Upgrade to Gold"
            highlighted={true}
            onChoosePlan={() => setShowMailPopup(true)}
          />

        </div>

        {/* Mail us popup */}
        {showMailPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
            <div className="relative w-full max-w-md rounded-xl border border-[#2a1f14] bg-[#111] p-6 shadow-xl">
              <button
                type="button"
                onClick={() => setShowMailPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                aria-label="Close"
              >
                <FaTimes className="text-xl" />
              </button>
              <h3 className="mb-4 font-serif text-xl text-[#c8aa78]">
                Mail us
              </h3>
              <p className="mb-4 text-sm text-gray-300 leading-relaxed">
                To choose a plan, please mail us with your registered email id at:
              </p>
              <a
                href={`mailto:${MAIL_US_EMAIL}?subject=Plan enquiry - ${encodeURIComponent(userEmail)}&body=${encodeURIComponent(copyMessage)}`}
                className="inline-block rounded-md bg-[#c8aa78] px-4 py-2 text-sm font-semibold text-black hover:bg-[#d6bc8c] transition"
              >
                {MAIL_US_EMAIL}
              </a>
              <p className="mt-4 text-xs text-gray-500">
                Your registered email: <span className="text-gray-300">{userEmail}</span>
              </p>
              <div className="mt-4 rounded-lg border border-[#2a1f14] bg-[#1a1a1a] p-3">
                <p className="mb-2 text-xs text-gray-500">Message to send:</p>
                <p className="text-sm text-gray-300 whitespace-pre-wrap break-words">{copyMessage}</p>
              </div>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(copyMessage);
                    setCopied(true);
                    toast.success("Message copied to clipboard.");
                    setTimeout(() => setCopied(false), 2000);
                  } catch {
                    toast.error("Could not copy.");
                  }
                }}
                className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-md border border-[#c8aa78] py-2 text-sm font-semibold text-[#c8aa78] hover:bg-[#c8aa78] hover:text-black transition"
              >
                <FaCopy />
                {copied ? "Copied!" : "Copy this message"}
              </button>
              <button
                type="button"
                onClick={() => setShowMailPopup(false)}
                className="mt-4 w-full rounded-md border border-[#2a1f14] py-2 text-sm text-gray-400 hover:text-white transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
    </div>
  );
}

/* ================= PLAN CARD ================= */

function PlanCard({
  title,
  price,
  description,
  features,
  buttonText,
  highlighted,
  onChoosePlan,
}) {
  return (
    <div
      className={`relative rounded-2xl border p-8 flex flex-col justify-between transition
        ${
          highlighted
            ? "border-[#c8aa78] bg-gradient-to-b from-[#1a1a1a] to-[#111] scale-105"
            : "border-[#2a1f14] bg-[#111]"
        }`}
    >
      {/* Badge */}
      {highlighted && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#c8aa78] px-5 py-1 text-xs font-semibold tracking-widest text-black">
          MOST POPULAR
        </span>
      )}

      {/* Header */}
      <div>
        <h3 className="text-2xl font-semibold text-[#c8aa78] mb-2">
          {title}
        </h3>

        <p className="text-gray-400 text-sm mb-4">{description}</p>

        <div className="mb-6">
          <span className="text-4xl font-bold text-white">
            {price}
          </span>
        </div>

        {/* Features */}
        <ul className="space-y-3 text-sm text-gray-300">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[#c8aa78]">✔</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Button */}
      <button
        type="button"
        onClick={onChoosePlan}
        className={`mt-8 rounded-md px-6 py-3 text-sm font-semibold tracking-widest transition
          ${
            highlighted
              ? "bg-[#c8aa78] text-black hover:bg-[#d6bc8c]"
              : "border border-[#c8aa78] text-[#c8aa78] hover:bg-[#c8aa78] hover:text-black"
          }`}
      >
        {buttonText}
      </button>
    </div>
  );
}

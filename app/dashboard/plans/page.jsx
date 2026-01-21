"use client";

export default function Plans() {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white py-20">
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <div className="mb-14 text-center">
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
          />

        </div>
      </div>
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

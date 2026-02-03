"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkerAlt,
  FaClock,
  FaEye,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPhone,
  FaBars,
  FaStar,
} from "react-icons/fa";
import api from "../../../lib/api";

function isApiSuccess(res) {
  const s = res?.data?.status;
  return s === "1" || s === 1 || s === "0" || s === 0;
}

export default function SingleAdPage() {
  const params = useParams();
  const id = params?.id;
  const [ad, setAd] = useState(null);
  const [services, setServices] = useState([]);
  const [images, setImages] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const fetchAd = async () => {
      try {
        setLoading(true);
        setError(false);
        const formData = new FormData();
        formData.append("ads_id", id);
        const res = await api.post("/Wb/ads_edit", formData);
        if (isApiSuccess(res) && res.data?.data) {
          const data = res.data.data;
          setAd(data.ads || null);
          setServices(Array.isArray(data.services) ? data.services : []);
          setImages(Array.isArray(data.images) ? data.images.map((img) => img.img || img) : []);
          setTimeSlots(Array.isArray(data.time) ? data.time : []);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchAd();
  }, [id]);

  if (!id) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center">
        <p className="text-gray-500">Invalid ad.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#c8aa78] border-t-transparent" />
      </div>
    );
  }

  if (error || !ad) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Ad not found.</p>
        <Link href="/all/all" className="text-[#c8aa78] hover:underline">Back to search</Link>
      </div>
    );
  }

  const name = ad.name ?? ad.title ?? "Profile";
  const description = ad.description ?? ad.details ?? "";
  const gender = ad.gender || "";
  const membership = ad.membership || "Free";
  const stateName = ad.state_name || "";
  const cityName = ad.city_name || "";
  const imageUrls = images.map((img) => (typeof img === "string" ? img : img.img || img)).filter(Boolean);
  const serviceTitles = services.map((s) => (typeof s === "string" ? s : s.title || s)).filter(Boolean);

  const adDate = ad.created_at
    ? new Date(ad.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long" }).toUpperCase()
    : "";
  const adIdDisplay = id || ad.id || "—";

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  };

  const profileDetails = [
    (cityName || stateName) && { label: "City", value: cityName || stateName },
    (stateName || cityName) && { label: "Area", value: stateName || cityName },
    gender && { label: "Category", value: gender },
    ad.age && { label: "Age", value: ad.age },
    ad.height && { label: "Height", value: ad.height },
    ad.figure && { label: "Figure", value: ad.figure },
  ].filter(Boolean);

  return (
    <div className="min-h-screen pt-20 sm:pt-24 md:pt-28 bg-[#0b0b0b] text-white pb-12 sm:pb-20">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6">
        <Link href="/all/all" className="inline-block mb-4 sm:mb-6 text-sm text-[#c8aa78] hover:underline">
          ← Back to search
        </Link>

        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white uppercase mb-3 sm:mb-4 leading-tight">
          {gender ? `${gender.toUpperCase()} ESCORTS IN ${(cityName || stateName || "CITY").toUpperCase()}` : `${name.toUpperCase()} — ${(cityName || stateName || "").toUpperCase()}`}
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column: meta + image slider */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm">
              {ad.is_approved === "1" && (
                <span className="inline-flex items-center gap-1.5 rounded px-2.5 py-1 bg-green-600 text-white font-semibold uppercase">
                  <FaCheckCircle />
                  Verified
                </span>
              )}
              {adDate && (
                <span className="text-gray-400">
                  {adDate} — <span className="text-[#c8aa78]">AD ID: {adIdDisplay}</span>
                </span>
              )}
              {(stateName || cityName) && (
                <span className="flex items-center gap-1.5 text-gray-400">
                  <FaMapMarkerAlt className="text-[#c8aa78] shrink-0" />
                  {stateName || cityName}
                </span>
              )}
              {cityName && stateName && cityName !== stateName && (
                <span className="flex items-center gap-1.5 text-gray-400">
                  <FaMapMarkerAlt className="text-[#c8aa78] shrink-0" />
                  {cityName}
                </span>
              )}
              {ad.age && (
                <span className="flex items-center gap-1.5 text-gray-400">
                  <FaClock className="text-[#c8aa78] shrink-0" />
                  {ad.age} Yrs
                </span>
              )}
              {ad.views != null && (
                <span className="flex items-center gap-1.5 text-gray-400">
                  <FaEye className="text-[#c8aa78] shrink-0" />
                  {ad.views} Views
                </span>
              )}
            </div>

            <div className="relative aspect-[4/3] max-h-[320px] sm:max-h-[400px] md:max-h-[480px] rounded-xl overflow-hidden bg-[#1a1a1a]">
              {imageUrls.length > 0 ? (
                <>
                  <Image
                    src={imageUrls[currentImageIndex]}
                    alt={`${name} ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    unoptimized={String(imageUrls[currentImageIndex]).startsWith("http")}
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  {imageUrls.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-[#c8aa78] transition z-10"
                        aria-label="Previous image"
                      >
                        <FaChevronLeft className="text-xl" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-[#c8aa78] transition z-10"
                        aria-label="Next image"
                      >
                        <FaChevronRight className="text-xl" />
                      </button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {imageUrls.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentImageIndex(i)}
                            className={`w-2.5 h-2.5 rounded-full transition ${
                              i === currentImageIndex ? "bg-[#c8aa78]" : "bg-white/50"
                            }`}
                            aria-label={`Image ${i + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  No image
                </div>
              )}
            </div>

            {imageUrls.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                {imageUrls.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition ${
                      i === currentImageIndex ? "border-[#c8aa78]" : "border-[#2a1f14] hover:border-[#3a2c1a]"
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      unoptimized={String(src).startsWith("http")}
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right column: warning + CTA + Profile Details */}
          <aside className="w-full lg:w-80 shrink-0 space-y-3 sm:space-y-4">
            <div className="rounded-xl bg-[#c8aa78]/10 border border-red-700 p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
              <FaExclamationTriangle className="text-red-700 text-xl shrink-0 mt-0.5" />
              <p className="text-white text-sm font-medium">
               <span className="font-semibold text-red-700 text-xl"> Never pay advance!</span><br/> Pay only cash after meeting.
              </p>
            </div>

            {ad.mobile && (
              <>
                <a
                  href={`https://wa.me/91${String(ad.mobile).replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold py-3 sm:py-3.5 px-4 text-sm sm:text-base transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Me
                </a>
                <a
                  href={`tel:${ad.mobile}`}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#c8aa78] hover:bg-[#d6bc8c] text-black font-semibold py-3 sm:py-3.5 px-4 text-sm sm:text-base transition"
                >
                  <FaPhone />
                  Call Now
                </a>
              </>
            )}

            {profileDetails.length > 0 && (
              <div className="rounded-xl border border-[#2a1f14] bg-[#111] p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Profile Details</h3>
                <div className="divide-y divide-[#2a1f14]">
                  {profileDetails.map((row, i) => (
                    <div key={i} className="flex justify-between items-center py-3 first:pt-0 last:pb-0">
                      <span className="text-gray-400 text-sm">{row.label}</span>
                      <span className="text-white text-sm font-medium">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* About Me + Services cards */}
        <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
          {description && (
            <div className="rounded-xl border border-[#2a1f14] bg-[#111] p-4 sm:p-6">
              <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
                <span className="text-[#c8aa78]">
                  <FaBars className="text-xl" />
                </span>
                About Me
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{description}</p>
            </div>
          )}

          {serviceTitles.length > 0 && (
            <div className="rounded-xl border border-[#2a1f14] bg-[#111] p-4 sm:p-6">
              <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
                <span className="text-[#c8aa78]">
                  <FaStar className="text-xl" />
                </span>
                Services
              </h3>
              <div className="flex flex-wrap gap-2">
                {serviceTitles.map((s, i) => (
                  <span
                    key={i}
                    className="rounded-full border-2 border-[#c8aa78] bg-transparent px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {timeSlots.length > 0 && (
            <div className="rounded-xl border border-[#2a1f14] bg-[#111] p-4 sm:p-6">
              <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
                <FaClock className="text-[#c8aa78]" />
                Available Time
              </h3>
              <div className="flex flex-wrap gap-2">
                {timeSlots.map((slot, i) => {
                  const from = slot.from_time ? String(slot.from_time).substring(0, 5) : "";
                  const to = slot.to_time ? String(slot.to_time).substring(0, 5) : "";
                  return (
                    <span
                      key={i}
                      className="rounded-full border-2 border-[#3a2c1a] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-300"
                    >
                      {from && to ? `${from} - ${to}` : from || to || "Available"}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

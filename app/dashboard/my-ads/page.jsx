"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import api from "../../../lib/api";
import { toast } from "react-toastify";
import { FaAd, FaPlus, FaClock, FaCheckCircle, FaTimesCircle, FaEdit, FaTrash, FaRocket } from "react-icons/fa";

export default function MyAdsPage() {
  const router = useRouter();
  const { user, rehydrated } = useSelector((state) => state.auth);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  const isApproved = user?.is_approved == "1";

  useEffect(() => {
    if (!rehydrated) return;
    if (!user) {
      router.push("/login");
      return;
    }
    if (!isApproved) {
      toast.info("Please complete verification to access My Ads.");
      router.push("/dashboard");
      return;
    }
  }, [rehydrated, user, isApproved, router]);

  useEffect(() => {
    if (!rehydrated || !user?.id || !isApproved) return;

    const fetchAds = async () => {
      try {
        setLoading(true);
        const res = await api.get("/Wb/get_ads_by_id");
        if ((res.data?.status === 0 || res.data?.status === "0") && Array.isArray(res.data?.data)) {
          setAds(res.data.data);
        } else if (res.data?.data != null) {
          const d = res.data.data;
          setAds(Array.isArray(d) ? d : [d]);
        } else {
          setAds([]);
        }
      } catch (err) {
        const msg = err.response?.data?.message || "Failed to load your ads.";
        toast.error(msg);
        setAds([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [rehydrated, user?.id, isApproved]);

  if (!isApproved) {
    return null;
  }

  return (
    <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="font-serif text-3xl text-[#c8aa78]">
            My Ads
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            {/* <Link
              href="/dashboard/plans"
              className="inline-flex items-center gap-2 rounded-md border border-[#c8aa78] px-5 py-2.5 text-sm font-semibold text-[#c8aa78] hover:bg-[#c8aa78] hover:text-black transition"
            >
              <FaRocket />
              Boost my profile
            </Link> */}
            <Link
              href="/dashboard/post-ad"
              className="inline-flex items-center gap-2 rounded-md bg-[#c8aa78] px-6 py-3 text-sm font-semibold text-black hover:bg-[#d6bc8c] transition"
            >
              <FaPlus />
              Post New Ad
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#c8aa78] border-t-transparent" />
          </div>
        ) : ads.length === 0 ? (
          <div className="rounded-xl border border-[#2a1f14] bg-[#111] p-12 text-center">
            <FaAd className="mx-auto mb-4 text-5xl text-gray-500" />
            <h2 className="mb-2 text-xl font-semibold text-gray-300">
              No ads yet
            </h2>
            <p className="mb-6 text-gray-500">
              Post your first ad to get started.
            </p>
            <Link
              href="/dashboard/post-ad"
              className="inline-flex items-center gap-2 rounded-md bg-[#c8aa78] px-6 py-3 text-sm font-semibold text-black hover:bg-[#d6bc8c] transition"
            >
              <FaPlus />
              Post Your Ad
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ads.map((ad) => (
              <AdCard
                key={ad.id || ad.ad_id || Math.random()}
                ad={ad}
                onAdsChange={setAds}
              />
            ))}
          </div>
        )}
    </div>
  );
}

function getStatusConfig(isApproved) {
  switch (String(isApproved)) {
    case "1":
      return { label: "Live", icon: FaCheckCircle, className: "bg-green-600/90 text-white" };
    case "2":
      return { label: "Rejected", icon: FaTimesCircle, className: "bg-red-600/90 text-white" };
    default:
      return { label: "Waiting for approval", icon: FaClock, className: "bg-amber-500/90 text-black" };
  }
}

function AdCard({ ad, onAdsChange }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const title = ad.name ?? ad.title ?? "Ad";
  const description = ad.description ?? ad.details ?? "";
  const images = Array.isArray(ad.images) ? ad.images : [];
  const firstImage = images[0] && typeof images[0] === "string" ? images[0] : null;
  const imageSrc = firstImage || "/es.jpg";
  const location = [ad.state_name, ad.city_name].filter(Boolean).join(", ") || ad.location || ad.city || "";

  const statusConfig = getStatusConfig(ad.is_approved);
  const StatusIcon = statusConfig.icon;

  const handleEdit = () => {
    router.push(`/dashboard/post-ad?edit=${ad.id}`);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this ad?")) return;
    try {
      setDeleting(true);
      const formData = new FormData();
      formData.append("ads_id", ad.id ?? ad.ad_id);
      await api.post("/Wb/ads_delete", formData);
      toast.success("Ad deleted.");
      onAdsChange((prev) => prev.filter((a) => (a.id || a.ad_id) !== (ad.id || ad.ad_id)));
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to delete ad.";
      toast.error(msg);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="rounded-xl border border-[#2a1f14] bg-[#111] overflow-hidden">
      <div className="relative h-48 bg-[#1a1a1a]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          unoptimized={imageSrc.startsWith("http")}
        />
        {images.length > 1 && (
          <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
            +{images.length - 1} more
          </span>
        )}
        <span className={`absolute top-2 right-2 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${statusConfig.className}`}>
          <StatusIcon className="shrink-0" />
          {statusConfig.label}
        </span>
      </div>
      <div className="p-4">
        <h3 className="mb-2 font-semibold text-[#c8aa78] line-clamp-1">
          {title}
        </h3>
        {description && (
          <p className="mb-2 text-sm text-gray-400 line-clamp-2">
            {description}
          </p>
        )}
        {location && (
          <p className="mb-2 text-xs text-gray-500">{location}</p>
        )}
        {String(ad.is_approved) === "2" && ad.rejection_reason && (
          <p className="mt-2 rounded bg-red-900/30 border border-red-700/50 px-2 py-1.5 text-xs text-red-300">
            <span className="font-medium">Reason: </span>
            {ad.rejection_reason}
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={`/dashboard/plans?ad_id=${ad.id ?? ad.ad_id ?? ""}`}
            className="inline-flex items-center gap-1.5 rounded-md border border-[#c8aa78] px-3 py-2 text-xs font-semibold text-[#c8aa78] hover:bg-[#c8aa78] hover:text-black transition"
          >
            <FaRocket />
            Boost my profile
          </Link>
          <button
            type="button"
            onClick={handleEdit}
            className="inline-flex items-center gap-1.5 rounded-md border border-[#c8aa78] px-3 py-2 text-xs font-semibold text-[#c8aa78] hover:bg-[#c8aa78] hover:text-black transition"
          >
            <FaEdit />
            Edit
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-1.5 rounded-md border border-red-600/80 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-600/20 transition disabled:opacity-50"
          >
            <FaTrash />
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

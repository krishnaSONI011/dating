"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import {
  FaSlidersH,
  FaExclamationTriangle,
  FaChevronDown,
  FaChevronUp,
  FaWhatsapp,
  FaPhone,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import api from "../../../lib/api";
import { allLocations, toSlug, getStateNameBySlug, getCityNameBySlug } from "../../data/locations";

/** API state shape: { id, name, img, description, cities: [{ id, state_id, name, ... }] } */
function isApiSuccess(res) {
  const s = res?.data?.status;
  return s === "1" || s === 1 || s === "0" || s === 0;
}

function ScamAlertBanner() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  if (isClosed) return null;

  return (
    <div className="rounded-lg border-2 border-red-600 bg-[#1a0a0a] p-3 sm:p-4 mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
        <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
          <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600 flex items-center justify-center">
            <FaExclamationTriangle className="text-yellow-400 text-base sm:text-xl" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-white font-bold text-base sm:text-lg uppercase mb-0.5 sm:mb-1">
              SCAM ALERT: Never Pay Any Advance Payment!
            </h3>
            <p className="text-red-300 text-xs sm:text-sm">
              Pay only in cash after meeting face-to-face. Protect yourself.
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white text-xs sm:text-sm font-semibold transition shrink-0"
        >
          Safety Tips
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-red-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 flex items-start gap-3">
              <div className="shrink-0 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">✕</div>
              <p className="text-white text-sm">
                <span className="font-semibold">NEVER</span> pay any advance payment.
              </p>
            </div>
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 flex items-start gap-3">
              <div className="shrink-0 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">✕</div>
              <p className="text-white text-sm">
                <span className="font-semibold">NEVER</span> transfer money online.
              </p>
            </div>
            <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 flex items-start gap-3">
              <div className="shrink-0 w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">✓</div>
              <p className="text-white text-sm">
                <span className="font-semibold">ONLY</span> pay in cash after meeting.
              </p>
            </div>
            <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 flex items-start gap-3">
              <div className="shrink-0 w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">✓</div>
              <p className="text-white text-sm">
                <span className="font-semibold">VERIFY</span> the person matches the photos.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-dotted border-red-800">
            <p className="text-gray-400 text-sm text-center">
              Got scammed? Report to{" "}
              <a href="mailto:help@affairescorts.com" className="text-red-400 hover:text-red-300 underline">
                help@affairescorts.com
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchByStateCityPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const stateSlug = params?.state ?? "all";
  const citySlug = params?.city ?? "all";
  const initialKeyword = searchParams?.get("q") || "";

  const [showFilters, setShowFilters] = useState(false);
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiStates, setApiStates] = useState([]);
  const [apiCitiesByState, setApiCitiesByState] = useState([]);
  const [topCityDetail, setTopCityDetail] = useState(null); // city from top_cities (has description) when on city URL
  const [selectedStateId, setSelectedStateId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [searchKeyword, setSearchKeyword] = useState(initialKeyword);

  const selectedState = apiStates.find((s) => String(s.id) === String(selectedStateId))
    || (selectedStateId ? { name: selectedStateId, cities: [] } : null);
  const apiCities = apiCitiesByState.length > 0 ? apiCitiesByState : (selectedState?.cities ?? []);
  const selectedCity = apiCities.find((c) => String(c.id) === String(selectedCityId));

  const stateNameFromSlug = getStateNameBySlug(stateSlug);
  const stateFromApi = stateSlug && stateSlug !== "all"
    ? apiStates.find((s) => toSlug((s.name || "").toString().trim()) === stateSlug)
    : null;
  // Match city by name, city_name, or city (use cities from POST /Wb/cities first, then state's nested cities)
  const cityFromApi = (() => {
    if (!stateFromApi || !citySlug || citySlug === "all") return null;
    const list = apiCitiesByState.length > 0 ? apiCitiesByState : (stateFromApi.cities || stateFromApi.city || []);
    const arr = Array.isArray(list) ? list : [];
    return arr.find((c) => {
      const n = (c.name || c.city_name || c.city || "").toString().trim();
      return toSlug(n) === citySlug;
    }) || null;
  })();

  const stateName = stateFromApi?.name ?? stateNameFromSlug;
  const cityName = cityFromApi?.name ?? (stateName ? getCityNameBySlug(stateName, citySlug) : null);

  const statesForDropdown = apiStates.length > 0
    ? apiStates.map((s) => ({ value: s.id, label: s.name }))
    : Object.keys(allLocations).map((name) => ({ value: name, label: name }));
  const citiesForDropdown = apiCities.length > 0
    ? apiCities.map((c) => ({ value: c.id, label: c.name || c.city_name || c.city || "" }))
    : (stateName ? (allLocations[stateName] || []).map((name) => ({ value: name, label: name })) : []);

  // Sync search keyword from URL query parameter
  useEffect(() => {
    const q = searchParams?.get("q") || "";
    if (q !== searchKeyword) {
      setSearchKeyword(q);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await api.get("/Wb/states");
        if (isApiSuccess(res) && Array.isArray(res.data?.data)) {
          const data = res.data.data;
          const withCities = data.map((s) => ({
            ...s,
            cities: Array.isArray(s.cities) ? s.cities : (Array.isArray(s.city) ? s.city : []),
          }));
          setApiStates(withCities);
        }
      } catch {
        try {
          const postRes = await api.post("/Wb/states");
          if (isApiSuccess(postRes) && Array.isArray(postRes.data?.data)) {
            const data = postRes.data.data;
            const withCities = data.map((s) => ({
              ...s,
              cities: Array.isArray(s?.cities) ? s.cities : (Array.isArray(s?.city) ? s.city : []),
            }));
            setApiStates(withCities);
          }
        } catch {
          setApiStates([]);
        }
      }
    };
    fetchStates();
  }, []);

  // Fetch cities by state_id from POST /Wb/cities when a state is selected
  useEffect(() => {
    if (!selectedStateId) {
      setApiCitiesByState([]);
      return;
    }
    let cancelled = false;
    const formData = new FormData();
    formData.append("state_id", selectedStateId);
    api.post("/Wb/cities", formData)
      .then((res) => {
        if (cancelled) return;
        const raw = res.data?.data;
        const list = Array.isArray(raw) ? raw : raw != null ? [raw] : [];
        setApiCitiesByState(list);
      })
      .catch(() => {
        if (!cancelled) setApiCitiesByState([]);
      });
    return () => { cancelled = true; };
  }, [selectedStateId]);

  // When on a city URL, fetch top_cities and find matching city to show city description instead of state
  useEffect(() => {
    if (!stateFromApi || !citySlug || citySlug === "all") {
      setTopCityDetail(null);
      return;
    }
    let cancelled = false;
    api.post("/Wb/top_cities")
      .then((res) => {
        if (cancelled) return;
        if (!isApiSuccess(res)) return;
        const raw = res.data?.data;
        const list = Array.isArray(raw) ? raw : raw != null ? [raw] : [];
        const match = list.find((c) => {
          const cState = (c.state_name || c.state || "").toString().trim();
          const cName = (c.name || c.city_name || c.city || "").toString().trim();
          return toSlug(cState) === stateSlug && toSlug(cName) === citySlug;
        });
        setTopCityDetail(match || null);
      })
      .catch(() => {
        if (!cancelled) setTopCityDetail(null);
      });
    return () => { cancelled = true; };
  }, [stateFromApi, stateSlug, citySlug]);

  useEffect(() => {
    if (stateFromApi) setSelectedStateId(String(stateFromApi.id));
    else if (stateSlug && stateSlug !== "all") setSelectedStateId(stateNameFromSlug ?? stateSlug);
    else setSelectedStateId("");
    if (cityFromApi) setSelectedCityId(String(cityFromApi.id));
    else if (citySlug && citySlug !== "all" && (stateFromApi || stateNameFromSlug)) {
      const list = apiCitiesByState.length > 0 ? apiCitiesByState : (stateFromApi ? (stateFromApi.cities || stateFromApi.city || []) : []);
      const arr = Array.isArray(list) ? list : [];
      const found = arr.find((c) => {
        const n = (c.name || c.city_name || c.city || "").toString().trim();
        return toSlug(n) === citySlug;
      });
      const resolved = found ? (found.name || found.city_name || found.city) : getCityNameBySlug(stateNameFromSlug, citySlug);
      setSelectedCityId(resolved ?? citySlug);
    } else setSelectedCityId("");
  }, [stateFromApi, cityFromApi, stateSlug, citySlug, stateNameFromSlug]);

  useEffect(() => {
    const fetchAds = async () => {
      // When URL has state/city, wait for state to be resolved from API so we don't show "all ads" then overwrite with empty
      if (stateSlug && stateSlug !== "all" && !stateFromApi) {
        setLoading(true);
        return;
      }

      try {
        setLoading(true);
        let params = {};
        if (stateFromApi) {
          params.state_id = stateFromApi.id;
          if (cityFromApi) params.city_id = cityFromApi.id;
        }
        let res = await api.get("/Wb/get_ads", { params });
        let raw = res.data?.data;
        let list = Array.isArray(raw) ? raw : raw != null ? [raw] : [];
        list = list.filter((ad) => String(ad.is_approved) === "1");

        // If URL has a city but we couldn't resolve cityFromApi (e.g. city not in /Wb/states), get city_id from first matching ad and refetch
        if (stateFromApi && citySlug && citySlug !== "all" && !cityFromApi && list.length > 0) {
          const cityIdFromAd = list.find((ad) => {
            const n = (ad.city_name || ad.city || "").toString().trim();
            return toSlug(n) === citySlug;
          });
          const id = cityIdFromAd && (cityIdFromAd.city != null || cityIdFromAd.city_id != null)
            ? (cityIdFromAd.city ?? cityIdFromAd.city_id)
            : null;
          if (id != null) {
            params = { ...params, city_id: id };
            res = await api.get("/Wb/get_ads", { params });
            raw = res.data?.data;
            const cityList = Array.isArray(raw) ? raw : raw != null ? [raw] : [];
            const cityFiltered = cityList.filter((ad) => String(ad.is_approved) === "1");
            // Only use city-filtered result if it has data; otherwise keep state-only list so we don't flash "no data"
            if (cityFiltered.length > 0) list = cityFiltered;
          }
        }

        // When on a city page (/state/city), only show ads that match this city (never show Jaipur ads on Indore page)
        if (stateFromApi && citySlug && citySlug !== "all") {
          list = list.filter((ad) => {
            const adCitySlug = toSlug((ad.city_name || ad.city || "").toString().trim());
            const adStateSlug = toSlug((ad.state_name || ad.state || "").toString().trim());
            const stateMatch = !adStateSlug || adStateSlug === stateSlug;
            const cityMatch = adCitySlug === citySlug;
            return stateMatch && cityMatch;
          });
        }
        setAds(list);
      } catch (err) {
        setAds([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, [stateFromApi?.id, cityFromApi?.id, citySlug, stateSlug, stateFromApi]);

  // Filter ads by search keyword
  useEffect(() => {
    if (!searchKeyword.trim()) {
      setFilteredAds(ads);
      return;
    }
    const keyword = searchKeyword.toLowerCase().trim();
    const filtered = ads.filter((ad) => {
      const name = (ad.name || ad.title || "").toLowerCase();
      const description = (ad.description || ad.details || "").toLowerCase();
      const stateName = (ad.state_name || "").toLowerCase();
      const cityName = (ad.city_name || ad.city || "").toLowerCase();
      const services = Array.isArray(ad.services) 
        ? ad.services.map((s) => (s || "").toLowerCase()).join(" ")
        : "";
      const membership = (ad.membership || "").toLowerCase();
      
      return (
        name.includes(keyword) ||
        description.includes(keyword) ||
        stateName.includes(keyword) ||
        cityName.includes(keyword) ||
        services.includes(keyword) ||
        membership.includes(keyword)
      );
    });
    setFilteredAds(filtered);
  }, [ads, searchKeyword]);

  const handleStateChange = (e) => {
    const val = e.target.value;
    setSelectedStateId(val);
    setSelectedCityId("");
    if (!val) router.push("/all/all");
    else {
      const state = apiStates.find((s) => String(s.id) === val) || { name: val };
      router.push(`/${toSlug(state.name)}/all`);
    }
  };

  const handleCityChange = (e) => {
    const val = e.target.value;
    setSelectedCityId(val);
    if (!val) router.push(selectedState ? `/${toSlug(selectedState.name)}/all` : "/all/all");
    else {
      const city = apiCities.find((c) => String(c.id) === val) || { name: val };
      router.push(`/${toSlug(selectedState.name)}/${toSlug(city.name)}`);
    }
  };

  const popularAreas = (() => {
    const byCity = {};
    ads.forEach((ad) => {
      const name = (ad.city_name || ad.city || "Other").toString().trim();
      byCity[name] = (byCity[name] || 0) + 1;
    });
    const list = Object.entries(byCity).map(([name, count]) => ({ name, count }));
    list.sort((a, b) => b.count - a.count);
    if (list.length === 0 && stateName) {
      const cityList = apiCities.length ? apiCities.map((c) => c.name) : (allLocations[stateName] || []);
      return cityList.map((name) => ({ name, count: 0 }));
    }
    return list;
  })();

  return (
    <div className="pt-16 sm:pt-20 md:pt-24 min-h-screen bg-[#0b0b0b] text-white">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10">
        <ScamAlertBanner />

        <div className="rounded-xl border border-[#3a2c1a] bg-[#111] p-4 sm:p-5 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  // Filtering happens automatically via useEffect, but we can scroll to results
                  const resultsSection = document.querySelector('main');
                  if (resultsSection) {
                    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }
              }}
              placeholder="Search by location or keyword..."
              className="flex-1 min-w-0 sm:min-w-[220px] rounded-md bg-[#1a1a1a] border border-[#3a2c1a] px-4 py-3 text-sm outline-none focus:border-[#c8aa78] text-white placeholder-gray-400"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 border border-[#c8aa78] px-4 sm:px-5 py-2.5 sm:py-2 text-xs tracking-[0.2em] sm:tracking-[0.3em] bg-[#c8aa78] text-white hover:bg-[#c8aa78]/90 transition"
            >
              <FaSlidersH />
              Filters
            </button>
          </div>
          {showFilters && (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-gray-400">State / Union Territory</label>
                <select
                  value={selectedStateId}
                  onChange={handleStateChange}
                  className="w-full rounded-md bg-[#1a1a1a] border border-[#3a2c1a] px-4 py-3 text-sm outline-none focus:border-[#c8aa78]"
                >
                  <option value="">All States</option>
                  {statesForDropdown.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm text-gray-400">City</label>
                <select
                  value={selectedCityId}
                  onChange={handleCityChange}
                  disabled={!selectedStateId}
                  className="w-full rounded-md bg-[#1a1a1a] border border-[#3a2c1a] px-4 py-3 text-sm outline-none focus:border-[#c8aa78] disabled:opacity-50"
                >
                  <option value="">All Cities</option>
                  {citiesForDropdown.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <main className="flex-1 min-w-0 space-y-4 sm:space-y-6 order-2 lg:order-1">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#c8aa78] border-t-transparent" />
              </div>
            ) : filteredAds.length === 0 ? (
              <div className="rounded-xl border border-[#3a2c1a] bg-[#111] p-12 text-center text-gray-400">
                {searchKeyword.trim() 
                  ? `No ads found matching "${searchKeyword}".`
                  : "No ads found for this location."}
              </div>
            ) : (
              filteredAds.map((ad) => (
                <EscortCard key={ad.id} ad={ad} />
              ))
            )}
          </main>

          <aside className="w-full lg:w-72 shrink-0 order-1 lg:order-2">
            <div className="rounded-xl border border-[#2a1f14] bg-[#111] overflow-hidden lg:sticky lg:top-24">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider px-4 sm:px-5 pt-4 sm:pt-5 pb-2">
                Popular Areas
              </h3>
              <div className="h-1 bg-[#c8aa78] mx-4 sm:mx-5 mb-3 sm:mb-4" aria-hidden="true" />
              <ul className="divide-y divide-[#2a1f14] border-t border-[#2a1f14]">
                {popularAreas.map(({ name, count }) => (
                  <li key={name}>
                    <Link
                      href={
                        stateName
                          ? `/${toSlug(stateName)}/${toSlug(name)}`
                          : `/all/${toSlug(name)}`
                      }
                      className="flex items-center justify-between px-4 sm:px-5 py-3 text-white text-sm hover:bg-[#1a1a1a] transition"
                    >
                      <span>{name}</span>
                      <span className="text-white tabular-nums">{count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {(() => {
          const isCityPage = citySlug && citySlug !== "all";
          const cityDesc = (topCityDetail?.description || cityFromApi?.description || "").toString().trim();
          const stateDesc = (stateFromApi?.description || "").toString().trim();

          if (isCityPage) {
            // /state/city — show only city listing (already done above) and city description
            if (!cityDesc) return null;
            const title = (topCityDetail?.name || cityFromApi?.name || cityName || citySlug || "").toString().trim();
            if (!title) return null;
            return (
              <section className="mt-8 sm:mt-10 md:mt-12 rounded-xl border border-[#3a2c1a] bg-[#111] p-4 sm:p-6 md:p-8">
                <h2 className="mb-4 text-xl font-semibold text-[#c8aa78]">
                  {title}
                </h2>
                <div
                  className="state-description text-gray-300 text-sm leading-relaxed [&_p]:mb-3 [&_b]:font-semibold [&_a]:text-[#c8aa78] [&_a]:underline"
                  dangerouslySetInnerHTML={{
                    __html: cityDesc
                      .replace(/&nbsp;/g, "\u00A0")
                      .replace(/<div>/g, "<p>")
                      .replace(/<\/div>/g, "</p>"),
                  }}
                />
              </section>
            );
          }

          // /state/all — show state description only
          if (!stateDesc || !stateFromApi?.name) return null;
          return (
            <section className="mt-8 sm:mt-10 md:mt-12 rounded-xl border border-[#3a2c1a] bg-[#111] p-4 sm:p-6 md:p-8">
              <h2 className="mb-4 text-xl font-semibold text-[#c8aa78]">
                {stateFromApi.name}
              </h2>
              <div
                className="state-description text-gray-300 text-sm leading-relaxed [&_p]:mb-3 [&_b]:font-semibold [&_a]:text-[#c8aa78] [&_a]:underline"
                dangerouslySetInnerHTML={{
                  __html: stateDesc
                    .replace(/&nbsp;/g, "\u00A0")
                    .replace(/<div>/g, "<p>")
                    .replace(/<\/div>/g, "</p>"),
                }}
              />
            </section>
          );
        })()}
      </div>
    </div>
  );
}

function EscortCard({ ad }) {
  const router = useRouter();
  const name = ad.name ?? ad.title ?? "Profile";
  const description = ad.description ?? ad.details ?? "";
  const images = Array.isArray(ad.images) ? ad.images : [];
  const firstImage = images[0] && typeof images[0] === "string" ? images[0] : "/es.jpg";
  const location = [ad.state_name, ad.city_name].filter(Boolean).join(" | ") || ad.city_name || "";
  const gender = ad.gender || "";
  const membership = ad.membership || "Free";

  const handleCardClick = () => {
    router.push(`/ad/${ad.id}`);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      className="relative flex flex-col md:flex-row overflow-hidden rounded-xl sm:rounded-2xl border border-[#3a2c1a] bg-[#111] hover:border-[#c8aa78]/50 transition-colors cursor-pointer"
    >
      {membership && membership !== "Free" && (
        <span className="absolute right-0 top-0 z-10 bg-[#c8aa78] px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase text-black">
          {membership}
        </span>
      )}
      <div className="relative h-52 sm:h-64 md:h-72 w-full md:w-72 shrink-0 overflow-hidden">
        <Image
          src={firstImage}
          alt={name}
          fill
          className="object-cover"
          unoptimized={firstImage.startsWith("http")}
        />
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden
        >
          <span className="text-white/40 font-serif text-base sm:text-xl md:text-2xl font-semibold tracking-widest uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] select-none">
            Affair Escorts
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 md:p-6">
        <div>
          <h3 className="mb-1 sm:mb-2 text-xl sm:text-2xl font-semibold text-[#c8aa78]">{name}</h3>
          {description && (
            <p className="mb-4 text-sm text-gray-400 line-clamp-2">{description}</p>
          )}
          {location && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <IoLocationSharp size={16} />
              {location}
            </div>
          )}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {gender && <Tag>{gender}</Tag>}
          {membership && <Tag>{membership}</Tag>}
        </div>
        {ad.mobile && (
          <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-4" onClick={(e) => e.stopPropagation()}>
            <a
              href={`https://wa.me/91${String(ad.mobile).replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-green-500 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-black hover:bg-green-600 transition"
            >
              <FaWhatsapp className="text-base sm:text-lg shrink-0" />
              WhatsApp
            </a>
            <a
              href={`tel:${ad.mobile}`}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-[#c8aa78] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-black hover:bg-[#d6bc8c] transition"
            >
              <FaPhone className="shrink-0" />
              Call
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="rounded-full border border-[#3a2c1a] px-4 py-1 text-xs text-gray-300">
      {children}
    </span>
  );
}
